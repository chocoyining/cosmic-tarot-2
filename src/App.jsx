import { useState, useRef } from "react";

const SPREADS = [
  {
    id: "single", name: "Single Card Draw", desc: "One card for guidance", icon: "✧",
    cards: [{ label: "Card", x: 0, y: 0 }], cols: 1, rows: 1,
  },
  {
    id: "three", name: "Basic 3-Card Spread", desc: "Three cards · Open reading", icon: "✦",
    cards: [
      { label: "Card 1", x: 0, y: 0 },
      { label: "Card 2", x: 1, y: 0 },
      { label: "Card 3", x: 2, y: 0 },
    ], cols: 3, rows: 1,
  },
  {
    id: "career", name: "Career Spread", desc: "7-Card Career Square", icon: "◈",
    cards: [
      { label: "1 · Current",     x: 0, y: 0 },
      { label: "2 · Improvement", x: 0, y: 1 },
      { label: "3 · Remain",      x: 0, y: 2 },
      { label: "4 · Effort",      x: 2, y: 0 },
      { label: "5 · Changes",     x: 2, y: 1 },
      { label: "6 · Past",        x: 2, y: 2 },
      { label: "7 · Prediction",  x: 1, y: 1 },
    ], cols: 3, rows: 3,
  },
  {
    id: "relationship", name: "Relationship Spread", desc: "7-Card Love Spread", icon: "❧",
    cards: [
      { label: "1 · Past",        x: 0, y: 0 },
      { label: "2 · Present",     x: 0, y: 1 },
      { label: "3 · Future",      x: 0, y: 2 },
      { label: "4 · Action",      x: 1, y: 2 },
      { label: "5 · Their Trait", x: 2, y: 2 },
      { label: "6 · Obstacle",    x: 2, y: 1 },
      { label: "7 · Outcome",     x: 2, y: 0 },
    ], cols: 3, rows: 3,
  },
  {
    id: "optionab", name: "Option A/B Spread", desc: "5-Card Decision", icon: "⟁",
    cards: [
      { label: "Situation", x: 1, y: 0 },
      { label: "Option A",  x: 0, y: 1 },
      { label: "Option B",  x: 2, y: 1 },
      { label: "If A",      x: 0, y: 2 },
      { label: "If B",      x: 2, y: 2 },
    ], cols: 3, rows: 3,
  },
];

// ── Replace these with your actual Cloudinary URLs ──
const CARD_IMAGES = [
  // "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/tarot/01_fool.jpg",
  // "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/tarot/02_magician.jpg",
  // ... add all 78 card URLs here
];
const CARD_BACK = ""; // e.g. "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/tarot/card_back.jpg"
const BGM_URL   = ""; // e.g. "https://res.cloudinary.com/YOUR_CLOUD/video/upload/v1/tarot/bgm.mp3"
// ────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function btn(bg) {
  return {
    background: bg, border: "1px solid #7c5c2e", borderRadius: 8,
    color: "#e8d5b7", padding: "8px 16px", fontSize: 13, cursor: "pointer", letterSpacing: 0.5,
  };
}

