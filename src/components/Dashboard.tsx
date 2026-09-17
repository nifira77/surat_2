import React from 'react';
import {
  Mail,
  Send,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText,
  PlusCircle,
  ArrowRight,
  Printer,
  ChevronRight,
  Building,
  UserCheck,
  Award,
} from 'lucide-react';
import { useSurat } from '../context/SuratContext';
import { SuratMasuk, SuratKeluar } from '../types';

interface DashboardProps {
  onNavigateTab: (tab: 'surat-masuk' | 'surat-keluar' | 'buku-agenda') => void;
  onOpenAddSuratMasuk: () => void;
  onOpenAddSuratKeluar: () => void;
  onOpenDisposisi: (surat: SuratMasuk) => void;
  onOpenPreviewSuratKeluar: (surat: SuratKeluar) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigateTab,
  onOpenAddSuratMasuk,
  onOpenAddSuratKeluar,
  onOpenDisposisi,
  onOpenPreviewSuratKeluar,
}) => {
  const { profil, suratMasukList, suratKeluarList } = useSurat();

  const totalMasuk = suratMasukList.length;
  const totalKeluar = suratKeluarList.length;

  const belumDisposisi = suratMasukList.filter(
    (s) => s.statusDisposisi === 'Belum Didisposisi'
  );

  const suratSegera = suratMasukList.filter(
    (s) => (s.sifat === 'Segera' || s.sifat === 'Penting') && s.statusDisposisi !== 'Selesai'
  );

  const menungguTtdKeluar = suratKeluarList.filter(
    (s) => s.status === 'Menunggu TTD' || s.status === 'Konsep / Draft'
  );

  const recentMasuk = suratMasukList.slice(0, 4);
  const recentKeluar = suratKeluarList.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* School Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Building className="w-3.5 h-3.5" />
            <span>Sistem Tata Usaha & Kearsipan Digital</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Selamat Datang di E-Surat {profil.namaSekolah}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Aplikasi administrasi persuratan resmi terintegrasi untuk pencatatan, penomoran
            otomatis, pembuatan lembar disposisi Kepala Sekolah, dan pengarsipan surat masuk & keluar.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Kepala Sekolah: <strong className="text-slate-200">{profil.namaKepalaSekolah}</strong></span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span>Kepala Tata Usaha: <strong className="text-slate-200">{profil.namaKepalaTU}</strong></span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Akreditasi: <strong className="text-amber-300">{profil.akreditasi}</strong></span>
            </div>
          </div>
        </div>

        {/* Action quick buttons */}
        <div className="flex flex-row md:flex-col gap-2.5 flex-shrink-0">
          <button
            id="btn-quick-add-masuk"
            onClick={onOpenAddSuratMasuk}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-xs transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Catat Surat Masuk</span>
          </button>
          <button
            id="btn-quick-add-keluar"
            onClick={onOpenAddSuratKeluar}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-xl border border-slate-600 shadow-xs transition active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Buat Surat Keluar</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Surat Masuk */}
        <div
          onClick={() => onNavigateTab('surat-masuk')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Surat Masuk
            </span>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">{totalMasuk}</span>
            <span className="text-xs text-slate-500 ml-2">Surat</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
            <span>Disposisi Selesai: {suratMasukList.filter(s => s.statusDisposisi === 'Selesai').length}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Belum Disposisi (Kritis) */}
        <div
          onClick={() => onNavigateTab('surat-masuk')}
          className="bg-white rounded-xl p-5 border border-amber-200 shadow-xs hover:border-amber-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Menunggu Disposisi
            </span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-900">{belumDisposisi.length}</span>
            <span className="text-xs text-amber-700 ml-2">Butuh Arahan Kasek</span>
          </div>
          <div className="mt-2 text-xs text-amber-800 flex items-center justify-between">
            <span>Dari {totalMasuk} surat masuk</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Total Surat Keluar */}
        <div
          onClick={() => onNavigateTab('surat-keluar')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Surat Keluar
            </span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition">
              <Send className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">{totalKeluar}</span>
            <span className="text-xs text-slate-500 ml-2">Dokumen</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
            <span>Diterbitkan: {suratKeluarList.filter(s => s.status === 'Diterbitkan' || s.status === 'Terkirim & Diarsipkan').length}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Menunggu Persetujuan/Draft */}
        <div
          onClick={() => onNavigateTab('surat-keluar')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-purple-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
              Draft / Menunggu TTD
            </span>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-purple-900">{menungguTtdKeluar.length}</span>
            <span className="text-xs text-purple-700 ml-2">Surat Keluar</span>
          </div>
          <div className="mt-2 text-xs text-purple-800 flex items-center justify-between">
            <span>Siap disahkan</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* Urgent Letters Alert Bar */}
      {suratSegera.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">
                  Perhatian: Terdapat {suratSegera.length} Surat Masuk Kategori Segera/Penting
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  Surat-surat kedinasan berikut memerlukan disposisi atau tindak lanjut dari pimpinan:
                </p>
                <div className="mt-2 space-y-1.5">
                  {suratSegera.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-2 text-xs bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200"
                    >
                      <div className="truncate">
                        <span className="font-semibold text-slate-800">{s.noAgenda}</span> -{' '}
                        <span className="text-slate-600">{s.pengirim}</span>: {s.perihal}
                      </div>
                      <button
                        onClick={() => onOpenDisposisi(s)}
                        className="flex-shrink-0 text-emerald-700 hover:text-emerald-900 font-semibold underline text-xs"
                      >
                        Buka Disposisi
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dual Recent Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incoming Letters */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Surat Masuk Terbaru</h3>
            </div>
            <button
              onClick={() => onNavigateTab('surat-masuk')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentMasuk.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">Belum ada surat masuk tercatat.</p>
            ) : (
              recentMasuk.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {item.noAgenda}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            item.sifat === 'Segera'
                              ? 'bg-red-100 text-red-700'
                              : item.sifat === 'Penting'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.sifat}
                        </span>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            item.statusDisposisi === 'Belum Didisposisi'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : item.statusDisposisi === 'Sudah Didisposisi'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {item.statusDisposisi}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">
                        {item.perihal}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Dari: <strong className="text-slate-700">{item.pengirim}</strong> | Diterima: {item.tglTerima}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenDisposisi(item)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-lg transition whitespace-nowrap"
                    >
                      {item.disposisi ? 'Lembar Disposisi' : 'Disposisi'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Outgoing Letters */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Surat Keluar Terbaru</h3>
            </div>
            <button
              onClick={() => onNavigateTab('surat-keluar')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentKeluar.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">Belum ada surat keluar tercatat.</p>
            ) : (
              recentKeluar.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.noSurat}
                        </span>
                        <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          {item.jenisSurat}
                        </span>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            item.status === 'Diterbitkan' || item.status === 'Terkirim & Diarsipkan'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">
                        {item.perihal}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Ditujukan: <strong className="text-slate-700">{item.penerima}</strong> | Tanggal: {item.tglSurat}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenPreviewSuratKeluar(item)}
                      className="px-2.5 py-1 text-xs font-medium text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition whitespace-nowrap flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Cetak</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
