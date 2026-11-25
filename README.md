# API Mantenimiento

API REST para la gestión de mantenimiento de equipos,
desarrollada con NestJS, TypeScript, Prisma 7 y Supabase.

## Tecnologías utilizadas

- Node.js
- NestJS
- TypeScript
- ESM
- Prisma ORM 7
- PostgreSQL
- Supabase
- Vitest
- Bruno
- Git y GitHub

## Instalación

npm install

## Configuración de la base de datos

1. Crear un proyecto en Supabase.
2. Obtener la conexión Session Pooler (puerto 5432).
3. Copiar el archivo .env.example como .env.
4. Configurar la variable DATABASE_URL.
5. Ejecutar las migraciones de Prisma.

Comandos:

```bash
npx prisma migrate dev
npx prisma generate
```

El archivo .env contiene información confidencial
y no debe subirse a GitHub.

## Ejecutar el proyecto

```bash
npm run start:dev
```

## Endpoint disponible

GET /health

http://localhost:3000/health

Verifica el funcionamiento de la API y la conexión
con la base de datos.

Respuesta exitosa (HTTP 200):

```json
{
  "status": "ok",
  "db": "ok",
  "timestamp": "2026-11-25T02:46:34.995Z"
}
```

Si la consulta a la base de datos falla,
el endpoint devuelve HTTP 503.

## Modelo de base de datos

### Categoria

- id: identificador autoincremental.
- nombre: nombre único de la categoría.
- descripcion: descripción opcional.
- createdAt: fecha de creación.
- updatedAt: fecha de actualización.

## Pruebas automatizadas

```bash
npm run build
npm test
npm run test:e2e
```

Resultados verificados:

- Compilación sin errores.
- 16 pruebas unitarias aprobadas.
- 11 pruebas E2E aprobadas.

## Colección Bruno

- Carpeta: bruno
- Colección: api-mantenimiento
- Entorno: local
- Variable: baseUrl
- URL: http://localhost:3000
- Petición: GET /health

Validaciones:

- res.status: eq 200
- res.body.db: eq ok

## Avance del proyecto

- [x] Clase 01: Proyecto base y endpoint Health.
- [x] Clase 02: Prisma y conexión con Supabase.
- [x] Clase 03: CRUD de categorías.
- [ ] Integración con Flutter.
- [ ] Despliegue en Render.


## Autor

Francisco Ismael Zamora Toaza

Carrera: Desarrollo de Software

Institución: AITEC


## Clase 03 - CRUD de categorias

Implementacion del CRUD de categorias mediante NestJS,
Prisma ORM 7 y PostgreSQL en Supabase.

### Endpoints disponibles

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | /health | Estado de la API y base de datos |
| POST | /categorias | Crear una categoria |
| GET | /categorias | Listar todas las categorias |
| GET | /categorias/:id | Consultar una categoria |
| PATCH | /categorias/:id | Actualizar una categoria |
| DELETE | /categorias/:id | Eliminar una categoria |

### Documentacion Swagger

- Interfaz: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/docs-json

### Validaciones

- Nombre obligatorio, maximo 80 caracteres.
- Descripcion opcional, maximo 255 caracteres.
- Validacion global mediante ValidationPipe.
- Rechazo de propiedades no permitidas.
- Validacion de identificadores mediante ParseIntPipe.
- Error 400 para solicitudes invalidas.
- Error 404 para categorias inexistentes.

### Ejemplo de creacion

```json
{
  "nombre": "Equipos informaticos",
  "descripcion": "Computadoras y laptops"
}
```

### Integracion con Bruno

La coleccion api-mantenimiento esta conectada
directamente con la especificacion OpenAPI de Swagger.

URL: http://localhost:3000/docs-json

Entorno: local

Variable baseUrl: http://localhost:3000

Para incorporar nuevos endpoints, utilizar la opcion
Check for updates y sincronizar la coleccion.

### Pruebas automatizadas

| Archivo | Pruebas aprobadas |
|---------|-------------------|
| HealthController | 3 |
| CategoriasService | 7 |
| CategoriasController | 6 |
| Health E2E | 2 |
| Categorias E2E | 9 |
| Total | 27 |

Comandos de verificacion:

```bash
npm run build
npm test
npm run test:e2e
```

### Estado de la Clase 03

- [x] Configuracion de Swagger.
- [x] DTOs y validaciones.
- [x] CRUD de categorias.
- [x] Integracion con Prisma y Supabase.
- [x] Sincronizacion de Bruno con OpenAPI.
- [x] Pruebas manuales del CRUD.
- [x] Pruebas unitarias y E2E.
