import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle2, AlertCircle, Receipt, FileCheck2 } from 'lucide-react';
import { ClientData } from '../types';
import { cn } from '../utils/cn';

interface Props {
    data: ClientData;
    formatCurrency: (val: number) => string;
    onGenBoleto: (acc: string) => void;
    onDownloadNF: (acc: string) => void;
}

export const FinanceTab = ({ data, formatCurrency, onGenBoleto, onDownloadNF }: Props) => {
    return (
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
                                    onClick={() => onGenBoleto(acc.account)}
                                >
                                    <Receipt className="w-5 h-5" /> Gerar Boleto
                                </button>
                                <button
                                    className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#4F46E5] text-gray-600 hover:text-[#4F46E5] py-3.5 px-6 rounded-2xl font-bold transition-all duration-300 w-full hover:bg-indigo-50"
                                    onClick={() => onDownloadNF(acc.account)}
                                >
                                    <FileCheck2 className="w-5 h-5" /> Baixar NF
                                </button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};
