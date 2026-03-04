/**
 * Marzipano UI Injector Engine
 *
 * Injects the NordImmersive UI layer into Marzipano projects:
 * - Top Bar (brand logo, slogan, unit label, autorotate/fullscreen/scenes buttons)
 * - Right Drawer (logo, title, accordion info, commodities link, footer)
 * - custom.css (full production CSS with mobile overrides)
 * - custom.js  (drawer, accordion, legacy sidebar logic)
 * - Optional commodites.html gallery page
 */

export interface ContactInfo {
  address: string
  phone: string
  email: string
}

export interface InjectorConfig {
  // Brand
  brandName: string
  brandTag: string
  unitLabel: string
  logoFileName: string

  // Contact info (shown in drawer)
  contact: ContactInfo

  // Commodities
  commoditiesEnabled: boolean
  commoditiesTitle: string
  commoditiesSubtitle: string
  commoditiesImages: { src: string; caption: string }[]

  // Footer
  footerLogoFileName: string
  footerBrand: string
  footerSlogan: string
}

export const DEFAULT_CONFIG: InjectorConfig = {
  brandName: "Serenity Towers",
  brandTag: "Visite virtuelle 3D",
  unitLabel: "Unite 4 1/2 - 215",
  logoFileName: "img/serenity.png",

  contact: {
    address: "1700 Boulevard Angrignon\nLasalle, QC H8N0J2",
    phone: "514 823-1114",
    email: "admin@mmelatti.com",
  },

  commoditiesEnabled: true,
  commoditiesTitle: "Commodites",
  commoditiesSubtitle: "Explorez les commodites de cet espace",
  commoditiesImages: [],

  footerLogoFileName: "img/NIsiglas.png",
  footerBrand: "NordImmersive",
  footerSlogan: "- Experiences immersives 3D pour l'immobilier -",
}

// ==========================================
// HTML generation: NordImmersive skin
// ==========================================

