import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck, TreePine, Baby, Route as RoadIcon, Droplet, Zap,
  Droplets, Trees, Lamp, Lightbulb, Building2, Camera,
  CheckCircle2, ArrowRight, ChevronRight, Phone, Ruler,
  LayoutGrid, Leaf, Download, MapPin, Clock,
} from "lucide-react";
import { getProject, getAllProjectSlugs } from "@/data/projects";
import GsapTextAnimations from "@/components/GsapTextAnimations";

const RED = "#b82a2a";
const BORDER = "#e8e2de";

const STAT_ICONS = { area: Ruler, plots: LayoutGrid, green: Leaf, approved: ShieldCheck };

const HIGHLIGHT_ICONS = {
  road: RoadIcon, electric: Zap, sewage: Droplets, water: Droplet,
  parks: Trees, lights: Lightbulb, community: Building2, security: Camera,
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} | Genuine Property Developers`,
    description: project.tagline,
  };
}

/* ─── Global responsive styles ─── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Sora:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .gpd-main {
    font-family: 'Sora', sans-serif;
    background: #ffffff;
    color: #2b2b2b;
    overflow-x: hidden;
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

  .hero-stats-row {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  }

  .hero-stat-divider {
    width: 1px;
    height: 30px;
    background: rgba(255,255,255,0.12);
    margin: 0 22px;
    flex-shrink: 0;
  }

  .hero-stat-value {
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
    display: block;
    margin-bottom: 3px;
  }

  .hero-stat-label {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    font-weight: 600;
    display: block;
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
    padding: 32px 4px 70px;
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

  .highlights-heading { text-align: center; margin-bottom: 32px; }

  .highlights-h2 {
    font-size: 26px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #1f1f1f;
    margin: 0 0 10px;
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

  .landmark-card-name {
    font-size: 13.5px;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    letter-spacing: 0.1px;
    text-shadow: 0 1px 3px rgba(0,0,0,0.85), 0 1px 12px rgba(0,0,0,0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
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

  .landmark-card-pill svg {
    flex-shrink: 0;
    opacity: 0.85;
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
  }

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
    .hero-banner-content { padding: 0 36px; }

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
    .hero-stat-value    { font-size: 14px; }

    .highlights-grid    { grid-template-columns: repeat(2, 1fr); }
    .landmarks-grid     { grid-template-columns: repeat(4, 1fr); }
  }

  @media (max-width: 599px) {
    .hero-inner         { padding: 0 16px; }
    .about-section      { padding: 16px 16px 48px; }
    .masterplan-section { padding: 0 16px 48px; }
    .landmarks-section  { padding: 0 16px 48px; }
    .cta-banner         { padding: 40px 16px; }

    .hero-banner        { height: 320px; border-radius: 10px; }
    .hero-banner-content { padding: 0 24px; max-width: 100%; }
    .hero-h1            { font-size: 24px; }
    .hero-subtext       { display: none; }
    .hero-accent-line   { height: 52px; margin-right: 16px; }
    .hero-stat-value    { font-size: 13px; }
    .hero-stat-divider  { margin: 0 14px; }
    .hero-cta-ghost     { display: none; }
    .hero-cta-primary   { font-size: 9px; padding: 11px 18px; }

    .hero-intro-grid    { padding: 24px 0 40px; gap: 24px; }
    .hero-h2            { font-size: 26px; }
    .hero-subtitle      { font-size: 15px; }
    .hero-overview      { font-size: 14px; }
    .hero-stats-row-below { gap: 16px; }

    .details-card       { grid-template-columns: 1fr; padding: 20px; }
    .details-card-item  { border-bottom: 1px solid #e8e2de; }
    .details-card-item.no-border { border-bottom: none; }

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
    .landmark-card-name { font-size: 13px; }
    .landmark-card-pill { font-size: 10.5px; padding: 3px 9px 3px 7px; }

    .cta-h3             { font-size: 22px; }
    .cta-btns           { flex-direction: column; width: 100%; }
    .cta-primary-btn, .cta-secondary-btn { width: 100%; justify-content: center; padding: 13px 20px; }
  }

  @media (max-width: 479px) {
    .hero-banner        { height: 260px; border-radius: 8px; }
    .hero-h1            { font-size: 20px; }
    .hero-eyebrow       { font-size: 8px; letter-spacing: 2px; margin-bottom: 10px; }
    .hero-breadcrumb    { font-size: 12px; }
    .hero-accent-line   { height: 44px; width: 2px; margin-right: 14px; }
    .hero-stat-value    { font-size: 12px; }
    .hero-stats-row     { margin-bottom: 20px; }

    .hero-h2            { font-size: 22px; }
    .hero-subtitle      { font-size: 14px; }
    .about-h2           { font-size: 18px; }
    .highlights-h2      { font-size: 20px; }
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
    .hero-banner        { height: 220px; }
    .hero-h1            { font-size: 17px; }
    .highlights-grid    { grid-template-columns: 1fr; }
    .landmarks-grid     { grid-template-columns: 1fr 1fr; }
  }

  /* ════ REDUCED MOTION ════ */
  @media (prefers-reduced-motion: reduce) {
    .wi { transform: none !important; opacity: 1 !important; }
    .landmark-card,
    .landmark-card-img,
    .landmark-card-accent { transition: none !important; }
  }
`;

