import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Tentang Kami",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Profil Masjid",
        path: "/about",
        newTab: false,
      },
      {
        id: 22,
        title: "Visi Misi",
        path: "/visi-misi",
        newTab: false,
      },
      {
        id: 23,
        title: "Pengurus",
        path: "/pengurus",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "Saldo Masjid",
    path: "/saldo",
    newTab: false,
  },
  {
    id: 4,
    title: "Konten",
    path: "/konten",
    newTab: false,
  },
  {
    id: 5,
    title: "Jadwal Sholat",
    path: "/jadwal-sholat",
    newTab: false,
  },
  {
    id: 6,
    title: "Kontak",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
