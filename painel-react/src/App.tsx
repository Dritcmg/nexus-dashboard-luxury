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
  FileCheck2,
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

// --- MASSIVE MOCK DATA GENERATOR ---
const generateChartData = (baseGoogle: number, baseMeta: number, vol: number = 30): ChartData[] => {
  return Array.from({ length: vol }).map((_, i) => ({
    name: `Dia ${i + 1}`,
    google: baseGoogle + Math.random() * (baseGoogle * 0.4) * (Math.random() > 0.5 ? 1 : -1),
    meta: baseMeta + Math.random() * (baseMeta * 0.5) * (Math.random() > 0.5 ? 1 : -1),
  }));
};

const MOCK_DATA: Record<string, ClientData> = {
  'Incorporadora Alpha': {
    kpis: { spent: 458900.50, leads: 8240, cpl: 55.69, roas: 4.8, itemsDownloaded: 14205, percentage: 68 },
    chartData: generateChartData(90, 110),
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
  },
  'Construtora Beta': {
    kpis: { spent: 125000.00, leads: 1350, cpl: 92.59, roas: 2.1, itemsDownloaded: 4100, percentage: 22 },
    chartData: generateChartData(180, 150),
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
    iaInsight: "Alerta Crítico de Fadiga: O conjunto de anúncios 'Feirão Caixa' saturou no Meta Ads com CPL ultrapassando R$ 100. Sugerimos pausa imediata e geração de novas variações de texto Focadas no deficit habitacional. O formato de vídeo com 'Drone' continua segurando a conversão.",
  },
  'Residencial Gold': {
    kpis: { spent: 890000.00, leads: 22100, cpl: 40.27, roas: 8.5, itemsDownloaded: 56900, percentage: 94 },
    chartData: generateChartData(40, 50),
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
    iaInsight: "Cenário de Escala Exponencial Positiva: O CPL Global reduziu 18% nesta semana devido ao algoritmo de lookalike ter estabilizado. Escalonamento liberado para a campanha 'Lançamento Exclusivo - Black Card' em todas as redes em +35% de orçamento diário sem impacto negativo previsto no CPL.",
  }
};

type ClientKey = keyof typeof MOCK_DATA;
type Tab = 'performance' | 'finance';

// --- PIE CHART DATA ---
const pieData = [
  { name: 'Google', value: 400, color: '#4285F4' }, // Google Blue
  { name: 'Meta', value: 300, color: '#EA4335' }, // Google Red
  { name: 'TikTok', value: 150, color: '#FBBC05' }, // Google Yellow
  { name: 'LinkedIn', value: 50, color: '#34A853' }, // Google Green
];

// --- COMPONENTS ---
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value);

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) => (
  <aside className="fixed left-0 top-0 h-screen w-20 md:w-24 bg-[#4F46E5] z-50 flex flex-col items-center py-6 shadow-xl hidden md:flex">
    <div className="mb-12 cursor-pointer text-white hover:scale-110 transition-transform">
      <Menu className="w-8 h-8" strokeWidth={2.5} />
    </div>

    <nav className="flex-1 flex flex-col gap-8 w-full items-center">
      <button
        onClick={() => setActiveTab('performance')}
        className={cn(
          "p-3 rounded-2xl transition-all duration-300 relative",
          activeTab === 'performance' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
        )}>
        <Home className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>

      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 relative group">
        <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#EA4335] rounded-full border-2 border-[#4F46E5]"></span>
      </button>

      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 group">
        <User className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
      </button>

      <button
        onClick={() => setActiveTab('finance')}
        className={cn(
          "p-3 rounded-2xl transition-all duration-300 relative",
          activeTab === 'finance' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
        )}>
        <PieChartIcon className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>

      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 relative group">
        <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FBBC05] rounded-full border-2 border-[#4F46E5]"></span>
      </button>
    </nav>

    <div className="mt-auto">
      <button className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90">
        <Settings className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </button>
    </div>
  </aside>
);

