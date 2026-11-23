// Daftar kategori yang diizinkan. Dipakai bersama oleh Entity dan DTO (validasi @IsIn).
export const KATEGORI = [
  'Fiksi',
  'Sains',
  'Teknologi',
  'Sejarah',
  'Filsafat',
  'Biografi',
] as const;

export type Kategori = (typeof KATEGORI)[number];

// Entity Buku: merepresentasikan satu baris data buku di katalog.
// Tujuh field dengan tipe bervariasi (string, number, union/enum).
export class Buku {
  id: string; // contoh: "bk-001"
  judul: string;
  penulis: string;
  penerbit: string;
  tahun: number;
  kategori: Kategori;
  stok: number;
}
