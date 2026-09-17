import { ProfilSekolah, SuratMasuk, SuratKeluar } from '../types';

export const INITIAL_PROFIL_SEKOLAH: ProfilSekolah = {
  namaPemerintah: 'PEMERINTAH KABUPATEN TULANG BAWANG BARAT',
  namaDinas: 'DINAS PENDIDIKAN DAN KEBUDAYAAN',
  namaSekolah: 'SMP NEGERI 14 TULANG BAWANG BARAT',
  npsn: '69947814',
  nss: '201121214014',
  akreditasi: 'A',
  alamat: 'Jl. Poros Marga Kencana, Kec. Tulang Bawang Udik',
  kelurahanDesa: 'Marga Kencana',
  kecamatan: 'Tulang Bawang Udik',
  kabupaten: 'Tulang Bawang Barat',
  provinsi: 'Lampung',
  kodePos: '34691',
  telepon: '(0726) 775014',
  email: 'smpn14tubaba@gmail.com',
  website: 'https://smpn14tubaba.sch.id',
  namaKepalaSekolah: 'Drs. H. Bambang Irawan, M.Pd.',
  nipKepalaSekolah: '19740512 199903 1 004',
  pangkatGolonganKepalaSekolah: 'Pembina Tk. I, IV/b',
  namaKepalaTU: 'Siti Rahmawati, S.Pd.',
  nipKepalaTU: '19820819 200801 2 011',
  kodeSuratSekolah: 'SMPN14-TBB',
};