function generateSkinHTML(config: InjectorConfig): string {
  const addressLines = config.contact.address
    .split("\n")
    .map((l) => l.trim())
    .join("<br>\n              ")

  return `
  <!-- ========================= -->
  <!-- SKIN_START -->
  <!-- ========================= -->

  <!-- Title Bar -->
  <div id="titleBar">
    <div class="ni-topbar">
      <div class="ni-left">
        <div class="ni-brand">
          <img class="ni-logo" src="${config.logoFileName}" alt="${config.brandName}">
          <div class="ni-brandText">
            <div class="ni-brandName">${config.brandName}</div>
            <div class="ni-brandTag">${config.brandTag}</div>
          </div>
        </div>
      </div>

      <div class="ni-center">
        <div class="ni-unit">${config.unitLabel}</div>
        <!-- Required for Marzipano -->
        <h1 class="sceneName"></h1>
      </div>

      <div class="ni-right">
        <div class="ni-actions">
          <a href="javascript:void(0)" id="autorotateToggle" class="ni-btn" aria-label="Auto-rotation">
            <img class="icon off" src="img/play.png" alt="">
            <img class="icon on" src="img/pause.png" alt="">
          </a>

          <a href="javascript:void(0)" id="fullscreenToggle" class="ni-btn" aria-label="Plein ecran">
            <img class="icon off" src="img/fullscreen.png" alt="">
            <img class="icon on" src="img/windowed.png" alt="">
          </a>

          <a href="javascript:void(0)" id="sceneListToggle" class="ni-btn" aria-label="Liste des scenes">
            <img class="icon off" src="img/expand.png" alt="">
            <img class="icon on" src="img/collapse.png" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- View controls -->
  <a href="javascript:void(0)" id="viewUp" class="viewControlButton viewControlButton-1" aria-label="Haut"><img class="icon" src="img/up.png" alt=""></a>
  <a href="javascript:void(0)" id="viewDown" class="viewControlButton viewControlButton-2" aria-label="Bas"><img class="icon" src="img/down.png" alt=""></a>
  <a href="javascript:void(0)" id="viewLeft" class="viewControlButton viewControlButton-3" aria-label="Gauche"><img class="icon" src="img/left.png" alt=""></a>
  <a href="javascript:void(0)" id="viewRight" class="viewControlButton viewControlButton-4" aria-label="Droite"><img class="icon" src="img/right.png" alt=""></a>
  <a href="javascript:void(0)" id="viewIn" class="viewControlButton viewControlButton-5" aria-label="Zoom avant"><img class="icon" src="img/plus.png" alt=""></a>
  <a href="javascript:void(0)" id="viewOut" class="viewControlButton viewControlButton-6" aria-label="Zoom arriere"><img class="icon" src="img/minus.png" alt=""></a>

  <!-- Right Drawer -->
  <aside id="rightDrawer" class="rd" aria-hidden="true">
    <div class="rd-header">
      <img class="rd-logo" src="${config.logoFileName}" alt="${config.brandName}">
      <div class="rd-title">${config.brandName}</div>
    </div>

    <nav class="rd-nav" aria-label="Menu ${config.brandName}">
      <button class="rd-acc" type="button" data-rd-target="rdInfo">
        Information
        <span class="rd-chev" aria-hidden="true">&#9662;</span>
      </button>

      <div id="rdInfo" class="rd-panel" hidden>
        <div class="rd-contact-card">

          <div class="rd-contact-item">
            <div class="rd-contact-label">
              <span class="rd-icon">&#128205;</span>
              <strong>Adresse</strong>
            </div>
            <div class="rd-contact-value">
              ${addressLines}
            </div>
          </div>

          <div class="rd-contact-item">
            <div class="rd-contact-label">
              <span class="rd-icon">&#9742;</span>
              <strong>Telephone</strong>
            </div>
            <div class="rd-contact-value">${config.contact.phone}</div>
          </div>

          <div class="rd-contact-item">
            <div class="rd-contact-label">
              <span class="rd-icon">&#9993;</span>
              <strong>Courriel</strong>
            </div>
            <div class="rd-contact-value">${config.contact.email}</div>
          </div>

        </div>
      </div>

      ${config.commoditiesEnabled ? `<a class="rd-linkbtn" href="commodites.html">commodites</a>` : ""}
    </nav>

    <div class="rd-footer">
      <img class="rd-ni" src="${config.footerLogoFileName}" alt="${config.footerBrand}">
      <div class="rd-slogan">${config.footerBrand}</div>
      <div class="rd-slogan">${config.footerSlogan}</div>
    </div>
  </aside>

  <button id="rightDrawerBtn" class="rd-fab" type="button" aria-controls="rightDrawer" aria-expanded="false">
    Menu
  </button>

  <div id="rdOverlay" class="rd-overlay" hidden></div>

  <!-- ========================= -->
  <!-- SKIN_END -->
  <!-- ========================= -->`
}

// ==========================================
// custom.css (full NordImmersive production CSS)
// ==========================================

