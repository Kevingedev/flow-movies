# 📁 Estructura del Proyecto - Flow Movies

Este documento describe la organización de carpetas y archivos del proyecto, explicando el propósito de cada directorio y cómo se utilizan.

---

## 🗂️ Estructura General

```
src/
├── assets/           # Archivos estáticos (SVG, Imágenes)
├── components/       # Componentes de UI (Header, Hero, Footer)
├── layouts/          # Layout principal de la aplicación
├── pages/            # Rutas y páginas principales
├── services/         # Integraciones con APIs (TMDB)
├── styles/           # Estilos globales y temas (Tailwind)
├── types/            # Definiciones de TypeScript
└── utils/            # Funciones de utilidad y constantes
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
├── header/               # Componentes del Header
│   ├── Logo.astro
│   ├── Navigation.astro
│   ├── SearchBar.astro
│   ├── UserActions.astro
│   └── MobileMenu.astro
├── footer/               # Componentes del Footer
│   ├── FooterColumn.astro
│   └── SocialIcons.astro
├── Header.astro          # Componente Header principal
├── Footer.astro          # Componente Footer principal
├── Hero.astro            # Hero Section con efectos premium
└── Welcome.astro         # Componente de bienvenida (Astro default)
```

**Uso:**
```astro
---
---
import Hero from '../components/Hero.astro';
import Header from '../components/Header.astro';
---

<Header />
<Hero />
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
└── Layout.astro          # Layout principal con HTML base, fuentes y ClientRouter
```

**Uso:**
```astro
---
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Inicio">
  <!-- El contenido se inyecta en el <slot /> del layout -->
  <h1>Contenido de la página</h1>
</Layout>
```

---

### `pages/`
**Rutas de la aplicación**

Cada archivo `.astro` en esta carpeta se convierte automáticamente en una ruta.

```
pages/
├── index.astro           # Ruta: / (Home con Hero)
└── movie/
    └── [id].astro        # Ruta dinámica: /movie/123 (Página de detalle)
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
const API_KEY = 
const BASE_URL = 

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

---

### `assets/`
**Recursos estáticos del proyecto**

Contiene imágenes, SVGs y otros assets que se procesan mediante Astro.

```
assets/
├── background.svg
└── astro.svg
```

---

### `styles/`
**Estilos globales y configuración de diseño**

Centraliza la configuración de Tailwind CSS v4 y los estilos base.

```
styles/
└── global.css            # Definición de @theme y variables de marca
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
const TMDB_IMAGE_BASE = 

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
│                    layouts/Layout.astro                     │
│                   Renderiza la página HTML                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    components/                              │
│        Hero, Header, etc. muestran los datos                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes Astro | PascalCase.astro | `Hero.astro` |
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

**Última actualización:** Enero 2026