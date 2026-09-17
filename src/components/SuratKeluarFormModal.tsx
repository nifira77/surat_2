import React, { useState } from 'react';
import {
  X,
  Plus,
  Save,
  Send,
  Sparkles,
  RefreshCw,
  FileText,
  Building,
  UserCheck,
} from 'lucide-react';
import { SuratKeluar, JenisSuratKeluar, StatusSuratKeluar } from '../types';
import { useSurat } from '../context/SuratContext';
import { DAFTAR_KLASIFIKASI } from '../data/klasifikasi';

interface SuratKeluarFormModalProps {
  suratToEdit?: SuratKeluar | null;
  onClose: () => void;
}

const JENIS_SURAT_OPTIONS: JenisSuratKeluar[] = [
  'Surat Tugas',
  'Surat Undangan',
  'Surat Edaran',
  'Surat Keterangan Siswa',
  'Surat Rekomendasi',
  'Surat Pengantar',
  'Surat Panggilan Orang Tua',
  'Lainnya',
];

const TEMPLATES: Record<JenisSuratKeluar, { perihal: string; isi: string; kode: string }> = {
  'Surat Tugas': {
    kode: '421.3 - Kepegawaian & Ketenagaan',
    perihal: 'Surat Tugas Mengikuti Kegiatan Kedinasan',
    isi: `Yang bertanda tangan di bawah ini Kepala SMP Negeri 14 Tulang Bawang Barat, menugaskan kepada:

Nama : [Nama Guru / Tenaga Kependidikan]
NIP / NUPTK : [Nomor Identitas Pegawai]
Pangkat / Golongan : [Pangkat/Golongan]
Jabatan : [Guru Mata Pelajaran / Staf TU]

Untuk : 
Melaksanakan tugas mengikuti kegiatan [Nama Kegiatan / Pelatihan / Lomba] yang diselenggarakan oleh [Pihak Penyelenggara] pada:
Hari / Tanggal : [Hari, Tanggal Pelaksanaan]
Waktu : Pukul 08.00 WIB s.d. Selesai
Tempat : [Lokasi Kegiatan]

Demikian surat tugas ini diberikan kepada yang bersangkutan untuk dilaksanakan dengan penuh rasa tanggung jawab dan membuat laporan pelaksanaan tugas setelah kegiatan selesai.`,
  },
  'Surat Undangan': {
    kode: '005 - Undangan Kedinasan',
    perihal: 'Undangan Rapat Koordinasi dan Pertemuan',
    isi: `Dengan hormat,
Sehubungan dengan pelaksanaan program kerja sekolah, kami mengharapkan kehadiran Bapak/Ibu pada:

Hari / Tanggal : [Hari, Tanggal Kegiatan]
Waktu : Pukul 09.00 WIB s.d Selesai
Tempat : Ruang Pertemuan SMP Negeri 14 Tulang Bawang Barat
Acara : [Agenda Rapat / Sosialisasi Program]

Mengingat pentingnya acara tersebut, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya. Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih.`,
  },
  'Surat Keterangan Siswa': {
    kode: '421.4 - Kesiswaan & Ekstrakurikuler',
    perihal: 'Surat Keterangan Aktif Belajar Peserta Didik',
    isi: `Yang bertanda tangan di bawah ini Kepala SMP Negeri 14 Tulang Bawang Barat menerangkan bahwa:

Nama Lengkap : [Nama Siswa]
NIS / NISN : [NISN Siswa]
Tempat, Tanggal Lahir : [Tempat, Tgl Lahir]
Kelas : [Kelas Siswa]
Nama Orang Tua / Wali : [Nama Orang Tua]
Alamat : [Alamat Rumah Siswa]

Adalah benar-benar Peserta Didik Aktif yang terdaftar pada SMP Negeri 14 Tulang Bawang Barat pada Tahun Pelajaran 2025/2026 dan berkelakuan baik.

Surat keterangan ini dibuat dengan sebenarnya untuk dipergunakan sebagai:
[Keperluan surat, misal: Persyaratan Pengajuan Beasiswa / Aktivasi Rekening SimPel / Persyaratan Pendaftaran].`,
  },
  'Surat Edaran': {
    kode: '421.2 - Kurikulum & Pengajaran',
    perihal: 'Pemberitahuan Pelaksanaan Agenda Sekolah',
    isi: `Diberitahukan kepada seluruh Dewan Guru, Tenaga Kependidikan, Orang Tua/Wali Murid, serta Peserta Didik SMP Negeri 14 Tulang Bawang Barat mengenai hal-hal sebagai berikut:

1. [Poin ketentuan / jadwal pelaksanaan kegiatan pertama]
2. [Poin penyesuaian jam belajar atau ketentuan pakaian seragam]
3. [Ketentuan kehadiran dan kedisiplinan]

Demikian surat edaran ini disampaikan untuk diketahui dan dilaksanakan sebagaimana mestinya dengan tertib.`,
  },
  'Surat Rekomendasi': {
    kode: '421.4 - Kesiswaan & Ekstrakurikuler',
    perihal: 'Surat Rekomendasi Mengikuti Seleksi / Kegiatan',
    isi: `Yang bertanda tangan di bawah ini Kepala SMP Negeri 14 Tulang Bawang Barat memberikan rekomendasi kepada:

Nama : [Nama Siswa / Guru]
NISN / NIP : [Nomor Identitas]
Kelas / Jabatan : [Kelas / Bidang Keahlian]

Untuk mengikuti seleksi / kegiatan [Nama Kegiatan / Olimpiade Sains / FLS2N / O2SN / Lomba Pramuka] Tingkat Kabupaten Tulang Bawang Barat.

Yang bersangkutan memiliki dedikasi dan prestasi yang baik untuk mewakili sekolah. Demikian surat rekomendasi ini dibuat agar dapat dipergunakan sebagaimana mestinya.`,
  },
  'Surat Panggilan Orang Tua': {
    kode: '421.4 - Kesiswaan & Ekstrakurikuler',
    perihal: 'Panggilan Orang Tua / Wali Murid',
    isi: `Dengan hormat,
Demi kebaikan dan kelancaran proses belajar mengajar peserta didik kami:

Nama Siswa : [Nama Siswa]
Kelas : [Kelas Siswa]
Wali Kelas : [Nama Wali Kelas]

Dengan ini kami mengundang Bapak/Ibu Orang Tua/Wali untuk hadir di sekolah pada:
Hari / Tanggal : [Hari, Tanggal]
Waktu : Pukul 09.00 WIB
Tempat : Ruang Bimbingan Konseling (BK) SMP Negeri 14 TBB
Keperluan : Konsultasi perkembangan belajar dan kedisiplinan siswa di sekolah.

Kehadiran Bapak/Ibu sangat diharapkan demi masa depan putra/putri kita bersama. Terima kasih atas perhatiannya.`,
  },
  'Surat Pengantar': {
    kode: '420 - Pendidikan (Umum)',
    perihal: 'Surat Pengantar Pengiriman Berkas Kedinasan',
    isi: `Dengan hormat,
Bersama ini kami kirimkan berkas administrasi kedinasan sebagai berikut:

1. Jenis Berkas : [Nama Dokumen / Laporan BOS / Data EMIS-DAPODIK]
2. Banyaknya : [1 Berkas / Rangkap 2]
3. Keterangan : Dikirim dengan hormat kepada Kepala Dinas Pendidikan dan Kebudayaan Kabupaten Tulang Bawang Barat untuk ditindaklanjuti.

Demikian surat pengantar ini kami sampaikan, atas kerja samanya diucapkan terima kasih.`,
  },
  'Lainnya': {
    kode: '420 - Pendidikan (Umum)',
    perihal: 'Perihal Surat Keluar Kedinasan',
    isi: `Dengan hormat,

Sehubungan dengan agenda kedinasan sekolah, dengan ini kami sampaikan hal sebagai berikut:
[Tuliskan isi surat lengkap di sini...]

Demikian surat ini disampaikan untuk dipergunakan sebagaimana mestinya. Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih.`,
  },
};