export function generateCustomCSS(): string {
  return `/* =========================================================
   NordImmersive visual layer (CLEAN + mobile-proof)
   ========================================================= */

/* -------------------------
   Tokens
-------------------------- */
:root{
  --tb-h: 56px;
  --tb-h-mobile: 64px;

  --safe-top: 0px;
  --safe-right: 0px;
  --safe-left: 0px;
  --safe-bottom: 0px;

  /* Right Drawer */
  --rd-w: 320px;
  --rd-pad: 16px;
  --rd-radius: 18px;
  --rd-bg: rgba(20, 24, 32, 0.70);
  --rd-border: rgba(255,255,255,0.10);
  --rd-shadow: 0 18px 60px rgba(0,0,0,0.45);
}

/* Safe areas */
@supports (padding-top: env(safe-area-inset-top)) {
  :root{
    --safe-top: env(safe-area-inset-top);
    --safe-right: env(safe-area-inset-right);
    --safe-left: env(safe-area-inset-left);
    --safe-bottom: env(safe-area-inset-bottom);
  }
}

/* Global font for our UI layer only */
#titleBar, #titleBar *{
  font-family: system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
}

/* =========================================================
   TOPBAR
   ========================================================= */

#titleBar{
  position: fixed;
  top: 0; left: 0; right: 0;

  width: 100vw;
  max-width: 100vw;
  min-width: 100vw;

  margin: 0;
  border-radius: 0;

  z-index: 999999;
  box-sizing: border-box;
  overflow: hidden;

  height: calc(var(--tb-h) + var(--safe-top));
  padding-top: var(--safe-top);

  background: rgba(20, 24, 32, 0.65);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

@supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
  #titleBar{
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}

.ni-topbar{
  height: var(--tb-h);
  width: 100%;
  box-sizing: border-box;

  padding: 10px 12px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 12px;
  align-items: center;
}

.ni-brand{
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.ni-logo{
  width: 34px;
  height: 34px;
  border-radius: 10px;
  object-fit: contain;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
}

.ni-brandText{ line-height: 1.05; }

.ni-brandName{
  font-weight: 800;
  letter-spacing: 0.4px;
  font-size: 14px;
  color: rgba(255,255,255,0.96);
}

.ni-brandTag{
  font-size: 11px;
  color: rgba(255,255,255,0.70);
}

.ni-center{
  text-align: center;
  display: grid;
  row-gap: 2px;
  justify-items: center;
  max-width: min(72vw, 520px);
  margin: 0 auto;
}

.ni-unit{
  font-weight: 800;
  letter-spacing: 0.6px;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ni-right{ justify-self: end; }

.ni-actions{
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding-right: var(--safe-right);
}

.ni-btn{
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
}

.ni-btn:hover{ background: rgba(255,255,255,0.10); }

.ni-btn .icon{ width: 18px; height: 18px; }

#autorotateToggle .icon.on,
#fullscreenToggle .icon.on,
#sceneListToggle .icon.on{ display: none; }

#autorotateToggle.enabled .icon.on,
#fullscreenToggle.enabled .icon.on,
#sceneListToggle.enabled .icon.on{ display: block; }

#autorotateToggle.enabled .icon.off,
#fullscreenToggle.enabled .icon.off,
#sceneListToggle.enabled .icon.off{ display: none; }

#titleBar .sceneName{ display: none !important; }

/* HARD OVERRIDES for Marzipano "mobile pill" */
html.mobile #titleBar,
body.mobile #titleBar,
.mobile #titleBar{
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;

  width: 100vw !important;
  max-width: 100vw !important;
  min-width: 100vw !important;

  margin: 0 !important;
  border-radius: 0 !important;

  transform: none !important;
  height: calc(var(--tb-h-mobile) + var(--safe-top)) !important;
  padding-top: var(--safe-top) !important;

  z-index: 999999 !important;
}

html.mobile .ni-topbar,
body.mobile .ni-topbar,
.mobile .ni-topbar{
  height: var(--tb-h-mobile) !important;
  padding: 12px 12px !important;
}

@media (max-width: 700px){
  .ni-topbar{
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    row-gap: 6px;
  }
  .ni-left{ grid-column: 1 / 2; grid-row: 1 / 2; }
  .ni-right{ grid-column: 2 / 3; grid-row: 1 / 2; }
  .ni-center{ grid-column: 1 / 3; grid-row: 2 / 3; }

  .ni-brandTag{ display: none; }
  .ni-unit{ max-width: 86vw; }
}

/* =========================================================
   Marzipano default view controls — MOBILE placement
   ========================================================= */
@media (max-width: 820px){
  .viewControlButton{
    z-index: 9000 !important;
    top: auto !important;
    right: calc(12px + var(--safe-right)) !important;
    bottom: calc(14px + var(--safe-bottom)) !important;
  }

  .viewControlButton-1{ bottom: calc(14px + var(--safe-bottom) + 5*52px) !important; }
  .viewControlButton-2{ bottom: calc(14px + var(--safe-bottom) + 4*52px) !important; }
  .viewControlButton-3{ bottom: calc(14px + var(--safe-bottom) + 3*52px) !important; }
  .viewControlButton-4{ bottom: calc(14px + var(--safe-bottom) + 2*52px) !important; }
  .viewControlButton-5{ bottom: calc(14px + var(--safe-bottom) + 1*52px) !important; }
  .viewControlButton-6{ bottom: calc(14px + var(--safe-bottom) + 0*52px) !important; }

  .viewControlButton{
    width: 44px !important;
    height: 44px !important;
    border-radius: 14px !important;
  }
}

/* =========================================================
   Right Drawer
   ========================================================= */

.rd{
  position: fixed;
  top: calc(var(--tb-h) + var(--safe-top));
  right: 12px;
  height: calc(100dvh - (var(--tb-h) + var(--safe-top)) - 12px);
  width: var(--rd-w);
  z-index: 9998;

  background: var(--rd-bg);
  border: 1px solid var(--rd-border);
  border-radius: var(--rd-radius);
  box-shadow: var(--rd-shadow);

  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);

  display: flex;
  flex-direction: column;
  overflow: hidden;

  transform: translateX(calc(var(--rd-w) + 24px));
  transition: transform 220ms ease;
}

.rd.is-open{ transform: translateX(0); }

.rd-header{
  padding: 22px var(--rd-pad) 14px;
  display: grid;
  place-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.rd-logo{
  width: 92px;
  height: 92px;
  object-fit: contain;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  padding: 12px;
}

.rd-title{
  color: rgba(255,255,255,0.92);
  font-size: 15px;
  letter-spacing: 0.3px;
  font-weight: 700;
}

.rd-nav{
  padding: 14px var(--rd-pad);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.rd-acc,
.rd-linkbtn{
  width: 100%;
  min-height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.90);
  font-size: 14px;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content: space-between;
  padding: 0 14px;
  text-decoration: none;
}

.rd-acc:hover,
.rd-linkbtn:hover{ background: rgba(255,255,255,0.12); }

.rd-panel{
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.18);
  padding: 12px 12px;
}

.rd-chev{ opacity: 0.85; }

.rd-footer{
  padding: 16px var(--rd-pad) 18px;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: grid;
  gap: 12px;
  place-items: center;
}

.rd-ni{
  width: 170px;
  height: 40px;
  object-fit: contain;
  opacity: 0.92;
}

.rd-slogan{
  text-align:center;
  color: rgba(255,255,255,0.72);
  font-size: 12px;
  line-height: 1.2;
  max-width: 240px;
}

.rd-fab{
  position: fixed;
  right: 14px;
  bottom: calc(14px + var(--safe-bottom));
  z-index: 9999;

  height: 44px;
  padding: 0 14px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(20, 24, 32, 0.70);
  color: rgba(255,255,255,0.92);
  cursor: pointer;

  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 40px rgba(0,0,0,0.45);
}

.rd-fab:hover{ background: rgba(20, 24, 32, 0.78); }

.rd-overlay{
  position: fixed;
  inset: 0;
  z-index: 9997;
  background: rgba(0,0,0,0.35);
}

@media (max-width: 560px){
  :root{ --rd-w: 92vw; }
  .rd{
    right: 10px;
    top: calc(var(--tb-h-mobile) + var(--safe-top));
    height: calc(100dvh - (var(--tb-h-mobile) + var(--safe-top)) - 12px);
  }
}

/* Contact card */
.rd-contact-card{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rd-contact-item{
  text-align: center;
  padding: 14px 10px;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.rd-contact-label{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 6px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.3px;
  font-size: 14px;
}

.rd-icon{ font-size: 15px; opacity: 0.85; }

.rd-contact-value{
  color: rgba(255,255,255,0.78);
  font-size: 13px;
  line-height: 1.4;
}

/* =========================================================
   Commodites page
   ========================================================= */

.commodites-page{
  margin: 0;
  background:
    radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,0.06), transparent 60%),
    radial-gradient(900px 500px at 90% 30%, rgba(255,255,255,0.05), transparent 55%),
    #0b0f16;
  color: rgba(255,255,255,0.88);
  min-height: 100dvh;
  overflow-x: hidden;
}

.commodites-page{
  --page-pad: 16px;
  --glass-bg-2: rgba(20, 24, 32, 0.55);
  --glass-border-2: rgba(255,255,255,0.10);
  --glass-shadow-2: 0 18px 60px rgba(0,0,0,0.45);
  --thumb-h: 96px;
}

.c-wrap{
  padding-top: calc(var(--tb-h) + var(--safe-top) + 12px);
  padding-left: var(--page-pad);
  padding-right: var(--page-pad);
  padding-bottom: 14px;
  min-height: 100dvh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

@media (max-width: 560px){
  .c-wrap{
    padding-top: calc(var(--tb-h-mobile) + var(--safe-top) + 10px);
    padding-left: 12px;
    padding-right: 12px;
  }
}

.c-stage{
  flex: 1;
  border-radius: 18px;
  background: var(--glass-bg-2);
  border: 1px solid var(--glass-border-2);
  box-shadow: var(--glass-shadow-2);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media (max-width: 560px){
  .c-stage{ border-radius: 16px; }
}

.c-head{
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

@media (max-width: 560px){
  .c-head{ padding: 12px 12px 10px; }
}

.c-sub{
  margin: 2px 0 0;
  font-size: 12.5px;
  color: rgba(255,255,255,0.70);
  line-height: 1.2;
}

.c-back{
  min-height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.92);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.c-back:hover{ background: rgba(255,255,255,0.12); }

.c-main{
  flex: 1;
  display: grid;
  place-items: center;
  padding: 14px;
}

@media (max-width: 560px){
  .c-main{ padding: 12px; }
}

.c-figure{
  width: min(1100px, 100%);
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.25);
  box-shadow: 0 12px 50px rgba(0,0,0,0.35);
  position: relative;
  display: grid;
  place-items: center;
}

@media (max-width: 560px){
  .c-figure{
    aspect-ratio: 4 / 3;
    border-radius: 16px;
  }
}

.c-figure img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 120ms ease;
}

.c-arrow{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.28);
  color: rgba(255,255,255,0.92);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 26px;
  line-height: 1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 50;
}

@media (max-width: 560px){
  .c-arrow{
    width: 52px;
    height: 52px;
    border-radius: 16px;
    font-size: 28px;
  }
}

.c-arrow-left{ left: 12px; }
.c-arrow-right{ right: 12px; }
.c-arrow:hover{ background: rgba(0,0,0,0.38); }

.c-thumbs{
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 10px 10px 12px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.c-thumb{
  flex: 0 0 auto;
  width: 150px;
  height: var(--thumb-h);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  cursor: pointer;
  position: relative;
  scroll-snap-align: start;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

@media (max-width: 560px){
  .commodites-page{ --thumb-h: 88px; }
  .c-thumb{ width: 132px; height: 84px; }
}

.c-thumb:hover{
  transform: translateY(-1px);
  border-color: rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.08);
}

.c-thumb img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
}

.c-thumb.is-active{
  border-color: rgba(255,255,255,0.28);
  box-shadow: 0 10px 28px rgba(0,0,0,0.35);
}

.c-cap{
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  font-size: 11.5px;
  color: rgba(255,255,255,0.92);
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 6px 8px;
  line-height: 1.1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

@media (hover: none){
  .c-thumb:hover,
  .c-back:hover,
  .ni-btn:hover,
  .rd-fab:hover{
    transform: none;
    background: rgba(255,255,255,0.08);
  }
}

@media (prefers-reduced-motion: reduce){
  *{ transition: none !important; scroll-behavior: auto !important; }
}

/* =========================================================
   Commodites Topbar overrides
   ========================================================= */

.commodites-page #titleBar{
  position: fixed !important;
  top: 0 !important; left: 0 !important; right: 0 !important;
  width: 100vw !important;
  border-radius: 0 !important;
  margin: 0 !important;
  z-index: 999999 !important;

  height: calc(var(--tb-h) + var(--safe-top)) !important;
  padding-top: var(--safe-top) !important;
  box-sizing: border-box !important;
}

@media (max-width: 700px){
  .commodites-page #titleBar{
    height: calc(var(--tb-h-mobile) + var(--safe-top)) !important;
  }
}

.commodites-page .ct-bar{
  height: var(--tb-h);
  width: 100%;
  padding: 0 12px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  box-sizing: border-box;
}

@media (max-width: 700px){
  .commodites-page .ct-bar{ height: var(--tb-h-mobile); }
}

.commodites-page .ct-center{
  position: static !important;
  transform: none !important;
  display: grid;
  gap: 4px;
  justify-items: center;
  text-align: center;
  pointer-events: none;
  max-width: min(76vw, 520px);
  margin: 0 auto;
}

.commodites-page .ct-brand{
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.commodites-page .ct-brandName{
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.3px;
  line-height: 1.1;
  color: rgba(255,255,255,0.95);
}

.commodites-page .ct-logo-inline{
  width: 28px;
  height: 28px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
}

.commodites-page .ct-amenity{
  font-weight: 700;
  font-size: 12.5px;
  color: rgba(255,255,255,0.80);
  line-height: 1.1;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.commodites-page .ct-backTop{
  justify-self: end;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.92);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  pointer-events: auto;
}

.commodites-page .c-wrap{
  padding-top: calc(var(--tb-h) + var(--safe-top) + 12px) !important;
}

@media (max-width: 700px){
  .commodites-page .c-wrap{
    padding-top: calc(var(--tb-h-mobile) + var(--safe-top) + 10px) !important;
  }
  .commodites-page .ct-brandName{ display: none; }
}
`
}

