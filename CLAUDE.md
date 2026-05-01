# CLAUDE.md — Guía interna del proyecto Party Circus

> Archivo de referencia para Claude. Leer completo antes de hacer cualquier cambio.

---

## 1. Descripción del proyecto

**Party Circus** es un salón de fiestas infantiles y eventos sociales ubicado en **Blvd. de las Naciones 118, planta alta, Col. Valle Dorado, Tlalnepantla, Estado de México, C.P. 54020**.

Este proyecto es una **landing page de una sola página** (single-page landing) construida con Next.js. No tiene rutas adicionales ni backend: toda la información del negocio está en archivos de configuración bajo `lib/`.

**Público objetivo:** familias con hijos pequeños en Tlalnepantla, Valle Dorado, Satélite, Mundo E, Arboledas, Naucalpan, Atizapán y zonas cercanas que buscan un salón para celebrar cumpleaños, graduaciones o eventos sociales.

**Objetivo principal de conversión:** llevar al visitante a cotizar por WhatsApp. Cada sección tiene al menos un CTA directo a WhatsApp con mensaje prellenado. No hay formularios de contacto internos ni backend.

**Objetivo SEO local:** posicionar para búsquedas como "salón de fiestas infantiles Valle Dorado", "salón infantil Tlalnepantla", "graduaciones infantiles Tlalnepantla", "ludoteca Valle Dorado", y variantes geográficas cercanas.

---

## 2. Stack técnico

| Elemento | Detalle |
|---|---|
| Framework | Next.js 15 con App Router |
| UI | React 18, archivos `.jsx` (sin TypeScript) |
| Estilos | Tailwind CSS 3.4 con sistema de tokens CSS variables |
| Iconos | `lucide-react` 0.460 |
| Utilidades | `clsx` + `tailwind-merge` (helper en `lib/utils.js`) |
| Fuentes | `Inter` (cuerpo) y `Baloo 2` (display/titulares), vía `next/font/google` |
| SEO | Metadata de Next.js App Router + `sitemap.js` + `robots.js` + JSON-LD (LocalBusiness, WebSite, FAQPage) |
| Deploy target | Vercel (sensible a mayúsculas/minúsculas en rutas de archivo) |
| Backend | Ninguno — landing estática |
| Imágenes | `<img>` nativo via componente `SmartImage`, **no** `next/image` |
| Path alias | `@/` apunta a la raíz del proyecto (configurado automáticamente por Next.js) |

**Dependencias de producción:** `next`, `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`. No agregar dependencias sin justificación fuerte.

---

## 3. Estructura del proyecto

