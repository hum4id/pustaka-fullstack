import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Semua endpoint diawali /api → cocok dengan VITE_API_URL=http://localhost:3000/api
  app.setGlobalPrefix('api');

  // Izinkan frontend Vite (port 5173) mengakses backend.
  app.enableCors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] });

  // ValidationPipe global: menjalankan aturan class-validator pada setiap DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang properti yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak jika ada properti asing
      transform: true, // ubah payload menjadi instance DTO (termasuk konversi tipe)
    }),
  );

  // Port 3001 (port 3000 sering dipakai dev server lain). Override lewat env PORT.
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
