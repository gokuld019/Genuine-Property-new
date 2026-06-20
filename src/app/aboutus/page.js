"use client";
import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #b03030;
    --red-light: #c94040;
    --red-dark: #8a2020;
    --black: #0a0a0a;
    --dark: #111111;
    --dark2: #1a1a1a;
    --warm-white: #faf5f0;
    --warm-light: #f0ebe3;
    --warm-mid: #e8dfd5;
    --text-dark: #1c1c1c;
    --text-mid: #4a4a4a;
    --text-light: #8a8a8a;
  }

  .about-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--warm-white);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    background: var(--black);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('/aboutbanner.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
  }
  .hero-grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(176,48,48,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(176,48,48,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-ghost-text {
    position: absolute;
    top: 50%;
    left: -2%;
    transform: translateY(-50%);
    font-family: 'Sora', sans-serif;
    font-size: clamp(120px, 18vw, 240px);
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(176,48,48,0.15);
    line-height: 1;
    letter-spacing: -4px;
    pointer-events: none;
    white-space: nowrap;
    user-select: none;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px 100px;
    width: 100%;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 28px;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--red);
  }
  .hero-headline {
    font-family: 'Sora', sans-serif;
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -2px;
    color: #ffffff;
    max-width: 800px;
    margin-bottom: 32px;
  }
  .hero-headline em {
    font-style: normal;
    color: var(--red);
  }
  .hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.55);
    max-width: 520px;
    margin-bottom: 52px;
  }
  .hero-scroll-hint {
    display: flex;
    align-items: center;
    gap: 14px;
    color: rgba(255,255,255,0.35);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .scroll-line {
    width: 48px;
    height: 1px;
    background: rgba(255,255,255,0.2);
    position: relative;
    overflow: hidden;
  }
  .scroll-line::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: var(--red);
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0% { left: -100%; }
    50% { left: 0; }
    100% { left: 100%; }
  }

  /* ── STATS BAR ── */
  .stats-bar {
    background: var(--red);
    padding: 0;
  }
  .stats-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-left: 1px solid rgba(255,255,255,0.15);
  }
  .stat-item {
    padding: 40px 32px;
    border-right: 1px solid rgba(255,255,255,0.15);
    text-align: center;
  }
  .stat-number {
    font-family: 'Sora', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #fff;
    line-height: 1;
    margin-bottom: 6px;
    letter-spacing: -1px;
  }
  .stat-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
  }

  /* ── STORY SECTION ── */
  .section-story {
    background: var(--warm-white);
    padding: 120px 0;
    position: relative;
    overflow: hidden;
  }
  .section-story::before {
    content: 'GPD';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Sora', sans-serif;
    font-size: clamp(140px, 22vw, 300px);
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(176,48,48,0.06);
    pointer-events: none;
    white-space: nowrap;
    letter-spacing: -8px;
    user-select: none;
    z-index: 0;
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px;
  }
  .story-centered {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 780px;
    margin: 0 auto;
  }
  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 24px;
  }
  .section-tag::before,
  .section-tag::after {
    content: '';
    display: block;
    width: 32px;
    height: 1.5px;
    background: var(--red);
    flex-shrink: 0;
  }
  .section-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(36px, 4vw, 58px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1.5px;
    color: var(--text-dark);
    margin-bottom: 28px;
  }
  .section-heading em {
    font-style: normal;
    color: var(--red);
  }
  .section-body {
    font-size: 17px;
    font-weight: 300;
    line-height: 1.85;
    color: var(--text-mid);
    margin-bottom: 14px;
    max-width: 640px;
  }
  .story-divider {
    width: 48px;
    height: 2px;
    background: var(--red);
    margin: 36px auto;
  }
  .story-signature {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: #fff;
    border: 0.5px solid rgba(0,0,0,0.08);
    border-radius: 4px;
    padding: 16px 28px 16px 20px;
    box-shadow: 0 2px 24px rgba(0,0,0,0.05);
    margin-top: 8px;
  }
  .sig-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--red);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
  }
  .sig-name {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-dark);
    text-align: left;
  }
  .sig-role {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-light);
    margin-top: 3px;
    text-align: left;
  }
  .story-mini-stats {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 72px;
    padding-top: 56px;
    border-top: 1px solid rgba(176,48,48,0.15);
  }
  .story-mini-stat {
    flex: 1;
    max-width: 200px;
    padding: 0 32px;
    border-right: 1px solid rgba(176,48,48,0.15);
    text-align: center;
  }
  .story-mini-stat:last-child { border-right: none; }
  .sms-num {
    font-family: 'Sora', sans-serif;
    font-size: 40px;
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -1.5px;
    line-height: 1;
  }
  .sms-num span { color: var(--red); }
  .sms-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-light);
    margin-top: 8px;
  }

  /* ── TIMELINE ── */
  .section-timeline {
    background: var(--dark);
    padding: 120px 0;
    position: relative;
    overflow: hidden;
  }
  .timeline-ghost {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Sora', sans-serif;
    font-size: clamp(100px, 20vw, 260px);
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.04);
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    letter-spacing: -6px;
  }
  .timeline-header {
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    z-index: 2;
  }
  .timeline-header .section-tag { justify-content: center; color: var(--red); }
  .timeline-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(36px, 4vw, 54px);
    font-weight: 700;
    letter-spacing: -1.5px;
    color: #ffffff;
  }
  .timeline-heading em { font-style: normal; color: var(--red); }
  .timeline-track {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid rgba(255,255,255,0.08);
    border-right: none;
  }
  .timeline-node {
    border-right: 1px solid rgba(255,255,255,0.08);
    padding: 48px 40px;
    position: relative;
    transition: background 0.3s ease;
    cursor: default;
  }
  .timeline-node:hover { background: rgba(176,48,48,0.07); }
  .timeline-node:hover .tl-year { color: var(--red); -webkit-text-stroke-color: transparent; }
  .tl-year {
    font-family: 'Sora', sans-serif;
    font-size: 52px;
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.18);
    line-height: 1;
    letter-spacing: -2px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }
  .tl-dot {
    width: 8px; height: 8px;
    background: var(--red);
    border-radius: 50%;
    margin-bottom: 16px;
  }
  .tl-title {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 10px;
  }
  .tl-desc {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.45);
  }

  /* ── MISSION / VISION / VALUES ── */
  .section-mvv {
    background: var(--warm-white);
    padding: 120px 0;
  }
  .mvv-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px;
    margin-top: 60px;
    background: var(--warm-mid);
  }
  .mvv-card {
    background: var(--warm-white);
    padding: 56px 48px;
    position: relative;
    overflow: hidden;
    transition: background 0.35s ease;
  }
  .mvv-card:hover { background: #fff; }
  .mvv-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 0;
    background: var(--red);
    transition: height 0.35s ease;
  }
  .mvv-card:hover::before { height: 100%; }
  .mvv-number {
    font-family: 'Sora', sans-serif;
    font-size: 64px;
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px var(--warm-mid);
    line-height: 1;
    letter-spacing: -3px;
    margin-bottom: 24px;
    transition: -webkit-text-stroke-color 0.35s ease;
  }
  .mvv-card:hover .mvv-number { -webkit-text-stroke-color: rgba(176,48,48,0.15); }
  .mvv-title {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 16px;
    letter-spacing: -0.5px;
  }
  .mvv-body {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
    color: var(--text-mid);
  }

  /* ── WHY US ── */
  .section-why {
    background: var(--black);
    padding: 120px 0;
    position: relative;
    overflow: hidden;
  }
  .why-bg-accent {
    position: absolute;
    top: -100px; right: -150px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(176,48,48,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 100px;
    align-items: center;
    position: relative; z-index: 2;
  }
  .why-left .section-tag { color: var(--red); }
  .why-left .section-tag::before { background: var(--red); }
  .why-left .section-tag::after { display: none; }
  .why-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(36px, 4vw, 58px);
    font-weight: 700;
    letter-spacing: -1.5px;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 28px;
  }
  .why-heading em { font-style: normal; color: var(--red); }
  .why-body { color: rgba(255,255,255,0.45); }
  .why-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: var(--red);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 16px 32px;
    border: none;
    cursor: pointer;
    margin-top: 40px;
    transition: background 0.25s ease;
    text-decoration: none;
  }
  .why-cta:hover { background: var(--red-light); }
  .why-right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: rgba(255,255,255,0.05);
  }
  .why-item {
    background: rgba(255,255,255,0.03);
    padding: 40px 32px;
    border: 1px solid rgba(255,255,255,0.04);
    transition: background 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .why-item::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 2px;
    background: var(--red);
    transition: width 0.35s ease;
  }
  .why-item:hover { background: rgba(176,48,48,0.06); border-color: rgba(176,48,48,0.2); }
  .why-item:hover::after { width: 100%; }
  .why-icon {
    width: 44px; height: 44px;
    background: rgba(176,48,48,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
  }
  .why-icon svg { width: 20px; height: 20px; color: var(--red); }
  .why-item-title {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }
  .why-item-desc {
    font-size: 13px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.4);
  }

  /* ── TRUST STRIP ── */
  .section-trust {
    background: var(--warm-white);
    padding: 80px 0;
    border-bottom: 1px solid var(--warm-mid);
  }
  .trust-inner {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .trust-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-light);
    white-space: nowrap;
    margin-right: 48px;
    padding-right: 48px;
    border-right: 1px solid var(--warm-mid);
    flex-shrink: 0;
  }
  .trust-items {
    display: flex;
    align-items: center;
    gap: 48px;
    flex-wrap: wrap;
  }
  .trust-item {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .trust-item-icon {
    width: 40px; height: 40px;
    background: var(--red);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .trust-item-icon svg { width: 18px; height: 18px; color: #fff; }
  .trust-item-text strong {
    display: block;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-dark);
  }
  .trust-item-text span {
    font-size: 12px;
    color: var(--text-light);
  }

  /* ── CTA ── */
  .section-cta {
    background: var(--red);
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  }
  .cta-bg-lines {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
  }
  .cta-inner {
    position: relative; z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }
  .cta-text .section-tag { color: rgba(255,255,255,0.7); }
  .cta-text .section-tag::before,
  .cta-text .section-tag::after { background: rgba(255,255,255,0.5); }
  .final-cta-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 700;
    letter-spacing: -1.5px;
    color: #fff;
    line-height: 1.1;
  }
  .cta-buttons {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-shrink: 0;
  }
  .btn-white {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    color: var(--red);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 18px 36px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .btn-white:hover { background: var(--black); color: #fff; }
  .btn-outline-white {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 17px 35px;
    border: 1.5px solid rgba(255,255,255,0.4);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .btn-outline-white:hover { border-color: #fff; background: rgba(255,255,255,0.08); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .stats-inner { grid-template-columns: repeat(3, 1fr); }
    .stat-item:nth-child(4), .stat-item:nth-child(5) { border-top: 1px solid rgba(255,255,255,0.15); }
    .timeline-track { grid-template-columns: 1fr 1fr; }
    .timeline-node:nth-child(3), .timeline-node:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
    .mvv-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; }
    .cta-inner { flex-direction: column; text-align: center; }
    .trust-inner { flex-direction: column; align-items: flex-start; gap: 32px; }
    .trust-label { border-right: none; border-bottom: 1px solid var(--warm-mid); padding-bottom: 16px; padding-right: 0; margin-right: 0; }
    .story-mini-stats { gap: 0; }
    .story-mini-stat { padding: 0 20px; }
  }
  @media (max-width: 640px) {
    .container { padding: 0 24px; }
    .hero-content { padding: 0 24px 80px; }
    .stats-inner { padding: 0 24px; grid-template-columns: repeat(2, 1fr); }
    .stat-item:nth-child(5) { grid-column: span 2; }
    .timeline-track { grid-template-columns: 1fr; }
    .why-right { grid-template-columns: 1fr; }
    .cta-buttons { flex-direction: column; width: 100%; }
    .btn-white, .btn-outline-white { text-align: center; justify-content: center; }
    .story-mini-stats { flex-direction: column; align-items: center; gap: 32px; padding-top: 40px; margin-top: 48px; }
    .story-mini-stat { border-right: none; border-bottom: 1px solid rgba(176,48,48,0.15); padding: 0 0 32px; }
    .story-mini-stat:last-child { border-bottom: none; padding-bottom: 0; }
    .section-story::before { font-size: 100px; }
    .why-left .section-tag::after { display: none; }
    .cta-text .section-tag::after { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition-duration: 0.01ms !important; }
  }
`;

const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "50+", label: "Successful Projects" },
  { number: "5000+", label: "Happy Families" },
  { number: "10M+", label: "Sq. Ft. Developed" },
  { number: "100%", label: "Legal Transparency" },
];

const timeline = [
  { year: "2009", title: "Foundation", desc: "Genuine Property Developers was established with a mission to redefine premium plotted development across India." },
  { year: "2013", title: "First Milestone", desc: "Delivered our first 500-plot community with 100% on-time possession and full legal compliance." },
  { year: "2018", title: "Regional Expansion", desc: "Expanded operations to 5 major cities, gaining DTCP & RERA approvals across all active projects." },
  { year: "2024", title: "Vision 2030", desc: "Launching our largest development — Genuine Green City — a 100-acre eco-integrated plotted township." },
];

const mvv = [
  { num: "01", title: "Our Mission", body: "To deliver premium plotted communities that offer legal security, world-class infrastructure, and lasting value — making land ownership a trusted, transparent experience for every family." },
  { num: "02", title: "Our Vision", body: "To become the most trusted name in plotted development across South Asia, building communities where quality of life, nature, and modern convenience coexist." },
  { num: "03", title: "Our Values", body: "Transparency in every transaction. Precision in every plot. Commitment to sustainability, community wellbeing, and the futures of the families who trust us with their most important investment." },
];

const whyItems = [
  { title: "DTCP & RERA Approved", desc: "Every single plot across all projects carries full legal approvals. Zero compromise, ever." },
  { title: "Prime Locations", desc: "Strategically selected sites near major highways, metro corridors, and growth hubs." },
  { title: "World-Class Infrastructure", desc: "40 ft wide roads, underground utilities, avenue plantation, and LED street lights." },
  { title: "Transparent Pricing", desc: "No hidden charges. Clear pricing with EMI options designed for every income bracket." },
  { title: "On-Time Possession", desc: "Our 15-year record shows 100% on-time handovers across all completed projects." },
  { title: "Post-Sale Support", desc: "Dedicated teams assist with construction planning, vastu guidance, and resale advisory." },
];

const trustItems = [
  { label: "DTCP Approved", sub: "All Active Projects" },
  { label: "RERA Registered", sub: "Fully Compliant" },
  { label: "ISO 9001:2015", sub: "Quality Certified" },
  { label: "Best Developer 2023", sub: "Real Estate Awards" },
  { label: "5★ Customer Rating", sub: "Google Reviews" },
];

export default function AboutUs() {
  const pageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(ScrollTrigger, SplitText);

      ctx = gsap.context(() => {
        const pg = pageRef.current;

        // ── Helpers ──
        const clipReveal = (el, trigger, delay = 0) => {
          if (!el) return;
          const split = new SplitText(el, { type: "words,lines", linesClass: "gsap-clip-line" });
          pg.querySelectorAll(".gsap-clip-line").forEach(l => {
            l.style.overflow = "hidden";
            l.style.display = "block";
          });
          gsap.from(split.words, {
            scrollTrigger: { trigger: trigger || el, start: "top 85%", toggleActions: "play none none none" },
            y: "115%",
            opacity: 0,
            stagger: 0.065,
            duration: 0.8,
            ease: "expo.out",
            delay,
          });
        };

        const charStagger = (el, trigger, delay = 0) => {
          if (!el) return;
          const split = new SplitText(el, { type: "chars" });
          gsap.from(split.chars, {
            scrollTrigger: { trigger: trigger || el, start: "top 88%", toggleActions: "play none none none" },
            opacity: 0,
            y: 12,
            stagger: 0.028,
            duration: 0.45,
            ease: "power3.out",
            delay,
          });
        };

        const fadeUp = (el, trigger, delay = 0, y = 20) => {
          if (!el) return;
          gsap.from(el, {
            scrollTrigger: { trigger: trigger || el, start: "top 87%", toggleActions: "play none none none" },
            y,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            delay,
          });
        };

        // ══ HERO ══
        gsap.from(pg.querySelector(".hero-ghost-text"), {
          x: -80,
          opacity: 0,
          duration: 2,
          ease: "expo.out",
          delay: 0.2,
        });

        const heroEyebrow = pg.querySelector(".hero-eyebrow");
        if (heroEyebrow) {
          const split = new SplitText(heroEyebrow, { type: "chars" });
          gsap.from(split.chars, {
            opacity: 0, y: 10,
            stagger: 0.03, duration: 0.5, ease: "power3.out", delay: 0.5,
          });
        }

        const heroHeadline = pg.querySelector(".hero-headline");
        if (heroHeadline) {
          const split = new SplitText(heroHeadline, { type: "words,lines", linesClass: "hero-clip-line" });
          pg.querySelectorAll(".hero-clip-line").forEach(l => {
            l.style.overflow = "hidden"; l.style.display = "block";
          });
          gsap.from(split.words, {
            y: "115%", opacity: 0,
            stagger: 0.08, duration: 1, ease: "expo.out", delay: 0.7,
          });
        }

        const heroSub = pg.querySelector(".hero-sub");
        if (heroSub) {
          const split = new SplitText(heroSub, { type: "words" });
          gsap.from(split.words, {
            opacity: 0, y: 8,
            stagger: 0.03, duration: 0.5, ease: "power2.out", delay: 1.1,
          });
        }

        gsap.from(pg.querySelector(".hero-scroll-hint"), {
          opacity: 0, y: 10, duration: 0.6, ease: "power2.out", delay: 1.5,
        });

        // ══ STATS BAR ══
        gsap.from(pg.querySelectorAll(".stat-item"), {
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none none" },
          y: 30, opacity: 0,
          stagger: 0.08, duration: 0.6, ease: "power3.out",
        });

        pg.querySelectorAll(".stat-number").forEach((num) => {
          charStagger(num, statsRef.current, 0.1);
        });

        // ══ STORY SECTION ══
        const storySection = pg.querySelector(".section-story");
        const storyCentered = storySection.querySelector(".story-centered");

        // Ghost watermark scale in
        gsap.from(storySection, {
          scrollTrigger: { trigger: storySection, start: "top 85%", toggleActions: "play none none none" },
          "--story-ghost-opacity": 0,
          duration: 1.2,
          ease: "expo.out",
        });

        charStagger(storyCentered.querySelector(".section-tag"), storySection);
        clipReveal(storyCentered.querySelector(".section-heading"), storySection, 0.1);

        storyCentered.querySelectorAll(".section-body").forEach((p, i) => {
          const split = new SplitText(p, { type: "words" });
          gsap.from(split.words, {
            scrollTrigger: { trigger: p, start: "top 88%", toggleActions: "play none none none" },
            opacity: 0, y: 6,
            stagger: 0.025, duration: 0.4, ease: "power2.out",
            delay: 0.1 * i,
          });
        });

        gsap.from(storyCentered.querySelector(".story-divider"), {
          scrollTrigger: { trigger: storyCentered.querySelector(".story-divider"), start: "top 88%" },
          scaleX: 0, transformOrigin: "center center",
          duration: 0.7, ease: "power3.out",
        });

        fadeUp(storyCentered.querySelector(".story-signature"), storyCentered.querySelector(".story-signature"), 0.2);

        // Mini stats stagger
        storyCentered.querySelectorAll(".story-mini-stat").forEach((stat, i) => {
          gsap.from(stat, {
            scrollTrigger: { trigger: storyCentered.querySelector(".story-mini-stats"), start: "top 88%", toggleActions: "play none none none" },
            y: 24, opacity: 0,
            duration: 0.6, ease: "power3.out", delay: 0.1 + i * 0.1,
          });
          charStagger(stat.querySelector(".sms-num"), storyCentered.querySelector(".story-mini-stats"), 0.2 + i * 0.1);
        });

        // ══ TIMELINE ══
        const tlSection = pg.querySelector(".section-timeline");

        gsap.from(tlSection.querySelector(".timeline-ghost"), {
          scrollTrigger: { trigger: tlSection, start: "top 85%", toggleActions: "play none none none" },
          scale: 1.15, opacity: 0, duration: 1.2, ease: "expo.out",
        });

        charStagger(tlSection.querySelector(".section-tag"), tlSection);
        clipReveal(tlSection.querySelector(".timeline-heading"), tlSection, 0.1);

        const tlNodes = tlSection.querySelectorAll(".timeline-node");
        gsap.from(tlNodes, {
          scrollTrigger: { trigger: tlSection.querySelector(".timeline-track"), start: "top 80%", toggleActions: "play none none none" },
          y: 50, opacity: 0,
          stagger: 0.12, duration: 0.7, ease: "power3.out", delay: 0.2,
        });

        tlNodes.forEach((node, i) => {
          gsap.from(node.querySelector(".tl-year"), {
            scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none none" },
            opacity: 0, x: -20,
            duration: 0.6, ease: "power3.out", delay: 0.1 + i * 0.08,
          });

          gsap.from(node.querySelector(".tl-dot"), {
            scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none none" },
            scale: 0, duration: 0.4, ease: "back.out(3)", delay: 0.25 + i * 0.08,
          });

          const titleSplit = new SplitText(node.querySelector(".tl-title"), { type: "chars" });
          gsap.from(titleSplit.chars, {
            scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none none" },
            opacity: 0, y: 8, stagger: 0.025, duration: 0.4, ease: "power2.out",
            delay: 0.3 + i * 0.08,
          });
        });

        // ══ MVV ══
        const mvvSection = pg.querySelector(".section-mvv");
        charStagger(mvvSection.querySelector(".section-tag"), mvvSection);
        clipReveal(mvvSection.querySelector(".section-heading"), mvvSection, 0.1);

        mvvSection.querySelectorAll(".mvv-card").forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
            y: 40, opacity: 0, duration: 0.65, ease: "power3.out", delay: i * 0.12,
          });

          gsap.from(card.querySelector(".mvv-number"), {
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
            opacity: 0, x: -20, duration: 0.5, ease: "power3.out", delay: 0.1 + i * 0.12,
          });

          const titleSplit = new SplitText(card.querySelector(".mvv-title"), { type: "chars" });
          gsap.from(titleSplit.chars, {
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
            opacity: 0, y: 8, stagger: 0.025, duration: 0.4, ease: "power2.out",
            delay: 0.2 + i * 0.12,
          });
        });

        // ══ WHY US ══
        const whySection = pg.querySelector(".section-why");
        charStagger(whySection.querySelector(".section-tag"), whySection);
        clipReveal(whySection.querySelector(".why-heading"), whySection, 0.1);

        const whyBody = whySection.querySelector(".why-body");
        if (whyBody) {
          const split = new SplitText(whyBody, { type: "words" });
          gsap.from(split.words, {
            scrollTrigger: { trigger: whyBody, start: "top 87%", toggleActions: "play none none none" },
            opacity: 0, y: 6, stagger: 0.03, duration: 0.45, ease: "power2.out", delay: 0.2,
          });
        }

        gsap.from(whySection.querySelector(".why-cta"), {
          scrollTrigger: { trigger: whySection.querySelector(".why-cta"), start: "top 88%", toggleActions: "play none none none" },
          x: -20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1,
        });

        whySection.querySelectorAll(".why-item").forEach((item, i) => {
          gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
            y: 30, opacity: 0, duration: 0.55, ease: "power3.out", delay: i * 0.07,
          });
          gsap.from(item.querySelector(".why-icon"), {
            scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
            scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2.5)", delay: 0.12 + i * 0.07,
          });
        });

        // ══ TRUST STRIP ══
        const trustSection = pg.querySelector(".section-trust");
        charStagger(trustSection.querySelector(".trust-label"), trustSection);

        trustSection.querySelectorAll(".trust-item").forEach((item, i) => {
          gsap.from(item, {
            scrollTrigger: { trigger: trustSection, start: "top 85%", toggleActions: "play none none none" },
            y: 20, opacity: 0, duration: 0.55, ease: "power3.out", delay: 0.1 + i * 0.08,
          });
          gsap.from(item.querySelector(".trust-item-icon"), {
            scrollTrigger: { trigger: trustSection, start: "top 85%", toggleActions: "play none none none" },
            scale: 0, duration: 0.4, ease: "back.out(2.5)", delay: 0.2 + i * 0.08,
          });
        });

        // ══ FINAL CTA ══
        const ctaSection = pg.querySelector(".section-cta");
        charStagger(ctaSection.querySelector(".section-tag"), ctaSection);
        clipReveal(ctaSection.querySelector(".final-cta-heading"), ctaSection, 0.15);

        gsap.from(ctaSection.querySelectorAll(".cta-buttons a"), {
          scrollTrigger: { trigger: ctaSection.querySelector(".cta-buttons"), start: "top 88%", toggleActions: "play none none none" },
          x: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", delay: 0.2,
        });

      }, pageRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="about-page" ref={pageRef}>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid-lines" />
          <div className="hero-ghost-text">GENUINE</div>
          <div className="hero-content">
            <div className="hero-eyebrow">Our Story</div>
            <h1 className="hero-headline">
              Building<br />More Than<br /><em>Properties.</em>
            </h1>
            <p className="hero-sub">
              For over 15 years, we've been crafting communities where trust, transparency,
              and thoughtful design come together — creating legacies, not just land.
            </p>
            <div className="hero-scroll-hint">
              <div className="scroll-line" />
              Scroll to explore
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="stats-bar" ref={statsRef}>
          <div className="stats-inner">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── STORY ── */}
        <section className="section-story">
          <div className="container">
            <div className="story-centered">
              <div className="section-tag">Who We Are</div>
              <h2 className="section-heading">
                A Legacy Built on<br /><em>Trust & Land.</em>
              </h2>
              <div className="story-divider" />
              <p className="section-body">
                Genuine Property Developers was born from a simple belief — that every family deserves access to premium land in prime locations, backed by legal security and world-class infrastructure.                From our first 100-plot community in 2009 to the sprawling 100-acre Genuine Green City today, we've never wavered on the principles that define us: transparency, quality, and a genuine commitment to the futures of our customers.

              </p>
             
              <div className="story-signature">
                <div className="sig-avatar">R</div>
                <div>
                  <div className="sig-name">Ramesh Gupta</div>
                  <div className="sig-role">Founder & Chairman, Genuine Property Developers</div>
                </div>
              </div>
              <div className="story-mini-stats">
                <div className="story-mini-stat">
                  <div className="sms-num">15<span>+</span></div>
                  <div className="sms-label">Years of Excellence</div>
                </div>
                <div className="story-mini-stat">
                  <div className="sms-num">50<span>+</span></div>
                  <div className="sms-label">Projects Delivered</div>
                </div>
                <div className="story-mini-stat">
                  <div className="sms-num">5K<span>+</span></div>
                  <div className="sms-label">Happy Families</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="section-timeline">
          <div className="timeline-ghost">JOURNEY</div>
          <div className="container">
            <div className="timeline-header">
              <div className="section-tag">Our Journey</div>
              <h2 className="timeline-heading">15 Years of <em>Milestones</em></h2>
            </div>
            <div className="timeline-track">
              {timeline.map((t, i) => (
                <div className="timeline-node" key={i}>
                  <div className="tl-year">{t.year}</div>
                  <div className="tl-dot" />
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION / VISION / VALUES ── */}
        <section className="section-mvv">
          <div className="container">
            <div className="section-tag">What Drives Us</div>
            <h2 className="section-heading">Purpose Behind<br /><em>Every Plot.</em></h2>
            <div className="mvv-grid">
              {mvv.map((m, i) => (
                <div className="mvv-card" key={i}>
                  <div className="mvv-number">{m.num}</div>
                  <div className="mvv-title">{m.title}</div>
                  <div className="mvv-body">{m.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="section-why">
          <div className="why-bg-accent" />
          <div className="container">
            <div className="why-grid">
              <div className="why-left">
                <div className="section-tag">Why Genuine</div>
                <h2 className="why-heading">
                  More Than<br />Plots. It's A<br /><em>Better Life.</em>
                </h2>
                <p className="section-body why-body">
                  Thoughtfully planned communities with world-class infrastructure, legal clarity, and a team that stands by you long after possession.
                </p>
                <a href="/contact" className="why-cta">
                  Book a Site Visit →
                </a>
              </div>
              <div className="why-right">
                {whyItems.map((w, i) => (
                  <div className="why-item" key={i}>
                    <div className="why-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="why-item-title">{w.title}</div>
                    <div className="why-item-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <section className="section-trust">
          <div className="container">
            <div className="trust-inner">
              <div className="trust-label">Certifications &amp; Awards</div>
              <div className="trust-items">
                {trustItems.map((t, i) => (
                  <div className="trust-item" key={i}>
                    <div className="trust-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                      </svg>
                    </div>
                    <div className="trust-item-text">
                      <strong>{t.label}</strong>
                      <span>{t.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-cta">
          <div className="cta-bg-lines" />
          <div className="container">
            <div className="cta-inner">
              <div className="cta-text">
                <div className="section-tag">Take the Next Step</div>
                <h2 className="final-cta-heading">
                  Your Dream Plot is<br />Just a Visit Away.
                </h2>
              </div>
              <div className="cta-buttons">
                <a href="/contact" className="btn-white">Book a Free Site Visit</a>
                <a href="/projects" className="btn-outline-white">Explore Projects →</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}