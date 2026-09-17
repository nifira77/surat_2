import { KodeKlasifikasi } from '../types';

export const DAFTAR_KLASIFIKASI: KodeKlasifikasi[] = [
  { kode: '420', nama: 'Pendidikan (Umum)', keterangan: 'Kebijakan dan pembinaan pendidikan umum', kategori: 'Pendidikan' },
  { kode: '421', nama: 'Sekolah', keterangan: 'Urusan penyelenggaraan persekolahan', kategori: 'Pendidikan' },
  { kode: '421.1', nama: 'Penerimaan Siswa Baru (PPDB)', keterangan: 'Syarat penerimaan, pendaftaran, seleksi, orientasi siswa baru', kategori: 'Kesiswaan' },
  { kode: '421.2', nama: 'Kurikulum & Pengajaran', keterangan: 'KBM, jadwal pelajaran, silabus, ujian, asesmen nasional, rapor', kategori: 'Kurikulum' },
  { kode: '421.3', nama: 'Kepegawaian & Ketenagaan', keterangan: 'Surat tugas, mutasi guru, sertifikasi, pembagian tugas mengajar', kategori: 'Kepegawaian' },
  { kode: '421.4', nama: 'Kesiswaan & Ekstrakurikuler', keterangan: 'OSIS, Pramuka, lomba, beasiswa, pelanggaran tata tertib, mutasi siswa', kategori: 'Kesiswaan' },
  { kode: '421.5', nama: 'Sarana & Prasarana Sekolah', keterangan: 'Gedung, laboratorium, perpustakaan, inventaris barang, pengadaan alat', kategori: 'Sarpras' },
  { kode: '422', nama: 'Keuangan Sekolah & Dana BOS', keterangan: 'RKAS, laporan BOS, komite sekolah, bantuan operasional, sumbangan', kategori: 'Keuangan' },
  { kode: '005', nama: 'Undangan Kedinasan', keterangan: 'Undangan rapat dinas, pertemuan, lokakarya, seminar', kategori: 'Umum' },
  { kode: '060', nama: 'Organisasi & Tata Kerja', keterangan: 'Struktur organisasi, uraian tugas, pembagian kerja', kategori: 'Umum' },
  { kode: '800', nama: 'Kepegawaian ASN/PPPK/Honorer', keterangan: 'Data pegawai, kenaikan pangkat, KGB, izin/cuti guru & staf', kategori: 'Kepegawaian' },
  { kode: '090', nama: 'Perjalanan Dinas (SPPD)', keterangan: 'Surat perintah perjalanan dinas luar/dalam daerah', kategori: 'Umum' },
  { kode: '425', nama: 'Perpustakaan Sekolah', keterangan: 'Buku pelajaran, bahan pustaka, literasi sekolah', kategori: 'Sarpras' },
  { kode: '440', nama: 'Kesehatan & UKS', keterangan: 'Pelayanan kesehatan siswa, vaksinasi, kerjasama Puskesmas', kategori: 'Umum' },
];

export const PEJABAT_DISPOSISI = [
  'Wakil Kepala Sekolah Bid. Kurikulum',
  'Wakil Kepala Sekolah Bid. Kesiswaan',
  'Wakil Kepala Sekolah Bid. Sarana & Prasarana',
  'Wakil Kepala Sekolah Bid. Humas',
  'Kepala Tata Usaha',
  'Bendahara BOS',
  'Pembina OSIS',
  'Pembina Pramuka',
  'Koordinator BK (Bimbingan Konseling)',
  'Kepala Perpustakaan',
  'Wali Kelas VII / VIII / IX',
  'Guru Piket',
];

export const INSTRUKSI_DISPOSISI = [
  'Untuk ditindaklanjuti segera',
  'Pelajari dan koordinasikan',
  'Hadiri / Wakili Kepala Sekolah',
  'Siapkan bahan / laporan / data',
  'Untuk diketahui & diindahkan',
  'Arsipkan / Simpan dalam file',
  'Sosialisasikan kepada dewan guru & staf',
  'Hubungi pihak pengirim surat',
  'Bicarakan bersama saya',
];
