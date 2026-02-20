export const ROYAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap');

/* ══════════════════════════════════════════════
   RESET
══════════════════════════════════════════════ */
*{cursor:none;box-sizing:border-box;margin:0;padding:0}
img,video{display:block;max-width:100%}
ul{list-style:none}

/* ══════════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════════ */
:root{--gold:#BFA06A;--gold-l:#E2C98A;--gold-d:#7A5C2A}

.dk{
  --bg:#07070A;--bg2:#0D0D11;--bg3:#131318;
  --fg:#F2EDE3;--fg2:rgba(242,237,227,.52);--fg3:rgba(242,237,227,.17);
  --brd:rgba(191,160,106,.1);--cbg:rgba(255,255,255,.013);--cg:#BFA06A;
}
.lk{
  --bg:#F3EFE8;--bg2:#EAE5DC;--bg3:#DDD7CC;
  --fg:#17120A;--fg2:rgba(23,18,10,.52);--fg3:rgba(23,18,10,.18);
  --brd:rgba(191,160,106,.2);--cbg:rgba(255,255,255,.55);--cg:#7A5C2A;
}

/* ══════════════════════════════════════════════
   BASE
══════════════════════════════════════════════ */
body{
  background:var(--bg);color:var(--fg);
  font-family:'DM Sans',sans-serif;font-weight:300;
  transition:background .5s,color .5s;
  overflow-x:hidden;-webkit-font-smoothing:antialiased;
}
.dp{font-family:'Playfair Display',serif}
.gg{
  background:linear-gradient(135deg,#BFA06A 0%,#E2C98A 42%,#BFA06A 72%,#7A5C2A 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.glass{
  background:var(--cbg);backdrop-filter:blur(22px) saturate(1.4);border:1px solid var(--brd);
}

/* ══════════════════════════════════════════════
   NOISE OVERLAY
══════════════════════════════════════════════ */
.noise-ov{
  position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.018;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ══════════════════════════════════════════════
   BUTTONS
══════════════════════════════════════════════ */
.bg-btn{
  background:linear-gradient(120deg,#BFA06A,#E2C98A,#BFA06A);
  background-size:200% auto;color:#07060A;
  font-family:'DM Sans',sans-serif;font-weight:500;
  letter-spacing:.13em;text-transform:uppercase;font-size:.69rem;
  border:none;transition:background-position .6s,box-shadow .35s;
  white-space:nowrap;
}
.bg-btn:hover{background-position:right center;box-shadow:0 14px 50px rgba(191,160,106,.42)}

.bo-btn{
  border:1px solid var(--brd);color:var(--cg);
  font-family:'DM Sans',sans-serif;font-weight:500;
  letter-spacing:.13em;text-transform:uppercase;font-size:.69rem;
  background:none;position:relative;overflow:hidden;transition:border-color .4s;
  white-space:nowrap;
}
.bo-btn::after{
  content:'';position:absolute;inset:0;
  background:rgba(191,160,106,.07);transform:translateX(-101%);transition:transform .42s;
}
.bo-btn:hover::after{transform:translateX(0)}
.bo-btn:hover{border-color:rgba(191,160,106,.42)}

/* ══════════════════════════════════════════════
   NAV LINKS
══════════════════════════════════════════════ */
.na{
  font-family:'DM Sans',sans-serif;font-size:.63rem;letter-spacing:.22em;
  text-transform:uppercase;color:var(--fg2);transition:color .3s;
  position:relative;text-decoration:none;
}
.na::after{
  content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;
  background:var(--cg);transition:width .34s;
}
.na:hover{color:var(--cg)}.na:hover::after{width:100%}
.na-active{color:var(--cg)!important}
.na-active::after{width:100%!important}

/* ══════════════════════════════════════════════
   FORM INPUTS
══════════════════════════════════════════════ */
.royal-input{
  width:100%;padding:14px 18px;
  background:var(--cbg);border:1px solid var(--brd);color:var(--fg);
  font-family:'DM Sans',sans-serif;font-size:.87rem;font-weight:300;
  transition:border-color .3s,box-shadow .3s;outline:none;
  backdrop-filter:blur(10px);border-radius:3px;
}
.royal-input::placeholder{color:var(--fg3)}
.royal-input:focus{border-color:rgba(191,160,106,.5);box-shadow:0 0 0 3px rgba(191,160,106,.06)}
.royal-label{
  font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;
  color:var(--fg3);margin-bottom:8px;display:block;
}

/* ══════════════════════════════════════════════
   LAYOUT HELPERS
══════════════════════════════════════════════ */
.page-wrap{background:var(--bg);overflow-x:hidden;min-height:100vh}
.container{max-width:1600px;margin:0 auto;padding:0 clamp(20px,4vw,60px)}
.section{padding:clamp(56px,8vw,100px) clamp(20px,4vw,60px)}
.lo{overflow:hidden}

/* ══════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════ */
.prog{position:fixed;top:0;left:0;right:0;height:2px;background:var(--bg3);z-index:1000}

/* ══════════════════════════════════════════════
   UTILITY
══════════════════════════════════════════════ */
.gl{height:1px;background:linear-gradient(90deg,transparent,#BFA06A,transparent)}
.gold-ln{display:block;height:1px;background:linear-gradient(90deg,transparent,#BFA06A,transparent)}

/* ══════════════════════════════════════════════
   GALLERY
══════════════════════════════════════════════ */
.gal-t{will-change:transform;display:flex;align-items:center}
.iz img{transition:transform .65s cubic-bezier(.23,1,.32,1)}
.iz:hover img{transform:scale(1.06)}

/* ══════════════════════════════════════════════
   FEATURE CARD SHIMMER
══════════════════════════════════════════════ */
.fc{position:relative;overflow:hidden}
.fc::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 20%,rgba(191,160,106,.055) 50%,transparent 80%);
  background-size:200% auto;opacity:0;transition:opacity .3s;
}
.fc:hover::before{opacity:1;animation:shimmer 1.9s linear infinite}

/* ══════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════ */
.mq{display:flex;width:max-content}

/* ══════════════════════════════════════════════
   EXTRA CARDS (features page)
══════════════════════════════════════════════ */
.extra-card{background:var(--bg);transition:border-color .4s,background .4s}
.extra-card:hover{border-color:rgba(191,160,106,.3);background:var(--bg2)}

/* ══════════════════════════════════════════════
   PLAN / COMPARE
══════════════════════════════════════════════ */
.plan-card{position:relative}
.compare-row:hover{background:rgba(191,160,106,.03)}
.faq-item{border-bottom:1px solid var(--brd);transition:background .3s}

/* ══════════════════════════════════════════════
   IMG HOVER ZOOM
══════════════════════════════════════════════ */
.img-scale img{transition:transform .7s cubic-bezier(.23,1,.32,1)}
.img-scale:hover img{transform:scale(1.05)}

/* ══════════════════════════════════════════════
   KEYFRAME ANIMATIONS
══════════════════════════════════════════════ */
@keyframes f1{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-19px) rotate(2.2deg)}}
@keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px) rotate(-1.5deg)}}
@keyframes rs{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes rsr{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
@keyframes bth{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pls{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

.fl1{animation:f1 7s ease-in-out infinite}
.fl2{animation:f2 9.5s ease-in-out infinite}
.rs{animation:rs 22s linear infinite}
.rsr{animation:rsr 29s linear infinite}
.bth{animation:bth 4s ease-in-out infinite}
.pls{animation:pls 2s ease-in-out infinite}

/* ══════════════════════════════════════════════
   NAVBAR — RESPONSIVE
══════════════════════════════════════════════ */
.nav-root{
  position:fixed;top:0;left:0;right:0;z-index:50;
  display:flex;align-items:center;justify-content:space-between;
  padding:16px clamp(18px,4vw,40px);
  border-bottom:1px solid var(--brd);
  backdrop-filter:blur(22px);
}
.nav-links{display:flex;gap:clamp(18px,3vw,36px);align-items:center}
.nav-actions{display:flex;gap:clamp(8px,1.5vw,14px);align-items:center}

/* Hide/show helpers */
@media(max-width:768px){
  .hide-mobile{display:none!important}
  .show-mobile{display:flex!important}
}
@media(min-width:769px){
  .hide-desktop{display:none!important}
  .show-mobile{display:none}
}

/* ══════════════════════════════════════════════
   SECTION PADDING — RESPONSIVE
══════════════════════════════════════════════ */
.sec-pad{padding:clamp(56px,8vw,100px) clamp(20px,4vw,60px)}
.sec-pad-sm{padding:clamp(40px,6vw,80px) clamp(20px,4vw,60px)}

/* ══════════════════════════════════════════════
   HERO — RESPONSIVE  
══════════════════════════════════════════════ */
.hero-pad{
  padding-top:clamp(100px,14vw,160px);
  padding-bottom:clamp(40px,6vw,80px);
  padding-left:clamp(20px,4vw,60px);
  padding-right:clamp(20px,4vw,60px);
}

/* ══════════════════════════════════════════════
   GRIDS — RESPONSIVE
══════════════════════════════════════════════ */
.grid-auto{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));
  gap:1px;
}
.grid-auto-lg{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));
  gap:clamp(32px,5vw,72px);
  align-items:center;
}
.grid-3{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));
  gap:1px;
}

