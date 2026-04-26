import { useEffect, useRef, useState, useCallback } from "react";
import ZH from "./translations";

const HERO_CARDS_MOBILE = [
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/6_-_The_Lovers_copy_jg6jio.png",   w: 90,  rotate: -18, cx: -175, y: "12%", z: 1 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/18_-_The_Moon_copy_m3xziw.png",    w: 105, rotate: -7,  cx: -90,  y: "6%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/19_-_The_Sun_copy_b2enqm.png",     w: 118, rotate: 2,   cx: 0,    y: "4%",  z: 5 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/7_of_cups_l2yseq.png",             w: 105, rotate: 10,  cx: 90,   y: "7%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901833/WhatsApp_Image_2026-04-11_at_17.58.10_ivi5hm.jpg", w: 90, rotate: 20, cx: 175, y: "13%", z: 1 },
];
  const STEPS = t ? t.landing.steps.map((desc, i) => ({ num: String(i+1).padStart(2,"0"), desc, isBold: i === 4 })) : EN_STEPS;

const HERO_CARDS_DESKTOP = [
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/0_The_Fool_copy_befech.png",       w: 105, rotate: -22, cx: -520, y: "10%", z: 1 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/6_-_The_Lovers_copy_jg6jio.png",  w: 118, rotate: -12, cx: -330, y: "2%",  z: 2 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/18_-_The_Moon_copy_m3xziw.png",   w: 132, rotate: -5,  cx: -155, y: "0%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/19_-_The_Sun_copy_b2enqm.png",    w: 152, rotate: 2,   cx:    0, y: "-2%", z: 5 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/7_of_cups_l2yseq.png",            w: 130, rotate: 9,   cx:  170, y: "0%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829855/21_-_The_World_copy_qy9oah.png",  w: 116, rotate: 16,  cx:  330, y: "4%",  z: 2 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901833/WhatsApp_Image_2026-04-11_at_17.58.10_ivi5hm.jpg", w: 104, rotate: 22, cx: 500, y: "9%", z: 1 },
];

const EN_STEPS = [
  { num: "01", desc: "Fill in your name, date of birth, and your question." },
  { num: "02", desc: "Draw your cards or calculate your cosmic blueprint." },
  { num: "03", desc: "Hit 'Send to Coco' — your reading lands with Coco." },
  { num: "04", desc: "Coco reaches out with session details and payment." },
  { num: "05", desc: "Coco reviews your reading once payment is confirmed." },
  { num: "06", desc: "Your 1:1 — 60 / 90 mins reading session with Coco!" },
];

const Stars = () => {
  const positions = Array.from({ length: 80 }, (_, i) => ({
    x: ((i * 73.7) % 100),
    y: ((i * 43.3) % 100),
    r: i % 7 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.8,
    o: 0.2 + (i % 5) * 0.12,
    d: (i % 4) * 0.8,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {positions.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.r * 2, height: s.r * 2,
          borderRadius: "50%",
          background: "#fff",
          opacity: s.o,
          animation: `twinkle ${3 + s.d}s ease-in-out infinite`,
          animationDelay: `${s.d}s`,
        }} />
      ))}
    </div>
  );
};


