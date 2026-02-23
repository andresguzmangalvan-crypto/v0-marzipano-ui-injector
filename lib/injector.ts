/**
 * Marzipano UI Injector Engine
 *
 * Reads a Marzipano index.html and injects custom UI layers:
 * - Top Bar (logo, label, navigation menu)
 * - Sidebar (info panel, commodities link)
 * - Commodities sub-page (commodities.html)
 */

export interface InjectorConfig {
  logoUrl: string
  logoText: string
  slogan: string
  label: string
  primaryColor: string
  sidebarInfoTitle: string
  sidebarInfoText: string
  commoditiesEnabled: boolean
  commoditiesImages: string[]
}

export const DEFAULT_CONFIG: InjectorConfig = {
  logoUrl: "",
  logoText: "My Tour",
  slogan: "Virtual Experience",
  label: "360\u00b0 Tour",
  primaryColor: "#3ecf8e",
  sidebarInfoTitle: "About This Space",
  sidebarInfoText: "Explore this immersive virtual tour. Navigate using your mouse or touch controls.",
  commoditiesEnabled: true,
  commoditiesImages: [],
}

function generateCSS(config: InjectorConfig): string {
  return `
/* === Marzipano UI Injector — Injected Styles === */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --mz-injector-primary: ${config.primaryColor};
  --mz-injector-bg: rgba(10, 10, 15, 0.92);
  --mz-injector-text: #f0f0f5;
  --mz-injector-text-muted: #9ca3af;
  --mz-injector-border: rgba(255, 255, 255, 0.08);
  --mz-injector-font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Top Bar */
.mz-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: var(--mz-injector-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--mz-injector-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 10000;
  font-family: var(--mz-injector-font);
}

.mz-topbar__logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mz-topbar__logo img {
  height: 28px;
  width: auto;
  border-radius: 4px;
}

.mz-topbar__logo-text {
  font-weight: 700;
  font-size: 16px;
  color: var(--mz-injector-text);
  letter-spacing: -0.02em;
}

.mz-topbar__logo-slogan {
  font-weight: 400;
  font-size: 12px;
  color: var(--mz-injector-text-muted);
  margin-left: 4px;
}

.mz-topbar__label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  font-size: 14px;
  color: var(--mz-injector-text);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mz-topbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mz-topbar__btn {
  background: none;
  border: 1px solid var(--mz-injector-border);
  color: var(--mz-injector-text);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--mz-injector-font);
  transition: all 0.2s ease;
}

.mz-topbar__btn:hover {
  background: var(--mz-injector-primary);
  color: #0a0a0f;
  border-color: var(--mz-injector-primary);
}

.mz-topbar__btn--info {
  background: transparent;
}

/* Sidebar Overlay */
.mz-sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mz-sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Sidebar */
.mz-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 360px;
  max-width: 90vw;
  background: var(--mz-injector-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid var(--mz-injector-border);
  z-index: 10002;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--mz-injector-font);
  display: flex;
  flex-direction: column;
}

.mz-sidebar.active {
  transform: translateX(0);
}

.mz-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--mz-injector-border);
}

.mz-sidebar__title {
  font-weight: 700;
  font-size: 18px;
  color: var(--mz-injector-text);
}

.mz-sidebar__close {
  background: none;
  border: none;
  color: var(--mz-injector-text-muted);
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;
}

.mz-sidebar__close:hover {
  color: var(--mz-injector-text);
}

.mz-sidebar__body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.mz-sidebar__section {
  margin-bottom: 24px;
}

.mz-sidebar__section h3 {
  font-weight: 600;
  font-size: 14px;
  color: var(--mz-injector-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.mz-sidebar__section p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--mz-injector-text-muted);
}

.mz-sidebar__commodities-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--mz-injector-border);
  border-radius: 8px;
  color: var(--mz-injector-text);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mz-sidebar__commodities-link:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--mz-injector-primary);
}

.mz-sidebar__commodities-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--mz-injector-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0f;
  font-size: 16px;
  flex-shrink: 0;
}

/* Adjust Marzipano container for the topbar */
#pano {
  top: 56px !important;
  height: calc(100vh - 56px) !important;
}

/* Responsive */
@media (max-width: 640px) {
  .mz-topbar {
    padding: 0 16px;
    height: 48px;
  }

  .mz-topbar__label {
    display: none;
  }

  .mz-topbar__logo-slogan {
    display: none;
  }

  #pano {
    top: 48px !important;
    height: calc(100vh - 48px) !important;
  }

  .mz-sidebar {
    width: 100%;
    max-width: 100%;
  }
}
`
}

function generateTopBarHTML(config: InjectorConfig): string {
  const logoImg = config.logoUrl
    ? `<img src="${config.logoUrl}" alt="Logo" />`
    : ""

  return `
<!-- Marzipano UI Injector — Top Bar -->
<div class="mz-topbar" id="mzTopBar">
  <div class="mz-topbar__logo">
    ${logoImg}
    <span class="mz-topbar__logo-text">${config.logoText}</span>
    <span class="mz-topbar__logo-slogan">${config.slogan}</span>
  </div>
  <div class="mz-topbar__label">${config.label}</div>
  <div class="mz-topbar__actions">
    ${config.commoditiesEnabled ? '<button class="mz-topbar__btn" onclick="window.location.href=\'commodities.html\'">Gallery</button>' : ""}
    <button class="mz-topbar__btn mz-topbar__btn--info" onclick="document.getElementById('mzSidebar').classList.add('active');document.getElementById('mzSidebarOverlay').classList.add('active');">Info</button>
  </div>
</div>
`
}