// ==========================================
// custom.js (full NordImmersive production JS)
// ==========================================

export function generateCustomJS(): string {
  return `/* custom.js — UI only (SAFE)
   - No toca index.js ni data.js
   - Solo controla UI: sidebar legacy (si existe) + right drawer + accordion
*/
(() => {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const byId = (id) => document.getElementById(id);

  // ============================
  // 1) Legacy sidebar (optional)
  // ============================
  function initLegacySidebar() {
    const container = byId("side-panel-container");
    const icon = byId("toggle-icon");
    const companyBox = byId("company-info");

    if (container && icon) {
      window.toggleSidebar = function toggleSidebar() {
        const collapsed = container.classList.toggle("is-collapsed");
        icon.textContent = collapsed ? "\\u276E" : "\\u276F";
      };
    }

    if (companyBox) {
      window.toggleCompanyInfo = function toggleCompanyInfo() {
        companyBox.classList.toggle("is-open");
      };
    }
  }

  // ============================
  // 2) Right Drawer
  // ============================
  function initRightDrawer() {
    const drawer = byId("rightDrawer");
    const btn = byId("rightDrawerBtn");
    const overlay = byId("rdOverlay");

    if (!drawer || !btn) return;

    const OPEN_CLASS = "is-open";

    function setScrollLocked(locked) {
      document.documentElement.style.overflow = locked ? "hidden" : "";
      document.body.style.overflow = locked ? "hidden" : "";
      document.body.style.touchAction = locked ? "none" : "";
    }

    function openDrawer() {
      drawer.classList.add(OPEN_CLASS);
      drawer.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      if (overlay) overlay.hidden = false;
      setScrollLocked(true);
    }

    function closeDrawer() {
      drawer.classList.remove(OPEN_CLASS);
      drawer.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      if (overlay) overlay.hidden = true;
      setScrollLocked(false);
    }

    function toggleDrawer() {
      drawer.classList.contains(OPEN_CLASS) ? closeDrawer() : openDrawer();
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDrawer();
    });

    if (overlay) overlay.addEventListener("click", closeDrawer);

    document.addEventListener("click", (e) => {
      if (!drawer.classList.contains(OPEN_CLASS)) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const clickedInside = drawer.contains(target) || btn.contains(target);
      if (!clickedInside) closeDrawer();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains(OPEN_CLASS)) closeDrawer();
    });

    // Accordion: Information
    const accBtn = qs(".rd-acc[data-rd-target]");
    if (accBtn) {
      const panelId = accBtn.getAttribute("data-rd-target");
      const panel = panelId ? byId(panelId) : null;

      if (panel) {
        accBtn.setAttribute("aria-controls", panel.id);
        accBtn.setAttribute("aria-expanded", panel.hasAttribute("hidden") ? "false" : "true");

        accBtn.addEventListener("click", () => {
          const willOpen = panel.hasAttribute("hidden");
          if (willOpen) panel.removeAttribute("hidden");
          else panel.setAttribute("hidden", "");
          accBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        });
      }
    }

    closeDrawer();
  }

  // ============================
  // 3) Small safe text overrides
  // ============================
  function initSafeText() {
    const unit = qs(".ni-unit");
    if (unit) unit.textContent = unit.textContent;
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    initLegacySidebar();
    initRightDrawer();
    initSafeText();
  });
})();`
}