export const INITIAL_SURAT_MASUK: SuratMasuk[] = [
  {
    id: 'sm-001',
    noAgenda: '001/SM/2026',
    noSurat: '420/142/DISDIK-TBB/II/2026',
    tglSurat: '2026-02-18',
    tglTerima: '2026-02-20',
    pengirim: 'Dinas Pendidikan dan Kebudayaan Kab. Tulang Bawang Barat',
    tujuan: 'Kepala SMPN 14 Tulang Bawang Barat',
    perihal: 'Pelaksanaan Bimbingan Teknis Implementasi Kurikulum Merdeka Jenjang SMP',
    ringkasan: 'Undangan bimbingan teknis peningkatan kompetensi pendidik dalam implementasi Kurikulum Merdeka jenjang SMP se-Kabupaten Tulang Bawang Barat.',
    kodeKlasifikasi: '421.2 - Kurikulum & Pengajaran',
    sifat: 'Penting',
    statusDisposisi: 'Sudah Didisposisi',
    lokasiArsip: 'Ordner SM-2026 / Rak A-01',
    lampiranFile: 'Surat_Bimtek_Kurikulum_Merdeka_Tubaba.pdf',
    disposisi: {
      tglDisposisi: '2026-02-21',
      diteruskanKepada: ['Wakil Kepala Sekolah Bid. Kurikulum', 'Kepala Tata Usaha'],
      instruksi: ['Untuk ditindaklanjuti segera', 'Hadiri / Wakili Kepala Sekolah', 'Siapkan bahan / laporan / data'],
      catatanKepalaSekolah: 'Tugaskan Wakasek Kurikulum dan 2 guru mapel IPA & Bhs. Indonesia untuk mengikuti kegiatan. Siapkan SPPD dan laporkan hasilnya.',
      batasWaktu: '2026-02-27',
      parafKepalaSekolah: true,
    },
    createdAt: '2026-02-20T08:30:00.000Z',
  },
  {
    id: 'sm-002',
    noAgenda: '002/SM/2026',
    noSurat: '800/089/PKM-KENCANA/2026',
    tglSurat: '2026-02-25',
    tglTerima: '2026-02-26',
    pengirim: 'Puskesmas Rawat Inap Kencana Kec. Tulang Bawang Udik',
    tujuan: 'Kepala SMPN 14 Tulang Bawang Barat',
    perihal: 'Jadwal Skrining Kesehatan Berkala dan Pembagian Tablet Tambah Darah (TTD) Siswi',
    ringkasan: 'Pemberitahuan pelaksanaan posyandu remaja & skrining kesehatan bagi seluruh peserta didik kelas VII s.d IX serta edukasi gizi remaja.',
    kodeKlasifikasi: '440 - Kesehatan & UKS',
    sifat: 'Biasa',
    statusDisposisi: 'Sudah Didisposisi',
    lokasiArsip: 'Ordner SM-2026 / Rak A-01',
    lampiranFile: 'Jadwal_Skrining_Puskesmas.pdf',
    disposisi: {
      tglDisposisi: '2026-02-26',
      diteruskanKepada: ['Wakil Kepala Sekolah Bid. Kesiswaan', 'Koordinator BK (Bimbingan Konseling)'],
      instruksi: ['Pelajari dan koordinasikan', 'Sosialisasikan kepada dewan guru & staf'],
      catatanKepalaSekolah: 'Koordinasikan ruangan UKS dan jadwal kelas agar KBM tetap kondusif.',
      batasWaktu: '2026-03-05',
      parafKepalaSekolah: true,
    },
    createdAt: '2026-02-26T09:15:00.000Z',
  },
  {
    id: 'sm-003',
    noAgenda: '003/SM/2026',
    noSurat: '422/310/DISDIK-TBB/III/2026',
    tglSurat: '2026-03-02',
    tglTerima: '2026-03-04',
    pengirim: 'Bidang Pembinaan Ketenagaan & Keuangan Disdikbud Tubaba',
    tujuan: 'Kepala Sekolah dan Bendahara BOS',
    perihal: 'Instruksi Penyusunan dan Pengesahan Laporan Pertanggungjawaban Dana BOS Reguler Tahap I',
    ringkasan: 'Permintaan penyampaian dokumen SPJ Dana BOS Reguler Tahap I TA 2026 paling lambat tanggal 25 Maret 2026 melalui sistem ARKAS.',
    kodeKlasifikasi: '422 - Keuangan Sekolah & Dana BOS',
    sifat: 'Segera',
    statusDisposisi: 'Belum Didisposisi',
    lokasiArsip: 'Ordner SM-BOS / Meja TU',
    lampiranFile: 'Format_SPJ_BOS_Tahap1_2026.pdf',
    disposisi: null,
    createdAt: '2026-03-04T10:00:00.000Z',
  },
  {
    id: 'sm-004',
    noAgenda: '004/SM/2026',
    noSurat: '005/012/MKKS-SMP/TBB/2026',
    tglSurat: '2026-03-08',
    tglTerima: '2026-03-10',
    pengirim: 'Musyawarah Kerja Kepala Sekolah (MKKS) SMP Kab. Tulang Bawang Barat',
    tujuan: 'Kepala SMPN 14 Tulang Bawang Barat',
    perihal: 'Undangan Rapat Koordinasi Persiapan Penilaian Sumatif Akhir Jenjang (PSAJ) 2026',
    ringkasan: 'Rapat koordinasi rutin para Kepala SMP Negeri dan Swasta se-Kabupaten Tubaba terkait kisi-kisi dan jadwal pelaksanaan PSAJ.',
    kodeKlasifikasi: '005 - Undangan Kedinasan',
    sifat: 'Penting',
    statusDisposisi: 'Selesai',
    lokasiArsip: 'Ordner SM-MKKS / Rak A-02',
    lampiranFile: 'Undangan_Rakor_MKKS_Tubaba.pdf',
    disposisi: {
      tglDisposisi: '2026-03-10',
      diteruskanKepada: ['Wakil Kepala Sekolah Bid. Kurikulum'],
      instruksi: ['Siapkan bahan / laporan / data', 'Untuk diketahui & diindahkan'],
      catatanKepalaSekolah: 'Telah saya hadiri langsung di SMPN 1 Tubaba. Hasil materi PSAJ sudah diteruskan ke Kurikulum.',
      batasWaktu: '2026-03-12',
      parafKepalaSekolah: true,
    },
    createdAt: '2026-03-10T11:20:00.000Z',
  },
  {
    id: 'sm-005',
    noAgenda: '005/SM/2026',
    noSurat: '421.4/048/KWARCAB-TBB/2026',
    tglSurat: '2026-03-12',
    tglTerima: '2026-03-14',
    pengirim: 'Kwartir Cabang Gerakan Pramuka Tulang Bawang Barat',
    tujuan: 'Ka. Mabigus SMPN 14 Tulang Bawang Barat',
    perihal: 'Permohonan Delegasi Peserta Kemah Budaya & Karakter Pelajar Penggalang 2026',
    ringkasan: 'Pengiriman 2 regu (1 putra & 1 putri) pramuka penggalang dalam rangka Kemah Budaya tingkat kabupaten di Lapangan Pemda Tubaba.',
    kodeKlasifikasi: '421.4 - Kesiswaan & Ekstrakurikuler',
    sifat: 'Biasa',
    statusDisposisi: 'Belum Didisposisi',
    lokasiArsip: 'Ordner Kesiswaan / Rak B-01',
    lampiranFile: 'Petunjuk_Teknis_Kemah_Budaya_2026.pdf',
    disposisi: null,
    createdAt: '2026-03-14T09:40:00.000Z',
  },
];

