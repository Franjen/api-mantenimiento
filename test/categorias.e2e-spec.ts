
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Categorias (e2e)', () => {
  let app: INestApplication<App>;

  const categoria = {
    id: 1,
    nombre: 'Equipos informáticos',
    descripcion: 'Computadoras y laptops',
  };

  const prismaMock = {
    $queryRaw: vi.fn(),
    categoria: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(PrismaService)
        .useValue(prismaMock)
        .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  it('POST /categorias - 201', async () => {
    prismaMock.categoria.create.mockResolvedValue(categoria);

    const res = await request(app.getHttpServer())
      .post('/categorias')
      .send({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      })
      .expect(201);

    expect(res.body.nombre).toBe(categoria.nombre);
  });

  it('GET /categorias - 200', async () => {
    prismaMock.categoria.findMany.mockResolvedValue([categoria]);

    const res = await request(app.getHttpServer())
      .get('/categorias')
      .expect(200);

    expect(res.body).toEqual([categoria]);
  });

  it('GET /categorias/1 - 200', async () => {
    prismaMock.categoria.findUnique.mockResolvedValue(categoria);

    const res = await request(app.getHttpServer())
      .get('/categorias/1')
      .expect(200);

    expect(res.body.id).toBe(1);
  });

  it('PATCH /categorias/1 - 200', async () => {
    const actualizada = {
      ...categoria,
      nombre: 'Equipos tecnológicos',
    };

    prismaMock.categoria.findUnique.mockResolvedValue(categoria);
    prismaMock.categoria.update.mockResolvedValue(actualizada);

    const res = await request(app.getHttpServer())
      .patch('/categorias/1')
      .send({ nombre: actualizada.nombre })
      .expect(200);

    expect(res.body.nombre).toBe(actualizada.nombre);
  });

  it('DELETE /categorias/1 - 200', async () => {
    prismaMock.categoria.findUnique.mockResolvedValue(categoria);
    prismaMock.categoria.delete.mockResolvedValue(categoria);

    await request(app.getHttpServer())
      .delete('/categorias/1')
      .expect(200);
  });

  it('GET /categorias/999 - 404', async () => {
    prismaMock.categoria.findUnique.mockResolvedValue(null);

    await request(app.getHttpServer())
      .get('/categorias/999')
      .expect(404);
  });

  it('GET /categorias/abc - 400', async () => {
    await request(app.getHttpServer())
      .get('/categorias/abc')
      .expect(400);
  });

  it('POST /categorias sin nombre - 400', async () => {
    await request(app.getHttpServer())
      .post('/categorias')
      .send({ descripcion: 'Categoria sin nombre' })
      .expect(400);
  });

  it('POST /categorias con campo no permitido - 400', async () => {
    await request(app.getHttpServer())
      .post('/categorias')
      .send({ nombre: 'Equipos', campoExtra: true })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
