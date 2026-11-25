import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Health (e2e)', () => {
  let app: INestApplication<App>;

  const prismaMock = {
    $queryRaw: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET) - 200', async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ result: 1 }]);

    const res = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.db).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });

  it('/health (GET) - 503', async () => {
    prismaMock.$queryRaw.mockRejectedValue(
      new Error('Database unavailable'),
    );

    const res = await request(app.getHttpServer())
      .get('/health')
      .expect(503);

    expect(res.body.status).toBe('error');
    expect(res.body.db).toBe('error');
  });

  afterEach(async () => {
    await app.close();
  });
});