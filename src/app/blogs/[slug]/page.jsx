"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_BG = {
  "Investment":        { bg: "#0f1a0a", stroke: "#4a9a3a" },
  "Legal & Approvals": { bg: "#0a0f1a", stroke: "#4a70d9" },
  "Finance":           { bg: "#1a120a", stroke: "#d4a450" },
  "Market Trends":     { bg: "#1a0a0a", stroke: "#b03030" },
  "Lifestyle":         { bg: "#0f0a1a", stroke: "#8a4ad4" },
};

function HeroArt({ category }) {
  const cfg = CATEGORY_BG[category] || { bg: "#111", stroke: "#b03030" };
  return (
    <div style={{ width: "100%", height: "100%", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "inherit" }}>
      <svg width="160" height="140" viewBox="0 0 160 140" fill="none" opacity="0.3">
        {category === "Investment" && (
          <>
            <polyline points="14,110 42,68 64,86 96,42 128,58 146,38" stroke={cfg.stroke} strokeWidth="1.2" fill="none" />
            {[14,42,64,96,128,146].map((x,i) => {
              const y = [110,68,86,42,58,38][i];
              return <circle key={i} cx={x} cy={y} r="3.5" fill={cfg.stroke} />;
            })}
            <line x1="14" y1="114" x2="146" y2="114" stroke={cfg.stroke} strokeWidth="0.5" />
          </>
        )}
        {category === "Legal & Approvals" && (
          <>
            <rect x="36" y="14" width="88" height="112" rx="4" stroke={cfg.stroke} strokeWidth="1" fill="none" />
            <line x1="52" y1="40" x2="108" y2="40" stroke={cfg.stroke} strokeWidth="0.6" />
            <line x1="52" y1="56" x2="108" y2="56" stroke={cfg.stroke} strokeWidth="0.6" />
            <line x1="52" y1="72" x2="86" y2="72" stroke={cfg.stroke} strokeWidth="0.6" />
            <polyline points="50,96 62,108 88,82" stroke={cfg.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {category === "Finance" && (
          <>
            <circle cx="80" cy="70" r="52" stroke={cfg.stroke} strokeWidth="1" fill="none" />
            <line x1="80" y1="18" x2="80" y2="122" stroke={cfg.stroke} strokeWidth="0.5" />
            <path d="M60 38 Q80 30 100 38 L100 58 Q80 66 60 58 Z" stroke={cfg.stroke} strokeWidth="0.6" fill="none" />
            <path d="M60 74 Q80 66 100 74 L100 94 Q80 102 60 94 Z" stroke={cfg.stroke} strokeWidth="0.6" fill="none" />
          </>
        )}
        {category === "Market Trends" && (
          <>
            <rect x="14" y="14" width="132" height="112" rx="4" stroke={cfg.stroke} strokeWidth="0.5" fill="none" />
            <rect x="30" y="70" width="22" height="42" stroke={cfg.stroke} strokeWidth="0.9" fill="none" />
            <rect x="62" y="50" width="22" height="62" stroke={cfg.stroke} strokeWidth="0.9" fill="none" />
            <rect x="94" y="30" width="22" height="82" stroke={cfg.stroke} strokeWidth="0.9" fill="none" />
            <polyline points="14,18 146,18" stroke={cfg.stroke} strokeWidth="0.3" />
          </>
        )}
        {category === "Lifestyle" && (
          <>
            <circle cx="80" cy="55" r="28" stroke={cfg.stroke} strokeWidth="1" fill="none" />
            <line x1="80" y1="83" x2="80" y2="125" stroke={cfg.stroke} strokeWidth="0.8" />
            <line x1="56" y1="105" x2="104" y2="105" stroke={cfg.stroke} strokeWidth="0.8" />
            <circle cx="80" cy="55" r="10" fill={cfg.stroke} opacity="0.4" />
          </>
        )}
        {!CATEGORY_BG[category] && (
          <polygon points="80,14 138,50 138,106 80,126 22,106 22,50" stroke={cfg.stroke} strokeWidth="1" fill="none" />
        )}
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(176,48,48,0.12)", border: "1px solid rgba(176,48,48,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#b03030" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
  );
}

function renderBlock(block, i) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="blog-article-h2">{block.text}</h2>;
    case "p":
      return <p key={i} className="blog-article-p">{block.text}</p>;
    case "quote":
      return (
        <blockquote key={i} className="blog-article-quote">
          <p>{block.text}</p>
          <cite>{block.cite}</cite>
        </blockquote>
      );
    case "highlight":
      return (
        <div key={i} className="blog-highlight-box">
          <div className="blog-highlight-title">{block.title}</div>
          <ul className="blog-highlight-list">
            {block.items.map((item, j) => (
              <li key={j}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  const sectionRef  = useRef(null);
  const backRef     = useRef(null);
  const metaRef     = useRef(null);
  const headlineRef = useRef(null);
  const leadRef     = useRef(null);
  const authorRef   = useRef(null);
  const artRef      = useRef(null);
  const bodyRef     = useRef(null);
  const ctaRef      = useRef(null);
  const relatedRef  = useRef(null);

  useEffect(() => {
    if (!blog) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(backRef.current, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" });
      gsap.fromTo(metaRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.1 });

      const words = headlineRef.current?.querySelectorAll(".detail-word");
      if (words?.length) {
        gsap.fromTo(words, { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, stagger: 0.06, ease: "expo.out", delay: 0.2 });
      }

      gsap.fromTo(leadRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "expo.out", delay: 0.45 });
      gsap.fromTo(authorRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.55 });

      gsap.fromTo(artRef.current, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.0, ease: "expo.out",
          scrollTrigger: { trigger: artRef.current, start: "top 82%", once: true } });

      const bodyBlocks = bodyRef.current?.querySelectorAll(".blog-article-h2, .blog-article-p, .blog-article-quote, .blog-highlight-box");
      if (bodyBlocks?.length) {
        gsap.fromTo(bodyBlocks, { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out",
            scrollTrigger: { trigger: bodyRef.current, start: "top 85%", once: true } });
      }

      gsap.fromTo(ctaRef.current, { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 88%", once: true } });

      const relCards = relatedRef.current?.querySelectorAll(".blog-related-card");
      if (relCards?.length) {
        gsap.fromTo(relCards, { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: relatedRef.current, start: "top 88%", once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [blog]);

  if (!blog) return notFound();

  const related = getRelatedBlogs(slug, 2);

  return (
    <main className="detail-root" ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .detail-root {
          background: #0d0d0d;
          min-height: 100vh;
          font-family: 'Sora', sans-serif;
          padding-top: 90px;
        }

        /* ─── BACK ─── */
        .detail-back {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 18px 20px;
          color: rgba(255,255,255,0.32);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s ease;
          max-width: 1280px;
          margin: 0 auto;
          opacity: 0;
        }
        .detail-back:hover { color: #b03030; }

        /* ─── HERO GRID ─── */
        .detail-hero {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 20px 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
        }

        /* ─── META ─── */
        .detail-meta-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          opacity: 0;
        }
        .detail-cat-pill {
          background: rgba(176,48,48,0.12);
          border: 1px solid rgba(176,48,48,0.25);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b03030;
        }
        .detail-time {
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Sora', sans-serif;
        }

        /* ─── HEADLINE ─── */
        .detail-headline {
          font-family: 'Sora', sans-serif;
          font-size: clamp(24px, 5vw, 44px);
          font-weight: 800;
          color: #f5f0e8;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 16px;
          perspective: 600px;
        }
        .detail-headline-line { display: block; overflow: hidden; }
        .detail-word-wrap { display: inline-block; overflow: hidden; margin-right: 0.25em; }
        .detail-word { display: inline-block; }
        .detail-accent { color: #b03030; }

        /* ─── LEAD ─── */
        .detail-lead {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.42);
          line-height: 1.8;
          margin: 0 0 22px;
          max-width: 600px;
          opacity: 0;
        }

        /* ─── AUTHOR ─── */
        .detail-author-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 0;
          flex-wrap: wrap;
          opacity: 0;
        }
        .detail-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(176,48,48,0.12);
          border: 1px solid rgba(176,48,48,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #b03030;
          flex-shrink: 0;
        }
        .detail-author-name {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }
        .detail-author-role {
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          margin: 0;
        }
        .detail-share {
          display: flex;
          gap: 8px;
          margin-left: auto;
        }
        .detail-share-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .detail-share-btn:hover { border-color: rgba(176,48,48,0.5); color: #b03030; }

        /* ─── ART / STATS PANEL ─── */
        .detail-art-panel {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          opacity: 0;
        }
        .detail-art-visual {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .detail-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .detail-stat-box {
          background: #131313;
          padding: 14px 16px;
        }
        .detail-stat-num {
          font-family: 'Sora', sans-serif;
          font-size: clamp(17px, 2.5vw, 22px);
          font-weight: 700;
          color: #f0ece4;
          line-height: 1;
          margin-bottom: 3px;
        }
        .detail-stat-label {
          font-size: 9px;
          color: rgba(255,255,255,0.28);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ─── ARTICLE BODY ─── */
        .detail-body-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 36px 20px 0;
        }
        .blog-article-h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 700;
          color: #f0ece4;
          margin: 36px 0 14px;
          line-height: 1.25;
        }
        .blog-article-p {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.48);
          line-height: 1.9;
          margin: 0 0 18px;
        }
        .blog-article-quote {
          margin: 28px 0;
          padding: 20px 22px;
          border-left: 3px solid #b03030;
          background: rgba(176,48,48,0.04);
          border-radius: 0 10px 10px 0;
        }
        .blog-article-quote p {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          margin: 0 0 10px;
          line-height: 1.65;
        }
        .blog-article-quote cite {
          font-family: 'Sora', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-style: normal;
          display: block;
        }
        .blog-highlight-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 20px 22px;
          margin: 24px 0;
        }
        .blog-highlight-title {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b03030;
          margin-bottom: 14px;
        }
        .blog-highlight-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .blog-highlight-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        /* ─── CTA BANNER ─── */
        .detail-cta-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 32px 20px 0;
          opacity: 0;
        }
        .detail-cta-banner {
          border-radius: 14px;
          background: #111;
          border: 1px solid rgba(176,48,48,0.2);
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .detail-cta-h {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #f0ece4;
          margin: 0 0 5px;
          line-height: 1.2;
        }
        .detail-cta-p {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.32);
          margin: 0;
        }
        .detail-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          background: #b03030;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          width: fit-content;
          transition: background 0.2s ease, transform 0.15s ease;
          text-decoration: none;
        }
        .detail-cta-btn:hover { background: #8a2222; transform: translateY(-1px); }

        /* ─── RELATED ─── */
        .detail-related-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 36px 20px 64px;
        }
        .detail-related-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin: 0 0 18px;
        }
        .detail-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .blog-related-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 18px;
          text-decoration: none;
          display: block;
          transition: border-color 0.2s ease, transform 0.2s ease;
          opacity: 0;
        }
        .blog-related-card:hover {
          border-color: rgba(176,48,48,0.35);
          transform: translateY(-2px);
        }
        .detail-rel-cat {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #b03030;
          margin-bottom: 7px;
        }
        .detail-rel-title {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #e0d8cc;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .detail-rel-meta {
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          font-family: 'Sora', sans-serif;
        }

        /* ─── RESPONSIVE ─── */
        @media (min-width: 480px) {
          .detail-back, .detail-hero, .detail-body-wrap, .detail-cta-wrap, .detail-related-wrap {
            padding-left: 28px;
            padding-right: 28px;
          }
          .detail-art-visual { min-height: 240px; }
        }

        @media (min-width: 768px) {
          .detail-back, .detail-hero { padding-left: 40px; padding-right: 40px; }
          .detail-body-wrap, .detail-cta-wrap, .detail-related-wrap {
            padding-left: 40px;
            padding-right: 40px;
          }
          .detail-hero { padding-top: 40px; gap: 40px; }
          .detail-lead { font-size: 15px; }
          .blog-article-p { font-size: 15px; }
          .blog-article-quote p { font-size: 16px; }
          .blog-highlight-list li { font-size: 14px; }
          .detail-art-visual { min-height: 260px; }
          .detail-cta-banner { flex-direction: row; align-items: center; justify-content: space-between; }
          .detail-related-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 900px) {
          .detail-hero {
            grid-template-columns: 1.1fr 0.9fr;
            align-items: start;
          }
          .detail-art-visual { min-height: 300px; }
          .detail-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (min-width: 1024px) {
          .detail-back, .detail-hero { padding-left: 48px; padding-right: 48px; }
          .detail-body-wrap, .detail-cta-wrap, .detail-related-wrap {
            padding-left: 48px;
            padding-right: 48px;
          }
          .detail-hero { padding-top: 44px; }
          .detail-art-visual { min-height: 320px; }
          .detail-body-wrap, .detail-cta-wrap, .detail-related-wrap { max-width: 760px; }
          .blog-article-h2 { font-size: 24px; }
        }

        @media (min-width: 1280px) {
          .detail-back, .detail-hero { padding-left: 60px; padding-right: 60px; }
          .detail-body-wrap, .detail-cta-wrap, .detail-related-wrap {
            padding-left: 60px;
            padding-right: 60px;
          }
          .detail-art-visual { min-height: 340px; }
          .detail-body-wrap, .detail-cta-wrap, .detail-related-wrap { max-width: 800px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .detail-back, .detail-meta-top, .detail-lead, .detail-author-row,
          .detail-art-panel, .detail-cta-wrap, .blog-related-card,
          .blog-article-h2, .blog-article-p, .blog-article-quote, .blog-highlight-box {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }
      `}</style>

      {/* BACK */}
      <Link href="/blogs" className="detail-back" ref={backRef}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Insights
      </Link>

      {/* HERO GRID */}
      <div className="detail-hero">
        {/* Left: copy */}
        <div>
          <div className="detail-meta-top" ref={metaRef}>
            <span className="detail-cat-pill">{blog.category}</span>
            <span className="detail-time">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {blog.readTime}
            </span>
          </div>

          <h1 className="detail-headline" ref={headlineRef}>
            {blog.title.split(" ").reduce((lines, word, i, arr) => {
              const mid = Math.ceil(arr.length / 2);
              if (i === 0) lines.push([]);
              if (i === mid) lines.push([]);
              lines[lines.length - 1].push(word);
              return lines;
            }, []).map((line, li) => (
              <span key={li} className="detail-headline-line">
                {line.map((word, wi) => (
                  <span key={wi} className="detail-word-wrap">
                    <span className="detail-word">{word}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="detail-lead" ref={leadRef}>{blog.excerpt}</p>

          <div className="detail-author-row" ref={authorRef}>
            <div className="detail-avatar">G</div>
            <div>
              <p className="detail-author-name">GPD Research Team</p>
              <p className="detail-author-role">Genuine Property Developers · {blog.date}</p>
            </div>
            <div className="detail-share">
              <button className="detail-share-btn" title="Share" aria-label="Share">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
              <button className="detail-share-btn" title="Bookmark" aria-label="Bookmark">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: art + stats */}
        <div className="detail-art-panel" ref={artRef}>
          <div className="detail-art-visual">
            <HeroArt category={blog.category} />
          </div>
          <div className="detail-stats-grid">
            {blog.stats.map((s, i) => (
              <div key={i} className="detail-stat-box">
                <div className="detail-stat-num">{s.num}</div>
                <div className="detail-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <div className="detail-body-wrap" ref={bodyRef}>
        {blog.content.map((block, i) => renderBlock(block, i))}
      </div>

      {/* CTA BANNER */}
      <div className="detail-cta-wrap" ref={ctaRef}>
        <div className="detail-cta-banner">
          <div>
            <h3 className="detail-cta-h">See the Plots for Yourself</h3>
            <p className="detail-cta-p">Book a free site visit — our team confirms within 24 hours.</p>
          </div>
          <button
            className="detail-cta-btn"
            onClick={() => window.dispatchEvent(new CustomEvent("gpd:openVisit"))}
          >
            Book Site Visit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      {/* RELATED */}
      <div className="detail-related-wrap">
        <p className="detail-related-label">Continue Reading</p>
        <div className="detail-related-grid" ref={relatedRef}>
          {related.map((rel) => (
            <Link key={rel.slug} href={`/blogs/${rel.slug}`} className="blog-related-card">
              <div className="detail-rel-cat">{rel.category}</div>
              <div className="detail-rel-title">{rel.title}</div>
              <div className="detail-rel-meta">{rel.dateShort} · {rel.readTime}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}