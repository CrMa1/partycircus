# Iconos del sitio

## Estado actual

El favicon ya **funciona** desde ya con `app/icon.svg` (un placeholder con los colores de marca y las letras "PC"). Next.js App Router lo detecta automáticamente y lo expone en `/icon.svg`.

Para reemplazarlo por la versión final del cliente, coloca los siguientes archivos:

## Archivos esperados

| Archivo | Tamaño | Ubicación | Uso |
|---|---|---|---|
| `favicon.ico` | 16 / 32 / 48 px (multi-size .ico) | `app/favicon.ico` | Pestaña del navegador (legacy) |
| `icon.png` | 512 × 512 | `public/icon.png` | PWA / Android / manifest |
| `apple-icon.png` | 180 × 180 | `public/apple-icon.png` | iOS home screen |
| `icon.svg` | vector | `app/icon.svg` | Favicon moderno (ya existe) |

> **Importante:** `favicon.ico` debe ir en `app/` (no en `public/`). Next.js App Router lo trata como un convention file y lo sirve automáticamente desde la raíz del sitio.

## Cómo generarlos

Desde el logo circular `public/images/party-circus/logo/party-circus-logo-circular.png`:

1. **favicon.ico**: usa [realfavicongenerator.net](https://realfavicongenerator.net) o [favicon.io](https://favicon.io) — sube el logo y descarga el ICO multi-tamaño.
2. **icon.png 512×512**: exporta el logo a PNG cuadrado.
3. **apple-icon.png 180×180**: exporta el logo a PNG cuadrado de 180.

## Recomendaciones de diseño

- No uses imágenes muy detalladas: a 16×16 se pierden.
- Si el logo tiene mucho detalle, usa una versión simplificada con fondo rojo (`#D62828`) y las letras "PC" en blanco con acento amarillo (`#F4C542`).

## Cache del navegador

El favicon queda **cacheado** agresivamente. Si cambias los archivos y no ves el nuevo:

- Hard refresh: `Ctrl + Shift + R` (Win) / `Cmd + Shift + R` (Mac)
- Abrir en ventana incógnita
- Esperar 5–15 minutos
- En producción: redeploy + esperar invalidación de CDN
- Forzar recarga del favicon visitando directamente `https://partycircus.com.mx/favicon.ico` y `Ctrl+F5`

## Referencia en metadata

Ya configurado en `app/layout.jsx`:

```js
manifest: '/site.webmanifest',
icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
    { url: '/favicon.ico', sizes: 'any' },
  ],
  shortcut: '/favicon.ico',
  apple: '/apple-icon.png',
}
```
