import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  Download,
  Mail,
  Send,
  Calendar,
  Filter,
  CheckCircle,
} from 'lucide-react';
import { useSurat } from '../context/SuratContext';
import { KopSurat } from './KopSurat';

type LedgerType = 'masuk' | 'keluar';

export const BukuAgendaView: React.FC = () => {
  const { profil, suratMasukList, suratKeluarList } = useSurat();
  const [ledgerType, setLedgerType] = useState<LedgerType>('masuk');
  const [filterTahun, setFilterTahun] = useState<string>('2026');

  const currentYear = new Date().getFullYear().toString();

  // Filter letters by year
  const filteredMasuk = suratMasukList.filter((s) =>
    filterTahun === 'semua' ? true : s.tglTerima.startsWith(filterTahun)
  );

  const filteredKeluar = suratKeluarList.filter((s) =>
    filterTahun === 'semua' ? true : s.tglSurat.startsWith(filterTahun)
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = '';
    const dateStr = new Date().toISOString().split('T')[0];

    if (ledgerType === 'masuk') {
      const headers = [
        'No. Urut',
        'No. Agenda',
        'Tanggal Diterima',
        'Asal Surat / Pengirim',
        'Nomor Surat Asal',
        'Tanggal Surat Asal',
        'Perihal',
        'Klasifikasi',
        'Sifat',
        'Status Disposisi',
        'Diteruskan Kepada',
        'Lokasi Arsip',
      ];
      const rows = filteredMasuk.map((item, idx) => [
        idx + 1,
        `"${item.noAgenda}"`,
        `"${item.tglTerima}"`,
        `"${item.pengirim.replace(/"/g, '""')}"`,
        `"${item.noSurat.replace(/"/g, '""')}"`,
        `"${item.tglSurat}"`,
        `"${item.perihal.replace(/"/g, '""')}"`,
        `"${item.kodeKlasifikasi}"`,
        `"${item.sifat}"`,
        `"${item.statusDisposisi}"`,
        `"${item.disposisi?.diteruskanKepada?.join('; ') || '-'}"`,
        `"${item.lokasiArsip}"`,
      ]);

      csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else {
      const headers = [
        'No. Urut',
        'No. Agenda',
        'Nomor Surat Keluar',
        'Tanggal Surat',
        'Tujuan / Penerima',
        'Perihal',
        'Jenis Dokumen',
        'Klasifikasi',
        'Status',
        'Penandatangan',
        'Lokasi Arsip',
      ];
      const rows = filteredKeluar.map((item, idx) => [
        idx + 1,
        `"${item.noAgenda}"`,
        `"${item.noSurat.replace(/"/g, '""')}"`,
        `"${item.tglSurat}"`,
        `"${item.penerima.replace(/"/g, '""')}"`,
        `"${item.perihal.replace(/"/g, '""')}"`,
        `"${item.jenisSurat}"`,
        `"${item.kodeKlasifikasi}"`,
        `"${item.status}"`,
        `"${item.penandatangan}"`,
        `"${item.lokasiArsip}"`,
      ]);

      csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    }

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `buku_agenda_surat_${ledgerType}_smpn14_tubaba_${filterTahun}_${dateStr}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Action and Filter Bar (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Buku Agenda & Rekapitulasi Persuratan
              </h2>
              <p className="text-xs text-slate-500">
                Buku ekspedisi & buku register resmi kearsipan SMPN 14 Tulang Bawang Barat
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher + Year filter + Print/Export actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ledger Type Switch */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setLedgerType('masuk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                ledgerType === 'masuk'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Agenda Surat Masuk ({filteredMasuk.length})</span>
            </button>
            <button
              onClick={() => setLedgerType('keluar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                ledgerType === 'keluar'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Agenda Surat Keluar ({filteredKeluar.length})</span>
            </button>
          </div>

          {/* Filter Year */}
          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500 text-xs font-medium"
            >
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
              <option value="semua">Semua Periode</option>
            </select>
          </div>

          {/* Export to CSV */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition"
            title="Download file CSV untuk Microsoft Excel"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ekspor CSV</span>
          </button>

          {/* Print Buku Agenda */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Buku Agenda</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 printable-area text-slate-900">
        {/* Kop Surat Sekolah */}
        <KopSurat />

        {/* Title Header */}
        <div className="text-center my-4">
          <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide underline underline-offset-4">
            {ledgerType === 'masuk'
              ? 'BUKU AGENDA SURAT MASUK'
              : 'BUKU AGENDA SURAT KELUAR'}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Tahun Anggaran / Periode: {filterTahun === 'semua' ? 'Semua Periode' : filterTahun}
          </p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-6">
          {ledgerType === 'masuk' ? (
            <table className="w-full text-left text-xs border-collapse border border-slate-900">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-900 font-bold text-center">
                  <th className="border border-slate-900 p-2 w-10">No.</th>
                  <th className="border border-slate-900 p-2 w-24">Tgl Terima</th>
                  <th className="border border-slate-900 p-2 w-28">No. Agenda</th>
                  <th className="border border-slate-900 p-2">Alamat / Pengirim</th>
                  <th className="border border-slate-900 p-2 w-36">No. Surat Asal</th>
                  <th className="border border-slate-900 p-2 w-24">Tgl Surat</th>
                  <th className="border border-slate-900 p-2">Perihal / Isi Ringkas</th>
                  <th className="border border-slate-900 p-2 w-20">Sifat</th>
                  <th className="border border-slate-900 p-2 w-32">Diteruskan Kepada</th>
                  <th className="border border-slate-900 p-2 w-24">Lokasi Arsip</th>
                </tr>
              </thead>
              <tbody>
                {filteredMasuk.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="border border-slate-900 p-6 text-center text-slate-400">
                      Tidak ada data surat masuk untuk periode ini.
                    </td>
                  </tr>
                ) : (
                  filteredMasuk.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-900">
                      <td className="border border-slate-900 p-2 text-center font-bold">
                        {idx + 1}
                      </td>
                      <td className="border border-slate-900 p-2 whitespace-nowrap text-center">
                        {item.tglTerima}
                      </td>
                      <td className="border border-slate-900 p-2 font-mono font-bold text-center whitespace-nowrap">
                        {item.noAgenda}
                      </td>
                      <td className="border border-slate-900 p-2 font-medium">
                        {item.pengirim}
                      </td>
                      <td className="border border-slate-900 p-2 font-mono text-xs">
                        {item.noSurat}
                      </td>
                      <td className="border border-slate-900 p-2 whitespace-nowrap text-center">
                        {item.tglSurat}
                      </td>
                      <td className="border border-slate-900 p-2">
                        <div className="font-semibold">{item.perihal}</div>
                        <div className="text-[11px] text-slate-600 italic mt-0.5">{item.kodeKlasifikasi}</div>
                      </td>
                      <td className="border border-slate-900 p-2 text-center font-medium">
                        {item.sifat}
                      </td>
                      <td className="border border-slate-900 p-2 text-xs">
                        {item.disposisi?.diteruskanKepada?.join(', ') || '-'}
                      </td>
                      <td className="border border-slate-900 p-2 text-[11px] text-center">
                        {item.lokasiArsip}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse border border-slate-900">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-900 font-bold text-center">
                  <th className="border border-slate-900 p-2 w-10">No.</th>
                  <th className="border border-slate-900 p-2 w-24">No. Agenda</th>
                  <th className="border border-slate-900 p-2 w-44">Nomor Surat Dinas</th>
                  <th className="border border-slate-900 p-2 w-24">Tgl Surat</th>
                  <th className="border border-slate-900 p-2">Ditujukan Kepada</th>
                  <th className="border border-slate-900 p-2">Perihal / Hal</th>
                  <th className="border border-slate-900 p-2 w-28">Jenis Dokumen</th>
                  <th className="border border-slate-900 p-2 w-24">Status Alur</th>
                  <th className="border border-slate-900 p-2 w-28">Lokasi Arsip</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeluar.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="border border-slate-900 p-6 text-center text-slate-400">
                      Tidak ada data surat keluar untuk periode ini.
                    </td>
                  </tr>
                ) : (
                  filteredKeluar.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-900">
                      <td className="border border-slate-900 p-2 text-center font-bold">
                        {idx + 1}
                      </td>
                      <td className="border border-slate-900 p-2 font-mono font-bold text-center whitespace-nowrap">
                        {item.noAgenda}
                      </td>
                      <td className="border border-slate-900 p-2 font-mono font-bold text-xs whitespace-nowrap">
                        {item.noSurat}
                      </td>
                      <td className="border border-slate-900 p-2 whitespace-nowrap text-center">
                        {item.tglSurat}
                      </td>
                      <td className="border border-slate-900 p-2 font-medium">
                        <div>{item.penerima}</div>
                        <div className="text-[11px] text-slate-500">{item.alamatPenerima}</div>
                      </td>
                      <td className="border border-slate-900 p-2">
                        <div className="font-semibold">{item.perihal}</div>
                        <div className="text-[11px] text-slate-600 italic mt-0.5">{item.kodeKlasifikasi}</div>
                      </td>
                      <td className="border border-slate-900 p-2 text-center font-medium">
                        {item.jenisSurat}
                      </td>
                      <td className="border border-slate-900 p-2 text-center text-xs">
                        {item.status}
                      </td>
                      <td className="border border-slate-900 p-2 text-[11px] text-center">
                        {item.lokasiArsip}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Administrative Endorsement Signatures (Lembar Pengesahan Buku Agenda) */}
        <div className="mt-12 flex justify-between items-start text-xs sm:text-sm font-sans pt-6">
          <div className="text-center w-60">
            <p className="font-medium text-slate-700">Mengetahui,</p>
            <p className="font-bold text-slate-900 uppercase">Kepala Sekolah</p>
            <div className="h-20 flex items-center justify-center font-serif italic text-slate-400">
              (Tanda Tangan & Cap)
            </div>
            <p className="font-bold text-slate-950 underline underline-offset-2">
              {profil.namaKepalaSekolah}
            </p>
            <p className="text-[11px] text-slate-600">
              NIP. {profil.nipKepalaSekolah}
            </p>
          </div>

          <div className="text-center w-60">
            <p className="font-medium text-slate-700">
              Tulang Bawang Barat, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="font-bold text-slate-900 uppercase">Kepala Tata Usaha</p>
            <div className="h-20 flex items-center justify-center font-serif italic text-slate-400">
              (Tanda Tangan)
            </div>
            <p className="font-bold text-slate-950 underline underline-offset-2">
              {profil.namaKepalaTU}
            </p>
            <p className="text-[11px] text-slate-600">
              NIP. {profil.nipKepalaTU}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
