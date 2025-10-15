import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
          fill="white"
        />
        <path
          d="M12 16V22L8 18H4V14L8 10H12V16Z"
          fill="white"
        />
      </svg>
    ),
    title: "Sholat 5 Waktu",
    paragraph: "Fasilitas sholat berjamaah 5 waktu dengan imam yang berpengalaman dan suara adzan yang merdu.",
    btn: "Lihat Jadwal",
    btnLink: "/#",
  },
  {
    id: 2,
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
          fill="white"
        />
        <path
          d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z"
          fill="white"
        />
      </svg>
    ),
    title: "TPQ & Pendidikan",
    paragraph: "Program Taman Pendidikan Al-Quran untuk anak-anak dan pendidikan agama untuk semua usia.",
    btn: "Info Pendaftaran",
    btnLink: "/#",
  },
  {
    id: 3,
    icon: (
      <svg
        width="37"
        height="37"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11S11 10.1 11 9V7.5L5 7V9C5 10.1 4.1 11 3 11S1 10.1 1 9V7C1 5.9 1.9 5 3 5H21C22.1 5 23 5.9 23 7V9C23 10.1 22.1 11 21 11S19 10.1 19 9Z"
          fill="white"
        />
        <path
          d="M7 13H17C18.1 13 19 13.9 19 15V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V15C5 13.9 5.9 13 7 13ZM7 15V19H17V15H7Z"
          fill="white"
        />
      </svg>
    ),
    title: "Kajian Rutin",
    paragraph: "Kajian agama rutin setiap minggu dengan ustadz berpengalaman untuk menambah ilmu agama.",
    btn: "Jadwal Kajian",
    btnLink: "/#",
  },
  {
    id: 4,
    icon: (
      <svg
        width="37"
        height="37"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 6C14.9 6 14 6.9 14 8C14 9.1 14.9 10 16 10C17.1 10 18 9.1 18 8C18 6.9 17.1 6 16 6Z"
          fill="white"
        />
        <path
          d="M8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6ZM8 4C5.8 4 4 5.8 4 8C4 10.2 5.8 12 8 12C10.2 12 12 10.2 12 8C12 5.8 10.2 4 8 4Z"
          fill="white"
        />
        <path
          d="M8 13C5.8 13 4 14.8 4 17V20H20V17C20 14.8 18.2 13 16 13H8ZM6 18V17C6 15.9 6.9 15 8 15H16C17.1 15 18 15.9 18 17V18H6Z"
          fill="white"
        />
      </svg>
    ),
    title: "Kegiatan Sosial",
    paragraph: "Program bakti sosial, santunan yatim, dan kegiatan kemasyarakatan untuk membantu sesama.",
    btn: "Info Kegiatan",
    btnLink: "/#",
  },
];
export default featuresData;
