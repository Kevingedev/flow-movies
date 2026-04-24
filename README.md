# 🎬 FlowMovie - Premium Movie & TV Explorer

FlowMovie es una plataforma moderna y fluida para explorar películas y series, construida con las tecnologías más punteras del ecosistema web actual. Ofrece una experiencia visual premium con animaciones suaves, diseño oscuro elegante y datos en tiempo real de TMDB.

![FlowMovie Banner](./public/hero-bg.png)

## 🚀 Tecnologías Principales

- **[Astro v5](https://astro.build/)** - Framework principal para un rendimiento máximo (islas de interactividad).
- **[React 19](https://react.dev/)** - Para componentes altamente interactivos.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilizado de última generación con variables CSS nativas.
- **[TMDB API](https://www.themoviedb.org/documentation/api)** - Fuente de datos para películas, series y tendencias.
- **[Astro Icon](https://astro-icon.dev/)** - Sistema de iconos optimizado.

## 🛠️ Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Kevingedev/flow-movies.git
   cd flow-movies
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade tu token de TMDB:
   ```env
   TMDB_TOKEN=tu_token_de_tmdb_aqui
   ```

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

## 📦 Estructura del Proyecto

El proyecto sigue una arquitectura modular y limpia:
- `/src/components` - Componentes UI (Astro y React).
- `/src/layouts` - Plantillas base de la aplicación.
- `/src/pages` - Rutas y API endpoints.
- `/src/services` - Lógica de conexión con la API de TMDB.
- `/src/styles` - Configuración de Tailwind CSS v4 y temas globales.

Para una descripción detallada, consulta [STRUCTURE.md](./STRUCTURE.md).

## 🚢 Despliegue en Vercel

Este proyecto está configurado para ejecutarse en **Vercel** usando SSR (Server Side Rendering).

1. Sube tus cambios a GitHub.
2. Conecta tu repositorio en el dashboard de Vercel.
3. **Importante:** Añade la variable de entorno `TMDB_TOKEN` en la configuración de Vercel.
4. El despliegue será automático.

## 🧞 Comandos Comunes

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza el build localmente |
| `npm run astro check` | Verifica errores de tipos y sintaxis |

---

Desarrollado con ❤️ por [Kevingedev](https://github.com/Kevingedev)
