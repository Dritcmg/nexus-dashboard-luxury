import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ClientData } from '../types';
import { GLOBAL_PIE_DATA } from '../mocks/data';
import { cn } from '../utils/cn';

interface Props {
    data: ClientData;
    formatCurrency: (val: number) => string;
}

export const PerformanceTab = ({ data, formatCurrency }: Props) => {
    return (
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
                                        key={creative.name}
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
                                                "px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm border whitespace-nowrap",
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
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {/* Investimento */}
                        <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#4285F4]/5 rounded-full blur-xl"></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Investimento Total</p>
                            <p className="text-[10px] text-gray-400 mb-4 font-medium">Platform YTD</p>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800 mb-2 truncate" title={formatCurrency(data.kpis.spent)}>
                                {formatCurrency(data.kpis.spent)}
                            </p>
                        </div>
                        {/* Leads */}
                        <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#34A853]/5 rounded-full blur-xl"></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Leads Totais</p>
                            <p className="text-[10px] text-gray-400 mb-4 font-medium">CRM Synced</p>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800 mb-2 truncate">
                                {data.kpis.leads.toLocaleString('pt-BR')}
                            </p>
                        </div>
                        {/* CPL */}
                        <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">CPL Médio</p>
                            <p className="text-[10px] text-gray-400 mb-4 font-medium">Cost per Lead</p>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800 mb-2 truncate">
                                {formatCurrency(data.kpis.cpl)}
                            </p>
                        </div>
                        {/* ROAS */}
                        <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 to-[#4F46E5] text-white">
                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">ROAS Global</p>
                            <p className="text-[10px] text-indigo-300 mb-4 font-medium">Return on Ad Spend</p>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2 truncate flex items-center gap-2">
                                {data.kpis.roas}x <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#34A853]" />
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[30px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col items-center justify-center flex-1">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest absolute top-6 left-6">Platform Distribution</h3>
                        <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] relative mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={GLOBAL_PIE_DATA}
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={6}
                                    >
                                        {GLOBAL_PIE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl md:text-3xl font-black text-indigo-900">4</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Fontes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
