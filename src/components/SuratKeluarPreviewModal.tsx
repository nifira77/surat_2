import React from 'react';
import { Printer, X, Check, Copy, ShieldCheck, QrCode } from 'lucide-react';
import { SuratKeluar } from '../types';
import { KopSurat } from './KopSurat';
import { useSurat } from '../context/SuratContext';

interface SuratKeluarPreviewModalProps {
  surat: SuratKeluar;
  onClose: () => void;
}

export const SuratKeluarPreviewModal: React.FC<SuratKeluarPreviewModalProps> = ({
  surat,
  onClose,
}) => {
  const { profil } = useSurat();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = `
${profil.namaPemerintah}
${profil.namaDinas}
${profil.namaSekolah}

Nomor: ${surat.noSurat}
Lampiran: ${surat.lampiranJumlah}
Perihal: ${surat.perihal}

Kepada Yth.
${surat.penerima}
di ${surat.alamatPenerima}

${surat.isiLengkap || surat.isiRingkas}

Tulang Bawang Barat, ${surat.tglSurat}
${surat.jabatanPenandatangan},

${surat.penandatangan}
NIP. ${surat.nipPenandatangan}
    `.trim();

    navigator.clipboard.writeText(fullText);
    alert('Teks isi surat berhasil disalin ke papan klip!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Modal Action Header (hidden in print) */}
        <div className="no-print bg-slate-800 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <span>Pratinjau Dokumen Surat Keluar Resmi</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded bg-emerald-700 text-white">
                {surat.status}
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Format Standar Tata Naskah Dinas Pendidikan SMPN 14 Tulang Bawang Barat
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition"
              title="Salin isi surat"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salin Teks</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Surat (Print / PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body (Printable Paper Formatted in A4) */}
        <div className="p-6 sm:p-12 overflow-y-auto bg-white text-slate-950 print:p-0 printable-area font-serif">
          {/* Kop Surat Sekolah */}
          <KopSurat />

          {/* Letter Metadata Header (Nomor, Lampiran, Perihal, & Titimangsa) */}
          <div className="flex justify-between items-start text-xs sm:text-sm my-4 font-sans">
            <div className="space-y-1">
              <div className="flex gap-2">
                <span className="w-20 text-slate-600 font-medium">Nomor</span>
                <span>:</span>
                <span className="font-mono font-bold text-slate-900">{surat.noSurat}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-20 text-slate-600 font-medium">Sifat</span>
                <span>:</span>
                <span>Biasa / Penting</span>
              </div>
              <div className="flex gap-2">
                <span className="w-20 text-slate-600 font-medium">Lampiran</span>
                <span>:</span>
                <span>{surat.lampiranJumlah || '-'}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-20 text-slate-600 font-medium">Perihal</span>
                <span>:</span>
                <span className="font-bold text-slate-900 underline underline-offset-2">{surat.perihal}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-slate-800">
                Tulang Bawang Barat, {surat.tglSurat}
              </p>
            </div>
          </div>

          {/* Recipient Block */}
          <div className="mt-6 mb-5 text-xs sm:text-sm font-sans">
            <p>Kepada Yth.</p>
            <p className="font-bold text-slate-950">{surat.penerima}</p>
            <p className="text-slate-700">{surat.alamatPenerima || 'Di Tempat'}</p>
          </div>

          {/* Content Body */}
          <div className="my-6 text-xs sm:text-sm text-slate-900 leading-relaxed space-y-4 whitespace-pre-line text-justify font-sans">
            {surat.isiLengkap || surat.isiRingkas}
          </div>

          {/* Closing & Signatures */}
          <div className="mt-10 flex justify-between items-end text-xs sm:text-sm font-sans pt-4">
            {/* Digital Verification QR Badge */}
            <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 flex items-center gap-3 max-w-xs text-[11px] text-slate-600">
              <div className="w-14 h-14 bg-white border border-slate-300 p-1 flex items-center justify-center rounded">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800">
                  <rect x="5" y="5" width="30" height="30" fill="currentColor" />
                  <rect x="65" y="5" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="65" width="30" height="30" fill="currentColor" />
                  <rect x="12" y="12" width="16" height="16" fill="white" />
                  <rect x="72" y="12" width="16" height="16" fill="white" />
                  <rect x="12" y="72" width="16" height="16" fill="white" />
                  <rect x="42" y="42" width="16" height="16" fill="currentColor" />
                  <rect x="45" y="10" width="10" height="25" fill="currentColor" />
                  <rect x="70" y="50" width="20" height="10" fill="currentColor" />
                  <rect x="45" y="70" width="15" height="20" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-800">Arsip Digital SMPN 14 TBB</p>
                <p className="text-[10px] text-slate-500">ID: {surat.id}</p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Tervalidasi Resmi Kearsipan</span>
                </p>
              </div>
            </div>

            {/* Principal Signature Area */}
            <div className="text-center w-64">
              <p className="text-slate-800 font-medium">
                {surat.jabatanPenandatangan},
              </p>
              
              {/* Seal Stamp + Signature illustration */}
              <div className="h-20 flex items-center justify-center relative my-1">
                {/* Official School Seal Stamp (Stempel Dinas) */}
                <div className="w-18 h-18 rounded-full border-2 border-dashed border-blue-600/70 text-blue-700/80 flex flex-col items-center justify-center p-1 text-center rotate-[-12deg] absolute left-6 shadow-2xs">
                  <div className="text-[7px] font-bold tracking-tighter uppercase">SMP NEGERI 14</div>
                  <div className="text-[6px] uppercase font-semibold">TULANG BAWANG BARAT</div>
                  <div className="text-[8px] text-blue-800 font-extrabold my-0.5">★ RESMI ★</div>
                </div>

                {/* Digital Signature Stroke */}
                <div className="font-serif italic text-emerald-950 text-xl font-bold tracking-wider opacity-90 rotate-[-5deg] z-10 pl-6">
                  {surat.penandatangan.split(' ')[0]}...
                </div>
              </div>

              <p className="font-bold text-slate-950 underline underline-offset-2">
                {surat.penandatangan}
              </p>
              <p className="text-[11px] text-slate-700">
                NIP. {surat.nipPenandatangan}
              </p>
            </div>
          </div>

          {/* Tembusan */}
          {surat.tembusan && surat.tembusan.length > 0 && (
            <div className="mt-8 pt-3 border-t border-slate-200 text-xs text-slate-700 font-sans">
              <p className="font-semibold text-slate-800">Tembusan disampaikan kepada Yth.:</p>
              <ol className="list-decimal list-inside space-y-0.5 mt-1 text-[11px]">
                {surat.tembusan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
