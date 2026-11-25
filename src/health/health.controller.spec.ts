import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ServiceUnavailableException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('HealthController', () => {
  let controller: HealthController;

  const prismaMock = {
    $queryRaw: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ok when database is available', async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ result: 1 }]);

    const result = await controller.check();

    expect(result.status).toBe('ok');
    expect(result.db).toBe('ok');
    expect(result.timestamp).toBeDefined();
  });

  it('should return 503 when database is unavailable', async () => {
    prismaMock.$queryRaw.mockRejectedValue(
      new Error('Database unavailable'),
    );

    await expect(controller.check()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });
});