```
/
├── app/
│   ├── layout.jsx          # Layout raíz: metadata global, fuentes, JSON-LD
│   ├── page.jsx            # Ensamblador principal — solo importa y ordena secciones
│   ├── globals.css         # Sistema de diseño completo: variables, utilidades, componentes base
│   ├── sitemap.js          # Sitemap XML generado por Next.js
│   └── robots.js           # robots.txt generado por Next.js
│
├── components/
│   ├── Navbar.jsx              # Header fijo con scroll detection y menú móvil
│   ├── Footer.jsx              # Footer profundo (navy) con nav, contacto, redes, PrivacyModal, JobsModal
│   ├── WhatsAppButton.jsx      # Botón flotante de WhatsApp (bottom-right, fijo)
│   ├── PromoModal.jsx          # Modal promocional al cargar la página (configurable en lib/promo.js)
│   ├── PackageDetailModal.jsx  # Modal de detalle de paquete (abre desde Paquetes.jsx)
│   ├── PrivacyModal.jsx        # Aviso de privacidad en modal (abre desde Footer.jsx)
│   ├── JobsModal.jsx           # "Trabaja con nosotros" — formulario con validación (nombre, teléfono, email, comentario) que envía a WhatsApp. `'use client'`.
│   ├── Modal.jsx               # Componente base reutilizable para todos los modales
│   ├── SmartImage.jsx          # Wrapper de <img> con fallback de marca (placeholder con carpa)
│   └── JsonLd.jsx              # Inyecta JSON-LD via <script> en el <head>
│
├── components/sections/
│   ├── Hero.jsx            # Sección Hero: título H1, CTA, imagen principal, stats rápidos
│   ├── Paquetes.jsx        # Cards de paquetes + PackageDetailModal + SabadoExclusivo + Cotizador
│   ├── Cotizador.jsx       # Cotizador interactivo (paquete, personas, fecha, horario, sábado exclusivo)
│   ├── SabadoExclusivo.jsx # Bloque informativo estático de "Sábado exclusivo" — se muestra siempre, arriba del Cotizador
│   ├── Ludoteca.jsx        # Servicio de ludoteca lunes-jueves
│   ├── Graduaciones.jsx    # Sección de eventos sociales (graduaciones, bautizos, confirmaciones)
│   ├── Nosotros.jsx        # Quiénes somos, diferenciales, prueba social
│   ├── Galeria.jsx         # Mosaico de fotos con lightbox + videos con player nativo
│   ├── Ubicacion.jsx       # Mapa embebido, dirección, horario, CTAs y zonas cercanas (SEO)
│   ├── FAQ.jsx             # Acordeón de preguntas frecuentes
│   └── CTAFinal.jsx        # Sección CTA de cierre (fondo rojo) con WhatsApp y teléfono
│
├── lib/
│   ├── config.js           # Datos del negocio, paquetes, galería, FAQ, navegación — FUENTE ÚNICA
│   ├── seo.js              # Títulos, descripción, keywords, JSON-LD builders, SITE_URL, NEARBY_ZONES
│   ├── promo.js            # Config del PromoModal (enabled, imagen, textos, CTA, delay)
│   ├── pricing.js          # Tabla de precios por paquete + horario + personas, helpers formatMXN/getPrice
│   ├── whatsapp.js         # Helper whatsappUrl() — construye links wa.me con mensaje prellenado
│   └── utils.js            # Helper cn() para combinar clases Tailwind
│
├── public/
│   ├── images/party-circus/
│   │   ├── hero/           # Imagen principal del hero
│   │   ├── paquetes/       # Una imagen por paquete (Salón, Party, Circus)
│   │   ├── ludoteca/       # Collage de fotos de la ludoteca
│   │   ├── graduaciones/   # Fotos de eventos sociales (graduación, bautizo, confirmación, etc.)
│   │   ├── nosotros/       # Foto del equipo/ambiente
│   │   ├── galeria/        # 8 fotos de galería (evento-party-circus-1.webp a 8.webp)
│   │   ├── logo/           # Logo circular PNG
│   │   ├── ubicacion/      # Fachada del local
│   │   ├── seo/            # Imágenes OG/Twitter (og-party-circus-valle-dorado.jpg)
│   │   └── promociones/    # Imagen del PromoModal
│   └── videos/party-circus/
│       └── *.mp4           # 3 videos para la galería
│
├── tailwind.config.js      # Config de Tailwind: colores desde CSS variables, fuentes, tamaños display
├── next.config.mjs         # Strict mode + `images.formats` (avif/webp) — config para next/image, que NO se usa en este proyecto
└── package.json
```

### Archivos de configuración clave (editar aquí, no en los componentes)

- **`lib/config.js`** — Todo sobre el negocio: nombre, teléfono, dirección, paquetes, galería, FAQ, horarios, redes sociales, prueba social (Google/Facebook).
- **`lib/seo.js`** — Keywords, meta title, meta description, SITE_URL, JSON-LD builders, NEARBY_ZONES.
- **`lib/promo.js`** — Contenido del modal promocional: se activa/desactiva con `enabled: true/false`.
- **`lib/pricing.js`** — Precios por paquete (`salon`, `party`, `circus`), horario (`lunjue`, `vidofes`, `sabtarde`) y número de personas (50–120).

---

## 4. Orden actual de la landing

Este es el orden exacto de `app/page.jsx`. **No cambiar sin razón fuerte de conversión o SEO.**

```
1.  <Navbar />               — Header fijo (fuera del <main>)
2.  <main>
3.    <Hero />               — id="home"
4.    <Paquetes />           — id="paquetes" (contiene #cotizador internamente)
5.    <Ludoteca />           — id="ludoteca"
6.    <Graduaciones />       — id="graduaciones"
7.    <Nosotros />           — id="nosotros"
8.    <Galeria />            — id="galeria"
9.    <Ubicacion />          — id="ubicacion"
10.   <FAQ />                — id="faq"
11.   <CTAFinal />           — sin id (sección de cierre)
12. </main>
13. <Footer />               — Fuera del <main>
14. <WhatsAppButton />       — Flotante global (z-50)
15. <PromoModal />           — Modal overlay global (z-80)
```

