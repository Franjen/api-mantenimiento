
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CategoriasService', () => {
  let service: CategoriasService;

  const prismaMock = {
    categoria: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  const categoria = {
    id: 1,
    nombre: 'Equipos informáticos',
    descripcion: 'Computadoras y laptops',
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const dto = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    };

    prismaMock.categoria.create.mockResolvedValue(categoria);

    expect(await service.create(dto)).toEqual(categoria);
    expect(prismaMock.categoria.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should return all categories', async () => {
    prismaMock.categoria.findMany.mockResolvedValue([categoria]);

    expect(await service.findAll()).toEqual([categoria]);
  });

  it('should return a category by id', async () => {
    prismaMock.categoria.findUnique.mockResolvedValue(categoria);

    expect(await service.findOne(1)).toEqual(categoria);
  });

  it('should throw 404 when category does not exist', async () => {
    prismaMock.categoria.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a category', async () => {
    const dto = { nombre: 'Equipos tecnológicos' };
    const actualizada = { ...categoria, ...dto };

    prismaMock.categoria.findUnique.mockResolvedValue(categoria);
    prismaMock.categoria.update.mockResolvedValue(actualizada);

    expect(await service.update(1, dto)).toEqual(actualizada);
  });

  it('should delete a category', async () => {
    prismaMock.categoria.findUnique.mockResolvedValue(categoria);
    prismaMock.categoria.delete.mockResolvedValue(categoria);

    expect(await service.remove(1)).toEqual(categoria);
  });
});
