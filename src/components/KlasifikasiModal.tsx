import React, { useState } from 'react';
import { X, Search, Tag, Copy, Check } from 'lucide-react';
import { DAFTAR_KLASIFIKASI } from '../data/klasifikasi';

interface KlasifikasiModalProps {
  onClose: () => void;
}

export const KlasifikasiModal: React.FC<KlasifikasiModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = DAFTAR_KLASIFIKASI.filter(
    (k) =>
      k.kode.toLowerCase().includes(search.toLowerCase()) ||
      k.nama.toLowerCase().includes(search.toLowerCase()) ||
      k.keterangan.toLowerCase().includes(search.toLowerCase()) ||
      k.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (kode: string) => {
    navigator.clipboard.writeText(kode);
    setCopiedCode(kode);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                Daftar Kode Klasifikasi Surat Dinas Pendidikan
              </h3>
              <p className="text-xs text-slate-300">
                Pedoman Tata Kearsipan & Penomoran Surat Kemendikbudristek untuk Satuan Pendidikan
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

        {/* Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode (misal: 421.2) atau kata kunci (kurikulum, tugas, kesiswaan)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto divide-y divide-slate-100 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-slate-400 text-sm">
              Tidak ada kode klasifikasi yang cocok.
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.kode}
                className="pt-3 first:pt-0 flex items-start justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {item.kode}
                    </span>
                    <h4 className="font-semibold text-slate-900 text-sm">{item.nama}</h4>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.kategori}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.keterangan}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.kode)}
                  className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition border border-slate-200"
                  title="Salin kode"
                >
                  {copiedCode === item.kode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
