import { useState, useEffect, useRef } from "react";

/*
  AESTHETIC: Medical Brutalism
  - Ink-black base (#0D0D0D) with chalk-white text (#F5F0E8)
  - Single electric accent: #00FF88 (surgical green)
  - Fonts: Bebas Neue (display/impact) + Cabinet Grotesk (body)
  - Grid-breaking oversized numbers, diagonal slashes, raw borders
  - Mechanical hover states, not smooth SaaS animations
  - Zero rounded corners — everything is sharp right angles
  - Inspired by Swiss medical journals meets brutalist web design
*/

// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink:       #0D0D0D;
  --chalk:     #F5F0E8;
  --acid:      #00FF88;
  --acid-dim:  rgba(0,255,136,0.12);
  --acid-mid:  rgba(0,255,136,0.35);
  --dim:       #1A1A1A;
  --border:    rgba(245,240,232,0.12);
  --muted:     rgba(245,240,232,0.45);
  --ff-head:   'Bebas Neue', Impact, sans-serif;
  --ff-body:   'Cabinet Grotesk', 'Helvetica Neue', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--ff-body);
  background: var(--ink);
  color: var(--chalk);
  overflow-x: hidden;
  cursor: crosshair;
}

a, button { cursor: crosshair; }

/* ── CUSTOM CURSOR DOT ── */
.cursor-dot {
  width: 8px; height: 8px;
  background: var(--acid);
  position: fixed; top: 0; left: 0;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.08s linear;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--acid); }

