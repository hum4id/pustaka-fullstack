import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { KATEGORI } from '../entities/buku.entity';

// DTO untuk membuat buku baru (POST /api/buku).
// Lebih dari tiga aturan validasi berbeda: @IsString, @MinLength, @IsIn,
// @IsInt, @Min, @Max, @IsOptional.
export class CreateBukuDto {
  @IsString({ message: 'Judul harus berupa teks.' })
  @MinLength(2, { message: 'Judul minimal 2 karakter.' })
  judul: string;

  @IsString({ message: 'Penulis harus berupa teks.' })
  @IsNotEmpty({ message: 'Penulis wajib diisi.' })
  penulis: string;

  // Penerbit boleh dikosongkan.
  @IsOptional()
  @IsString({ message: 'Penerbit harus berupa teks.' })
  penerbit?: string;

  @IsInt({ message: 'Tahun harus berupa angka bulat.' })
  @Min(1000, { message: 'Tahun tidak valid.' })
  @Max(new Date().getFullYear(), { message: 'Tahun tidak boleh di masa depan.' })
  tahun: number;

  @IsIn(KATEGORI, {
    message: `Kategori harus salah satu dari: ${KATEGORI.join(', ')}.`,
  })
  kategori: string;

  @IsInt({ message: 'Stok harus berupa angka bulat.' })
  @Min(0, { message: 'Stok tidak boleh negatif.' })
  stok: number;
}