export const INITIAL_SURAT_KELUAR: SuratKeluar[] = [
  {
    id: 'sk-001',
    noAgenda: '001/SK/2026',
    noSurat: '421.3/001/SMPN14-TBB/2026',
    kodeKlasifikasi: '421.3 - Kepegawaian & Ketenagaan',
    jenisSurat: 'Surat Tugas',
    tglSurat: '2026-02-22',
    penerima: 'Guru yang Ditugaskan (Ahmad Zaelani, S.Pd. & Dewi Lestari, M.Pd.)',
    alamatPenerima: 'Di Tempat',
    perihal: 'Surat Tugas Mengikuti Bimtek Implementasi Kurikulum Merdeka Jenjang SMP',
    isiRingkas: 'Menugaskan 2 orang guru mata pelajaran untuk mengikuti Bimbingan Teknis IKM di Aula Dinas Pendidikan Kab. Tulang Bawang Barat.',
    isiLengkap: `Yang bertanda tangan di bawah ini Kepala SMP Negeri 14 Tulang Bawang Barat, dengan ini menugaskan kepada:
1. Nama: Ahmad Zaelani, S.Pd. | NIP: 19850410 201001 1 018 | Jabatan: Guru Ahli Muda / Wakasek Kurikulum
2. Nama: Dewi Lestari, M.Pd. | NIP: 19910722 201903 2 009 | Jabatan: Guru Ahli Pertama (Bahasa Indonesia)

Untuk mengikuti:
Kegiatan : Bimbingan Teknis Peningkatan Kompetensi Guru dalam Implementasi Kurikulum Merdeka
Hari/Tanggal : Rabu s.d Jumat, 25 - 27 Februari 2026
Waktu : Pukul 08.00 WIB s.d Selesai
Tempat : Aula Ki Hajar Dewantara, Dinas Pendidikan dan Kebudayaan Kab. Tulang Bawang Barat

Demikian Surat Tugas ini dibuat untuk dapat dilaksanakan dengan sebaik-baiknya dan penuh rasa tanggung jawab.`,
    penandatangan: 'Drs. H. Bambang Irawan, M.Pd.',
    nipPenandatangan: '19740512 199903 1 004',
    jabatanPenandatangan: 'Kepala Sekolah',
    status: 'Terkirim & Diarsipkan',
    lampiranJumlah: '-',
    tembusan: ['Kepala Dinas Pendidikan dan Kebudayaan Kab. Tubaba', 'Ketua Komite SMPN 14 Tulang Bawang Barat', 'Arsip'],
    lokasiArsip: 'Ordner SK-2026 / Lemari TU-01',
    createdAt: '2026-02-22T09:00:00.000Z',
  },
  {
    id: 'sk-002',
    noAgenda: '002/SK/2026',
    noSurat: '005/002/SMPN14-TBB/2026',
    kodeKlasifikasi: '005 - Undangan Kedinasan',
    jenisSurat: 'Surat Undangan',
    tglSurat: '2026-03-01',
    penerima: 'Bapak/Ibu Orang Tua/Wali Peserta Didik Kelas IX',
    alamatPenerima: 'Di Tempat',
    perihal: 'Undangan Rapat Koordinasi Penilaian Sumatif Akhir Jenjang (PSAJ) & Kelulusan',
    isiRingkas: 'Undangan rapat sosialisasi mekanisme kelulusan, jadwal PSAJ, dan pemantapan belajar bersama orang tua siswa kelas IX.',
    isiLengkap: `Dengan hormat,
Sehubungan dengan agenda akademik semester genap Tahun Pelajaran 2025/2026 serta persiapan Penilaian Sumatif Akhir Jenjang (PSAJ), kami mengundang Bapak/Ibu Orang Tua/Wali Murid kelas IX pada:

Hari / Tanggal : Sabtu, 07 Maret 2026
Waktu : Pukul 08.30 WIB s.d Selesai
Tempat : Gedung Serbaguna SMP Negeri 14 Tulang Bawang Barat
Acara : 
1. Sosialisasi Standar Kelulusan dan Kalender PSAJ 2026
2. Kerjasama pendampingan belajar di rumah
3. Pemaparan program sukses jenjang pendidikan berikutnya

Mengingat pentingnya agenda ini bagi kelanjutan studi putra/putri kita, mohon hadir tepat pada waktunya.`,
    penandatangan: 'Drs. H. Bambang Irawan, M.Pd.',
    nipPenandatangan: '19740512 199903 1 004',
    jabatanPenandatangan: 'Kepala Sekolah',
    status: 'Diterbitkan',
    lampiranJumlah: '1 Lembar',
    tembusan: ['Ketua Komite SMPN 14 Tulang Bawang Barat', 'Arsip'],
    lokasiArsip: 'Ordner SK-2026 / Lemari TU-01',
    createdAt: '2026-03-01T10:30:00.000Z',
  },
  {
    id: 'sk-003',
    noAgenda: '003/SK/2026',
    noSurat: '421.4/003/SMPN14-TBB/2026',
    kodeKlasifikasi: '421.4 - Kesiswaan & Ekstrakurikuler',
    jenisSurat: 'Surat Keterangan Siswa',
    tglSurat: '2026-03-09',
    penerima: 'Muhammad Rizky Pratama (NISN: 0098471239)',
    alamatPenerima: 'Tulang Bawang Barat',
    perihal: 'Surat Keterangan Aktif Belajar Peserta Didik',
    isiRingkas: 'Menerangkan bahwa siswa yang bersangkutan adalah benar peserta didik aktif di SMPN 14 Tulang Bawang Barat untuk keperluan pendaftaran beasiswa PIP.',
    isiLengkap: `Yang bertanda tangan di bawah ini Kepala SMP Negeri 14 Tulang Bawang Barat menerangkan bahwa:
Nama : Muhammad Rizky Pratama
NIS / NISN : 2414023 / 0098471239
Tempat, Tgl Lahir : Marga Kencana, 14 Mei 2011
Jenis Kelamin : Laki-laki
Kelas : VIII-B (Delapan B)
Nama Orang Tua / Wali : Supriyanto

Adalah benar nama tersebut di atas terdaftar sebagai Peserta Didik Aktif di SMP Negeri 14 Tulang Bawang Barat pada Tahun Pelajaran 2025/2026 dan berkelakuan baik.

Surat keterangan ini diberikan kepada yang bersangkutan untuk keperluan:
Persyaratan Pengajuan Aktivasi Rekening Program Indonesia Pintar (PIP) Kemendikbudristek Tahun 2026.`,
    penandatangan: 'Drs. H. Bambang Irawan, M.Pd.',
    nipPenandatangan: '19740512 199903 1 004',
    jabatanPenandatangan: 'Kepala Sekolah',
    status: 'Diterbitkan',
    lampiranJumlah: '-',
    tembusan: ['Arsip Siswa'],
    lokasiArsip: 'Ordner Kesiswaan / Rak Siswa',
    createdAt: '2026-03-09T08:10:00.000Z',
  },
  {
    id: 'sk-004',
    noAgenda: '004/SK/2026',
    noSurat: '421.2/004/SMPN14-TBB/2026',
    kodeKlasifikasi: '421.2 - Kurikulum & Pengajaran',
    jenisSurat: 'Surat Edaran',
    tglSurat: '2026-03-15',
    penerima: 'Dewan Guru, Tenaga Kependidikan & Seluruh Peserta Didik',
    alamatPenerima: 'Di Lingkungan SMPN 14 TBB',
    perihal: 'Edaran Penyesuaian Jam Belajar Selama Bulan Suci Ramadhan 1447 H / 2026 M',
    isiRingkas: 'Pemberitahuan perubahan jam masuk sekolah, durasi jam pembelajaran tatap muka, dan jadwal pesantren kilat Ramadhan.',
    isiLengkap: `Berdasarkan Surat Edaran Kepala Dinas Pendidikan dan Kebudayaan Kabupaten Tulang Bawang Barat mengenai Kegiatan Belajar Mengajar selama Bulan Suci Ramadhan 1447 H, dengan ini diberitahukan penyesuaian sebagai berikut:
1. Jam masuk sekolah dimulai pukul 07.45 WIB.
2. Setiap jam pelajaran tatap muka disesuaikan menjadi 30 menit.
3. Seluruh peserta didik muslim diwajibkan mengikuti Tadarus Pagi bersama di kelas masing-masing.
4. Kegiatan Pesantren Kilat Ramadhan akan dilaksanakan pada minggu ke-3 Ramadhan.

Demikian edaran ini disampaikan untuk dilaksanakan dengan khidmat dan tertib.`,
    penandatangan: 'Drs. H. Bambang Irawan, M.Pd.',
    nipPenandatangan: '19740512 199903 1 004',
    jabatanPenandatangan: 'Kepala Sekolah',
    status: 'Menunggu TTD',
    lampiranJumlah: '-',
    tembusan: ['Pengawas Pembina SMP', 'Ketua Komite', 'Arsip'],
    lokasiArsip: 'Ordner Edaran',
    createdAt: '2026-03-15T11:00:00.000Z',
  },
];
