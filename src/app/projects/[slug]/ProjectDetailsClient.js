"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck, TreePine, Baby, Route as RoadIcon, Droplet, Zap,
  Droplets, Trees, Lamp, Lightbulb, Building2, Camera,
  CheckCircle2, ArrowRight, ChevronRight, Phone, Ruler,
  LayoutGrid, Leaf, Download, MapPin, Clock, X,
} from "lucide-react";
import GsapTextAnimations from "@/components/GsapTextAnimations";

const RED = "#b82a2a";
const BORDER = "#e8e2de";
const API_URL = "https://genuinepropertydevelopers.com/backend/send_details.php";

const STAT_ICONS = { area: Ruler, plots: LayoutGrid, green: Leaf, approved: ShieldCheck };

const HIGHLIGHT_ICONS = {
  road: RoadIcon, electric: Zap, sewage: Droplets, water: Droplet,
  parks: Trees, lights: Lightbulb, community: Building2, security: Camera,
};

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

const TIME_SLOTS = [
  { label: "9:00 AM – 11:00 AM", icon: "☀️" },
  { label: "11:00 AM – 1:00 PM", icon: "🌤" },
  { label: "2:00 PM – 4:00 PM",  icon: "⛅" },
  { label: "4:00 PM – 6:00 PM",  icon: "🌇" },
];

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Sora:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .gpd-main {
    font-family: 'Sora', sans-serif;
    background: #ffffff;
    color: #2b2b2b;
    overflow-x: hidden;
  }

  /* ════ MODAL OVERLAY ════ */
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

  .gpd-close-btn {
    position: absolute; top: 16px; right: 16px;
    z-index: 10; width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, transform 0.25s;
  }
  .gpd-close-btn:hover { background: rgba(255,255,255,0.16); transform: rotate(90deg); }

  /* ─── FORM COLUMN ─── */
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
    background: rgba(184,42,42,0.1);
    border: 1px solid rgba(184,42,42,0.25);
    border-radius: 100px; padding: 5px 14px 5px 10px;
    width: fit-content; margin-bottom: 16px;
  }
  .gpd-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #b82a2a;
    animation: pulsedot 1.8s ease-in-out infinite;
  }
  @keyframes pulsedot {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.4; transform:scale(1.5); }
  }
  .gpd-tag-pill span {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #b82a2a;
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

  .gpd-steps-row {
    display: flex; align-items: center;
    gap: 0; margin-bottom: 26px;
  }
  .gpd-step-item {
    display: flex; align-items: center; gap: 7px;
    flex: 1; position: relative;
  }
  .gpd-step-item:not(:last-child)::after {
    content: ''; position: absolute;
    left: 24px; right: -4px; top: 50%;
    height: 1px; background: rgba(255,255,255,0.1); z-index: 0;
    transition: background 0.3s ease;
  }
  .gpd-step-item.done::after { background: #b82a2a; }
  .gpd-step-num {
    width: 24px; height: 24px; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3);
    font-family: 'Sora', sans-serif; flex-shrink: 0;
    position: relative; z-index: 1;
    background: #0d0d0d; transition: all .25s;
  }
  .gpd-step-item.active .gpd-step-num {
    border-color: #b82a2a; background: #b82a2a; color: #fff;
  }
  .gpd-step-item.done .gpd-step-num {
    border-color: #b82a2a;
    background: rgba(184,42,42,0.12); color: #b82a2a;
  }
  .gpd-step-label {
    font-size: 9.5px; font-weight: 600; letter-spacing: .07em;
    text-transform: uppercase; color: rgba(255,255,255,0.25);
    font-family: 'Sora', sans-serif; white-space: nowrap;
    display: none;
  }
  .gpd-step-item.active .gpd-step-label {
    color: rgba(255,255,255,0.7); display: block;
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
  .gpd-input-icon.top { top: 14px; transform: none; }
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
    border-color: rgba(184,42,42,0.5);
    background: rgba(184,42,42,0.04);
  }
  .gpd-f.no-icon { padding-left: 14px; }
  select.gpd-f {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center;
    padding-right: 36px; color: rgba(255,255,255,0.45);
  }
  select.gpd-f option { background: #1c1c1c; color: #fff; }
  textarea.gpd-f { resize: none; height: 64px; padding-top: 11px; padding-left: 14px; }

  .gpd-time-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  }
  .gpd-slot {
    padding: 10px 12px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; background: rgba(255,255,255,0.03);
    font-size: 11.5px; font-weight: 600; letter-spacing: .03em;
    color: rgba(255,255,255,0.4); cursor: pointer; text-align: center;
    font-family: 'Sora', sans-serif; transition: all .18s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    user-select: none;
  }
  .gpd-slot:hover { border-color: rgba(184,42,42,0.35); color: rgba(255,255,255,.75); }
  .gpd-slot.selected {
    border-color: #b82a2a;
    background: rgba(184,42,42,0.1); color: #fff;
  }

  .gpd-summary-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 16px 18px;
    display: flex; flex-direction: column; gap: 0;
  }
  .gpd-summary-row {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .gpd-summary-row:last-child { border-bottom: none; }
  .gpd-summary-icon {
    width: 28px; height: 28px; border-radius: 8px;
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .gpd-summary-label {
    font-size: 9.5px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(255,255,255,0.25);
    font-family: 'Sora', sans-serif; flex: 1;
  }
  .gpd-summary-val {
    font-size: 11.5px; color: rgba(255,255,255,0.75);
    font-family: 'Sora', sans-serif; text-align: right;
  }

  .gpd-btn-row {
    display: flex; gap: 10px; margin-top: 24px;
  }
  .gpd-btn-back {
    padding: 12px 20px; background: transparent;
    border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
    color: rgba(255,255,255,0.5); font-family: 'Sora', sans-serif;
    font-size: 11.5px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer;
    display: flex; align-items: center; gap: 7px;
    transition: all .2s;
  }
  .gpd-btn-back:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
  .gpd-btn-next {
    flex: 1; padding: 13px 20px; background: #b82a2a;
    color: #fff; border: none; border-radius: 10px;
    font-family: 'Sora', sans-serif; font-size: 11.5px;
    font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 10px;
    transition: background .2s, transform .15s;
  }
  .gpd-btn-next:hover { background: #8f1f1f; transform: translateY(-1px); }
  .gpd-btn-confirm {
    flex: 1; padding: 13px 20px; background: #0f9a60;
    color: #fff; border: none; border-radius: 10px;
    font-family: 'Sora', sans-serif; font-size: 11.5px;
    font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 10px;
    transition: background .2s, transform .15s;
  }
  .gpd-btn-confirm:hover { background: #0b7d4d; transform: translateY(-1px); }

  .gpd-btn-brochure {
    width: 100%; padding: 13px 20px;
    background: #b82a2a;
    color: #fff; border: none; border-radius: 10px;
    font-family: 'Sora', sans-serif; font-size: 11.5px;
    font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 10px;
    transition: background .2s, transform .15s, opacity .2s;
  }
  .gpd-btn-brochure:hover:not(:disabled) {
    background: #8f1f1f;
    transform: translateY(-1px);
  }
  .gpd-btn-brochure:disabled { opacity: 0.75; cursor: not-allowed; }

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
  .gpd-done-btn:hover { border-color: #b82a2a; color: #fff; }

  .gpd-image-col {
    position: relative; overflow: hidden;
    max-height: 88vh;
  }
  .gpd-image-col img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .gpd-image-col::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
    pointer-events: none;
  }

  /* ════ HERO ════ */
  .hero-section { padding: 0; }
  .hero-inner   { max-width: 1280px; margin: 0 auto; padding: 0 40px; }

  .hero-banner {
    position: relative;
    width: 100%;
    height: 570px;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 768px) {
    .hero-banner {
      height: 858px;
      background-position: center top;
      background-size: cover;
    }
  }

  .hero-banner-content {
    display: flex;
    align-items: center;
    padding: 0 52px;
    max-width: 580px;
    width: 100%;
    position: relative;
    z-index: 2;
    margin-top: 108px;
    margin-left: 300px;
  }

  .hero-accent-line {
    width: 3px;
    height: 88px;
    background: #b82a2a;
    margin-right: 30px;
    flex-shrink: 0;
    border-radius: 2px;
  }

  .hero-eyebrow {
    font-size: 10px;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: #b82a2a;
    font-weight: 700;
    margin-bottom: 14px;
  }

  .hero-h1 {
    font-family: 'Sora', sans-serif;
    font-size: 42px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
    line-height: 1.1;
    letter-spacing: 0.3px;
  }

  .hero-subtext {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    margin: 0 0 28px;
    line-height: 1.7;
    max-width: 310px;
    font-weight: 400;
  }

  .hero-cta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .hero-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: #b82a2a;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 13px 24px;
    border-radius: 5px;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font-family: 'Sora', sans-serif;
  }

  .hero-cta-ghost {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.7);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 13px 22px;
    border-radius: 5px;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    background: transparent;
    font-family: 'Sora', sans-serif;
  }

  .hero-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    padding: 24px 0 0;
    color: #9c8f86;
    flex-wrap: wrap;
  }

  .hero-intro-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 40px;
    padding: 32px 4px 2px;
    align-items: start;
  }

  .hero-h2 {
    font-size: 40px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 6px 0 10px;
    color: #1f1f1f;
    line-height: 1.1;
  }

  .hero-subtitle {
    font-size: 18px;
    font-weight: 600;
    color: #5c5450;
    margin: 0 0 16px;
  }

  .hero-overview {
    font-size: 15px;
    line-height: 1.9;
    color: #5c5450;
    margin: 0 0 32px;
    max-width: 520px;
  }

  .hero-stats-row-below { display: flex; gap: 32px; flex-wrap: wrap; }

  .stat-icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid #b82a2a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b82a2a;
    flex-shrink: 0;
  }

  .details-card {
    background: #fff;
    border: 1px solid #e8e2de;
    border-radius: 12px;
    box-shadow: 0 14px 40px rgba(0,0,0,0.05);
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 32px;
  }

  .details-card-item {
    padding: 16px 0;
    border-bottom: 1px solid #e8e2de;
  }

  .details-card-item.no-border { border-bottom: none; }

  /* ════ ABOUT ════ */
  .about-section { max-width: 1200px; margin: 0 auto; padding: 20px 40px 70px; }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 48px;
    margin-bottom: 56px;
  }

  .about-h2 {
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #1f1f1f;
    margin: 0 0 10px;
  }

  .red-line { display: block; width: 44px; height: 3px; background: #b82a2a; margin-bottom: 18px; }

  .key-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 40px;
    align-content: center;
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .highlight-card {
    border: 1px solid #e8e2de;
    border-radius: 10px;
    padding: 28px 16px;
    text-align: center;
    background: #fff;
  }

  /* ════ MASTER PLAN ════ */
  .masterplan-section { max-width: 1200px; margin: 0 auto; padding: 0 40px 70px; }

  .masterplan-heading-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
  }

  .masterplan-h2 {
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #1f1f1f;
    margin: 0 0 8px;
  }

  .masterplan-download-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid #b82a2a;
    color: #b82a2a;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 12px 20px;
    border-radius: 6px;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
    background: transparent;
    font-family: 'Sora', sans-serif;
  }

  .masterplan-image-wrap {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e8e2de;
    background: #f5f0ec;
    width: 100%;
    aspect-ratio: 16 / 7;
    margin-bottom: 52px;
  }

  .masterplan-lower-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 0.9fr;
    gap: 40px;
    align-items: start;
  }

  .mp-h3 {
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #1f1f1f;
    margin: 0 0 8px;
  }

  .mp-red-line { display: block; width: 36px; height: 3px; background: #b82a2a; margin-bottom: 20px; }

  .mp-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .mp-th {
    text-align: left;
    font-size: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #9c8f86;
    border-bottom: 1.5px solid #e8e2de;
    padding: 0 8px 10px 0;
    font-weight: 700;
    word-break: break-word;
  }

  .mp-td {
    padding: 13px 8px 13px 0;
    border-bottom: 1px solid #e8e2de;
    font-size: 13px;
    color: #5c5450;
    word-break: break-word;
  }

  .mp-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  .check-availability-btn {
    display: inline-block;
    margin-top: 20px;
    border: 1.5px solid #b82a2a;
    color: #b82a2a;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    font-family: 'Sora', sans-serif;
  }

  .location-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 11px 0;
    border-bottom: 1px solid #e8e2de;
    font-size: 14px;
    color: #3a3a3a;
    line-height: 1.5;
  }

  .map-wrap {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e8e2de;
    height: 220px;
  }

  /* ════ NEARBY LANDMARKS ════ */
  .landmarks-section { max-width: 1200px; margin: 0 auto; padding: 0 40px 70px; }

  .landmarks-h2 {
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #1f1f1f;
    margin: 0 0 8px;
  }

  .landmarks-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
  }

  .landmark-card {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: #111;
    border: 1px solid #e8e2de;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
  }

  .landmark-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.16);
  }

  .landmark-card-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .landmark-card:hover .landmark-card-img {
    transform: scale(1.08);
  }

  .landmark-card-scrim {
    position: absolute;
    inset: 0;
  }

  .landmark-card-accent {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: #b82a2a;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }

  .landmark-card:hover .landmark-card-accent {
    transform: scaleX(1);
  }

  .landmark-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .landmark-card-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(10,8,6,0.55);
    border: 1px solid rgba(255,255,255,0.18);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    padding: 4px 10px 4px 8px;
    font-size: 11px;
    font-weight: 600;
    color: #f1ece9;
    letter-spacing: 0.2px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* ════ CTA BANNER ════ */
  .cta-banner {
    background: linear-gradient(100deg, #b82a2a 0%, #8f1f1f 100%);
    color: #fff;
    padding: 60px 40px;
  }

  .cta-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .cta-h3 {
    font-family: 'Sora', sans-serif;
    font-size: 32px;
    margin: 0 0 6px;
    font-weight: 700;
  }

  .cta-p { margin: 0; color: #f3e9e4; font-size: 15px; }

  .cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }

  .cta-primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    color: #b82a2a;
    font-weight: 700;
    font-size: 14px;
    padding: 14px 24px;
    border-radius: 6px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-family: 'Sora', sans-serif;
  }

  .cta-secondary-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid rgba(255,255,255,0.5);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 14px 24px;
    border-radius: 6px;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    font-family: 'Sora', sans-serif;
  }

  .cta-brochure-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid rgba(255,255,255,0.5);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 14px 24px;
    border-radius: 6px;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    font-family: 'Sora', sans-serif;
    transition: border-color 0.2s;
  }
  .cta-brochure-btn:hover { border-color: rgba(255,255,255,0.9); }

  .section-eyebrow {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #b82a2a;
    font-weight: 700;
    margin-bottom: 10px;
  }

  /* ════════════════════════════════════════
     RESPONSIVE BREAKPOINTS
  ════════════════════════════════════════ */

  @media (max-width: 1279px) {
    .hero-inner         { padding: 0 32px; }
    .about-section      { padding: 20px 32px 60px; }
    .masterplan-section { padding: 0 32px 60px; }
    .landmarks-section  { padding: 0 32px 60px; }
    .cta-banner         { padding: 52px 32px; }
  }

  @media (max-width: 1023px) {
    .hero-inner         { padding: 0 24px; }
    .about-section      { padding: 20px 24px 56px; }
    .masterplan-section { padding: 0 24px 56px; }
    .landmarks-section  { padding: 0 24px 56px; }
    .cta-banner         { padding: 48px 24px; }

    .hero-banner        { height: 400px; }
    .hero-h1            { font-size: 34px; }
    .hero-banner-content { padding: 0 36px; margin-left: 0; }

    .hero-intro-grid    { grid-template-columns: 1fr; gap: 28px; padding-bottom: 52px; }
    .hero-h2            { font-size: 32px; }
    .hero-overview      { max-width: 100%; }

    .about-grid         { grid-template-columns: 1fr; gap: 32px; }

    .masterplan-lower-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
    .masterplan-lower-grid > div:last-child { grid-column: 1 / -1; }
    .map-wrap           { height: 240px; }

    .cta-inner          { flex-direction: column; align-items: flex-start; }
    .cta-h3             { font-size: 26px; }
  }

  @media (max-width: 899px) {
    .hero-banner        { height: 340px; }
    .hero-h1            { font-size: 28px; }
    .hero-subtext       { font-size: 12px; margin-bottom: 20px; }
    .hero-accent-line   { height: 64px; margin-right: 20px; }

    .highlights-grid    { grid-template-columns: repeat(2, 1fr); }
    .landmarks-grid     { grid-template-columns: repeat(4, 1fr); }
  }

  @media (max-width: 768px) {
    .gpd-modal-card { grid-template-columns: 1fr !important; max-width: 480px; }
    .gpd-image-col { display: none !important; }
    .gpd-form-col { padding: 30px 26px !important; }

    .hero-banner {
      height: 858px;
      background-image: var(--hero-image-mobile) !important;
      background-position: center center;
      background-size: cover;
    }
  }

  @media (max-width: 640px) {
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
    .gpd-time-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 599px) {
    .hero-inner         { padding: 0 16px; }
    .about-section      { padding: 16px 16px 48px; }
    .masterplan-section { padding: 0 16px 48px; }
    .landmarks-section  { padding: 0 16px 48px; }
    .cta-banner         { padding: 40px 16px; }

    .hero-banner        { height: 760px; border-radius: 0; }
    .hero-banner-content { padding: 0 24px; max-width: 100%; margin-left: 0; }
    .hero-h1            { font-size: 24px; }
    .hero-subtext       { display: none; }
    .hero-accent-line   { height: 52px; margin-right: 16px; }
    .hero-cta-ghost     { display: none; }
    .hero-cta-primary   { font-size: 9px; padding: 11px 18px; }

    .hero-intro-grid    { padding: 24px 0 40px; gap: 24px; }
    .hero-h2            { font-size: 26px; }
    .hero-subtitle      { font-size: 15px; }
    .hero-overview      { font-size: 14px; }
    .hero-stats-row-below { gap: 16px; }

    .details-card       { grid-template-columns: 1fr; padding: 20px; }

    .key-features-grid  { grid-template-columns: 1fr; }

    .highlights-grid    { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .highlight-card     { padding: 20px 12px; }

    .masterplan-heading-row { flex-direction: column; align-items: flex-start; }
    .masterplan-download-btn { width: 100%; justify-content: center; }
    .masterplan-lower-grid  { grid-template-columns: 1fr; gap: 32px; }
    .masterplan-lower-grid > div:last-child { grid-column: auto; }

    .mp-table-desktop   { display: none; }
    .mp-cards-mobile    { display: flex; flex-direction: column; gap: 12px; }
    .mp-card-mobile {
      border: 1px solid #e8e2de;
      border-radius: 8px;
      padding: 14px 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 16px;
    }
    .mp-card-mobile-row { display: flex; flex-direction: column; gap: 2px; }
    .mp-card-label      { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9c8f86; }
    .mp-card-value      { font-size: 13px; color: #5c5450; }
    .mp-card-value.bold { font-weight: 700; color: #1f1f1f; }

    .landmarks-grid     { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .landmark-card-pill { font-size: 10.5px; padding: 3px 9px 3px 7px; }

    .cta-h3             { font-size: 22px; }
    .cta-btns           { flex-direction: column; width: 100%; }
    .cta-primary-btn, .cta-secondary-btn, .cta-brochure-btn {
      width: 100%; justify-content: center; padding: 13px 20px;
    }
  }

  @media (max-width: 479px) {
    .hero-banner        { height: 680px; border-radius: 0; }
    .hero-h1            { font-size: 20px; }
    .hero-eyebrow       { font-size: 8px; letter-spacing: 2px; margin-bottom: 10px; }
    .hero-breadcrumb    { font-size: 12px; }
    .hero-accent-line   { height: 44px; width: 2px; margin-right: 14px; }

    .hero-h2            { font-size: 22px; }
    .hero-subtitle      { font-size: 14px; }
    .about-h2           { font-size: 18px; }
    .masterplan-h2      { font-size: 16px; }
    .mp-h3              { font-size: 14px; }

    .highlights-grid    { grid-template-columns: 1fr 1fr; gap: 10px; }
    .highlight-card     { padding: 16px 8px; }

    .map-wrap           { height: 200px; }

    .cta-h3             { font-size: 20px; }
    .cta-p              { font-size: 14px; }
  }

  @media (max-width: 359px) {
    .hero-inner,
    .about-section,
    .masterplan-section,
    .landmarks-section  { padding-left: 12px; padding-right: 12px; }
    .cta-banner         { padding-left: 12px; padding-right: 12px; }
    .hero-banner        { height: 580px; }
    .hero-h1            { font-size: 17px; }
    .highlights-grid    { grid-template-columns: 1fr; }
    .landmarks-grid     { grid-template-columns: 1fr 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .landmark-card,
    .landmark-card-img,
    .landmark-card-accent { transition: none !important; }
  }
`;

export default function ProjectDetailsClient({ project }) {
  // ── Site Visit modal state ──
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhase, setModalPhase] = useState("idle");
  const [modalType, setModalType] = useState("visit");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    project: "", date: "", message: "",
  });

  // ── Brochure modal state ──
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [brochurePhase, setBrochurePhase] = useState("idle");
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [brochureLoading, setBrochureLoading] = useState(false);
  const [brochureFormData, setBrochureFormData] = useState({
    name: "", phone: "", email: "", city: "",
  });

  const timerRef = useRef(null);
  const brochureTimerRef = useRef(null);
  const stepLabels = ["Your Details", "Project & Date", "Confirm"];

  // ── API call function ──
  const sendToAPI = async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Network error" };
    }
  };

  // ── Site Visit open/close ──
  const openModal = useCallback((type) => {
    setSubmitted(false);
    setStep(1);
    setVisitLoading(false);
    setSelectedSlot("");
    setFormData({
      name: "", phone: "", email: "",
      project: project.name, date: "", message: "",
    });
    setModalType(type);
    setModalOpen(true);
    setModalPhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalPhase("entering"));
    });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setModalPhase("entered"), 380);
  }, [project.name]);

  const closeModal = useCallback(() => {
    setModalPhase("leaving");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setModalOpen(false);
      setModalPhase("idle");
    }, 280);
  }, []);

  // ── Brochure open/close ──
  const openBrochure = useCallback(() => {
    setBrochureSubmitted(false);
    setBrochureLoading(false);
    setBrochureFormData({ name: "", phone: "", email: "", city: "" });
    setBrochureOpen(true);
    setBrochurePhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBrochurePhase("entering"));
    });
    clearTimeout(brochureTimerRef.current);
    brochureTimerRef.current = setTimeout(() => setBrochurePhase("entered"), 380);
  }, []);

  const closeBrochure = useCallback(() => {
    setBrochurePhase("leaving");
    clearTimeout(brochureTimerRef.current);
    brochureTimerRef.current = setTimeout(() => {
      setBrochureOpen(false);
      setBrochurePhase("idle");
      setBrochureSubmitted(false);
      setBrochureFormData({ name: "", phone: "", email: "", city: "" });
      setBrochureLoading(false);
    }, 280);
  }, []);

  const handleBrochureChange = (e) =>
    setBrochureFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── UPDATED: Brochure submit with API + dynamic PDF download ──
  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    setBrochureLoading(true);
    
    // Send to API
    const apiData = {
      name: brochureFormData.name,
      email: brochureFormData.email,
      phone: brochureFormData.phone,
      location: brochureFormData.city,
      message: `Brochure download request for ${project.name}`,
      subject: `Brochure Download - ${project.name}`,
    };
    
    await sendToAPI(apiData);
    
    setTimeout(() => {
      setBrochureLoading(false);
      setBrochureSubmitted(true);
      // Download the specific project brochure
      const link = document.createElement("a");
      link.href = project.brochurePDF || `/brochures/${project.slug}-brochure.pdf`;
      link.download = `${project.name}-Brochure.pdf`;
      link.click();
    }, 1400);
  };

  // ── UPDATED: Site Visit submit with API ──
  const handleVisitSubmit = async () => {
    setVisitLoading(true);
    
    const apiData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.project || project.name,
      message: `Preferred Date: ${formData.date}\nPreferred Time: ${selectedSlot}\nMessage: ${formData.message}`,
      subject: `Site Visit Booking - ${project.name}`,
    };
    
    await sendToAPI(apiData);
    
    setTimeout(() => {
      setVisitLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleField = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  // ── Escape key ──
  useEffect(() => {
    if (!modalOpen && !brochureOpen) return;
    const fn = (e) => {
      if (e.key === "Escape") {
        if (brochureOpen) closeBrochure();
        if (modalOpen) closeModal();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [modalOpen, brochureOpen, closeModal, closeBrochure]);

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = (modalOpen || brochureOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, brochureOpen]);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <main className="gpd-main">
        <GsapTextAnimations />
        <HeroSection project={project} openModal={openModal} openBrochure={openBrochure} />
        <AboutSection project={project} openModal={openModal} />
        <MasterPlanSection project={project} openModal={openModal} openBrochure={openBrochure} />
        <NearbyLandmarksSection project={project} />
        <CtaBanner project={project} openModal={openModal} openBrochure={openBrochure} />
      </main>

      {/* ════════════════════════════════════════
          BROCHURE MODAL (Updated with API + dynamic PDF)
      ════════════════════════════════════════ */}
      {brochureOpen && (
        <div
          className={`gpd-modal-backdrop${brochurePhase !== "idle" ? ` ${brochurePhase}` : ""}`}
          onClick={closeBrochure}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>

            <button className="gpd-close-btn" onClick={closeBrochure} aria-label="Close">
              <X size={15} />
            </button>

            <div className="gpd-form-col">
              {!brochureSubmitted ? (
                <>
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>Project Brochure</span>
                  </div>
                  <h2 className="gpd-form-heading">Download {project.name} Brochure</h2>
                  <p className="gpd-form-sub">Fill in your details to download the complete brochure for {project.name}.</p>

                  <form onSubmit={handleBrochureSubmit} className="gpd-fields-block">
                    <div className="gpd-field-row">
                      <div className="gpd-field">
                        <label>Full Name <span style={{ color: "#b82a2a" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </span>
                          <input className="gpd-f" type="text" name="name" required placeholder="Your name" value={brochureFormData.name} onChange={handleBrochureChange} />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Phone <span style={{ color: "#b82a2a" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          </span>
                          <input className="gpd-f" type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" value={brochureFormData.phone} onChange={handleBrochureChange} />
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
                          <input className="gpd-f" type="email" name="email" placeholder="you@email.com" value={brochureFormData.email} onChange={handleBrochureChange} />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>City</label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          </span>
                          <input className="gpd-f" type="text" name="city" placeholder="Chennai, Bangalore…" value={brochureFormData.city} onChange={handleBrochureChange} />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="gpd-btn-brochure" disabled={brochureLoading} style={{ marginTop: "10px" }}>
                      {brochureLoading ? (
                        <>
                          <span className="gpd-spinner" />
                          Preparing Download…
                        </>
                      ) : (
                        <>
                          Download Brochure
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
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
                    Thank you, <strong>{brochureFormData.name}</strong>. Your {project.name} brochure is downloading. Our team will contact you shortly.
                  </p>
                  <button className="gpd-done-btn" onClick={closeBrochure}>CLOSE</button>
                </div>
              )}
            </div>

            <div className="gpd-image-col">
              <img src="/form-1.png" alt="GPD Brochure" />
            </div>

          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          SITE VISIT / PRICING MODAL (Updated with API)
      ════════════════════════════════════════ */}
      {modalOpen && (
        <div
          className={`gpd-modal-backdrop${modalPhase !== "idle" ? ` ${modalPhase}` : ""}`}
          onClick={closeModal}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="gpd-close-btn" onClick={closeModal} aria-label="Close">
              <X size={15} />
            </button>

            <div className="gpd-form-col">
              {submitted ? (
                <div className="gpd-success">
                  <div className="gpd-success-ring">✅</div>
                  <h3>{modalType === "visit" ? "Visit Confirmed!" : "Request Received!"}</h3>
                  <p>
                    {modalType === "visit"
                      ? <>Our team will reach out within <strong>24 hours</strong> to confirm your slot. We look forward to meeting you.</>
                      : <>Thank you for your interest in <strong>{project.name}</strong>. Our team will contact you shortly with detailed pricing information.</>
                    }
                  </p>
                  <button className="gpd-done-btn" onClick={closeModal}>DONE</button>
                </div>
              ) : (
                <>
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>{modalType === "visit" ? "Site Visit" : "Pricing Inquiry"}</span>
                  </div>
                  <h2 className="gpd-form-heading">
                    {modalType === "visit" ? "Book Your Site Visit" : "Get Pricing Details"}
                  </h2>
                  <p className="gpd-form-sub">
                    {modalType === "visit"
                      ? "Our team will confirm your slot within 24 hours."
                      : "Fill in your details and we'll share the complete price list."
                    }
                  </p>

                  <div className="gpd-steps-row">
                    {stepLabels.map((label, i) => {
                      const n = i + 1;
                      const cls = n < step ? "done" : n === step ? "active" : "";
                      return (
                        <div key={n} className={`gpd-step-item ${cls}`}>
                          <div className="gpd-step-num">
                            {n < step ? (
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : n}
                          </div>
                          <div className="gpd-step-label">{label}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-field-row">
                        <div className="gpd-field">
                          <label>Full Name</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </span>
                            <input className="gpd-f" type="text" placeholder="Your name" value={formData.name} onChange={e => handleField("name", e.target.value)} />
                          </div>
                        </div>
                        <div className="gpd-field">
                          <label>Phone Number</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </span>
                            <input className="gpd-f" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleField("phone", e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="gpd-field-row full">
                        <div className="gpd-field">
                          <label>Email Address</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </span>
                            <input className="gpd-f" type="email" placeholder="you@email.com" value={formData.email} onChange={e => handleField("email", e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="gpd-btn-row">
                        <button className="gpd-btn-next" onClick={() => setStep(2)}>
                          Continue
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: visit */}
                  {step === 2 && modalType === "visit" && (
                    <div className="gpd-fields-block">
                      <div className="gpd-field-row full">
                        <div className="gpd-field">
                          <label>Preferred Project</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </span>
                            <select className="gpd-f" value={formData.project} onChange={e => handleField("project", e.target.value)}>
                              <option value="" disabled>Select a project</option>
                              {PROJECTS.map(p => <option key={p.slug} value={p.name}>{p.name}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="gpd-field-row full">
                        <div className="gpd-field">
                          <label>Preferred Date</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </span>
                            <input className="gpd-f" type="date" value={formData.date} onChange={e => handleField("date", e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Preferred Time Slot</label>
                        <div className="gpd-time-grid">
                          {TIME_SLOTS.map(slot => (
                            <button key={slot.label} className={`gpd-slot${selectedSlot === slot.label ? " selected" : ""}`} onClick={() => setSelectedSlot(slot.label)}>
                              {slot.icon} {slot.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="gpd-btn-row">
                        <button className="gpd-btn-back" onClick={() => setStep(1)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                          Back
                        </button>
                        <button className="gpd-btn-next" onClick={() => setStep(3)}>
                          Continue
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: pricing */}
                  {step === 2 && modalType === "pricing" && (
                    <div className="gpd-fields-block">
                      <div className="gpd-summary-card">
                        {[
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "Name", val: formData.name || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Phone", val: formData.phone || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", val: formData.email || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: "Project", val: project.name },
                        ].map(row => (
                          <div key={row.label} className="gpd-summary-row">
                            <div className="gpd-summary-icon" style={{ color: "rgba(255,255,255,0.3)" }}>{row.icon}</div>
                            <span className="gpd-summary-label">{row.label}</span>
                            <span className="gpd-summary-val">{row.val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="gpd-btn-row">
                        <button className="gpd-btn-back" onClick={() => setStep(1)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                          Back
                        </button>
                        <button className="gpd-btn-confirm" onClick={handleVisitSubmit} disabled={visitLoading}>
                          {visitLoading ? (
                            <>
                              <span className="gpd-spinner" />
                              Submitting…
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              Get Pricing
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-summary-card">
                        {[
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "Name",    val: formData.name    || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Phone",   val: formData.phone   || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email",   val: formData.email   || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: "Project", val: formData.project  || project.name },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Date",    val: formData.date    || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "Time",    val: selectedSlot     || "—" },
                        ].map(row => (
                          <div key={row.label} className="gpd-summary-row">
                            <div className="gpd-summary-icon" style={{ color: "rgba(255,255,255,0.3)" }}>{row.icon}</div>
                            <span className="gpd-summary-label">{row.label}</span>
                            <span className="gpd-summary-val">{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="gpd-field-row full" style={{ marginTop: "4px" }}>
                        <div className="gpd-field">
                          <label>Message (Optional)</label>
                          <textarea className="gpd-f no-icon" placeholder="Any questions or special requirements…" value={formData.message} onChange={e => handleField("message", e.target.value)} />
                        </div>
                      </div>

                      <div className="gpd-btn-row">
                        <button className="gpd-btn-back" onClick={() => setStep(2)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                          Back
                        </button>
                        <button className="gpd-btn-confirm" onClick={handleVisitSubmit} disabled={visitLoading}>
                          {visitLoading ? (
                            <>
                              <span className="gpd-spinner" />
                              Submitting…
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              Confirm Visit
                            </>
                          )}
                        </button>
                      </div>
                      <p className="gpd-privacy">🔒 Your details are kept strictly confidential.</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="gpd-image-col">
              <img
                src={project.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&fit=crop&q=80"}
                alt={project.name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────────────────
function HeroSection({ project, openModal, openBrochure }) {
  const cardItems = project.detailsCard ?? [];
  const totalItems = cardItems.length;

  const bannerStyle = {
    backgroundImage: `url(${project.heroImage})`,
    "--hero-image-mobile": project.heroImageMobile
      ? `url(${project.heroImageMobile})`
      : `url(${project.heroImage})`,
  };

  return (
    <section className="hero-section">
      <div className="hero-banner" style={bannerStyle}>
        <div className="hero-banner-content">
          {/* Overlay content if needed */}
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-breadcrumb">
          <Link href="/" style={{ color: "#2b2b2b", fontWeight: 700, textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/#projects" style={{ color: RED, fontWeight: 700, textDecoration: "none" }}>Projects</Link>
          <ChevronRight size={14} />
          <span>{project.name}</span>
        </div>

        <div className="hero-intro-grid">
          <div>
            <span className="section-eyebrow">{project.category}</span>
            <h2 className="hero-h2">{project.name}</h2>
            <p className="hero-subtitle">{project.subtitle}</p>
            <p className="hero-overview">{project.overview}</p>
            <div className="hero-stats-row-below">
              {project.stats.map((stat) => {
                const Icon = STAT_ICONS[stat.icon] || CheckCircle2;
                return (
                  <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className="stat-icon-circle"><Icon size={18} /></span>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#1f1f1f" }}>{stat.value}</div>
                      <div style={{ fontSize: "12px", color: "#9c8f86" }}>{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="details-card">
            {cardItems.map((item, i) => {
              const isLast = i === totalItems - 1;
              const isSecondToLast = i === totalItems - 2;
              return (
                <div key={item.label} className={`details-card-item${isLast || isSecondToLast ? " no-border" : ""}`}>
                  <div style={{
                    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.5px", color: i % 2 === 0 ? "#1f1f1f" : RED, marginBottom: "6px",
                  }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "14px", color: "#5c5450" }}>{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ project, openModal }) {
  return (
    <section className="about-section">
      <div style={{ margin: "40px 0 32px", display: "block", visibility: "visible", opacity: 1, width: "100%" }}>
        <h2 style={{
          fontSize: "22px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px",
          color: "#1f1f1f", display: "block", visibility: "visible", opacity: 1, fontFamily: "'Sora', sans-serif"
        }}>
          Project Highlights
        </h2>
        <span style={{ display: "inline-block", width: "44px", height: "3px", background: RED, borderRadius: "2px" }} />
      </div>

      <div className="highlights-grid">
        {project.projectHighlights.map((item) => {
          const Icon = HIGHLIGHT_ICONS[item.icon] || CheckCircle2;
          return (
            <div key={item.title + item.subtitle} className="highlight-card">
              <Icon size={28} color={RED} style={{ marginBottom: "16px" }} />
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1f1f1f", marginBottom: "4px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "13px", color: "#9c8f86" }}>{item.subtitle}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MasterPlanSection({ project, openModal, openBrochure }) {
  const locationItems = project.locationHighlights ?? [];

  return (
    <section className="masterplan-section">
      <div>
        <div className="masterplan-heading-row">
          <div>
            <h2 className="masterplan-h2">Master Plan Layout</h2>
            <span className="mp-red-line" />
            <p style={{ fontSize: "14px", color: "#9c8f86", margin: 0, maxWidth: "340px", lineHeight: 1.7 }}>
              {project.masterPlan?.description ??
                "Well-planned layout with maximum open spaces and modern infrastructure designed for a comfortable lifestyle."}
            </p>
          </div>
          <button onClick={openBrochure} className="masterplan-download-btn">
            Download Master Plan
            <Download size={16} />
          </button>
        </div>

        <div className="masterplan-image-wrap">
          {project.masterPlan?.image ? (
            <img
              src={project.masterPlan.image}
              alt={`${project.name} master plan layout`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "#c0b8b2", fontSize: "14px",
            }}>
              Master Plan Image
            </div>
          )}
        </div>
      </div>

      <div className="masterplan-lower-grid">
        <div>
          <h3 className="mp-h3">Plot Sizes &amp; Pricing</h3>
          <span className="mp-red-line" />
          <div className="mp-table-wrap mp-table-desktop">
            <table className="mp-table">
              <thead>
                <tr>
                  {["Plot Size", "Dimensions", "Price / Sq. Yd.", "Total Price"].map((h) => (
                    <th key={h} className="mp-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {project.pricing.map((row) => (
                  <tr key={row.type}>
                    <td className="mp-td">{row.type}</td>
                    <td className="mp-td">{row.size}</td>
                    <td className="mp-td">{row.pricePerSqYd ?? row.price}</td>
                    <td className="mp-td" style={{ fontWeight: 600, color: "#1f1f1f" }}>
                      {row.totalPrice ?? row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mp-cards-mobile" style={{ display: "none" }}>
            {project.pricing.map((row) => (
              <div key={row.type} className="mp-card-mobile">
                <div className="mp-card-mobile-row">
                  <span className="mp-card-label">Plot Size</span>
                  <span className="mp-card-value">{row.type}</span>
                </div>
                <div className="mp-card-mobile-row">
                  <span className="mp-card-label">Dimensions</span>
                  <span className="mp-card-value">{row.size}</span>
                </div>
                <div className="mp-card-mobile-row">
                  <span className="mp-card-label">Price / Sq. Yd.</span>
                  <span className="mp-card-value">{row.pricePerSqYd ?? row.price}</span>
                </div>
                <div className="mp-card-mobile-row">
                  <span className="mp-card-label">Total Price</span>
                  <span className="mp-card-value bold">{row.totalPrice ?? row.price}</span>
                </div>
              </div>
            ))}
          </div>

          {project.pricingNote && (
            <p style={{ fontSize: "12px", color: "#9c8f86", marginTop: "14px", lineHeight: 1.7 }}>
              {project.pricingNote}
            </p>
          )}
          <button className="check-availability-btn" onClick={openBrochure}>
            Check Availability
          </button>
        </div>

        <div>
          <h3 className="mp-h3">Location Advantage</h3>
          <span className="mp-red-line" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {locationItems.map((item) => (
              <div key={item.name} className="location-item">
                <MapPin size={15} color={RED} fill={RED} strokeWidth={0} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>
                  {item.distance && <span style={{ fontWeight: 600 }}>{item.distance} </span>}
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mp-h3">Location Map</h3>
          <span className="mp-red-line" />
          <div className="map-wrap">
            <iframe
              title={`Map showing ${project.name} location`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(project.mapEmbedQuery)}&z=12&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function NearbyLandmarksSection({ project }) {
  const landmarks = project.nearbyLandmarks ?? [];

  return (
    <section className="landmarks-section">
      <h2 className="landmarks-h2">Nearby Landmarks</h2>
      <span style={{ display: "block", width: "44px", height: "3px", background: RED, marginBottom: "28px" }} />
      <div className="landmarks-grid">
        {landmarks.map((lm) => (
          <div key={lm.name} className="landmark-card">
            {lm.image && <img src={lm.image} alt={lm.name} className="landmark-card-img" />}
            <div className="landmark-card-scrim" />
            <div className="landmark-card-accent" />
            <div className="landmark-card-content">
              <span className="landmark-card-pill">
                <Clock size={11} strokeWidth={2.2} />
                {lm.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBanner({ project, openModal, openBrochure }) {
  return (
    <section className="cta-banner">
      <div className="cta-inner">
        <div>
          <h3 className="cta-h3">Interested in {project.name}?</h3>
          <p className="cta-p">Schedule a free site visit or download our brochure for more details.</p>
        </div>
        <div className="cta-btns">
          {/* <button className="cta-primary-btn" onClick={() => openModal("visit")}>
            Book A Free Site Visit
            <ArrowRight size={16} />
          </button> */}
          <button className="cta-brochure-btn" onClick={openBrochure}>
            <Download size={16} />
            Download Brochure
          </button>
          <a href="tel:+91 93639 39696" className="cta-secondary-btn">
            <Phone size={16} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}