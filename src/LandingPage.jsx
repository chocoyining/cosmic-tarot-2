import { useEffect, useRef } from "react";

const HERO_CARDS_MOBILE = [
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/6_-_The_Lovers_copy_jg6jio.png",   w: 90,  rotate: -18, cx: -175, y: "12%", z: 1 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/18_-_The_Moon_copy_m3xziw.png",    w: 105, rotate: -7,  cx: -90,  y: "6%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/19_-_The_Sun_copy_b2enqm.png",     w: 118, rotate: 2,   cx: 0,    y: "4%",  z: 5 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/7_of_cups_l2yseq.png",             w: 105, rotate: 10,  cx: 90,   y: "7%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901833/WhatsApp_Image_2026-04-11_at_17.58.10_ivi5hm.jpg", w: 90, rotate: 20, cx: 175, y: "13%", z: 1 },
];

const HERO_CARDS_DESKTOP = [
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/0_The_Fool_copy_befech.png",       w: 105, rotate: -22, cx: -520, y: "10%", z: 1 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/6_-_The_Lovers_copy_jg6jio.png",  w: 118, rotate: -12, cx: -330, y: "2%",  z: 2 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/18_-_The_Moon_copy_m3xziw.png",   w: 132, rotate: -5,  cx: -155, y: "0%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/19_-_The_Sun_copy_b2enqm.png",    w: 152, rotate: 2,   cx:    0, y: "-2%", z: 5 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/7_of_cups_l2yseq.png",            w: 130, rotate: 9,   cx:  170, y: "0%",  z: 3 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829855/21_-_The_World_copy_qy9oah.png",  w: 116, rotate: 16,  cx:  330, y: "4%",  z: 2 },
  { url: "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901833/WhatsApp_Image_2026-04-11_at_17.58.10_ivi5hm.jpg", w: 104, rotate: 22, cx: 500, y: "9%", z: 1 },
];

