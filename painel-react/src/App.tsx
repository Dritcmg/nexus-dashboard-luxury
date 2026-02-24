import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Wallet,
  Settings,
  Bell,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Activity,
  Receipt,
  CloudDownload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA ---
const MOCK_DATA = {
  'Incorporadora Alpha': {
    kpis: { spent: 145000, leads: 2340, cpl: 61.96, roas: 4.2 },
    chartData: Array.from({ length: 15 }).map((_, i) => ({
      name: `Dia ${i + 1}`,
      google: 50 + Math.random() * 20,
      meta: 65 + Math.random() * 25,
    })),
    creatives: [
      { name: 'Fachada 3D - Noturno', spent: 12000, cpl: 45, status: 'Escalar', icon: '🏙️' },
      { name: 'Tour Virtual 360', spent: 8500, cpl: 52, status: 'Manter', icon: '🎥' },
      { name: 'Carrossel Plantas', spent: 4300, cpl: 78, status: 'Trocar', icon: '📐' },
    ],
    finance: [
      { account: 'ACT-Alpha-Google-01', balance: 4500, approved: 50000, status: 'Conciliado' },
      { account: 'ACT-Alpha-Meta-01', balance: 1200, approved: 30000, status: 'Pendente' },
    ],
    iaInsight: "Baseado nos dados em tempo real, recomendamos realocar 15% da verba do Meta para o Google Search. O público 'Investidores Premium' atingiu seu menor CPL (R$ 41,20) nas últimas 48 horas.",
  },
  'Construtora Beta': {
    kpis: { spent: 89000, leads: 980, cpl: 90.81, roas: 2.8 },
    chartData: Array.from({ length: 15 }).map((_, i) => ({
      name: `Dia ${i + 1}`,
      google: 80 + Math.random() * 15,
      meta: 90 + Math.random() * 20,
    })),
    creatives: [
      { name: 'Promo Cliente Fiel', spent: 5000, cpl: 110, status: 'Trocar', icon: '⭐' },
      { name: 'Vídeo Obra Acelerada', spent: 12000, cpl: 85, status: 'Escalar', icon: '🏗️' },
    ],
    finance: [
      { account: 'ACT-Beta-Google', balance: 800, approved: 40000, status: 'Divergência' },
      { account: 'ACT-Beta-Meta', balance: 50, approved: 50000, status: 'Conciliado' },
    ],
    iaInsight: "Alerta de Fadiga Detectado: A campanha 'Vídeo Obra Acelerada' saturou no Meta Ads. Sugerimos pausa temporária e injeção de novas variações curtas focadas em ROI imediato.",
  },
  'Residencial Gold': {
    kpis: { spent: 210000, leads: 4500, cpl: 46.66, roas: 6.5 },
    chartData: Array.from({ length: 15 }).map((_, i) => ({
      name: `Dia ${i + 1}`,
      google: 35 + Math.random() * 10,
      meta: 45 + Math.random() * 15,
    })),
    creatives: [
      { name: 'Lançamento Exclusivo', spent: 45000, cpl: 38, status: 'Escalar', icon: '🗝️' },
      { name: 'Tour Decorado', spent: 32000, cpl: 42, status: 'Escalar', icon: '🛋️' },
      { name: 'Depoimentos Moradores', spent: 15000, cpl: 65, status: 'Trocar', icon: '🗣️' },
    ],
    finance: [
      { account: 'ACT-Gold-Search', balance: 15000, approved: 100000, status: 'Conciliado' },
      { account: 'ACT-Gold-Social', balance: 12000, approved: 60000, status: 'Conciliado' },
    ],
    iaInsight: "Cenário de Escala Positiva: O CPL Global reduziu 12% nesta semana. Escalonamento liberado para a campanha 'Lançamento Exclusivo' via Search em +20%.",
  }
};

type ClientKey = keyof typeof MOCK_DATA;
type Tab = 'performance' | 'finance';

// --- COMPONENTS ---

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) => (
  <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 border-r border-dark-border bg-dark-bg/80 backdrop-blur-xl z-50 flex flex-col">
    <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-dark-border">
      <div className="text-2xl font-bold tracking-tighter text-gradient flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-brand-blue" />
        <span className="hidden md:block">NEXUS<span className="font-light text-slate-400">OS</span></span>
      </div>
    </div>

    <nav className="flex-1 py-8 flex flex-col gap-2 px-3 focus:outline-none">
      <button
        onClick={() => setActiveTab('performance')}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300",
          activeTab === 'performance' ? "bg-brand-electric/10 text-brand-blue" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
        )}>
        <LayoutDashboard className="w-5 h-5" />
        <span className="hidden md:block font-medium">Performance</span>
      </button>
      <button
        onClick={() => setActiveTab('finance')}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300",
          activeTab === 'finance' ? "bg-brand-electric/10 text-brand-blue" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
        )}>
        <Wallet className="w-5 h-5" />
        <span className="hidden md:block font-medium">B2B Finance Auth</span>
      </button>
    </nav>

    <div className="p-4 border-t border-dark-border">
      <button className="flex items-center justify-center w-full gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
        <Settings className="w-5 h-5" />
        <span className="hidden md:block font-medium">Settings</span>
      </button>
    </div>
  </aside>
);

