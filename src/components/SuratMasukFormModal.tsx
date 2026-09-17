import React, { useState } from 'react';
import {
  X,
  Plus,
  Save,
  FileText,
  Upload,
  Calendar,
  Building,
  CheckCircle,
  FileUp,
} from 'lucide-react';
import { SuratMasuk, SifatSurat } from '../types';
import { useSurat } from '../context/SuratContext';
import { DAFTAR_KLASIFIKASI } from '../data/klasifikasi';

interface SuratMasukFormModalProps {
  suratToEdit?: SuratMasuk | null;
  onClose: () => void;
}

const PENGIRIM_SUGGESTIONS = [
  'Dinas Pendidikan dan Kebudayaan Kab. Tulang Bawang Barat',
  'Musyawarah Kerja Kepala Sekolah (MKKS) SMP Kab. Tubaba',
  'Puskesmas Rawat Inap Kencana Kec. Tulang Bawang Udik',
  'Kwartir Cabang Gerakan Pramuka Tulang Bawang Barat',
  'Komite SMPN 14 Tulang Bawang Barat',
  'Kantor Kecamatan Tulang Bawang Udik',
  'Pemerintah Tiyuh / Desa Marga Kencana',
  'Kementerian Agama Kab. Tulang Bawang Barat',
];

export const SuratMasukFormModal: React.FC<SuratMasukFormModalProps> = ({
  suratToEdit,
  onClose,
}) => {
  const { addSuratMasuk, updateSuratMasuk, getNextNoAgenda } = useSurat();

  const isEdit = !!suratToEdit;

  const [noAgenda, setNoAgenda] = useState(
    suratToEdit?.noAgenda || getNextNoAgenda('masuk')
  );
  const [noSurat, setNoSurat] = useState(suratToEdit?.noSurat || '');
  const [tglSurat, setTglSurat] = useState(
    suratToEdit?.tglSurat || new Date().toISOString().split('T')[0]
  );
  const [tglTerima, setTglTerima] = useState(
    suratToEdit?.tglTerima || new Date().toISOString().split('T')[0]
  );
  const [pengirim, setPengirim] = useState(suratToEdit?.pengirim || '');
  const [tujuan, setTujuan] = useState(
    suratToEdit?.tujuan || 'Kepala SMPN 14 Tulang Bawang Barat'
  );
  const [perihal, setPerihal] = useState(suratToEdit?.perihal || '');
  const [ringkasan, setRingkasan] = useState(suratToEdit?.ringkasan || '');
  const [kodeKlasifikasi, setKodeKlasifikasi] = useState(
    suratToEdit?.kodeKlasifikasi || '420 - Pendidikan (Umum)'
  );
  const [sifat, setSifat] = useState<SifatSurat>(suratToEdit?.sifat || 'Biasa');
  const [lokasiArsip, setLokasiArsip] = useState(
    suratToEdit?.lokasiArsip || 'Ordner SM-2026 / Rak A-01'
  );
  const [lampiranFileName, setLampiranFileName] = useState(
    suratToEdit?.lampiranFile || ''
  );

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLampiranFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noAgenda || !noSurat || !pengirim || !perihal) {
      alert('Mohon lengkapi data wajib: No. Agenda, No. Surat, Pengirim, dan Perihal!');
      return;
    }

    if (isEdit && suratToEdit) {
      updateSuratMasuk(suratToEdit.id, {
        noAgenda,
        noSurat,
        tglSurat,
        tglTerima,
        pengirim,
        tujuan,
        perihal,
        ringkasan,
        kodeKlasifikasi,
        sifat,
        lokasiArsip,
        lampiranFile: lampiranFileName || undefined,
      });
    } else {
      addSuratMasuk({
        noAgenda,
        noSurat,
        tglSurat,
        tglTerima,
        pengirim,
        tujuan,
        perihal,
        ringkasan,
        kodeKlasifikasi,
        sifat,
        statusDisposisi: 'Belum Didisposisi',
        lokasiArsip,
        lampiranFile: lampiranFileName || undefined,
        disposisi: null,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {isEdit ? 'Ubah Data Surat Masuk' : 'Pencatatan Surat Masuk Baru'}
              </h3>
              <p className="text-xs text-slate-300">
                Registrasi arsip dan buku agenda persuratan SMPN 14 Tulang Bawang Barat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-slate-800 text-sm">
          {/* Row 1: Nomor Agenda & Kode Klasifikasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Agenda / Indeks Masuk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={noAgenda}
                onChange={(e) => setNoAgenda(e.target.value)}
                placeholder="Contoh: 006/SM/2026"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kode Klasifikasi Kearsipan <span className="text-red-500">*</span>
              </label>
              <select
                value={kodeKlasifikasi}
                onChange={(e) => setKodeKlasifikasi(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                {DAFTAR_KLASIFIKASI.map((k) => (
                  <option key={k.kode} value={`${k.kode} - ${k.nama}`}>
                    {k.kode} - {k.nama} ({k.kategori})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Pengirim / Asal Surat */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Instansi Pengirim / Asal Surat <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500">Pilih rekomendasi instansi di bawah:</span>
            </div>
            <input
              type="text"
              required
              value={pengirim}
              onChange={(e) => setPengirim(e.target.value)}
              placeholder="Ketik nama instansi, dinas, atau organisasi pengirim..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            {/* Suggestion pills */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PENGIRIM_SUGGESTIONS.map((sug) => (
                <button
                  type="button"
                  key={sug}
                  onClick={() => setPengirim(sug)}
                  className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition text-slate-600"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Nomor Surat Asli & Tanggal Surat Asli */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Surat dari Pengirim <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={noSurat}
                onChange={(e) => setNoSurat(e.target.value)}
                placeholder="Contoh: 420/142/DISDIK-TBB/II/2026"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Surat Asal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={tglSurat}
                onChange={(e) => setTglSurat(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 4: Tanggal Diterima & Sifat Surat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Diterima di TU Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={tglTerima}
                onChange={(e) => setTglTerima(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sifat Kerahasiaan / Urgensi Surat <span className="text-red-500">*</span>
              </label>
              <select
                value={sifat}
                onChange={(e) => setSifat(e.target.value as SifatSurat)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
              >
                <option value="Biasa">Biasa (Standar Operasional)</option>
                <option value="Penting">Penting (Memerlukan Tindak Lanjut Khusus)</option>
                <option value="Segera">Segera (Mendesak / Deadline Dekat)</option>
                <option value="Rahasia">Rahasia (Hanya untuk Pimpinan)</option>
              </select>
            </div>
          </div>

          {/* Row 5: Perihal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Perihal / Judul Surat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={perihal}
              onChange={(e) => setPerihal(e.target.value)}
              placeholder="Contoh: Undangan Rapat Koordinasi Kurikulum Merdeka..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
            />
          </div>

          {/* Row 6: Ringkasan Isi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ringkasan / Catatan Isi Surat
            </label>
            <textarea
              rows={2}
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder="Ringkasan poin penting isi surat untuk memudahkan Kepala Sekolah saat meninjau disposisi..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Row 7: Lokasi Arsip Fisik & Upload Berkas Digital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lokasi Penyimpanan Arsip Fisik
              </label>
              <input
                type="text"
                value={lokasiArsip}
                onChange={(e) => setLokasiArsip(e.target.value)}
                placeholder="Contoh: Ordner SM-2026 / Rak A-01"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scan Berkas / Lampiran Digital (PDF/JPG)
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg hover:border-emerald-500 cursor-pointer bg-slate-50 transition text-xs text-slate-600">
                  <FileUp className="w-4 h-4 text-emerald-600" />
                  <span className="truncate">
                    {lampiranFileName || 'Pilih Berkas Scan Surat...'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUploadSim}
                    className="hidden"
                  />
                </label>
                {lampiranFileName && (
                  <button
                    type="button"
                    onClick={() => setLampiranFileName('')}
                    className="p-2 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                    title="Hapus berkas"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Simpan Perubahan' : 'Catat Surat Masuk'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