/* ── SELECTION ── */
::selection { background: var(--acid); color: var(--ink); }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 900;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 60px;
  background: var(--ink);
  border-bottom: 1px solid var(--border);
}
.nav-logo {
  font-family: var(--ff-head);
  font-size: 1.6rem; letter-spacing: 2px;
  color: var(--chalk); text-decoration: none;
}
.nav-logo em { color: var(--acid); font-style: normal; }
.nav-links {
  display: flex; align-items: center; gap: 0;
  list-style: none;
}
.nav-links a {
  display: block; padding: 0 20px; height: 60px;
  line-height: 60px; color: var(--muted);
  text-decoration: none; font-size: 0.78rem;
  font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  border-left: 1px solid var(--border);
  transition: color 0.15s, background 0.15s;
}
.nav-links a:hover { color: var(--chalk); background: var(--dim); }
.nav-cta-link {
  background: var(--acid) !important; color: var(--ink) !important;
  border-left: none !important; font-weight: 800 !important;
}
.nav-cta-link:hover { background: #00cc6e !important; }
.hamburger {
  display: none; flex-direction: column; gap: 6px;
  width: 28px; cursor: crosshair;
}
.hamburger span { display: block; height: 1.5px; background: var(--chalk); }
.mob-menu {
  display: none; position: fixed; top: 60px; inset-inline: 0; bottom: 0;
  background: var(--ink); flex-direction: column;
  border-top: 1px solid var(--border); z-index: 898; overflow-y: auto;
}
.mob-menu.open { display: flex; }
.mob-menu a {
  padding: 20px 40px; font-size: 2rem;
  font-family: var(--ff-head); letter-spacing: 2px;
  color: var(--chalk); text-decoration: none;
  border-bottom: 1px solid var(--border);
}
.mob-menu a:last-child { background: var(--acid); color: var(--ink); }
@media (max-width: 900px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}

/* ── HERO ── */
.hero {
  min-height: 100vh; padding: 60px 0 0;
  display: grid; grid-template-rows: 1fr auto;
  position: relative; overflow: hidden;
}
.hero-ticker {
  position: absolute; top: 60px; left: 0; right: 0;
  height: 40px; background: var(--acid);
  display: flex; align-items: center; overflow: hidden;
}
.ticker-inner {
  display: flex; gap: 0;
  animation: ticker 20s linear infinite;
  white-space: nowrap;
}
.ticker-inner span {
  display: inline-flex; align-items: center; gap: 16px;
  padding: 0 32px; font-family: var(--ff-head);
  font-size: 0.95rem; letter-spacing: 2px; color: var(--ink);
}
.ticker-inner span::after { content: '//'; opacity: 0.4; }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.hero-main {
  display: grid; grid-template-columns: 1fr 1fr;
  padding: 100px 40px 60px; gap: 0;
  align-items: end;
}
.hero-left { padding-right: 40px; border-right: 1px solid var(--border); }
.hero-number {
  font-family: var(--ff-head); font-size: clamp(120px, 20vw, 200px);
  line-height: 0.85; color: var(--dim);
  position: absolute; right: 42%; top: 80px; z-index: 0;
  pointer-events: none; letter-spacing: -4px;
  -webkit-text-stroke: 1px rgba(245,240,232,0.06);
  color: transparent;
}
.hero-kicker {
  font-size: 0.72rem; font-weight: 800; letter-spacing: 3px;
  text-transform: uppercase; color: var(--acid);
  display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
}
.hero-kicker::before {
  content: ''; display: block; width: 40px; height: 1px; background: var(--acid);
}
.hero h1 {
  font-family: var(--ff-head);
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 0.92; letter-spacing: 1px;
  margin-bottom: 32px; position: relative; z-index: 1;
}
.hero h1 .slash { color: var(--acid); }
.hero-body {
  font-size: 1rem; color: var(--muted); line-height: 1.75;
  max-width: 420px; margin-bottom: 40px;
  border-left: 2px solid var(--acid); padding-left: 16px;
}
.hero-actions { display: flex; gap: 0; }
.btn-hard {
  padding: 16px 36px; font-family: var(--ff-body);
  font-weight: 800; font-size: 0.82rem; letter-spacing: 2px;
  text-transform: uppercase; text-decoration: none;
  display: inline-block; transition: all 0.12s;
  border: none;
}
.btn-acid {
  background: var(--acid); color: var(--ink);
}
.btn-acid:hover { background: #00cc6e; transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--chalk); }
.btn-ghost {
  background: transparent; color: var(--chalk);
  border: 1px solid var(--border); margin-left: -1px;
}
.btn-ghost:hover { background: var(--dim); color: var(--chalk); }

.hero-right {
  padding-left: 40px; padding-top: 40px; position: relative; z-index: 1;
}
.hero-tags {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;
}
.tag {
  padding: 6px 14px; font-size: 0.72rem; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  border: 1px solid var(--border); color: var(--muted);
  transition: all 0.12s;
}
.tag:hover { border-color: var(--acid); color: var(--acid); }

/* Dashboard card */
.dash-card {
  border: 1px solid var(--border); background: var(--dim);
  overflow: hidden;
}
.dash-header {
  border-bottom: 1px solid var(--border); padding: 10px 16px;
  display: flex; align-items: center; justify-content: space-between;
}
.dash-header-left { display: flex; align-items: center; gap: 10px; }
.dash-label { font-size: 0.68rem; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
.dash-live {
  width: 6px; height: 6px; background: var(--acid); border-radius: 50%;
  animation: blink 1.4s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
.dash-grid { display: grid; grid-template-columns: repeat(2,1fr); }
.dash-cell {
  padding: 16px; border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.dash-cell:nth-child(even) { border-right: none; }
.dash-cell:nth-last-child(-n+2) { border-bottom: none; }
.d-val {
  font-family: var(--ff-head); font-size: 2rem; letter-spacing: 1px;
  line-height: 1; margin-bottom: 4px;
}
.d-acid { color: var(--acid); }
.d-lbl { font-size: 0.7rem; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
.d-delta { font-size: 0.68rem; color: var(--acid); margin-top: 4px; }
.dash-chart { padding: 16px; border-top: 1px solid var(--border); }
.chart-label { font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
.bars-wrap { display: flex; align-items: flex-end; gap: 4px; height: 56px; }
.b { flex: 1; background: var(--border); transition: background 0.2s; }
.b:hover { background: var(--acid); }
.b.hi { background: rgba(0,255,136,0.5); }
.dash-modules {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 12px 16px;
  border-top: 1px solid var(--border);
}
.mod-pill {
  font-size: 0.65rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 4px 10px; border: 1px solid var(--acid-mid); color: var(--acid);
}

/* ── HERO BOTTOM BAR ── */
.hero-bottom {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--border);
}
.hb-item {
  padding: 28px 40px; border-right: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 4px;
}
.hb-item:last-child { border-right: none; }
.hb-num {
  font-family: var(--ff-head); font-size: 2.8rem;
  letter-spacing: 1px; line-height: 1; color: var(--acid);
}
.hb-label { font-size: 0.7rem; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; }

@media (max-width: 900px) {
  .hero-main { grid-template-columns: 1fr; gap: 40px; }
  .hero-left { border-right: none; border-bottom: 1px solid var(--border); padding-right: 0; padding-bottom: 40px; }
  .hero-right { padding-left: 0; }
  .hero-number { display: none; }
  .hero-bottom { grid-template-columns: repeat(2,1fr); }
  .hb-item:nth-child(2) { border-right: none; }
  .hb-item:nth-child(3) { border-right: 1px solid var(--border); }
}
@media (max-width: 600px) {
  .hero-main { padding: 80px 20px 40px; }
  .nav { padding: 0 20px; }
  .hb-item { padding: 20px; }
  .hero-bottom { grid-template-columns: repeat(2,1fr); }
}

/* ── SECTION BASE ── */
.section { padding: 120px 40px; }
.section-light { background: var(--chalk); color: var(--ink); }
.section-light .muted { color: rgba(13,13,13,0.5) !important; }
.section-light .card-dark { background: white; border-color: rgba(13,13,13,0.1); }
.container { max-width: 1280px; margin: 0 auto; }

.section-no { font-family: var(--ff-head); font-size: 0.7rem; letter-spacing: 4px; color: var(--acid); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
.section-no::before { content: '//'; }
.section-no-dark { color: rgba(0,160,80,1) !important; }

h2.section-title {
  font-family: var(--ff-head);
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 0.9; letter-spacing: 1px;
  margin-bottom: 24px;
}
h2.section-title-sm {
  font-family: var(--ff-head);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 0.95; letter-spacing: 1px; margin-bottom: 24px;
}
.section-sub { font-size: 1rem; color: var(--muted); line-height: 1.7; max-width: 580px; }
.section-sub-dark { color: rgba(13,13,13,0.55) !important; }

/* ── PROBLEM ── */
.problem-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border); margin-top: 60px;
}
.prob-card {
  padding: 36px 32px; border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative; overflow: hidden;
  transition: background 0.15s;
}
.prob-card::after {
  content: attr(data-n);
  font-family: var(--ff-head); font-size: 6rem;
  color: transparent; -webkit-text-stroke: 1px var(--border);
  position: absolute; top: -10px; right: 16px; line-height: 1;
  pointer-events: none; transition: color 0.15s;
}
.prob-card:hover { background: var(--dim); }
.prob-card:hover::after { -webkit-text-stroke-color: rgba(0,255,136,0.1); }
.prob-card:nth-child(3n) { border-right: none; }
.prob-card:nth-last-child(-n+3) { border-bottom: none; }
.prob-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: var(--acid); border: 1px solid var(--acid-mid); }
.prob-card h3 { font-family: var(--ff-body); font-size: 1rem; font-weight: 800; margin-bottom: 10px; line-height: 1.3; }
.prob-card p { font-size: 0.82rem; color: var(--muted); line-height: 1.65; }
.prob-line { display: block; width: 32px; height: 2px; background: var(--acid); margin-bottom: 16px; }

@media (max-width: 900px) {
  .problem-grid { grid-template-columns: 1fr 1fr; }
  .prob-card:nth-child(3n) { border-right: 1px solid var(--border); }
  .prob-card:nth-child(2n) { border-right: none; }
}
@media (max-width: 580px) {
  .problem-grid { grid-template-columns: 1fr; }
  .prob-card { border-right: none !important; }
}

/* ── SOLUTION SPLIT ── */
.solution-split {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0; margin-top: 60px; border: 1px solid rgba(13,13,13,0.1);
}
.sol-card {
  padding: 40px 36px; border-right: 1px solid rgba(13,13,13,0.1);
  transition: background 0.15s;
}
.sol-card:last-child { border-right: none; }
.sol-card:hover { background: rgba(0,160,80,0.04); }
.sol-num {
  font-family: var(--ff-head); font-size: 5rem; line-height: 1;
  color: transparent; -webkit-text-stroke: 1.5px rgba(0,160,80,0.3);
  margin-bottom: 12px;
}
.sol-card h3 { font-size: 1.3rem; font-weight: 800; color: var(--ink); margin-bottom: 12px; }
.sol-card p { font-size: 0.87rem; color: rgba(13,13,13,0.55); line-height: 1.7; }
.sol-accent { width: 40px; height: 3px; background: rgba(0,160,80,0.8); margin-bottom: 20px; }

@media (max-width: 768px) {
  .solution-split { grid-template-columns: 1fr; }
  .sol-card { border-right: none; border-bottom: 1px solid rgba(13,13,13,0.1); }
  .sol-card:last-child { border-bottom: none; }
}

/* ── MODULES ── */
.modules-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  border: 1px solid var(--border); margin-top: 60px;
}
.mod-card {
  padding: 28px 28px; border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 10px;
  position: relative; overflow: hidden;
  transition: background 0.12s;
}
.mod-card:hover { background: var(--dim); }
.mod-card:hover .mod-arrow { opacity: 1; transform: translate(0,0); }
.mod-card:nth-child(3n) { border-right: none; }
.mod-card:nth-last-child(-n+3) { border-bottom: none; }
.mod-icon-box {
  width: 40px; height: 40px; border: 1px solid var(--acid-mid);
  display: grid; place-items: center;
  color: var(--acid); flex-shrink: 0;
}
.mod-card h3 { font-size: 0.95rem; font-weight: 800; letter-spacing: 0.5px; }
.mod-card p { font-size: 0.78rem; color: var(--muted); line-height: 1.6; }
.mod-arrow {
  position: absolute; bottom: 16px; right: 16px;
  font-size: 1.2rem; color: var(--acid);
  opacity: 0; transform: translate(-4px, 4px);
  transition: all 0.2s;
}

@media (max-width: 900px) {
  .modules-grid { grid-template-columns: repeat(2,1fr); }
  .mod-card:nth-child(3n) { border-right: 1px solid var(--border); }
  .mod-card:nth-child(2n) { border-right: none; }
}
@media (max-width: 580px) {
  .modules-grid { grid-template-columns: 1fr; }
  .mod-card { border-right: none !important; }
  .section { padding: 80px 20px; }
}

/* ── ROLES ── */
.role-tabs {
  display: flex; gap: 0; border: 1px solid var(--border);
  border-bottom: none; margin-top: 60px; flex-wrap: wrap;
}
.role-tab-btn {
  flex: 1; min-width: 140px; padding: 16px 24px;
  background: none; border: none; border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  color: var(--muted); font-family: var(--ff-body);
  font-size: 0.78rem; font-weight: 800; letter-spacing: 1.5px;
  text-transform: uppercase; cursor: crosshair;
  transition: all 0.12s; text-align: left;
}
.role-tab-btn:last-child { border-right: none; }
.role-tab-btn.active { background: var(--acid); color: var(--ink); border-bottom-color: var(--acid); }
.role-tab-btn:not(.active):hover { background: var(--dim); color: var(--chalk); }
.role-panel {
  border: 1px solid var(--border); border-top: none;
  display: none; animation: panelIn 0.2s ease;
}
.role-panel.active { display: grid; grid-template-columns: 280px 1fr; }
@keyframes panelIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
.role-info {
  padding: 40px 32px; border-right: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 16px;
}
.role-emoji { font-size: 3rem; line-height: 1; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--acid-mid); color: var(--acid); }
.role-title { font-family: var(--ff-head); font-size: 2.2rem; letter-spacing: 1px; }
.role-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.7; }
.role-badge {
  display: inline-block; padding: 6px 14px;
  font-size: 0.68rem; font-weight: 800; letter-spacing: 2px;
  text-transform: uppercase; border: 1px solid var(--acid); color: var(--acid);
  align-self: flex-start;
}
.role-features { padding: 40px 36px; }
.role-features h4 {
  font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--muted); margin-bottom: 24px;
  display: flex; align-items: center; gap: 12px;
}
.role-features h4::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.feat-list {
  list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}
