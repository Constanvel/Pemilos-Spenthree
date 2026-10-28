export const candidates = [
  {
    id: '01', name: 'Aditya Pratama', initials: 'AP', classroom: 'VIII A',
    vision: 'OSIS yang terbuka, aktif, dan dekat dengan kebutuhan siswa.',
    programs: [
      'Forum aspirasi siswa setiap bulan.',
      'Kegiatan antarkelas yang melibatkan lebih banyak minat.',
      'Informasi kegiatan OSIS yang mudah diakses.',
    ],
  },
  {
    id: '02', name: 'Nadia Azzahra', initials: 'NA', classroom: 'VIII B',
    vision: 'Sekolah yang nyaman, saling mendukung, dan memberi ruang untuk berkarya.',
    programs: [
      'Pekan karya untuk menampilkan bakat siswa.',
      'Gerakan kebersihan kelas yang konsisten.',
      'Kegiatan saling apresiasi antarsiswa.',
    ],
  },
  {
    id: '03', name: 'Raka Putra', initials: 'RP', classroom: 'VIII C',
    vision: 'OSIS yang kolaboratif dan mendorong siswa berkembang bersama.',
    programs: [
      'Kolaborasi kegiatan lintas ekstrakurikuler.',
      'Program teman belajar antarsiswa.',
      'Evaluasi kegiatan melalui masukan peserta.',
    ],
  },
]

export const findCandidate = (id) => candidates.find((candidate) => candidate.id === id)