Los IDs de sección coinciden con `NAV_LINKS` en `lib/config.js` y con las URLs del sitemap en `app/sitemap.js`. Si se agrega una sección nueva, debe tener `id` y agregarse a ambos archivos.

**Detalles de comportamiento:**
- `Navbar`: transparente cuando `scrollY ≤ 8px`; pasa a `bg-surface/95 backdrop-blur` al bajar. La `pc-ribbon-thin` solo aparece al hacer scroll. En móvil, abre un panel debajo del header (no sidebar) con links y CTA de WhatsApp.
- `Galeria`: muestra 6 de 8 fotos inicialmente (`INITIAL_VISIBLE = 6`), con botón "Ver más fotos". El lightbox navega con flechas izquierda/derecha y se cierra con Escape. Los 3 videos usan `<video>` nativo HTML5.
- `FAQ`: el primer ítem (índice 0) está abierto por defecto (`useState(0)`).

---

## 5. Identidad visual

### Filosofía de color

> Proporción: **65–70% crema/blanco · 15–20% rojo · 8–10% amarillo · 8–10% azul**

Los colores viven como variables CSS en `:root` de `globals.css`. **Nunca hardcodear valores hex en componentes.**

| Token Tailwind | Variable CSS | Valor hex | Uso |
|---|---|---|---|
| `primary` | `--pc-red` | `#D62828` | Marca, CTA, acentos rojos |
| `primary-dark` | `--pc-red-dark` | `#A61E1E` | Hover de rojo |
| `secondary` | `--pc-blue` | `#2563EB` | Acento azul, botón info |
| `accent` | `--pc-yellow` | `#F4C542` | Acentos dorados, highlights |
| `cream` | `--pc-cream` | `#F8F3E7` | Fondo de secciones cálidas |
| `surface` | `--pc-surface` | `#FFFFFF` | Fondo de cards y secciones blancas |
| `ink` | `--pc-text` | `#1F2937` | Texto principal |
| `ink-soft` | `--pc-text-soft` | `#4B5563` | Texto secundario |
| `navy` | `--pc-navy` | `#111827` | Footer, overlays oscuros |
| `whatsapp` | `--pc-whatsapp` | `#22C55E` | Botones de WhatsApp |

### Fuentes

- **Titulares / display:** `Baloo 2` — variable `--font-display`, clase Tailwind `font-display`. Pesos: 500, 600, 700, 800.
- **Cuerpo:** `Inter` — variable `--font-body`, clase Tailwind `font-sans`.
- El HTML tiene `lang="es-MX"`.

### Componentes visuales de marca (ya definidos en `globals.css`)

| Clase | Descripción |
|---|---|
| `.pc-ribbon` | Franja tricolor rojo/amarillo/azul de 5px — bordea Hero y CTAFinal |
| `.pc-ribbon-thin` | Versión de 2px — aparece en Navbar al hacer scroll |
| `.pc-hero-bg` | Fondo crema para el Hero |
| `.pc-cta-bg` | Fondo rojo degradado para CTAFinal |
| `.pc-footer-bg` | Fondo navy con gradientes sutiles para el Footer |
| `.ink-mark` | Efecto marcador amarillo detrás de texto |
| `.pc-dots` | Patrón de puntos discreto |
| `.eyebrow` | Label de sección (rojo, mayúsculas, con línea) |
| `.eyebrow-on-dark` | Igual pero en amarillo para secciones oscuras |
| `.reveal` | Animación fadeUp (respeta `prefers-reduced-motion`) |
| `.btn-primary` | Botón rojo primario |
| `.btn-whatsapp` | Botón verde WhatsApp |
| `.btn-dark` | Botón navy oscuro |
| `.btn-outline` | Botón outline neutro |
| `.btn-info` | Botón azul |
| `.btn-ghost` | Botón fantasma para navegación |
| `.card` / `.card-soft` | Cards con bordes redondeados `rounded-2xl` |
| `.pc-chip` | Chip de beneficio (borde, fondo blanco, texto pequeño) |
| `.pc-tag` | Tag de marca con punto rojo (usado en Hero) |
| `.section-padding` | `py-16 md:py-24 lg:py-28` — padding estándar de sección |
| `.container-page` | Container centrado con padding horizontal responsivo |
| `.h-display` | Clase para titulares H1/H2 grandes |

### Fondo actual de cada sección