.feat-list li {
  font-size: 0.85rem; color: var(--chalk); line-height: 1.5;
  display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px;
  border: 1px solid var(--border); transition: border-color 0.12s;
}
.feat-list li:hover { border-color: var(--acid); }
.feat-check { color: var(--acid); font-size: 0.75rem; font-weight: 800; margin-top: 1px; flex-shrink: 0; }

@media (max-width: 900px) {
  .role-panel.active { grid-template-columns: 1fr; }
  .role-info { border-right: none; border-bottom: 1px solid var(--border); }
  .feat-list { grid-template-columns: 1fr; }
}

/* ── STEPS ── */
.steps-section { background: var(--dim); }
.steps-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 0; border: 1px solid var(--border); margin-top: 60px;
}
.step-card {
  padding: 40px 32px; border-right: 1px solid var(--border);
  position: relative;
}
.step-card:last-child { border-right: none; }
.step-n {
  font-family: var(--ff-head); font-size: 5rem; line-height: 1;
  color: var(--acid); margin-bottom: 20px; letter-spacing: -2px;
}
.step-card h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 12px; }
.step-card p { font-size: 0.83rem; color: var(--muted); line-height: 1.7; }
.step-connector {
  position: absolute; top: 40px; right: -16px; z-index: 2;
  width: 32px; height: 32px; background: var(--acid);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; color: var(--ink); font-weight: 800;
}
.step-card:last-child .step-connector { display: none; }

@media (max-width: 768px) {
  .steps-grid { grid-template-columns: 1fr; }
  .step-card { border-right: none; border-bottom: 1px solid var(--border); }
  .step-card:last-child { border-bottom: none; }
  .step-connector { display: none !important; }
}

/* ── WHY GRID ── */
.why-split {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: start; margin-top: 60px;
}
.why-list { display: flex; flex-direction: column; gap: 0; }
.why-item {
  padding: 24px 0; border-bottom: 1px solid rgba(13,13,13,0.1);
  display: flex; gap: 20px; align-items: flex-start;
  cursor: default; transition: background 0.12s; padding: 20px 16px;
}
.why-item:hover { background: rgba(0,160,80,0.04); }
.why-ico {
  font-size: 1.3rem; width: 44px; height: 44px;
  border: 1px solid rgba(0,160,80,0.3);
  display: grid; place-items: center; flex-shrink: 0;
  color: rgba(0,160,80,1);
}
.why-item h3 { font-size: 0.95rem; font-weight: 800; color: var(--ink); margin-bottom: 6px; }
.why-item p { font-size: 0.82rem; color: rgba(13,13,13,0.55); line-height: 1.6; }
.why-tech { display: flex; flex-direction: column; gap: 16px; }
.tech-block {
  border: 1px solid rgba(13,13,13,0.12); padding: 20px 24px;
}
.tech-block-title {
  font-size: 0.65rem; font-weight: 800; letter-spacing: 3px;
  text-transform: uppercase; color: rgba(0,160,80,1);
  margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
}
.tech-block-title::after { content: ''; flex: 1; height: 1px; background: rgba(13,13,13,0.1); }
.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-tag {
  padding: 6px 14px; font-size: 0.75rem; font-weight: 700;
  border: 1px solid rgba(13,13,13,0.15); color: var(--ink);
  letter-spacing: 0.5px;
}
.sec-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.sec-list li {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.84rem; color: var(--ink);
}
.sec-check {
  width: 20px; height: 20px;
  background: rgba(0,160,80,0.12); border: 1px solid rgba(0,160,80,0.3);
  display: grid; place-items: center;
  font-size: 0.65rem; font-weight: 900; color: rgba(0,160,80,1);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .why-split { grid-template-columns: 1fr; gap: 40px; }
}

