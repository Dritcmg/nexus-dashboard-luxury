export type ClientKey = 'Incorporadora Alpha' | 'Construtora Beta' | 'Residencial Gold';

export type Tab = 'performance' | 'finance' | 'alerts' | 'ai' | 'clients';

export interface ChartData {
    name: string;
    google: number;
    meta: number;
}

export interface Creative {
    name: string;
    spent: number;
    cpl: number;
    status: 'Escalar' | 'Trocar' | 'Manter';
}

export interface FinanceAccount {
    account: string;
    balance: number;
    approved: number;
    status: 'Conciliado' | 'Pendente' | 'Divergência';
}

export interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    time: string;
}

export interface AIAction {
    title: string;
    description: string;
    impact: string;
}

export interface AIAnalysis {
    prediction: string;
    confidence: number;
    actions: AIAction[];
}

export interface ClientData {
    kpis: {
        spent: number;
        leads: number;
        cpl: number;
        roas: number;
        itemsDownloaded: number;
        percentage: number
    };
    chartData: ChartData[];
    creatives: Creative[];
    finance: FinanceAccount[];
    iaInsight: string;
    alerts: Alert[];
    aiAnalysis: AIAnalysis;
    platformDistribution: { name: string; value: number; color: string }[];
}
