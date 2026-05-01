# Party Circus Valle Dorado — Landing

Landing page para **Party Circus Valle Dorado**, salón de fiestas infantiles y eventos sociales en Valle Dorado, Tlalnepantla.

## Stack
- Next.js 15 (App Router)
- React 18 (JSX, sin TypeScript en componentes)
- Tailwind CSS 3
- Lucide React (iconos)

## Scripts
```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
```

## Estructura
```
salones-eventos-infantiles/
├── app/
│   ├── layout.jsx       # Metadatos, fuentes, JSON-LD
│   ├── page.jsx         # Composición de secciones
│   └── globals.css      # Variables de color + utilidades
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── WhatsAppButton.jsx
│   ├── Modal.jsx
│   ├── PrivacyModal.jsx
│   ├── JobsModal.jsx
│   └── sections/
│       ├── Hero.jsx
│       ├── Paquetes.jsx
│       ├── Cotizador.jsx
│       ├── Graduaciones.jsx
│       ├── Nosotros.jsx
│       ├── Galeria.jsx
│       ├── Ubicacion.jsx
│       └── FAQ.jsx
├── lib/
│   ├── config.js        # Datos del negocio (editable)
│   ├── pricing.js       # Tabla de precios del cotizador
│   ├── whatsapp.js      # Helper de WhatsApp
│   └── utils.js
└── public/
    ├── images/party-circus/{logo,hero,paquetes,eventos,galeria,nosotros,ubicacion,seo}/
    └── videos/party-circus/
```

## Personalización rápida
- **Datos del negocio:** `lib/config.js`
- **Precios del cotizador:** `lib/pricing.js`
- **Paleta de colores:** variables `--color-*` en `app/globals.css`
- **Imágenes:** colocar archivos en `public/images/party-circus/...` con los nombres declarados en `lib/config.js`

## Assets requeridos
Coloca los archivos con los nombres exactos que ya están referenciados:

```
public/images/party-circus/
├── logo/party-circus-logo-valle-dorado.png
├── logo/party-circus-logo-circular.png
├── hero/salon-fiestas-infantiles-valle-dorado-hero.webp
├── paquetes/paquete-{salon,party,circus}-party-circus.webp
├── eventos/{graduaciones-...,bautizo-...,confirmacion-...,evento-social-...}.webp
├── nosotros/{equipo-,atencion-,ambiente-familiar-}*.webp
├── galeria/party-circus-galeria-{01..12}.webp
├── ubicacion/{fachada-,acceso-,interior-entrada-}*.webp
└── seo/{og,twitter}-party-circus-valle-dorado.jpg
```

## Notas
- Los formularios (Cotizador, Trabaja con nosotros) **no** guardan datos: arman un mensaje y abren WhatsApp.
- El Aviso de privacidad es un modal interno, redactado para México, listo para añadir razón social cuando esté disponible.
- Fechas en el cotizador son **deseadas**: la disponibilidad se confirma por WhatsApp.
