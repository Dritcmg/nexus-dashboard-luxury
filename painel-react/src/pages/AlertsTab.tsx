import { motion } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { ClientData } from '../types';
import { cn } from '../utils/cn';

export const AlertsTab = ({ data }: { data: ClientData }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-[30px] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBBC05]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 max-w-3xl flex items-center gap-4 mb-4">
                    <div className="bg-[#FBBC05]/20 p-3 rounded-2xl">
                        <Bell className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-3xl font-black text-indigo-900 tracking-tight">Alertas do Sistema</h3>
                </div>
                <p className="text-gray-500 text-base md:text-lg font-medium relative z-10">
                    Monitoramento em tempo real de fadiga criativa, quebras de compliance, e variações orçamentárias abruptas.
                </p>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    Últimas Detecções do Sistema
                    <span className="bg-indigo-100 text-indigo-700 text-xs py-1 px-3 rounded-full">{data.alerts.length}</span>
                </h4>
                <div className="space-y-4">
                    {data.alerts && data.alerts.length > 0 ? data.alerts.map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -20, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "p-5 rounded-2xl border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group transition-all duration-300 relative overflow-hidden",
                                alert.type === 'critical' ? "bg-[#EA4335]/5 border-[#EA4335]/20 hover:border-[#EA4335]/40 hover:shadow-[0_8px_30px_rgba(234,67,53,0.1)]" :
                                    alert.type === 'warning' ? "bg-[#FBBC05]/5 border-[#FBBC05]/20 hover:border-[#FBBC05]/40 hover:shadow-[0_8px_30px_rgba(251,188,5,0.1)]" :
                                        "bg-[#4285F4]/5 border-[#4285F4]/20 hover:border-[#4285F4]/40 hover:shadow-[0_8px_30px_rgba(66,133,244,0.1)]"
                            )}
                        >
                            {/* Subtle Side Bar indicator */}
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1.5",
                                alert.type === 'critical' ? "bg-[#EA4335]" :
                                    alert.type === 'warning' ? "bg-[#FBBC05]" :
                                        "bg-[#4285F4]"
                            )}></div>

                            <div className="flex items-center gap-4 pl-2">
                                <div className={cn(
                                    "p-3 rounded-2xl flex-shrink-0 shadow-sm",
                                    alert.type === 'critical' ? "bg-white text-[#EA4335] shadow-[#EA4335]/20" :
                                        alert.type === 'warning' ? "bg-white text-[#FBBC05] shadow-[#FBBC05]/20" :
                                            "bg-white text-[#4285F4] shadow-[#4285F4]/20"
                                )}>
                                    {alert.type === 'critical' && <AlertTriangle className="w-7 h-7" strokeWidth={2.5} />}
                                    {alert.type === 'warning' && <AlertCircle className="w-7 h-7" strokeWidth={2.5} />}
                                    {alert.type === 'info' && <Info className="w-7 h-7" strokeWidth={2.5} />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                                            alert.type === 'critical' ? "bg-[#EA4335]/10 text-[#EA4335]" :
                                                alert.type === 'warning' ? "bg-[#FBBC05]/10 text-[#FBBC05]" :
                                                    "bg-[#4285F4]/10 text-[#4285F4]"
                                        )}>
                                            {alert.type === 'critical' ? 'Ação Exigida' : alert.type === 'warning' ? 'Atenção' : 'Aviso Legal'}
                                        </span>
                                    </div>
                                    <h5 className="font-bold text-gray-800 text-base md:text-lg leading-snug">{alert.message}</h5>
                                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                        Registrado {alert.time}
                                    </p>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 border px-6 py-3 rounded-xl shadow-sm hover:shadow-lg transition-all self-stretch md:self-auto group-hover:scale-105">
                                Detalhes
                            </button>
                        </motion.div>
                    )) : (
                        <div className="text-center py-10 text-gray-400 font-medium">Nenhum alerta ativo para este cliente.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
