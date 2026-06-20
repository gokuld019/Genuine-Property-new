"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", interest: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const gsapLoaded = useRef(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  useEffect(() => {
    if (gsapLoaded.current) return;
    gsapLoaded.current = true;

    const script1 = document.createElement("script");
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      script2.onload = initAnimations;
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);

    function splitIntoWordSpans(el, accentWords = []) {
      const words = el.textContent.trim().split(" ");
      el.innerHTML = words.map(w => {
        const isAccent = accentWords.includes(w);
        return `<span class="gpd-word-outer" style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span class="gpd-word-inner${isAccent ? " gpd-accent" : ""}" style="display:inline-block;transform:translateY(110%)">${w}</span></span>`;
      }).join("");
    }

    function revealWords(container, tl, offset = "0") {
      const inners = container.querySelectorAll(".gpd-word-inner");
      tl.to(inners, {
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
      }, offset);
    }

    function initAnimations() {
      const { gsap } = window;
      const { ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      /* ──────────────────────────────────────────
         HERO — staggered reveal sequence
      ────────────────────────────────────────── */
      const heroAccentBar  = document.querySelector(".hero-accent-line");
      const heroEyebrowBar = document.querySelector(".hero-eyebrow-bar");
      const heroEyebrowTxt = document.querySelector(".hero-eyebrow-text");
      const heroH1         = document.querySelector(".hero h1");
      const heroSub        = document.querySelector(".hero-sub");

      // Split h1 into word spans
      if (heroH1) {
        splitIntoWordSpans(heroH1, ["Dream", "Journey"]);
        // Apply accent colour via CSS class after split
        heroH1.querySelectorAll(".gpd-accent").forEach(el => {
          el.style.color = "var(--red-light)";
        });
      }

      // Set initial states
      gsap.set(heroAccentBar, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(heroEyebrowBar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(heroEyebrowTxt, { opacity: 0, x: -16 });
      if (heroSub) gsap.set(heroSub, { opacity: 0, y: 18 });

      const heroTl = gsap.timeline({ delay: 0.15 });

      // 1. Accent bar grows downward
      heroTl.to(heroAccentBar, {
        scaleY: 1, duration: 0.55, ease: "power3.out"
      });

      // 2. Eyebrow: line grows then text fades in
      heroTl.to(heroEyebrowBar, {
        scaleX: 1, duration: 0.4, ease: "power2.out"
      }, "-=0.2");

      heroTl.to(heroEyebrowTxt, {
        opacity: 1, x: 0, duration: 0.4, ease: "power2.out"
      }, "-=0.15");

      // 3. H1 words clip-reveal upward
      if (heroH1) revealWords(heroH1, heroTl, "-=0.15");

      // 4. Subtitle fades up
      if (heroSub) {
        heroTl.to(heroSub, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out"
        }, "-=0.3");
      }

      // Hero parallax grid
      gsap.to(".hero-grid-overlay", {
        backgroundPositionY: "60px",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero", start: "top top", end: "bottom top", scrub: 1
        }
      });

      /* ──────────────────────────────────────────
         SECTION LABEL — slide in with bar
      ────────────────────────────────────────── */
      gsap.utils.toArray(".section-label").forEach(el => {
        const bar = el.querySelector(".sl-bar");
        const txt = el.querySelector(".sl-text");
        if (!bar || !txt) return;
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(txt, { opacity: 0, x: -14 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
        });
        tl.to(bar, { scaleX: 1, duration: 0.4, ease: "power2.out" })
          .to(txt, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, "-=0.1");
      });

      /* ──────────────────────────────────────────
         INFO COL H2 — word-clip reveal on scroll
      ────────────────────────────────────────── */
      const infoH2 = document.querySelector(".contact-info-col h2");
      if (infoH2) {
        splitIntoWordSpans(infoH2, ["Help", "You"]);
        infoH2.querySelectorAll(".gpd-accent").forEach(el => {
          el.style.color = "var(--red)";
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: infoH2, start: "top 85%", toggleActions: "play none none none" }
        });
        revealWords(infoH2, tl, "0");
      }

      /* ──────────────────────────────────────────
         CONTACT DESC — line-by-line fade up
      ────────────────────────────────────────── */
      const desc = document.querySelector(".contact-desc");
      if (desc) {
        gsap.from(desc, {
          opacity: 0, y: 24, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: desc, start: "top 87%", toggleActions: "play none none none" }
        });
      }

      /* ──────────────────────────────────────────
         CONTACT CARDS — stagger slide-up with border flash
      ────────────────────────────────────────── */
      const cards = gsap.utils.toArray(".contact-card");
      gsap.set(cards, { opacity: 0, y: 48, x: -8 });
      gsap.to(cards, {
        opacity: 1, y: 0, x: 0,
        duration: 0.65, ease: "power3.out", stagger: 0.13,
        scrollTrigger: { trigger: ".contact-cards", start: "top 85%", toggleActions: "play none none none" },
        onComplete: () => {
          // Flash border colour briefly on each card
          cards.forEach((card, i) => {
            gsap.to(card, {
              borderLeftColor: "#d63030",
              duration: 0.2,
              delay: i * 0.12,
              yoyo: true,
              repeat: 1,
              ease: "none"
            });
          });
        }
      });

      // Magnetic hover on cards
      cards.forEach(card => {
        card.addEventListener("mousemove", e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width  / 2) / r.width  * 7;
          const y = (e.clientY - r.top  - r.height / 2) / r.height * 5;
          gsap.to(card, { x, y, duration: 0.3, ease: "power1.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        });
      });

      /* ──────────────────────────────────────────
         HOURS BLOCK — reveal + row stagger
      ────────────────────────────────────────── */
      gsap.from(".hours-block", {
        opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".hours-block", start: "top 88%", toggleActions: "play none none none" }
      });
      gsap.from(".hours-row", {
        opacity: 0, x: -20, duration: 0.45, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".hours-block", start: "top 84%", toggleActions: "play none none none" }
      });

      /* ──────────────────────────────────────────
         FORM CARD — rise up with slight scale
      ────────────────────────────────────────── */
      gsap.from(".form-card", {
        opacity: 0, y: 56, scale: 0.98, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".form-card", start: "top 85%", toggleActions: "play none none none" }
      });

      // Form header text
      const formH3 = document.querySelector(".form-header h3");
      if (formH3) {
        splitIntoWordSpans(formH3);
        gsap.set(formH3.querySelectorAll(".gpd-word-inner"), { y: "110%" });
        gsap.to(formH3.querySelectorAll(".gpd-word-inner"), {
          y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: formH3, start: "top 85%", toggleActions: "play none none none" }
        });
      }

      // Form fields stagger
      gsap.from(".form-group", {
        opacity: 0, y: 22, duration: 0.5, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".form-grid", start: "top 83%", toggleActions: "play none none none" }
      });

      /* ──────────────────────────────────────────
         MAP SECTION
      ────────────────────────────────────────── */

      // Info panel slides in from left
      gsap.from(".map-info-panel", {
        opacity: 0, x: -52, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".map-section", start: "top 80%", toggleActions: "play none none none" }
      });

      // Map panel heading word-reveal
      const mapH3 = document.querySelector(".map-info-panel h3");
      if (mapH3) {
        splitIntoWordSpans(mapH3);
        mapH3.querySelectorAll(".gpd-word-inner").forEach(el => { el.style.color = "#fff"; });
        gsap.set(mapH3.querySelectorAll(".gpd-word-inner"), { y: "110%" });
        gsap.to(mapH3.querySelectorAll(".gpd-word-inner"), {
          y: 0, duration: 0.65, ease: "power3.out", stagger: 0.1, delay: 0.2,
          scrollTrigger: { trigger: ".map-section", start: "top 80%", toggleActions: "play none none none" }
        });
      }

      // Address items stagger from left
      gsap.from(".map-address-item", {
        opacity: 0, x: -24, duration: 0.5, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".map-info-panel", start: "top 78%", toggleActions: "play none none none" }
      });

      // Map pin scale bounce in
      gsap.from(".map-pin", {
        opacity: 0, scale: 0.6, duration: 0.75, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".map-placeholder", start: "top 80%", toggleActions: "play none none none" }
      });

      // Pin name — char-by-char typewriter
      const pinName = document.querySelector(".map-pin-name");
      if (pinName) {
        const raw = pinName.textContent.trim();
        pinName.innerHTML = raw.split("").map(ch =>
          `<span style="display:inline-block;opacity:0;transform:translateY(8px)">${ch === " " ? "&nbsp;" : ch}</span>`
        ).join("");
        gsap.to(pinName.querySelectorAll("span"), {
          opacity: 1, y: 0,
          duration: 0.001,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: { trigger: ".map-pin", start: "top 80%", toggleActions: "play none none none" }
        });
      }

      // Map pin label fade
      gsap.from(".map-pin-label", {
        opacity: 0, duration: 0.6, ease: "power1.out", delay: 0.9,
        scrollTrigger: { trigger: ".map-pin", start: "top 80%", toggleActions: "play none none none" }
      });

      /* ──────────────────────────────────────────
         VISIT CTA
      ────────────────────────────────────────── */
      const ctaH3 = document.querySelector(".visit-cta-left h3");
      if (ctaH3) {
        splitIntoWordSpans(ctaH3, ["Just", "A", "Visit", "Away!"]);
        ctaH3.querySelectorAll(".gpd-word-inner").forEach(el => {
          el.style.color = "var(--text-dark)";
        });
        ctaH3.querySelectorAll(".gpd-word-outer .gpd-accent").forEach(el => {
          el.style.fontWeight = "700";
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".visit-cta", start: "top 85%", toggleActions: "play none none none" }
        });
        revealWords(ctaH3, tl, "0");
      }

      // CTA subtitle
      gsap.from(".visit-cta-left p", {
        opacity: 0, y: 16, duration: 0.55, ease: "power2.out", delay: 0.45,
        scrollTrigger: { trigger: ".visit-cta", start: "top 85%", toggleActions: "play none none none" }
      });

      // CTA buttons stagger
      gsap.from([".btn-outline", ".btn-primary"], {
        opacity: 0, y: 24, duration: 0.55, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".visit-cta-right", start: "top 88%", toggleActions: "play none none none" }
      });

      // Button hover pulse
      [".btn-outline", ".btn-primary"].forEach(sel => {
        document.querySelectorAll(sel).forEach(btn => {
          btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { scale: 1.03, duration: 0.2, ease: "power1.out" });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { scale: 1, duration: 0.25, ease: "elastic.out(1, 0.5)" });
          });
        });
      });
    }
  }, []);

  return (
    <>
      <style>{`
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
          --font-base: 'Sora', sans-serif;
        }

        body { font-family: var(--font-base); background: var(--warm-white); color: var(--text-dark); overflow-x: hidden; }

        /* ════ HERO ════ */
        /* Banner image lives here. Swap the url() below for your own image
           (hosted asset, CDN link, or uploaded file path) — nothing else
           needs to change. The gradient layered on top of the image keeps
           the eyebrow/heading/sub-text readable regardless of the photo. */
        .hero {
          position: relative; width: 100%; height: 560px;
          background-image:
            url('contactus.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(184,42,42,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,42,42,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-accent-line {
          position: absolute; left: 0; top: 0; bottom: 0; width: 5px;
          background: var(--red);
        }
        .hero-content {
          position: relative; z-index: 2;
          width: 100%; max-width: 1280px;
          margin: 0 auto; padding: 0 80px;
        }
        .hero-eyebrow {
          font-family: var(--font-base);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--red-light); margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .hero-eyebrow-bar {
          display: block; width: 40px; height: 1px;
          background: var(--red); flex-shrink: 0;
        }
        .hero-eyebrow-text { display: block; }
        .hero h1 {
          font-family: var(--font-base);
          font-size: 64px; font-weight: 800;
          color: #fff; line-height: 1.05; letter-spacing: -0.01em;
          perspective: 600px;
          min-height: 1.2em;
        }
        .hero-sub {
          font-family: var(--font-base);
          margin-top: 20px; font-size: 14px; font-weight: 300;
          color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 420px;
        }
        .hero-deco {
          position: absolute; right: 80px; top: 50%;
          transform: translateY(-50%); opacity: 0.06; pointer-events: none;
        }
        .hero-deco svg { width: 300px; height: 300px; }

        /* ════ BREADCRUMB ════ */
        .breadcrumb {
          font-family: var(--font-base);
          padding: 14px 80px; font-size: 12px; color: var(--text-mid);
          border-bottom: 1px solid var(--border); background: #fff;
          display: flex; gap: 8px; align-items: center;
        }
        .breadcrumb a { color: var(--text-mid); text-decoration: none; }
        .breadcrumb a:hover { color: var(--red); }
        .breadcrumb-sep { color: var(--border); }
        .breadcrumb-current { color: var(--red); font-weight: 600; }

        /* ════ CONTACT GRID ════ */
        .contact-section {
          padding: 80px;
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 60px; max-width: 1300px; margin: 0 auto;
        }

        /* ════ LEFT ════ */
        .section-label {
          font-family: var(--font-base);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--red); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .sl-bar {
          display: block; width: 30px; height: 1px;
          background: var(--red); flex-shrink: 0;
        }
        .sl-text { display: block; }

        .contact-info-col h2 {
          font-family: var(--font-base);
          font-size: 44px; font-weight: 800;
          line-height: 1.2; color: var(--text-dark); margin-bottom: 16px;
          min-height: 1.2em;
          display: block;
        }
        .contact-desc {
          font-family: var(--font-base);
          font-size: 14px; font-weight: 300;
          color: var(--text-mid); line-height: 1.8;
          margin-bottom: 40px; max-width: 380px;
        }
        .contact-cards { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
        .contact-card {
          display: flex; align-items: flex-start; gap: 18px;
          padding: 22px 24px; background: #fff;
          border: 1px solid var(--border); border-left: 4px solid var(--red);
          border-radius: 6px; transition: box-shadow 0.2s; will-change: transform;
        }
        .contact-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
        .cc-icon {
          width: 44px; height: 44px; min-width: 44px;
          background: var(--off-white); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-icon svg { width: 22px; height: 22px; stroke: var(--red); fill: none; stroke-width: 1.8; }
        .cc-label {
          font-family: var(--font-base);
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-light); margin-bottom: 4px;
        }
        .cc-value {
          font-family: var(--font-base);
          font-size: 14px; font-weight: 500; color: var(--text-dark); line-height: 1.5;
        }
        .cc-value a { color: var(--text-dark); text-decoration: none; }
        .cc-value a:hover { color: var(--red); }
        .hours-block { background: var(--charcoal); border-radius: 8px; padding: 24px 28px; color: #fff; }
        .hours-title {
          font-family: var(--font-base);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 16px;
        }
        .hours-row {
          font-family: var(--font-base);
          display: flex; justify-content: space-between;
          font-size: 13px; color: rgba(255,255,255,0.85);
          padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .hours-row:last-child { border-bottom: none; }
        .hours-row .day { font-weight: 300; }
        .hours-row .time { font-weight: 600; color: var(--red-light); }

        /* ════ RIGHT: Form ════ */
        .form-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 12px; padding: 48px 44px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.06);
          will-change: transform;
        }
        .form-header { margin-bottom: 36px; }
        .form-header h3 {
          font-family: var(--font-base);
          font-size: 30px; font-weight: 800;
          color: var(--text-dark); margin-bottom: 6px;
          min-height: 1.2em;
          display: block;
        }
        .form-header p {
          font-family: var(--font-base);
          font-size: 13px; color: var(--text-mid); font-weight: 300;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label {
          font-family: var(--font-base);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-mid);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          font-family: var(--font-base);
          border: 1.5px solid var(--border); border-radius: 6px;
          padding: 13px 16px; font-size: 13px;
          color: var(--text-dark); background: var(--warm-white);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--red);
          box-shadow: 0 0 0 3px rgba(184,42,42,0.08); background: #fff;
        }
        .form-group textarea { resize: none; height: 120px; }
        .form-group select { appearance: none; cursor: pointer; }
        .form-submit { margin-top: 28px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .btn-submit {
          font-family: var(--font-base);
          background: var(--red); color: #fff; border: none;
          padding: 15px 36px; font-size: 13px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; border-radius: 6px;
          transition: background 0.2s, transform 0.15s;
          will-change: transform;
        }
        .btn-submit:hover { background: var(--red-dark); transform: translateY(-1px); }
        .form-note {
          font-family: var(--font-base);
          font-size: 11px; color: var(--text-light); line-height: 1.6;
        }
        .success-msg { text-align: center; padding: 60px 20px; }
        .success-icon {
          width: 64px; height: 64px; background: rgba(184,42,42,0.08);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .success-icon svg { width: 30px; height: 30px; stroke: var(--red); fill: none; stroke-width: 2; }
        .success-msg h4 {
          font-family: var(--font-base);
          font-size: 28px; font-weight: 800; color: var(--text-dark); margin-bottom: 10px;
        }
        .success-msg p {
          font-family: var(--font-base);
          font-size: 13px; color: var(--text-mid);
        }

        /* ════ MAP ════ */
        .map-section { background: var(--charcoal); position: relative; overflow: hidden; }
        .map-section-inner { display: grid; grid-template-columns: 360px 1fr; }
        .map-info-panel {
          background: var(--red); padding: 60px 48px;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; z-index: 2;
          will-change: transform;
        }
        .map-info-panel::after {
          content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 60px;
          background: var(--red); clip-path: polygon(0 0, 0 100%, 100% 100%); z-index: 1;
        }
        .map-info-panel h3 {
          font-family: var(--font-base);
          font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 8px;
          min-height: 1.2em;
        }
        .map-info-panel p {
          font-family: var(--font-base);
          font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 32px; line-height: 1.7;
        }
        .map-address-item {
          font-family: var(--font-base);
          display: flex; align-items: flex-start; gap: 12px;
          margin-bottom: 20px; color: rgba(255,255,255,0.9);
        }
        .map-address-item svg { width: 18px; height: 18px; min-width: 18px; stroke: rgba(255,255,255,0.7); fill: none; stroke-width: 1.8; margin-top: 1px; }
        .map-address-item span { font-size: 13px; line-height: 1.6; }
        .map-address-item strong {
          display: block; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 2px;
        }
        .map-placeholder {
          height: 420px;
          background: linear-gradient(160deg, #1e1e1e 0%, #111 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .map-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .map-pin { position: relative; z-index: 2; text-align: center; will-change: transform; }
        .map-pin-icon {
          width: 56px; height: 56px; background: var(--red);
          border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
          margin: 0 auto 16px; box-shadow: 0 8px 24px rgba(184,42,42,0.5);
        }
        .map-pin-name {
          font-family: var(--font-base);
          font-size: 22px; color: #fff; font-weight: 700;
        }
        .map-pin-label {
          font-family: var(--font-base);
          font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 300; letter-spacing: 0.05em;
        }
        .open-map-btn {
          margin-top: 16px; display: inline-block; padding: 10px 22px;
          border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.7);
          font-family: var(--font-base);
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; border-radius: 4px; transition: background 0.2s, color 0.2s;
        }
        .open-map-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

        /* ════ VISIT CTA ════ */
        .visit-cta {
          background: var(--off-white); border-top: 1px solid var(--border);
          padding: 60px 80px;
          display: flex; align-items: center; justify-content: space-between; gap: 40px;
        }
        .visit-cta-left h3 {
          font-family: var(--font-base);
          font-size: 36px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px;
          min-height: 1.2em;
          display: block;
        }
        .visit-cta-left p {
          font-family: var(--font-base);
          font-size: 14px; color: var(--text-mid); font-weight: 300;
        }
        .visit-cta-right { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .btn-outline {
          font-family: var(--font-base);
          border: 1.5px solid var(--red); color: var(--red); background: none;
          padding: 13px 28px; font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; border-radius: 4px; transition: background 0.2s, color 0.2s;
          will-change: transform;
        }
        .btn-outline:hover { background: var(--red); color: #fff; }
        .btn-primary {
          font-family: var(--font-base);
          background: var(--red); color: #fff; border: none;
          padding: 13px 28px; font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; border-radius: 4px; transition: background 0.2s;
          will-change: transform;
        }
        .btn-primary:hover { background: var(--red-dark); }

        /* Word-clip utility (set by JS) */
        .gpd-word-outer { display: inline-block; overflow: hidden; vertical-align: bottom; margin-right: 0.25em; }
        .gpd-word-inner { display: inline-block; }

        /* ════ RESPONSIVE ════ */
        @media (max-width: 1279px) {
          .hero-content { padding: 0 48px; }
          .hero-deco { right: 48px; }
          .breadcrumb { padding: 14px 48px; }
          .contact-section { padding: 64px 48px; gap: 48px; }
          .visit-cta { padding: 52px 48px; }
        }
        @media (max-width: 1023px) {
          .hero { height: 360px; }
          .hero h1 { font-size: 48px; }
          .hero-content { padding: 0 32px; }
          .hero-deco { display: none; }
          .breadcrumb { padding: 12px 32px; }
          .contact-section { grid-template-columns: 1fr; padding: 52px 32px; gap: 40px; }
          .contact-desc { max-width: 100%; }
          .map-section-inner { grid-template-columns: 1fr; }
          .map-info-panel { padding: 48px 32px; }
          .map-info-panel::after { display: none; }
          .map-placeholder { height: 320px; }
          .visit-cta { padding: 48px 32px; }
        }
        @media (max-width: 899px) {
          .hero { height: 320px; }
          .hero h1 { font-size: 40px; }
          .hero-content { padding: 0 24px; }
          .hero-sub { font-size: 13px; }
          .breadcrumb { padding: 12px 24px; }
          .contact-section { padding: 40px 24px; gap: 36px; }
          .contact-info-col h2 { font-size: 36px; }
          .form-card { padding: 36px 28px; }
          .form-header h3 { font-size: 26px; }
          .map-info-panel { padding: 40px 24px; }
          .map-placeholder { height: 280px; }
          .map-pin-name { font-size: 18px; }
          .visit-cta { flex-direction: column; align-items: flex-start; padding: 40px 24px; }
          .visit-cta-right { width: 100%; }
          .btn-outline, .btn-primary { flex: 1; text-align: center; }
        }
        @media (max-width: 599px) {
          .hero { height: 280px; }
          .hero h1 { font-size: 32px; }
          .hero-eyebrow { font-size: 10px; }
          .hero-sub { font-size: 12px; max-width: 100%; margin-top: 14px; }
          .breadcrumb { padding: 10px 16px; font-size: 11px; }
          .contact-section { padding: 32px 16px; gap: 32px; }
          .contact-info-col h2 { font-size: 30px; }
          .contact-desc { font-size: 13px; margin-bottom: 28px; }
          .contact-card { padding: 16px 18px; gap: 14px; }
          .cc-icon { width: 38px; height: 38px; min-width: 38px; }
          .cc-value { font-size: 13px; }
          .hours-block { padding: 20px 20px; }
          .form-card { padding: 28px 20px; }
          .form-grid { grid-template-columns: 1fr; }
          .form-header h3 { font-size: 24px; }
          .form-submit { flex-direction: column; align-items: flex-start; }
          .btn-submit { width: 100%; text-align: center; }
          .map-info-panel { padding: 32px 16px; }
          .map-info-panel h3 { font-size: 26px; }
          .map-placeholder { height: 240px; }
          .visit-cta { padding: 32px 16px; gap: 24px; }
          .visit-cta-left h3 { font-size: 28px; }
          .visit-cta-right { flex-direction: column; gap: 12px; }
          .btn-outline, .btn-primary { width: 100%; text-align: center; padding: 13px 20px; }
        }
        @media (max-width: 479px) {
          .hero { height: 240px; }
          .hero h1 { font-size: 26px; }
          .hero-sub { font-size: 12px; margin-top: 12px; }
          .hero-accent-line { width: 3px; }
          .contact-info-col h2 { font-size: 26px; }
          .form-card { padding: 20px 16px; }
          .form-header h3 { font-size: 22px; }
          .form-group input, .form-group select, .form-group textarea { padding: 11px 13px; font-size: 13px; }
          .map-placeholder { height: 210px; }
          .map-pin-name { font-size: 16px; }
          .visit-cta-left h3 { font-size: 24px; }
          .section-label { font-size: 10px; }
        }
        @media (max-width: 359px) {
          .hero { height: 210px; }
          .hero h1 { font-size: 22px; }
          .hero-content { padding: 0 12px; }
          .breadcrumb { padding: 10px 12px; }
          .contact-section { padding: 24px 12px; }
          .visit-cta { padding: 24px 12px; }
          .form-card { padding: 16px 12px; }
          .map-info-panel { padding: 24px 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid-overlay" />
        <div className="hero-accent-line" />
        {/* <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-bar" />
            <span className="hero-eyebrow-text">Get In Touch</span>
          </div>
          <h1>Let&apos;s Start Your Dream Journey</h1>
          <p className="hero-sub">
            Our expert team is ready to guide you toward the perfect plot. Reach out — your future begins with a conversation.
          </p>
        </div> */}
        <div className="hero-deco" aria-hidden="true">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="1" />
            <circle cx="150" cy="150" r="80"  stroke="white" strokeWidth="1" />
            <circle cx="150" cy="150" r="40"  stroke="white" strokeWidth="1" />
            <line x1="30" y1="150" x2="270" y2="150" stroke="white" strokeWidth="1" />
            <line x1="150" y1="30" x2="150" y2="270" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Contact Us</span>
      </div>

      {/* ── MAIN CONTACT ── */}
      <section className="contact-section">

        {/* LEFT */}
        <div className="contact-info-col">
          <div className="section-label">
            <span className="sl-bar" />
            <span className="sl-text">Contact Information</span>
          </div>
          <h2>We&apos;re Here To Help You</h2>
          <p className="contact-desc">
            Whether you're exploring plots, seeking investment advice, or ready to secure your dream property — our team is available every step of the way.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="cc-icon">
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="cc-label">Phone</div>
                <div className="cc-value">
                  <a href="tel:+971501234567">+91 93639 39696</a><br />
                  {/* <a href="tel:+97141234567">+971 4 123 4567</a> */}
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="cc-label">Email</div>
                <div className="cc-value">
                  <a href="mailto:info@genuineproperties.ae">info@genuineproperties.com</a><br />
                  <a href="mailto:sales@genuineproperties.ae">sales@genuineproperties.com</a>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon">
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="cc-label">Office Address</div>
<div className="cc-value">
  Genuine Property Developers,<br />
  7/37 Kakkan Street,<br />
  West Tambaram,<br />
  Chennai - 600045
</div>              </div>
            </div>
          </div>

          <div className="hours-block">
            <div className="hours-title">Office Hours</div>
            <div className="hours-row"><span className="day">Monday – Friday</span><span className="time">9:00 AM – 7:00 PM</span></div>
            <div className="hours-row"><span className="day">Saturday</span><span className="time">10:00 AM – 5:00 PM</span></div>
            <div className="hours-row"><span className="day">Sunday</span><span className="time">By Appointment</span></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-form-col">
          <div className="form-card">
            {submitted ? (
              <div className="success-msg">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h4>Thank You for Reaching Out!</h4>
                <p>Our team will contact you within 24 hours.<br />We look forward to helping you find your dream plot.</p>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h3>Send Us a Message</h3>
                  <p>Fill in the details below and our team will get back to you promptly.</p>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="+971 50 000 0000" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>I&apos;m Interested In</label>
                    <select name="interest" value={formData.interest} onChange={handleChange}>
                      <option value="">Select Plot Type</option>
                      <option>Residential Plots</option>
                      <option>Premium Plots</option>
                      <option>Corner Plots</option>
                      <option>Commercial Plots</option>
                      <option>Investment Advice</option>
                      <option>Site Visit</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Your Message</label>
                    <textarea name="message" placeholder="Tell us about your requirements, budget, or any questions you have..." value={formData.message} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-submit">
                  <button className="btn-submit" onClick={handleSubmit}>Send Message →</button>
                  <p className="form-note">We respect your privacy.<br />No spam, ever.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="map-section">
        <div className="map-section-inner">
          <div className="map-info-panel">
            <h3>Find Us Here</h3>
            <p>Strategically located in the heart of Business Bay, easily accessible from all major routes.</p>
            <div className="map-address-item">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
<span>
  <strong>Head Office</strong>
  Genuine Property Developers, 7/37 Kakkan Street, West Tambaram, Chennai - 600045
</span>            </div>
            <div className="map-address-item">
          </div>
            <div className="map-address-item">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span><strong>Hotline</strong>+91 93639 39696</span>
            </div>
          </div>
         <div className="map-placeholder">
  <div className="map-grid" />
  <div className="map-pin">
    <div className="map-pin-icon" />
    <div className="map-pin-name">Genuine Property Developers</div>
    <div className="map-pin-label">
      7/37 Kakkan Street, West Tambaram, Chennai - 600045
    </div>
    <a
      href="https://maps.google.com/?q=7/37+Kakkan+Street+West+Tambaram+Chennai+600045"
      target="_blank"
      rel="noopener noreferrer"
      className="open-map-btn"
    >
      Open in Google Maps →
    </a>
  </div>
</div>
        </div>
      </section>

      {/* ── VISIT CTA ── */}
      <section className="visit-cta">
        <div className="visit-cta-left">
          <h3>Your Dream Plot is Just A Visit Away!</h3>
          <p>Book a free site visit and experience the Genuine difference in person.</p>
        </div>
        <div className="visit-cta-right">
          <button className="btn-outline">Download Brochure</button>
          <button className="btn-primary">Book A Free Site Visit →</button>
        </div>
      </section>
    </>
  );
}