/* ════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <main className="gpd-main">
        <GsapTextAnimations />
        <HeroSection project={project} />
        <AboutSection project={project} />
        <MasterPlanSection project={project} />
        <NearbyLandmarksSection project={project} />
        <CtaBanner project={project} />
      </main>
    </>
  );
}

/* ════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */

function HeroSection({ project }) {
  const cardItems = project.detailsCard ?? [];
  const totalItems = cardItems.length;

  return (
    <section className="hero-section">

      {/* ── Banner ── */}
      <div
        className="hero-banner"
        style={{
          backgroundImage: `linear-gradient(108deg, rgba(10,8,6,0.97) 0%, rgba(10,8,6,0.82) 42%, rgba(10,8,6,0.18) 72%, rgba(10,8,6,0.04) 100%), url(${project.heroImage})`,
        }}
      >
        <div className="hero-banner-content">

          {/* Vertical red accent line */}
          <div className="hero-accent-line" />

          <div>
            {/* Eyebrow */}
            <div className="hero-eyebrow">Genuine Property Developers</div>

            {/* Project name */}
            <h1 className="hero-h1">{project.name}</h1>

            {/* Tagline */}
            <p className="hero-subtext">{project.heroSubtext}</p>

            {/* Stats row */}
            {/* <div className="hero-stats-row">
              {project.stats.map((stat, i) => (
                <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
                  {i !== 0 && <div className="hero-stat-divider" />}
                  <div>
                    <span className="hero-stat-value">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div> */}

            {/* CTAs */}
            <div className="hero-cta-row">
              <Link href={project.heroCtaHref || "#pricing"} className="hero-cta-primary">
                {project.heroCtaLabel}
                <ArrowRight size={14} />
              </Link>
              <a href="#pricing" className="hero-cta-ghost">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb + intro grid ── */}
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
                <div
                  key={item.label}
                  className={`details-card-item${isLast || isSecondToLast ? " no-border" : ""}`}
                >
                  <div style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: i % 2 === 0 ? "#1f1f1f" : RED,
                    marginBottom: "6px",
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

/* ════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════ */

function AboutSection({ project }) {
  const half = Math.ceil(project.keyFeatures.length / 2);
  const col1 = project.keyFeatures.slice(0, half);
  const col2 = project.keyFeatures.slice(half);

  return (
    <section className="about-section">

      <div className="about-grid">
        <div>
          <h2 className="about-h2">About The Project</h2>
          <span className="red-line" />
          <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#9c8f86" }}>{project.overview}</p>
        </div>

        <div className="key-features-grid">
          {[col1, col2].map((col, colIdx) => (
            <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {col.map((feature) => (
                <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2 size={18} color={RED} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "14px", color: "#3a3a3a", lineHeight: 1.6 }}>{feature}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="highlights-heading">
        <h2 className="highlights-h2">Project Highlights</h2>
        <span style={{ display: "inline-block", width: "44px", height: "3px", background: RED }} />
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

/* ════════════════════════════════════════════════════
   MASTER PLAN
═══════════════════════════════════════════════════ */

function MasterPlanSection({ project }) {
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
          <a href={project.masterPlan?.downloadHref ?? "#"} download className="masterplan-download-btn">
            Download Master Plan
            <Download size={16} />
          </a>
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
          <a href="#contact" className="check-availability-btn">Check Availability</a>
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

/* ════════════════════════════════════════════════════
   NEARBY LANDMARKS
═══════════════════════════════════════════════════ */

function NearbyLandmarksSection({ project }) {
  const landmarks = project.nearbyLandmarks ?? [];

  return (
    <section className="landmarks-section">
      <h2 className="landmarks-h2">Nearby Landmarks</h2>
      <span style={{ display: "block", width: "44px", height: "3px", background: RED, marginBottom: "28px" }} />

      <div className="landmarks-grid">
        {landmarks.map((lm) => (
          <div key={lm.name} className="landmark-card">
            {lm.image && (
              <img
                src={lm.image}
                alt={lm.name}
                className="landmark-card-img"
              />
            )}
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

/* ════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════ */

function CtaBanner({ project }) {
  return (
    <section className="cta-banner">
      <div className="cta-inner">
        <div>
          <h3 className="cta-h3">Interested in {project.name}?</h3>
          <p className="cta-p">Schedule a free site visit or speak to our team for the latest offers.</p>
        </div>
        <div className="cta-btns">
          <Link href="/contact" className="cta-primary-btn">
            Book A Free Site Visit
            <ArrowRight size={16} />
          </Link>
          <a href="tel:+971501234567" className="cta-secondary-btn">
            <Phone size={16} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}