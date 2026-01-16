# 📁 Estructura del Proyecto - Flow Movies

Este documento describe la organización de carpetas y archivos del proyecto, explicando el propósito de cada directorio y cómo se utilizan.

---

## 🗂️ Estructura General

```
src/
├── components/       # Componentes reutilizables
├── layouts/          # Plantillas base
├── pages/            # Rutas de la aplicación
├── services/         # Lógica de APIs externas
├── types/            # Definiciones de TypeScript
└── utils/            # Funciones de ayuda
```

---

## 📦 Descripción de Carpetas

### `components/`
**Componentes de UI reutilizables**

Contiene dos tipos de componentes:
- **`.astro`** - Componentes estáticos (renderizados en el servidor)
- **`.tsx`** - Componentes interactivos con React (cliente)

```
components/
├── MovieCard.astro       # Tarjeta de película (estática)
├── MovieGrid.astro       # Grid de películas
├── SearchBar.tsx         # Barra de búsqueda (interactiva)
├── Pagination.tsx        # Controles de paginación
├── Rating.astro          # Componente de calificación
├── Skeleton.astro        # Placeholder de carga
└── ui/                   # Componentes UI genéricos
    ├── Button.tsx
    ├── Input.tsx
    └── Modal.tsx
```

**Uso:**
```astro
---
import MovieCard from '../components/MovieCard.astro';
import SearchBar from '../components/SearchBar.tsx';
---

<SearchBar client:load />
<MovieCard title="Inception" rating={8.5} />
```

---

### `layouts/`
**Plantillas base de páginas**

Define la estructura común de todas las páginas incluyendo:
- Meta tags y SEO
- Navbar de navegación
- Footer
- Scripts globales

```
layouts/
├── BaseLayout.astro      # Layout principal con HTML base
├── MovieLayout.astro     # Layout específico para páginas de películas
└── partials/
    ├── Head.astro        # Meta tags, favicon, fonts
    ├── Navbar.astro      # Barra de navegación
    └── Footer.astro      # Pie de página
```

**Uso:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Inicio" description="Descubre las mejores películas">
  <main>
    <!-- Contenido de la página -->
  </main>
</BaseLayout>
```

---

### `pages/`
**Rutas de la aplicación**

Cada archivo `.astro` en esta carpeta se convierte automáticamente en una ruta.

```
pages/
├── index.astro           # Ruta: /
├── search.astro          # Ruta: /search
├── popular.astro         # Ruta: /popular
├── upcoming.astro        # Ruta: /upcoming
└── movie/
    └── [id].astro        # Ruta dinámica: /movie/12345
```

**Rutas Dinámicas:**
El archivo `[id].astro` captura el parámetro de la URL:
```astro
---
const { id } = Astro.params;
// /movie/550 → id = "550"
---
```

---

### `services/`
**Lógica de conexión a APIs**

Centraliza todas las llamadas a APIs externas (TMDB, etc.).

```
services/
├── tmdb.ts               # Cliente principal de TMDB
├── movies.ts             # Funciones específicas de películas
├── search.ts             # Funciones de búsqueda
└── config.ts             # Configuración de API (endpoints, keys)
```

**Ejemplo (`tmdb.ts`):**
```typescript
const API_KEY = import.meta.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  return response.json();
}

export async function getMovieDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.json();
}
```

---

### `types/`
**Definiciones de TypeScript**

Contiene interfaces y tipos para mantener el código tipado y seguro.

```
types/
├── movie.ts              # Tipos relacionados con películas
├── api.ts                # Tipos de respuestas de API
└── index.ts              # Exportaciones centralizadas
```

**Ejemplo (`movie.ts`):**
```typescript
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: Company[];
}

export interface Genre {
  id: number;
  name: string;
}
```

---

### `utils/`
**Funciones de ayuda**

Utilidades reutilizables en todo el proyecto.

```
utils/
├── formatDate.ts         # Formateo de fechas
├── formatCurrency.ts     # Formateo de moneda
├── imageUrl.ts           # Construcción de URLs de imágenes
├── slugify.ts            # Crear slugs para URLs
└── constants.ts          # Constantes globales
```

**Ejemplo (`imageUrl.ts`):**
```typescript
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function getPosterUrl(path: string | null, size = 'w500'): string {
  if (!path) return '/placeholder-poster.jpg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size = 'original'): string {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
```

**Ejemplo (`formatDate.ts`):**
```typescript
export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getYear(dateString: string): number {
  return new Date(dateString).getFullYear();
}
```

---

## 🔗 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                         Usuario                              │
│                      visita /movie/550                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    pages/movie/[id].astro                   │
│                 Captura el parámetro id=550                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    services/tmdb.ts                         │
│              getMovieDetails(550) → API TMDB                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    types/movie.ts                           │
│               Tipado: MovieDetails interface                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    utils/imageUrl.ts                        │
│                  getPosterUrl(poster_path)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    layouts/MovieLayout.astro                │
│                   Renderiza la página HTML                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    components/                              │
│        MovieCard, Rating, etc. muestran los datos           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes Astro | PascalCase.astro | `MovieCard.astro` |
| Componentes React | PascalCase.tsx | `SearchBar.tsx` |
| Servicios | camelCase.ts | `tmdb.ts` |
| Tipos | PascalCase | `MovieDetails` |
| Utilidades | camelCase.ts | `formatDate.ts` |
| Páginas | kebab-case o [param] | `movie/[id].astro` |

---

## 🚀 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# API de TMDB
TMDB_API_KEY=tu_api_key_aqui
TMDB_ACCESS_TOKEN=tu_token_aqui

# Configuración
PUBLIC_SITE_URL=https://flow-movies.com
```

---

## 📚 Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [API de TMDB](https://developers.themoviedb.org/3)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

---

**Última actualización:** Enero 2025