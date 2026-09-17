import React, { useState } from 'react';
import {
  X,
  Save,
  Building,
  Download,
  Upload,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useSurat } from '../context/SuratContext';
import { ProfilSekolah } from '../types';

interface PengaturanSekolahModalProps {
  onClose: () => void;
}

export const PengaturanSekolahModal: React.FC<PengaturanSekolahModalProps> = ({ onClose }) => {
  const { profil, updateProfil, exportDataJSON, importDataJSON, resetToSampleData } = useSurat();

  const [formData, setFormData] = useState<ProfilSekolah>({ ...profil });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof ProfilSekolah, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfil(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataJSON(content);
        if (success) {
          alert('Data arsip surat dan profil sekolah berhasil dipulihkan (Restore Sukses)!');
          onClose();
        } else {
          alert('Format file JSON tidak valid atau rusak!');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin mengatur ulang data ke data percontohan awal SMPN 14 Tulang Bawang Barat? Data yang belum dicadangkan akan hilang.'
      )
    ) {
      resetToSampleData();
      alert('Data persuratan berhasil direset ke percontohan awal.');
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
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                Pengaturan Profil Sekolah & Cadangan Data
              </h3>
              <p className="text-xs text-slate-300">
                Sesuaikan identitas Kop Surat resmi dan kelola pencadangan arsip
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

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          {/* Section: Identitas Sekolah & Kop Surat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 pb-1 mb-3 border-b border-emerald-200">
              1. Identitas Sekolah & Kop Surat Resmi
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Satuan Pendidikan / Sekolah
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaSekolah}
                  onChange={(e) => handleChange('namaSekolah', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pemerintah Daerah
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaPemerintah}
                  onChange={(e) => handleChange('namaPemerintah', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dinas Pendidikan
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaDinas}
                  onChange={(e) => handleChange('namaDinas', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NPSN
                </label>
                <input
                  type="text"
                  required
                  value={formData.npsn}
                  onChange={(e) => handleChange('npsn', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NSS
                </label>
                <input
                  type="text"
                  value={formData.nss}
                  onChange={(e) => handleChange('nss', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alamat Lengkap Sekolah
                </label>
                <input
                  type="text"
                  required
                  value={formData.alamat}
                  onChange={(e) => handleChange('alamat', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kecamatan & Kabupaten
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.kecamatan}
                    onChange={(e) => handleChange('kecamatan', e.target.value)}
                    placeholder="Kecamatan"
                    className="w-1/2 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={formData.kabupaten}
                    onChange={(e) => handleChange('kabupaten', e.target.value)}
                    placeholder="Kabupaten"
                    className="w-1/2 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kode Pos & Telepon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.kodePos}
                    onChange={(e) => handleChange('kodePos', e.target.value)}
                    placeholder="Kode Pos"
                    className="w-1/3 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={formData.telepon}
                    onChange={(e) => handleChange('telepon', e.target.value)}
                    placeholder="Telepon"
                    className="w-2/3 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Resmi Sekolah
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kode Singkatan Surat (Untuk Penomoran Otomatis)
                </label>
                <input
                  type="text"
                  required
                  value={formData.kodeSuratSekolah}
                  onChange={(e) => handleChange('kodeSuratSekolah', e.target.value)}
                  placeholder="Contoh: SMPN14-TBB"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section: Pejabat Penandatangan */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 pb-1 mb-3 border-b border-emerald-200">
              2. Pejabat Sekolah (Kepala Sekolah & Tata Usaha)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kepala Sekolah (Lengkap dengan Gelar)
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaKepalaSekolah}
                  onChange={(e) => handleChange('namaKepalaSekolah', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  required
                  value={formData.nipKepalaSekolah}
                  onChange={(e) => handleChange('nipKepalaSekolah', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kepala Tata Usaha (KTU)
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaKepalaTU}
                  onChange={(e) => handleChange('namaKepalaTU', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NIP Kepala Tata Usaha
                </label>
                <input
                  type="text"
                  value={formData.nipKepalaTU}
                  onChange={(e) => handleChange('nipKepalaTU', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section: Cadangan & Pemulihan Data (Backup & Restore) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              3. Manajemen Cadangan Data (Backup & Restore)
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Seluruh data surat tersimpan dengan aman pada penyimpanan peramban (browser storage).
              Anda dapat mengunduh cadangan lengkap (JSON) untuk arsip berkala atau memindahkannya ke komputer lain.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={exportDataJSON}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-xs transition"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Unduh Cadangan Lengkap (JSON)</span>
              </button>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-xs cursor-pointer transition">
                <Upload className="w-3.5 h-3.5 text-blue-600" />
                <span>Pulihkan Data dari Berkas JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg border border-red-200 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Data Awal</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div>
              {saveSuccess && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Pengaturan berhasil disimpan!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-xs transition"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
