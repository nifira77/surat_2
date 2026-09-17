import React, { useState, useMemo } from 'react';
import {
  Mail,
  Search,
  Filter,
  PlusCircle,
  FileText,
  Printer,
  Edit2,
  Trash2,
  Paperclip,
  CheckCircle,
  Clock,
  AlertCircle,
  Archive,
  ChevronDown,
  Eye,
} from 'lucide-react';
import { SuratMasuk, SifatSurat, StatusDisposisi } from '../types';
import { useSurat } from '../context/SuratContext';

interface SuratMasukViewProps {
  onOpenAddModal: () => void;
  onEditSurat: (surat: SuratMasuk) => void;
  onOpenDisposisi: (surat: SuratMasuk) => void;
  onPrintDisposisi: (surat: SuratMasuk) => void;
}

export const SuratMasukView: React.FC<SuratMasukViewProps> = ({
  onOpenAddModal,
  onEditSurat,
  onOpenDisposisi,
  onPrintDisposisi,
}) => {
  const { suratMasukList, deleteSuratMasuk, updateSuratMasuk } = useSurat();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSifat, setFilterSifat] = useState<string>('semua');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [selectedSuratDetail, setSelectedSuratDetail] = useState<SuratMasuk | null>(null);

  // Filtered letters
  const filteredList = useMemo(() => {
    return suratMasukList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.noAgenda.toLowerCase().includes(q) ||
        item.noSurat.toLowerCase().includes(q) ||
        item.pengirim.toLowerCase().includes(q) ||
        item.perihal.toLowerCase().includes(q) ||
        item.kodeKlasifikasi.toLowerCase().includes(q);

      const matchSifat =
        filterSifat === 'semua' || item.sifat === filterSifat;

      const matchStatus =
        filterStatus === 'semua' || item.statusDisposisi === filterStatus;

      return matchSearch && matchSifat && matchStatus;
    });
  }, [suratMasukList, searchQuery, filterSifat, filterStatus]);

  const handleDelete = (id: string, noAgenda: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus surat masuk No. Agenda "${noAgenda}"?`)) {
      deleteSuratMasuk(id);
    }
  };

  const handleToggleSelesai = (surat: SuratMasuk) => {
    const newStatus: StatusDisposisi =
      surat.statusDisposisi === 'Selesai' ? 'Sudah Didisposisi' : 'Selesai';
    updateSuratMasuk(surat.id, { statusDisposisi: newStatus });
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Administrasi Surat Masuk
              </h2>
              <p className="text-xs text-slate-500">
                Pencatatan surat masuk dinas, lembar disposisi Kepala Sekolah, dan arsip digital
              </p>
            </div>
          </div>
        </div>

        <button
          id="btn-tambah-surat-masuk"
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Catat Surat Masuk Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari no. surat, pengirim, perihal..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1 text-xs text-slate-600 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter:</span>
          </div>

          <select
            value={filterSifat}
            onChange={(e) => setFilterSifat(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="semua">Semua Sifat</option>
            <option value="Segera">Segera</option>
            <option value="Penting">Penting</option>
            <option value="Biasa">Biasa</option>
            <option value="Rahasia">Rahasia</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="semua">Semua Status Disposisi</option>
            <option value="Belum Didisposisi">Belum Didisposisi</option>
            <option value="Sudah Didisposisi">Sudah Didisposisi</option>
            <option value="Selesai">Selesai</option>
          </select>

          {(searchQuery || filterSifat !== 'semua' || filterStatus !== 'semua') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterSifat('semua');
                setFilterStatus('semua');
              }}
              className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold px-2 py-1 underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">No. Agenda</th>
                <th className="py-3 px-4">Tgl Terima</th>
                <th className="py-3 px-4">Pengirim & No. Surat Asal</th>
                <th className="py-3 px-4">Perihal & Klasifikasi</th>
                <th className="py-3 px-4">Sifat</th>
                <th className="py-3 px-4">Status Disposisi</th>
                <th className="py-3 px-4 text-center">Aksi Administrasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Tidak ada surat masuk yang sesuai dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition group">
                    {/* No Agenda */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.noAgenda}
                    </td>

                    {/* Tgl Terima */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {item.tglTerima}
                    </td>

                    {/* Pengirim & No Surat */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900">{item.pengirim}</div>
                      <div className="text-xs font-mono text-slate-500 mt-0.5">{item.noSurat}</div>
                      <div className="text-[11px] text-slate-400">Tgl Surat: {item.tglSurat}</div>
                    </td>

                    {/* Perihal & Klasifikasi */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-medium text-slate-900 line-clamp-2">
                        {item.perihal}
                      </div>
                      <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                        <span className="font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {item.kodeKlasifikasi}
                        </span>
                      </div>
                      {item.lampiranFile && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                          <Paperclip className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[180px]">{item.lampiranFile}</span>
                        </div>
                      )}
                    </td>

                    {/* Sifat */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          item.sifat === 'Segera'
                            ? 'bg-red-100 text-red-800'
                            : item.sifat === 'Penting'
                            ? 'bg-amber-100 text-amber-800'
                            : item.sifat === 'Rahasia'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.sifat}
                      </span>
                    </td>

                    {/* Status Disposisi */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                            item.statusDisposisi === 'Belum Didisposisi'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : item.statusDisposisi === 'Sudah Didisposisi'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          {item.statusDisposisi === 'Belum Didisposisi' && (
                            <Clock className="w-3 h-3 text-amber-600" />
                          )}
                          {item.statusDisposisi === 'Sudah Didisposisi' && (
                            <FileText className="w-3 h-3 text-blue-600" />
                          )}
                          {item.statusDisposisi === 'Selesai' && (
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          )}
                          <span>{item.statusDisposisi}</span>
                        </span>

                        {item.disposisi?.diteruskanKepada && (
                          <p className="text-[11px] text-slate-500 max-w-[150px] truncate">
                            Ke: {item.disposisi.diteruskanKepada.join(', ')}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Disposisi Button */}
                        <button
                          onClick={() => onOpenDisposisi(item)}
                          className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition ${
                            item.disposisi
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                              : 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs'
                          }`}
                          title="Buka / Atur Disposisi Kepala Sekolah"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{item.disposisi ? 'Ubah Disposisi' : 'Disposisi'}</span>
                        </button>

                        {/* Print Disposisi */}
                        <button
                          onClick={() => onPrintDisposisi(item)}
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition"
                          title="Cetak Lembar Disposisi"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => onEditSurat(item)}
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-slate-200 transition"
                          title="Edit Surat Masuk"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id, item.noAgenda)}
                          className="p-1.5 text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-slate-200 transition"
                          title="Hapus Surat Masuk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between flex-wrap gap-2">
          <span>Menampilkan {filteredList.length} dari {suratMasukList.length} surat masuk</span>
          <span>SMPN 14 Tulang Bawang Barat • Tata Kearsipan Digital</span>
        </div>
      </div>
    </div>
  );
};
