import { motion } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { ClientData } from '../types';
import { cn } from '../utils/cn';

export const AlertsTab = ({ data }: { data: ClientData }) => {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="google-card p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#fef7e0] p-2 rounded-lg">
                        <Bell className="w-5 h-5 text-[#b06000]" />
                    </div>
                    <h3 className="text-lg font-medium text-text-primary">Alertas do Sistema</h3>
                </div>
                <p className="text-text-secondary text-sm">
                    Monitoramento em tempo real de fadiga criativa, quebras de compliance, e variações orçamentárias abruptas.
                </p>
            </div>

            {/* Alerts List */}
            <div className="google-card overflow-hidden">
                <div className="py-4 px-6 border-b border-surface-border flex items-center justify-between">
                    <h4 className="text-base font-medium text-text-primary flex items-center gap-2">
                        Últimas Detecções do Sistema
                        <span className="bg-[#e8f0fe] text-brand-blue text-xs py-0.5 px-2 rounded font-medium">{data.alerts.length}</span>
                    </h4>
                </div>
                <div className="divide-y divide-surface-border">
                    {data.alerts && data.alerts.length > 0 ? data.alerts.map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="py-4 px-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-[#f8f9fa] transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                {/* Side color indicator */}
                                <div className={cn(
                                    "w-1 self-stretch rounded-full shrink-0 hidden md:block",
                                    alert.type === 'critical' ? "bg-brand-red" :
                                        alert.type === 'warning' ? "bg-brand-yellow" :
                                            "bg-brand-blue"
                                )}></div>

                                <div className={cn(
                                    "p-2 rounded-lg flex-shrink-0",
                                    alert.type === 'critical' ? "bg-[#fce8e6] text-[#c5221f]" :
                                        alert.type === 'warning' ? "bg-[#fef7e0] text-[#b06000]" :
                                            "bg-[#e8f0fe] text-brand-blue"
                                )}>
                                    {alert.type === 'critical' && <AlertTriangle className="w-5 h-5" />}
                                    {alert.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                                    {alert.type === 'info' && <Info className="w-5 h-5" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={cn(
                                            "text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded",
                                            alert.type === 'critical' ? "bg-[#fce8e6] text-[#c5221f]" :
                                                alert.type === 'warning' ? "bg-[#fef7e0] text-[#b06000]" :
                                                    "bg-[#e8f0fe] text-brand-blue"
                                        )}>
                                            {alert.type === 'critical' ? 'Ação Exigida' : alert.type === 'warning' ? 'Atenção' : 'Aviso Legal'}
                                        </span>
                                    </div>
                                    <h5 className="font-medium text-text-primary text-sm leading-snug">{alert.message}</h5>
                                    <p className="text-xs text-text-secondary mt-1 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-text-tertiary"></span>
                                        Registrado {alert.time}
                                    </p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-brand-blue hover:bg-[#e8f0fe] px-4 py-2 rounded transition-colors self-stretch md:self-auto whitespace-nowrap">
                                Detalhes
                            </button>
                        </motion.div>
                    )) : (
                        <div className="text-center py-10 text-text-secondary">Nenhum alerta ativo para este cliente.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
