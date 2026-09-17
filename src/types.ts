export type SifatSurat = 'Biasa' | 'Penting' | 'Segera' | 'Rahasia';
export type StatusDisposisi = 'Belum Didisposisi' | 'Sudah Didisposisi' | 'Selesai';
export type StatusSuratKeluar = 'Konsep / Draft' | 'Menunggu TTD' | 'Diterbitkan' | 'Terkirim & Diarsipkan';

export type JenisSuratKeluar =
  | 'Surat Tugas'
  | 'Surat Undangan'
  | 'Surat Edaran'
  | 'Surat Keterangan Siswa'
  | 'Surat Rekomendasi'
  | 'Surat Pengantar'
  | 'Surat Panggilan Orang Tua'
  | 'Lainnya';

export interface DisposisiData {
  tglDisposisi: string;
  diteruskanKepada: string[];
  instruksi: string[];
  catatanKepalaSekolah: string;
  batasWaktu?: string;
  parafKepalaSekolah: boolean;
}

export interface SuratMasuk {
  id: string;
  noAgenda: string;
  noSurat: string;
  tglSurat: string;
  tglTerima: string;
  pengirim: string;
  tujuan: string;
  perihal: string;
  ringkasan: string;
  kodeKlasifikasi: string;
  sifat: SifatSurat;
  statusDisposisi: StatusDisposisi;
  lokasiArsip: string;
  lampiranFile?: string;
  fileDataUrl?: string;
  disposisi: DisposisiData | null;
  createdAt: string;
}

export interface SuratKeluar {
  id: string;
  noAgenda: string;
  noSurat: string;
  kodeKlasifikasi: string;
  jenisSurat: JenisSuratKeluar;
  tglSurat: string;
  penerima: string;
  alamatPenerima: string;
  perihal: string;
  isiRingkas: string;
  isiLengkap?: string;
  penandatangan: string;
  nipPenandatangan: string;
  jabatanPenandatangan: string;
  status: StatusSuratKeluar;
  lampiranJumlah: string;
  tembusan: string[];
  lokasiArsip: string;
  lampiranFile?: string;
  fileDataUrl?: string;
  createdAt: string;
}

export interface ProfilSekolah {
  namaPemerintah: string;
  namaDinas: string;
  namaSekolah: string;
  npsn: string;
  nss: string;
  akreditasi: string;
  alamat: string;
  kelurahanDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  telepon: string;
  email: string;
  website: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  pangkatGolonganKepalaSekolah: string;
  namaKepalaTU: string;
  nipKepalaTU: string;
  kodeSuratSekolah: string; // e.g. "SMPN14-TBB"
}

export interface KodeKlasifikasi {
  kode: string;
  nama: string;
  keterangan: string;
  kategori: string;
}