/* ── FAQ ── */
.faq-col { max-width: 860px; margin: 60px auto 0; display: flex; flex-direction: column; gap: 0; }
.faq-row {
  border-bottom: 1px solid var(--border); overflow: hidden;
}
.faq-row:first-child { border-top: 1px solid var(--border); }
.faq-q {
  width: 100%; padding: 22px 0;
  background: none; border: none; color: var(--chalk);
  font-family: var(--ff-body); font-size: 1rem; font-weight: 700;
  text-align: left; cursor: crosshair;
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
}
.faq-ico { font-size: 1.4rem; color: var(--acid); transition: transform 0.2s; flex-shrink: 0; }
.faq-row.open .faq-ico { transform: rotate(45deg); }
.faq-a {
  max-height: 0; overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  font-size: 0.88rem; color: var(--muted); line-height: 1.75;
}
.faq-row.open .faq-a { max-height: 200px; padding-bottom: 22px; }

/* ── CTA ── */
.cta-wrapper {
  background: var(--acid); padding: 0;
  display: grid; grid-template-columns: 1fr 1fr;
}
.cta-left-block {
  padding: 80px 60px; background: var(--acid);
  display: flex; flex-direction: column; justify-content: center; gap: 24px;
}
.cta-left-block h2 {
  font-family: var(--ff-head); font-size: clamp(3rem, 5vw, 5rem);
  color: var(--ink); line-height: 0.9; letter-spacing: 1px;
}
.cta-left-block p { font-size: 0.95rem; color: rgba(13,13,13,0.65); line-height: 1.7; max-width: 380px; }
.cta-points { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.cta-points li { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--ink); font-weight: 700; }
.cta-points li::before { content: '→'; font-weight: 900; }
.cta-right-block {
  padding: 60px 60px; background: var(--ink);
  border-left: 3px solid var(--acid);
}
.form-title {
  font-family: var(--ff-head); font-size: 1.6rem; letter-spacing: 1px;
  color: var(--chalk); margin-bottom: 28px;
}
.f-group { margin-bottom: 14px; }
.f-label { display: block; font-size: 0.68rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
.f-input {
  width: 100%; padding: 12px 14px;
  background: var(--dim); border: 1px solid var(--border);
  color: var(--chalk); font-family: var(--ff-body); font-size: 0.9rem;
  outline: none; transition: border-color 0.15s;
}
.f-input::placeholder { color: rgba(245,240,232,0.2); }
.f-input:focus { border-color: var(--acid); }
textarea.f-input { resize: vertical; min-height: 80px; }
.f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.btn-submit {
  width: 100%; padding: 16px; margin-top: 8px;
  background: var(--acid); color: var(--ink);
  border: none; font-family: var(--ff-body);
  font-size: 0.82rem; font-weight: 800; letter-spacing: 2px;
  text-transform: uppercase; cursor: crosshair;
  transition: all 0.12s;
}
.btn-submit:hover { background: #00cc6e; letter-spacing: 3px; }
.f-note { font-size: 0.72rem; color: var(--muted); text-align: center; margin-top: 10px; }
.success-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 300px; gap: 16px; text-align: center;
}
.success-icon {
  font-size: 3.5rem; line-height: 1;
  width: 80px; height: 80px; border: 2px solid var(--acid);
  display: grid; place-items: center;
}
.success-state h3 { font-family: var(--ff-head); font-size: 2.2rem; letter-spacing: 1px; }
.success-state p { font-size: 0.85rem; color: var(--muted); max-width: 280px; line-height: 1.7; }

@media (max-width: 900px) {
  .cta-wrapper { grid-template-columns: 1fr; }
  .cta-left-block { padding: 60px 40px; }
  .cta-right-block { padding: 50px 40px; border-left: none; border-top: 3px solid var(--acid); }
}
@media (max-width: 580px) {
  .cta-left-block { padding: 40px 20px; }
  .cta-right-block { padding: 40px 20px; }
  .f-row { grid-template-columns: 1fr; }
}

/* ── FOOTER ── */
footer {
  background: #060606; padding: 0;
  border-top: 1px solid var(--border);
}
.footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid var(--border);
}
.footer-col { padding: 48px 36px; border-right: 1px solid var(--border); }
.footer-col:last-child { border-right: none; }
.footer-brand-name {
  font-family: var(--ff-head); font-size: 2rem; letter-spacing: 2px;
  margin-bottom: 16px;
}
.footer-brand-name em { color: var(--acid); font-style: normal; }
.footer-tagline { font-size: 0.8rem; color: var(--muted); line-height: 1.7; max-width: 260px; }
.footer-col h4 {
  font-size: 0.65rem; font-weight: 800; letter-spacing: 3px;
  text-transform: uppercase; color: var(--muted);
  margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border);
}
.footer-col a {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.84rem; color: var(--muted); text-decoration: none;
  margin-bottom: 12px; transition: color 0.15s;
}
.footer-col a::before { content: '→'; font-size: 0.7rem; color: var(--acid); opacity: 0; transition: opacity 0.15s; }
.footer-col a:hover { color: var(--chalk); }
.footer-col a:hover::before { opacity: 1; }
.footer-bottom {
  padding: 20px 36px; display: flex;
  justify-content: space-between; align-items: center;
  font-size: 0.72rem; color: var(--muted); flex-wrap: wrap; gap: 8px;
}
.footer-acid { color: var(--acid); }

@media (max-width: 900px) {
  .footer-top { grid-template-columns: 1fr 1fr; }
  .footer-col:nth-child(2) { border-right: none; }
  .footer-col { border-bottom: 1px solid var(--border); }
}
@media (max-width: 580px) {
  .footer-top { grid-template-columns: 1fr; }
  .footer-col { border-right: none !important; }
  .footer-col:last-child { border-bottom: none; }
  .footer-col { padding: 30px 20px; }
  .footer-bottom { padding: 16px 20px; }
}