El ritmo de fondos crea contraste visual sin usar colores oscuros. **No cambiar sin razón.**

| Sección | Fondo |
|---|---|
| Hero | `pc-hero-bg` (crema `#F8F3E7`) + `pc-ribbon` arriba **y** abajo |
| Paquetes | `bg-surface` (blanco) |
| Ludoteca | `bg-cream` |
| Graduaciones | `bg-cream` |
| Nosotros | `bg-surface` |
| Galería | `bg-cream-2/40` (crema-2 con 40% opacidad) |
| Ubicación | `bg-surface` |
| FAQ | `bg-cream` |
| CTAFinal | `pc-cta-bg` (degradado rojo) + `pc-ribbon` solo abajo |
| Footer | `pc-footer-bg` (navy con gradientes sutiles) |

> Hero es la única sección con `pc-ribbon` en la parte **superior Y inferior**. CTAFinal solo lo tiene al final.

### Reglas visuales

- Estilo infantil, colorido, limpio y profesional. Inspiración circo infantil.
- El fondo general del `<body>` es crema (`--pc-cream`). El ritmo de secciones alterna `bg-cream` / `bg-surface` / `bg-cream-2/40` para que cada bloque respire.
- Bordes redondeados grandes (`rounded-2xl`, `rounded-3xl`) en cards y modales.
- Sombras cálidas, no frías.
- No usar estilos oscuros en secciones de contenido (solo navy en footer y CTAFinal).
- No saturar visualmente con demasiados colores o gradientes.
- No romper la estética infantil con diseños corporativos genéricos.
- Mantener buena legibilidad: textos sobre fondo claro usan `text-ink` o `text-ink-soft`.
- Mantener buen contraste: no poner texto claro sobre fondos crema sin asegurar contraste.
- Las imágenes deben verse con bordes redondeados, nunca cuadradas sin radio.

---

## 6. Reglas de componentes

- Cada sección grande de la página vive en `components/sections/`.
- Componentes reutilizables (modales base, SmartImage, botones flotantes) viven en `components/`.
- `app/page.jsx` solo importa y ordena secciones. No meter lógica ni estilos directamente ahí.
- No duplicar el botón de WhatsApp. Ya existe `WhatsAppButton.jsx` como flotante global y `whatsappUrl()` en `lib/whatsapp.js`.
- Toda nueva sección debe tener `id` para navegación interna, debe agregarse al sitemap y a `NAV_LINKS` si aplica.
- Los componentes internos (helpers visuales como `PackageCard`, `Tile`, `Stat`, `Proof`) pueden vivir en el mismo archivo de sección para no fragmentar innecesariamente.
- Los modales usan `Modal.jsx` como base. No crear sistemas de modal paralelos.
- Los datos del negocio (paquetes, precios, FAQ, etc.) siempre se leen desde `lib/config.js` o `lib/pricing.js`. No hardcodear en los componentes.
- `SmartImage` reemplaza a `<img>` directo. Siempre usarlo para mostrar imágenes del proyecto (tiene fallback de marca).

### Componentes Client vs Server

Solo agregar `'use client'` cuando el componente usa hooks React. Los demás son Server Components por defecto.

| `'use client'` (hooks) | Server Component (sin hooks) |
|---|---|
| `Navbar.jsx` | `Hero.jsx` |
| `Footer.jsx` | `Ludoteca.jsx` |
| `WhatsAppButton.jsx` | `Graduaciones.jsx` |
| `PromoModal.jsx` | `Nosotros.jsx` |
| `SmartImage.jsx` | `Ubicacion.jsx` |
| `Modal.jsx` | `CTAFinal.jsx` |
| `JobsModal.jsx` | `SabadoExclusivo.jsx` |
| `Paquetes.jsx` | `PackageDetailModal.jsx`* |
| `Galeria.jsx` | `PrivacyModal.jsx`* |
| `FAQ.jsx` | `JsonLd.jsx` |
| `Cotizador.jsx` | — |

> *`PackageDetailModal` y `PrivacyModal` no tienen hooks propios; renderizan `Modal` (que sí es Client). Eso es válido en Next.js — un Server Component puede importar y renderizar un Client Component.

---

## 7. Reglas de responsive

