"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    slug: "rathinam-garden",
    name: "Rathinam Garden",
    category: "Premium Plotted Development",
    location: "East Tambaram – Mappedu, Nedungundram, Chennai",
    status: "Selling Fast",
    statusColor: "#e31e24",
    stats: "43 Plots · 1000–1385 Sq.Ft · CMDA & RERA Approved",
  },
  {
    slug: "alankar-sunrise",
    name: "Alankar Sunrise",
    category: "CMDA Approved Plotted Development",
    location: "East Tambaram – Mappedu, Puthur, Chengalpattu District",
    status: "New Launch",
    statusColor: "#0a8a5c",
    stats: "2.28 Acres · 68 Plots · 775–1570 Sq.Ft",
  },
  {
    slug: "amudham-foundation",
    name: "Amudham Foundation",
    category: "Premium Plotted Development",
    location: "Chennai, Tamil Nadu",
    status: "Available",
    statusColor: "#1a6fc4",
    stats: "RERA Approved · 30 Ft Roads · Ready to Build",
  },
];

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

  @media (max-width: 768px) {
    .hero-bg-desktop {
      display: none !important;
    }
    
    .hero-bg-mobile {
      display: block !important;
    }
    
    .hero-content {
      display: none !important;
    }
}
  
  .hero-bg-desktop {
    position: absolute;
    inset: 0;
    background-image: url('/aboutbanner.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
  }
  
  .hero-bg-mobile {
    position: absolute;
    inset: 0;
    background-image: url('/aboutmob.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: none;
  }
  
  .hero-bg-desktop::after,
  .hero-bg-mobile::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.3);
  }
  
  .hero-grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(176,48,48,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(176,48,48,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
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
    font-size: 32px;
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
    pointer-events: none;
  }
  .cta-inner-about {
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
    opacity: 1 !important;
    visibility: visible !important;
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

  /* ── CLIP REVEAL STYLES ── */
  .gsap-clip-line {
    overflow: hidden;
    display: block;
  }


  .since-year {
  font-size: 70px;
  display: inline-block;
}

  /* ══════════════════════════════
     ENQUIRY MODAL
  ══════════════════════════════ */
  .gpd-modal-backdrop {
    position: fixed; inset: 0; z-index: 1200;
    background: rgba(8,8,10,0);
    backdrop-filter: blur(0px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    transition: background 0.32s ease, backdrop-filter 0.32s ease;
  }
  .gpd-modal-backdrop.entering,
  .gpd-modal-backdrop.entered {
    background: rgba(8,8,10,0.72);
    backdrop-filter: blur(6px);
  }
  .gpd-modal-backdrop.leaving {
    background: rgba(8,8,10,0);
    backdrop-filter: blur(0px);
    transition: background 0.22s ease, backdrop-filter 0.22s ease;
  }
  .gpd-modal-card {
    width: 100%; max-width: 860px; max-height: 88vh;
    background: #0d0d0d;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 30px 90px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.4);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1.05fr 0.85fr;
    position: relative;
    opacity: 0;
    transform: translateY(18px) scale(0.97);
    transition: opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1);
  }
  .gpd-modal-backdrop.entering .gpd-modal-card,
  .gpd-modal-backdrop.entered .gpd-modal-card {
    opacity: 1; transform: translateY(0) scale(1);
  }
  .gpd-modal-backdrop.leaving .gpd-modal-card {
    opacity: 0; transform: translateY(10px) scale(0.98);
    transition: opacity 0.22s ease, transform 0.22s ease;
  }
  .gpd-form-col {
    padding: 36px 38px; overflow-y: auto;
    display: flex; flex-direction: column;
    background: #0d0d0d;
    max-height: 88vh;
  }
  .gpd-form-col::-webkit-scrollbar { width: 5px; }
  .gpd-form-col::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
  .gpd-tag-pill {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(227,30,36,0.1);
    border: 1px solid rgba(227,30,36,0.25);
    border-radius: 100px; padding: 5px 14px 5px 10px;
    width: fit-content; margin-bottom: 16px;
  }
  .gpd-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #e31e24;
    animation: pulsedot 1.8s ease-in-out infinite;
  }
  @keyframes pulsedot {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.4; transform:scale(1.5); }
  }
  .gpd-tag-pill span {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #e31e24;
    font-family: 'Sora', sans-serif;
  }
  .gpd-form-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(24px,2.6vw,32px); font-weight: 700;
    color: #fff; line-height: 1.1; letter-spacing: -0.4px;
    margin: 0 0 6px;
  }
  .gpd-form-sub {
    font-family: 'Sora', sans-serif;
    font-size: 12.5px; color: rgba(255,255,255,0.35);
    line-height: 1.7; font-weight: 300; margin: 0 0 26px;
  }
  .gpd-fields-block { display: flex; flex-direction: column; gap: 14px; }
  .gpd-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .gpd-field-row.full { grid-template-columns: 1fr; }
  .gpd-field { display: flex; flex-direction: column; gap: 6px; }
  .gpd-field label {
    font-size: 9.5px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: rgba(255,255,255,0.3);
    font-family: 'Sora', sans-serif;
  }
  .gpd-input-wrap { position: relative; }
  .gpd-input-icon {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.2); pointer-events: none;
    display: flex; align-items: center;
  }
  .gpd-f {
    width: 100%; padding: 11px 14px 11px 38px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; font-family: 'Sora', sans-serif;
    font-size: 12.5px; color: #fff; outline: none;
    box-sizing: border-box;
    transition: border-color .2s, background .2s;
  }
  .gpd-f::placeholder { color: rgba(255,255,255,0.18); }
  .gpd-f:focus {
    border-color: rgba(227,30,36,0.5);
    background: rgba(227,30,36,0.04);
  }
  .gpd-btn-submit {
    width: 100%; padding: 13px 20px;
    background: #e31e24;
    color: #fff; border: none; border-radius: 10px;
    font-family: 'Sora', sans-serif; font-size: 11.5px;
    font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 10px;
    transition: background .2s, transform .15s, opacity .2s;
    margin-top: 10px;
  }
  .gpd-btn-submit:hover:not(:disabled) { background: #c01820; transform: translateY(-1px); }
  .gpd-btn-submit:disabled { opacity: 0.75; cursor: not-allowed; }
  .gpd-spinner {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
    animation: gpdSpin 0.7s linear infinite; flex-shrink: 0;
  }
  @keyframes gpdSpin { to { transform: rotate(360deg); } }
  .gpd-privacy {
    font-size: 9.5px; color: rgba(255,255,255,0.18);
    text-align: center; margin-top: 10px;
    font-family: 'Sora', sans-serif;
  }
  .gpd-success {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; gap: 12px; padding: 20px;
    min-height: 320px;
  }
  .gpd-success-ring {
    width: 60px; height: 60px; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin-bottom: 6px;
  }
  .gpd-success h3 {
    font-family: 'Sora', sans-serif;
    font-size: 26px; font-weight: 700; color: #fff; margin: 0;
  }
  .gpd-success p {
    font-family: 'Sora', sans-serif;
    font-size: 12.5px; color: rgba(255,255,255,0.35);
    line-height: 1.8; max-width: 280px; margin: 0;
  }
  .gpd-success p strong { color: rgba(255,255,255,0.75); font-weight: 600; }
  .gpd-done-btn {
    margin-top: 8px; padding: 10px 30px;
    background: transparent; color: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.14); border-radius: 10px;
    font-family: 'Sora', sans-serif; font-size: 10.5px;
    font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
    cursor: pointer; transition: border-color .2s, color .2s;
  }
  .gpd-done-btn:hover { border-color: #e31e24; color: #fff; }
  .gpd-image-col {
    position: relative; overflow: hidden; max-height: 88vh;
  }
  .gpd-image-col img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .gpd-image-col::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
    pointer-events: none;
  }
  .gpd-close-btn {
    position: absolute; top: 16px; right: 16px;
    z-index: 10; width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    transition: background 0.2s, transform 0.25s;
  }
  .gpd-close-btn:hover { background: rgba(255,255,255,0.16); transform: rotate(90deg); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .stats-inner { grid-template-columns: repeat(3, 1fr); }
    .stat-item:nth-child(4), .stat-item:nth-child(5) { border-top: 1px solid rgba(255,255,255,0.15); }
    .timeline-track { grid-template-columns: 1fr 1fr; }
    .timeline-node:nth-child(3), .timeline-node:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
    .mvv-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; }
    .cta-inner-about { flex-direction: column; text-align: center; }
    .trust-inner { flex-direction: column; align-items: flex-start; gap: 32px; }
    .trust-label { border-right: none; border-bottom: 1px solid var(--warm-mid); padding-bottom: 16px; padding-right: 0; margin-right: 0; }
    .story-mini-stats { gap: 0; }
    .story-mini-stat { padding: 0 20px; }
  }
  
 @media (max-width: 768px) {
    .hero-bg-desktop {
      display: none !important;
    }
    
    .hero-bg-mobile {
      display: block !important;
    }
    
    .hero-content {
      padding: 0 24px 60px;
    }
    
    .hero-headline {
      font-size: clamp(36px, 10vw, 56px);
      letter-spacing: -1px;
    }
    
    .hero-ghost-text {
      font-size: clamp(80px, 18vw, 120px);
      left: -10%;
      letter-spacing: -2px;
    }
    
    .hero-sub.hide-on-mobile,
    .hero-scroll-hint.hide-on-mobile {
      display: none !important;
    }
    
    .gpd-modal-card { grid-template-columns: 1fr !important; max-width: 480px; }
    .gpd-image-col { display: none !important; }
    .gpd-form-col { padding: 30px 26px !important; }
  }
  @media (max-width: 640px) {
    .container { padding: 0 24px; }
    .hero-content { padding: 0 20px 80px; }
    
    .hero-headline {
      font-size: clamp(32px, 10vw, 44px);
    }
    
    .hero-eyebrow {
      font-size: 10px;
      letter-spacing: 2px;
    }
    
    .hero-ghost-text {
      font-size: clamp(60px, 16vw, 90px);
    }
    
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
    .gpd-modal-backdrop { padding: 0 !important; align-items: flex-end !important; }
    .gpd-modal-card {
      max-width: 100% !important; width: 100%;
      max-height: 92dvh !important; border-radius: 20px 20px 0 0 !important;
      transform: translateY(100%) !important;
    }
    .gpd-modal-backdrop.entering .gpd-modal-card,
    .gpd-modal-backdrop.entered .gpd-modal-card { transform: translateY(0) !important; }
    .gpd-modal-backdrop.leaving .gpd-modal-card { transform: translateY(100%) !important; }
    .gpd-form-col { max-height: 92dvh !important; padding: 26px 18px !important; }
    .gpd-field-row { grid-template-columns: 1fr !important; }
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
  const ctxRef = useRef(null);
  const timerRef = useRef(null);

  // ── Enquiry Modal State ──
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPhase, setEnquiryPhase] = useState("idle");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryFormData, setEnquiryFormData] = useState({
    name: "", phone: "", email: "", city: "",
  });

  // ── Open / Close ──
  const openEnquiry = useCallback(() => {
    setEnquirySubmitted(false);
    setEnquiryLoading(false);
    setEnquiryFormData({ name: "", phone: "", email: "", city: "" });
    setEnquiryOpen(true);
    setEnquiryPhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnquiryPhase("entering"));
    });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEnquiryPhase("entered"), 380);
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryPhase("leaving");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setEnquiryOpen(false);
      setEnquiryPhase("idle");
      setEnquirySubmitted(false);
      setEnquiryFormData({ name: "", phone: "", email: "", city: "" });
      setEnquiryLoading(false);
    }, 280);
  }, []);

  const handleEnquiryChange = (e) =>
    setEnquiryFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    setTimeout(() => {
      setEnquiryLoading(false);
      setEnquirySubmitted(true);
    }, 1500);
  };

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = enquiryOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [enquiryOpen]);

  // ── Escape key ──
  useEffect(() => {
    if (!enquiryOpen) return;
    const fn = (e) => { if (e.key === "Escape") closeEnquiry(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [enquiryOpen, closeEnquiry]);

  // ── GSAP ──
  useEffect(() => {
    let isMounted = true;

    const initGSAP = async () => {
      try {
        const [gsapModule, scrollTriggerModule, splitTextModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/SplitText"),
        ]);

        const gsap = gsapModule.default || gsapModule;
        const ScrollTrigger = scrollTriggerModule.default || scrollTriggerModule;
        const SplitText = splitTextModule.default || splitTextModule;

        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (!isMounted || !pageRef.current) return;

        const ctx = gsap.context(() => {
          const pg = pageRef.current;
          if (!pg) return;

          const safeQuery = (selector) => pg.querySelector(selector);

          const clipReveal = (el, trigger, delay = 0) => {
            if (!el) return;
            const split = new SplitText(el, { type: "words,lines", linesClass: "gsap-clip-line" });
            gsap.set(split.words, { y: "115%", opacity: 0 });
            gsap.to(split.words, {
              scrollTrigger: { trigger: trigger || el, start: "top 85%", toggleActions: "play none none none" },
              y: "0%", opacity: 1, stagger: 0.065, duration: 0.8, ease: "expo.out", delay,
            });
          };

          const charStagger = (el, trigger, delay = 0) => {
            if (!el) return;
            const split = new SplitText(el, { type: "chars" });
            gsap.set(split.chars, { opacity: 0, y: 12 });
            gsap.to(split.chars, {
              scrollTrigger: { trigger: trigger || el, start: "top 88%", toggleActions: "play none none none" },
              opacity: 1, y: 0, stagger: 0.028, duration: 0.45, ease: "power3.out", delay,
            });
          };

          const fadeUp = (el, trigger, delay = 0, y = 20) => {
            if (!el) return;
            gsap.from(el, {
              scrollTrigger: { trigger: trigger || el, start: "top 87%", toggleActions: "play none none none" },
              y, opacity: 0, duration: 0.7, ease: "power3.out", delay,
            });
          };

          // HERO
          const heroGhost = safeQuery(".hero-ghost-text");
          if (heroGhost) gsap.from(heroGhost, { x: -80, opacity: 0, duration: 2, ease: "expo.out", delay: 0.2 });

          const heroEyebrow = safeQuery(".hero-eyebrow");
          if (heroEyebrow) {
            const split = new SplitText(heroEyebrow, { type: "chars" });
            gsap.from(split.chars, { opacity: 0, y: 10, stagger: 0.03, duration: 0.5, ease: "power3.out", delay: 0.5 });
          }

          const heroHeadline = safeQuery(".hero-headline");
          if (heroHeadline) {
            const split = new SplitText(heroHeadline, { type: "words,lines", linesClass: "hero-clip-line" });
            gsap.set(split.words, { y: "115%", opacity: 0 });
            gsap.to(split.words, { y: "0%", opacity: 1, stagger: 0.08, duration: 1, ease: "expo.out", delay: 0.7 });
          }

          const heroSub = safeQuery(".hero-sub");
          if (heroSub) {
            const split = new SplitText(heroSub, { type: "words" });
            gsap.from(split.words, { opacity: 0, y: 8, stagger: 0.03, duration: 0.5, ease: "power2.out", delay: 1.1 });
          }

          const heroScrollHint = safeQuery(".hero-scroll-hint");
          if (heroScrollHint) gsap.from(heroScrollHint, { opacity: 0, y: 10, duration: 0.6, ease: "power2.out", delay: 1.5 });

          // STATS BAR
          if (statsRef.current) {
            gsap.from(pg.querySelectorAll(".stat-item"), {
              scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none none" },
              y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
            });
            pg.querySelectorAll(".stat-number").forEach((num) => charStagger(num, statsRef.current, 0.1));
          }

          // STORY
          const storySection = safeQuery(".section-story");
          if (storySection) {
            const storyCentered = safeQuery(".story-centered");
            if (storyCentered) {
              const sectionTag = storyCentered.querySelector(".section-tag");
              const sectionHeading = storyCentered.querySelector(".section-heading");
              const sectionBodyElements = storyCentered.querySelectorAll(".section-body");
              const storyDivider = storyCentered.querySelector(".story-divider");
              const storySignature = storyCentered.querySelector(".story-signature");

              if (sectionTag) charStagger(sectionTag, storySection);
              if (sectionHeading) clipReveal(sectionHeading, storySection, 0.1);
              sectionBodyElements.forEach((p, i) => {
                const split = new SplitText(p, { type: "words" });
                gsap.from(split.words, {
                  scrollTrigger: { trigger: p, start: "top 88%", toggleActions: "play none none none" },
                  opacity: 0, y: 6, stagger: 0.025, duration: 0.4, ease: "power2.out", delay: 0.1 * i,
                });
              });
              if (storyDivider) {
                gsap.from(storyDivider, {
                  scrollTrigger: { trigger: storyDivider, start: "top 88%", toggleActions: "play none none none" },
                  scaleX: 0, transformOrigin: "center center", duration: 0.7, ease: "power3.out",
                });
              }
              if (storySignature) fadeUp(storySignature, storySignature, 0.2);
              const miniStatsContainer = storyCentered.querySelector(".story-mini-stats");
              if (miniStatsContainer) {
                storyCentered.querySelectorAll(".story-mini-stat").forEach((stat, i) => {
                  gsap.from(stat, {
                    scrollTrigger: { trigger: miniStatsContainer, start: "top 88%", toggleActions: "play none none none" },
                    y: 24, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1 + i * 0.1,
                  });
                  const numEl = stat.querySelector(".sms-num");
                  if (numEl) charStagger(numEl, miniStatsContainer, 0.2 + i * 0.1);
                });
              }
            }
          }

          // TIMELINE
          const tlSection = safeQuery(".section-timeline");
          if (tlSection) {
            const ghost = tlSection.querySelector(".timeline-ghost");
            if (ghost) gsap.from(ghost, { scrollTrigger: { trigger: tlSection, start: "top 85%", toggleActions: "play none none none" }, scale: 1.15, opacity: 0, duration: 1.2, ease: "expo.out" });
            const tlSectionTag = tlSection.querySelector(".section-tag");
            const tlHeading = tlSection.querySelector(".timeline-heading");
            const tlTrack = tlSection.querySelector(".timeline-track");
            if (tlSectionTag) charStagger(tlSectionTag, tlSection);
            if (tlHeading) clipReveal(tlHeading, tlSection, 0.1);
            if (tlTrack) {
              const tlNodes = tlSection.querySelectorAll(".timeline-node");
              gsap.from(tlNodes, { scrollTrigger: { trigger: tlTrack, start: "top 80%", toggleActions: "play none none none" }, y: 50, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out", delay: 0.2 });
              tlNodes.forEach((node, i) => {
                const year = node.querySelector(".tl-year");
                const dot = node.querySelector(".tl-dot");
                const title = node.querySelector(".tl-title");
                if (year) gsap.from(year, { scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none none" }, opacity: 0, x: -20, duration: 0.6, ease: "power3.out", delay: 0.1 + i * 0.08 });
                if (dot) gsap.from(dot, { scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none none" }, scale: 0, duration: 0.4, ease: "back.out(3)", delay: 0.25 + i * 0.08 });
                if (title) {
                  const titleSplit = new SplitText(title, { type: "chars" });
                  gsap.from(titleSplit.chars, { scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none none" }, opacity: 0, y: 8, stagger: 0.025, duration: 0.4, ease: "power2.out", delay: 0.3 + i * 0.08 });
                }
              });
            }
          }

          // MVV
          const mvvSection = safeQuery(".section-mvv");
          if (mvvSection) {
            const mvvSectionTag = mvvSection.querySelector(".section-tag");
            const mvvHeading = mvvSection.querySelector(".section-heading");
            if (mvvSectionTag) charStagger(mvvSectionTag, mvvSection);
            if (mvvHeading) clipReveal(mvvHeading, mvvSection, 0.1);
            mvvSection.querySelectorAll(".mvv-card").forEach((card, i) => {
              gsap.from(card, { scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" }, y: 40, opacity: 0, duration: 0.65, ease: "power3.out", delay: i * 0.12 });
              const mvvNumber = card.querySelector(".mvv-number");
              if (mvvNumber) gsap.from(mvvNumber, { scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" }, opacity: 0, x: -20, duration: 0.5, ease: "power3.out", delay: 0.1 + i * 0.12 });
              const mvvTitle = card.querySelector(".mvv-title");
              if (mvvTitle) {
                const titleSplit = new SplitText(mvvTitle, { type: "chars" });
                gsap.from(titleSplit.chars, { scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" }, opacity: 0, y: 8, stagger: 0.025, duration: 0.4, ease: "power2.out", delay: 0.2 + i * 0.12 });
              }
            });
          }

          // WHY US
          const whySection = safeQuery(".section-why");
          if (whySection) {
            const whySectionTag = whySection.querySelector(".section-tag");
            const whyHeading = whySection.querySelector(".why-heading");
            const whyBody = whySection.querySelector(".why-body");
            if (whySectionTag) charStagger(whySectionTag, whySection);
            if (whyHeading) clipReveal(whyHeading, whySection, 0.1);
            if (whyBody) {
              const split = new SplitText(whyBody, { type: "words" });
              gsap.from(split.words, { scrollTrigger: { trigger: whyBody, start: "top 87%", toggleActions: "play none none none" }, opacity: 0, y: 6, stagger: 0.03, duration: 0.45, ease: "power2.out", delay: 0.2 });
            }
            whySection.querySelectorAll(".why-item").forEach((item, i) => {
              gsap.from(item, { scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" }, y: 30, opacity: 0, duration: 0.55, ease: "power3.out", delay: i * 0.07 });
              const whyIcon = item.querySelector(".why-icon");
              if (whyIcon) gsap.from(whyIcon, { scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" }, scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2.5)", delay: 0.12 + i * 0.07 });
            });
          }

          // TRUST STRIP
          const trustSection = safeQuery(".section-trust");
          if (trustSection) {
            const trustLabel = trustSection.querySelector(".trust-label");
            if (trustLabel) charStagger(trustLabel, trustSection);
            trustSection.querySelectorAll(".trust-item").forEach((item, i) => {
              gsap.from(item, { scrollTrigger: { trigger: trustSection, start: "top 85%", toggleActions: "play none none none" }, y: 20, opacity: 0, duration: 0.55, ease: "power3.out", delay: 0.1 + i * 0.08 });
              const trustIcon = item.querySelector(".trust-item-icon");
              if (trustIcon) gsap.from(trustIcon, { scrollTrigger: { trigger: trustSection, start: "top 85%", toggleActions: "play none none none" }, scale: 0, duration: 0.4, ease: "back.out(2.5)", delay: 0.2 + i * 0.08 });
            });
          }

          // FINAL CTA
          const ctaSection = safeQuery(".section-cta");
          if (ctaSection) {
            const ctaSectionTag = ctaSection.querySelector(".section-tag");
            const ctaHeading = ctaSection.querySelector(".final-cta-heading");
            const ctaButtons = ctaSection.querySelector(".cta-buttons");
            if (ctaSectionTag) charStagger(ctaSectionTag, ctaSection);
            if (ctaHeading) clipReveal(ctaHeading, ctaSection, 0.15);
            if (ctaButtons) {
              const buttons = ctaButtons.querySelectorAll("button, a");
              gsap.set(buttons, { opacity: 1, x: 0 });
              gsap.from(buttons, { scrollTrigger: { trigger: ctaButtons, start: "top 88%", toggleActions: "play none none none" }, x: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", delay: 0.2 });
            }
          }

          ScrollTrigger.refresh();
        }, pageRef);

        ctxRef.current = ctx;
      } catch (error) {
        console.error("Failed to initialize GSAP animations:", error);
      }
    };

    initGSAP();

    return () => {
      isMounted = false;
      if (ctxRef.current) { ctxRef.current.revert(); ctxRef.current = null; }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="about-page" ref={pageRef}>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg-desktop" />
          <div className="hero-bg-mobile" />
          <div className="hero-grid-lines" />
          <div className="hero-ghost-text">GENUINE</div>
          <div className="hero-content">
            <div className="hero-eyebrow">Our Story</div>
            <h1 className="hero-headline">
              Trusted<br />
              Land Promoters<br />
              <em>
                in Chennai<br />
                <span className="since-year">Since 2009</span>
              </em>
            </h1>
            <p className="hero-sub hide-on-mobile">
              15+ Years of Trust
            </p>
            <div className="hero-scroll-hint hide-on-mobile">
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
                A Legacy Built on<br /><em>Trust &amp; Land.</em>
              </h2>
              <div className="story-divider" />
              <p className="section-body">
                Genuine Property Developers was born from a simple belief — that every family deserves access to premium land in prime locations, backed by legal security and world-class infrastructure. From our first 100-plot community in 2009 to the sprawling 100-acre Genuine Green City today, we've never wavered on the principles that define us: transparency, quality, and a genuine commitment to the futures of our customers.
              </p>
              <div className="story-signature">
                <div className="sig-avatar">R</div>
                <div>
                  <div className="sig-name">Karthick</div>
                  <div className="sig-role">Founder &amp; Chairman, Genuine Property Developers</div>
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
                <button className="why-cta" onClick={openEnquiry}>
                  ENQUIRE NOW →
                </button>
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
            <div className="cta-inner-about">
              <div className="cta-text">
                <div className="section-tag">Take the Next Step</div>
                <h2 className="final-cta-heading">
                  Your Dream Plot is<br />Just a Visit Away.
                </h2>
              </div>
              <div className="cta-buttons">
                <button className="btn-white" onClick={openEnquiry}>
                  ENQUIRE NOW
                </button>
                <button className="btn-outline-white" onClick={openEnquiry}>
                  Explore Projects →
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════
          ENQUIRY MODAL
      ══════════════════════════════════════ */}
      {enquiryOpen && (
        <div
          className={`gpd-modal-backdrop${enquiryPhase !== "idle" ? ` ${enquiryPhase}` : ""}`}
          onClick={closeEnquiry}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>

            <button className="gpd-close-btn" onClick={closeEnquiry} aria-label="Close">✕</button>

            <div className="gpd-form-col">
              {!enquirySubmitted ? (
                <>
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>Quick Enquiry</span>
                  </div>
                  <h2 className="gpd-form-heading">Get In Touch</h2>
                  <p className="gpd-form-sub">Share your details and our team will reach out to you shortly.</p>

                  <form onSubmit={handleEnquirySubmit} className="gpd-fields-block">
                    <div className="gpd-field-row">
                      <div className="gpd-field">
                        <label>Full Name <span style={{ color: "#b03030" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </span>
                          <input className="gpd-f" type="text" name="name" required placeholder="Your name" value={enquiryFormData.name} onChange={handleEnquiryChange} />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Phone <span style={{ color: "#b03030" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          </span>
                          <input className="gpd-f" type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" value={enquiryFormData.phone} onChange={handleEnquiryChange} />
                        </div>
                      </div>
                    </div>

                    <div className="gpd-field-row">
                      <div className="gpd-field">
                        <label>Email</label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          </span>
                          <input className="gpd-f" type="email" name="email" placeholder="you@email.com" value={enquiryFormData.email} onChange={handleEnquiryChange} />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>City</label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          </span>
                          <input className="gpd-f" type="text" name="city" placeholder="Chennai, Bangalore…" value={enquiryFormData.city} onChange={handleEnquiryChange} />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="gpd-btn-submit" disabled={enquiryLoading}>
                      {enquiryLoading ? (
                        <>
                          <span className="gpd-spinner" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polyline points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="gpd-privacy">🔒 Your information is safe with us. No spam, ever.</p>
                  </form>
                </>
              ) : (
                <div className="gpd-success">
                  <div className="gpd-success-ring">✅</div>
                  <h3>Thank You!</h3>
                  <p>
                    Thank you, <strong>{enquiryFormData.name}</strong>. Your enquiry has been received. Our team will contact you shortly.
                  </p>
                  <button className="gpd-done-btn" onClick={closeEnquiry}>CLOSE</button>
                </div>
              )}
            </div>

            <div className="gpd-image-col">
              <img src="form-1.png" alt="GPD Project" />
            </div>

          </div>
        </div>
      )}
    </>
  );
}