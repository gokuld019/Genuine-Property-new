"use client";
import { useState, useMemo, useEffect, useRef } from "react";

function formatINR(n) {
  return `₹ ${Math.round(n).toLocaleString("en-IN")}`;
}

function calcEMI(principal, annualRate, tenureYears) {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function DonutChart({ principal, interest }) {
  const total = principal + interest;
  const pPct = (principal / total) * 100;
  const iPct = (interest / total) * 100;
  const r = 80;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * r;
  const pDash = (pPct / 100) * circumference;
  const iDash = (iPct / 100) * circumference;

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8e4de" strokeWidth="28" />
      <circle
        cx={cx} cy={cy} r={r} fill="none" stroke="#b82a2a" strokeWidth="28"
        strokeDasharray={`${pDash} ${circumference - pDash}`}
        strokeDashoffset={circumference * 0.25} strokeLinecap="butt"
      />
      <circle
        cx={cx} cy={cy} r={r} fill="none" stroke="#f0c0c0" strokeWidth="28"
        strokeDasharray={`${iDash} ${circumference - iDash}`}
        strokeDashoffset={circumference * 0.25 - pDash} strokeLinecap="butt"
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="11" fill="#9a9a9a" fontFamily="'Sora', sans-serif">Total</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="#1c1c1c" fontFamily="'Sora', sans-serif" fontWeight="600">
        {formatINR(total).replace("₹ ", "")}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="8" fill="#9a9a9a" fontFamily="'Sora', sans-serif">₹</text>
    </svg>
  );
}

function useGsapAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      function splitEl(el) {
        if (!el || el.dataset.split) return el ? Array.from(el.querySelectorAll(".gpd-wi")) : [];
        el.dataset.split = "1";
        el.style.perspective = "600px";
        const words = el.innerText.trim().split(/\s+/);
        el.innerHTML = words
          .map(
            (w) =>
              `<span style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.28em;">` +
              `<span class="gpd-wi" style="display:inline-block;will-change:transform;">${w}</span>` +
              `</span>`
          )
          .join("");
        return Array.from(el.querySelectorAll(".gpd-wi"));
      }

      function wordReveal(el, tl, pos, stagger = 0.08, dur = 0.9) {
        if (!el) return;
        const wi = splitEl(el);
        if (!wi.length) return;
        gsap.set(el, { opacity: 1 });
        tl.fromTo(wi,
          { y: "105%", rotateX: -15 },
          { y: "0%", rotateX: 0, duration: dur, stagger, ease: "expo.out" },
          pos
        );
      }

      function wordRevealScroll(el, { start = "top 88%", stagger = 0.08, dur = 0.85 } = {}) {
        if (!el) return;
        const wi = splitEl(el);
        if (!wi.length) return;
        gsap.set(el, { opacity: 1 });
        gsap.set(wi, { y: "105%", rotateX: -15 });
        ScrollTrigger.create({
          trigger: el, start, once: true,
          onEnter: () =>
            gsap.to(wi, { y: "0%", rotateX: 0, duration: dur, stagger, ease: "expo.out" }),
        });
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        const eyebrow = document.querySelector(".hero-eyebrow");
        if (eyebrow) {
          gsap.set(eyebrow, { x: -24, opacity: 0, letterSpacing: "0.4em" });
          tl.to(eyebrow, { x: 0, opacity: 1, letterSpacing: "0.2em", duration: 0.8 }, 0.1);
        }

        wordReveal(document.querySelector(".hero h1"), tl, 0.35, 0.09, 0.95);

        const heroSub = document.querySelector(".hero-sub");
        if (heroSub) {
          tl.fromTo(heroSub, { y: 20 }, { y: 0, opacity: 1, duration: 0.75 }, 0.85);
        }

        const breadItems = document.querySelectorAll(".breadcrumb > *");
        if (breadItems.length) {
          tl.fromTo(breadItems, { x: -14 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.5);
        }

        const sectionLabel = document.querySelector(".section-label");
        if (sectionLabel) {
          gsap.set(sectionLabel, { x: -18, opacity: 0 });
          ScrollTrigger.create({
            trigger: sectionLabel, start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(sectionLabel, { x: 0, opacity: 1, duration: 0.7, ease: "expo.out" }),
          });
        }

        wordRevealScroll(document.querySelector(".calc-header h2"), { stagger: 0.07 });

        const calcP = document.querySelector(".calc-header p");
        if (calcP) {
          gsap.set(calcP, { y: 14, opacity: 0 });
          ScrollTrigger.create({
            trigger: calcP, start: "top 90%", once: true,
            onEnter: () => gsap.to(calcP, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.1 }),
          });
        }

        const sliderRows = document.querySelectorAll(".calc-card > div:not(.calc-header)");
        if (sliderRows.length) {
          gsap.set(sliderRows, { x: -20, opacity: 0 });
          ScrollTrigger.create({
            trigger: sliderRows[0], start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(sliderRows, { x: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: "expo.out" }),
          });
        }

        const emiCard = document.querySelector(".emi-display-card");
        if (emiCard) {
          gsap.set(emiCard, { scale: 0.96, opacity: 0 });
          ScrollTrigger.create({
            trigger: emiCard, start: "top 85%", once: true,
            onEnter: () =>
              gsap.to(emiCard, { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }),
          });
        }

        const emiLabel = document.querySelector(".emi-label");
        const emiAmt = document.querySelector(".emi-amount");
        const emiSub = document.querySelector(".emi-sub");
        if (emiLabel) {
          gsap.set(emiLabel, { y: 12, opacity: 0 });
          ScrollTrigger.create({
            trigger: emiLabel, start: "top 85%", once: true,
            onEnter: () => gsap.to(emiLabel, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.2 }),
          });
        }
        if (emiAmt) {
          gsap.set(emiAmt, { y: 16, opacity: 0 });
          ScrollTrigger.create({
            trigger: emiAmt, start: "top 85%", once: true,
            onEnter: () => gsap.to(emiAmt, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.3 }),
          });
        }
        if (emiSub) {
          gsap.set(emiSub, { y: 10, opacity: 0 });
          ScrollTrigger.create({
            trigger: emiSub, start: "top 85%", once: true,
            onEnter: () => gsap.to(emiSub, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.4 }),
          });
        }

        const statBoxes = document.querySelectorAll(".stat-box");
        if (statBoxes.length) {
          gsap.set(statBoxes, { y: 20, scale: 0.96, opacity: 0 });
          ScrollTrigger.create({
            trigger: statBoxes[0], start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(statBoxes, { y: 0, scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" }),
          });
        }

        const breakdownCard = document.querySelector(".breakdown-card");
        if (breakdownCard) {
          gsap.set(breakdownCard, { y: 24, opacity: 0 });
          ScrollTrigger.create({
            trigger: breakdownCard, start: "top 88%", once: true,
            onEnter: () => gsap.to(breakdownCard, { y: 0, opacity: 1, duration: 0.75, ease: "expo.out" }),
          });
        }

        const tipsCard = document.querySelector(".tips-card");
        if (tipsCard) {
          gsap.set(tipsCard, { y: 20, opacity: 0 });
          ScrollTrigger.create({
            trigger: tipsCard, start: "top 90%", once: true,
            onEnter: () => gsap.to(tipsCard, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }),
          });
        }

        wordRevealScroll(document.querySelector(".table-toggle h3"), { stagger: 0.07 });

        const tableBtn = document.querySelector(".btn-toggle");
        if (tableBtn) {
          gsap.set(tableBtn, { scale: 0.92, opacity: 0 });
          ScrollTrigger.create({
            trigger: tableBtn, start: "top 90%", once: true,
            onEnter: () => gsap.to(tableBtn, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.5)" }),
          });
        }

        wordRevealScroll(document.querySelector(".cta-strip h3"), { stagger: 0.07, dur: 0.85 });

        const ctaP = document.querySelector(".cta-strip p");
        if (ctaP) {
          gsap.set(ctaP, { y: 14, opacity: 0 });
          ScrollTrigger.create({
            trigger: ctaP, start: "top 88%", once: true,
            onEnter: () => gsap.to(ctaP, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.15 }),
          });
        }

        const ctaBtns = document.querySelectorAll(".cta-btns > *");
        if (ctaBtns.length) {
          gsap.set(ctaBtns, { y: 20, opacity: 0 });
          ScrollTrigger.create({
            trigger: ".cta-btns", start: "top 90%", once: true,
            onEnter: () =>
              gsap.to(ctaBtns, { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "back.out(1.4)" }),
          });
        }
      });
    };

    init();
    return () => ctx?.revert();
  }, []);
}

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(15);
  const [showTable, setShowTable] = useState(false);

  useGsapAnimations();

  const emi = useMemo(() => calcEMI(loanAmount, interestRate, tenure), [loanAmount, interestRate, tenure]);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const schedule = useMemo(() => {
    const r = interestRate / 12 / 100;
    let balance = loanAmount;
    const rows = [];
    for (let yr = 1; yr <= tenure; yr++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const intPart = balance * r;
        const prinPart = emi - intPart;
        yearInterest += intPart;
        yearPrincipal += prinPart;
        balance -= prinPart;
        if (balance < 0) balance = 0;
      }
      rows.push({ year: yr, principal: yearPrincipal, interest: yearInterest, balance: Math.max(balance, 0) });
    }
    return rows;
  }, [loanAmount, interestRate, tenure, emi]);

  const SliderInput = ({ label, value, min, max, step, onChange, display, sublabel }) => (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-mid)", marginBottom: 3, fontFamily: "'Sora', sans-serif" }}>{label}</div>
          {sublabel && <div style={{ fontSize: 11, color: "var(--text-light)", fontFamily: "'Sora', sans-serif" }}>{sublabel}</div>}
        </div>
        <div style={{
          background: "var(--red)", color: "#fff",
          padding: "6px 16px", borderRadius: 4,
          fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700,
          letterSpacing: "0.02em", minWidth: 130, textAlign: "center"
        }}>{display}</div>
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: "100%", height: 4, accentColor: "var(--red)", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--text-light)", fontFamily: "'Sora', sans-serif" }}>
          <span>{typeof min === "number" && min >= 1000 ? formatINR(min) : min + (label.includes("Rate") ? "%" : " yrs")}</span>
          <span>{typeof max === "number" && max >= 1000 ? formatINR(max) : max + (label.includes("Rate") ? "%" : " yrs")}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        /* ── GPD FONT STACK ── Consistent Sora across all elements */
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --red: #b82a2a;
          --red-dark: #8f1e1e;
          --red-light: #d63030;
          --black: #0a0a0a;
          --charcoal: #1a1a1a;
          --warm-white: #faf9f7;
          --off-white: #f4f2ee;
          --text-dark: #1c1c1c;
          --text-mid: #5a5a5a;
          --text-light: #9a9a9a;
          --border: #e8e4de;

          /* ── All text uses Sora ── */
          --font-base: 'Sora', sans-serif;
        }

        body {
          font-family: var(--font-base);
          background: var(--warm-white);
          color: var(--text-dark);
        }

        /* ══ PRE-HIDE animated elements ══ */
        .hero-eyebrow,
        .hero h1,
        .hero-sub,
        .breadcrumb > *,
        .section-label,
        .calc-header h2,
        .calc-header p,
        .calc-card > div:not(.calc-header),
        .emi-display-card,
        .emi-label,
        .emi-amount,
        .emi-sub,
        .stat-box,
        .breakdown-card,
        .tips-card,
        .table-toggle h3,
        .btn-toggle,
        .cta-strip h3,
        .cta-strip p,
        .cta-btns > * { opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .hero-eyebrow, .hero h1, .hero-sub,
          .breadcrumb > *, .section-label, .calc-header h2,
          .calc-header p, .calc-card > div:not(.calc-header),
          .emi-display-card, .emi-label, .emi-amount, .emi-sub,
          .stat-box, .breakdown-card, .tips-card,
          .table-toggle h3, .btn-toggle,
          .cta-strip h3, .cta-strip p, .cta-btns > * {
            opacity: 1 !important; transform: none !important;
          }
        }

        /* ══ HERO ══ */
        /* Banner image lives here. Swap the url() below for your own image
           (hosted asset, CDN link, or uploaded file path) — nothing else
           needs to change. The two gradients layered on top keep the
           eyebrow/heading/sub-text readable regardless of the photo. */
        .hero {
          position: relative; width: 100%; height: 570px;
          background-image:
            url('img-37.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(184,42,42,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,42,42,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-accent {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 5px; background: var(--red);
        }
        .hero-content {
          position: relative; z-index: 2;
          width: 100%; max-width: 1280px;
          margin: 0 auto; padding: 0 80px;
        }
        .hero-eyebrow {
          font-family: var(--font-base);
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--red-light);
          margin-bottom: 14px; display: flex; align-items: center; gap: 12px;
        }
        .hero-eyebrow::after { content: ''; display: block; width: 40px; height: 1px; background: var(--red); }

        .hero h1 {
          font-family: var(--font-base);
          font-size: 58px; font-weight: 800;
          color: #fff; line-height: 1.05;
        }
        .hero h1 .accent-word { color: var(--red-light); }

        .hero-sub {
          font-family: var(--font-base);
          margin-top: 16px; font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.5); max-width: 440px; line-height: 1.75;
        }
        .hero-deco {
          position: absolute;
          right: calc((100% - 1280px) / 2 + 100px);
          top: 50%; transform: translateY(-50%);
          opacity: 0.05; pointer-events: none;
        }

        .breadcrumb {
          font-family: var(--font-base);
          padding: 14px 80px; font-size: 12px; color: var(--text-mid);
          border-bottom: 1px solid var(--border); background: #fff;
          display: flex; gap: 8px; align-items: center;
        }
        .breadcrumb a { color: var(--text-mid); text-decoration: none; }
        .breadcrumb-current { color: var(--red); font-weight: 600; }

        .calc-wrapper {
          max-width: 1280px; margin: 0 auto;
          padding: 60px 80px;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 48px; align-items: start;
        }

        .calc-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 12px; padding: 44px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.06);
        }
        .calc-header { margin-bottom: 40px; }

        .section-label {
          font-family: var(--font-base);
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--red); margin-bottom: 10px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::after { content: ''; display: block; width: 30px; height: 1px; background: var(--red); }

        .calc-header h2 {
          font-family: var(--font-base);
          font-size: 36px; font-weight: 800;
          color: var(--text-dark);
        }
        .calc-header p {
          font-family: var(--font-base);
          font-size: 13px; color: var(--text-mid); font-weight: 400;
          margin-top: 6px; line-height: 1.75;
        }

        .emi-display-card {
          background: var(--charcoal); border-radius: 12px;
          padding: 40px 36px; margin-bottom: 20px;
          position: relative; overflow: hidden;
        }
        .emi-display-card::before {
          content: ''; position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(184,42,42,0.25) 0%, transparent 70%);
          border-radius: 50%;
        }

        .emi-label {
          font-family: var(--font-base);
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px;
        }
        .emi-amount {
          font-family: var(--font-base);
          font-size: 52px; font-weight: 700;
          color: #fff; line-height: 1; margin-bottom: 4px;
        }
        .emi-amount span { font-size: 22px; font-weight: 700; color: var(--red-light); margin-right: 6px; }
        .emi-sub {
          font-family: var(--font-base);
          font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.03em; margin-bottom: 32px;
        }

        .result-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .stat-box {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 18px 20px;
        }
        .stat-box-label {
          font-family: var(--font-base);
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 8px;
        }
        .stat-box-value {
          font-family: var(--font-base);
          font-size: 17px; font-weight: 600; color: #fff;
        }
        .stat-box-value.accent { color: var(--red-light); }

        .breakdown-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 12px; padding: 32px 36px;
        }
        .breakdown-title {
          font-family: var(--font-base);
          font-size: 13px; font-weight: 700; color: var(--text-dark); margin-bottom: 24px;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .breakdown-inner { display: flex; align-items: center; gap: 24px; }
        .donut-wrap { flex: 0 0 auto; }
        .legend { display: flex; flex-direction: column; gap: 16px; flex: 1; }
        .legend-item { display: flex; align-items: center; gap: 12px; }
        .legend-dot { width: 12px; height: 12px; border-radius: 2px; flex-shrink: 0; }
        .legend-item-label {
          font-family: var(--font-base);
          font-size: 10px; color: var(--text-light); font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 2px;
        }
        .legend-item-value {
          font-family: var(--font-base);
          font-size: 15px; font-weight: 600; color: var(--text-dark);
        }
        .legend-item-pct {
          font-family: var(--font-base);
          font-size: 11px; color: var(--text-light);
        }

        .tips-card {
          background: var(--off-white); border: 1px solid var(--border);
          border-radius: 12px; padding: 28px 32px; margin-top: 20px;
        }
        .tips-card h4 {
          font-family: var(--font-base);
          font-size: 12px; font-weight: 800; color: var(--text-dark);
          margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .tip-row {
          font-family: var(--font-base);
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 12px; font-size: 13px; color: var(--text-mid); line-height: 1.7;
        }
        .tip-dot { width: 6px; height: 6px; background: var(--red); border-radius: 50%; margin-top: 7px; flex-shrink: 0; }

        .table-section { max-width: 1280px; margin: 0 auto; padding: 0 80px 80px; }
        .table-toggle { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
        .table-toggle h3 {
          font-family: var(--font-base);
          font-size: 28px; font-weight: 800;
          color: var(--text-dark);
        }
        .btn-toggle {
          font-family: var(--font-base);
          background: none; border: 1.5px solid var(--red); color: var(--red);
          padding: 8px 20px; font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; border-radius: 4px; transition: background 0.2s, color 0.2s;
        }
        .btn-toggle:hover, .btn-toggle.active { background: var(--red); color: #fff; }
        .amort-table {
          width: 100%; border-collapse: collapse; background: #fff;
          border: 1px solid var(--border); border-radius: 10px;
          overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .amort-table thead tr { background: var(--charcoal); }
        .amort-table thead th {
          font-family: var(--font-base);
          padding: 16px 20px; text-align: left; font-size: 11px;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .amort-table tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        .amort-table tbody tr:last-child { border-bottom: none; }
        .amort-table tbody tr:hover { background: var(--off-white); }
        .amort-table td {
          font-family: var(--font-base);
          padding: 14px 20px; font-size: 13.5px; color: var(--text-dark);
        }
        .amort-table td:first-child {
          font-weight: 700; color: var(--red);
        }
        .bar-wrap { display: flex; align-items: center; gap: 10px; }
        .bar-bg { flex: 1; height: 4px; background: var(--off-white); border-radius: 2px; }
        .bar-fill { height: 4px; background: var(--red); border-radius: 2px; transition: width 0.3s; }
        .bar-pct {
          font-family: var(--font-base);
          font-size: 11px; color: var(--text-light); min-width: 36px;
        }

        .cta-strip {
          background: var(--red); padding: 52px 80px;
          display: flex; align-items: center; justify-content: space-between; gap: 40px;
        }
        .cta-strip h3 {
          font-family: var(--font-base);
          font-size: 36px; font-weight: 800; color: #fff;
        }
        .cta-strip p {
          font-family: var(--font-base);
          font-size: 14px; color: rgba(255,255,255,0.75); margin-top: 6px; font-weight: 400;
        }
        .cta-btns { display: flex; gap: 14px; flex-shrink: 0; }
        .btn-white {
          font-family: var(--font-base);
          background: #fff; color: var(--red); border: none;
          padding: 13px 28px; font-size: 12px; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px;
        }
        .btn-outline-white {
          font-family: var(--font-base);
          background: none; color: #fff;
          border: 1.5px solid rgba(255,255,255,0.5);
          padding: 13px 28px; font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px;
        }
        .btn-outline-white:hover { border-color: #fff; }

        input[type=range] {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 4px;
          background: linear-gradient(to right, var(--red) 0%, var(--red) var(--val, 50%), var(--border) var(--val, 50%));
          border-radius: 2px; outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: #fff; border: 2.5px solid var(--red);
          box-shadow: 0 2px 8px rgba(184,42,42,0.3); cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: #fff; border: 2.5px solid var(--red); cursor: pointer;
        }

        input[type=number] {
          font-family: var(--font-base) !important;
        }

        @media (max-width: 1279px) {
          .hero-content { padding: 0 48px; }
          .hero-deco { right: 48px; }
          .breadcrumb { padding: 14px 48px; }
          .calc-wrapper { padding: 52px 48px; }
          .table-section { padding: 0 48px 72px; }
          .cta-strip { padding: 48px 48px; }
        }
        @media (max-width: 1023px) {
          .hero { height: 360px; }
          .hero h1 { font-size: 44px; }
          .hero-content { padding: 0 32px; }
          .hero-deco { display: none; }
          .breadcrumb { padding: 12px 32px; }
          .calc-wrapper { grid-template-columns: 1fr; padding: 40px 32px; gap: 32px; }
          .table-section { padding: 0 32px 64px; }
          .cta-strip { flex-direction: column; align-items: flex-start; padding: 44px 32px; }
        }
        @media (max-width: 899px) {
          .hero { height: 320px; }
          .hero h1 { font-size: 36px; }
          .hero-content { padding: 0 24px; }
          .breadcrumb { padding: 12px 24px; }
          .calc-wrapper { padding: 32px 24px; }
          .calc-card { padding: 32px 28px; }
          .emi-display-card { padding: 32px 28px; }
          .breakdown-card { padding: 28px 24px; }
          .table-section { padding: 0 24px 52px; }
          .cta-strip { padding: 40px 24px; }
          .cta-btns { flex-direction: column; width: 100%; }
          .btn-white, .btn-outline-white { width: 100%; text-align: center; }
        }
        @media (max-width: 599px) {
          .hero { height: 280px; }
          .hero h1 { font-size: 30px; }
          .hero-eyebrow { font-size: 10px; }
          .hero-sub { font-size: 12px; max-width: 100%; }
          .calc-wrapper { padding: 24px 16px; }
          .calc-card { padding: 24px 20px; }
          .calc-header h2 { font-size: 28px; }
          .emi-display-card { padding: 28px 20px; }
          .emi-amount { font-size: 40px; }
          .result-stats { grid-template-columns: 1fr; }
          .breakdown-inner { flex-direction: column; align-items: center; }
          .tips-card { padding: 20px; }
          .table-section { padding: 0 16px 44px; }
          .table-toggle { flex-direction: column; align-items: flex-start; gap: 12px; }
          .amort-table thead th:nth-child(4),
          .amort-table td:nth-child(4) { display: none; }
          .cta-strip { padding: 36px 16px; }
          .cta-strip h3 { font-size: 28px; }
          .breadcrumb { padding: 10px 16px; }
        }
        @media (max-width: 479px) {
          .hero { height: 240px; }
          .hero h1 { font-size: 26px; }
          .hero-accent { width: 3px; }
          .calc-card { padding: 20px 16px; }
          .calc-header h2 { font-size: 24px; }
          .emi-amount { font-size: 34px; }
          .emi-amount span { font-size: 16px; }
          .amort-table thead th:nth-child(5),
          .amort-table td:nth-child(5) { display: none; }
          .amort-table td, .amort-table thead th { padding: 12px 10px; font-size: 12px; }
          .cta-strip h3 { font-size: 24px; }
        }
        @media (max-width: 359px) {
          .hero { height: 210px; }
          .hero h1 { font-size: 22px; }
          .hero-content { padding: 0 14px; }
          .calc-wrapper, .table-section, .cta-strip, .breadcrumb { padding-left: 12px; padding-right: 12px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-accent" />
        <div className="hero-content">
          <div className="hero-eyebrow">Financial Planning Tool</div>
          <h1>EMI Calculator</h1>
          <p className="hero-sub">
            Plan your plot investment with confidence. Adjust loan amount, interest rate, and tenure to instantly see your monthly commitment.
          </p>
        </div>
        <div className="hero-deco" aria-hidden="true">
          <svg viewBox="0 0 300 300" width="280" height="280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="0.8"/>
            <circle cx="150" cy="150" r="80" stroke="white" strokeWidth="0.8"/>
            <circle cx="150" cy="150" r="40" stroke="white" strokeWidth="0.8"/>
            <line x1="30" y1="150" x2="270" y2="150" stroke="white" strokeWidth="0.8"/>
            <line x1="150" y1="30" x2="150" y2="270" stroke="white" strokeWidth="0.8"/>
            <line x1="65" y1="65" x2="235" y2="235" stroke="white" strokeWidth="0.5"/>
            <line x1="235" y1="65" x2="65" y2="235" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span style={{ color: "var(--border)" }}>›</span>
        <span className="breadcrumb-current">EMI Calculator</span>
      </div>

      {/* MAIN CALCULATOR */}
      <div className="calc-wrapper">

        {/* LEFT: Sliders */}
        <div className="calc-card">
          <div className="calc-header">
            <div className="section-label">Loan Details</div>
            <h2>Calculate Your EMI</h2>
            <p>Move the sliders to adjust your loan parameters. Results update instantly.</p>
          </div>

          <div style={{ "--val": `${((loanAmount - 500000) / (10000000 - 500000)) * 100}%` }}>
            <SliderInput label="Loan Amount" value={loanAmount} min={500000} max={10000000} step={50000}
              onChange={setLoanAmount} display={formatINR(loanAmount)} sublabel="Plot / Property value" />
          </div>

          <div style={{ "--val": `${((interestRate - 4) / (15 - 4)) * 100}%` }}>
            <SliderInput label="Annual Interest Rate" value={interestRate} min={4} max={15} step={0.1}
              onChange={setInterestRate} display={`${interestRate.toFixed(1)}% p.a.`} sublabel="Per annum interest" />
          </div>

          <div style={{ "--val": `${((tenure - 1) / (30 - 1)) * 100}%` }}>
            <SliderInput label="Loan Tenure" value={tenure} min={1} max={30} step={1}
              onChange={setTenure} display={`${tenure} Years`} sublabel={`${tenure * 12} monthly instalments`} />
          </div>

          {/* Manual inputs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 8 }}>
            {[
              { label: "Loan Amount (₹)", value: loanAmount, setter: setLoanAmount, min: 500000, max: 10000000 },
              { label: "Rate (%)", value: interestRate, setter: setInterestRate, min: 4, max: 15 },
              { label: "Tenure (Yrs)", value: tenure, setter: setTenure, min: 1, max: 30 },
            ].map(({ label, value, setter, min, max }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 6 }}>{label}</div>
                <input
                  type="number" value={value} min={min} max={max}
                  onChange={e => { const v = Number(e.target.value); if (v >= min && v <= max) setter(v); }}
                  style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 6, padding: "10px 12px", fontFamily: "'Sora', sans-serif", fontSize: 13, color: "var(--text-dark)", background: "var(--warm-white)", outline: "none" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div>
          <div className="emi-display-card">
            <div className="emi-label">Your Monthly EMI</div>
            <div className="emi-amount">
              <span>₹</span>{Math.round(emi).toLocaleString("en-IN")}
            </div>
            <div className="emi-sub">Per month for {tenure} years</div>
            <div className="result-stats">
              <div className="stat-box">
                <div className="stat-box-label">Principal</div>
                <div className="stat-box-value">{formatINR(loanAmount)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-box-label">Total Interest</div>
                <div className="stat-box-value accent">{formatINR(totalInterest)}</div>
              </div>
              <div className="stat-box" style={{ gridColumn: "1 / -1" }}>
                <div className="stat-box-label">Total Payment</div>
                <div className="stat-box-value" style={{ fontSize: 20 }}>{formatINR(totalPayment)}</div>
              </div>
            </div>
          </div>

          <div className="breakdown-card">
            <div className="breakdown-title">Payment Breakdown</div>
            <div className="breakdown-inner">
              <div className="donut-wrap">
                <DonutChart principal={loanAmount} interest={totalInterest} />
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#b82a2a" }} />
                  <div>
                    <div className="legend-item-label">Principal</div>
                    <div className="legend-item-value">{formatINR(loanAmount)}</div>
                    <div className="legend-item-pct">{((loanAmount / totalPayment) * 100).toFixed(1)}% of total</div>
                  </div>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#f0c0c0" }} />
                  <div>
                    <div className="legend-item-label">Interest</div>
                    <div className="legend-item-value">{formatINR(totalInterest)}</div>
                    <div className="legend-item-pct">{((totalInterest / totalPayment) * 100).toFixed(1)}% of total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tips-card">
            <h4>💡 Smart Investment Tips</h4>
            <div className="tip-row"><div className="tip-dot" /><span>A higher down payment reduces your interest burden significantly over the tenure.</span></div>
            <div className="tip-row"><div className="tip-dot" /><span>Plots appreciate over time — your EMI is an investment, not just an expense.</span></div>
            <div className="tip-row"><div className="tip-dot" /><span>Genuine plots offer flexible EMI options — contact us to customize your plan.</span></div>
          </div>
        </div>
      </div>

      {/* AMORTIZATION TABLE */}
      <div className="table-section">
        <div className="table-toggle">
          <h3>Yearly Amortization Schedule</h3>
          <button className={`btn-toggle${showTable ? " active" : ""}`} onClick={() => setShowTable(!showTable)}>
            {showTable ? "Hide Table" : "View Table"}
          </button>
        </div>
        {showTable && (
          <table className="amort-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Principal Paid</th>
                <th>Interest Paid</th>
                <th>Balance Remaining</th>
                <th style={{ width: 180 }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => {
                const paidPct = ((loanAmount - row.balance) / loanAmount) * 100;
                return (
                  <tr key={row.year}>
                    <td>Year {row.year}</td>
                    <td>{formatINR(row.principal)}</td>
                    <td style={{ color: "var(--red)" }}>{formatINR(row.interest)}</td>
                    <td style={{ color: "var(--text-mid)" }}>{formatINR(row.balance)}</td>
                    <td>
                      <div className="bar-wrap">
                        <div className="bar-bg"><div className="bar-fill" style={{ width: `${paidPct}%` }} /></div>
                        <span className="bar-pct">{paidPct.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div>
          <h3>Ready to Make Your Plot a Reality?</h3>
          <p>Our finance team will help you find the best EMI plan for your budget.</p>
        </div>
        <div className="cta-btns">
          <button className="btn-outline-white">Download Brochure</button>
          <button className="btn-white">Book A Free Site Visit →</button>
        </div>
      </section>
    </>
  );
}