- Mobile-first. El sitio debe verse perfecto en celular (320px–430px) antes que en desktop.
- Validar en móvil, tablet (768px) y desktop (1024px+).
- No usar tamaños fijos (`px` absolutos en width/height) que rompan en pantallas pequeñas. Usar `w-full`, `max-w-*`, `clamp`, o breakpoints de Tailwind.
- Imágenes deben ser responsivas: el componente `SmartImage` ya las hace `object-cover` dentro de su wrapper.
- El menú en móvil se despliega como overlay full-width con links grandes (≥48px de área táctil). No es un menú hamburguesa de sidebar.
- Botones deben tener mínimo `min-h-[48px]` para ser fáciles de tocar en móvil. El sistema `.btn` ya lo tiene.
- Evitar textos demasiado largos en el hero móvil. El H1 debe ser legible en pantallas pequeñas.
- El `WhatsAppButton` tiene `bottom-safe` (iOS safe area) para no quedar tapado por la barra del navegador.
- Los modales se muestran desde abajo en móvil (`items-end`) y centrados en desktop (`sm:items-center`).

---

## 8. Reglas de SEO local

### Keywords objetivo (mantener en títulos, H1, H2 y contenido natural)

- `Party Circus Valle Dorado`
- `salón de fiestas infantiles en Valle Dorado`
- `salón infantil Tlalnepantla`
- `fiestas infantiles Valle Dorado`
- `graduaciones infantiles Tlalnepantla`
- `ludoteca en Valle Dorado`
- `salón para bautizos Tlalnepantla`
- `salón infantil cerca de Satélite`
- `salón infantil cerca de Mundo E`

### Zonas geográficas cubiertas (en `lib/seo.js` → `NEARBY_ZONES`)

Valle Dorado, Tlalnepantla, Satélite, Mundo E, Arboledas, Naucalpan, Atizapán, Lomas Verdes.

### Implementación actual de SEO

- `app/layout.jsx` exporta `metadata` con title, description, keywords, og, twitter, robots, manifest, icons.
- `app/sitemap.js` genera `/sitemap.xml` con todas las secciones.
- `app/robots.js` genera `robots.txt` permitiendo todo e indicando el sitemap.
- `app/layout.jsx` inyecta 3 schemas JSON-LD: `EventVenue` (LocalBusiness), `WebSite`, `FAQPage`.
- El builder `localBusinessSchema()` usa `areaServed` con las NEARBY_ZONES.
- `SITE_URL = 'https://partycircus.com.mx'` está en `lib/seo.js`.

### Reglas

- Cuidar H1 (solo uno por página, en Hero), H2 por sección, H3 para subelementos.
- No repetir keywords de forma artificial — el contenido debe leer natural en español.
- La ubicación (Valle Dorado, Tlalnepantla, Estado de México) debe estar visible en Hero, Footer y Ubicacion.
- El CTA hacia WhatsApp debe estar presente en Hero, Paquetes, Ludoteca, Graduaciones, Nosotros, FAQ y CTAFinal.
- No cambiar `SITE_URL` sin actualizar todos los schemas y links canónicos.
- Si se modifica el FAQ en `lib/config.js`, el JSON-LD de FAQPage se actualiza automáticamente.

---

## 9. Reglas para WhatsApp

- Toda cotización y contacto se realiza por WhatsApp. No hay formularios con backend.
- El número está centralizado en `lib/config.js` → `BUSINESS.whatsapp` (`5215527187435`).
- La función `whatsappUrl(message?)` en `lib/whatsapp.js` construye el link `wa.me`. Siempre usarla; nunca construir el link manualmente en los componentes.
- Cada sección que requiere contacto usa un mensaje prellenado específico y contextual.

### Textos de CTA aprobados (usar estos, no inventar)

| Contexto | Texto |
|---|---|
| Cotización general | `Cotiza por WhatsApp` / `Cotizar por WhatsApp` |
| Paquetes | `Cotizar este paquete por WhatsApp` / `Pregunta por WhatsApp` |
| Ludoteca | `Cotizar ludoteca por WhatsApp` |
| Graduaciones / eventos | `Cotizar evento` |
| FAQ | `Hacer mi pregunta` |
| CTAFinal | `Cotizar por WhatsApp` |
| PromoModal | Configurable en `lib/promo.js` → `ctaLabel` |
| Navbar (móvil) | `Cotizar por WhatsApp` |
| Footer | `Cotizar por WhatsApp` |

- No usar CTAs vagos como "Enviar", "Click aquí", "Contactar" o "Más info".
- Los mensajes prellenados deben identificar el contexto (paquete de interés, servicio, etc.).
- El mensaje por defecto global está en `BUSINESS.whatsappMessage` de `lib/config.js`.

