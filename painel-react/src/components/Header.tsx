import { Menu, Search, ChevronDown, Bell } from 'lucide-react';
import type { ClientKey } from '../types';
import { MOCK_DATA } from '../mocks/data';

interface HeaderProps {
    client: ClientKey;
    setClient: (c: ClientKey) => void;
    onMenuClick: () => void;
}

export const Header = ({ client, setClient, onMenuClick }: HeaderProps) => (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-surface-card border-b border-surface-border z-30 w-full shrink-0">
        <div className="flex items-center gap-4 w-full lg:w-1/3">
            {/* Mobile Menu Icon */}
            <button onClick={onMenuClick} className="md:hidden text-text-secondary hover:bg-surface-hover p-2 rounded-full transition-colors">
                <Menu className="w-6 h-6" strokeWidth={2} />
            </button>

            <div className="text-xl font-medium text-text-secondary tracking-tight flex items-center gap-2 whitespace-nowrap">
                <div className="text-brand-blue flex items-center justify-center">
                    {/* Simplified Google Ads looking logo/icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 22H22L12 2ZM12 7.18L17.51 18H6.49L12 7.18Z" />
                        <path d="M12 11L9.5 16H14.5L12 11Z" fill="#1a73e8" />
                    </svg>
                </div>
                <span className="hidden sm:inline">Google Ads <span className="text-text-tertiary text-sm font-normal ml-1">Manager PRO</span></span>
            </div>
        </div>

        <div className="hidden lg:flex flex-1 justify-center px-4 max-w-2xl">
            <div className="relative w-full">
                <Search className="w-5 h-5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Pesquisar (ex: campanhas de display)"
                    className="w-full bg-[#f1f3f4] border border-transparent text-text-primary text-sm rounded-lg py-2.5 pl-10 pr-4 focus:bg-white focus:border-surface-border focus:outline-none focus:shadow-sm transition-all"
                />
            </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-full lg:w-1/3">
            <div className="relative hidden sm:block">
                <select
                    value={client}
                    onChange={(e) => setClient(e.target.value as ClientKey)}
                    className="appearance-none bg-surface-bg text-text-primary font-medium text-sm rounded-md py-1.5 pl-3 pr-8 border border-surface-border cursor-pointer outline-none hover:bg-surface-hover transition-colors focus:border-brand-blue max-w-[200px] truncate"
                >
                    {Object.keys(MOCK_DATA).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-text-secondary" />
                </div>
            </div>

            {/* Google-like top right action icons */}
            <button className="p-2 text-text-secondary hover:bg-surface-hover rounded-full transition-colors hidden sm:block" title="Ajuda">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </button>
            <button className="p-2 text-text-secondary hover:bg-surface-hover rounded-full transition-colors hidden sm:block" title="Notificações">
                <Bell className="w-5 h-5" strokeWidth={2} />
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm ml-2 cursor-pointer ring-2 ring-white hover:ring-gray-200 transition-all">
                A
            </div>
        </div>
    </header>
);