/* ══════════════════════════════════════════════
   STATS ROW — RESPONSIVE
══════════════════════════════════════════════ */
.stats-row{
  display:flex;flex-wrap:wrap;
  gap:clamp(24px,4vw,52px);
  margin-top:clamp(32px,5vw,56px);
}

/* ══════════════════════════════════════════════
   CTA SECTION — RESPONSIVE
══════════════════════════════════════════════ */
.cta-btns{
  display:flex;gap:clamp(10px,2vw,16px);
  justify-content:center;flex-wrap:wrap;
  margin-top:clamp(24px,3vw,42px);
}
.hero-btns{
  display:flex;gap:14px;flex-wrap:wrap;
  align-items:center;
}

/* ══════════════════════════════════════════════
   ABOUT COLLAGE — RESPONSIVE
══════════════════════════════════════════════ */
.about-collage{
  position:relative;
  height:clamp(320px,45vw,500px);
}

/* ══════════════════════════════════════════════
   FLIP GRID — RESPONSIVE
══════════════════════════════════════════════ */
.flip-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));
  gap:clamp(10px,2vw,16px);
}

/* ══════════════════════════════════════════════
   PRICING GRID — RESPONSIVE  
══════════════════════════════════════════════ */
.price-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));
  border:1px solid var(--brd);border-radius:4px;
  overflow:hidden;gap:1px;background:var(--brd);
}