---

## 10. Reglas para el PromoModal

- Configuración completa en `lib/promo.js`. Editarlo solo desde ese archivo.
- Se activa con `enabled: true`. Para desactivarlo temporalmente: `enabled: false`.
- **Abre en cada carga de la página**, sin excepción. El `useEffect` en `PromoModal.jsx` dispara `setOpen(true)` tras `delayMs` ms (actualmente 1000 ms) sin ningún check de `localStorage` ni `sessionStorage`.
- El campo `storageKey` definido en `lib/promo.js` **no está implementado** en `PromoModal.jsx` — está presente pero es código inactivo. Si en el futuro se quiere mostrar el modal solo una vez por sesión, habría que implementar la lógica en el componente.
- Campos editables: `badge`, `title`, `description`, `ctaLabel`, `closeLabel`, `image`, `imageAlt`, `whatsappMessage`, `delayMs`.
- La imagen vive en `public/images/party-circus/promociones/promo-modal-party-circus.webp`.
- El modal no bloquea la navegación: tiene botón de cierre visible, cierre por Escape y clic en el backdrop.
- En móvil se muestra desde abajo (sheet bottom-sheet). En desktop, centrado con imagen a la izquierda y contenido a la derecha.
- La franja tricolor de marca (`pc-ribbon`) aparece en la parte superior del modal.
- El componente maneja su propio estado de animación de cierre (`closing`) con un timeout de 200 ms para la animación de salida.
- No agregar lógica de negocio adicional al PromoModal; mantenerlo como vidriera de promociones.

---

## 11. Reglas para imágenes

### Estructura de directorios en `public/`

```
public/images/party-circus/
├── hero/           → party-circus-valle-dorado-salon-principal.webp
├── paquetes/       → paquete-salon-party-circus.webp, paquete-party-party-circus.webp, paquete-circus-party-circus.webp
├── ludoteca/       → ludoteca-party-circus-valle-dorado.webp, area-juegos-ludoteca-party-circus.webp, ninos-jugando-party-circus-ludoteca.webp
├── graduaciones/   → graduacion-party-circus-1.webp, graduacion-party-circus-2.webp, bautizo-party-circus-1.webp, confirmacion-party-circus-1.webp, evento-social-party-circus-1.webp
├── nosotros/       → equipo-party-circus.webp
├── galeria/        → evento-party-circus-1.webp a evento-party-circus-8.webp
├── logo/           → party-circus-logo-circular.png
├── ubicacion/      → fachada-party-circus.webp
├── seo/            → og-party-circus-valle-dorado.jpg, twitter-party-circus-valle-dorado.jpg
└── promociones/    → promo-modal-party-circus.webp

public/videos/party-circus/
├── galeria-evento-01.mp4
├── galeria-evento-02.mp4
└── galeria-evento-03.mp4
```

### Reglas

- Guardar siempre en la subcarpeta correcta de `public/images/party-circus/`.
- Usar nombres descriptivos en kebab-case que incluyan el negocio o la sección: `fiesta-infantil-party-circus-valle-dorado.webp`.
- Preferir formato `.webp` para fotos. `.png` solo para logos con transparencia.
- Optimizar antes de subir: máximo 200–300 KB para fotos de sección, máximo 80–100 KB para thumbnails.
- Siempre usar `SmartImage` en lugar de `<img>` directo. No usa `next/image`.
- El prop `priority` de `SmartImage` se usa solo en imágenes above-the-fold (hero, logo de navbar).
- El prop `sizes` se debe pasar cuando la imagen tiene tamaño contextual conocido.
- Los `alt` de imágenes deben ser descriptivos con keywords locales: `"Salón de fiestas infantiles Party Circus en Valle Dorado, Tlalnepantla"`.
- No usar imágenes con texto incrustado en el diseño principal, excepto en materiales promocionales específicos donde el texto es parte de la imagen.
- No subir imágenes pesadas innecesarias (> 1 MB). Para videos, máximo 10–15 MB por archivo.

---

## 12. Cotizador — detalles técnicos

El cotizador es interactivo y vive en `components/sections/Cotizador.jsx`. Es importado por `Paquetes.jsx`.