function CardSlot({ label, img, flipped, onClick, cardBack, size }) {
  const w = size, h = Math.round(size * 1.6);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div onClick={!flipped ? onClick : undefined} style={{ width: w, height: h, perspective: 800, cursor: flipped ? "default" : "pointer" }}>
        <div style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            borderRadius: 10, overflow: "hidden",
            boxShadow: "0 4px 18px #0006", border: "2px solid #7c5c2e", background: "#1a0545",
          }}>
            {cardBack
              ? <img src={cardBack} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="back" />
              : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0d0221,#2d0b6b,#0d0221)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#c9a84c" }}>✦</div>
            }
          </div>
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", borderRadius: 10, overflow: "hidden",
            boxShadow: "0 4px 18px #0006", border: "2px solid #c9a84c", background: "#111",
          }}>
            {img
              ? <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={label} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a84c", fontSize: 13, textAlign: "center", padding: 8, background: "linear-gradient(135deg,#1a0545,#0d0221)" }}>{label}</div>
            }
          </div>
        </div>
      </div>
      <span style={{ color: "#c9a84c", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", opacity: 0.85 }}>{label}</span>
    </div>
  );
}

const Stars = () => (
  <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
    {Array.from({ length: 60 }, (_, i) => (
      <circle key={i} cx={`${(i * 37.7) % 100}%`} cy={`${(i * 23.3) % 100}%`} r={i % 5 === 0 ? 1.5 : 1} fill="#fff" opacity={0.3 + (i % 5) * 0.1} />
    ))}
  </svg>
);

export default function App() {
  const [screen, setScreen]         = useState("home");
  const [spread, setSpread]         = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [flipped, setFlipped]       = useState([]);
  const [bgmOn, setBgmOn]           = useState(false);
  const bgmAudio = useRef(null);

  function toggleBgm() {
    if (!BGM_URL) return;
    if (!bgmAudio.current) {
      const audio = new Audio(BGM_URL);
      audio.loop = true;
      audio.volume = 0.5;
      bgmAudio.current = audio;
    }
    if (bgmOn) {
      bgmAudio.current.pause();
      setBgmOn(false);
    } else {
      bgmAudio.current.play().then(() => setBgmOn(true)).catch(() => {});
    }
  }

  function playCardFlip() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufLen = Math.floor(ctx.sampleRate * 0.12);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 2) * 0.6;
    const swish = ctx.createBufferSource();
    swish.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass"; filter.frequency.value = 800; filter.Q.value = 0.8;
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.5, ctx.currentTime);
    sg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    swish.connect(filter); filter.connect(sg); sg.connect(ctx.destination);
    swish.start();
    const thump = ctx.createOscillator();
    const tg = ctx.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(120, ctx.currentTime);
    thump.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1);
    tg.gain.setValueAtTime(0.25, ctx.currentTime);
    tg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    thump.connect(tg); tg.connect(ctx.destination);
    thump.start(); thump.stop(ctx.currentTime + 0.15);
  }

  function startDraw(sp) {
    const shuffled = shuffle(CARD_IMAGES);
    setSpread(sp);
    setDrawnCards(shuffled.slice(0, sp.cards.length));
    setFlipped(new Array(sp.cards.length).fill(false));
    setScreen("draw");
  }

  function flipCard(i) {
    playCardFlip();
    setFlipped((prev) => { const n = [...prev]; n[i] = true; return n; });
  }

  function flipAll() {
    flipped.forEach((f, i) => { if (!f) setTimeout(() => playCardFlip(), i * 120); });
    setFlipped(new Array(spread.cards.length).fill(true));
  }

  function renderGrid() {
    const { cards, cols, rows } = spread;
    const size = Math.min(110, Math.floor(380 / cols));
    const gap = 12;
    const cellW = size + gap;
    const cellH = Math.round(size * 1.6) + gap + 24;
    return (
      <div style={{ position: "relative", width: cols * cellW, height: rows * cellH, margin: "0 auto" }}>
        {cards.map((c, i) => (
          <div key={i} style={{ position: "absolute", left: c.x * cellW, top: c.y * cellH }}>
            <CardSlot label={c.label} img={drawnCards[i]} flipped={flipped[i]} onClick={() => flipCard(i)} cardBack={CARD_BACK} size={size} />
          </div>
        ))}
      </div>
    );
  }

  const bgStyle = {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    fontFamily: "'Georgia', serif", color: "#e8d5b7", padding: "24px 16px",
    position: "relative", overflow: "hidden",
  };

  if (screen === "home") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ textAlign: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 22, color: "#c9a84c", letterSpacing: 3, marginBottom: 4 }}>✦ Coco's Cosmic Tarot ✦</div>
        <div style={{ fontSize: 13, color: "#a07840", letterSpacing: 3 }}>CHOOSE YOUR SPREAD</div>
        {BGM_URL && (
          <button onClick={toggleBgm} style={{ ...btn(bgmOn ? "#1f3a1f" : "#2a1a40"), marginTop: 10, fontSize: 12 }}>
            {bgmOn ? "🔊 BGM ON" : "🔇 BGM OFF"}
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {SPREADS.map((sp) => (
          <button key={sp.id} disabled={CARD_IMAGES.length < sp.cards.length} onClick={() => startDraw(sp)} style={{
            background: CARD_IMAGES.length >= sp.cards.length ? "#ffffff0d" : "#ffffff05",
            border: `1px solid ${CARD_IMAGES.length >= sp.cards.length ? "#7c5c2e" : "#3a2a1a"}`,
            borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
            cursor: CARD_IMAGES.length >= sp.cards.length ? "pointer" : "not-allowed",
            color: CARD_IMAGES.length >= sp.cards.length ? "#e8d5b7" : "#5a4a3a",
            textAlign: "left", width: "100%",
          }}>
            <span style={{ fontSize: 28, width: 36, textAlign: "center" }}>{sp.icon}</span>
            <div>
              <div style={{ fontWeight: "bold", fontSize: 15 }}>{sp.name}</div>
              <div style={{ fontSize: 12, color: "#a07840", marginTop: 2 }}>{sp.desc} · {sp.cards.length} cards</div>
            </div>
          </button>
        ))}
      </div>
      {CARD_IMAGES.length === 0 && (
        <div style={{ marginTop: 20, fontSize: 12, color: "#7a5a3a", position: "relative", zIndex: 1 }}>
          Card images not yet configured. Add your Cloudinary URLs to App.jsx.
        </div>
      )}
    </div>
  );

  return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ textAlign: "center", marginBottom: 16, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: "#a07840", letterSpacing: 3, marginBottom: 4 }}>{spread.desc.toUpperCase()}</div>
        <div style={{ fontSize: 22, color: "#c9a84c", letterSpacing: 2 }}>{spread.name}</div>
      </div>
      <div style={{ marginBottom: 24, overflowX: "auto", width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        {renderGrid()}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
        {flipped.some((f) => !f) && <button onClick={flipAll} style={btn("#3b1f6e")}>Reveal All</button>}
        <button onClick={() => startDraw(spread)} style={btn("#1f3a1f")}>Draw Again</button>
        <button onClick={() => setScreen("home")} style={btn("#2a1a1a")}>← Spreads</button>
      </div>
      {flipped.every((f) => !f) && <div style={{ marginTop: 20, fontSize: 12, color: "#7a5a3a", position: "relative", zIndex: 1 }}>Tap a card to reveal it</div>}
    </div>
  );
}
