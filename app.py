import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import numpy as np

# --- CONFIGURAÇÃO DA PÁGINA ---
st.set_page_config(
    page_title="Nexus | Luxury Agency Dashboard",
    page_icon="🌌",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- ESTILIZAÇÃO CSS (State-of-the-Art / Glassmorphism) ---
st.markdown("""
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
    /* Global Settings */
    html, body, [class*="css"]  {
        font-family: 'Inter', sans-serif;
    }
    .stApp {
        background-color: #0B0E14;
        color: #E2E8F0;
    }
    
    /* Header & Status Indicator */
    .brand-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #1F2937;
    }
    .brand-logo {
        font-size: 1.8rem;
        font-weight: 700;
        background: -webkit-linear-gradient(45deg, #2563EB, #3B82F6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.5px;
    }
    .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        color: #9CA3AF;
        background: #161B22;
        padding: 6px 14px;
        border-radius: 20px;
        border: 1px solid #30363D;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .status-dot {
        width: 8px;
        height: 8px;
        background-color: #10B981;
        border-radius: 50%;
        box-shadow: 0 0 8px #10B981;
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    
    /* Cards (Glassmorphism) */
    .metric-card {
        background-color: rgba(22, 27, 34, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid #30363D;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .metric-card:hover {
        transform: translateY(-2px);
        border-color: #3B82F6;
    }
    .metric-title {
        font-size: 0.85rem;
        color: #8B949E;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    .metric-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: #FFFFFF;
        letter-spacing: -1px;
    }
    
    /* IA Command Center */
    .command-center {
        background: linear-gradient(145deg, #1A243A 0%, #0F1626 100%);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 16px;
        padding: 32px;
        margin-bottom: 30px;
        box-shadow: 0 10px 40px -10px rgba(37, 99, 235, 0.15);
        position: relative;
        overflow: hidden;
    }
    .command-center::before {
        content: '';
        position: absolute;
        top: 0; left: 0; width: 100%; height: 2px;
        background: linear-gradient(90deg, transparent, #3B82F6, transparent);
    }
    .cmd-header {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #E2E8F0;
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 16px;
    }
    .cmd-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #94A3B8;
        font-weight: 300;
    }
    .cmd-text strong {
        color: #F1F5F9;
        font-weight: 600;
    }
    
    /* Creative Table / Cards */
    .creative-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 12px;
        margin-top: 10px;
    }
    .creative-table th {
        color: #8B949E;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        text-align: left;
        padding: 0 20px 8px 20px;
        border-bottom: 1px solid #30363D;
    }
    .creative-table tbody tr {
        background-color: #161B22;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.2s ease;
    }
    .creative-table tbody tr:hover {
        background-color: #1A202C;
        transform: scale(1.005);
    }
    .creative-table td {
        padding: 20px;
        color: #E2E8F0;
    }
    .creative-table td:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; font-weight: 600; }
    .creative-table td:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
    
    /* Glowing Badges */
    .badge {
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
    .badge-glow-high {
        background-color: rgba(16, 185, 129, 0.15);
        color: #34D399;
        border: 1px solid rgba(16, 185, 129, 0.3);
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
    }
    .badge-glow-low {
        background-color: rgba(239, 68, 68, 0.15);
        color: #F87171;
        border: 1px solid rgba(239, 68, 68, 0.3);
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
    }
    .badge-glow-neutral {
        background-color: rgba(59, 130, 246, 0.15);
        color: #60A5FA;
        border: 1px solid rgba(59, 130, 246, 0.3);
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
    }
    
    /* Custom Tabs */
    .stTabs [data-baseweb="tab-list"] {
        gap: 2rem;
        background-color: transparent;
        border-bottom: 1px solid #30363D;
        padding-bottom: 0px;
    }
    .stTabs [data-baseweb="tab"] {
        padding: 1rem 0;
        color: #8B949E;
        font-weight: 600;
        font-size: 0.95rem;
        border: none;
        background: transparent;
    }
    .stTabs [aria-selected="true"] {
        color: #3B82F6 !important;
        box-shadow: 0 -2px 0 0 #3B82F6 inset;
    }

    /* Override Botões Streamlit (Hub Financeiro) */
    .stButton > button {
        width: 100%;
        background-color: #161B22;
        color: #E2E8F0;
        border: 1px solid #30363D;
        border-radius: 8px;
        padding: 0.6rem 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        background: linear-gradient(to right, #2563EB, #3B82F6);
        border-color: transparent;
        color: white;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        transform: translateY(-1px);
    }
    </style>
""", unsafe_allow_html=True)

# --- DADOS SIMULADOS ---
@st.cache_data
def load_mock_data():
    dates = pd.date_range(end=datetime.today(), periods=30)
    
    return {
        "Incorporadora Alpha": {
            "kpis": {"investimento": 145000, "leads": 2340, "cpl": 61.96, "roas": 4.2},
            "cpl_history": pd.DataFrame({
                "Data": dates,
                "Google Ads": np.random.normal(55, 6, 30).round(2),
                "Meta Ads": np.random.normal(68, 8, 30).round(2)
            }),
            "creatives": pd.DataFrame({
                "Criativo": ["Fachada 3D - Noturno 🏙️", "Tour Virtual 360 🎥", "Carrossel Plantas 📐", "Vídeo Lifestyle 🥂", "Oferta Zero Entrada 🎯"],
                "Gasto": [12000, 8500, 4300, 21000, 1500],
                "CPL": [45, 52, 78, 95, 30],
                "Analise": ["Performance Alta - Escalar", "Estável - Manter", "Saturado - Trocar", "Saturado - Trocar", "Performance Alta - Escalar"]
            }),
            "finance": [
                {"conta": "ACT-Alpha-Google-01", "saldo": 4500.00, "verba": 50000.00, "status": "Conciliado"},
                {"conta": "ACT-Alpha-Meta-01", "saldo": 1200.00, "verba": 30000.00, "status": "Pendente"},
                {"conta": "ACT-Alpha-Tiktok", "saldo": 0.00, "verba": 10000.00, "status": "Conciliado"}
            ],
            "ia_insight": "Baseado nos dados em tempo real, recomendamos realocar <strong>15% da verba do Meta para o Google Search</strong>. O público 'Investidores Premium' atingiu seu menor CPL (R$ 41,20) nas últimas 48 horas, indicando alta intenção."
        },
        "Construtora Beta": {
            "kpis": {"investimento": 89000, "leads": 980, "cpl": 90.81, "roas": 2.8},
            "cpl_history": pd.DataFrame({
                "Data": dates,
                "Google Ads": np.random.normal(85, 7, 30).round(2),
                "Meta Ads": np.random.normal(95, 10, 30).round(2)
            }),
            "creatives": pd.DataFrame({
                "Criativo": ["Promo Cliente Fiel ⭐", "Vídeo Obra Acelerada 🏗️", "Render Varanda Gourmet 🍷"],
                "Gasto": [5000, 12000, 8000],
                "CPL": [110, 85, 92],
                "Analise": ["Saturado - Trocar", "Performance Alta - Escalar", "Estável - Manter"]
            }),
            "finance": [
                {"conta": "ACT-Beta-Google", "saldo": 800.00, "verba": 40000.00, "status": "Divergência"},
                {"conta": "ACT-Beta-Meta", "saldo": 50.00, "verba": 50000.00, "status": "Conciliado"}
            ],
            "ia_insight": "Alerta de Fadiga Detectado: A campanha <strong>'Vídeo Obra Acelerada'</strong> saturou no Meta Ads. Sugerimos pausa temporária e injeção de novas variações curtas (Shorts) focadas em ROI imediato."
        },
        "Residencial Gold": {
            "kpis": {"investimento": 210000, "leads": 4500, "cpl": 46.66, "roas": 6.5},
            "cpl_history": pd.DataFrame({
                "Data": dates,
                "Google Ads": np.random.normal(40, 4, 30).round(2),
                "Meta Ads": np.random.normal(52, 5, 30).round(2)
            }),
            "creatives": pd.DataFrame({
                "Criativo": ["Lançamento Exclusivo 🗝️", "Tour Decorado 🛋️", "Depoimentos Moradores 🗣️", "Condições Especiais ⚡"],
                "Gasto": [45000, 32000, 15000, 20000],
                "CPL": [38, 42, 65, 50],
                "Analise": ["Performance Alta - Escalar", "Performance Alta - Escalar", "Saturado - Trocar", "Estável - Manter"]
            }),
            "finance": [
                {"conta": "ACT-Gold-Search", "saldo": 15000.00, "verba": 100000.00, "status": "Conciliado"},
                {"conta": "ACT-Gold-Social", "saldo": 12000.00, "verba": 60000.00, "status": "Conciliado"}
            ],
            "ia_insight": "Cenário de Escala Positiva: O CPL Global reduziu <strong>12% nesta semana</strong>. Escalonamento liberado para a campanha 'Lançamento Exclusivo' via Search em +20%."
        }
    }

# --- FUNÇÕES DE RENDERIZAÇÃO ---
def format_curr(v):
    return f"R$ {v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def render_creatives_table(df):
    html = '<table class="creative-table"><thead><tr><th>Ativo Criativo</th><th>Investimento</th><th>Custo / Lead</th><th>Status Preditivo (IA)</th></tr></thead><tbody>'
    for _, row in df.iterrows():
        status = row['Analise']
        if "Escalar" in status:
            span = f'<span class="badge badge-glow-high">{status}</span>'
        elif "Trocar" in status:
            span = f'<span class="badge badge-glow-low">{status}</span>'
        else:
            span = f'<span class="badge badge-glow-neutral">{status}</span>'
            
        html += f"""
        <tr>
            <td>{row['Criativo']}</td>
            <td>{format_curr(row['Gasto'])}</td>
            <td>{format_curr(row['CPL'])}</td>
            <td>{span}</td>
        </tr>
        """
    html += '</tbody></table>'
    st.markdown(html, unsafe_allow_html=True)


# --- MAIN APP ---
def main():
    db = load_mock_data()
    
    # --- HEADER INFERIOR (BRAND) ---
    st.markdown("""
        <div class="brand-header">
            <div class="brand-logo">NEXUS<span style="font-weight:300; color:#E2E8F0;">OS</span></div>
            <div class="status-indicator">
                <div class="status-dot"></div>
                IA Synced: Scanning Data
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # --- SIDEBAR ---
    st.sidebar.markdown("<h3 style='color:#8B949E; font-weight:600; font-size:0.9rem; letter-spacing:1px; margin-bottom:10px;'>WORKSTYLES</h3>", unsafe_allow_html=True)
    cliente_selecionado = st.sidebar.selectbox("PORTFOLIO", list(db.keys()), label_visibility="collapsed")
    
    st.sidebar.markdown("<br><br><br>", unsafe_allow_html=True)
    st.sidebar.markdown("""
        <div style="background:#161B22; border:1px solid #30363D; border-radius:8px; padding:15px; font-size:0.8rem; color:#8B949E;">
            <div style="margin-bottom:8px;">📡 <b>Uptime:</b> 99.98%</div>
            <div style="margin-bottom:8px;">⚡ <b>Latência API:</b> 42ms</div>
            <div>🔄 <b>Sync:</b> Em tempo real</div>
        </div>
    """, unsafe_allow_html=True)
    
    client = db[cliente_selecionado]
    kpis = client['kpis']
    
    # --- TABS PRE-HEADER ---
    st.markdown(f"<h2 style='font-size:1.8rem; margin-bottom:5px; font-weight:600;'>{cliente_selecionado}</h2>", unsafe_allow_html=True)
    
    tab1, tab2 = st.tabs(["⚡ Performance & Insights", "💳 Hub Financeiro B2B"])
    
    with tab1:
        st.markdown("<br>", unsafe_allow_html=True)
        
        # IA COMMAND CENTER
        st.markdown(f"""
            <div class="command-center">
                <div class="cmd-header">
                    <span>✨</span> Comando Executivo IA
                </div>
                <div class="cmd-text">
                    {client['ia_insight']}
                </div>
            </div>
        """, unsafe_allow_html=True)
        
        # KPIS
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.markdown(f'<div class="metric-card"><div class="metric-title">Spent YTD</div><div class="metric-value">{format_curr(kpis["investimento"])}</div></div>', unsafe_allow_html=True)
        with col2:
            st.markdown(f'<div class="metric-card"><div class="metric-title">Leads Capturados</div><div class="metric-value">{kpis["leads"]:,}</div></div>', unsafe_allow_html=True)
        with col3:
            st.markdown(f'<div class="metric-card"><div class="metric-title">Target CPL</div><div class="metric-value">{format_curr(kpis["cpl"])}</div></div>', unsafe_allow_html=True)
        with col4:
            st.markdown(f'<div class="metric-card"><div class="metric-title">Global ROAS</div><div class="metric-value">{kpis["roas"]}x</div></div>', unsafe_allow_html=True)
            
        st.markdown("<br><br>", unsafe_allow_html=True)
        
        # GRAFICO PLOTLY SPLINE AREA
        st.markdown("<h3 style='font-size:1.2rem; font-weight:600; color:#E2E8F0; margin-bottom:15px;'>Mapeamento de Custo: Google vs Meta</h3>", unsafe_allow_html=True)
        df_chart = client['cpl_history']
        
        fig = go.Figure()
        
        # Meta Ads Area
        fig.add_trace(go.Scatter(
            x=df_chart['Data'], y=df_chart['Meta Ads'],
            mode='lines',
            name='Meta Ads',
            line=dict(shape='spline', width=3, color='#8B5CF6'),
            fill='tozeroy',
            fillcolor='rgba(139, 92, 246, 0.1)'
        ))
        
        # Google Ads Area
        fig.add_trace(go.Scatter(
            x=df_chart['Data'], y=df_chart['Google Ads'],
            mode='lines',
            name='Google Ads',
            line=dict(shape='spline', width=3, color='#3B82F6'),
            fill='tozeroy',
            fillcolor='rgba(59, 130, 246, 0.1)'
        ))

        fig.update_layout(
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            font_color='#8B949E',
            margin=dict(l=0, r=0, t=10, b=0),
            height=350,
            xaxis=dict(
                showgrid=False, 
                zeroline=False,
                showline=False
            ),
            yaxis=dict(
                showgrid=True,
                gridcolor='#1F2937',
                gridwidth=1,
                zeroline=False,
                title='BRL (R$)'
            ),
            hovermode="x unified",
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("<br>", unsafe_allow_html=True)
        st.markdown("<h3 style='font-size:1.2rem; font-weight:600; color:#E2E8F0;'>Performance de Criativos & Fadiga</h3>", unsafe_allow_html=True)
        render_creatives_table(client['creatives'])

    with tab2:
        st.markdown("<br>", unsafe_allow_html=True)
        st.markdown("""
            <div style="background:#161B22; border:1px solid #30363D; padding:20px; border-radius:12px; margin-bottom: 25px;">
                <h3 style="margin:0 0 5px 0; color:#FAFAFA; font-size:1.2rem;">Finanças Inteligentes</h3>
                <p style="margin:0; color:#8B949E; font-size:0.95rem;">Emissão em 1-clique e Auditoria em Tempo Real de Gastos vs Invoices.</p>
            </div>
        """, unsafe_allow_html=True)
        
        for idx, acct in enumerate(client['finance']):
            st.markdown(f"<h4 style='color:#E2E8F0; font-weight:600; margin-top:20px; border-left: 3px solid #3B82F6; padding-left: 10px;'>{acct['conta']}</h4>", unsafe_allow_html=True)
            c1, c2, c3, c4 = st.columns([1.5, 1.5, 1.5, 2])
            
            with c1:
                st.metric("Saldo da Conta", format_curr(acct['saldo']))
            with c2:
                st.metric("Verba Instalada", format_curr(acct['verba']))
            with c3:
                status_color = '#10B981' if acct['status'] == 'Conciliado' else '#F59E0B' if acct['status'] == 'Pendente' else '#EF4444'
                st.markdown(f"**Integridade NF:**<br><span style='color:{status_color}; font-weight:600;'>{acct['status']}</span>", unsafe_allow_html=True)
            with c4:
                st.write("") # Spacer
                b1, b2 = st.columns(2)
                if b1.button("💳 Emitir Boleto", key=f"b_{idx}"):
                    st.toast(f"Boleto para {acct['conta']} gerado com sucesso! ✅", icon="💳")
                if b2.button("📄 Exportar NF", key=f"nf_{idx}"):
                    st.toast(f"Download da nota fiscal fiscal iniciado via gateway.", icon="🧾")
            st.markdown("<hr style='border-color:#1F2937; margin-top:10px;'>", unsafe_allow_html=True)

if __name__ == "__main__":
    main()
