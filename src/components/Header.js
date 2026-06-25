"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

const API_URL = "https://genuinepropertydevelopers.com/backend/send_details.php";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  // Enquiry modal states (previously brochure)
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPhase, setEnquiryPhase] = useState("idle");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryFormData, setEnquiryFormData] = useState({
    name: "", phone: "", email: "", city: ""
  });

  // Site Visit modal states
  const [visitOpen, setVisitOpen] = useState(false);
  const [visitPhase, setVisitPhase] = useState("idle");

  // Site Visit form states
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    project: "", date: "", message: "",
  });

  const dropdownRef = useRef(null);
  const timerRef = useRef(null);
  const enquiryTimerRef = useRef(null);
  const dropdownCloseTimerRef = useRef(null);

  // Check if link is active
  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  /* ── scroll ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── click-outside dropdown ── */
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = (visitOpen || mobileMenuOpen || enquiryOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visitOpen, mobileMenuOpen, enquiryOpen]);

  /* ── escape key closes modals ── */
  useEffect(() => {
    if (!visitOpen && !enquiryOpen) return;
    const fn = (e) => {
      if (e.key === "Escape") {
        if (enquiryOpen) closeEnquiry();
        if (visitOpen) closeVisit();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitOpen, enquiryOpen]);

  /* ── hover open/close for Projects dropdown (with small close delay) ── */
  const openDropdownOnHover = useCallback(() => {
    clearTimeout(dropdownCloseTimerRef.current);
    setDropdownOpen(true);
  }, []);

  const closeDropdownOnHover = useCallback(() => {
    clearTimeout(dropdownCloseTimerRef.current);
    dropdownCloseTimerRef.current = setTimeout(() => setDropdownOpen(false), 160);
  }, []);

  useEffect(() => {
    return () => clearTimeout(dropdownCloseTimerRef.current);
  }, []);

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

  /* ── open/close Site Visit ── */
  const openVisit = useCallback(() => {
    setSubmitted(false);
    setStep(1);
    setSelectedSlot("");
    setVisitLoading(false);
    setFormData({ name: "", phone: "", email: "", project: "", date: "", message: "" });
    setVisitOpen(true);
    setVisitPhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisitPhase("entering"));
    });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisitPhase("entered"), 380);
  }, []);

  const closeVisit = useCallback(() => {
    setVisitPhase("leaving");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisitOpen(false);
      setVisitPhase("idle");
    }, 280);
  }, []);

  /* ── open/close Enquiry ── */
  const openEnquiry = useCallback(() => {
    setEnquirySubmitted(false);
    setEnquiryLoading(false);
    setEnquiryFormData({ name: "", phone: "", email: "", city: "" });
    setEnquiryOpen(true);
    setEnquiryPhase("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnquiryPhase("entering"));
    });
    clearTimeout(enquiryTimerRef.current);
    enquiryTimerRef.current = setTimeout(() => setEnquiryPhase("entered"), 380);
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryPhase("leaving");
    clearTimeout(enquiryTimerRef.current);
    enquiryTimerRef.current = setTimeout(() => {
      setEnquiryOpen(false);
      setEnquiryPhase("idle");
      setEnquirySubmitted(false);
      setEnquiryFormData({ name: "", phone: "", email: "", city: "" });
      setEnquiryLoading(false);
    }, 280);
  }, []);

  const handleEnquiryChange = (e) =>
    setEnquiryFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    
    // Send to API
    const apiData = {
      name: enquiryFormData.name,
      email: enquiryFormData.email,
      phone: enquiryFormData.phone,
      location: enquiryFormData.city,
      message: "General enquiry - requesting more information",
      subject: "General Enquiry Request",
    };
    
    await sendToAPI(apiData);
    
    setTimeout(() => {
      setEnquiryLoading(false);
      setEnquirySubmitted(true);
    }, 1500);
  };

  const handleVisitSubmit = async () => {
    setVisitLoading(true);
    
    const apiData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.project,
      message: `Preferred Date: ${formData.date}\nPreferred Time: ${selectedSlot}\nMessage: ${formData.message}`,
      subject: "Site Visit Booking Request",
    };
    
    await sendToAPI(apiData);
    
    setTimeout(() => {
      setVisitLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleField = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  const navLinks1 = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/aboutus" },
  ];
  const navLinks2 = [
    { label: "EMI CALCULATOR", href: "/emicalculator" },
    { label: "BLOGS", href: "/blogs" },
    { label: "CONTACT US", href: "/contactus" },
  ];

  const stepLabels = ["Your Details", "Project & Date", "Confirm"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

        .gpd-nav-wrapper {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000; display: flex; justify-content: center;
        }

        .gpd-nav-box {
          width: 100%; background: transparent;
          transition: background 0.4s ease, box-shadow 0.4s ease, border-bottom 0.4s ease;
        }
        .gpd-nav-box.scrolled {
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(12px);
        }

        /* ─── top bar ─── */
        .gpd-topbar {
          height: 90px; display: flex; align-items: center;
          justify-content: space-between; padding: 0 50px;
          flex-shrink: 0; font-family: 'Sora', sans-serif;
          position: relative; z-index: 2;
        }

        .up-logo {
          height: 70px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 768px) {
          .up-logo {
            height: 45px !important;
          }
        }

        /* ══════════════════════════════
           COMPACT MODAL OVERLAY (shared)
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

        /* ══════════════════════════════
           FORM COLUMN
        ══════════════════════════════ */
        .gpd-form-col {
          padding: 36px 38px; overflow-y: auto;
          display: flex; flex-direction: column;
          background: #0d0d0d;
          max-height: 88vh;
        }
        .gpd-form-col::-webkit-scrollbar { width: 5px; }
        .gpd-form-col::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }

        /* tag pill */
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

        /* ── STEP INDICATOR ── */
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
        .gpd-step-item.done::after { background: #e31e24; }
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
          border-color: #e31e24; background: #e31e24; color: #fff;
        }
        .gpd-step-item.done .gpd-step-num {
          border-color: #e31e24;
          background: rgba(227,30,36,0.12); color: #e31e24;
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

        /* ── FIELDS ── */
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
          border-color: rgba(227,30,36,0.5);
          background: rgba(227,30,36,0.04);
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

        /* ── TIME SLOTS ── */
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
        .gpd-slot:hover { border-color: rgba(227,30,36,0.35); color: rgba(255,255,255,.75); }
        .gpd-slot.selected {
          border-color: #e31e24;
          background: rgba(227,30,36,0.1); color: #fff;
        }

        /* ── SUMMARY CARD ── */
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

        /* ── BUTTONS ── */
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
          flex: 1; padding: 13px 20px; background: #e31e24;
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s;
        }
        .gpd-btn-next:hover { background: #c01820; transform: translateY(-1px); }
        .gpd-btn-confirm {
          flex: 1; padding: 13px 20px; background: #0f9a60;
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s;
        }
        .gpd-btn-confirm:hover:not(:disabled) { background: #0b7d4d; transform: translateY(-1px); }
        .gpd-btn-confirm:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Enquiry submit button */
        .gpd-btn-submit {
          width: 100%; padding: 13px 20px; 
          background: #e31e24; 
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Sora', sans-serif; font-size: 11.5px;
          font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background .2s, transform .15s, opacity .2s;
        }
        .gpd-btn-submit:hover:not(:disabled) { 
          background: #c01820;
          transform: translateY(-1px); 
        }
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

        /* ── SUCCESS ── */
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

        /* ══════════════════════════════
           IMAGE COLUMN
        ══════════════════════════════ */
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

        /* ─── CLOSE BUTTON ─── */
        .gpd-close-btn {
          position: absolute; top: 16px; right: 16px;
          z-index: 10; width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          color: #000000; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.25s;
        }
        .gpd-close-btn:hover { background: rgba(255,255,255,0.16); transform: rotate(90deg); }

        /* ─── NAV LINKS ─── */
        .gpd-link {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 8px 0;
          position: relative;
          transition: color 0.3s ease;
          font-family: 'Sora', sans-serif;
        }
        .gpd-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #e3b450;
          transition: width 0.3s ease;
        }
        .gpd-link:hover { color: #fff; }
        .gpd-link:hover::after { width: 100%; }
        .gpd-link.active { color: #e3b450; }
        .gpd-link.active::after { width: 100%; }

        .gpd-cta-btn-secondary {
          background: #c01820; color: #fff;
          padding: 12px 24px; border-radius: 6px;
          font-size: 13px; font-weight: 700; letter-spacing: 1px;
          display: flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(255,255,255,0.25);
          cursor: pointer;
          font-family: 'Sora', sans-serif;
          transition: border-color 0.25s, transform 0.15s;
          white-space: nowrap;
        }
        .gpd-cta-btn-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-1px);
        }

        .gpd-dropdown-trigger {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 5px;
          color: rgba(255,255,255,0.75);
          font-size: 13px; font-weight: 600; letter-spacing: 1px;
          padding: 8px 0; position: relative;
          font-family: 'Sora', sans-serif;
          transition: color 0.3s ease; margin-top: 3px;
        }
        .gpd-dropdown-trigger::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: #e3b450;
          transition: width 0.3s ease;
        }
        .gpd-dropdown-trigger:hover { color: #fff; }
        .gpd-dropdown-trigger:hover::after { width: 100%; }
        .gpd-dropdown-trigger[aria-expanded="true"] { color: #e3b450; }
        .gpd-dropdown-trigger[aria-expanded="true"]::after { width: 100%; }

        /* ─── PROJECTS DROPDOWN ─── */
        .proj-dropdown {
          position: absolute; top: calc(100% + 16px); left: 50%;
          transform: translateX(-50%); width: 560px;
          background: #fff; border-radius: 12px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.22); overflow: hidden;
          animation: dropIn 0.22s cubic-bezier(0.22,1,0.36,1); z-index: 999;
        }
        @keyframes dropIn {
          from { opacity:0; transform:translateX(-50%) translateY(-10px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        .proj-dropdown::before {
          content:''; position:absolute; top:-7px; left:50%;
          transform:translateX(-50%); width:14px; height:14px;
          background:#fff; border-radius:2px; rotate:45deg;
          box-shadow:-2px -2px 6px rgba(0,0,0,0.06);
        }
        /* Invisible bridge so the gap between trigger and menu doesn't break hover */
        .proj-dropdown-bridge {
          position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%); width: 560px; height: 16px;
          z-index: 998;
        }
        .dropdown-header { padding:14px 20px 10px; border-bottom:1px solid #f0ede8; display:flex; align-items:center; justify-content:space-between; }
        .dropdown-header-label { font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#9a9a9a; font-family:'Sora',sans-serif; }
        .dropdown-header-count { font-size:10px; font-weight:600; color:#e31e24; font-family:'Sora',sans-serif; }
        .proj-card { display:flex; align-items:stretch; padding:20px; text-decoration:none; border-bottom:1px solid #f4f2ee; transition:background 0.18s; cursor:pointer; width:100%; background:transparent; border-left:none; border-right:none; border-top:none; font-family:'Sora',sans-serif; }
        .proj-card:last-of-type { border-bottom:none; }
        .proj-card:hover { background:#faf9f7; }
        .proj-card:hover .proj-arrow { transform:translateX(4px); opacity:1; }
        .proj-card:hover .proj-name  { color:#e31e24; }
        .proj-accent-bar { width:4px; border-radius:3px; background:#e31e24; flex-shrink:0; margin-right:16px; }
        .proj-body { flex:1; min-width:0; text-align:left; }
        .proj-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:4px; }
        .proj-name { font-family:'Sora',sans-serif; font-size:20px; font-weight:600; color:#1c1c1c; line-height:1.15; transition:color 0.18s; }
        .proj-status { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:3px 9px; border-radius:20px; white-space:nowrap; flex-shrink:0; margin-left:10px; margin-top:2px; font-family:'Sora',sans-serif; }
        .proj-category { font-size:11px; font-weight:500; color:#9a9a9a; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:10px; font-family:'Sora',sans-serif; }
        .proj-meta { display:flex; align-items:center; gap:16px; }
        .proj-location { display:flex; align-items:center; gap:5px; font-size:12px; color:#5a5a5a; flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Sora',sans-serif; }
        .proj-stats { font-size:11px; color:#9a9a9a; white-space:nowrap; flex-shrink:0; font-family:'Sora',sans-serif; }
        .proj-arrow { display:flex; align-items:center; padding-left:12px; color:#e31e24; opacity:0.4; transition:transform 0.2s, opacity 0.2s; }
        .dropdown-footer { padding:12px 20px; background:#f8f6f2; border-top:1px solid #f0ede8; display:flex; align-items:center; justify-content:space-between; }
        .dropdown-footer-text { font-size:12px; color:#9a9a9a; font-family:'Sora',sans-serif; }
        .dropdown-footer-link { font-size:12px; font-weight:600; color:#e31e24; text-decoration:none; letter-spacing:0.05em; display:flex; align-items:center; gap:5px; transition:gap 0.2s; background:none; border:none; cursor:pointer; font-family:'Sora',sans-serif; }
        .dropdown-footer-link:hover { gap:8px; }

        /* ─── HAMBURGER ─── */
        .hamburger-btn { display:none; flex-direction:column; justify-content:center; align-items:center; gap:5px; width:40px; height:40px; background:none; border:none; cursor:pointer; padding:0; z-index:1100; }
        .hamburger-btn span { display:block; width:24px; height:2px; background: #e3b450; border-radius:2px; transition:all 0.3s ease; transform-origin:center; }
        .hamburger-btn.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger-btn.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .hamburger-btn.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* ─── MOBILE DRAWER ─── */
        .mobile-drawer { display:none; position:fixed; top:0; left:0; right:0; bottom:0; z-index:1050; flex-direction:column; }
        .mobile-drawer.open { display:flex; }
        .mobile-drawer-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); }
        .mobile-drawer-panel { position:absolute; top:0; right:0; width:300px; max-width:85vw; height:100%; background:#0d0d0d; display:flex; flex-direction:column; animation:slideInRight 0.3s cubic-bezier(0.22,1,0.36,1); overflow-y:auto; }
        @keyframes slideInRight { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
        .mobile-drawer-header { display:flex; align-items:center; justify-content:space-between; padding:24px 20px 20px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .mobile-drawer-logo { height:44px; width:auto; object-fit:contain; }
        .mobile-drawer-close { background:rgba(255,255,255,0.08); border:none; width:34px; height:34px; border-radius:50%; cursor:pointer; color:#fff; font-size:16px; display:flex; align-items:center; justify-content:center; }
        .mobile-nav-links { list-style:none; margin:0; padding:16px 0; flex:1; }
        .mobile-nav-link { display:block; padding:14px 24px; color:rgba(255,255,255,0.8); font-family:'Sora',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; text-decoration:none; border-bottom:1px solid rgba(255,255,255,0.05); transition:color 0.2s, background 0.2s; }
        .mobile-nav-link:hover { color:#fff; background:rgba(255,255,255,0.04); }
        .mobile-nav-link.active { color:#e3b450; border-left:3px solid #e3b450; padding-left:21px; }
        .mobile-projects-trigger { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; color:rgba(255,255,255,0.8); font-family:'Sora',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; border:none; background:none; cursor:pointer; width:100%; border-bottom:1px solid rgba(255,255,255,0.05); transition:color 0.2s; }
        .mobile-projects-trigger.open { color:#e3b450; }
        .mobile-projects-trigger svg { transition:transform 0.25s; }
        .mobile-projects-trigger.open svg { transform:rotate(180deg); }
        .mobile-projects-list { background:rgba(255,255,255,0.03); overflow:hidden; max-height:0; transition:max-height 0.35s ease; }
        .mobile-projects-list.open { max-height:500px; }
        .mobile-proj-item { display:flex; align-items:center; gap:12px; padding:14px 24px 14px 28px; text-decoration:none; border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.18s; }
        .mobile-proj-item:hover { background:rgba(255,255,255,0.05); }
        .mobile-proj-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .mobile-proj-info { flex:1; min-width:0; }
        .mobile-proj-name { font-family:'Sora',sans-serif; font-size:16px; font-weight:600; color:#fff; line-height:1.2; margin-bottom:2px; }
        .mobile-proj-loc { font-size:11px; color:rgba(255,255,255,0.45); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Sora',sans-serif; }
        .mobile-projects-footer { padding:12px 24px 12px 28px; border-bottom:1px solid rgba(255,255,255,0.05); }
        .mobile-projects-footer a { font-size:12px; font-weight:600; color:#e31e24; text-decoration:none; letter-spacing:0.05em; display:flex; align-items:center; gap:5px; font-family:'Sora',sans-serif; }
        .mobile-drawer-cta { padding:20px; border-top:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:10px; }
        .mobile-cta-btn { width:100%; padding:14px; background:#e31e24; color:#fff; border:none; border-radius:8px; font-family:'Sora',sans-serif; font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }
        .mobile-cta-btn-secondary { width:100%; padding:14px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:8px; font-family:'Sora',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }
        .mobile-cta-btn-secondary:hover { border-color: rgba(255,255,255,0.4); }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .gpd-desktop-nav { display:none !important; }
          .gpd-desktop-cta-group { display:none !important; }
          .hamburger-btn { display:flex !important; }
          .gpd-topbar { padding:0 20px !important; }
        }
        @media (max-width: 768px) {
          .gpd-modal-card { grid-template-columns: 1fr !important; max-width: 480px; }
          .gpd-image-col { display: none !important; }
          .gpd-form-col { padding: 30px 26px !important; }
        }
        @media (max-width: 640px) {
          .gpd-topbar { height:66px !important; padding:0 16px !important; }
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
          .mobile-drawer-panel { width:280px; }
          .gpd-time-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ════════════════════════════════════════
          NAV BAR
      ════════════════════════════════════════ */}
      <div className="gpd-nav-wrapper" style={{ zIndex: 1000 }}>
        <div className={`gpd-nav-box${scrolled ? " scrolled" : ""}`}>
          <div className="gpd-topbar">
            <Link href="/" style={{ display:"flex", alignItems:"center", flexShrink:0, textDecoration:"none" }}>
              <img src="/uplogo.png" alt="Genuine Property Developers" className="up-logo" />
            </Link>

            {/* DESKTOP NAV */}
            <ul className="gpd-desktop-nav" style={{ display:"flex", alignItems:"center", gap:"28px", listStyle:"none", margin:0, padding:0 }}>
              {navLinks1.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={`gpd-link${isActive(link.href) ? " active" : ""}`}>
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* PROJECTS DROPDOWN */}
              <li
                style={{ position:"relative" }}
                ref={dropdownRef}
                onMouseEnter={openDropdownOnHover}
                onMouseLeave={closeDropdownOnHover}
              >
                <button
                  className="gpd-dropdown-trigger"
                  onClick={() => setDropdownOpen(v => !v)}
                  aria-expanded={dropdownOpen}
                >
                  PROJECTS
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition:"transform 0.25s", transform: dropdownOpen ? "rotate(180deg)" : "none", marginBottom:"2px" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {dropdownOpen && (
                  <>
                    <div className="proj-dropdown-bridge" />
                    <div className="proj-dropdown" role="menu">
                      <div className="dropdown-header">
                        <span className="dropdown-header-label">Ongoing Projects</span>
                        <span className="dropdown-header-count">3 Active Projects</span>
                      </div>
                      {PROJECTS.map(proj => (
                        <Link key={proj.slug} href={`/projects/${proj.slug}`} className="proj-card" role="menuitem"
                          onClick={() => setDropdownOpen(false)}>
                          <div className="proj-accent-bar" />
                          <div className="proj-body">
                            <div className="proj-top">
                              <div className="proj-name">{proj.name}</div>
                              <span className="proj-status" style={{ background: proj.statusColor+"18", color: proj.statusColor, border:`1px solid ${proj.statusColor}30` }}>{proj.status}</span>
                            </div>
                            <div className="proj-category">{proj.category}</div>
                            <div className="proj-meta">
                              <div className="proj-location">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                {proj.location}
                              </div>
                              <div className="proj-stats">{proj.stats}</div>
                            </div>
                          </div>
                          <div className="proj-arrow">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </div>
                        </Link>
                      ))}
                      <div className="dropdown-footer">
                        <span className="dropdown-footer-text">More projects coming soon</span>
                        <Link href="/Viewprojects" className="dropdown-footer-link" onClick={() => setDropdownOpen(false)}>
                          View All Projects
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </li>

              {navLinks2.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={`gpd-link${isActive(link.href) ? " active" : ""}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* DESKTOP CTA GROUP */}
            <div className="gpd-desktop-cta-group" style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <button className="gpd-cta-btn-secondary" onClick={openEnquiry}>
                ENQUIRE NOW
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </button>
            </div>

            {/* HAMBURGER */}
            <button className={`hamburger-btn${mobileMenuOpen ? " open" : ""}`} onClick={() => setMobileMenuOpen(v => !v)} aria-label="Toggle menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          ENQUIRY MODAL
      ════════════════════════════════════════ */}
      {enquiryOpen && (
        <div
          className={`gpd-modal-backdrop${enquiryPhase !== "idle" ? ` ${enquiryPhase}` : ""}`}
          onClick={closeEnquiry}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="gpd-close-btn" onClick={closeEnquiry} aria-label="Close">
              <X size={15} />
            </button>

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
                        <label>Full Name <span style={{ color:"#b03030" }}>*</span></label>
                        <div className="gpd-input-wrap">
                          <span className="gpd-input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </span>
                          <input className="gpd-f" type="text" name="name" required placeholder="Your name" value={enquiryFormData.name} onChange={handleEnquiryChange} />
                        </div>
                      </div>
                      <div className="gpd-field">
                        <label>Phone <span style={{ color:"#b03030" }}>*</span></label>
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

                    <button type="submit" className="gpd-btn-submit" disabled={enquiryLoading} style={{ marginTop:"10px" }}>
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
              <img src="/form-1.png" alt="GPD Project" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          SITE VISIT MODAL
      ════════════════════════════════════════ */}
      {visitOpen && (
        <div
          className={`gpd-modal-backdrop${visitPhase !== "idle" ? ` ${visitPhase}` : ""}`}
          onClick={closeVisit}
        >
          <div className="gpd-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="gpd-close-btn" onClick={closeVisit} aria-label="Close">✕</button>

            <div className="gpd-form-col">
              {submitted ? (
                <div className="gpd-success">
                  <div className="gpd-success-ring">✅</div>
                  <h3>Visit Confirmed!</h3>
                  <p>Our team will reach out within <strong>24 hours</strong> to confirm your slot. We look forward to meeting you.</p>
                  <button className="gpd-done-btn" onClick={closeVisit}>DONE</button>
                </div>
              ) : (
                <>
                  <div className="gpd-tag-pill">
                    <div className="gpd-tag-dot" />
                    <span>Site Visit</span>
                  </div>
                  <h2 className="gpd-form-heading">Book Your Site Visit</h2>
                  <p className="gpd-form-sub">Our team will confirm your slot within 24 hours.</p>

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

                  {step === 1 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-field-row">
                        <div className="gpd-field">
                          <label>Full Name</label>
                          <div className="gpd-input-wrap">
                            <span className="gpd-input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </span>
                            <input className="gpd-f" type="text" placeholder="Rajesh Kumar" value={formData.name} onChange={e => handleField("name", e.target.value)} />
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

                  {step === 2 && (
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

                  {step === 3 && (
                    <div className="gpd-fields-block">
                      <div className="gpd-summary-card">
                        {[
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label:"Name", val: formData.name || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label:"Phone", val: formData.phone || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"Email", val: formData.email || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label:"Project", val: formData.project || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label:"Date", val: formData.date || "—" },
                          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Time", val: selectedSlot || "—" },
                        ].map(row => (
                          <div key={row.label} className="gpd-summary-row">
                            <div className="gpd-summary-icon" style={{ color:"rgba(255,255,255,0.3)" }}>{row.icon}</div>
                            <span className="gpd-summary-label">{row.label}</span>
                            <span className="gpd-summary-val">{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="gpd-field-row full" style={{ marginTop:"4px" }}>
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
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&fit=crop&q=80" alt="GPD Project" />
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-drawer${mobileMenuOpen ? " open" : ""}`}>
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}/>
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-header">
            <img src="/uplogo.png" alt="GPD" className="mobile-drawer-logo"/>
            <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          <ul className="mobile-nav-links">
            <li><Link href="/" className={`mobile-nav-link${isActive("/") ? " active" : ""}`} onClick={() => setMobileMenuOpen(false)}>HOME</Link></li>
            <li><Link href="/aboutus" className={`mobile-nav-link${isActive("/aboutus") ? " active" : ""}`} onClick={() => setMobileMenuOpen(false)}>ABOUT US</Link></li>
            <li>
              <button className={`mobile-projects-trigger${mobileProjectsOpen ? " open" : ""}`} onClick={() => setMobileProjectsOpen(v => !v)}>
                PROJECTS
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className={`mobile-projects-list${mobileProjectsOpen ? " open" : ""}`}>
                {PROJECTS.map(proj => (
                  <Link key={proj.slug} href={`/projects/${proj.slug}`} className="mobile-proj-item" onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobile-proj-dot" style={{ background: proj.statusColor }}/>
                    <div className="mobile-proj-info">
                      <div className="mobile-proj-name">{proj.name}</div>
                      <div className="mobile-proj-loc">{proj.location}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e31e24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                ))}
                <div className="mobile-projects-footer">
                  <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>View All Projects <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></Link>
                </div>
              </div>
            </li>
            <li><Link href="/emicalculator" className={`mobile-nav-link${isActive("/emicalculator") ? " active" : ""}`} onClick={() => setMobileMenuOpen(false)}>EMI CALCULATOR</Link></li>
            <li><Link href="/blogs" className={`mobile-nav-link${isActive("/blogs") ? " active" : ""}`} onClick={() => setMobileMenuOpen(false)}>BLOGS</Link></li>
            <li><Link href="/contactus" className={`mobile-nav-link${isActive("/contactus") ? " active" : ""}`} onClick={() => setMobileMenuOpen(false)}>CONTACT US</Link></li>
          </ul>
          <div className="mobile-drawer-cta">
            <button className="mobile-cta-btn-secondary" onClick={() => { setMobileMenuOpen(false); openEnquiry(); }}>
              📋 ENQUIRE NOW
            </button>
            <button className="mobile-cta-btn" onClick={() => { setMobileMenuOpen(false); openVisit(); }}>
              BOOK A SITE VISIT
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}