/* ── REVEAL ANIMATIONS ── */
.rv { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease, transform 0.5s ease; }
.rv.in { opacity: 1; transform: none; }
.rv-l { opacity: 0; transform: translateX(-20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.rv-l.in { opacity: 1; transform: none; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "OPD Management", "IPD Management", "Pharmacy", "Billing & Payments",
  "Doctor Portals", "Patient Records", "Live Dashboard", "Audit Trail",
  "Role-Based Access", "Multi-Tenant Security", "Reports & Analytics", "Ward Management"
];

const PROBLEMS = [
  { n:"01", icon:"file", title:"Records lost between OPD and IPD", desc:"Paper-based OPD notes never reach the IPD ward. Doctors repeat the same questions on every admission, wasting time and creating risk." },
  { n:"02", icon:"billing", title:"Billing errors from disconnected systems", desc:"Without integrated billing, procedures and medicines aren't always invoiced. Every missed charge is lost revenue." },
  { n:"03", icon:"bed", title:"No live view of bed occupancy", desc:"Staff call each other across departments to find available beds. No central dashboard means delays in admissions every single day." },
  { n:"04", icon:"pill", title:"Pharmacy stock on paper registers", desc:"Handwritten records, missed expiry dates, and zero low-stock alerts lead to shortages exactly when medicines are critical." },
  { n:"05", icon:"eye", title:"Zero audit trail for accountability", desc:"When errors occur, there's no record of who did what or when. Internal accountability is impossible without a system of record." },
  { n:"06", icon:"lock", title:"No role-controlled staff access", desc:"Everyone in the hospital can see everything — patient data, billing, pharmacy. No separation means privacy and compliance risk." },
];

const MODULES = [
  { icon:"stethoscope", name:"OPD Management", desc:"Appointments, live patient queue, consultations and e-prescriptions" },
  { icon:"bed", name:"IPD Management", desc:"Admissions, ward & bed assignment, daily notes, discharge summaries" },
  { icon:"pill", name:"Pharmacy Management", desc:"Medicine database, stock tracking, expiry alerts, billing counter" },
  { icon:"billing", name:"Billing & Payments", desc:"Multi-line bills, partial payments, status tracking, full history" },
  { icon:"doctor", name:"Doctor Management", desc:"Profiles, schedules, consultation fees, doctor login accounts" },
  { icon:"user", name:"Patient Management", desc:"Registration, search by name/phone/ID, complete visit history" },
  { icon:"desk", name:"Reception / Front Desk", desc:"Patient registration, appointment booking, IPD admission workflow" },
  { icon:"chart", name:"Reports & Analytics", desc:"Revenue, OPD, IPD, pharmacy sales, stock, expiry reports" },
  { icon:"settings", name:"Hospital Settings", desc:"Hospital profile, logo, fee categories, system configuration" },
];

const ROLES = [
  { key:"admin", label:"Hospital Admin", emoji:"admin",
    title:"HOSPITAL ADMIN", badge:"Full Access",
    desc:"The hospital owner or administrator. Highest access level — sees and manages all departments, staff, billing, and reports.",
    features:[
      "Live dashboard with real-time stats", "Manage all patient records and history",
      "Add doctors with schedules and fees", "Create Receptionist and Pharmacist accounts",
      "Full billing — create, track, mark payments", "Ward and bed availability management",
      "7 report types (revenue, stock, expiry…)", "Audit log — every system action recorded",
    ]},
  { key:"doctor", label:"Doctor", emoji:"doctor",
    title:"DOCTOR", badge:"Clinical Access",
    desc:"The practicing physician with a private dashboard. Only sees their own patients and appointments — no access to other doctors' data.",
    features:[
      "View today's appointments and queue", "Patient medical history before consultation",
      "Record diagnosis and clinical notes", "Write prescriptions with dosage/frequency",
      "Recommend lab tests for patients", "View and manage IPD admitted patients",
      "Add daily treatment notes for IPD patients", "Write discharge summaries",
    ]},
  { key:"receptionist", label:"Receptionist", emoji:"receptionist",
    title:"RECEPTIONIST", badge:"Front Desk Access",
    desc:"First point of patient contact. Handles registration, appointment scheduling, OPD queue, and IPD admissions.",
    features:[
      "Register new patients at front desk", "Search patients by name or phone number",
      "Book, reschedule, and cancel appointments", "Manage live OPD patient queue",
      "Mark patients arrived, in-consultation, done", "Admit patients to IPD and assign beds",
      "Record payments and check balances", "Daily summary of appointments & registrations",
    ]},
  { key:"pharmacist", label:"Pharmacist", emoji:"pharmacist",
    title:"PHARMACIST", badge:"Pharmacy Access",
    desc:"Dedicated pharmacy dashboard for complete medicine and inventory management — from purchase entry to dispensing.",
    features:[
      "Add medicines with pricing, GST, HSN codes", "Manage categories and manufacturers",
      "Record purchases with batch and expiry data", "Real-time stock levels and low-stock alerts",
      "30/60/90 day expiry warning system", "Create sale bills — auto-deducts from stock",
      "View and dispense doctor prescriptions", "Sales, purchase, stock and expiry reports",
    ]},
];

const FAQS = [
  { q:"Is each hospital's data completely private?", a:"Yes. HMS uses multi-tenant architecture — each hospital's data is entirely isolated. No hospital can ever access another's patient records, billing, or staff information. Privacy is enforced by design at the database level." },
  { q:"Can I restrict what each staff member sees?", a:"Absolutely. HMS uses strict role-based access control. A Receptionist cannot view billing reports. A Doctor cannot see pharmacy stock. Each role has a dedicated dashboard with only the relevant features — nothing more." },
  { q:"Does HMS work on tablets and mobile devices?", a:"HMS is a web-based platform that runs in any modern browser — Chrome, Edge, Firefox. It's fully responsive and works on desktops, laptops, and tablets. No app installation is needed at your hospital." },
  { q:"Is the pharmacy module included as standard?", a:"Yes. Pharmacy management — medicine database, stock tracking, purchase entry with batch and expiry, low-stock alerts, billing counter, supplier management, and prescription dispensing — is included in the standard HMS package." },
  { q:"How do doctors get access to the system?", a:"The Hospital Admin creates a login account for each doctor from their dashboard. The doctor receives credentials and logs in to access their private dashboard — only their own patients, appointments, and IPD cases." },
  { q:"What reports can the admin generate?", a:"The admin can generate 7 report types: Revenue Report, OPD Report, IPD Report, Pharmacy Sales Report, Outstanding Payments Report, Stock Report, and Expiry Report. All reports are filterable by date range." },
  { q:"Is patient data secure?", a:"Yes. HMS uses JWT authentication with automatic session expiry, BCrypt password hashing, role-based access enforcement, complete audit logging, and multi-tenant data isolation. Security is foundational, not an add-on." },
  { q:"Do I need to install any software?", a:"No. HMS is entirely cloud-based. Your staff accesses it through a web browser. No installation, no servers to maintain, and no IT infrastructure required at your hospital." },
];

const BAR_DATA = [28,45,38,60,42,55,70,50,65,48,82,60];

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const ICONS = {
  file: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  billing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="1" y="4" width="22" height="16" rx="0"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  bed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M2 9V5h20v4"/><path d="M2 9v10h20V9"/><path d="M2 13h20"/><path d="M7 9v4"/><path d="M17 9v4"/>
    </svg>
  ),
  pill: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 0 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>
    </svg>
  ),
  eye: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  lock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="3" y="11" width="18" height="11" rx="0"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  stethoscope: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
    </svg>
  ),
  doctor: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  user: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  desk: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="2" y="3" width="20" height="14" rx="0"/><line x1="2" y1="20" x2="22" y2="20"/><line x1="12" y1="17" x2="12" y2="20"/>
    </svg>
  ),
  chart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  settings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  cloud: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  clipboard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="0"/>
    </svg>
  ),
  activity: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  link: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  // Role icons
  admin: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="3" y="3" width="18" height="18" rx="0"/><path d="M3 9h18"/><path d="M9 21V9"/>
    </svg>
  ),
  receptionist: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M8 21h8"/><path d="M12 17v4"/>
    </svg>
  ),
  pharmacist: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 0 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>
    </svg>
  ),
};

