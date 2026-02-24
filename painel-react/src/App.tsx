import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import {
  Menu,
  Home,
  Mail,
  User,
  PieChart as PieChartIcon,
  Bell,
  Settings,
  Sparkles,
  TrendingUp,
  Wallet,
  Receipt,
  CloudDownload,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- TYPES & INTERFACES ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface KpiProps {
  title: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
  color?: string;
  delay: number;
}

export interface ChartData {
  name: string;
  google: number;
  meta: number;
}

export interface Creative {
  name: string;
  spent: number;
  cpl: number;
  status: 'Escalar' | 'Trocar' | 'Manter';
  icon: string;
}

export interface FinanceAccount {
  account: string;
  balance: number;
  approved: number;
  status: 'Conciliado' | 'Pendente' | 'Divergência';
}

export interface ClientData {
  kpis: { spent: number; leads: number; cpl: number; roas: number; itemsDownloaded: number; percentage: number };
  chartData: ChartData[];
  creatives: Creative[];
  finance: FinanceAccount[];
  iaInsight: string;
}

// --- MOCK DATA GENERATOR ---
const generateChartData = (baseGoogle: number, baseMeta: number): ChartData[] => {
  return Array.from({ length: 6 }).map((_, i) => ({
    name: `0${i + 1}`,
    google: baseGoogle + Math.random() * (baseGoogle * 0.8),
    meta: baseMeta + Math.random() * (baseMeta * 0.8),
  }));
};

const MOCK_DATA: Record<string, ClientData> = {
  'Incorporadora Alpha': {
    kpis: { spent: 145000, leads: 2340, cpl: 61.96, roas: 4.2, itemsDownloaded: 12345, percentage: 43 },
    chartData: generateChartData(1000, 1500),
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
    kpis: { spent: 89000, leads: 980, cpl: 90.81, roas: 2.8, itemsDownloaded: 8432, percentage: 28 },
    chartData: generateChartData(1200, 1100),
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
    kpis: { spent: 210000, leads: 4500, cpl: 46.66, roas: 6.5, itemsDownloaded: 24500, percentage: 89 },
    chartData: generateChartData(800, 2000),
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

// --- PIE CHART DATA ---
const pieData = [
  { name: 'Google', value: 400, color: '#4285F4' }, // Blue
  { name: 'Meta', value: 300, color: '#EA4335' }, // Red
  { name: 'TikTok', value: 300, color: '#FBBC05' }, // Yellow
  { name: 'LinkedIn', value: 200, color: '#34A853' }, // Green
];

// --- COMPONENTS ---
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) => (
  <aside className="fixed left-0 top-0 h-screen w-20 md:w-24 bg-[#4F46E5] z-50 flex flex-col items-center py-6 shadow-xl">
    {/* Hamburger Menu top */}
    <div className="mb-12 cursor-pointer text-white">
      <Menu className="w-8 h-8" strokeWidth={2.5} />
    </div>

    <nav className="flex-1 flex flex-col gap-8 w-full items-center">
      <button
        onClick={() => setActiveTab('performance')}
        className={cn(
          "p-3 rounded-2xl transition-all duration-300 relative",
          activeTab === 'performance' ? "bg-white/20 text-white" : "text-indigo-200 hover:text-white hover:bg-white/10"
        )}>
        <Home className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>

      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 relative">
        <Mail className="w-6 h-6" fill="currentColor" strokeWidth={0} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#4F46E5]"></span>
      </button>

      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300">
        <User className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>

      <button
        onClick={() => setActiveTab('finance')}
        className={cn(
          "p-3 rounded-2xl transition-all duration-300",
          activeTab === 'finance' ? "bg-white/20 text-white" : "text-indigo-200 hover:text-white hover:bg-white/10"
        )}>
        <PieChartIcon className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>

      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 relative">
        <Bell className="w-6 h-6" fill="currentColor" strokeWidth={0} />
        <span className="absolute top-2 right-3 w-2 h-2 bg-yellow-400 rounded-full border border-[#4F46E5]"></span>
      </button>
    </nav>

    <div className="mt-auto">
      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300">
        <Settings className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>
    </div>
  </aside>
);

const Header = ({ client, setClient }: { client: ClientKey, setClient: (c: ClientKey) => void }) => (
  <header className="h-24 flex items-center justify-between px-8 bg-transparent z-40">
    <div className="flex items-center gap-6">
      <div className="text-2xl font-black text-indigo-600 tracking-tight flex items-center gap-2 mr-8">
        <Sparkles className="w-6 h-6 text-brand-blue" />
        ADSPainel-PRO
      </div>

      <div className="relative w-96 hidden lg:block">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search Here"
          className="w-full bg-white border-0 text-gray-600 text-sm rounded-full py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative">
        <select
          value={client}
          onChange={(e) => setClient(e.target.value as ClientKey)}
          className="appearance-none bg-white text-indigo-600 font-bold text-sm rounded-full py-2.5 pl-6 pr-10 shadow-sm cursor-pointer outline-none hover:bg-indigo-50 transition-colors border-0"
        >
          {Object.keys(MOCK_DATA).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-indigo-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  </header>
);

const RightPanel = () => (
  <div className="w-full lg:w-80 bg-[#4F46E5] text-white flex flex-col items-center py-10 px-8 rounded-l-[40px] shadow-2xl relative">
    {/* Profile */}
    <div className="relative mb-6">
      <div className="w-32 h-32 rounded-full bg-white/20 p-2">
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <User className="w-16 h-16 text-gray-400" fill="currentColor" />
        </div>
      </div>
      <div className="absolute top-0 right-2 w-6 h-6 bg-[#00E676] rounded-full border-4 border-[#4F46E5]"></div>
    </div>
    <h2 className="text-2xl font-semibold mb-8">Jane Lauren</h2>

    {/* Stats Row */}
    <div className="flex w-full justify-between bg-indigo-900/40 p-5 rounded-2xl mb-10 text-center">
      <div>
        <p className="text-xs text-indigo-200 mb-1">Earning</p>
        <p className="text-[#00E676] font-bold text-xl">$ 2314</p>
        <p className="text-[10px] text-indigo-300 mt-1">Lorem Ipsum</p>
      </div>
      <div>
        <p className="text-xs text-indigo-200 mb-1">Bonus</p>
        <p className="text-[#00E676] font-bold text-xl">$ 200</p>
        <p className="text-[10px] text-indigo-300 mt-1">Lorem Ipsum</p>
      </div>
      <div>
        <p className="text-xs text-indigo-200 mb-1">Favorite</p>
        <p className="text-[#00E676] font-bold text-xl">12,340</p>
        <p className="text-[10px] text-indigo-300 mt-1">Lorem Ipsum</p>
      </div>
    </div>

    {/* Overall Stats Progress Bars */}
    <div className="w-full">
      <h3 className="text-sm font-medium mb-6">Overall Stats</h3>
      <div className="space-y-5">
        {[
          { name: 'Service 01', percent: '80%' },
          { name: 'Service 02', percent: '65%' },
          { name: 'Service 03', percent: '40%' },
          { name: 'Service 04', percent: '90%' },
          { name: 'Service 05', percent: '50%' },
        ].map((stat, i) => (
          <div key={i}>
            <p className="text-xs mb-2 text-indigo-100">{stat.name}</p>
            <div className="w-full h-2.5 bg-indigo-900/50 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full", i % 2 === 0 ? "bg-[#00E676]" : "bg-[#4285F4]")}
                style={{ width: stat.percent }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6 w-full pointer-events-none"
  >
    <div className="h-64 rounded-2xl bg-gray-200 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-48 rounded-2xl bg-gray-200 animate-pulse"></div>
      <div className="h-48 rounded-2xl bg-gray-200 animate-pulse"></div>
    </div>
  </motion.div>
);

// --- MAIN APP ---
export default function App() {
  const [client, setClient] = useState<ClientKey>('Incorporadora Alpha');
  const [activeTab, setActiveTab] = useState<Tab>('performance');
  const [isLoading, setIsLoading] = useState(false);

  const data = useMemo(() => MOCK_DATA[client], [client]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [client]);

  const handleGenBoleto = (accName: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Processando faturamento para ${accName}...`,
        success: `Boleto de ${accName} enviado com sucesso!`,
        error: 'Erro ao gerar o boleto.',
      }
    );
  };

  const handleDownloadNF = (accName: string) => {
    const toastId = toast.loading(`Preparando Nota Fiscal: ${accName}...`);
    setTimeout(() => {
      toast.success(`Download de SIMULACAO_NFS_${accName}.pdf iniciado!`, { id: toastId });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] text-gray-800 font-sans selection:bg-brand-blue/30 overflow-hidden flex flex-col md:flex-row">
      <Toaster position="bottom-right" className="!font-sans" />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 md:ml-24 flex flex-col min-h-screen overflow-y-auto">
        <Header client={client} setClient={setClient} />

        <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
          {/* Central Main Content Area */}
          <main className="flex-1 px-8 pb-10">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <SkeletonScreen key="skeleton" />
              ) : (
                <motion.div
                  key={`${client}-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  {activeTab === 'performance' && (
                    <>
                      {/* Top Chart Area (Overview) */}
                      <div className="white-card p-6 pb-2 h-[320px] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-indigo-900">Overview</h3>
                          <button className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                            <ChevronDown className="w-3 h-3" /> All List
                          </button>
                        </div>
                        <div className="flex-1 min-h-0 relative">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                              <RechartsTooltip
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#f1f5f9', borderRadius: '12px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                              />
                              <Area type="monotone" dataKey="meta" name="Service A" stroke="#0D9488" strokeWidth={2.5} fillOpacity={0} activeDot={{ r: 6 }} animationDuration={800} />
                              <Area type="monotone" dataKey="google" name="Service B" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={0} activeDot={{ r: 6 }} animationDuration={800} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Ranking */}
                        <div className="white-card p-6 relative">
                          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Top Ranking</h3>
                          <div className="space-y-4">
                            {[
                              { label: 'Adipisicing', val: '38%' },
                              { label: 'Consectetuer', val: '19%' },
                              { label: 'Dolor sit', val: '24%' },
                              { label: 'Lorem ipsum', val: '45%' },
                              { label: 'Sed diam', val: '38%' },
                              { label: 'Nonummy', val: '61%' },
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center relative text-xs text-gray-500">
                                <span>{item.label}</span>
                                <div className="absolute left-24 right-10 top-1/2 border-b border-gray-200"></div>
                                <span className="font-semibold text-gray-700">{item.val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-6">
                          {/* Pie Chart */}
                          <div className="white-card p-6 relative flex flex-col items-center justify-center">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest absolute top-6 left-6">Chart</h3>
                            <div className="w-[140px] h-[140px] relative mt-4">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={pieData}
                                    innerRadius={50}
                                    outerRadius={65}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                  >
                                    {pieData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-indigo-900">105</span>
                                <span className="text-[8px] text-gray-400 uppercase">Your Text Here</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 mt-4 text-[9px] text-gray-500 font-medium">
                              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#4F46E5] rounded-sm"></div> Lorem ipsum 01</span>
                              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#FBBC05] rounded-sm"></div> Lorem ipsum 02</span>
                              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#EA4335] rounded-sm"></div> Lorem ipsum 03</span>
                              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#0D9488] rounded-sm"></div> Lorem ipsum 04</span>
                            </div>
                          </div>

                          {/* Mini Cards Row */}
                          <div className="grid grid-cols-2 gap-6 h-full">
                            <div className="white-card p-5 flex flex-col justify-center">
                              <p className="text-[10px] font-bold text-gray-400 uppercase">All Items Download</p>
                              <p className="text-[9px] text-gray-400 mt-1 mb-2">Lorem ipsum dolor sit amet</p>
                              <p className="text-2xl font-bold text-[#0D9488] flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> {data.kpis.itemsDownloaded.toLocaleString()}
                              </p>
                            </div>
                            <div className="white-card p-5 flex flex-col justify-center">
                              <p className="text-[10px] font-bold text-gray-400 uppercase">Percentage</p>
                              <p className="text-[9px] text-gray-400 mt-1 mb-2">Lorem ipsum dolor sit amet</p>
                              <p className="text-2xl font-bold text-[#0D9488] flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> {data.kpis.percentage}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* IA CONSOLE - Light mode adapted */}
                      <div className="white-card border-l-4 border-l-brand-blue p-6 mt-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-5 h-5 text-brand-yellow" fill="currentColor" />
                          <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">
                            AI Preditiva Console
                          </h2>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                          {data.iaInsight}
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === 'finance' && (
                    <div className="space-y-6">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-indigo-900">Hub Financeiro B2B</h3>
                        <p className="text-gray-500 mt-1 text-sm">Transparência financeira e geração rápida de relatórios contábeis.</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {data.finance.map((acc) => (
                          <motion.div
                            key={acc.account}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="white-card p-6 flex flex-col md:flex-row justify-between items-center"
                          >
                            <div className="mb-6 md:mb-0 w-full md:w-auto">
                              <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-brand-blue" />
                                {acc.account}
                              </h4>
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-xs text-gray-400 font-bold uppercase">Saldo Atual</p>
                                  <p className="text-lg font-bold text-gray-800">{formatCurrency(acc.balance)}</p>
                                </div>
                                <div className="h-8 border-l border-gray-200"></div>
                                <div>
                                  <p className="text-xs text-gray-400 font-bold uppercase">Verba Aprovada</p>
                                  <p className="text-lg font-bold text-gray-800">{formatCurrency(acc.approved)}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                              <div className={cn(
                                "flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold mr-4",
                                acc.status === 'Conciliado' ? "bg-emerald-50 text-emerald-600" : "bg-yellow-50 text-yellow-600"
                              )}>
                                {acc.status === 'Conciliado' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                {acc.status}
                              </div>

                              <button
                                className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white py-2.5 px-5 rounded-full font-bold transition-all duration-300 shadow-md shadow-indigo-500/30"
                                onClick={() => handleGenBoleto(acc.account)}
                              >
                                <Receipt className="w-4 h-4" /> Boleto
                              </button>
                              <button
                                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#4F46E5] text-gray-600 hover:text-[#4F46E5] py-2.5 px-5 rounded-full font-bold transition-all duration-300"
                                onClick={() => handleDownloadNF(acc.account)}
                              >
                                <CloudDownload className="w-4 h-4" /> Nota Fiscal
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Right Fixed Panel (as per image) */}
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
