import React from 'react';
import { Menu, Search, Sparkles, ChevronDown } from 'lucide-react';
import { ClientKey } from '../types';
import { MOCK_DATA } from '../mocks/data';

interface HeaderProps {
    client: ClientKey;
    setClient: (c: ClientKey) => void;
    onMenuClick: () => void;
}

export const Header = ({ client, setClient, onMenuClick }: HeaderProps) => (
    <header className="h-24 flex items-center justify-between px-6 lg:px-8 bg-transparent z-30 w-full shrink-0">
        <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
            {/* Mobile Menu Icon */}
            <button onClick={onMenuClick} className="md:hidden text-[#4F46E5] hover:bg-indigo-50 p-2 rounded-xl transition-colors">
                <Menu className="w-7 h-7" strokeWidth={2.5} />
            </button>

            <div className="text-xl lg:text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-2 mr-2 lg:mr-8 whitespace-nowrap">
                <div className="bg-[#4285F4] p-1.5 rounded-lg">
                    <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="hidden sm:inline">ADSPainel<span className="text-[#4285F4] font-medium">-PRO</span></span>
            </div>

            <div className="relative w-full max-w-sm hidden lg:block">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Pesquisar métrica, campanha..."
                    className="w-full bg-white border border-gray-100 text-gray-600 text-sm rounded-full py-3.5 pl-12 pr-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 transition-all"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="relative">
                <select
                    value={client}
                    onChange={(e) => setClient(e.target.value as ClientKey)}
                    className="appearance-none bg-white text-indigo-900 font-bold text-xs sm:text-sm lg:text-base rounded-full py-2.5 pl-4 sm:pl-6 pr-10 sm:pr-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] cursor-pointer outline-none hover:bg-gray-50 transition-colors border-2 border-transparent focus:border-[#4285F4]/50 max-w-[150px] sm:max-w-none truncate"
                >
                    {Object.keys(MOCK_DATA).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center pointer-events-none">
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#4F46E5]" strokeWidth={3} />
                </div>
            </div>
        </div>
    </header>
);
