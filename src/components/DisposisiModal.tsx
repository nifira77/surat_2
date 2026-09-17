import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  FileText,
  Printer,
  Calendar,
  AlertTriangle,
  User,
  ListOrdered,
  Save,
} from 'lucide-react';
import { SuratMasuk, DisposisiData } from '../types';
import { useSurat } from '../context/SuratContext';
import { PEJABAT_DISPOSISI, INSTRUKSI_DISPOSISI } from '../data/klasifikasi';

interface DisposisiModalProps {
  surat: SuratMasuk;
  onClose: () => void;
  onPrintPreview: () => void;
}

export const DisposisiModal: React.FC<DisposisiModalProps> = ({
  surat,
  onClose,
  onPrintPreview,
}) => {
  const { simpanDisposisi, updateSuratMasuk, profil } = useSurat();

  const [tglDisposisi, setTglDisposisi] = useState(
    surat.disposisi?.tglDisposisi || new Date().toISOString().split('T')[0]
  );
  const [diteruskanKepada, setDiteruskanKepada] = useState<string[]>(
    surat.disposisi?.diteruskanKepada || []
  );
  const [instruksi, setInstruksi] = useState<string[]>(
    surat.disposisi?.instruksi || []
  );
  const [catatanKepalaSekolah, setCatatanKepalaSekolah] = useState(
    surat.disposisi?.catatanKepalaSekolah || ''
  );
  const [batasWaktu, setBatasWaktu] = useState(
    surat.disposisi?.batasWaktu || ''
  );
  const [parafKepalaSekolah, setParafKepalaSekolah] = useState(
    surat.disposisi?.parafKepalaSekolah ?? true
  );
  const [statusTindakLanjut, setStatusTindakLanjut] = useState(
    surat.statusDisposisi
  );

  const togglePejabat = (pejabat: string) => {
    setDiteruskanKepada((prev) =>
      prev.includes(pejabat) ? prev.filter((p) => p !== pejabat) : [...prev, pejabat]
    );
  };

  const toggleInstruksi = (item: string) => {
    setInstruksi((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSave = (andPrint: boolean = false) => {
    const data: DisposisiData = {
      tglDisposisi,
      diteruskanKepada,
      instruksi,
      catatanKepalaSekolah,
      batasWaktu: batasWaktu || undefined,
      parafKepalaSekolah,
    };

    simpanDisposisi(surat.id, data);
    updateSuratMasuk(surat.id, {
      statusDisposisi: statusTindakLanjut === 'Belum Didisposisi' ? 'Sudah Didisposisi' : statusTindakLanjut,
    });

    if (andPrint) {
      onPrintPreview();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                Lembar Disposisi Kepala Sekolah
              </h3>
              <p className="text-xs text-slate-300">
                Instruksi & Arahan Pimpinan untuk Surat Masuk No. Agenda: <span className="font-mono text-emerald-400 font-bold">{surat.noAgenda}</span>
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          {/* Incoming Letter Quick Brief */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-semibold text-slate-500">Asal Surat:</span>
              <span className="font-bold text-slate-900">{surat.pengirim}</span>
              <span className="text-slate-400">•</span>
              <span className="font-semibold text-slate-500">No. Surat:</span>
              <span className="font-mono text-slate-800">{surat.noSurat}</span>
              <span className="text-slate-400">•</span>
              <span className="font-semibold text-slate-500">Sifat:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  surat.sifat === 'Segera'
                    ? 'bg-red-100 text-red-700'
                    : surat.sifat === 'Penting'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {surat.sifat}
              </span>
            </div>
            <div className="pt-1 border-t border-slate-200">
              <p className="font-bold text-slate-900 text-sm">{surat.perihal}</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{surat.ringkasan}</p>
            </div>
          </div>

          {/* Form Row 1: Tanggal Disposisi & Batas Waktu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Disposisi
              </label>
              <input
                type="date"
                value={tglDisposisi}
                onChange={(e) => setTglDisposisi(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Batas Waktu Penyelesaian (Deadline)
              </label>
              <input
                type="date"
                value={batasWaktu}
                onChange={(e) => setBatasWaktu(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Diteruskan Kepada (Checkboxes) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Diteruskan Kepada Sdr. (Pilih Pejabat / Staf yang Ditugaskan):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
              {PEJABAT_DISPOSISI.map((pejabat) => {
                const checked = diteruskanKepada.includes(pejabat);
                return (
                  <label
                    key={pejabat}
                    className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition text-xs select-none ${
                      checked
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-semibold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePejabat(pejabat)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>{pejabat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Instruksi / Petunjuk (Checkboxes) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Petunjuk / Instruksi Kepala Sekolah:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {INSTRUKSI_DISPOSISI.map((item) => {
                const checked = instruksi.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition text-xs select-none ${
                      checked
                        ? 'bg-blue-50 border border-blue-300 text-blue-950 font-semibold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleInstruksi(item)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Catatan Tambahan Kepala Sekolah */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              3. Catatan Khusus / Uraian Tindak Lanjut Pimpinan:
            </label>
            <textarea
              rows={3}
              value={catatanKepalaSekolah}
              onChange={(e) => setCatatanKepalaSekolah(e.target.value)}
              placeholder="Tuliskan arahan spesifik Kepala Sekolah di sini..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Status & Paraf Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Penyelesaian
              </label>
              <select
                value={statusTindakLanjut}
                onChange={(e) => setStatusTindakLanjut(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Belum Didisposisi">Belum Didisposisi</option>
                <option value="Sudah Didisposisi">Sudah Didisposisi (Sedang Diproses)</option>
                <option value="Selesai">Selesai (Telah Ditindaklanjuti)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800 select-none">
                <input
                  type="checkbox"
                  checked={parafKepalaSekolah}
                  onChange={(e) => setParafKepalaSekolah(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Sahkan dengan Paraf Digital Kepala Sekolah ({profil.namaKepalaSekolah})</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Batal
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Simpan & Cetak Lembar</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Disposisi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