function AboutCoco({ isMobile }) {
  const [expanded, setExpanded] = useState(false);

  const hook    = "'The darkest chapter can be\nthe greatest gift.'";
  const para1   = t ? t.landing.para1 : "2020 was the darkest time of my life. I lost my business, lost in love, and the pandemic locked me away from everyone I loved. Waking up to despair was an agony; I was being pulled into a black hole, deeper as days passed.";
  const para2   = "Before I completely lost faith, I had my first tarot reading. In my spread, I saw 'The Sun' card for the first time. At that moment, I felt a light shining through the thick grey clouds, gently telling me it is not the end of the world. I found clarity, direction, and a quiet sense of hope when I needed it most.";
  const para3   = "What began as a personal practice became something I couldn't keep to myself...";
  const para4   = "As I shared readings with close friends, the feedback was humbling. It helped people lighten their paths, find what they truly want, and gently heal what quietly ached inside. Today, I offer personal readings in both English and Mandarin, from a deck I illustrated with my own Pomeranian — a little soul who makes every reading feel a little warmer.";
  const para5   = "I don't claim to predict the future. What I offer is clarity, a space to understand yourself better, and the courage to take your next step.";


  const pStyle = {
    fontSize: isMobile ? 14 : 15,
    color: "#a07840",
    lineHeight: 1.85,
    margin: "0 0 12px 0",
    textAlign: isMobile ? "center" : "left",
  };

  const closingStyle = {
    ...pStyle,
    color: "#c9a84c",
    fontStyle: "italic",
    fontSize: isMobile ? 14 : 15,
    whiteSpace: isMobile ? "normal" : "nowrap",
    margin: 0,
  };

  return (
    <section id="about-coco" style={{
      padding: isMobile ? "32px 20px" : "60px 48px",
      maxWidth: 1000,
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid #7c5c2e22",
    }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? 16 : 32 }}>
        <div style={{ fontSize: 11, color: "#a07840", letterSpacing: 5, marginBottom: 12 }}>✦ THE CARTOMANCER ✦</div>
        <h2 style={{ fontSize: isMobile ? 22 : 32, color: "#c9a84c", letterSpacing: 2, marginBottom: 16, fontWeight: "normal", fontFamily: "'IM Fell English', serif" }}>
          About Coco
        </h2>
        <div style={{ width: 60, height: 1, background: "#c9a84c44", margin: "0 auto" }} />
      </div>

      {/* Content */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 16 : 64,
        alignItems: isMobile ? "center" : "flex-start",
      }}>
        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0, width: isMobile ? "100%" : "auto" }}>
          <img
            src="https://res.cloudinary.com/da1asg0hq/image/upload/v1776685972/Gemini_Generated_Image_4cldof4cldof4cld_1_xjl6nl.png"
            alt="Coco Chen"
            style={{
              width: isMobile ? 160 : 260,
              height: isMobile ? 160 : 260,
              borderRadius: "50%",
              border: "2px solid #c9a84c88",
              objectFit: "cover",
              display: "block",
              margin: isMobile ? "0 auto" : 0,
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: isMobile ? 16 : 18, color: "#c9a84c", letterSpacing: 2, marginBottom: 10 }}>Coco Chen</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 6 }}>
              {["Tarot", "Birth Chart", "Astrology"].map(t => (
                <span key={t} style={{ fontSize: 11, color: "#c9a84c88", letterSpacing: 2, borderBottom: "1px solid #c9a84c33", paddingBottom: 2 }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {["English", "Mandarin"].map(t => (
                <span key={t} style={{ fontSize: 11, color: "#c9a84c88", letterSpacing: 2, borderBottom: "1px solid #c9a84c33", paddingBottom: 2 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1, maxWidth: isMobile ? "100%" : 620 }}>
          {/* Hook */}
          <p style={{ ...pStyle, color: "#c9a84c", fontWeight: "bold", fontStyle: "italic", fontSize: isMobile ? 16 : 18, marginBottom: 16 }}>
            {isMobile ? <>"The darkest chapter can be<br />the greatest gift."</> : '"The darkest chapter can be the greatest gift."'}
          </p>

          <p style={pStyle}>{para1}</p>
          <p style={pStyle}>{para2}</p>

          {/* Mobile: read more toggle */}
          {isMobile && !expanded ? (
            <>
              <p style={pStyle}>{para3}</p>
              <button onClick={() => setExpanded(true)} style={{
                background: "transparent", border: "none", color: "#c9a84c",
                fontSize: 12, letterSpacing: 2, cursor: "pointer",
                fontFamily: "'Georgia', serif", display: "block",
                margin: "4px auto 0", padding: "4px 0",
                textDecoration: "underline", textUnderlineOffset: 4,
              }}>
                Read more ↓
              </button>
            </>
          ) : (
            <>
              <p style={pStyle}>{para3}</p>
              <p style={pStyle}>{para4}</p>
              <p style={pStyle}>{para5}</p>
              <p style={{ ...closingStyle, fontWeight: "bold" }}>{closing}</p>
              {isMobile && expanded && (
                <button onClick={() => setExpanded(false)} style={{
                  background: "transparent", border: "none", color: "#c9a84c88",
                  fontSize: 11, letterSpacing: 2, cursor: "pointer",
                  fontFamily: "'Georgia', serif", display: "block",
                  margin: "12px auto 0", padding: "4px 0",
                }}>
                  Show less ↑
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage({ onBeginReading, onBeginChart, bgmOn, onToggleBgm, lang, onToggleLang }) {
  const t = lang === "zh" ? ZH : null;
  const PHRASES = ["To stay or go?", "To fight or let go?", "To trust or walk away..."];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setPhraseIdx(i => (i + 1) % 3);
        setFadeIn(true);
      }, 600);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isMobile = window.innerWidth < 600;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #060014 0%, #0d0221 30%, #1a0545 60%, #0d0221 100%)",
      fontFamily: "'Georgia', serif",
      color: "#e8d5b7",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes float-y0 { 0%,100%{margin-top:0px} 50%{margin-top:-10px} }
        @keyframes float-y1 { 0%,100%{margin-top:0px} 50%{margin-top:-14px} }
        @keyframes float-y2 { 0%,100%{margin-top:0px} 50%{margin-top:-8px} }
        @keyframes float-y3 { 0%,100%{margin-top:0px} 50%{margin-top:-12px} }
        @keyframes float-y4 { 0%,100%{margin-top:0px} 50%{margin-top:-9px} }
        @keyframes float-y5 { 0%,100%{margin-top:0px} 50%{margin-top:-13px} }
        @keyframes float-y6 { 0%,100%{margin-top:0px} 50%{margin-top:-11px} }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-btn {
          background: #c9a84c;
          border: none;
          border-radius: 40px;
          color: #0d0221;
          font-family: 'Georgia', serif;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 1px;
          padding: 11px 22px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
          background-size: 200% auto;
          box-shadow: 0 0 24px #c9a84c88, 0 0 48px #c9a84c44;
          animation: shimmer 1.5s linear infinite;
        }
        .cta-btn-primary {
          background: #c9a84c;
          border: none;
          color: #0d0221;
          font-weight: bold;
        }
        .rose-btn {
          background: #c4a0a0 !important;
          color: #2a1212 !important;
        }
        .rose-btn:hover {
          background: linear-gradient(135deg, #c4a0a0, #ddbfbf, #c4a0a0) !important;
          background-size: 200% auto !important;
          animation: shimmer 1.5s linear infinite !important;
          box-shadow: 0 0 24px #c4a0a088, 0 0 48px #c4a0a044 !important;
        }
        .lavender-btn {
          background: #b0a0c4 !important;
          color: #1a122a !important;
        }
        .lavender-btn:hover {
          background: linear-gradient(135deg, #b0a0c4, #cbbfdd, #b0a0c4) !important;
          background-size: 200% auto !important;
          animation: shimmer 1.5s linear infinite !important;
          box-shadow: 0 0 24px #b0a0c488, 0 0 48px #b0a0c444 !important;
        }
        .cta-btn-primary:hover {
          background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
          background-size: 200% auto;
          box-shadow: 0 0 24px #c9a84c88, 0 0 48px #c9a84c44;
          animation: shimmer 1.5s linear infinite;
        }
        .step-card:hover { transform: translateY(-4px); }
        .step-card { transition: transform 0.3s ease; }
        .card-img {
          border-radius: 10px;
          border: 2px solid #c9a84c88;
          box-shadow: 0 12px 40px #00000088;
          object-fit: cover;
          display: block;
        }
      `}</style>

      <Stars />

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "180px 16px 40px" : "250px 24px 40px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Card spread */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: isMobile ? 200 : 240,
          pointerEvents: "none",
          overflow: "hidden",
        }}>
          {(isMobile ? HERO_CARDS_MOBILE : HERO_CARDS_DESKTOP).map((card, i) => {
            const mobileW = Math.round(card.w * 0.72);
            const w = isMobile ? mobileW : card.w;
            const h = Math.round(w * 1.6);
            const leftStyle = `calc(50% + ${card.cx - w / 2}px)`;
            return (
              <img
                key={i}
                src={card.url}
                alt={`card ${i + 1}`}
                className="card-img"
                style={{
                  position: "absolute",
                  left: leftStyle,
                  top: card.y,
                  width: w,
                  height: h,
                  zIndex: card.z,
                  transform: `rotate(${card.rotate}deg)`,
                  animation: `float-y${i} ${5 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            );
          })}
          {/* Gradient fade at bottom of card spread */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 160,
            background: "linear-gradient(to bottom, transparent, #0d0221)",
          }} />
        </div>

        {/* Text content */}
        <div style={{ position: "relative", zIndex: 2, animation: "fadeUp 1s ease-out 0.4s both", width: "100%", maxWidth: isMobile ? 500 : 860, margin: "0 auto" }}>
          <div style={{ fontSize: isMobile ? 10 : 11, color: "#a07840", letterSpacing: isMobile ? 3 : 5, marginBottom: isMobile ? 10 : 10 }}>
            {isMobile ? (<>WELCOME TO<br/>✦ COCO'S COSMIC WORLD ✦</>) : "✦ WELCOME TO COCO'S COSMIC WORLD ✦"}
          </div>

          {/* Cycling power statement */}
          <div style={{
            height: isMobile ? 80 : 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: isMobile ? 8 : 12,
          }}>
            <h1 style={{
              fontSize: isMobile ? "clamp(22px, 6vw, 28px)" : "clamp(28px, 4vw, 42px)",
              letterSpacing: isMobile ? 0.5 : 1,
              lineHeight: 1.3,
              fontFamily: "'IM Fell English', serif",
              color: "#e8d5b7",
              fontWeight: "normal",
              margin: 0,
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 0.6s ease",
              textAlign: "center",
            }}>
              {PHRASES[phraseIdx]}
            </h1>
          </div>

          {/* Fixed anchor line */}
          <p style={{
            fontSize: isMobile ? "14px" : "17px",
            color: "#a07840",
            maxWidth: isMobile ? 500 : 620,
            margin: isMobile ? "0 auto 20px" : "0 auto 24px",
            lineHeight: 1.9,
            letterSpacing: 0.5,
            fontStyle: "italic",
          }}>
            {isMobile ? (
              <>Through tarot and the stars, I will guide you<br />to find clarity, illuminate the path ahead,<br />and discover who you truly are.</>
            ) : (
              <>Through tarot and the stars, I will guide you to find clarity,<br />illuminate the path ahead, and discover who you truly are.</>
            )}
          </p>

          {/* Main CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
            <button className="cta-btn" onClick={onBeginReading}>
              {t ? t.landing.btn_reading : "🌙 Begin Your Tarot Reading"}
            </button>
            <button className="cta-btn" onClick={onBeginChart}>
              🌌 Calculate My Cosmic Blueprint
            </button>
          </div>

          {/* Personal line */}
          <div style={{ fontSize: isMobile ? 12 : 13, color: "#c9a84c", letterSpacing: isMobile ? 1 : 2, marginBottom: isMobile ? 12 : 16, fontStyle: "italic" }}>
            {t ? t.landing.personal_line : "✦ Every reading is personally done by Coco Chen ✦"}
          </div>

          {/* Secondary nav */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn rose-btn" onClick={() => {
              document.getElementById("about-coco").scrollIntoView({ behavior: "smooth" });
            }}>
              {t ? t.landing.btn_about : "✨ About Coco"}
            </button>
            <button className="cta-btn lavender-btn" onClick={() => {
              document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" });
            }}>
              {t ? t.landing.btn_how : "🔮 See how it works"}
            </button>
          </div>
        </div>

      </section>

      {/* ── ABOUT COCO ── */}
      <AboutCoco isMobile={isMobile} />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{
        padding: "40px 48px 80px",
        maxWidth: 720,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Section header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: isMobile ? 10 : 11, color: "#a07840", letterSpacing: 4, marginBottom: 6 }}>✦ THE JOURNEY ✦</div>
          <h2 style={{ fontSize: isMobile ? "22px" : "36px", color: "#c9a84c", letterSpacing: 2, marginBottom: 16, fontWeight: "normal" }}>
            How it works
          </h2>
          <div style={{ width: 60, height: 1, background: "#c9a84c44", margin: "0 auto" }} />
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Vertical line */}
          {!isMobile && (
            <div style={{
              position: "absolute", left: 39, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, transparent, #c9a84c44, transparent)",
            }} />
          )}

          {STEPS.map((step, i) => (
            <div key={i} className="reveal step-card" style={{
              display: "flex",
              gap: isMobile ? 20 : 32,
              padding: isMobile ? "8px 0" : "10px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid #7c5c2e22" : "none",
              transitionDelay: `${i * 0.1}s`,
            }}>
              {/* Number circle */}
              <div style={{ width: 96, flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4 }}>
                <div style={{
                  width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: "50%",
                  border: "1px solid #c9a84c",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#0d0221", flexShrink: 0, position: "relative", zIndex: 1,
                }}>
                  <span style={{ fontSize: isMobile ? 12 : 13, color: "#c9a84c", letterSpacing: 1 }}>{step.num}</span>
                </div>
              </div>
              {/* Text */}
              <div style={{ flex: 1, paddingTop: 8 }}>
                <p style={{ fontSize: isMobile ? 14 : 16, color: step.isBold ? "#e8d5b7" : "#c9a880", lineHeight: 1.7, margin: 0, maxWidth: 540, fontWeight: step.isBold ? "bold" : "normal" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment note */}
        <div style={{ textAlign: "center", marginTop: 12, marginBottom: 4 }}>
          <span style={{ fontSize: isMobile ? 12 : 13, color: "#c9a84c", letterSpacing: 2, fontWeight: "bold" }}>
            {t ? t.landing.disclaimer : "✦ Please allow 18 hours for Coco to conduct a deep analysis of your cosmic blueprint ✦"}
          </span>
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: "center", marginTop: 10 }}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn" onClick={onBeginReading}>
              {t ? t.landing.btn_reading : "🌙 Begin Your Tarot Reading"}
            </button>
            <button className="cta-btn" onClick={onBeginChart}>
              🌌 Calculate My Cosmic Blueprint
            </button>
          </div>
        </div>


      </section>

      {/* ── FOOTER ── */}
      <div style={{
        textAlign: "center",
        padding: "32px 24px",
        borderTop: "1px solid #7c5c2e22",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ fontSize: 14, color: "#c9a84c", letterSpacing: 4, marginBottom: 8 }}>✦ COCO'S COSMIC WORLD ✦</div>
        <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 3 }}>{t ? t.landing.footer_sub : "Tarot · Birth Chart · Astrology"}</div>
      </div>

    {/* Lang toggle */}
      {onToggleLang && (
        <button onClick={onToggleLang} style={{
          position: "fixed", top: 20, right: 72,
          height: 44, borderRadius: 22,
          padding: "0 16px",
          background: "#1a0545",
          border: "1px solid #c9a84c",
          color: "#c9a84c", fontSize: 13,
          cursor: "pointer", zIndex: 999,
          fontFamily: "'Georgia', serif",
          letterSpacing: 1,
          transition: "all 0.3s ease",
        }}>
          {lang === "en" ? "中文" : "EN"}
        </button>
      )}

    {/* Floating music toggle - top right */}
      {onToggleBgm && (
        <button
          onClick={onToggleBgm}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: bgmOn ? "#1f3a1f" : "#1a0545",
            border: "1px solid #c9a84c",
            color: "#c9a84c",
            fontSize: 18,
            cursor: "pointer",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: bgmOn ? "0 0 12px #c9a84c44" : "none",
            transition: "all 0.3s ease",
          }}
          title={bgmOn ? "Music ON" : "Music OFF"}
        >
          {bgmOn ? "🔊" : "🔇"}
        </button>
      )}
    </div>
  );
}
