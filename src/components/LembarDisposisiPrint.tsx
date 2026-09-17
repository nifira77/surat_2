import React from 'react';
import { Printer, X, CheckSquare, Square } from 'lucide-react';
import { SuratMasuk } from '../types';
import { KopSurat } from './KopSurat';
import { useSurat } from '../context/SuratContext';
import { PEJABAT_DISPOSISI, INSTRUKSI_DISPOSISI } from '../data/klasifikasi';

interface LembarDisposisiPrintProps {
  surat: SuratMasuk;
  onClose: () => void;
}

export const LembarDisposisiPrint: React.FC<LembarDisposisiPrintProps> = ({ surat, onClose }) => {
  const { profil } = useSurat();

  const handlePrint = () => {
    window.print();
  };

  const disposisi = surat.disposisi;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Modal Action Header (hidden in print) */}
        <div className="no-print bg-slate-800 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <span>Pratinjau Lembar Disposisi Kepala Sekolah</span>
            </h3>
            <p className="text-xs text-slate-300">
              Format baku lembar disposisi kedinasan SMPN 14 Tulang Bawang Barat
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Lembar Disposisi (Print/PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body (Printable Area) */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-950 print:p-0 printable-area">
          {/* Kop Surat Sekolah */}
          <KopSurat />

          {/* Title Header */}
          <div className="text-center my-3">
            <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide underline underline-offset-4 decoration-2">
              LEMBAR DISPOSISI KEPALA SEKOLAH
            </h2>
            <p className="text-xs font-semibold text-slate-700 mt-1">
              Nomor Agenda: <span className="font-mono bg-slate-100 px-2 py-0.5 border border-slate-300 rounded font-bold">{surat.noAgenda}</span>
            </p>
          </div>

          {/* Table: Surat Information Metadata */}
          <table className="w-full border-collapse border-2 border-slate-900 text-xs sm:text-sm mt-4">
            <tbody>
              <tr className="border-b border-slate-900">
                <td className="w-1/4 p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Surat Dari / Pengirim
                </td>
                <td className="w-1/4 p-2 border-r border-slate-900 font-medium">
                  {surat.pengirim}
                </td>
                <td className="w-1/4 p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Diterima Tanggal
                </td>
                <td className="w-1/4 p-2 font-medium">
                  {surat.tglTerima}
                </td>
              </tr>

              <tr className="border-b border-slate-900">
                <td className="p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Nomor Surat Asal
                </td>
                <td className="p-2 border-r border-slate-900 font-mono font-medium">
                  {surat.noSurat}
                </td>
                <td className="p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Nomor Agenda / Indeks
                </td>
                <td className="p-2 font-mono font-bold">
                  {surat.noAgenda}
                </td>
              </tr>

              <tr className="border-b border-slate-900">
                <td className="p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Tanggal Surat Asal
                </td>
                <td className="p-2 border-r border-slate-900 font-medium">
                  {surat.tglSurat}
                </td>
                <td className="p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Sifat Surat
                </td>
                <td className="p-2 font-bold">
                  <span className="uppercase">{surat.sifat}</span>
                </td>
              </tr>

              <tr className="border-b border-slate-900">
                <td className="p-2 font-semibold bg-slate-50 border-r border-slate-900">
                  Klasifikasi Kearsipan
                </td>
                <td colSpan={3} className="p-2 font-medium">
                  {surat.kodeKlasifikasi}
                </td>
              </tr>

              <tr className="border-b-2 border-slate-900">
                <td className="p-2 font-semibold bg-slate-50 border-r border-slate-900 align-top">
                  Perihal & Ringkasan Isi
                </td>
                <td colSpan={3} className="p-2">
                  <div className="font-bold text-slate-900 mb-1">{surat.perihal}</div>
                  <p className="text-xs text-slate-700 leading-relaxed">{surat.ringkasan}</p>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Section: Disposisi Grid (Diteruskan Kepada & Arahan/Instruksi) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-t-0 border-slate-900 text-xs">
            {/* Left Col: Diteruskan Kepada */}
            <div className="p-3 border-r-2 border-slate-900">
              <div className="font-bold uppercase text-slate-900 pb-1.5 mb-2 border-b border-slate-300">
                I. Diteruskan Kepada Sdr. :
              </div>
              <div className="space-y-1.5">
                {PEJABAT_DISPOSISI.map((pejabat) => {
                  const isChecked = disposisi?.diteruskanKepada.includes(pejabat);
                  return (
                    <div key={pejabat} className="flex items-center gap-2">
                      <span className="font-mono text-slate-700">
                        {isChecked ? '[ ✔ ]' : '[   ]'}
                      </span>
                      <span className={isChecked ? 'font-bold text-slate-950' : 'text-slate-700'}>
                        {pejabat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Col: Instruksi / Arahan */}
            <div className="p-3">
              <div className="font-bold uppercase text-slate-900 pb-1.5 mb-2 border-b border-slate-300">
                II. Petunjuk / Instruksi Kepala Sekolah:
              </div>
              <div className="space-y-1.5">
                {INSTRUKSI_DISPOSISI.map((instruksi) => {
                  const isChecked = disposisi?.instruksi.includes(instruksi);
                  return (
                    <div key={instruksi} className="flex items-center gap-2">
                      <span className="font-mono text-slate-700">
                        {isChecked ? '[ ✔ ]' : '[   ]'}
                      </span>
                      <span className={isChecked ? 'font-bold text-slate-950' : 'text-slate-700'}>
                        {instruksi}
                      </span>
                    </div>
                  );
                })}
              </div>

              {disposisi?.batasWaktu && (
                <div className="mt-3 pt-2 border-t border-dashed border-slate-400 text-xs">
                  <span className="font-semibold text-red-700">Batas Waktu Penyelesaian: </span>
                  <span className="font-bold">{disposisi.batasWaktu}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Catatan Khusus Kepala Sekolah */}
          <div className="border-2 border-t-0 border-slate-900 p-3 text-xs sm:text-sm">
            <div className="font-bold uppercase text-slate-900 mb-1">
              Catatan Khusus Kepala Sekolah:
            </div>
            <div className="min-h-[70px] p-2 bg-amber-50/40 rounded border border-slate-300 font-serif italic text-slate-800 leading-relaxed">
              {disposisi?.catatanKepalaSekolah ? (
                <span>"{disposisi.catatanKepalaSekolah}"</span>
              ) : (
                <span className="text-slate-400">..................................................................................................................................................................</span>
              )}
            </div>
          </div>

          {/* Signature Block */}
          <div className="border-2 border-t-0 border-slate-900 p-4 flex justify-between items-end text-xs sm:text-sm">
            <div className="text-slate-600 text-[11px]">
              <p>Lokasi Arsip Fisik: <strong className="text-slate-800">{surat.lokasiArsip}</strong></p>
              <p>Dicetak pada: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="text-center w-64">
              <p className="text-xs">
                Tulang Bawang Barat, {disposisi?.tglDisposisi || surat.tglTerima}
              </p>
              <p className="text-xs font-bold uppercase mt-0.5">
                Kepala Sekolah,
              </p>
              
              {/* Paraf / TTD space with stamp visual */}
              <div className="h-16 flex items-center justify-center relative my-1">
                <div className="border border-dashed border-slate-300 text-[10px] text-slate-400 px-3 py-1 rounded">
                  (Paraf / Tanda Tangan)
                </div>
                {disposisi?.parafKepalaSekolah && (
                  <div className="absolute font-cursive text-emerald-800 text-lg font-bold rotate-[-6deg] opacity-85">
                    ✓ Validated
                  </div>
                )}
              </div>

              <p className="font-bold text-slate-950 underline underline-offset-2">
                {profil.namaKepalaSekolah}
              </p>
              <p className="text-[11px] text-slate-700">
                NIP. {profil.nipKepalaSekolah}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