function generateSidebarHTML(config: InjectorConfig): string {
  return `
<!-- Marzipano UI Injector — Sidebar -->
<div class="mz-sidebar-overlay" id="mzSidebarOverlay" onclick="document.getElementById('mzSidebar').classList.remove('active');this.classList.remove('active');"></div>
<div class="mz-sidebar" id="mzSidebar">
  <div class="mz-sidebar__header">
    <span class="mz-sidebar__title">Information</span>
    <button class="mz-sidebar__close" onclick="document.getElementById('mzSidebar').classList.remove('active');document.getElementById('mzSidebarOverlay').classList.remove('active');">&times;</button>
  </div>
  <div class="mz-sidebar__body">
    <div class="mz-sidebar__section">
      <h3>${config.sidebarInfoTitle}</h3>
      <p>${config.sidebarInfoText}</p>
    </div>
    ${
      config.commoditiesEnabled
        ? `<a href="commodities.html" class="mz-sidebar__commodities-link">
      <span class="mz-sidebar__commodities-icon">&#9881;</span>
      <span>View Commodities &amp; Gallery</span>
    </a>`
        : ""
    }
  </div>
</div>
`
}

function generateCommoditiesHTML(config: InjectorConfig): string {
  const imageCards = config.commoditiesImages
    .map(
      (src, i) =>
        `<div class="comm-gallery__item" onclick="openLightbox(${i})">
        <img src="${src}" alt="Gallery ${i + 1}" loading="lazy" />
      </div>`
    )
    .join("\n      ")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Commodities — ${config.logoText}</title>
  <link rel="stylesheet" href="injected-styles.css" />
  <style>
    body {
      margin: 0;
      background: #0a0a0f;
      color: #f0f0f5;
      font-family: 'Inter', -apple-system, sans-serif;
    }

    .comm-content {
      padding: 80px 24px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .comm-content h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .comm-content p {
      color: #9ca3af;
      font-size: 15px;
      margin-bottom: 32px;
    }

    .comm-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }

    .comm-gallery__item {
      aspect-ratio: 4/3;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.06);
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s;
    }

    .comm-gallery__item:hover {
      transform: scale(1.02);
      border-color: ${config.primaryColor};
    }

    .comm-gallery__item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .comm-lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 20000;
      cursor: pointer;
    }

    .comm-lightbox.active {
      display: flex;
    }

    .comm-lightbox img {
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
    }

    .comm-back {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #f0f0f5;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      margin-bottom: 24px;
      transition: all 0.2s;
    }

    .comm-back:hover {
      background: ${config.primaryColor};
      color: #0a0a0f;
      border-color: ${config.primaryColor};
    }
  </style>
</head>
<body>
  ${generateTopBarHTML(config).replace("onclick=\"window.location.href='commodities.html'\"", "onclick=\"window.location.href='index.html'\"")}
  <div class="comm-content">
    <a href="index.html" class="comm-back">&larr; Back to Tour</a>
    <h1>Commodities &amp; Gallery</h1>
    <p>Explore the amenities and features of this space.</p>
    <div class="comm-gallery">
      ${imageCards || '<p style="color:#6b7280;">No images configured yet.</p>'}
    </div>
  </div>

  <div class="comm-lightbox" id="commLightbox" onclick="this.classList.remove('active')">
    <img id="commLightboxImg" src="" alt="Lightbox" />
  </div>

  <script>
    var galleryImages = ${JSON.stringify(config.commoditiesImages)};
    function openLightbox(index) {
      var lb = document.getElementById('commLightbox');
      var img = document.getElementById('commLightboxImg');
      img.src = galleryImages[index];
      lb.classList.add('active');
    }
  </script>
</body>
</html>`
}

/**
 * Inject UI into a Marzipano index.html string
 */
export function injectIntoHTML(
  html: string,
  config: InjectorConfig
): string {
  const css = generateCSS(config)
  const topBar = generateTopBarHTML(config)
  const sidebar = generateSidebarHTML(config)

  // Inject CSS before </head>
  const styleTag = `<style id="mz-injector-styles">${css}</style>`
  let result = html.replace("</head>", `${styleTag}\n</head>`)

  // Inject HTML after <body> (or <body ...>)
  const bodyRegex = /(<body[^>]*>)/i
  result = result.replace(bodyRegex, `$1\n${topBar}\n${sidebar}`)

  return result
}

/**
 * Generate the standalone CSS file content
 */
export function generateStandaloneCSS(config: InjectorConfig): string {
  return generateCSS(config)
}

/**
 * Generate the commodities HTML page
 */
export function generateCommoditiesPage(config: InjectorConfig): string {
  return generateCommoditiesHTML(config)
}

/**
 * Generate the manual injector.js script for Phase 2 testing
 */
export function generateInjectorScript(config: InjectorConfig): string {
  return `// === Marzipano UI Injector — injector.js ===
// Paste this script at the bottom of your Marzipano index.html, before </body>
// Or include it as: <script src="injector.js"><\/script>

(function() {
  'use strict';

  var config = ${JSON.stringify(config, null, 2)};

  // Create the Top Bar
  var topBar = document.createElement('div');
  topBar.innerHTML = \`${generateTopBarHTML(config).replace(/`/g, "\\`")}\`;
  document.body.insertBefore(topBar.firstElementChild, document.body.firstChild);

  // Create the Sidebar + Overlay
  var sidebarWrap = document.createElement('div');
  sidebarWrap.innerHTML = \`${generateSidebarHTML(config).replace(/`/g, "\\`")}\`;
  while (sidebarWrap.firstChild) {
    document.body.appendChild(sidebarWrap.firstChild);
  }

  console.log('[Marzipano UI Injector] UI injected successfully.');
})();
`
}
