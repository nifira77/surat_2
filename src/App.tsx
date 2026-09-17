import React, { useState } from 'react';
import { SuratProvider } from './context/SuratContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SuratMasukView } from './components/SuratMasukView';
import { SuratMasukFormModal } from './components/SuratMasukFormModal';
import { DisposisiModal } from './components/DisposisiModal';
import { LembarDisposisiPrint } from './components/LembarDisposisiPrint';
import { SuratKeluarView } from './components/SuratKeluarView';
import { SuratKeluarFormModal } from './components/SuratKeluarFormModal';
import { SuratKeluarPreviewModal } from './components/SuratKeluarPreviewModal';
import { BukuAgendaView } from './components/BukuAgendaView';
import { PengaturanSekolahModal } from './components/PengaturanSekolahModal';
import { KlasifikasiModal } from './components/KlasifikasiModal';
import { SuratMasuk, SuratKeluar } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Modal States
  const [showAddSuratMasuk, setShowAddSuratMasuk] = useState(false);
  const [suratMasukToEdit, setSuratMasukToEdit] = useState<SuratMasuk | null>(null);
  const [disposisiSurat, setDisposisiSurat] = useState<SuratMasuk | null>(null);
  const [printDisposisiSurat, setPrintDisposisiSurat] = useState<SuratMasuk | null>(null);

  const [showAddSuratKeluar, setShowAddSuratKeluar] = useState(false);
  const [suratKeluarToEdit, setSuratKeluarToEdit] = useState<SuratKeluar | null>(null);
  const [previewSuratKeluar, setPreviewSuratKeluar] = useState<SuratKeluar | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showKlasifikasi, setShowKlasifikasi] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
        onOpenKlasifikasi={() => setShowKlasifikasi(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenAddSuratMasuk={() => {
              setSuratMasukToEdit(null);
              setShowAddSuratMasuk(true);
            }}
            onOpenAddSuratKeluar={() => {
              setSuratKeluarToEdit(null);
              setShowAddSuratKeluar(true);
            }}
            onOpenDisposisi={(surat) => setDisposisiSurat(surat)}
            onOpenPreviewSuratKeluar={(surat) => setPreviewSuratKeluar(surat)}
          />
        )}

        {activeTab === 'surat-masuk' && (
          <SuratMasukView
            onOpenAddModal={() => {
              setSuratMasukToEdit(null);
              setShowAddSuratMasuk(true);
            }}
            onEditSurat={(surat) => {
              setSuratMasukToEdit(surat);
              setShowAddSuratMasuk(true);
            }}
            onOpenDisposisi={(surat) => setDisposisiSurat(surat)}
            onPrintDisposisi={(surat) => setPrintDisposisiSurat(surat)}
          />
        )}

        {activeTab === 'surat-keluar' && (
          <SuratKeluarView
            onOpenAddModal={() => {
              setSuratKeluarToEdit(null);
              setShowAddSuratKeluar(true);
            }}
            onEditSurat={(surat) => {
              setSuratKeluarToEdit(surat);
              setShowAddSuratKeluar(true);
            }}
            onPreviewSurat={(surat) => setPreviewSuratKeluar(surat)}
          />
        )}

        {activeTab === 'buku-agenda' && <BukuAgendaView />}
      </main>

      {/* Modals & Dialogs */}
      {showAddSuratMasuk && (
        <SuratMasukFormModal
          suratToEdit={suratMasukToEdit}
          onClose={() => {
            setShowAddSuratMasuk(false);
            setSuratMasukToEdit(null);
          }}
        />
      )}

      {disposisiSurat && (
        <DisposisiModal
          surat={disposisiSurat}
          onClose={() => setDisposisiSurat(null)}
          onPrintPreview={() => {
            const target = disposisiSurat;
            setDisposisiSurat(null);
            setPrintDisposisiSurat(target);
          }}
        />
      )}

      {printDisposisiSurat && (
        <LembarDisposisiPrint
          surat={printDisposisiSurat}
          onClose={() => setPrintDisposisiSurat(null)}
        />
      )}

      {showAddSuratKeluar && (
        <SuratKeluarFormModal
          suratToEdit={suratKeluarToEdit}
          onClose={() => {
            setShowAddSuratKeluar(false);
            setSuratKeluarToEdit(null);
          }}
        />
      )}

      {previewSuratKeluar && (
        <SuratKeluarPreviewModal
          surat={previewSuratKeluar}
          onClose={() => setPreviewSuratKeluar(null)}
        />
      )}

      {showSettings && (
        <PengaturanSekolahModal onClose={() => setShowSettings(false)} />
      )}

      {showKlasifikasi && (
        <KlasifikasiModal onClose={() => setShowKlasifikasi(false)} />
      )}

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <p>
          Sistem Informasi Administrasi Persuratan Digital • <strong>SMP Negeri 14 Tulang Bawang Barat</strong>
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Dinas Pendidikan dan Kebudayaan Kabupaten Tulang Bawang Barat, Provinsi Lampung
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SuratProvider>
      <AppContent />
    </SuratProvider>
  );
}