- **ID:** `#cotizador` (con `scroll-mt-24`) — destino de links internos desde otras secciones y del sitemap.
- **Lógica:** estado local en React (sin contexto ni store externo). `'use client'`.
- **Estado inicial:** `packageId='party'`, `people=80`, `scheduleId='lunjue'`, `date=''`, `saturdayExclusive=false`.
- **Paquetes disponibles:** Salón, Party, Circus (de `lib/config.js` → `PACKAGES`).
- **Horarios y etiquetas de tarifa** (de `lib/config.js` → `SCHEDULES`):
  - `lunjue` → "Tarifa base" (lunes a jueves + sábado mañana)
  - `vidofes` → "Tarifa alta" (viernes, domingo y festivos)
  - `sabtarde` → "Tarifa especial" (sábado tarde)
- **Personas:** 50, 60, 70, 80, 90, 100, 110, 120 (de `PEOPLE_OPTIONS`).
- **Precios:** en `lib/pricing.js` → objeto `PRICING[packageId][scheduleId][people]`.
- **El precio mostrado es estimado.** El disclaimer siempre aclara que el precio final se confirma por WhatsApp.
- El resumen genera automáticamente un mensaje WhatsApp prellenado con todos los detalles seleccionados.

### Sábado exclusivo: dos componentes distintos

Hay dos piezas separadas que tratan el mismo tema. No confundirlas:

| Componente | Archivo | Posición | Comportamiento |
|---|---|---|---|
| `SabadoExclusivo` | `components/sections/SabadoExclusivo.jsx` | Encima del Cotizador, siempre visible | Bloque estático informativo. Server Component. |
| `SaturdayExclusiveToggle` | Definido dentro de `Cotizador.jsx` (no es archivo separado) | Dentro del formulario del Cotizador | Solo aparece cuando la fecha seleccionada cae en sábado (detectado por `isSaturday()` en cliente). |

- El fee de $3,000 MXN del sábado exclusivo está como `const SATURDAY_EXCLUSIVE_FEE = 3000` al inicio de `Cotizador.jsx`. **No está en `lib/pricing.js`**. Si cambia el precio, hay que editarlo ahí directamente.

---

## 13. Paquetes — datos clave

Los 3 paquetes están en `lib/config.js` → `PACKAGES`:

| Paquete | ID | Destacado | Duración |
|---|---|---|---|
| Salón | `salon` | No | 5 hrs + 30 min entrada/salida |
| Party | `party` | No | 5 hrs + 30 min entrada/salida |
| Circus | `circus` | **Sí** (featured) | 5 hrs + 30 min entrada/salida |

El paquete `circus` tiene `featured: true`, lo que le da tratamiento visual especial (ring, shadow-pop, badge "Más completo", elevación en desktop).

Cada paquete tiene `includes` (lista corta para la card) y `fullIncludes` (lista completa para el modal de detalle).

---

## 14. Reglas de calidad de código

- No introducir TypeScript. El proyecto usa `.jsx` en todos los componentes.
- No agregar dependencias sin justificación fuerte (analizar si clsx, tailwind-merge o lucide-react ya cubren la necesidad).
- No sobrecomplicar la landing con abstucciones innecesarias (no añadir Context, Redux, Zustand, etc. para estado local simple).
- No romper imports existentes al renombrar archivos.
- Los nombres de archivos de componentes usan **PascalCase** (`Navbar.jsx`, `SmartImage.jsx`). En Vercel (Linux) las rutas son case-sensitive: un import con nombre incorrecto falla en producción aunque funcione en Windows.
- Antes de terminar cualquier cambio, verificar que no haya imports rotos (componentes eliminados o renombrados sin actualizar sus referencias).
- Usar `'use client'` solo en componentes que usen hooks React (`useState`, `useEffect`, etc.). Los componentes sin interactividad son Server Components por defecto y no necesitan la directiva. Agregar `'use client'` innecesariamente no rompe nada pero impide optimizaciones de server rendering. Ver tabla en sección 6.
- No hardcodear datos del negocio (nombre, teléfono, dirección, precios) en los componentes. Todo pasa por `lib/config.js` o `lib/pricing.js`.
- El sistema de clases CSS está centralizado en `globals.css`. No crear clases de utilidad nuevas en archivos de componentes; preferir clases inline de Tailwind o agregar la utilidad en `globals.css`.
- No agregar comentarios que expliquen qué hace el código. Solo comentar el "por qué" cuando hay una razón no obvia.

---

