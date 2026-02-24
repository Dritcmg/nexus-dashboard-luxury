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
        <div className="w-full lg:w-[320px] bg-surface-bg border-l border-surface-border flex flex-col items-center py-6 px-6 relative shrink-0">
            <div className="relative mb-6 group cursor-pointer mt-4">
                <div className="w-24 h-24 rounded-full bg-white p-1.5 border border-surface-border shadow-sm group-hover:shadow-md transition-shadow">
                    <div className="w-full h-full rounded-full bg-brand-blue/10 flex items-center justify-center overflow-hidden">
                        <User className="w-12 h-12 text-brand-blue" fill="currentColor" />
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-medium mb-8 text-text-primary text-center tracking-tight">{clientName}</h2>

            <div className="flex w-full justify-between bg-white border border-surface-border p-5 rounded-xl mb-10 text-center shadow-sm">
                <div>
                    <p className="text-[10px] text-text-secondary mb-1 uppercase tracking-wider font-semibold">Spend</p>
                    <p className="text-text-primary font-medium text-lg" title={String(clientData.kpis.spent)}>{formatCurrency(clientData.kpis.spent)}</p>
                    <p className="text-[10px] text-text-tertiary mt-1 flex items-center justify-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Platform YTD</p>
                </div>
                <div>
                    <p className="text-[10px] text-text-secondary mb-1 uppercase tracking-wider font-semibold">Leads</p>
                    <p className="text-brand-blue font-medium text-lg">{clientData.kpis.leads > 1000 ? (clientData.kpis.leads / 1000).toFixed(1) + 'k' : clientData.kpis.leads}</p>
                    <p className="text-[10px] text-text-tertiary mt-1">CRM Synced</p>
                </div>
            </div>

            <div className="w-full">
                <h3 className="text-sm font-medium mb-4 text-text-primary px-2 border-b border-surface-border pb-2">Overall Stats</h3>
                <div className="space-y-6">
                    <div className="h-40 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={clientData.platformDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {clientData.platformDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '4px', border: '1px solid #dadce0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#202124', fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-3 mt-4 px-2">
                        {clientData.platformDistribution.map((platform) => (
                            <div key={platform.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: platform.color }}></span>
                                    <span className="text-text-secondary font-medium">{platform.name}</span>
                                </div>
                                <span className="font-medium text-text-primary">{platform.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
