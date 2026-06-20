"use client";

import { useEffect } from "react";

/* ─────────────────────────────────────────────────────
   Inject CSS that hides all animated elements BEFORE
   the page paints. GSAP then reveals them on its own
   schedule. Without this, elements flash visible for
   one frame before GSAP's gsap.set() fires.
───────────────────────────────────────────────────── */
const HIDE_CSS = `
  .hero-h1,
  .hero-subtext,
  .hero-cta,
  .hero-breadcrumb > *,
  .section-eyebrow,
  .hero-h2,
  .hero-subtitle,
  .hero-overview,
  .hero-stats-row > div,
  .details-card-item,
  .about-h2,
  .red-line,
  .mp-red-line,
  .about-grid p,
  .key-features-grid > div > div,
  .highlights-h2,
  .highlights-heading span,
  .highlight-card,
  .masterplan-h2,
  .masterplan-image-wrap,
  .masterplan-download-btn,
  .mp-h3,
  .mp-table tbody tr,
  .mp-card-mobile,
  .check-availability-btn,
  .location-item,
  .map-wrap,
  .landmarks-h2,
  .landmarks-section > span,
  .landmark-card,
  .cta-h3,
  .cta-p,
  .cta-btns > * {
    opacity: 0;
  }

  /* Red lines start collapsed */
  .red-line,
  .mp-red-line,
  .highlights-heading span,
  .landmarks-section > span {
    transform: scaleX(0);
    transform-origin: left center;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-h1, .hero-subtext, .hero-cta,
    .hero-breadcrumb > *, .section-eyebrow,
    .hero-h2, .hero-subtitle, .hero-overview,
    .hero-stats-row > div, .details-card-item,
    .about-h2, .red-line, .mp-red-line,
    .about-grid p, .key-features-grid > div > div,
    .highlights-h2, .highlights-heading span,
    .highlight-card, .masterplan-h2,
    .masterplan-image-wrap, .masterplan-download-btn,
    .mp-h3, .mp-table tbody tr, .mp-card-mobile,
    .check-availability-btn, .location-item,
    .map-wrap, .landmarks-h2, .landmarks-section > span,
    .landmark-card, .cta-h3, .cta-p, .cta-btns > * {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

export default function GsapTextAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── Split a heading into clipped word spans ── */
      function splitEl(el) {
        if (!el) return [];
        if (el.dataset.split) return Array.from(el.querySelectorAll(".gpd-wi"));
        el.dataset.split = "1";
        const words = el.innerText.trim().split(/\s+/);
        el.innerHTML = words
          .map(
            (w) =>
              `<span class="gpd-ww" style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.28em;">` +
              `<span class="gpd-wi" style="display:inline-block;will-change:transform;">${w}</span>` +
              `</span>`
          )
          .join("");
        return Array.from(el.querySelectorAll(".gpd-wi"));
      }

      /* ── Word reveal added to a timeline ── */
      function wordReveal(el, tl, position, stagger = 0.08, duration = 0.85) {
        const words = splitEl(el);
        if (!words.length) return;
        if (el.tagName.match(/^H/i)) el.style.perspective = "600px";
        // parent opacity is already 0 from CSS; set words individually
        gsap.set(el, { opacity: 1 }); // show container, words are hidden via transform
        tl.fromTo(
          words,
          { y: "105%", rotateX: -15 },
          { y: "0%", rotateX: 0, duration, stagger, ease: "expo.out" },
          position
        );
      }

      /* ── Word reveal on scroll ── */
      function wordRevealScroll(el, { start = "top 88%", stagger = 0.08, duration = 0.8, delay = 0 } = {}) {
        if (!el) return;
        const words = splitEl(el);
        if (!words.length) return;
        if (el.tagName.match(/^H/i)) el.style.perspective = "600px";
        gsap.set(el, { opacity: 1 });
        gsap.set(words, { y: "105%", rotateX: -15 });
        ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: () =>
            gsap.to(words, {
              y: "0%",
              rotateX: 0,
              duration,
              stagger,
              ease: "expo.out",
              delay,
            }),
        });
      }

      ctx = gsap.context(() => {

        /* ══════════════════════════════════════════
           PAGE-LOAD TIMELINE — fires immediately,
           elements are already opacity:0 from CSS
        ══════════════════════════════════════════ */
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        /* hero-h1 */
        wordReveal(document.querySelector(".hero-h1"), tl, 0.1, 0.09, 0.9);

        /* hero-subtext */
        const heroSub = document.querySelector(".hero-subtext");
        if (heroSub) {
          tl.fromTo(heroSub, { y: 20 }, { y: 0, opacity: 1, duration: 0.7 }, 0.85);
        }

        /* hero CTA */
        const heroCta = document.querySelector(".hero-cta");
        if (heroCta) {
          tl.fromTo(heroCta, { y: 22 }, { y: 0, opacity: 1, duration: 0.65, ease: "back.out(1.5)" }, 1.05);
        }

        /* breadcrumb */
        const breadItems = document.querySelectorAll(".hero-breadcrumb > *");
        if (breadItems.length) {
          tl.fromTo(breadItems, { x: -16 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.09 }, 0.3);
        }

        /* ══════════════════════════════════════════
           SCROLL ANIMATIONS
        ══════════════════════════════════════════ */

        /* eyebrow */
        const eyebrow = document.querySelector(".section-eyebrow");
        if (eyebrow) {
          ScrollTrigger.create({
            trigger: eyebrow, start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(eyebrow, {
                x: 0, opacity: 1, letterSpacing: "2px",
                duration: 0.7, ease: "expo.out",
                immediateRender: false,
              }),
          });
          gsap.set(eyebrow, { x: -20, letterSpacing: "6px" });
        }

        /* hero-h2 */
        wordRevealScroll(document.querySelector(".hero-h2"), { stagger: 0.06 });

        /* hero-subtitle */
        const heroSubtitle = document.querySelector(".hero-subtitle");
        if (heroSubtitle) {
          ScrollTrigger.create({
            trigger: heroSubtitle, start: "top 90%", once: true,
            onEnter: () =>
              gsap.to(heroSubtitle, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }),
          });
          gsap.set(heroSubtitle, { y: 18 });
        }

        /* hero-overview */
        const heroOverview = document.querySelector(".hero-overview");
        if (heroOverview) {
          ScrollTrigger.create({
            trigger: heroOverview, start: "top 90%", once: true,
            onEnter: () =>
              gsap.to(heroOverview, { y: 0, opacity: 1, duration: 0.75, ease: "expo.out" }),
          });
          gsap.set(heroOverview, { y: 18 });
        }

        /* stats row */
        const statItems = document.querySelectorAll(".hero-stats-row > div");
        if (statItems.length) {
          gsap.set(statItems, { y: 18 });
          ScrollTrigger.create({
            trigger: ".hero-stats-row", start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(statItems, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out" }),
          });
        }

        /* details card */
        const cardItems = document.querySelectorAll(".details-card-item");
        if (cardItems.length) {
          gsap.set(cardItems, { y: 20 });
          ScrollTrigger.create({
            trigger: ".details-card", start: "top 85%", once: true,
            onEnter: () =>
              gsap.to(cardItems, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "expo.out" }),
          });
        }

        /* about-h2 */
        wordRevealScroll(document.querySelector(".about-h2"), { stagger: 0.07 });

        /* red lines */
        document.querySelectorAll(".red-line, .mp-red-line").forEach((el) => {
          ScrollTrigger.create({
            trigger: el, start: "top 90%", once: true,
            onEnter: () => gsap.to(el, { scaleX: 1, opacity: 1, duration: 0.65, ease: "expo.out" }),
          });
        });

        /* about para */
        const aboutPara = document.querySelector(".about-grid p");
        if (aboutPara) {
          gsap.set(aboutPara, { y: 16 });
          ScrollTrigger.create({
            trigger: aboutPara, start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(aboutPara, { y: 0, opacity: 1, duration: 0.75, ease: "expo.out" }),
          });
        }

        /* key features */
        const feats = document.querySelectorAll(".key-features-grid > div > div");
        if (feats.length) {
          gsap.set(feats, { x: -20 });
          ScrollTrigger.create({
            trigger: ".key-features-grid", start: "top 85%", once: true,
            onEnter: () =>
              gsap.to(feats, { x: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "expo.out" }),
          });
        }

        /* highlights-h2 */
        wordRevealScroll(document.querySelector(".highlights-h2"), { stagger: 0.07 });

        /* highlights accent line */
        const hAccent = document.querySelector(".highlights-heading span");
        if (hAccent) {
          ScrollTrigger.create({
            trigger: hAccent, start: "top 90%", once: true,
            onEnter: () => gsap.to(hAccent, { scaleX: 1, opacity: 1, duration: 0.65, ease: "expo.out" }),
          });
        }

        /* highlight cards */
        const hCards = document.querySelectorAll(".highlight-card");
        if (hCards.length) {
          gsap.set(hCards, { y: 32, scale: 0.96 });
          ScrollTrigger.create({
            trigger: ".highlights-grid", start: "top 85%", once: true,
            onEnter: () =>
              gsap.to(hCards, { y: 0, scale: 1, opacity: 1, duration: 0.65, stagger: 0.08, ease: "back.out(1.4)" }),
          });
        }

        /* masterplan-h2 */
        wordRevealScroll(document.querySelector(".masterplan-h2"), { stagger: 0.07 });

        /* masterplan image */
        const mpImg = document.querySelector(".masterplan-image-wrap");
        if (mpImg) {
          gsap.set(mpImg, { scale: 0.97 });
          ScrollTrigger.create({
            trigger: mpImg, start: "top 85%", once: true,
            onEnter: () =>
              gsap.to(mpImg, { scale: 1, opacity: 1, duration: 0.9, ease: "expo.out" }),
          });
        }

        /* download btn */
        const dlBtn = document.querySelector(".masterplan-download-btn");
        if (dlBtn) {
          gsap.set(dlBtn, { x: 20 });
          ScrollTrigger.create({
            trigger: dlBtn, start: "top 90%", once: true,
            onEnter: () =>
              gsap.to(dlBtn, { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" }),
          });
        }

        /* mp-h3 */
        document.querySelectorAll(".mp-h3").forEach((el) =>
          wordRevealScroll(el, { stagger: 0.06, duration: 0.75 })
        );

        /* pricing rows */
        const pRows = document.querySelectorAll(".mp-table tbody tr");
        if (pRows.length) {
          gsap.set(pRows, { x: -16 });
          ScrollTrigger.create({
            trigger: ".mp-table", start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(pRows, { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "expo.out" }),
          });
        }

        /* mobile pricing */
        const mCards = document.querySelectorAll(".mp-card-mobile");
        if (mCards.length) {
          gsap.set(mCards, { y: 16 });
          ScrollTrigger.create({
            trigger: mCards[0], start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(mCards, { y: 0, opacity: 1, duration: 0.5, stagger: 0.09, ease: "expo.out" }),
          });
        }

        /* check availability */
        const checkBtn = document.querySelector(".check-availability-btn");
        if (checkBtn) {
          gsap.set(checkBtn, { scale: 0.94 });
          ScrollTrigger.create({
            trigger: checkBtn, start: "top 92%", once: true,
            onEnter: () =>
              gsap.to(checkBtn, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.5)" }),
          });
        }

        /* location items */
        const locItems = document.querySelectorAll(".location-item");
        if (locItems.length) {
          gsap.set(locItems, { x: -16 });
          ScrollTrigger.create({
            trigger: locItems[0], start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(locItems, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "expo.out" }),
          });
        }

        /* map */
        const mapWrap = document.querySelector(".map-wrap");
        if (mapWrap) {
          gsap.set(mapWrap, { scale: 0.97 });
          ScrollTrigger.create({
            trigger: mapWrap, start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(mapWrap, { scale: 1, opacity: 1, duration: 0.75, ease: "expo.out" }),
          });
        }

        /* landmarks-h2 */
        wordRevealScroll(document.querySelector(".landmarks-h2"), { stagger: 0.07 });

        /* landmarks accent */
        const lmAccent = document.querySelector(".landmarks-section > span");
        if (lmAccent) {
          ScrollTrigger.create({
            trigger: lmAccent, start: "top 90%", once: true,
            onEnter: () => gsap.to(lmAccent, { scaleX: 1, opacity: 1, duration: 0.65, ease: "expo.out" }),
          });
        }

        /* landmark cards */
        const lmCards = document.querySelectorAll(".landmark-card");
        if (lmCards.length) {
          gsap.set(lmCards, { scale: 0.88 });
          ScrollTrigger.create({
            trigger: ".landmarks-grid", start: "top 85%", once: true,
            onEnter: () =>
              gsap.to(lmCards, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.07, ease: "back.out(1.3)" }),
          });
        }

        /* cta-h3 */
        wordRevealScroll(document.querySelector(".cta-h3"), { stagger: 0.07, duration: 0.8 });

        /* cta-p */
        const ctaP = document.querySelector(".cta-p");
        if (ctaP) {
          gsap.set(ctaP, { y: 16 });
          ScrollTrigger.create({
            trigger: ctaP, start: "top 88%", once: true,
            onEnter: () =>
              gsap.to(ctaP, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.15 }),
          });
        }

        /* cta buttons */
        const ctaBtns = document.querySelectorAll(".cta-btns > *");
        if (ctaBtns.length) {
          gsap.set(ctaBtns, { y: 22 });
          ScrollTrigger.create({
            trigger: ".cta-btns", start: "top 90%", once: true,
            onEnter: () =>
              gsap.to(ctaBtns, { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "back.out(1.4)" }),
          });
        }

      }); // end gsap.context
    };

    init();

    return () => ctx?.revert();
  }, []);

  /* Inject hide CSS synchronously so it lands before first paint */
  return <style>{HIDE_CSS}</style>;
}