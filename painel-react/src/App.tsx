import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';

import type { ClientKey, Tab, ClientData } from './types';
import { MOCK_DATA } from './mocks/data';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RightPanel } from './components/RightPanel';
import { PerformanceSkeleton, BasicSkeleton } from './components/SkeletonScreen';

import { PerformanceTab } from './pages/PerformanceTab';
import { FinanceTab } from './pages/FinanceTab';
import { AlertsTab } from './pages/AlertsTab';
import { AITab } from './pages/AITab';
import { ClientsTab } from './pages/ClientsTab';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value);

export default function App() {
  const [client, setClient] = useState<ClientKey>('Incorporadora Alpha');
  const [activeTab, setActiveTab] = useState<Tab>('performance');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const data: ClientData = MOCK_DATA[client];

  // Simulador de Loading super rápido no React Vite
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [client, activeTab]);

  const handleGenBoleto = (accName: string) => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.15) {
            reject(new Error('Saldo insuficiente ou limite transacional atingido na conta.'));
          } else {
            resolve(true);
          }
        }, 1500)
      }),
      {
        loading: `Gerando Boleto para ${accName}...`,
        success: `Boleto enviado com sucesso para o cliente!`,
        error: (err) => `Erro na API: ${err.message}`,
      }
    );
  };

  const handleDownloadNF = (accName: string) => {
    const toastId = toast.loading(`Processando NFS-e na prefeitura para ${accName}...`);
    setTimeout(() => {
      if (Math.random() < 0.15) {
        toast.error(`Falha ao emitir NF. Sistema municipal (Sefin) indisponível.`, { id: toastId });
      } else {
        toast.success(`Download concluído! Verifique a pasta Downloads.`, { id: toastId });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] text-gray-800 font-sans selection:bg-[#4285F4]/30 overflow-hidden flex flex-col md:flex-row relative">
      <Toaster position="bottom-right" className="!font-sans" toastOptions={{
        style: { borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }
      }} />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(t) => {
          setActiveTab(t);
          setIsMobileMenuOpen(false); // Fecha o menu no celular ao clicar num botão
        }}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 md:ml-24 flex flex-col min-h-screen overflow-y-auto overflow-x-hidden w-full relative">
        <Header
          client={client}
          setClient={setClient}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[2000px] mx-auto">
          {/* Main Contextual Area */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-10 w-full xl:max-w-[1200px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                activeTab === 'performance' ? <PerformanceSkeleton key="skel-perf" /> : <BasicSkeleton key="skel-basic" />
              ) : (
                <motion.div
                  key={`${client}-${activeTab}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  {activeTab === 'performance' && <PerformanceTab data={data} formatCurrency={formatCurrency} />}
                  {activeTab === 'finance' && <FinanceTab data={data} formatCurrency={formatCurrency} onGenBoleto={handleGenBoleto} onDownloadNF={handleDownloadNF} />}
                  {activeTab === 'alerts' && <AlertsTab data={data} />}
                  {activeTab === 'ai' && <AITab data={data} />}
                  {activeTab === 'clients' && <ClientsTab />}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Right Panel Dynamics (Hidden on Clients Tab since it's global) */}
          {activeTab !== 'clients' && (
            <RightPanel clientData={data} clientName={client} />
          )}
        </div>
      </div>
    </div>
  );
}
