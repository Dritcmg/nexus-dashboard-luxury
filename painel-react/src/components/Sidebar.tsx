import React from 'react';
import { Menu, Home, Mail, User, PieChart, Bell, Settings, Activity, BrainCircuit, Users } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming we'll make a cn.ts util
import { Tab } from '../types';

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
                "fixed left-0 top-0 h-screen w-20 md:w-24 bg-[#4F46E5] z-50 flex flex-col items-center py-6 shadow-xl transition-transform duration-300 md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div
                    className="mb-12 cursor-pointer text-white hover:scale-110 transition-transform md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <Menu className="w-8 h-8" strokeWidth={2.5} />
                </div>

                <div className="mb-12 cursor-pointer text-white hover:scale-110 transition-transform hidden md:block group">
                    <Menu className="w-8 h-8" strokeWidth={2.5} />
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full items-center overflow-y-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('performance')}
                        title="Performance"
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300 relative group",
                            activeTab === 'performance' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
                        )}>
                        <Home className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
                    </button>

                    <button
                        onClick={() => setActiveTab('finance')}
                        title="Financeiro"
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300 relative group",
                            activeTab === 'finance' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
                        )}>
                        <PieChart className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
                    </button>

                    <button
                        onClick={() => setActiveTab('ai')}
                        title="Análise Preventiva IA"
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300 relative group",
                            activeTab === 'ai' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
                        )}>
                        <BrainCircuit className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={() => setActiveTab('alerts')}
                        title="Alertas do Sistema"
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300 relative group",
                            activeTab === 'alerts' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
                        )}>
                        <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FBBC05] rounded-full border-2 border-[#4F46E5] animate-pulse"></span>
                    </button>

                    <button
                        onClick={() => setActiveTab('clients')}
                        title="Visão de Clientes"
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300 relative group",
                            activeTab === 'clients' ? "bg-white/20 text-white shadow-inner" : "text-indigo-200 hover:text-white hover:bg-white/10"
                        )}>
                        <Users className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
                    </button>
                </nav>

                <div className="mt-auto pt-4">
                    <button title="Configurações" className="p-3 rounded-2xl text-indigo-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90">
                        <Settings className="w-6 h-6" fill="currentColor" strokeWidth={0} />
                    </button>
                </div>
            </aside>
        </>
    );
};
