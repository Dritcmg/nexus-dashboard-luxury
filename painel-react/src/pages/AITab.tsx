import { motion } from 'framer-motion';
import { BrainCircuit, Zap, CheckCircle2 } from 'lucide-react';
import type { ClientData } from '../types';

export const AITab = ({ data }: { data: ClientData }) => {
    const analysis = data.aiAnalysis;

    return (
        <div className="space-y-6">
            {/* Hero Card */}
            <div className="google-card p-6 relative overflow-hidden bg-gradient-to-r from-blue-50/60 to-transparent">
                <div className="relative z-10 flex items-center gap-3 mb-4">
                    <div className="bg-[#e8f0fe] p-2 rounded-lg">
                        <BrainCircuit className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-text-primary">Análise Preventiva IA</h3>
                </div>
                <p className="text-text-primary text-base leading-relaxed max-w-4xl relative z-10">
                    {analysis?.prediction || "Processando rede neural predictiva..."}
                </p>
                <div className="mt-4 flex items-center gap-3">
                    <span className="bg-[#e6f4ea] text-[#137333] px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Confidence Score: {analysis?.confidence || 0}%
                    </span>
                </div>
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis?.actions && analysis.actions.map((action, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="google-card p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-[#e8f0fe] p-1.5 rounded-lg">
                                    <Zap className="w-4 h-4 text-brand-blue" />
                                </div>
                                <h4 className="text-base font-medium text-text-primary">{action.title}</h4>
                            </div>
                            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                                {action.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-surface-border pt-4 mt-auto">
                            <div>
                                <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-0.5">Impacto Estimado</p>
                                <p className="font-medium text-[#137333] text-base">{action.impact}</p>
                            </div>
                            <button className="bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                                Aplicar Agora
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
