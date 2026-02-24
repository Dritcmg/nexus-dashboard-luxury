import { Menu, Home, PieChart, Bell, Settings, BrainCircuit, Users } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming we'll make a cn.ts util
import type { Tab } from '../types';

interface SidebarProps {
    activeTab: Tab;
    setActiveTab: (t: Tab) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 h-screen w-20 md:w-20 bg-surface-card border-r border-surface-border z-50 flex flex-col items-center py-6 transition-transform duration-300 md:translate-x-0 overflow-y-auto hide-scrollbar",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div
                    className="mb-8 cursor-pointer text-text-secondary hover:text-text-primary transition-colors md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <Menu className="w-6 h-6" strokeWidth={2} />
                </div>

                <div className="mb-8 cursor-pointer text-text-secondary hover:text-text-primary transition-colors hidden md:block">
                    {/* Placeholder for custom logo later if needed, now just standard menu icon */}
                    <Menu className="w-6 h-6" strokeWidth={2} />
                </div>

                <nav className="flex-1 flex flex-col gap-2 w-full items-center px-2">
                    <button
                        onClick={() => setActiveTab('performance')}
                        title="Visão Geral"
                        className={cn(
                            "p-3 rounded-full transition-all duration-200 relative flex items-center justify-center w-12 h-12",
                            activeTab === 'performance' ? "bg-[#e8f0fe] text-blue-700" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}>
                        <Home className="w-6 h-6" strokeWidth={activeTab === 'performance' ? 2.5 : 2} />
                    </button>

                    <button
                        onClick={() => setActiveTab('finance')}
                        title="Faturamento"
                        className={cn(
                            "p-3 rounded-full transition-all duration-200 relative flex items-center justify-center w-12 h-12",
                            activeTab === 'finance' ? "bg-[#e8f0fe] text-blue-700" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}>
                        <PieChart className="w-6 h-6" strokeWidth={activeTab === 'finance' ? 2.5 : 2} />
                    </button>

                    <button
                        onClick={() => setActiveTab('ai')}
                        title="Recomendações"
                        className={cn(
                            "p-3 rounded-full transition-all duration-200 relative flex items-center justify-center w-12 h-12",
                            activeTab === 'ai' ? "bg-[#e8f0fe] text-blue-700" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}>
                        <BrainCircuit className="w-6 h-6" strokeWidth={activeTab === 'ai' ? 2.5 : 2} />
                    </button>

                    <button
                        onClick={() => setActiveTab('clients')}
                        title="Contas"
                        className={cn(
                            "p-3 rounded-full transition-all duration-200 relative flex items-center justify-center w-12 h-12",
                            activeTab === 'clients' ? "bg-[#e8f0fe] text-blue-700" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}>
                        <Users className="w-6 h-6" strokeWidth={activeTab === 'clients' ? 2.5 : 2} />
                    </button>

                    <button
                        onClick={() => setActiveTab('alerts')}
                        title="Notificações"
                        className={cn(
                            "p-3 rounded-full transition-all duration-200 relative flex items-center justify-center w-12 h-12 mt-4",
                            activeTab === 'alerts' ? "bg-[#e8f0fe] text-blue-700" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}>
                        <Bell className="w-6 h-6" strokeWidth={activeTab === 'alerts' ? 2.5 : 2} />
                        <span className="absolute top-2.5 flex h-2 w-2 right-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA4335] outline outline-2 outline-white"></span>
                        </span>
                    </button>
                </nav>

                <div className="mt-auto pt-4 border-t border-surface-border w-full flex justify-center">
                    <button title="Configurações" className="p-3 rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-200 w-12 h-12 flex items-center justify-center">
                        <Settings className="w-6 h-6" strokeWidth={2} />
                    </button>
                </div>
            </aside>
        </>
    );
};
