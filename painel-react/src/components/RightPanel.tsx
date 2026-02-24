import { User } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import type { ClientData } from '../types';

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
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={clientData.platformDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {clientData.platformDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        {clientData.platformDistribution.map((platform) => (
                            <div key={platform.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }}></span>
                                    <span className="text-indigo-100 font-medium">{platform.name}</span>
                                </div>
                                <span className="font-bold text-white">{platform.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
