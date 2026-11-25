
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller.js';
import { CategoriasService } from './categorias.service.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CategoriasController', () => {
  let controller: CategoriasController;

  const serviceMock = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  const categoria = {
    id: 1,
    nombre: 'Equipos informáticos',
    descripcion: 'Computadoras y laptops',
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [
        {
          provide: CategoriasService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<CategoriasController>(
      CategoriasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const dto = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    };

    serviceMock.create.mockResolvedValue(categoria);

    expect(await controller.create(dto)).toEqual(categoria);
    expect(serviceMock.create).toHaveBeenCalledWith(dto);
  });

  it('should return all categories', async () => {
    serviceMock.findAll.mockResolvedValue([categoria]);

    expect(await controller.findAll()).toEqual([categoria]);
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it('should return a category by id', async () => {
    serviceMock.findOne.mockResolvedValue(categoria);

    expect(await controller.findOne(1)).toEqual(categoria);
    expect(serviceMock.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a category', async () => {
    const dto = { nombre: 'Equipos tecnológicos' };
    const actualizada = { ...categoria, ...dto };

    serviceMock.update.mockResolvedValue(actualizada);

    expect(await controller.update(1, dto)).toEqual(actualizada);
    expect(serviceMock.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a category', async () => {
    serviceMock.remove.mockResolvedValue(categoria);

    expect(await controller.remove(1)).toEqual(categoria);
    expect(serviceMock.remove).toHaveBeenCalledWith(1);
  });
});
