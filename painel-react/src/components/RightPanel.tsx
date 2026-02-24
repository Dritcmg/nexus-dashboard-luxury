import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ClientData } from '../types';
import { cn } from '../utils/cn';

interface RightPanelProps {
    clientData: ClientData;
    clientName: string;
}

export const RightPanel = ({ clientData, clientName }: RightPanelProps) => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

    return (
        <div className="w-full lg:w-[320px] bg-[#4F46E5] text-white flex flex-col items-center py-10 px-8 lg:rounded-l-[40px] shadow-2xl relative shrink-0">
            <div className="relative mb-6 group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white/10 p-2 group-hover:bg-white/20 transition-colors">
                    <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                        <User className="w-16 h-16 text-indigo-300" fill="currentColor" />
                    </div>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#34A853] rounded-full border-4 border-[#4F46E5]"></div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-8 tracking-tight text-center">{clientName}</h2>

            <div className="flex w-full justify-between bg-[#3730A3] p-5 rounded-3xl mb-10 text-center shadow-inner">
                <div>
                    <p className="text-[10px] text-indigo-200 mb-1 uppercase tracking-wider font-semibold">Spend</p>
                    <p className="text-[#34A853] font-black text-lg xl:text-xl" title={String(clientData.kpis.spent)}>{formatCurrency(clientData.kpis.spent)}</p>
                    <p className="text-[9px] text-indigo-300 mt-1">Platform YTD</p>
                </div>
                <div>
                    <p className="text-[10px] text-indigo-200 mb-1 uppercase tracking-wider font-semibold">Leads</p>
                    <p className="text-[#34A853] font-black text-lg xl:text-xl">{clientData.kpis.leads > 1000 ? (clientData.kpis.leads / 1000).toFixed(1) + 'k' : clientData.kpis.leads}</p>
                    <p className="text-[9px] text-indigo-300 mt-1">CRM Synced</p>
                </div>
            </div>

            <div className="w-full">
                <h3 className="text-sm font-bold mb-6 text-indigo-50">Overall Stats</h3>
                <div className="space-y-6">
                    {[
                        { name: 'Google Search Ads', percent: `${Math.floor(Math.random() * 40 + 40)}%`, color: 'bg-[#4285F4]' },
                        { name: 'Meta Ads (Insta/FB)', percent: `${Math.floor(Math.random() * 40 + 40)}%`, color: 'bg-[#EA4335]' },
                        { name: 'TikTok Ads', percent: `${Math.floor(Math.random() * 30 + 10)}%`, color: 'bg-[#FBBC05]' },
                        { name: 'LinkedIn B2B', percent: `${Math.floor(Math.random() * 30 + 10)}%`, color: 'bg-[#34A853]' },
                    ].map((stat, i) => (
                        <div key={i} className="group cursor-default">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs text-indigo-100 font-medium group-hover:text-white transition-colors">{stat.name}</p>
                                <span className="text-[10px] text-indigo-300">{stat.percent}</span>
                            </div>
                            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: stat.percent }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={cn("h-full rounded-full", stat.color)}
                                ></motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
