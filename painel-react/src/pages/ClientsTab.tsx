import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { MOCK_DATA } from '../mocks/data';
import { cn } from '../utils/cn';

export const ClientsTab = () => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="google-card p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#e8f0fe] p-2 rounded-lg">
                        <Users className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-text-primary">Visão de Clientes (Agência)</h3>
                </div>
                <p className="text-text-secondary text-sm">
                    Panorama geral da saúde da sua carteira, comparando ROAS, Investimentos e Performance Absoluta.
                </p>
            </div>

            {/* Client Cards */}
            <div className="grid grid-cols-1 gap-4">
                {Object.entries(MOCK_DATA).map(([clientName, clientData], index) => {
                    const healthy = clientData.kpis.roas >= 3;

                    return (
                        <motion.div
                            key={clientName}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="google-card p-6 flex flex-col xl:flex-row justify-between xl:items-center gap-6 group"
                        >
                            <div className="w-full xl:w-2/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-surface-hover p-2 rounded-lg border border-surface-border">
                                        <Target className="w-5 h-5 text-text-secondary" />
                                    </div>
                                    <h4 className="text-base font-medium text-text-primary">{clientName}</h4>
                                </div>

                                {/* Health Status */}
                                <div className={cn(
                                    "p-4 rounded-lg border flex items-center gap-3",
                                    healthy ? "border-[#137333]/20 bg-[#e6f4ea]" : "border-[#c5221f]/20 bg-[#fce8e6]"
                                )}>
                                    <span className={cn(
                                        "p-1.5 rounded-lg",
                                        healthy ? "bg-white text-[#137333]" : "bg-white text-[#c5221f]"
                                    )}>
                                        {healthy ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                                    </span>
                                    <div>
                                        <span className={cn("text-sm font-medium block", healthy ? "text-[#137333]" : "text-[#c5221f]")}>
                                            {healthy ? "Excelente" : "Atenção Necessária"}
                                        </span>
                                        <span className="text-xs text-text-secondary">
                                            {healthy ? "ROAS acima da meta estipulada" : "Riscos de fadiga identificados"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-3/5">
                                <div className="border-l-2 border-brand-blue pl-4 py-1">
                                    <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-1">Gasto Mensal</p>
                                    <p className="text-lg font-normal text-text-primary">{formatCurrency(clientData.kpis.spent)}</p>
                                </div>
                                <div className="border-l-2 border-surface-border pl-4 py-1">
                                    <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-1">Leads (CRM)</p>
                                    <p className="text-lg font-normal text-text-primary">{clientData.kpis.leads}</p>
                                </div>
                                <div className="border-l-2 border-surface-border pl-4 py-1">
                                    <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-1">ROAS</p>
                                    <p className="text-lg font-normal text-text-primary">{clientData.kpis.roas}x</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button className="text-sm font-medium text-brand-blue hover:bg-[#e8f0fe] px-4 py-2 rounded transition-colors whitespace-nowrap">
                                        Abrir Dashboard →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};