export const SuratKeluarFormModal: React.FC<SuratKeluarFormModalProps> = ({
  suratToEdit,
  onClose,
}) => {
  const { addSuratKeluar, updateSuratKeluar, getNextNoAgenda, generateNoSuratKeluar, profil } =
    useSurat();

  const isEdit = !!suratToEdit;

  const [noAgenda, setNoAgenda] = useState(
    suratToEdit?.noAgenda || getNextNoAgenda('keluar')
  );
  const [kodeKlasifikasi, setKodeKlasifikasi] = useState(
    suratToEdit?.kodeKlasifikasi || '421.3 - Kepegawaian & Ketenagaan'
  );
  const [tglSurat, setTglSurat] = useState(
    suratToEdit?.tglSurat || new Date().toISOString().split('T')[0]
  );
  const [noSurat, setNoSurat] = useState(
    suratToEdit?.noSurat || generateNoSuratKeluar(kodeKlasifikasi, tglSurat)
  );
  const [jenisSurat, setJenisSurat] = useState<JenisSuratKeluar>(
    suratToEdit?.jenisSurat || 'Surat Tugas'
  );
  const [penerima, setPenerima] = useState(suratToEdit?.penerima || '');
  const [alamatPenerima, setAlamatPenerima] = useState(
    suratToEdit?.alamatPenerima || 'Di Tempat'
  );
  const [perihal, setPerihal] = useState(
    suratToEdit?.perihal || TEMPLATES['Surat Tugas'].perihal
  );
  const [isiLengkap, setIsiLengkap] = useState(
    suratToEdit?.isiLengkap || TEMPLATES['Surat Tugas'].isi
  );
  const [isiRingkas, setIsiRingkas] = useState(suratToEdit?.isiRingkas || '');
  const [penandatangan, setPenandatangan] = useState(
    suratToEdit?.penandatangan || profil.namaKepalaSekolah
  );
  const [nipPenandatangan, setNipPenandatangan] = useState(
    suratToEdit?.nipPenandatangan || profil.nipKepalaSekolah
  );
  const [jabatanPenandatangan, setJabatanPenandatangan] = useState(
    suratToEdit?.jabatanPenandatangan || 'Kepala Sekolah'
  );
  const [status, setStatus] = useState<StatusSuratKeluar>(
    suratToEdit?.status || 'Konsep / Draft'
  );
  const [lampiranJumlah, setLampiranJumlah] = useState(
    suratToEdit?.lampiranJumlah || '-'
  );
  const [tembusanText, setTembusanText] = useState(
    suratToEdit?.tembusan ? suratToEdit.tembusan.join('\n') : 'Kepala Dinas Pendidikan dan Kebudayaan Kab. Tubaba\nKetua Komite SMPN 14 Tulang Bawang Barat\nArsip'
  );
  const [lokasiArsip, setLokasiArsip] = useState(
    suratToEdit?.lokasiArsip || 'Ordner SK-2026 / Lemari TU-01'
  );

  const handleApplyTemplate = (type: JenisSuratKeluar) => {
    setJenisSurat(type);
    const tmpl = TEMPLATES[type];
    if (tmpl) {
      setPerihal(tmpl.perihal);
      setIsiLengkap(tmpl.isi);
      setKodeKlasifikasi(tmpl.kode);
      setNoSurat(generateNoSuratKeluar(tmpl.kode, tglSurat));
    }
  };

  const handleRegenerateNumber = () => {
    const freshNo = generateNoSuratKeluar(kodeKlasifikasi, tglSurat);
    setNoSurat(freshNo);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noSurat || !penerima || !perihal) {
      alert('Mohon lengkapi data wajib: Nomor Surat, Penerima, dan Perihal!');
      return;
    }

    const tembusanArray = tembusanText
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const ringkas = isiRingkas || isiLengkap.slice(0, 160) + '...';

    if (isEdit && suratToEdit) {
      updateSuratKeluar(suratToEdit.id, {
        noAgenda,
        noSurat,
        kodeKlasifikasi,
        jenisSurat,
        tglSurat,
        penerima,
        alamatPenerima,
        perihal,
        isiRingkas: ringkas,
        isiLengkap,
        penandatangan,
        nipPenandatangan,
        jabatanPenandatangan,
        status,
        lampiranJumlah,
        tembusan: tembusanArray,
        lokasiArsip,
      });
    } else {
      addSuratKeluar({
        noAgenda,
        noSurat,
        kodeKlasifikasi,
        jenisSurat,
        tglSurat,
        penerima,
        alamatPenerima,
        perihal,
        isiRingkas: ringkas,
        isiLengkap,
        penandatangan,
        nipPenandatangan,
        jabatanPenandatangan,
        status,
        lampiranJumlah,
        tembusan: tembusanArray,
        lokasiArsip,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {isEdit ? 'Ubah Data Surat Keluar' : 'Buat & Terbitkan Surat Keluar Baru'}
              </h3>
              <p className="text-xs text-slate-300">
                Tata Naskah Dinas SMPN 14 Tulang Bawang Barat dengan format resmi
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

        {/* Template Selector Bar */}
        {!isEdit && (
          <div className="bg-emerald-50/60 border-b border-emerald-100 p-3 px-6 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-semibold text-emerald-950 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Gunakan Format Baku:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {JENIS_SURAT_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleApplyTemplate(opt)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
                    jenisSurat === opt
                      ? 'bg-emerald-600 text-white font-semibold shadow-2xs'
                      : 'bg-white hover:bg-emerald-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-slate-800 text-sm">
          {/* Row 1: Nomor Agenda, Tanggal, & Jenis */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                No. Agenda Keluar
              </label>
              <input
                type="text"
                required
                value={noAgenda}
                onChange={(e) => setNoAgenda(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Surat Keluar
              </label>
              <input
                type="date"
                required
                value={tglSurat}
                onChange={(e) => setTglSurat(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenis Dokumen Surat
              </label>
              <select
                value={jenisSurat}
                onChange={(e) => handleApplyTemplate(e.target.value as JenisSuratKeluar)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {JENIS_SURAT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Klasifikasi & Nomor Surat Generator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kode Klasifikasi Kearsipan
              </label>
              <select
                value={kodeKlasifikasi}
                onChange={(e) => {
                  setKodeKlasifikasi(e.target.value);
                  setNoSurat(generateNoSuratKeluar(e.target.value, tglSurat));
                }}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {DAFTAR_KLASIFIKASI.map((k) => (
                  <option key={k.kode} value={`${k.kode} - ${k.nama}`}>
                    {k.kode} - {k.nama}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Nomor Surat Dinas Resmi <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleRegenerateNumber}
                  className="text-[11px] text-emerald-600 hover:text-emerald-800 flex items-center gap-1 font-medium"
                  title="Generate nomor otomatis sesuai urutan"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Auto-Number</span>
                </button>
              </div>
              <input
                type="text"
                required
                value={noSurat}
                onChange={(e) => setNoSurat(e.target.value)}
                placeholder="421.3/001/SMPN14-TBB/2026"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono font-bold text-slate-900 bg-slate-50"
              />
            </div>
          </div>

          {/* Row 3: Penerima & Alamat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ditujukan Kepada (Penerima) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={penerima}
                onChange={(e) => setPenerima(e.target.value)}
                placeholder="Contoh: Kepala Dinas Pendidikan / Orang Tua Siswa / Guru Ybs"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat / Tempat Tujuan
              </label>
              <input
                type="text"
                value={alamatPenerima}
                onChange={(e) => setAlamatPenerima(e.target.value)}
                placeholder="Contoh: Di Tempat / Panaragan Jaya"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 4: Perihal & Lampiran */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Perihal / Hal Surat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={perihal}
                onChange={(e) => setPerihal(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lampiran
              </label>
              <input
                type="text"
                value={lampiranJumlah}
                onChange={(e) => setLampiranJumlah(e.target.value)}
                placeholder="Contoh: 1 Berkas / -"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 5: Isi Lengkap Dokumen Surat */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Isi Dokumen Surat Resmi (Sesuai Tata Naskah Dinas) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500">
                Anda dapat mengedit isi surat secara bebas sesuai kebutuhan sekolah
              </span>
            </div>
            <textarea
              rows={8}
              required
              value={isiLengkap}
              onChange={(e) => setIsiLengkap(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-sans leading-relaxed text-slate-900"
            />
          </div>

          {/* Row 6: Penandatangan & Jabatan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pejabat Penandatangan
              </label>
              <input
                type="text"
                value={penandatangan}
                onChange={(e) => setPenandatangan(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIP Penandatangan
              </label>
              <input
                type="text"
                value={nipPenandatangan}
                onChange={(e) => setNipPenandatangan(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jabatan Penandatangan
              </label>
              <input
                type="text"
                value={jabatanPenandatangan}
                onChange={(e) => setJabatanPenandatangan(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Row 7: Tembusan, Lokasi Arsip & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tembusan (Satu baris per pihak)
              </label>
              <textarea
                rows={3}
                value={tembusanText}
                onChange={(e) => setTembusanText(e.target.value)}
                placeholder="1. Kepala Dinas Pendidikan&#10;2. Komite Sekolah&#10;3. Arsip"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lokasi Fisik Berkas Arsip
              </label>
              <input
                type="text"
                value={lokasiArsip}
                onChange={(e) => setLokasiArsip(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Alur Surat Keluar
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusSuratKeluar)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
              >
                <option value="Konsep / Draft">Konsep / Draft (Belum Disahkan)</option>
                <option value="Menunggu TTD">Menunggu TTD Kepala Sekolah</option>
                <option value="Diterbitkan">Diterbitkan (Sudah Disahkan)</option>
                <option value="Terkirim & Diarsipkan">Terkirim & Diarsipkan</option>
              </select>
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
              <span>{isEdit ? 'Simpan Perubahan' : 'Terbitkan / Simpan Surat Keluar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