/* ══════════════════════════════════════════════
   FOOTER — RESPONSIVE
══════════════════════════════════════════════ */
.footer-inner{
  display:flex;flex-wrap:wrap;align-items:center;
  justify-content:space-between;gap:clamp(16px,3vw,24px);
  padding:clamp(28px,4vw,40px) clamp(20px,4vw,40px);
  max-width:1600px;margin:0 auto;
}
.footer-links{
  display:flex;flex-wrap:wrap;
  gap:clamp(16px,2.5vw,32px);
}

/* ══════════════════════════════════════════════
   CONTACT GRID — RESPONSIVE  
══════════════════════════════════════════════ */
.contact-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));
  gap:clamp(40px,6vw,80px);
}

/* ══════════════════════════════════════════════
   LOGIN/SIGNUP SPLIT — RESPONSIVE
══════════════════════════════════════════════ */
.auth-wrap{
  display:flex;min-height:100vh;
}
.auth-left{
  flex:1;display:flex;flex-direction:column;
  justify-content:center;padding:clamp(40px,6vw,60px);
  position:relative;border-right:1px solid var(--brd);
  min-height:100vh;
}
.auth-right{
  flex:0 0 min(100%,560px);
  display:flex;flex-direction:column;justify-content:center;
  padding:clamp(32px,5vw,60px) clamp(24px,4vw,40px);
  min-height:100vh;overflow-y:auto;
}
@media(max-width:820px){
  .auth-left{display:none}
  .auth-right{flex:1;min-width:0}
}

/* ══════════════════════════════════════════════
   PILLAR SECTIONS (features page) — RESPONSIVE
══════════════════════════════════════════════ */
.pillar-sec{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));
  gap:clamp(36px,6vw,64px);
  align-items:center;
  margin-bottom:clamp(64px,10vw,120px);
}
.pillar-img{
  border-radius:4px;overflow:hidden;
  border:1px solid var(--brd);position:relative;
  height:clamp(240px,35vw,380px);
}

/* ══════════════════════════════════════════════
   TESTIMONIALS — RESPONSIVE
══════════════════════════════════════════════ */
.testimonial-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));
  gap:1px;background:var(--brd);
}

/* ══════════════════════════════════════════════
   COMPARISON TABLE — RESPONSIVE
══════════════════════════════════════════════ */
.compare-wrap{overflow-x:auto}
.compare-wrap table{width:100%;min-width:580px;border-collapse:collapse}

/* ══════════════════════════════════════════════
   VERTICAL SIDE LABEL — hide on small screens
══════════════════════════════════════════════ */
.side-label{
  position:absolute;left:16px;top:52%;transform:translateY(-50%);
  writing-mode:vertical-rl;display:flex;flex-direction:column;
  align-items:center;gap:11px;opacity:.35;z-index:5;pointer-events:none;
}
@media(max-width:900px){.side-label{display:none}}

/* ══════════════════════════════════════════════
   MOBILE MENU OVERLAY
══════════════════════════════════════════════ */
.mobile-menu{
  position:absolute;top:100%;left:0;right:0;
  border-bottom:1px solid var(--brd);
  backdrop-filter:blur(20px);
  padding:clamp(16px,3vw,24px) clamp(18px,4vw,40px);
  display:flex;flex-direction:column;gap:20px;
}

/* ══════════════════════════════════════════════
   404 PAGE
══════════════════════════════════════════════ */
.not-found-wrap{
  min-height:100vh;display:flex;align-items:center;
  justify-content:center;position:relative;overflow:hidden;
  padding:clamp(80px,12vw,120px) clamp(20px,4vw,40px);
}

/* ══════════════════════════════════════════════
   XL / 2XL SCREENS
══════════════════════════════════════════════ */
@media(min-width:1600px){
  .container{padding:0 80px}
  .section{padding:120px 80px}
}

/* ══════════════════════════════════════════════
   SCROLLBAR HIDE
══════════════════════════════════════════════ */
*::-webkit-scrollbar{display:none}
*{scrollbar-width:none;-ms-overflow-style:none}
`;
