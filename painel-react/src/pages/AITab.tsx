import { motion } from 'framer-motion';
import { BrainCircuit, Zap, CheckCircle2 } from 'lucide-react';
import type { ClientData } from '../types';

export const AITab = ({ data }: { data: ClientData }) => {
    const analysis = data.aiAnalysis;

    return (
        <div className="space-y-6">
            <div className="bg-indigo-900 rounded-[30px] p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                        <BrainCircuit className="w-8 h-8 text-[#4285F4]" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight">Análise Preventiva IA</h3>
                </div>
                <p className="text-indigo-200 text-lg md:text-xl font-medium max-w-4xl leading-relaxed relative z-10">
                    {analysis?.prediction || "Processando rede neural predictiva..."}
                </p>
                <div className="mt-8 flex items-center gap-3">
                    <span className="bg-[#34A853]/20 text-[#34A853] px-4 py-2 rounded-xl font-extrabold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Confidence Score: {analysis?.confidence || 0}%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis?.actions && analysis.actions.map((action, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[30px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between group hover:border-[#4285F4]/30 transition-colors"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[#4285F4]/10 p-2.5 rounded-xl">
                                    <Zap className="w-6 h-6 text-[#4285F4]" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">{action.title}</h4>
                            </div>
                            <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                                {action.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-4">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Impacto Estimado</p>
                                <p className="font-black text-[#34A853] text-lg">{action.impact}</p>
                            </div>
                            <button className="bg-indigo-50 hover:bg-[#4F46E5] text-[#4F46E5] hover:text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300">
                                Aplicar Agora
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
