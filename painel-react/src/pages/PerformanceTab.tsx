import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { ClientData } from '../types';
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
            <div className="google-card p-6 relative overflow-hidden group bg-gradient-to-r from-blue-50/50 to-transparent">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-blue/10 to-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#e8f0fe] p-1.5 rounded-md">
                            <Sparkles className="w-4 h-4 text-brand-blue" fill="currentColor" />
                        </div>
                        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            IA Executive Summary
                        </h2>
                    </div>
                    <p className="text-base text-text-primary leading-relaxed">
                        {data.iaInsight.split(/(Google Search|Meta Ads|CPL|Fadiga|Escalonamento|Alerta Crítico|Cenário de Escala)/gi).map((part, i) => {
                            const lowerPart = part.toLowerCase();
                            if (['google search', 'meta ads', 'cpl'].includes(lowerPart)) return <strong key={i} className="text-brand-blue font-semibold">{part}</strong>;
                            if (['fadiga', 'alerta crítico'].includes(lowerPart)) return <strong key={i} className="text-brand-red font-semibold">{part}</strong>;
                            if (['escalonamento', 'cenário de escala'].includes(lowerPart)) return <strong key={i} className="text-brand-green font-semibold">{part}</strong>;
                            return part;
                        })}
                    </p>
                </div>
            </div>

            {/* Top Chart Area (Overview) */}
            <div className="google-card p-6 h-[380px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-medium text-text-primary">Comparativo CPL Diário</h3>
                        <p className="text-xs text-text-secondary mt-1">Google Ads vs Meta Ads • Últimos 30 dias</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-text-secondary"><div className="w-2.5 h-2.5 rounded-sm bg-brand-blue"></div> Google Ads</span>
                        <span className="flex items-center gap-1.5 text-xs text-text-secondary"><div className="w-2.5 h-2.5 rounded-sm bg-brand-red"></div> Meta Ads</span>
                    </div>
                </div>
                <div className="flex-1 min-h-0 relative -ml-4 mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#dadce0" vertical={false} />
                            <XAxis dataKey="name" stroke="#80868b" tick={{ fill: '#80868b', fontSize: 11 }} axisLine={false} tickLine={false} dy={10} minTickGap={30} />
                            <YAxis stroke="#80868b" tick={{ fill: '#80868b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val}`} />
                            <RechartsTooltip
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#dadce0', borderRadius: '4px', color: '#202124', boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)', padding: '12px' }}
                                itemStyle={{ fontSize: '13px', padding: '4px 0' }}
                                labelStyle={{ color: '#5f6368', marginBottom: '8px', fontSize: '12px', borderBottom: '1px solid #dadce0', paddingBottom: '4px' }}
                                formatter={(value: any) => [formatCurrency(Number(value) || 0), undefined]}
                            />
                            <Area type="monotone" dataKey="meta" name="Meta Ads" stroke="var(--color-brand-red)" strokeWidth={2} fillOpacity={0.05} fill="var(--color-brand-red)" activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-brand-red)' }} animationDuration={1000} />
                            <Area type="monotone" dataKey="google" name="Google Ads" stroke="var(--color-brand-blue)" strokeWidth={2} fillOpacity={0.05} fill="var(--color-brand-blue)" activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-brand-blue)' }} animationDuration={1000} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                {/* Table Creatives */}
                <div className="google-card overflow-hidden h-full flex flex-col">
                    <div className="py-4 px-6 border-b border-surface-border flex justify-between items-center bg-white">
                        <h3 className="text-base font-medium text-text-primary">Performance de Criativos</h3>
                        <button className="text-brand-blue text-sm hover:underline hover:text-brand-blue-hover transition-colors">Ver Todos</button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 text-[11px] font-medium text-text-secondary uppercase tracking-wider border-b border-surface-border w-[45%]">Nome do Criativo</th>
                                    <th className="py-3 px-6 text-[11px] font-medium text-text-secondary uppercase tracking-wider border-b border-surface-border text-right">Gasto</th>
                                    <th className="py-3 px-6 text-[11px] font-medium text-text-secondary uppercase tracking-wider border-b border-surface-border text-center">Análise IA</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-border">
                                {data.creatives.map((creative, i) => (
                                    <motion.tr
                                        key={creative.name}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.05 * i }}
                                        className="hover:bg-[#f8f9fa] transition-colors group cursor-pointer"
                                    >
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    creative.status === 'Escalar' ? "bg-brand-green" :
                                                        creative.status === 'Trocar' ? "bg-brand-red" : "bg-brand-yellow"
                                                )}></div>
                                                <div>
                                                    <div className="font-medium text-text-primary text-[13px] group-hover:text-brand-blue transition-colors line-clamp-1">{creative.name}</div>
                                                    <div className="text-[11px] text-text-secondary mt-0.5">CPL: {formatCurrency(creative.cpl)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right text-[13px] font-medium text-text-primary">
                                            {formatCurrency(creative.spent)}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap",
                                                creative.status === 'Escalar' && "bg-[#e6f4ea] text-[#137333]",
                                                creative.status === 'Trocar' && "bg-[#fce8e6] text-[#c5221f]",
                                                creative.status === 'Manter' && "bg-[#fef7e0] text-[#b06000]"
                                            )}>
                                                {creative.status === 'Escalar' && <TrendingUp className="w-3 h-3" />}
                                                {creative.status === 'Trocar' && <AlertCircle className="w-3 h-3" />}
                                                {creative.status === 'Manter' && <CheckCircle2 className="w-3 h-3" />}
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
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Investimento */}
                        <div className="google-card p-5 flex flex-col justify-center relative group">
                            <p className="text-[11px] font-medium text-text-secondary mb-1 flex items-center justify-between">
                                Investimento Total
                                <span className="p-1 hover:bg-surface-hover rounded-full cursor-pointer"><AlertCircle className="w-3 h-3" /></span>
                            </p>
                            <p className="text-2xl md:text-3xl font-normal text-text-primary mb-2 tracking-tight">
                                {formatCurrency(data.kpis.spent)}
                            </p>
                            <p className="text-[11px] text-text-secondary flex items-center gap-1">
                                <span className="text-[#137333] font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 24%</span> vs mês anterior
                            </p>
                            {/* Pacing Bar Mock */}
                            <div className="w-full h-1 bg-surface-border mt-3 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-blue rounded-full w-[65%]"></div>
                            </div>
                        </div>
                        {/* Leads */}
                        <div className="google-card p-5 flex flex-col justify-center relative group">
                            <p className="text-[11px] font-medium text-text-secondary mb-1 flex items-center justify-between">
                                Leads Totais
                                <span className="p-1 hover:bg-surface-hover rounded-full cursor-pointer"><AlertCircle className="w-3 h-3" /></span>
                            </p>
                            <p className="text-2xl md:text-3xl font-normal text-text-primary mb-2 tracking-tight">
                                {data.kpis.leads.toLocaleString('pt-BR')}
                            </p>
                            <p className="text-[11px] text-text-secondary flex items-center gap-1">
                                <span className="text-[#137333] font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 12.5%</span> vs mês anterior
                            </p>
                        </div>
                        {/* CPL */}
                        <div className="google-card p-5 flex flex-col justify-center relative group">
                            <p className="text-[11px] font-medium text-text-secondary mb-1 flex items-center justify-between">
                                CPL Médio
                                <span className="p-1 hover:bg-surface-hover rounded-full cursor-pointer"><AlertCircle className="w-3 h-3" /></span>
                            </p>
                            <p className="text-2xl md:text-3xl font-normal text-text-primary mb-2 tracking-tight">
                                {formatCurrency(data.kpis.cpl)}
                            </p>
                            <p className="text-[11px] text-text-secondary flex items-center gap-1">
                                <span className="text-[#c5221f] font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 4.2%</span> vs mês anterior
                            </p>
                        </div>
                        {/* ROAS */}
                        <div className="google-card p-5 flex flex-col justify-center relative group border-t-4 border-t-brand-blue">
                            <p className="text-[11px] font-medium text-text-secondary mb-1 flex items-center justify-between">
                                ROAS Global
                                <span className="p-1 hover:bg-surface-hover rounded-full cursor-pointer"><AlertCircle className="w-3 h-3" /></span>
                            </p>
                            <p className="text-2xl md:text-3xl font-normal text-text-primary mb-2 tracking-tight flex items-center gap-2">
                                {data.kpis.roas}x
                            </p>
                            <p className="text-[11px] text-text-secondary flex items-center gap-1">
                                Baseline CRM
                            </p>
                        </div>
                    </div>

                    <div className="google-card p-6 relative flex flex-col items-center justify-center flex-1">
                        <h3 className="text-xs font-medium text-text-primary absolute top-4 left-6">Platform Distribution</h3>
                        <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] relative mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={GLOBAL_PIE_DATA}
                                        innerRadius={55}
                                        outerRadius={75}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={2}
                                    >
                                        {GLOBAL_PIE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xl font-medium text-text-primary">4</span>
                                <span className="text-[10px] text-text-secondary mt-0.5">Fontes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