## 15. Cómo trabajar modificaciones futuras

### Antes de hacer cualquier cambio

1. Leer este archivo `CLAUDE.md` completo.
2. Identificar qué archivos se van a tocar y anunciarlos brevemente.
3. Revisar los archivos relacionados (no solo el archivo que se va a modificar).
4. Mantener el diseño visual actual. Si el cambio puede afectar la estética, advertirlo primero.
5. Priorizar: conversión (CTAs de WhatsApp) > SEO local > responsive > estética.
6. Si una petición puede afectar negativamente el SEO, la conversión o romper el diseño, advertirlo antes de proceder.

### Dónde hacer cada tipo de cambio

| Tipo de cambio | Dónde editarlo |
|---|---|
| Datos del negocio (nombre, teléfono, dirección, horarios) | `lib/config.js` |
| Paquetes (nombre, incluye, imagen, precio base) | `lib/config.js` → `PACKAGES` |
| Precios del cotizador | `lib/pricing.js` → `PRICING` |
| PromoModal (imagen, texto, CTA, activar/desactivar) | `lib/promo.js` |
| Keywords SEO, meta title, descripción | `lib/seo.js` → `SEO` |
| FAQ | `lib/config.js` → `FAQ` |
| Galería (imágenes) | `lib/config.js` → `GALLERY` + agregar archivos en `public/images/party-circus/galeria/` |
| Galería (videos) | `lib/config.js` → `GALLERY_VIDEOS` + agregar archivos en `public/videos/party-circus/` |
| Links de navegación | `lib/config.js` → `NAV_LINKS` |
| Redes sociales | `lib/config.js` → `BUSINESS.social` |
| Colores de marca | `app/globals.css` → variables en `:root` |
| Precio de sábado exclusivo (+$3,000 MXN) | `components/sections/Cotizador.jsx` → constante `SATURDAY_EXCLUSIVE_FEE` (no está en `pricing.js`) |
| Nueva sección | Crear en `components/sections/`, agregar en `app/page.jsx`, agregar `id`, agregar al sitemap y a `NAV_LINKS` si aplica |

---

## 16. Checklist antes de entregar cambios

- [ ] El proyecto compila sin errores (`next build`)
- [ ] No hay imports rotos (archivos renombrados o eliminados)
- [ ] La landing se ve bien en móvil (320px–430px)
- [ ] La landing se ve bien en tablet (768px) y desktop (1024px+)
- [ ] El botón flotante de WhatsApp funciona y no queda tapado
- [ ] El modal de promoción abre y cierra correctamente
- [ ] Los CTAs de WhatsApp tienen mensajes prellenados apropiados
- [ ] El cotizador genera un mensaje correcto al ir a WhatsApp
- [ ] La navegación interna (links del Navbar) lleva a la sección correcta
- [ ] No se perdió ninguna keyword SEO local importante
- [ ] No se cambió el H1 del Hero sin evaluar impacto SEO
- [ ] No se rompió el orden de secciones de la landing
- [ ] No se duplicó lógica que ya existe en `lib/` o en componentes reutilizables
- [ ] No se modificó la identidad visual (colores, fuentes, estilos de marca)
- [ ] Los nombres de archivos nuevos son case-sensitive consistentes con el resto del proyecto
- [ ] No se introdujo TypeScript ni dependencias no aprobadas
- [ ] `'use client'` está presente en componentes con hooks de React y ausente en los que no lo necesitan

---

## 17. Datos de contacto del negocio (referencia rápida)

> Fuente: `lib/config.js`. Si cambian, editar solo ahí.

- **Nombre:** Party Circus Valle Dorado
- **Dirección:** Blvd. de las Naciones 118, planta alta, Col. Valle Dorado, Tlalnepantla, Estado de México, C.P. 54020
- **Teléfono:** 55 2718 7435
- **WhatsApp:** +52 1 55 2718 7435 (número para wa.me: `5215527187435`)
- **Email:** contacto@partycircus.com.mx
- **Web:** https://partycircus.com.mx
- **Horario:** Lunes a domingo, 9:00 a.m. – 9:00 p.m.
- **Facebook:** https://www.facebook.com/party.circusvd
- **Instagram:** https://www.instagram.com/party.circusvd/
- **TikTok:** https://www.tiktok.com/@partycircusvd
- **Google rating:** 4.1 / 5 (189 reseñas)
- **Facebook:** 84% recomendado