// ==========================================
// Commodites gallery page
// ==========================================

export function generateCommoditiesPage(config: InjectorConfig): string {
  const thumbs = config.commoditiesImages
    .map(
      (img, i) =>
        `        <div class="c-thumb${i === 0 ? " is-active" : ""}" onclick="goTo(${i})">
          <img src="${img.src}" alt="${img.caption}">
          <div class="c-cap">${img.caption}</div>
        </div>`
    )
    .join("\n")

  const firstImage = config.commoditiesImages.length > 0 ? config.commoditiesImages[0].src : ""

  return `<!DOCTYPE html>
<html lang="fr-CA">
<head>
  <meta charset="utf-8">
  <title>${config.commoditiesTitle} - ${config.brandName}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="stylesheet" href="custom.css">
</head>
<body class="commodites-page">

  <!-- Commodites Topbar -->
  <div id="titleBar">
    <div class="ct-bar">
      <div></div>
      <div class="ct-center">
        <div class="ct-brand">
          <img class="ct-logo-inline" src="${config.logoFileName}" alt="${config.brandName}">
          <span class="ct-brandName">${config.brandName}</span>
        </div>
        <div class="ct-amenity" id="amenityTitle">${config.commoditiesTitle}</div>
      </div>
      <a class="ct-backTop" href="index.html">&#8592; Retour</a>
    </div>
  </div>

  <div class="c-wrap">
    <div class="c-stage">
      <div class="c-head">
        <div>
          <strong>${config.commoditiesTitle}</strong>
          <p class="c-sub">${config.commoditiesSubtitle}</p>
        </div>
        <a class="c-back" href="index.html">&#8592; Retour au tour</a>
      </div>

      <div class="c-main">
        <div class="c-figure">
          <img id="mainImg" src="${firstImage}" alt="">
          <button class="c-arrow c-arrow-left" onclick="prev()">&#8249;</button>
          <button class="c-arrow c-arrow-right" onclick="next()">&#8250;</button>
        </div>
      </div>

      <div class="c-thumbs" id="thumbStrip">
${thumbs}
      </div>
    </div>
  </div>

  <script>
    var images = ${JSON.stringify(config.commoditiesImages)};
    var idx = 0;

    function goTo(i) {
      idx = i;
      document.getElementById("mainImg").src = images[i].src;
      document.getElementById("amenityTitle").textContent = images[i].caption;
      document.querySelectorAll(".c-thumb").forEach(function(t, j) {
        t.classList.toggle("is-active", j === i);
      });
    }

    function next() { goTo((idx + 1) % images.length); }
    function prev() { goTo((idx - 1 + images.length) % images.length); }
  </script>
</body>
</html>`
}

