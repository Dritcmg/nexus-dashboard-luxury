import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { MOCK_DATA } from '../mocks/data';
import { cn } from '../utils/cn';

export const ClientsTab = () => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-[30px] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex items-center gap-4 mb-4">
                    <div className="bg-indigo-500/20 p-3 rounded-2xl">
                        <Users className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-3xl font-black text-indigo-900 tracking-tight">Visão de Clientes (Agência)</h3>
                </div>
                <p className="text-gray-500 text-base md:text-lg font-medium relative z-10">
                    Panorama geral da saúde da sua carteira, comparando ROAS, Investimentos e Performance Absoluta.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {Object.entries(MOCK_DATA).map(([clientName, clientData], index) => {
                    const healthy = clientData.kpis.roas >= 3;

                    return (
                        <motion.div
                            key={clientName}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[30px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-8 group hover:border-indigo-500/30 transition-colors"
                        >
                            <div className="w-full xl:w-2/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 shadow-sm">
                                        <Target className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h4 className="text-2xl font-black text-indigo-900 tracking-tight">{clientName}</h4>
                                </div>

                                <div className="mt-6 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
                                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3">Status de Saúde da Conta</p>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "flex items-center justify-center p-2 rounded-xl",
                                            healthy ? "bg-[#34A853]/10 text-[#34A853]" : "bg-[#EA4335]/10 text-[#EA4335]"
                                        )}>
                                            {healthy ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                                        </span>
                                        <div>
                                            <span className={cn("text-xl font-black block", healthy ? "text-[#34A853]" : "text-[#EA4335]")}>
                                                {healthy ? "Excelente" : "Atenção Necessária"}
                                            </span>
                                            <span className="text-sm font-medium text-gray-500">
                                                {healthy ? "ROAS acima da meta estipulada" : "Riscos de fadiga identificados"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-3/5">
                                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Gasto Mensal</p>
                                    <p className="text-xl font-black text-gray-800">{formatCurrency(clientData.kpis.spent)}</p>
                                </div>
                                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Leads (CRM)</p>
                                    <p className="text-xl font-black text-gray-800">{clientData.kpis.leads}</p>
                                </div>
                                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">ROAS</p>
                                    <p className="text-xl font-black text-gray-800">{clientData.kpis.roas}x</p>
                                </div>
                                <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/20 text-center flex flex-col justify-center">
                                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline transition-colors">
                                        Abrir Dashboard
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
