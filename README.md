# Aprende a tejer desde cero 🧶

App web para aprender punto a dos agujas, agujas circulares y ganchillo,
con un generador de patrones de ganchillo fiable a la tensión real de quien teje.

## Desarrollo

```bash
npm install
npm run dev
```

## Despliegue

Cada push a `main` construye la app y la publica en GitHub Pages mediante
`.github/workflows/deploy.yml`. La primera vez hay que activar, en el repo,
**Settings → Pages → Source → GitHub Actions**.

URL de producción: https://laaaau15.github.io/aprende-a-tejer/

## Notas de diseño

- Los colores de botones se ajustaron para cumplir el contraste mínimo AA (4.5:1).
- Las fuentes (Fraunces y Nunito) se autoalojan vía `@fontsource` en vez de cargarse desde Google Fonts.
- Es una PWA instalable (manifest + service worker con `vite-plugin-pwa`).
- El generador de patrones de ganchillo (`/ganchillo/crear`) ofrece dos modos:
  muestra real (100% fiable a tu tensión) y estimación por grosor de hilo (aproximada,
  siempre con aviso).
