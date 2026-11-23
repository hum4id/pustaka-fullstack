import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BukuService } from './buku.service';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';

@Controller('buku')
export class BukuController {
  // Dependency Injection: BukuService disuntikkan oleh Nest, bukan di-`new` sendiri.
  constructor(private readonly bukuService: BukuService) {}

  // POST /api/buku — menambah buku baru
  @Post()
  create(@Body() createBukuDto: CreateBukuDto) {
    return this.bukuService.create(createBukuDto);
  }

  // GET /api/buku — mengambil semua buku
  @Get()
  findAll() {
    return this.bukuService.findAll();
  }

  // GET /api/buku/:id — mengambil satu buku
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bukuService.findOne(id);
  }

  // PATCH /api/buku/:id — mengubah buku
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBukuDto: UpdateBukuDto) {
    return this.bukuService.update(id, updateBukuDto);
  }

  // DELETE /api/buku/:id — menghapus buku
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.bukuService.remove(id);
  }
}