const Header = ({ client, setClient }: { client: ClientKey, setClient: (c: ClientKey) => void }) => (
  <header className="h-20 border-b border-dark-border flex items-center justify-between px-6 bg-dark-bg/50 backdrop-blur-md sticky top-0 z-40">
    <div className="flex items-center gap-6">
      <select
        value={client}
        onChange={(e) => setClient(e.target.value as ClientKey)}
        className="bg-transparent border border-slate-800 text-slate-200 text-lg font-semibold rounded-lg px-4 py-2 focus:outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer hover:bg-slate-800/30"
      >
        {Object.keys(MOCK_DATA).map(key => (
          <option key={key} value={key} className="bg-dark-bg">{key}</option>
        ))}
      </select>
    </div>

    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/30 shadow-lg shadow-emerald-500/5">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <span className="text-sm font-medium text-slate-300">IA Status: Scanning...</span>
      </div>
      <button className="p-2 rounded-full bg-slate-800/50 text-slate-300 hover:text-white transition-colors relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-brand-blue rounded-full"></span>
      </button>
    </div>
  </header>
);

const KpiCard = ({ title, value, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-6 flex items-start justify-between group hover:border-brand-blue/50 transition-colors"
  >
    <div>
      <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
    </div>
    <div className="p-3 rounded-lg bg-slate-800/50 text-brand-blue group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all">
      <Icon className="w-6 h-6" />
    </div>
  </motion.div>
);

const CreativeBadge = ({ status }: { status: string }) => {
  if (status === 'Escalar') {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
        PERFORMANCE ALTA - ESCALAR
      </span>
    );
  }
  if (status === 'Trocar') {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
        SATURADO - TROCAR
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
      ESTÁVEL - MANTER
    </span>
  );
};

// --- MAIN APP ---

export default function App() {
  const [client, setClient] = useState<ClientKey>('Incorporadora Alpha');
  const [activeTab, setActiveTab] = useState<Tab>('performance');

  const data = useMemo(() => MOCK_DATA[client], [client]);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 font-sans selection:bg-brand-blue/30 overflow-hidden flex flex-col md:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen overflow-y-auto overflow-x-hidden">
        <Header client={client} setClient={setClient} />

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={client + activeTab} // Triggers animation on client or tab change
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >

              {/* IA CONSOLE - Always visible at top */}
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-brand-blue via-indigo-500 to-purple-500 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] group">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                <div className="relative glass-card p-6 md:p-8 rounded-2xl bg-slate-950/80 border-none">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-brand-blue animate-pulse" />
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                      Nexus IA Console
                    </h2>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed font-light">
                    {data.iaInsight.split(/(Escalar|\+20%|15%|Meta|Google Search|Saturado)/g).map((part, i) =>
                      ['Escalar', '+20%', '15%', 'Meta', 'Google Search', 'Saturado'].includes(part) ?
                        <strong key={i} className="text-white font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>

              {activeTab === 'performance' && (
                <>
                  {/* KPIs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 ml:grid-cols-4 gap-6">
                    <KpiCard title="Investimento YTD" value={formatCurrency(data.kpis.spent)} icon={TrendingUp} delay={0.1} />
                    <KpiCard title="Leads Capturados" value={data.kpis.leads.toLocaleString()} icon={Users} delay={0.2} />
                    <KpiCard title="Target CPL" value={formatCurrency(data.kpis.cpl)} icon={Target} delay={0.3} />
                    <KpiCard title="Global ROAS" value={`${data.kpis.roas}x`} icon={Activity} delay={0.4} />
                  </div>

                  {/* CHART */}
                  <div className="glass-card p-6 h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-6">Mapeamento de Custo Preditivo (CPL)</h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <AreaChart data={data.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                          itemStyle={{ color: '#e2e8f0' }}
                          formatter={(value: any) => [formatCurrency(Number(value) || 0), undefined]}
                        />
                        <Area type="monotone" dataKey="meta" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorMeta)" activeDot={{ r: 6, strokeWidth: 0 }} />
                        <Area type="monotone" dataKey="google" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorGoogle)" activeDot={{ r: 6, strokeWidth: 0 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* CREATIVES LIST */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-6">Performance de Criativos & Fadiga</h3>
                    <div className="flex flex-col gap-4">
                      {data.creatives.map((creative, index) => (
                        <motion.div
                          key={creative.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="glass-card p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700 shadow-inner">
                              {creative.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-lg">{creative.name}</h4>
                              <p className="text-sm text-slate-400">Ativo Criativo</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-8 w-full md:w-auto md:flex items-center">
                            <div>
                              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Gasto</p>
                              <p className="font-semibold text-slate-200">{formatCurrency(creative.spent)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 uppercase font-bold mb-1">CPL</p>
                              <p className="font-semibold text-slate-200">{formatCurrency(creative.cpl)}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1 flex justify-end md:ml-8">
                              <CreativeBadge status={creative.status} />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'finance' && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white">Finanças Inteligentes B2B</h3>
                    <p className="text-slate-400 mt-2">Emissão em 1-clique e Auditoria em Tempo Real de Gastos vs Invoices.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.finance.map((acc, index) => (
                      <motion.div
                        key={acc.account}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-8 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-8">
                            <h4 className="text-xl font-bold text-white border-l-4 border-brand-blue pl-3">{acc.account}</h4>
                            {acc.status === 'Conciliado' ? (
                              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/20">
                                <CheckCircle2 className="w-4 h-4" /> Conciliado
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/20">
                                <AlertCircle className="w-4 h-4" /> {acc.status}
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-6 mb-10">
                            <div>
                              <p className="text-sm text-slate-400 font-medium mb-1">Saldo Atual da Plataforma</p>
                              <p className="text-2xl font-bold text-white">{formatCurrency(acc.balance)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-medium mb-1">Verba Aprovada (Cliente)</p>
                              <p className="text-2xl font-bold text-white">{formatCurrency(acc.approved)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-brand-electric text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] group"
                            onClick={() => alert(`Boleto gerado para ${acc.account}`)}
                          >
                            <Receipt className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                            Gerar Boleto
                          </button>
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.03]"
                            onClick={() => alert(`NF baixada para ${acc.account}`)}
                          >
                            <CloudDownload className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            Baixar NF
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