// ─── WHY HMS ITEMS ────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { ico:"cloud", title:"100% Cloud — Zero Installation", body:"No servers, no IT setup, no installation. Access HMS from any browser on any computer. Updates happen automatically in the background." },
  { ico:"shield", title:"Complete Data Privacy", body:"Multi-tenant architecture ensures each hospital's data is fully isolated at the database level. Your patients' data belongs only to you." },
  { ico:"users", title:"Role-Based Access Control", body:"4 dedicated dashboards — Admin, Doctor, Receptionist, Pharmacist. Staff only sees what they need to do their specific job." },
  { ico:"clipboard", title:"Full Audit Trail", body:"Every action in the system is logged — who did what and when. Complete internal accountability for your entire hospital." },
  { ico:"activity", title:"Real-Time Live Dashboard", body:"Instantly see today's patient count, OPD appointments, IPD occupancy, and revenue — all live on the admin dashboard." },
  { ico:"link", title:"Fully Integrated System", body:"Pharmacy, billing, OPD, and IPD all work together. No data gaps, no duplicate entry, no disconnected systems." },
];

// ─── JSON-LD STRUCTURED DATA ──────────────────────────────────────────────────
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "HMSPro — Hospital Management Software",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Request a free demo" },
  "description": "Cloud-based Hospital Management Software connecting OPD, IPD, Pharmacy, and Billing with role-based dashboards for Admin, Doctor, Receptionist, and Pharmacist.",
  "featureList": ["OPD Management","IPD Management","Pharmacy Management","Billing & Payments","Role-Based Access Control","Audit Trail","Multi-Tenant Security"],
  "applicationSubCategory": "Healthcare Management",
  "screenshot": "https://hmspro.com/dashboard-preview.png"
};

