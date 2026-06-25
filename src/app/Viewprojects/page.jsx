"use client";

import { useState } from "react";
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
    img: "/img-07.png",
    tags: ["CMDA Approved", "RERA Approved", "Gated Community"],
  },
  {
    slug: "alankar-sunrise",
    name: "Alankar Sunrise",
    category: "CMDA Approved Plotted Development",
    location: "East Tambaram – Mappedu, Puthur, Chengalpattu District",
    status: "New Launch",
    statusColor: "#0a8a5c",
    stats: "2.28 Acres · 68 Plots · 775–1570 Sq.Ft",
    img: "/img-09.png",
    tags: ["CMDA Approved", "30 Ft Roads", "New Launch"],
  },
  {
    slug: "amudham-foundation",
    name: "Amudham Foundation",
    category: "Premium Plotted Development",
    location: "Chennai, Tamil Nadu",
    status: "Available",
    statusColor: "#1a6fc4",
    stats: "RERA Approved · 30 Ft Roads · Ready to Build",
    img: "/img-08.png",
    tags: ["RERA Approved", "Ready to Build"],
  },
];

export default function AllProjectsPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <main className="ap-page">
        {/* ── HERO ── */}
        <section className="ap-hero">
          <div className="ap-hero-inner">
            <div className="ap-hero-tag">
              <span className="ap-hero-dot" />
              <span>Our Developments</span>
            </div>
            <h1 className="ap-hero-title">
              Every Plot Has<br />
              <span className="ap-hero-accent">A Place In Mind</span>
            </h1>
            <p className="ap-hero-sub">
              CMDA &amp; RERA approved plotted developments across Chennai's fastest-growing
              corridors — built for families who plan ahead.
            </p>
            <div className="ap-hero-stats">
              <div className="ap-hero-stat">
                <span className="ap-hero-stat-num">{PROJECTS.length}</span>
                <span className="ap-hero-stat-label">Active Projects</span>
              </div>
              <div className="ap-hero-stat-divider" />
              <div className="ap-hero-stat">
                <span className="ap-hero-stat-num">100%</span>
                <span className="ap-hero-stat-label">RERA Compliant</span>
              </div>
              <div className="ap-hero-stat-divider" />
              <div className="ap-hero-stat">
                <span className="ap-hero-stat-num">Chennai</span>
                <span className="ap-hero-stat-label">& Chengalpattu</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS LIST ── */}
        <section className="ap-list-section">
          {PROJECTS.map((proj, i) => (
            <Link
              href={`/projects/${proj.slug}`}
              key={proj.slug}
              className="ap-row"
              onMouseEnter={() => setHovered(proj.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="ap-row-index">
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="ap-row-image">
                <img src={proj.img} alt={proj.name} draggable="false" />
                <div className="ap-row-image-overlay" />
              </div>

              <div className="ap-row-body">
                <div className="ap-row-top">
                  <span
                    className="ap-row-status"
                    style={{
                      color: proj.statusColor,
                      background: proj.statusColor + "14",
                      border: `1px solid ${proj.statusColor}33`,
                    }}
                  >
                    {proj.status}
                  </span>
                  <span className="ap-row-category">{proj.category}</span>
                </div>

                <h2 className="ap-row-name">{proj.name}</h2>

                <div className="ap-row-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {proj.location}
                </div>

                <div className="ap-row-tags">
                  {proj.tags.map((t) => (
                    <span className="ap-row-tag" key={t}>{t}</span>
                  ))}
                </div>

                <div className="ap-row-stats">{proj.stats}</div>
              </div>

              <div className="ap-row-cta">
                <span className="ap-row-cta-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className="ap-row-cta-label">View Plots</span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="ap-bottom-cta">
          <div className="ap-bottom-cta-inner">
            <h3>Can't decide which project fits you?</h3>
            <p>Talk to our team — we'll match you to the right plot based on your budget and timeline.</p>
            <Link href="/contactus" className="ap-bottom-cta-btn">
              Contact Our Team
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <style>{`
        .ap-page {
          background: #ffffff;
          color: #111;
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
        }

        /* ══════════ HERO (stays dark for contrast/drama) ══════════ */
        .ap-hero {
          padding: 170px 24px 70px;
          background:
            radial-gradient(circle at 18% 20%, rgba(227,30,36,0.16) 0%, transparent 45%),
            radial-gradient(circle at 85% 0%, rgba(227,180,80,0.08) 0%, transparent 40%),
            #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ap-hero-inner {
          max-width: 880px;
          margin: 0 auto;
          text-align: center;
        }
        .ap-hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(227,30,36,0.1);
          border: 1px solid rgba(227,30,36,0.28);
          border-radius: 100px; padding: 6px 16px 6px 12px;
          margin-bottom: 22px;
        }
        .ap-hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #e31e24;
          animation: ap-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ap-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(1.5); }
        }
        .ap-hero-tag span:last-child {
          font-size: 11px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #e31e24;
        }
        .ap-hero-title {
          font-size: clamp(34px, 6vw, 58px);
          font-weight: 800; line-height: 1.08; letter-spacing: -1px;
          margin: 0 0 20px;
          color: #fff;
        }
        .ap-hero-accent { color: #e3b450; }
        .ap-hero-sub {
          font-size: 15.5px; line-height: 1.75; font-weight: 300;
          color: rgba(255,255,255,0.5);
          max-width: 560px; margin: 0 auto 36px;
        }
        .ap-hero-stats {
          display: flex; align-items: center; justify-content: center;
          gap: 28px; flex-wrap: wrap;
        }
        .ap-hero-stat {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .ap-hero-stat-num {
          font-size: 24px; font-weight: 800; color: #fff;
        }
        .ap-hero-stat-label {
          font-size: 10px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .ap-hero-stat-divider {
          width: 1px; height: 28px; background: rgba(255,255,255,0.12);
        }

        /* ══════════ ROWS (white section) ══════════ */
        .ap-list-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 60px 24px 40px;
          display: flex; flex-direction: column; gap: 18px;
          background: #ffffff;
        }
        .ap-row {
          display: grid;
          grid-template-columns: 56px 220px 1fr 130px;
          align-items: center;
          gap: 28px;
          background: #ffffff;
          border: 1px solid #ececec;
          border-radius: 18px;
          padding: 20px 22px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 14px rgba(0,0,0,0.04);
          transition: background .25s ease, border-color .25s ease, transform .25s ease, box-shadow .25s ease;
          position: relative;
          overflow: hidden;
        }
        .ap-row:hover {
          background: #fff;
          border-color: rgba(227,30,36,0.35);
          box-shadow: 0 12px 32px rgba(227,30,36,0.1);
          transform: translateY(-2px);
        }

        .ap-row-index {
          font-size: 13px; font-weight: 700; letter-spacing: .05em;
          color: rgba(17,17,17,0.18);
          font-variant-numeric: tabular-nums;
        }

        .ap-row-image {
          width: 220px; height: 130px; border-radius: 12px;
          overflow: hidden; position: relative; flex-shrink: 0;
          background: #f0f0f0;
        }
        .ap-row-image img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .5s ease;
        }
        .ap-row:hover .ap-row-image img { transform: scale(1.06); }
        .ap-row-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%);
        }

        .ap-row-body { min-width: 0; }
        .ap-row-top {
          display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .ap-row-status {
          font-size: 10px; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
        }
        .ap-row-category {
          font-size: 11px; font-weight: 500; letter-spacing: .04em;
          text-transform: uppercase; color: rgba(17,17,17,0.4);
        }
        .ap-row-name {
          font-size: 24px; font-weight: 700; color: #111;
          margin: 0 0 8px; letter-spacing: -0.3px;
        }
        .ap-row-location {
          display: flex; align-items: center; gap: 6px;
          font-size: 12.5px; color: rgba(17,17,17,0.55);
          margin-bottom: 12px;
        }
        .ap-row-location svg { color: #e31e24; flex-shrink: 0; }
        .ap-row-tags {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;
        }
        .ap-row-tag {
          font-size: 10.5px; font-weight: 600; letter-spacing: .03em;
          color: rgba(17,17,17,0.6);
          background: #f6f5f3;
          border: 1px solid #eceae6;
          padding: 4px 10px; border-radius: 6px;
        }
        .ap-row-stats {
          font-size: 12px; color: rgba(17,17,17,0.38); font-weight: 400;
        }

        .ap-row-cta {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          justify-self: end;
        }
        .ap-row-cta-circle {
          width: 46px; height: 46px; border-radius: 50%;
          border: 1.5px solid #e2e2e2;
          display: flex; align-items: center; justify-content: center;
          color: rgba(17,17,17,0.55);
          transition: background .25s, border-color .25s, color .25s, transform .25s;
        }
        .ap-row:hover .ap-row-cta-circle {
          background: #e31e24; border-color: #e31e24; color: #fff;
          transform: translateX(3px);
        }
        .ap-row-cta-label {
          font-size: 10px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(17,17,17,0.35);
        }

        /* ══════════ BOTTOM CTA ══════════ */
        .ap-bottom-cta {
          padding: 70px 24px 100px;
          background: #ffffff;
        }
        .ap-bottom-cta-inner {
          max-width: 680px; margin: 0 auto; text-align: center;
          background: linear-gradient(135deg, rgba(227,30,36,0.06), rgba(227,180,80,0.07));
          border: 1px solid #f0ede8;
          border-radius: 24px; padding: 48px 32px;
        }
        .ap-bottom-cta-inner h3 {
          font-size: clamp(22px, 3vw, 28px); font-weight: 700; margin: 0 0 12px;
          color: #111;
        }
        .ap-bottom-cta-inner p {
          font-size: 13.5px; color: rgba(17,17,17,0.5); font-weight: 300;
          line-height: 1.7; margin: 0 0 28px;
        }
        .ap-bottom-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #e31e24; color: #fff; text-decoration: none;
          padding: 14px 28px; border-radius: 10px;
          font-size: 12.5px; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase;
          transition: background .2s, transform .15s;
        }
        .ap-bottom-cta-btn:hover { background: #c01820; transform: translateY(-2px); }

        /* ══════════ RESPONSIVE ══════════ */
        @media (max-width: 900px) {
          .ap-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .ap-row-index { display: none; }
          .ap-row-image { width: 100%; height: 200px; }
          .ap-row-cta {
            flex-direction: row; justify-self: start;
            justify-content: flex-start; gap: 10px;
          }
        }
        @media (max-width: 640px) {
          .ap-hero { padding: 130px 18px 50px; }
          .ap-list-section { padding: 44px 16px 30px; gap: 14px; }
          .ap-row { padding: 16px; border-radius: 14px; }
          .ap-row-name { font-size: 20px; }
          .ap-hero-stats { gap: 18px; }
          .ap-hero-stat-divider { height: 22px; }
          .ap-bottom-cta { padding: 50px 16px 70px; }
          .ap-bottom-cta-inner { padding: 36px 22px; border-radius: 18px; }
        }
      `}</style>
    </>
  );
}