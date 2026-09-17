import React from 'react';
import {
  FileText,
  Mail,
  Send,
  BookOpen,
  Tag,
  Settings,
  Calendar,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { useSurat } from '../context/SuratContext';

export type ActiveTab = 'dashboard' | 'surat-masuk' | 'surat-keluar' | 'buku-agenda';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
  onOpenKlasifikasi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenKlasifikasi,
}) => {
  const { profil, suratMasukList } = useSurat();

  // Count pending disposition
  const pendingDisposisiCount = suratMasukList.filter(
    (s) => s.statusDisposisi === 'Belum Didisposisi'
  ).length;

  const todayFormatted = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="no-print bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-40">
      {/* Top bar with district and school identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-emerald-400/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  Kab. Tulang Bawang Barat
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  NPSN: {profil.npsn}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {profil.namaSekolah}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{todayFormatted}</span>
            </div>

            <button
              id="btn-klasifikasi-ref"
              onClick={onOpenKlasifikasi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
              title="Daftar Kode Klasifikasi Surat Kearsipan"
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Kode Arsip</span>
            </button>

            <button
              id="btn-pengaturan-profil"
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs transition"
              title="Pengaturan Kop Surat & Backup"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pengaturan & Backup</span>
            </button>
          </div>
        </div>

        {/* Primary navigation tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 text-sm scrollbar-none">
          <button
            id="tab-nav-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Dashboard Persuratan</span>
          </button>

          <button
            id="tab-nav-surat-masuk"
            onClick={() => setActiveTab('surat-masuk')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition whitespace-nowrap relative ${
              activeTab === 'surat-masuk'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Surat Masuk</span>
            {pendingDisposisiCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950">
                {pendingDisposisiCount}
              </span>
            )}
          </button>

          <button
            id="tab-nav-surat-keluar"
            onClick={() => setActiveTab('surat-keluar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'surat-keluar'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Surat Keluar</span>
          </button>

          <button
            id="tab-nav-buku-agenda"
            onClick={() => setActiveTab('buku-agenda')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'buku-agenda'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-inner'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Buku Agenda & Rekapitulasi</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