export default function HMSLanding() {
  const [tab, setTab] = useState("admin");
  const [faq, setFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", hospital:"", phone:"", email:"", message:"" });
  const cursorRef = useRef(null);

  useEffect(() => {
    // ── SEO META TAGS ──
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    document.title = "HMSPro — Cloud Hospital Management Software | OPD, IPD, Pharmacy & Billing";
    setMeta("description", "HMSPro is a cloud-based Hospital Management System with role-based dashboards for Admin, Doctor, Receptionist and Pharmacist. Manage OPD, IPD, Pharmacy, Billing and Reports — fully integrated, zero installation.");
    setMeta("keywords", "hospital management software, HMS, cloud hospital system, OPD management, IPD management, pharmacy management, hospital billing software, healthcare software India, hospital ERP");
    setMeta("robots", "index, follow");
    setMeta("author", "HMSPro");
    setMeta("og:title", "HMSPro — Cloud Hospital Management Software", true);
    setMeta("og:description", "Complete cloud-based HMS: OPD, IPD, Pharmacy, Billing. Role-based dashboards. Multi-tenant security. Zero installation.", true);
    setMeta("og:type", "website", true);
    setMeta("og:url", "https://hmspro.com", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "HMSPro — Cloud Hospital Management Software");
    setMeta("twitter:description", "Manage your entire hospital digitally — OPD, IPD, Pharmacy, Billing, 4 role dashboards. Cloud-based, secure, zero setup.");
    // Canonical
    if (!document.querySelector("link[rel='canonical']")) {
      const canon = document.createElement("link"); canon.rel = "canonical"; canon.href = "https://hmspro.com"; document.head.appendChild(canon);
    }
    // JSON-LD
    if (!document.getElementById("hms-jsonld")) {
      const s = document.createElement("script"); s.id = "hms-jsonld"; s.type = "application/ld+json";
      s.textContent = JSON.stringify(STRUCTURED_DATA); document.head.appendChild(s);
    }
    // Inject CSS
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);

    // Custom cursor
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);

    // Reveal observer
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    setTimeout(() => {
      document.querySelectorAll(".rv, .rv-l").forEach(el => obs.observe(el));
    }, 100);

    return () => { window.removeEventListener("mousemove", move); obs.disconnect(); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const nav = (id, label) => (
    <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>
  );

  return (
    <>
      <div className="cursor-dot" ref={cursorRef} />

      {/* ── NAV ── */}
      <nav className="nav" id="top" aria-label="Main navigation">
        <a className="nav-logo" href="#top" onClick={e => { e.preventDefault(); scrollTo("top"); }} aria-label="HMSPro — Hospital Management Software">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="0" y="4" width="24" height="24" fill="none" stroke="#F5F0E8" strokeWidth="1.5"/>
            <line x1="0" y1="16" x2="24" y2="16" stroke="#F5F0E8" strokeWidth="1.5"/>
            <line x1="12" y1="4" x2="12" y2="28" stroke="#00FF88" strokeWidth="1.5"/>
            <text x="32" y="23" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="22" letterSpacing="2" fill="#F5F0E8">HMS</text>
            <text x="76" y="23" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="22" letterSpacing="2" fill="#00FF88">PRO</text>
          </svg>
        </a>
        <ul className="nav-links">
          {[["features","Features"],["modules","Modules"],["roles","Roles"],["why","Why HMS"],["faq","FAQ"]].map(([id,l]) => (
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();scrollTo(id)}}>{l}</a></li>
          ))}
          <li><a href="#contact" onClick={e=>{e.preventDefault();scrollTo("contact")}} className="nav-cta-link">Get Demo</a></li>
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        {[["features","01  Features"],["modules","02  Modules"],["roles","03  Roles"],["why","04  Why HMS"],["faq","05  FAQ"]].map(([id,l]) => (
          <a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();scrollTo(id)}}>{l}</a>
        ))}
        <a href="#contact" onClick={e=>{e.preventDefault();scrollTo("contact")}}>→ Request Demo</a>
      </div>

      {/* ── HERO ── */}
      <main>
      <section className="hero" id="hero" aria-label="HMS Hospital Management Software Hero">
        {/* Ticker */}
        <div className="hero-ticker">
          <div className="ticker-inner">
            {[...TICKER_ITEMS,...TICKER_ITEMS].map((t,i) => <span key={i}>{t}</span>)}
          </div>
        </div>

        <div className="hero-main container">
          <div className="hero-left">
            <div className="hero-kicker">Hospital Management Software</div>
            <h1>
              ONE<br />
              SYSTEM<span className="slash">.</span><br />
              ZERO<br />
              PAPER<span className="slash">.</span>
            </h1>
            <p className="hero-body">
              HMS connects every department in your hospital — OPD, IPD, Pharmacy, and Billing — with role-specific dashboards for Admins, Doctors, Receptionists, and Pharmacists. Cloud-based. Secure. Complete.
            </p>
            <div className="hero-actions">
              <a href="#contact" onClick={e=>{e.preventDefault();scrollTo("contact")}} className="btn-hard btn-acid">
                Request a Demo →
              </a>
              <a href="#modules" onClick={e=>{e.preventDefault();scrollTo("modules")}} className="btn-hard btn-ghost">
                See All Modules
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-tags">
              {["100% Cloud-Based","Multi-Tenant Privacy","Role-Based Access","JWT Secured","Audit Trail","4 User Roles","9+ Modules"].map(t => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            {/* Dashboard Mockup */}
            <div className="dash-card">
              <div className="dash-header">
                <div className="dash-header-left">
                  <div className="dash-live" />
                  <span className="dash-label">HMS Admin Dashboard</span>
                </div>
                <span className="dash-label">Live</span>
              </div>
              <div className="dash-grid">
                {[
                  { val:"47", label:"Today's Patients", delta:"↑ 12 from yesterday", acid:true },
                  { val:"23", label:"IPD Admitted", delta:"8 beds available", acid:false },
                  { val:"₹84K", label:"Today's Revenue", delta:"↑ 18% vs last week", acid:true },
                  { val:"12", label:"Active Doctors", delta:"3 in consultation", acid:false },
                ].map((d,i) => (
                  <div className="dash-cell" key={i}>
                    <div className={`d-val${d.acid ? " d-acid" : ""}`}>{d.val}</div>
                    <div className="d-lbl">{d.label}</div>
                    <div className="d-delta">{d.delta}</div>
                  </div>
                ))}
              </div>
              <div className="dash-chart">
                <div className="chart-label">Weekly OPD Volume</div>
                <div className="bars-wrap">
                  {BAR_DATA.map((h,i) => (
                    <div key={i} className={`b ${i===11?"hi":""}`} style={{ height:`${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="dash-modules">
                {["OPD ✓","IPD ✓","Pharmacy ✓","Billing ✓","Reports ✓"].map(m => (
                  <span className="mod-pill" key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-bottom">
          {[["4","User Roles"],["9+","Modules"],["100%","Cloud-Based"],["JWT","Auth Secured"]].map(([n,l]) => (
            <div className="hb-item rv" key={l}>
              <div className="hb-num">{n}</div>
              <div className="hb-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section" id="features">
        <div className="container">
          <div className="rv-l">
            <div className="section-no">01  The Problem</div>
            <h2 className="section-title">WHY HOSPITALS<br />STILL STRUGGLE</h2>
            <p className="section-sub">Without a unified system, every department is an island — creating gaps that cost time, money, and patient trust every single day.</p>
          </div>
          <div className="problem-grid">
            {PROBLEMS.map((p) => (
              <article className="prob-card rv" key={p.n} data-n={p.n}>
                <span className="prob-line" />
                <span className="prob-icon" aria-hidden="true">{ICONS[p.icon]}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section section-light">
        <div className="container">
          <div className="rv-l">
            <div className="section-no section-no-dark">02  The Solution</div>
            <h2 className="section-title section-title-dark" style={{color:"#0D0D0D"}}>HMS SOLVES<br />IT ALL</h2>
            <p className="section-sub section-sub-dark">One integrated platform — every department working together, in real time, with zero data gaps.</p>
          </div>
          <div className="solution-split">
            {[
              { n:"01", title:"Unified Patient Records", body:"Every OPD visit, IPD admission, prescription, and billing record lives in one place. No more re-entering data or searching across paper files. One patient, one record, every department." },
              { n:"02", title:"Integrated Billing", body:"Multi-line bills, partial payment tracking, outstanding balance reports, and payment status — all from a single billing screen. Nothing gets missed, nothing is duplicated." },
              { n:"03", title:"Full Pharmacy Control", body:"Medicine database, purchase entries with batch and expiry tracking, low-stock alerts, billing counter, and direct prescription dispensing — all connected to your patient records." },
              { n:"04", title:"Role-Based Dashboards", body:"Four distinct dashboards — Admin, Doctor, Receptionist, Pharmacist. Each staff member sees exactly what they need to do their job. Nothing more, nothing less." },
            ].map((s) => (
              <div className="sol-card rv" key={s.n}>
                <div className="sol-num">{s.n}</div>
                <div className="sol-accent" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="section" id="modules">
        <div className="container">
          <div className="rv-l">
            <div className="section-no">03  All Modules</div>
            <h2 className="section-title">COMPLETE.<br />CONNECTED.<br />INCLUDED.</h2>
            <p className="section-sub">All 9 modules in a single subscription. Every department your hospital runs — covered out of the box.</p>
          </div>
          <div className="modules-grid" role="list">
            {MODULES.map((m) => (
              <article className="mod-card rv" key={m.name} role="listitem">
                <div className="mod-icon-box" aria-hidden="true">{ICONS[m.icon]}</div>
                <h3>{m.name}</h3>
                <p>{m.desc}</p>
                <span className="mod-arrow" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="section" id="roles" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="rv-l" style={{ paddingTop:120 }}>
            <div className="section-no">04  User Roles</div>
            <h2 className="section-title">BUILT FOR<br />EVERY ROLE</h2>
            <p className="section-sub">Four dedicated dashboards. Each staff member gets exactly the tools they need — and nothing they don't.</p>
          </div>
          <div className="role-tabs" role="tablist" aria-label="User Roles">
            {ROLES.map(r => (
              <button key={r.key} className={`role-tab-btn ${tab===r.key?"active":""}`} onClick={() => setTab(r.key)} role="tab" aria-selected={tab===r.key}>
                <span aria-hidden="true" style={{display:"inline-flex",verticalAlign:"middle",marginRight:8}}>{ICONS[r.emoji] ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">{r.key==="admin"&&<><rect x="3" y="3" width="18" height="18" rx="0"/><path d="M3 9h18"/><path d="M9 21V9"/></>}{r.key==="doctor"&&<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>}{r.key==="receptionist"&&<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}{r.key==="pharmacist"&&<><path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 0 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></>}</svg> : null}</span>
                {r.label}
              </button>
            ))}
          </div>
          {ROLES.map(r => (
            <div key={r.key} className={`role-panel ${tab===r.key?"active":""}`}>
              <div className="role-info">
                <div className="role-emoji" aria-hidden="true">{ICONS[r.emoji] || ICONS.doctor}</div>
                <div className="role-title">{r.title}</div>
                <div className="role-badge">{r.badge}</div>
                <p className="role-desc">{r.desc}</p>
              </div>
              <div className="role-features">
                <h4>Key Features</h4>
                <ul className="feat-list">
                  {r.features.map(f => (
                    <li key={f}><span className="feat-check">✓</span>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="section steps-section">
        <div className="container">
          <div className="rv-l">
            <div className="section-no">05  Getting Started</div>
            <h2 className="section-title">3 STEPS<br />TO LIVE</h2>
            <p className="section-sub">No complex IT setup. No hardware installation. No on-site visits. Just a browser and you're running.</p>
          </div>
          <div className="steps-grid">
            {[
              { n:"01", title:"Admin Configures the Hospital", body:"The Hospital Admin logs in and sets up the hospital — adds doctors with their schedules and fees, then creates login accounts for Receptionists and Pharmacists.", connector:true },
              { n:"02", title:"Staff Gets Their Dashboard", body:"Each team member logs in with their role credentials. Doctors see their appointments. Receptionists see the queue. Pharmacists see the stock. Completely role-isolated.", connector:true },
              { n:"03", title:"Hospital Goes Fully Digital", body:"Manage patients, record consultations, dispense medicines, generate bills, and track everything through live reports. Every department, zero paperwork.", connector:false },
            ].map(s => (
              <div className="step-card rv" key={s.n}>
                <div className="step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.connector && <div className="step-connector">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HMS ── */}
      <section className="section section-light" id="why">
        <div className="container">
          <div className="rv-l">
            <div className="section-no section-no-dark">06  Why HMS</div>
            <h2 className="section-title section-title-dark" style={{color:"#0D0D0D"}}>BUILT FOR<br />HOSPITALS.<br />NOT ADAPTED.</h2>
            <p className="section-sub section-sub-dark">Purpose-built hospital management software — not a generic platform stretched to fit healthcare.</p>
          </div>
          <div className="why-split">
            <div className="why-list">
              {WHY_ITEMS.map(w => (
                <div className="why-item rv" key={w.title}>
                  <div className="why-ico" aria-hidden="true">{ICONS[w.ico]}</div>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="why-tech rv">
              <div className="tech-block">
                <div className="tech-block-title">Technology Stack</div>
                <div className="tech-tags">
                  {["Java 17","Spring Boot 3.2","Spring Security","JWT Auth","MySQL 8.0","React 18","Vite","Tailwind CSS"].map(t => (
                    <span className="tech-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="tech-block">
                <div className="tech-block-title">Security Architecture</div>
                <ul className="sec-list">
                  {[
                    "Multi-tenant data isolation per hospital",
                    "JWT token auth with auto session expiry",
                    "BCrypt password hashing — never plain text",
                    "Role-based access — strict per-role permissions",
                    "Complete audit log with user and timestamp",
                  ].map(s => (
                    <li key={s}><div className="sec-check">✓</div>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="tech-block" style={{background:"rgba(0,160,80,0.06)", border:"1px solid rgba(0,160,80,0.25)"}}>
                <div className="tech-block-title">Platform</div>
                <p style={{fontSize:"0.83rem", color:"rgba(13,13,13,0.6)", lineHeight:1.7}}>
                  100% cloud-hosted. Works on any modern browser — Chrome, Edge, Firefox. No software installation required at your hospital. Always up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="container">
          <div className="rv-l" style={{textAlign:"center"}}>
            <div className="section-no" style={{justifyContent:"center"}}>07  FAQ</div>
            <h2 className="section-title">COMMON<br />QUESTIONS</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>Everything you need to know before getting started with HMS.</p>
          </div>
          <div className="faq-col">
            {FAQS.map((f,i) => (
              <div key={i} className={`faq-row ${faq===i?"open":""}`}>
                <button className="faq-q" onClick={() => setFaq(i)}>
                  {f.q}
                  <span className="faq-ico">+</span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section id="contact">
        <div className="cta-wrapper">
          <div className="cta-left-block">
            <h2>READY TO GO<br />DIGITAL?</h2>
            <p>Fill out the form and our team will give you a personalized walkthrough of HMS — customized for your hospital's size and departments.</p>
            <ul className="cta-points">
              <li>No commitment required — just a demo</li>
              <li>Quick setup — no installation needed</li>
              <li>All 4 user roles included as standard</li>
              <li>Dedicated support during onboarding</li>
            </ul>
          </div>
          <div className="cta-right-block">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>REQUEST SENT</h3>
                <p>Our team will contact you shortly to schedule your personalized HMS demo.</p>
              </div>
            ) : (
              <>
                <div className="form-title">Request a Free Demo</div>
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="f-row">
                    <div className="f-group">
                      <label className="f-label">Your Name *</label>
                      <input className="f-input" type="text" placeholder="Dr. Rajesh Sharma" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Hospital Name *</label>
                      <input className="f-input" type="text" placeholder="City Care Hospital" required value={form.hospital} onChange={e=>setForm({...form,hospital:e.target.value})} />
                    </div>
                  </div>
                  <div className="f-row">
                    <div className="f-group">
                      <label className="f-label">Phone Number *</label>
                      <input className="f-input" type="tel" placeholder="+91 98765 43210" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Email Address</label>
                      <input className="f-input" type="email" placeholder="admin@hospital.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                    </div>
                  </div>
                  <div className="f-group">
                    <label className="f-label">Message (optional)</label>
                    <textarea className="f-input" placeholder="Tell us about your hospital — no. of doctors, departments needed..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
                  </div>
                  <button type="submit" className="btn-submit">Request My Free Demo →</button>
                  <div className="f-note"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" style={{display:"inline",verticalAlign:"middle",marginRight:4}} aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="0"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Your information is never shared</div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      </main>
      {/* ── FOOTER ── */}
      <footer aria-label="Site footer">
        <div className="footer-top">
          <div className="footer-col">
            <div className="footer-brand-name" aria-label="HMSPro">
              <svg width="100" height="28" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="0" y="4" width="24" height="24" fill="none" stroke="#F5F0E8" strokeWidth="1.5"/>
                <line x1="0" y1="16" x2="24" y2="16" stroke="#F5F0E8" strokeWidth="1.5"/>
                <line x1="12" y1="4" x2="12" y2="28" stroke="#00FF88" strokeWidth="1.5"/>
                <text x="32" y="23" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="22" letterSpacing="2" fill="#F5F0E8">HMS</text>
                <text x="76" y="23" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="22" letterSpacing="2" fill="#00FF88">PRO</text>
              </svg>
            </div>
            <p className="footer-tagline">Cloud-based Hospital Management Software connecting every department — OPD, IPD, Pharmacy, and Billing — in one secure platform.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            {[["features","Features"],["modules","All Modules"],["roles","User Roles"],["why","Why HMS"]].map(([id,l]) => (
              <a key={l} href={`#${id}`} onClick={e=>{e.preventDefault();scrollTo(id)}}>{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Roles</h4>
            {["Hospital Admin","Doctor","Receptionist","Pharmacist"].map(r => (
              <a key={r} href="#roles" onClick={e=>{e.preventDefault();scrollTo("roles")}}>{r}</a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#faq" onClick={e=>{e.preventDefault();scrollTo("faq")}}>FAQ</a>
            <a href="#contact" onClick={e=>{e.preventDefault();scrollTo("contact")}}>Request Demo</a>
            <a href="mailto:support@hmspro.com">support@hmspro.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 <span className="footer-acid">HMSPro</span>. All rights reserved.</span>
          <span>Built for modern hospitals. Secure. Cloud-based. Complete.</span>
        </div>
      </footer>
    </>
  );
}
