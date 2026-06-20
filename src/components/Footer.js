export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .gpd-footer {
          background: #0a0a0a;
          color: #fff;
          font-family: 'Sora', 'DM Sans', sans-serif;
          padding: 60px 60px 30px;
        }

        .gpd-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 40px;
        }

        .gpd-brand-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          max-width: 240px;
          margin: 0 0 20px;
        }

        .gpd-social-row {
          display: flex;
          gap: 12px;
        }

        .gpd-social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          flex-shrink: 0;
          transition: border-color 0.2s, color 0.2s;
        }

        .gpd-social-icon:hover {
          color: #fff !important;
          border-color: rgba(255,255,255,0.5);
        }

        .gpd-col-heading {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #fff;
          margin: 0 0 20px;
          text-transform: uppercase;
        }

        .gpd-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .gpd-link-list a {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }

        .gpd-link-list a:hover {
          color: #fff;
        }

        .gpd-contact-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .gpd-contact-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .gpd-contact-row a,
        .gpd-contact-row span {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          line-height: 1.7;
          transition: color 0.2s;
        }

        .gpd-contact-row a:hover {
          color: #fff;
        }

        .gpd-bottom-bar {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .gpd-copyright {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        .gpd-bottom-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .gpd-bottom-links a {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }

        .gpd-bottom-links a:hover {
          color: #fff;
        }

        .gpd-logo {
          height: 48px;
          object-fit: contain;
          margin-bottom: 16px;
          display: block;
        }

        /* ── Laptop: 1024px – 1279px ── */
        @media (max-width: 1279px) {
          .gpd-footer {
            padding: 50px 40px 28px;
          }
          .gpd-footer-grid {
            gap: 28px;
          }
        }

        /* ── Small laptop / large tablet landscape: 900px – 1023px ── */
        @media (max-width: 1023px) {
          .gpd-footer {
            padding: 48px 32px 28px;
          }
          .gpd-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px 28px;
          }
          .gpd-brand-desc {
            max-width: 100%;
          }
        }

        /* ── Tablet portrait: 600px – 899px ── */
        @media (max-width: 899px) {
          .gpd-footer {
            padding: 40px 28px 24px;
          }
          .gpd-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px 24px;
          }
        }

        /* ── Large mobile / phablet: 480px – 599px ── */
        @media (max-width: 599px) {
          .gpd-footer {
            padding: 36px 20px 20px;
          }
          .gpd-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 20px;
          }
          .gpd-col-heading {
            font-size: 12px;
          }
          .gpd-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .gpd-bottom-links {
            gap: 16px;
          }
        }

        /* ── Mobile: ≤ 479px ── */
        @media (max-width: 479px) {
          .gpd-footer {
            padding: 32px 16px 20px;
          }
          .gpd-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 32px;
          }
          .gpd-brand-desc {
            max-width: 100%;
          }
          .gpd-logo {
            height: 40px;
          }
          .gpd-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding-top: 20px;
          }
          .gpd-bottom-links {
            gap: 14px;
            flex-wrap: wrap;
          }
        }

        /* ── Very small mobile: ≤ 359px ── */
        @media (max-width: 359px) {
          .gpd-footer {
            padding: 28px 12px 16px;
          }
          .gpd-bottom-links {
            gap: 10px;
          }
        }
      `}</style>

      <footer className="gpd-footer">
        <div className="gpd-footer-grid">

          {/* Col 1 – Brand */}
          <div>
            <img src="/logo.png" alt="Genuine Property Developers" className="gpd-logo" />
            <p className="gpd-brand-desc">
              Premium plotted developments in prime locations. Where your future takes root and grows.
            </p>
            <div className="gpd-social-row">
              {[
                { href: "#", icon: <FacebookIcon />, label: "Facebook" },
                { href: "#", icon: <InstagramIcon />, label: "Instagram" },
                { href: "#", icon: <YoutubeIcon />, label: "YouTube" },
                { href: "#", icon: <LinkedInIcon />, label: "LinkedIn" },
              ].map((s) => (
                <a key={s.label} href={s.href} className="gpd-social-icon" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h4 className="gpd-col-heading">Quick Links</h4>
            <ul className="gpd-link-list">
              {["Home", "About Us", "Plots", "Amenities", "Why Genuine", "Gallery", "Contact Us"].map((item) => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Plot Types */}
          <div>
            <h4 className="gpd-col-heading">Plot Types</h4>
            <ul className="gpd-link-list">
              {["Residential Plots", "Premium Plots", "Corner Plots", "Commercial Plots", "Villa Plots"].map((item) => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Contact */}
          <div>
            <h4 className="gpd-col-heading">Contact Us</h4>
            <div className="gpd-contact-items">

              <div className="gpd-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b03030" strokeWidth="2" style={{ flexShrink: 0, marginTop: "3px" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>123, Anna Salai, Chennai,<br />Tamil Nadu – 600002</span>
              </div>

              <div className="gpd-contact-row" style={{ alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b03030" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
                <a href="tel:+919999999999">+91 99999 99999</a>
              </div>

              <div className="gpd-contact-row" style={{ alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b03030" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@genuineproperty.in">info@genuineproperty.in</a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="gpd-bottom-bar">
          <p className="gpd-copyright">
            © {new Date().getFullYear()} Genuine Property Developers. All rights reserved.
          </p>
          <div className="gpd-bottom-links">
            {["Privacy Policy", "Terms of Use", "RERA Info"].map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}