const STEPS = [
  {
    num: "01",
    title: "Enter your details",
    desc: "Share your name, date of birth, and the question or intention you're carrying into the reading.",
  },
  {
    num: "02",
    title: "Draw your cards or calculate your blueprint",
    desc: "Let the cards find you through a meditative drawing ritual — or discover where the planets fell at the moment of your birth.",
  },
  {
    num: "03",
    title: "Send to Coco & save for yourself",
    desc: "Hit 'Send to Coco' and your reading lands with me. Save a beautiful image for yourself to keep.",
  },
  {
    num: "04",
    title: "Receive a message from Coco",
    desc: "I'll reach out personally to book your reading session — choose a meeting or a text — and guide you through what the cards and stars reveal.",
  },
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

export default function LandingPage({ onBeginReading, onBeginChart }) {
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
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap');
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
          background: transparent;
          border: 1px solid #c9a84c;
          border-radius: 40px;
          color: #c9a84c;
          font-family: 'Georgia', serif;
          font-size: 14px;
          letter-spacing: 2px;
          padding: 14px 40px;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
          background-size: 200% auto;
          color: #0d0221;
          font-weight: bold;
          animation: shimmer 2s linear infinite;
          border-color: transparent;
        }
        .cta-btn-primary {
          background: transparent;
          border: 1px solid #c9a84c;
          color: #c9a84c;
        }
        .cta-btn-primary:hover {
          background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
          background-size: 200% auto;
          color: #0d0221;
          font-weight: bold;
          animation: shimmer 2s linear infinite;
          border-color: transparent;
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
          <div style={{ fontSize: 11, color: "#a07840", letterSpacing: 5, marginBottom: isMobile ? 12 : 10 }}>
            ✦ WELCOME TO COCO'S COSMIC WORLD ✦
          </div>

          <h1 style={{
            fontSize: isMobile ? "46px" : "clamp(40px, 5vw, 52px)",
            letterSpacing: 4,
            marginBottom: 6,
            lineHeight: 1.05,
            fontFamily: "'IM Fell English', serif",
            background: "linear-gradient(135deg, #c9a84c, #f0d882, #c9a84c)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}>
            Coco Chen
          </h1>

          <div style={{ fontSize: isMobile ? 13 : 16, color: "#a07840", letterSpacing: 5, marginBottom: isMobile ? 12 : 16 }}>
            The Cartomancer
          </div>

          {/* Descriptors */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: isMobile ? 12 : 16 }}>
            {["Gentle", "Honest", "Intuitive", "Spiritual"].map((d, i) => (
              <span key={i} style={{
                fontSize: isMobile ? 10 : 13, color: "#c9a84c88", letterSpacing: 3,
                borderBottom: "1px solid #c9a84c33", paddingBottom: 2,
              }}>{d}</span>
            ))}
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: isMobile ? "13px" : "16px",
            color: "#a07840",
            maxWidth: isMobile ? 500 : 700,
            margin: isMobile ? "0 auto 12px" : "0 auto 16px",
            lineHeight: 1.9,
            letterSpacing: 0.5,
          }}>
            Through tarot and the stars, I will guide you to find clarity,
            <br />illuminate the path ahead, and discover who you truly are.
          </p>

          {/* Deck story */}
          <p style={{
            fontSize: isMobile ? "12px" : "15px",
            color: "#7a5a3a",
            maxWidth: isMobile ? 460 : 680,
            margin: isMobile ? "0 auto 16px" : "0 auto 20px",
            lineHeight: 1.9,
            letterSpacing: 0.3,
            fontStyle: "italic",
            borderTop: "1px solid #7c5c2e33",
            paddingTop: isMobile ? 12 : 20,
          }}>
            "Every card in this deck is illustrated with my own Pomeranian — a little soul who brings warmth, curiosity and love into every reading. Drawing from this deck not only creates an extra layer of connection between us, but I hope it also brings extra positivity and strength to whatever you're going through."
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: isMobile ? 10 : 16 }}>
            <button className="cta-btn" onClick={() => {
              document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" });
            }}>
              💡 How it works
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn cta-btn-primary" onClick={onBeginReading}>
              🎴 Begin Your Tarot Reading
            </button>
            <button className="cta-btn" onClick={onBeginChart}>
              ✦ Calculate My Cosmic Blueprint
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          zIndex: 2, opacity: 0.5,
        }}>
          <div style={{ fontSize: 9, color: "#a07840", letterSpacing: 3 }}>SCROLL</div>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, #c9a84c66, transparent)" }} />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{
        padding: "100px 24px",
        maxWidth: 860,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Section header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontSize: 11, color: "#a07840", letterSpacing: 5, marginBottom: 16 }}>✦ THE JOURNEY ✦</div>
          <h2 style={{ fontSize: "clamp(26px, 5vw, 42px)", color: "#c9a84c", letterSpacing: 2, marginBottom: 16, fontWeight: "normal" }}>
            How it works
          </h2>
          <div style={{ width: 60, height: 1, background: "#c9a84c44", margin: "0 auto" }} />
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Vertical line */}
          {!isMobile && (
            <div style={{
              position: "absolute", left: 48, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, transparent, #c9a84c44, transparent)",
            }} />
          )}

          {STEPS.map((step, i) => (
            <div key={i} className="reveal step-card" style={{
              display: "flex",
              gap: isMobile ? 20 : 32,
              padding: "32px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid #7c5c2e22" : "none",
              transitionDelay: `${i * 0.1}s`,
            }}>
              {/* Number circle */}
              <div style={{ width: 96, flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: "1px solid #c9a84c",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#0d0221", flexShrink: 0, position: "relative", zIndex: 1,
                }}>
                  <span style={{ fontSize: 12, color: "#c9a84c", letterSpacing: 1 }}>{step.num}</span>
                </div>
              </div>
              {/* Text */}
              <div style={{ flex: 1, paddingTop: 8 }}>
                <h3 style={{ fontSize: isMobile ? 15 : 19, color: "#e8d5b7", letterSpacing: 1, marginBottom: 10, fontWeight: "normal" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#a07840", lineHeight: 1.8, margin: 0, maxWidth: 540 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: "center", marginTop: 80 }}>
          <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 3, marginBottom: 24 }}>✦ READY TO BEGIN? ✦</div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn cta-btn-primary" onClick={onBeginReading}>
              🎴 Begin Your Tarot Reading
            </button>
            <button className="cta-btn" onClick={onBeginChart}>
              ✦ Calculate My Cosmic Blueprint
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 80, paddingTop: 40, borderTop: "1px solid #7c5c2e22" }}>
          <div style={{ fontSize: 18, color: "#c9a84c", letterSpacing: 3, marginBottom: 8 }}>✦ Coco · The Cartomancer ✦</div>
          <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2 }}>Gentle · Honest · Intuitive · Spiritual</div>
        </div>
      </section>
    </div>
  );
}
