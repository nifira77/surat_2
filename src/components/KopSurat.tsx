import React from 'react';
import { useSurat } from '../context/SuratContext';

interface KopSuratProps {
  compact?: boolean;
}

export const KopSurat: React.FC<KopSuratProps> = ({ compact = false }) => {
  const { profil } = useSurat();

  return (
    <div className={`text-center border-b-4 border-double border-slate-900 pb-3 ${compact ? 'mb-4' : 'mb-6'}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Lambang Daerah / Tut Wuri Handayani vector */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-800 bg-amber-50 flex flex-col items-center justify-center p-1 text-center shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" fill="currentColor">
              {/* Stylized Indonesian Education / District emblem */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M 50 15 L 85 80 L 15 80 Z" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="45" r="12" fill="#d97706" />
              <path d="M 35 75 C 45 65, 55 65, 65 75" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="50" y="93" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">TBB</text>
            </svg>
          </div>
        </div>

        {/* Kop Text Info */}
        <div className="flex-1 text-center">
          <h3 className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">
            {profil.namaPemerintah}
          </h3>
          <h2 className="text-xs sm:text-base font-bold tracking-wide text-slate-900 uppercase">
            {profil.namaDinas}
          </h2>
          <h1 className="text-base sm:text-xl font-extrabold text-slate-950 uppercase tracking-tight my-0.5">
            {profil.namaSekolah}
          </h1>
          <div className="text-[11px] sm:text-xs text-slate-700 font-medium leading-tight space-y-0.5">
            <p>
              NPSN: {profil.npsn} | NSS: {profil.nss} | Akreditasi: {profil.akreditasi}
            </p>
            <p>
              {profil.alamat}, Kec. {profil.kecamatan}, Kab. {profil.kabupaten} - {profil.provinsi} {profil.kodePos}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-600">
              Telp: {profil.telepon} | Email: {profil.email} | Web: {profil.website}
            </p>
          </div>
        </div>

        {/* Tut Wuri Handayani / School Crest */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-800 bg-emerald-50 flex flex-col items-center justify-center p-1 text-center shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-900" fill="currentColor">
              <polygon points="50,10 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="4"/>
              <circle cx="50" cy="40" r="14" fill="#047857" opacity="0.8"/>
              <path d="M30,75 Q50,55 70,75" stroke="currentColor" strokeWidth="4" fill="none"/>
              <text x="50" y="93" textAnchor="middle" fontSize="8" fontWeight="bold">KEMDIKBUD</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
