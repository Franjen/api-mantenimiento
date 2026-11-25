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
- 3 pruebas unitarias aprobadas.
- 2 pruebas E2E aprobadas.

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
- [ ] Clase 03: CRUD de categorías.
- [ ] Integración con Flutter.
- [ ] Despliegue en Render.


## Autor

Francisco Ismael Zamora Toaza

Carrera: Desarrollo de Software

Institución: AITEC
