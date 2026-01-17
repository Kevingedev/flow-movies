# 🎬 Flow Movies - Design System & Configuration

Este documento detalla los estándares de diseño, configuración técnica y principios estéticos establecidos para la plataforma **Flow Movies**. Este estándar debe mantenerse en todo el desarrollo futuro para garantizar una experiencia de usuario coherente y premium.

---

## 🎨 Paleta de Colores (Core Brand)

Definida en el archivo `src/styles/global.css` mediante variables de Tailwind CSS v4.

| Elemento | Color Hex | Variable CSS | Uso |
| :--- | :--- | :--- | :--- |
| **Fondo Principal** | `#050505` | `--color-flow-bg` | Fondos de página y contenedores base. |
| **Acento Principal** | `#DC2626` | `--color-flow-accent` | Botones, estados activos, logos y elementos críticos. |
| **Texto Primario** | `#FFFFFF` | `--color-flow-text` | Títulos y contenido principal. |
| **Texto Secundario** | `#A3A3A3` | `--color-flow-sub` | Descripciones, placeholders y enlaces inactivos. |
| **Bordes/Divisores** | `#1F2937` | `--color-flow-border` | Bordes sutiles y separadores. |

---

## ✨ Estética y Estilo Visual

### 1. Dark Mode Premium
La interfaz se basa en un contraste alto sobre negro profundo. Se evita el uso de grises claros para fondos, manteniendo una atmósfera cinematográfica.

### 2. Glassmorphism (Efecto Cristal)
Se implementa una estética de cristal en elementos interactivos (Header, SearchBar, Menús):
- **Backdrop Blur**: Uso intensivo de `backdrop-blur-md` y `backdrop-blur-xl`.
- **Transparencia**: Fondos semi-transparentes (`bg-white/5` o `bg-black/80`).
- **Bordes de Reflejo**: Bordes finos con baja opacidad (`border-white/10`) para simular el grosor del cristal.

### 3. Tipografía
- **Familia**: Sans-serif moderna y limpia (Inter o similar).
- **Peso**: Uso de `font-bold` para branding y `font-medium` para navegación.
- **Tracking**: `tracking-tight` en logos para un look más corporativo y moderno.

---

## 🚀 Animaciones y Micro-interacciones

Todas las transiciones deben sentirse suaves y orgánicas, evitando movimientos lineales bruscos.

- **Curva de Velocidad**: Se prefiere el uso de `cubic-bezier(0.23, 1, 0.32, 1)` para entradas y salidas (efecto "ease-out" premium).
- **Hover Effects**:
  - Resplandor suave (`drop-shadow` rojo) al pasar por encima de enlaces y logos.
  - Elevación sutil (`scale-105` o `translate-x-2`).
  - Transición de opacidad en botones y elementos secundarios.
- **Mobile Menu**: Desplazamiento lateral (`translate-x`) sincronizado con una transición de opacidad.

---

## 📱 Responsividad y Layout

- **Header Fijo**: Altura de `20 (h-20)` fija en la parte superior con un espaciador correspondiente para el contenido.
- **Puntos de Interrupción**:
  - **Mobile (< 768px)**: La navegación principal se oculta tras un menú de hamburguesa. El buscador se reduce a un icono expandible.
  - **Desktop (> 1024px)**: Navegación centrada y barra de búsqueda expandida.
- **Contenedores**: Máximo ancho de `1920px` para ultra-wide screens, con padding lateral dinámico.

---

## 🏗️ Estándar de Componentes (Arquitectura)

- **Atomicidad**: Componentes pequeños y reutilizables dentro de carpetas lógicas (ej. `src/components/header/`).
- **Astro & View Transitions**: Soporte nativo para transiciones entre páginas mediante el evento `astro:page-load` en los scripts de cliente.
- **SEO Ready**: Uso obligatorio de etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<ul>`). Atributos `aria-label` y `aria-hidden` para accesibilidad.

---

## 🛠️ Configuración Global

### Tailwind CSS v4 Configuration
```css
@theme {
  --color-flow-bg: #050505;
  --color-flow-accent: #DC2626;
  --color-flow-text: #FFFFFF;
  --color-flow-sub: #A3A3A3;
  --color-flow-border: #1F2937;
}
```

Este sistema de diseño es la base de **Flow Movies**. Cualquier nueva funcionalidad debe respetar estas reglas para mantener la integridad visual de la plataforma.
