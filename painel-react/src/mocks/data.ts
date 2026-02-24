import type { ClientData, ChartData } from '../types';

const generateChartData = (
    baseGoogle: number,
    baseMeta: number,
    vol: number = 30,
    googleModifier: (i: number) => number = () => 1,
    metaModifier: (i: number) => number = () => 1
): ChartData[] => {
    return Array.from({ length: vol }).map((_, i) => ({
        name: `Dia ${i + 1}`,
        google: baseGoogle * googleModifier(i) + Math.random() * (baseGoogle * 0.1) * (Math.random() > 0.5 ? 1 : -1),
        meta: baseMeta * metaModifier(i) + Math.random() * (baseMeta * 0.1) * (Math.random() > 0.5 ? 1 : -1),
    }));
};

export const MOCK_DATA: Record<string, ClientData> = {
    'Incorporadora Alpha': {
        kpis: { spent: 458900.50, leads: 8240, cpl: 55.69, roas: 4.8, itemsDownloaded: 14205, percentage: 68 },
        // Google Search is performing well (downward CPL trend), Meta is stable
        chartData: generateChartData(90, 110, 30, (i) => 1 - (i * 0.015), () => 1),
        creatives: [
            { name: 'Vídeo Fachada 3D - Noturno (15s)', spent: 45000, cpl: 42.50, status: 'Escalar' },
            { name: 'Carrossel Plantas 3 Quartos', spent: 18500, cpl: 58.90, status: 'Manter' },
            { name: 'Storie Oferta de Lançamento', spent: 12300, cpl: 89.10, status: 'Trocar' },
            { name: 'Tour Virtual 360 - Decorado', spent: 85000, cpl: 35.80, status: 'Escalar' },
            { name: 'Depoimento Cliente #01', spent: 5400, cpl: 78.00, status: 'Trocar' },
        ],
        finance: [
            { account: 'ACT-Alpha-Search-Google', balance: 15400.00, approved: 150000, status: 'Conciliado' },
            { account: 'ACT-Alpha-Display-Google', balance: 2100.00, approved: 50000, status: 'Pendente' },
            { account: 'ACT-Alpha-Meta-Main', balance: 450.00, approved: 200000, status: 'Divergência' },
            { account: 'ACT-Alpha-Tiktok', balance: 8000.00, approved: 8000, status: 'Conciliado' },
        ],
        iaInsight: "Baseado nos dados da última madrugada, a Incorporadora Alpha deve realocar 15% da verba do Meta para o Google Search. O público 'Investidores' atingiu o menor CPL dos últimos 30 dias (R$ 41,20). O criativo 'Tour Virtual 360' performou 300% acima da média na rede de Display.",
        alerts: [
            { id: '1', type: 'warning', message: 'Campanha de YouTube aproximando do limite de orçamento diário.', time: '10 min atrás' },
            { id: '2', type: 'critical', message: 'Rejeição de anúncio: "Storie Oferta de Lançamento" violou políticas do Meta.', time: '2 horas atrás' },
            { id: '3', type: 'info', message: 'Nova lead qualificada gerada via Google Search.', time: 'Agora' }
        ],
        aiAnalysis: {
            prediction: "Tendência de estabilização do CPL no Meta Ads nos próximos 7 dias. O Google Search apresenta potencial de escalabilidade de 20% mantendo ROAS acima de 4.",
            confidence: 94.5,
            actions: [
                { title: 'Pausar Criativos Saturados', description: 'Desativar 3 anúncios em Display com baixa taxa de clique.', impact: '- R$ 1.2k de desperdício/dia' },
                { title: 'Escalar Performance Max', description: 'Injetar 15% a mais do budget aprovado na campanha PMAX focada em Planta Baixa.', impact: '+ 45 Leads Qualificados estimados' }
            ]
        },
        platformDistribution: [
            { name: 'Google Ads', value: 55, color: '#4285F4' },
            { name: 'Meta Ads', value: 35, color: '#EA4335' },
            { name: 'TikTok Ads', value: 10, color: '#FBBC05' }
        ]
    },
    'Construtora Beta': {
        kpis: { spent: 125000.00, leads: 1350, cpl: 92.59, roas: 2.1, itemsDownloaded: 4100, percentage: 22 },
        // Insight says Meta saturated (CPL going UP abruptly), Google stable
        chartData: generateChartData(120, 100, 30, () => 1, (i) => 1 + (i * i * 0.002)),
        creatives: [
            { name: 'Promo Cliente Fiel - Desconto 5%', spent: 25000, cpl: 120.00, status: 'Trocar' },
            { name: 'Vídeo Obra Acelerada (Drone)', spent: 42000, cpl: 75.50, status: 'Escalar' },
            { name: 'Banner Feirão Caixa', spent: 15000, cpl: 105.00, status: 'Trocar' },
            { name: 'Carrossel Benefícios Minha Casa', spent: 18000, cpl: 88.00, status: 'Manter' },
        ],
        finance: [
            { account: 'ACT-Beta-PerformanceMax', balance: 850.50, approved: 60000, status: 'Divergência' },
            { account: 'ACT-Beta-SocialLayer', balance: 12000.00, approved: 65000, status: 'Conciliado' },
        ],
        iaInsight: "Alerta Crítico de Fadiga: O conjunto de anúncios 'Feirão Caixa' saturou no Meta Ads com CPL ultrapassando R$ 100. Sugerimos pausa imediata e geração de novas variações de texto focadas no deficit habitacional.",
        alerts: [
            { id: '4', type: 'critical', message: 'ROAS Global abaixo de 2.5 nas últimas 48h. Investigação necessária.', time: '1 hr atrás' },
            { id: '5', type: 'warning', message: 'Aumento de 40% no Custo Por Clique (CPC) na rede de Pesquisa Mobile.', time: 'Ontem' }
        ],
        aiAnalysis: {
            prediction: "Risco de estagnação de leads. A audiência atual do Meta está 85% penetrada. Necessidade urgente de renovação criativa.",
            confidence: 89.0,
            actions: [
                { title: 'Remodelar Audiência', description: 'Duplicar públicos lookalikes usando base de compradores atualizada.', impact: '- 20% no CPL projetado' },
                { title: 'Desativar Campanha Feirão', description: 'Pausar anúncios de Feirão e relançar sob nova oferta.', impact: 'Queda na fadiga visual' }
            ]
        },
        platformDistribution: [
            { name: 'Meta Ads', value: 75, color: '#EA4335' },
            { name: 'Google Ads', value: 25, color: '#4285F4' },
        ]
    },
    'Residencial Gold': {
        kpis: { spent: 890000.00, leads: 22100, cpl: 40.27, roas: 8.5, itemsDownloaded: 56900, percentage: 94 },
        // Insight says Global CPL reduced exponentially (Both going down)
        chartData: generateChartData(60, 70, 30, (i) => 1 - (i * 0.02), (i) => 1 - (i * 0.015)),
        creatives: [
            { name: 'Lançamento Exclusivo - Black Card', spent: 245000, cpl: 32.10, status: 'Escalar' },
            { name: 'Tour Decorado Alto Padrão', spent: 132000, cpl: 38.50, status: 'Escalar' },
            { name: 'Depoimentos Moradores CEO', spent: 45000, cpl: 55.00, status: 'Manter' },
            { name: 'Foto Varanda Gourmet', spent: 80000, cpl: 41.20, status: 'Escalar' },
            { name: 'Stories Convite Coquetel', spent: 12000, cpl: 85.00, status: 'Trocar' },
            { name: 'Reels Arquitetura Assinada', spent: 95000, cpl: 36.90, status: 'Escalar' },
        ],
        finance: [
            { account: 'ACT-Gold-Search-Brand', balance: 45000.00, approved: 300000, status: 'Conciliado' },
            { account: 'ACT-Gold-Search-Generic', balance: 12000.00, approved: 150000, status: 'Conciliado' },
            { account: 'ACT-Gold-Meta-Conversion', balance: 25000.00, approved: 440000, status: 'Conciliado' },
        ],
        iaInsight: "Cenário de Escala Exponencial Positiva: O CPL Global reduziu 18% nesta semana. O algoritmo de lookalike estabilizou com excelência. Recomendado aumento de 35% do orçamento nas campanhas 'Lançamento Exclusivo'.",
        alerts: [
            { id: '6', type: 'info', message: 'Meta de 20.000 Leads atingida com 12 dias de antecedência!', time: 'Ontem' },
            { id: '7', type: 'info', message: 'Conciliação Financeira automatizada concluída sem inconsistências.', time: 'Hoje, 06:00' }
        ],
        aiAnalysis: {
            prediction: "Projeção de encerramento do estoque do residencial em 15 dias se mantido o ritmo atual de agendamentos e leads qualificadas.",
            confidence: 98.2,
            actions: [
                { title: 'Aumentar Lances em +10%', description: 'Dominar o topo da pesquisa no Google para concorrentes diretos.', impact: '+ Captura de Demanda Intencional' },
                { title: 'Campanha de Retargeting Agressivo', description: 'Investir na base de abandonos de carrinho com oferta de fechamento rápido.', impact: 'Conversão acelerada em 3x' }
            ]
        },
        platformDistribution: [
            { name: 'Google Ads', value: 45, color: '#4285F4' },
            { name: 'Meta Ads', value: 40, color: '#EA4335' },
            { name: 'LinkedIn Ads', value: 15, color: '#34A853' }
        ]
    }
};

// Global Pie Data
export const GLOBAL_PIE_DATA = [
    { name: 'Google', value: 400, color: '#4285F4' }, // Google Blue
    { name: 'Meta', value: 300, color: '#EA4335' }, // Google Red
    { name: 'TikTok', value: 150, color: '#FBBC05' }, // Google Yellow
    { name: 'LinkedIn', value: 50, color: '#34A853' }, // Google Green
];
