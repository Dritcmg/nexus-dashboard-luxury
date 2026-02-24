import { motion } from 'framer-motion';
import { Wallet, CheckCircle2, AlertCircle, Receipt, FileCheck2 } from 'lucide-react';
import type { ClientData } from '../types';
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
            <div className="bg-white border-b border-surface-border px-8 py-6 relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 mb-8">
                <div className="relative z-10 max-w-3xl">
                    <h3 className="text-xl font-medium text-text-primary mb-1">Hub Financeiro B2B</h3>
                    <p className="text-text-secondary text-sm">
                        Conferência automática baseada em inteligência artificial. Emitimos NFS-e e Boletos consolidados em 1-clique.
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
                            className="google-card p-6 flex flex-col xl:flex-row justify-between xl:items-center gap-8 group"
                        >
                            <div className="w-full xl:w-auto flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-surface-hover p-2 rounded-lg border border-surface-border">
                                        <Wallet className="w-5 h-5 text-text-secondary" />
                                    </div>
                                    <h4 className="text-base font-medium text-text-primary line-clamp-1">{acc.account}</h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="border-l-2 border-brand-blue pl-4 py-1">
                                        <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-1">Saldo Atual Gasto</p>
                                        <p className="text-2xl font-normal text-text-primary">{formatCurrency(acc.balance)}</p>
                                    </div>
                                    <div className="border-l-2 border-surface-border pl-4 py-1">
                                        <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-1">Verba Aprovada</p>
                                        <p className="text-2xl font-normal text-text-primary">{formatCurrency(acc.approved)}</p>
                                    </div>
                                    <div className="border-l-2 border-surface-border pl-4 py-1 flex flex-col justify-center">
                                        <p className="text-[11px] font-medium uppercase tracking-wider mb-1 text-text-secondary">NF vs Gasto Estimado</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {conciled ? <CheckCircle2 className="w-5 h-5 text-brand-green" /> : <AlertCircle className="w-5 h-5 text-brand-red" />}
                                            <span className={cn("text-sm font-medium", conciled ? "text-brand-green" : "text-brand-red")}>{acc.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row xl:flex-col gap-3 w-full xl:w-48 shrink-0">
                                <button
                                    className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white py-2 px-4 rounded font-medium transition-colors w-full text-sm shadow-sm"
                                    onClick={() => onGenBoleto(acc.account)}
                                >
                                    <Receipt className="w-4 h-4" /> Gerar Boleto
                                </button>
                                <button
                                    className="flex items-center justify-center gap-2 bg-white border border-surface-border hover:bg-surface-hover text-text-primary py-2 px-4 rounded font-medium transition-colors w-full text-sm"
                                    onClick={() => onDownloadNF(acc.account)}
                                >
                                    <FileCheck2 className="w-4 h-4 text-text-secondary" /> Baixar NF
                                </button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};
