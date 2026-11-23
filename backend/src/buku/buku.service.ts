import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';
import { Buku } from './entities/buku.entity';

@Injectable()
export class BukuService {
  // Penyimpanan sementara di memori (array). Reset setiap server di-restart.
  private daftarBuku: Buku[] = [
    { id: 'bk-001', judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', penerbit: 'Bentang Pustaka', tahun: 2005, kategori: 'Fiksi', stok: 4 },
    { id: 'bk-002', judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', penerbit: 'Hasta Mitra', tahun: 1980, kategori: 'Fiksi', stok: 2 },
    { id: 'bk-003', judul: 'Clean Code', penulis: 'Robert C. Martin', penerbit: 'Prentice Hall', tahun: 2008, kategori: 'Teknologi', stok: 3 },
    { id: 'bk-004', judul: 'Deep Learning', penulis: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', penerbit: 'MIT Press', tahun: 2016, kategori: 'Teknologi', stok: 0 },
    { id: 'bk-005', judul: 'A Brief History of Time', penulis: 'Stephen Hawking', penerbit: 'Bantam Books', tahun: 1988, kategori: 'Sains', stok: 2 },
  ];

  // Penghitung untuk membuat id unik berikutnya (bk-006, bk-007, ...).
  private penghitung = this.daftarBuku.length;

  // CREATE — menambah buku baru. Menolak jika judul + penulis sudah ada (ConflictException).
  create(createBukuDto: CreateBukuDto): Buku {
    const duplikat = this.daftarBuku.find(
      (buku) =>
        buku.judul.toLowerCase() === createBukuDto.judul.toLowerCase() &&
        buku.penulis.toLowerCase() === createBukuDto.penulis.toLowerCase(),
    );
    if (duplikat) {
      throw new ConflictException(
        `Buku "${createBukuDto.judul}" oleh ${createBukuDto.penulis} sudah ada di katalog.`,
      );
    }

    this.penghitung += 1;
    const bukuBaru: Buku = {
      id: `bk-${String(this.penghitung).padStart(3, '0')}`,
      judul: createBukuDto.judul,
      penulis: createBukuDto.penulis,
      penerbit: createBukuDto.penerbit ?? '',
      tahun: createBukuDto.tahun,
      kategori: createBukuDto.kategori as Buku['kategori'],
      stok: createBukuDto.stok,
    };
    this.daftarBuku.unshift(bukuBaru);
    return bukuBaru;
  }

  // READ (semua) — mengembalikan seluruh buku.
  findAll(): Buku[] {
    return this.daftarBuku;
  }

  // READ (satu) — mencari berdasarkan id, 404 jika tidak ada (NotFoundException).
  findOne(id: string): Buku {
    const buku = this.daftarBuku.find((item) => item.id === id);
    if (!buku) {
      throw new NotFoundException(`Buku dengan id "${id}" tidak ditemukan.`);
    }
    return buku;
  }

  // UPDATE — mengubah sebagian/seluruh field. 404 jika id tidak ada.
  update(id: string, updateBukuDto: UpdateBukuDto): Buku {
    const buku = this.findOne(id); // sudah melempar NotFoundException bila tidak ada
    Object.assign(buku, updateBukuDto);
    return buku;
  }

  // DELETE — menghapus buku. 404 jika id tidak ada.
  remove(id: string): { pesan: string } {
    const indeks = this.daftarBuku.findIndex((item) => item.id === id);
    if (indeks === -1) {
      throw new NotFoundException(`Buku dengan id "${id}" tidak ditemukan.`);
    }
    this.daftarBuku.splice(indeks, 1);
    return { pesan: `Buku dengan id "${id}" berhasil dihapus.` };
  }
}
