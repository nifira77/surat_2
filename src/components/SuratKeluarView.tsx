import React, { useState, useMemo } from 'react';
import {
  Send,
  Search,
  Filter,
  PlusCircle,
  Printer,
  Edit2,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  Archive,
  Eye,
} from 'lucide-react';
import { SuratKeluar, JenisSuratKeluar, StatusSuratKeluar } from '../types';
import { useSurat } from '../context/SuratContext';

interface SuratKeluarViewProps {
  onOpenAddModal: () => void;
  onEditSurat: (surat: SuratKeluar) => void;
  onPreviewSurat: (surat: SuratKeluar) => void;
}

export const SuratKeluarView: React.FC<SuratKeluarViewProps> = ({
  onOpenAddModal,
  onEditSurat,
  onPreviewSurat,
}) => {
  const { suratKeluarList, deleteSuratKeluar, updateSuratKeluar } = useSurat();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterJenis, setFilterJenis] = useState<string>('semua');
  const [filterStatus, setFilterStatus] = useState<string>('semua');

  const filteredList = useMemo(() => {
    return suratKeluarList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.noAgenda.toLowerCase().includes(q) ||
        item.noSurat.toLowerCase().includes(q) ||
        item.penerima.toLowerCase().includes(q) ||
        item.perihal.toLowerCase().includes(q) ||
        item.kodeKlasifikasi.toLowerCase().includes(q);

      const matchJenis =
        filterJenis === 'semua' || item.jenisSurat === filterJenis;

      const matchStatus =
        filterStatus === 'semua' || item.status === filterStatus;

      return matchSearch && matchJenis && matchStatus;
    });
  }, [suratKeluarList, searchQuery, filterJenis, filterStatus]);

  const handleDelete = (id: string, noSurat: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus surat keluar "${noSurat}"?`)) {
      deleteSuratKeluar(id);
    }
  };

  const handleQuickApprove = (surat: SuratKeluar) => {
    const nextStatus: StatusSuratKeluar =
      surat.status === 'Konsep / Draft' || surat.status === 'Menunggu TTD'
        ? 'Diterbitkan'
        : 'Terkirim & Diarsipkan';
    updateSuratKeluar(surat.id, { status: nextStatus });
  };

  return (
    <div className="space-y-5">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <Send className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Administrasi Surat Keluar
            </h2>
            <p className="text-xs text-slate-500">
              Penerbitan surat dinas resmi, nomor agenda otomatis, template naskah, dan arsip digital
            </p>
          </div>
        </div>

        <button
          id="btn-tambah-surat-keluar"
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Surat Keluar Baru</span>
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
            placeholder="Cari no. surat, penerima, perihal..."
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
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="semua">Semua Jenis Surat</option>
            <option value="Surat Tugas">Surat Tugas</option>
            <option value="Surat Undangan">Surat Undangan</option>
            <option value="Surat Edaran">Surat Edaran</option>
            <option value="Surat Keterangan Siswa">Surat Keterangan Siswa</option>
            <option value="Surat Rekomendasi">Surat Rekomendasi</option>
            <option value="Surat Pengantar">Surat Pengantar</option>
            <option value="Surat Panggilan Orang Tua">Surat Panggilan Orang Tua</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="semua">Semua Status</option>
            <option value="Konsep / Draft">Konsep / Draft</option>
            <option value="Menunggu TTD">Menunggu TTD</option>
            <option value="Diterbitkan">Diterbitkan</option>
            <option value="Terkirim & Diarsipkan">Terkirim & Diarsipkan</option>
          </select>

          {(searchQuery || filterJenis !== 'semua' || filterStatus !== 'semua') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterJenis('semua');
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
                <th className="py-3 px-4">Nomor Surat Resmi</th>
                <th className="py-3 px-4">Tgl Surat</th>
                <th className="py-3 px-4">Tujuan / Penerima</th>
                <th className="py-3 px-4">Perihal & Klasifikasi</th>
                <th className="py-3 px-4">Status Alur</th>
                <th className="py-3 px-4 text-center">Aksi Dokumen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Tidak ada surat keluar yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition group">
                    {/* No Agenda */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.noAgenda}
                    </td>

                    {/* No Surat Resmi */}
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800 whitespace-nowrap">
                      <span className="bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        {item.noSurat}
                      </span>
                    </td>

                    {/* Tgl Surat */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {item.tglSurat}
                    </td>

                    {/* Tujuan / Penerima */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900">{item.penerima}</div>
                      <div className="text-xs text-slate-500">{item.alamatPenerima}</div>
                    </td>

                    {/* Perihal & Klasifikasi */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-medium text-slate-900 line-clamp-2">
                        {item.perihal}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold text-[11px]">
                          {item.jenisSurat}
                        </span>
                        <span className="text-emerald-700 text-[11px]">
                          {item.kodeKlasifikasi}
                        </span>
                      </div>
                    </td>

                    {/* Status Alur */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          item.status === 'Diterbitkan' || item.status === 'Terkirim & Diarsipkan'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.status === 'Menunggu TTD'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {item.status === 'Diterbitkan' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {item.status === 'Menunggu TTD' && <Clock className="w-3 h-3 text-purple-600" />}
                        {item.status === 'Konsep / Draft' && <FileText className="w-3 h-3 text-amber-600" />}
                        {item.status === 'Terkirim & Diarsipkan' && <Archive className="w-3 h-3 text-emerald-700" />}
                        <span>{item.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Preview / Print */}
                        <button
                          onClick={() => onPreviewSurat(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-xs transition"
                          title="Pratinjau & Cetak Dokumen Resmi"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Cetak Surat</span>
                        </button>

                        {/* Quick status transition */}
                        {item.status !== 'Terkirim & Diarsipkan' && (
                          <button
                            onClick={() => handleQuickApprove(item)}
                            className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition"
                            title={
                              item.status === 'Konsep / Draft' || item.status === 'Menunggu TTD'
                                ? 'Sahkan / Terbitkan Surat'
                                : 'Tandai Terkirim & Diarsipkan'
                            }
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Edit */}
                        <button
                          onClick={() => onEditSurat(item)}
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-slate-200 transition"
                          title="Edit Surat Keluar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id, item.noSurat)}
                          className="p-1.5 text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-slate-200 transition"
                          title="Hapus Surat Keluar"
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
          <span>Menampilkan {filteredList.length} dari {suratKeluarList.length} surat keluar</span>
          <span>SMPN 14 Tulang Bawang Barat • Format Tata Naskah Dinas Pendidikan</span>
        </div>
      </div>
    </div>
  );
};