// ==========================================
// Injection logic
// ==========================================

/**
 * Remove existing SKIN (between SKIN_START and SKIN_END markers),
 * remove existing custom.css/custom.js references,
 * then inject the new skin HTML + link tags.
 */
export function injectIntoHTML(
  html: string,
  config: InjectorConfig
): string {
  let result = html

  // 1. Remove existing SKIN block if present
  const skinRegex = /<!-- SKIN_START -->[\s\S]*?<!-- SKIN_END -->/i
  result = result.replace(skinRegex, "")

  // 2. Remove existing custom.css link if present
  result = result.replace(/<link[^>]*href=["']custom\.css[^"']*["'][^>]*>/gi, "")

  // 3. Remove existing custom.js script if present
  result = result.replace(/<script[^>]*src=["']custom\.js[^"']*["'][^>]*><\/script>/gi, "")

  // 4. Inject custom.css link before </head>
  const cssLink = `  <link rel="stylesheet" href="custom.css">`
  result = result.replace("</head>", `${cssLink}\n</head>`)

  // 5. Inject skin HTML after <body> (or <body ...>)
  const skinHTML = generateSkinHTML(config)
  const bodyRegex = /(<body[^>]*>)/i
  result = result.replace(bodyRegex, `$1\n${skinHTML}`)

  // 6. Inject custom.js before </body>
  const jsTag = `  <script src="custom.js" defer></script>`
  result = result.replace("</body>", `${jsTag}\n</body>`)

  return result
}

/**
 * Generate the standalone CSS file content (same as custom.css)
 */
export function generateStandaloneCSS(): string {
  return generateCustomCSS()
}

/**
 * Generate a standalone injector script for manual copy-paste
 */
export function generateInjectorScript(config: InjectorConfig): string {
  return `// === Marzipano UI Injector ===
// Files to add to your Marzipano project:
// 1. custom.css  — paste it in the same folder as index.html
// 2. custom.js   — paste it in the same folder as index.html
// 3. Replace your index.html <body> content with the injected HTML
//
// Configuration used:
${JSON.stringify(config, null, 2)}
`
}