const Header = ({ client, setClient }: { client: ClientKey, setClient: (c: ClientKey) => void }) => (
  <header className="h-24 flex items-center justify-between px-8 bg-transparent z-40 w-full">
    <div className="flex items-center gap-6 w-full lg:w-auto">
      {/* Mobile Menu Icon */}
      <Menu className="w-8 h-8 text-[#4F46E5] md:hidden" strokeWidth={2.5} />

      <div className="text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-2 mr-4 lg:mr-8 whitespace-nowrap">
        <div className="bg-[#4285F4] p-1.5 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        ADSPainel<span className="text-[#4285F4] font-medium">-PRO</span>
      </div>

      <div className="relative w-full max-w-sm hidden lg:block">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search Here"
          className="w-full bg-white border border-gray-100 text-gray-600 text-sm rounded-full py-3.5 pl-12 pr-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 transition-all"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative">
        <select
          value={client}
          onChange={(e) => setClient(e.target.value as ClientKey)}
          className="appearance-none bg-white text-indigo-900 font-bold text-sm lg:text-base rounded-full py-2.5 pl-6 pr-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] cursor-pointer outline-none hover:bg-gray-50 transition-colors border-2 border-transparent focus:border-[#4285F4]/50"
        >
          {Object.keys(MOCK_DATA).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-50 w-8 h-8 rounded-full flex items-center justify-center pointer-events-none">
          <ChevronDown className="w-4 h-4 text-[#4F46E5]" strokeWidth={3} />
        </div>
      </div>
    </div>
  </header>
);

const RightPanel = () => (
  <div className="w-full lg:w-[320px] bg-[#4F46E5] text-white flex flex-col items-center py-10 px-8 lg:rounded-l-[40px] shadow-2xl relative shrink-0">
    <div className="relative mb-6 group cursor-pointer">
      <div className="w-32 h-32 rounded-full bg-white/10 p-2 group-hover:bg-white/20 transition-colors">
        <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
          <User className="w-16 h-16 text-indigo-300" fill="currentColor" />
        </div>
      </div>
      <div className="absolute top-2 right-2 w-6 h-6 bg-[#34A853] rounded-full border-4 border-[#4F46E5]"></div>
    </div>
    <h2 className="text-2xl font-bold mb-8 tracking-tight">Atendimento ADS</h2>

    <div className="flex w-full justify-between bg-[#3730A3] p-5 rounded-3xl mb-10 text-center shadow-inner">
      <div>
        <p className="text-[10px] text-indigo-200 mb-1 uppercase tracking-wider font-semibold">Earning</p>
        <p className="text-[#34A853] font-black text-xl">$ 2314</p>
        <p className="text-[9px] text-indigo-300 mt-1">YTD Result</p>
      </div>
      <div>
        <p className="text-[10px] text-indigo-200 mb-1 uppercase tracking-wider font-semibold">Bonus</p>
        <p className="text-[#34A853] font-black text-xl">$ 200</p>
        <p className="text-[9px] text-indigo-300 mt-1">Monthly</p>
      </div>
      <div>
        <p className="text-[10px] text-indigo-200 mb-1 uppercase tracking-wider font-semibold">Favorite</p>
        <p className="text-[#34A853] font-black text-xl">12k</p>
        <p className="text-[9px] text-indigo-300 mt-1">Leads</p>
      </div>
    </div>

    <div className="w-full">
      <h3 className="text-sm font-bold mb-6 text-indigo-50">Overall Stats</h3>
      <div className="space-y-6">
        {[
          { name: 'Google Search Ads', percent: '80%', color: 'bg-[#4285F4]' },
          { name: 'Meta Ads (Insta/FB)', percent: '65%', color: 'bg-[#00E676]' },
          { name: 'TikTok Ads', percent: '40%', color: 'bg-[#4285F4]' },
          { name: 'LinkedIn B2B', percent: '90%', color: 'bg-[#00E676]' },
          { name: 'Programmatic Display', percent: '50%', color: 'bg-[#4285F4]' },
        ].map((stat, i) => (
          <div key={i} className="group cursor-default">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-indigo-100 font-medium group-hover:text-white transition-colors">{stat.name}</p>
              <span className="text-[10px] text-indigo-300">{stat.percent}</span>
            </div>
            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stat.percent }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={cn("h-full rounded-full", stat.color)}
              ></motion.div>
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
    <div className="h-64 rounded-[30px] bg-white/60 animate-pulse border border-gray-100"></div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="h-[400px] rounded-[30px] bg-white/60 animate-pulse border border-gray-100"></div>
      <div className="h-[400px] rounded-[30px] bg-white/60 animate-pulse border border-gray-100"></div>
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
        loading: `Gerando Boleto para ${accName}...`,
        success: `Boleto enviado com sucesso para o cliente!`,
        error: 'Erro ao gerar o boleto.',
      }
    );
  };

  const handleDownloadNF = (accName: string) => {
    const toastId = toast.loading(`Processando Nota Fiscal de Serviço (NFS-e) para ${accName}...`);
    setTimeout(() => {
      toast.success(`Download concluído! Verifique a pasta Downloads.`, { id: toastId });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] text-gray-800 font-sans selection:bg-[#4285F4]/30 overflow-hidden flex flex-col md:flex-row">
      <Toaster position="bottom-right" className="!font-sans" toastOptions={{
        style: { borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }
      }} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 md:ml-24 flex flex-col min-h-screen overflow-y-auto w-full">
        <Header client={client} setClient={setClient} />

        <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto">
          {/* Central Main Content Area */}
          <main className="flex-1 px-4 lg:px-8 pb-10 w-full">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <SkeletonScreen key="skeleton" />
              ) : (
                <motion.div
                  key={`${client}-${activeTab}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6 w-full"
                >

                  {activeTab === 'performance' && (
                    <>
                      {/* IA CONSOLE - Highlighted and Dynamic */}
                      <div className="bg-white rounded-[30px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4285F4]/10 to-[#EA4335]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                        <div className="relative z-10 flex flex-col h-full justify-center">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#FBBC05]/20 p-2 rounded-xl">
                              <Sparkles className="w-5 h-5 text-[#FBBC05]" fill="currentColor" />
                            </div>
                            <h2 className="text-sm font-black text-indigo-900 uppercase tracking-widest">
                              IA Executive Summary
                            </h2>
                          </div>
                          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                            {data.iaInsight.split(/(Google Search|Meta Ads|CPL|Fadiga|Escalonamento|Alerta Crítico|Cenário de Escala)/gi).map((part, i) => {
                              const lowerPart = part.toLowerCase();
                              if (['google search', 'meta ads', 'cpl'].includes(lowerPart)) return <strong key={i} className="text-[#4285F4]">{part}</strong>;
                              if (['fadiga', 'alerta crítico'].includes(lowerPart)) return <strong key={i} className="text-[#EA4335]">{part}</strong>;
                              if (['escalonamento', 'cenário de escala'].includes(lowerPart)) return <strong key={i} className="text-[#34A853]">{part}</strong>;
                              return part;
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Top Chart Area (Overview) */}
                      <div className="bg-white rounded-[30px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-[380px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-indigo-900">Comparativo CPL Diário</h3>
                            <p className="text-sm text-gray-500 mt-1">Google Ads vs Meta Ads</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><div className="w-3 h-3 rounded-full bg-[#4285F4]"></div> Google</span>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 ml-3"><div className="w-3 h-3 rounded-full bg-[#EA4335]"></div> Meta</span>
                          </div>
                        </div>
                        <div className="flex-1 min-h-0 relative -ml-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val}`} />
                              <RechartsTooltip
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '16px', color: '#1e293b', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                itemStyle={{ fontSize: '13px', fontWeight: 700, padding: '4px 0' }}
                                labelStyle={{ color: '#64748b', marginBottom: '8px', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}
                                formatter={(value: any) => [formatCurrency(Number(value) || 0), undefined]}
                              />
                              <Area type="monotone" dataKey="meta" name="Meta Ads" stroke="#EA4335" strokeWidth={3} fillOpacity={0.1} fill="#EA4335" activeDot={{ r: 8, strokeWidth: 0, fill: '#EA4335' }} animationDuration={1000} />
                              <Area type="monotone" dataKey="google" name="Google Ads" stroke="#4285F4" strokeWidth={3} fillOpacity={0.1} fill="#4285F4" activeDot={{ r: 8, strokeWidth: 0, fill: '#4285F4' }} animationDuration={1000} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                        {/* Table Creatives */}
                        <div className="bg-white rounded-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden h-full flex flex-col">
                          <div className="p-6 md:p-8 pb-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-indigo-900">Performance de Criativos</h3>
                            <button className="text-[#4285F4] text-sm font-bold hover:underline">Ver Todos</button>
                          </div>
                          <div className="overflow-x-auto flex-1 p-2">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr>
                                  <th className="py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Nome do Criativo</th>
                                  <th className="py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">Gasto</th>
                                  <th className="py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-center">Análise IA</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.creatives.map((creative, i) => (
                                  <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                                  >
                                    <td className="py-4 px-6 border-b border-gray-50">
                                      <div className="font-bold text-gray-800 text-sm group-hover:text-[#4285F4] transition-colors">{creative.name}</div>
                                      <div className="text-xs text-gray-400 mt-1">CPL: {formatCurrency(creative.cpl)}</div>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-50 text-right font-bold text-indigo-900">
                                      {formatCurrency(creative.spent)}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-50 text-center">
                                      <span className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm border",
                                        creative.status === 'Escalar' && "bg-[#34A853]/10 text-[#34A853] border-[#34A853]/20",
                                        creative.status === 'Trocar' && "bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/20",
                                        creative.status === 'Manter' && "bg-[#FBBC05]/10 text-yellow-600 border-[#FBBC05]/20"
                                      )}>
                                        {creative.status === 'Escalar' && <TrendingUp className="w-3.5 h-3.5" />}
                                        {creative.status === 'Trocar' && <AlertCircle className="w-3.5 h-3.5" />}
                                        {creative.status === 'Manter' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                        {creative.status === 'Escalar' ? 'Performance Alta - Escalar' :
                                          creative.status === 'Trocar' ? 'Saturado - Trocar' : 'Estável - Manter'}
                                      </span>
                                    </td>
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Top KPIs & Pie Grid */}
                        <div className="flex flex-col gap-6 h-full">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Investimento */}
                            <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#4285F4]/5 rounded-full blur-xl"></div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Investimento Total</p>
                              <p className="text-[10px] text-gray-400 mb-4 font-medium">Platform YTD</p>
                              <p className="text-2xl lg:text-3xl font-black text-gray-800 mb-2 truncate" title={formatCurrency(data.kpis.spent)}>
                                {formatCurrency(data.kpis.spent)}
                              </p>
                            </div>
                            {/* Leads */}
                            <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#34A853]/5 rounded-full blur-xl"></div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Leads Totais</p>
                              <p className="text-[10px] text-gray-400 mb-4 font-medium">CRM Synced</p>
                              <p className="text-2xl lg:text-3xl font-black text-gray-800 mb-2 truncate">
                                {data.kpis.leads.toLocaleString('pt-BR')}
                              </p>
                            </div>
                            {/* CPL */}
                            <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">CPL Médio</p>
                              <p className="text-[10px] text-gray-400 mb-4 font-medium">Cost per Lead</p>
                              <p className="text-2xl lg:text-3xl font-black text-gray-800 mb-2 truncate">
                                {formatCurrency(data.kpis.cpl)}
                              </p>
                            </div>
                            {/* ROAS */}
                            <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 to-[#4F46E5] text-white">
                              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">ROAS Global</p>
                              <p className="text-[10px] text-indigo-300 mb-4 font-medium">Return on Ad Spend</p>
                              <p className="text-2xl lg:text-3xl font-black text-white mb-2 truncate flex items-center gap-2">
                                {data.kpis.roas}x <TrendingUp className="w-5 h-5 text-[#34A853]" />
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col items-center justify-center flex-1">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest absolute top-6 left-6">Platform Distribution</h3>
                            <div className="w-[180px] h-[180px] relative mt-8">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={pieData}
                                    innerRadius={65}
                                    outerRadius={85}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={6}
                                  >
                                    {pieData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-indigo-900">4</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Fontes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'finance' && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-[30px] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#34A853]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 max-w-3xl">
                          <h3 className="text-3xl font-black text-indigo-900 mb-3 tracking-tight">Hub Financeiro B2B</h3>
                          <p className="text-gray-500 text-base md:text-lg font-medium">
                            Conferência automática baseada em inteligência artificial. Emitimos Notas Fiscais de Prestação de Serviço e Boletos consolidados em apenas 1-clique.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {data.finance.map((acc, index) => {
                          const conciled = acc.status === 'Conciliado';

                          return (
                            <motion.div
                              key={acc.account}
                              initial={{ opacity: 0, scale: 0.98, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white rounded-[30px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-8 group hover:border-[#4285F4]/30 transition-colors"
                            >
                              <div className="w-full xl:w-auto flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="bg-indigo-50 p-2.5 rounded-xl">
                                    <Wallet className="w-5 h-5 text-[#4F46E5]" />
                                  </div>
                                  <h4 className="text-xl font-bold text-gray-800">{acc.account}</h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Saldo Atual Gasto</p>
                                    <p className="text-2xl font-black text-gray-800">{formatCurrency(acc.balance)}</p>
                                  </div>
                                  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Verba Aprovada</p>
                                    <p className="text-2xl font-black text-gray-800">{formatCurrency(acc.approved)}</p>
                                  </div>
                                  <div className={cn(
                                    "p-4 rounded-2xl border flex flex-col justify-center",
                                    conciled ? "bg-[#34A853]/5 border-[#34A853]/20" : "bg-[#EA4335]/5 border-[#EA4335]/20"
                                  )}>
                                    <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", conciled ? "text-[#34A853]" : "text-[#EA4335]")}>NF vs Gasto Estimado</p>
                                    <div className="flex items-center gap-2">
                                      {conciled ? <CheckCircle2 className="w-6 h-6 text-[#34A853]" /> : <AlertCircle className="w-6 h-6 text-[#EA4335]" />}
                                      <span className={cn("text-lg font-black", conciled ? "text-[#34A853]" : "text-[#EA4335]")}>{acc.status}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row xl:flex-col gap-3 w-full xl:w-56 shrink-0">
                                <button
                                  className="flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-blue-600 text-white py-3.5 px-6 rounded-2xl font-bold transition-all duration-300 shadow-[0_8px_20px_rgb(66,133,244,0.3)] hover:shadow-[0_8px_25px_rgb(66,133,244,0.4)] hover:-translate-y-0.5 w-full"
                                  onClick={() => handleGenBoleto(acc.account)}
                                >
                                  <Receipt className="w-5 h-5" /> Gerar Boleto
                                </button>
                                <button
                                  className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#4F46E5] text-gray-600 hover:text-[#4F46E5] py-3.5 px-6 rounded-2xl font-bold transition-all duration-300 w-full hover:bg-indigo-50"
                                  onClick={() => handleDownloadNF(acc.account)}
                                >
                                  <FileCheck2 className="w-5 h-5" /> Baixar NF
                                </button>
                              </div>
                            </motion.div>
                          )
                        })}
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
