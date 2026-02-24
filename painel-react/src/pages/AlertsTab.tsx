import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { ClientData } from '../types';
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
                <h4 className="text-lg font-bold text-gray-800 mb-6">Últimas Detecções</h4>
                <div className="space-y-4">
                    {data.alerts && data.alerts.length > 0 ? data.alerts.map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "p-5 rounded-2xl border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group transition-all",
                                alert.type === 'critical' ? "bg-[#EA4335]/5 border-[#EA4335]/20 hover:border-[#EA4335]/40" :
                                    alert.type === 'warning' ? "bg-[#FBBC05]/5 border-[#FBBC05]/20 hover:border-[#FBBC05]/40" :
                                        "bg-[#4285F4]/5 border-[#4285F4]/20 hover:border-[#4285F4]/40"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-2.5 rounded-xl flex-shrink-0",
                                    alert.type === 'critical' ? "bg-[#EA4335]/10 text-[#EA4335]" :
                                        alert.type === 'warning' ? "bg-[#FBBC05]/10 text-yellow-600" :
                                            "bg-[#4285F4]/10 text-[#4285F4]"
                                )}>
                                    {alert.type === 'critical' && <AlertTriangle className="w-6 h-6" />}
                                    {alert.type === 'warning' && <AlertCircle className="w-6 h-6" />}
                                    {alert.type === 'info' && <Info className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800 text-base md:text-lg">{alert.message}</h5>
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">{alert.time}</p>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-white border px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all self-stretch md:self-auto">
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
