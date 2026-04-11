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

const CARD_IMAGES = [
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829895/Queen_of_cups_kfar29.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829894/Page_of_Wands_jf49cy.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829894/Page_of_cups_mtj7ig.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829894/Knight_of_cups_ev8xca.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829894/Knight_of_Wands_hkseti.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829894/10_of_wands_v7a1da.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829893/Ace_of_cups_eqqsdx.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829893/King_of_Cups_rnxe45.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829893/Ace_of_wands_ytpmim.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829893/9_of_wands_gmav7m.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829892/10_of_cups_oofjvr.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829892/7_of_wands_jwozn1.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829892/8_of_cups_fyixgr.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829892/9_of_cups_huppla.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829892/8_of_wands_br2ltf.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/7_of_cups_l2yseq.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/6_of_cups_v8zdrm.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/5_of_wands_g02hfd.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829891/6_of_wands_aom5nz.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829890/5_of_cups_rlguux.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829890/4_of_wands_xua7k4.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829890/4_of_cups_v8hu2r.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829889/3_of_wands_mls853.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829889/3_of_cups_olsmus.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829889/2_of_cups_zkger8.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829889/2_of_wands_c73kzf.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829856/20_-_Judgement_copy_mt5emc.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829855/21_-_The_World_copy_qy9oah.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/3_-_The_Empress_copy_kghejc.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/19_-_The_Sun_copy_b2enqm.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829854/18_-_The_Moon_copy_m3xziw.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829853/17_-_The_Star_copy_xehtx0.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829853/10_-_The_Wheel_of_Fortune_copy_psoobj.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829853/16_-_The_Tower_copy_xsn5sv.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829853/9_-_The_Hermit_copy_epaiad.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829853/15_-_The_Devil_copy_jr8tat.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829852/8_-_Strength_copy_gedckc.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829852/14_-_Temperance_copy_kfhhpf.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/4_-_The_Emperor_copy_t9btt1.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/0_The_Fool_copy_befech.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/13_-_Death_copy_a3srsv.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/6_-_The_Lovers_copy_jg6jio.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/7_-_The_Chariot_copy_vo4kpp.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829851/5_-_The_Hierophant_copy_otd8uu.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/2_-_The_High_Priestess_copy_pwumxy.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/12_-_The_Hanged_Man_copy_u8elku.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/1_-_The_Magician_copy_xqsqti.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775829850/11_-_Justice_copy_v3qrwt.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901834/WhatsApp_Image_2026-04-11_at_17.58.11_lcfnmo.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901833/WhatsApp_Image_2026-04-11_at_17.58.10_ivi5hm.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901832/King_of_wands_rqzxte.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901832/WhatsApp_Image_2026-04-11_at_17.58.10_3_g0rzr5.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901831/WhatsApp_Image_2026-04-11_at_17.58.09_pjjodb.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901830/WhatsApp_Image_2026-04-11_at_17.58.10_1_oykbhi.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901828/WhatsApp_Image_2026-04-11_at_17.58.09_2_v2deri.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901827/Queen_of_wands_nxptka.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901827/WhatsApp_Image_2026-04-11_at_17.58.09_1_n6bhgm.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901826/knight_of_pentacles_clpebn.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901825/queen_of_pentacles_m3y1me.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901825/Page_of_pentacles_wczwth.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901823/king_of_pentacles_ikeyro.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901823/3_of_pentacles_ubxe3p.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901822/Ace_of_pentacles_uegvlb.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901818/9_of_pentacles_iqe9j0.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901817/8_of_pentacles_pd7sne.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901816/7_of_pentacles_ztw25z.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901816/5_of_pentacles_pod8ml.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901815/4_of_swords_to2yki.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901815/5_of_swords_l5fvka.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901813/3_of_swords_bl8h4x.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901814/4_of_pentacles_f6li5l.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901812/2_of_pentacles_ceebjp.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901811/2_of_swords_rr9uio.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775902495/WhatsApp_Image_2026-04-11_at_18.12.07_mvezpt.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901819/10_of_pentacles_x4b25p.png",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775903869/WhatsApp_Image_2026-04-11_at_18.36.18_pvciiw.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775903870/WhatsApp_Image_2026-04-11_at_18.37.12_qr1yei.jpg",
  "https://res.cloudinary.com/da1asg0hq/image/upload/v1775901832/WhatsApp_Image_2026-04-11_at_17.58.10_2_jiuuek.jpg",
];

const CARD_BACK = "";
const BGM_URL   = "https://res.cloudinary.com/da1asg0hq/video/upload/v1775831307/Silver_Leaf_Drift_jrf2xh.mp3";

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
    fontFamily: "'Georgia', serif",
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

const inputStyle = {
  background: "#ffffff0d",
  border: "1px solid #7c5c2e",
  borderRadius: 8,
  color: "#e8d5b7",
  padding: "10px 14px",
  fontSize: 14,
  width: "100%",
  fontFamily: "'Georgia', serif",
  outline: "none",
};

export default function App() {
  const [screen, setScreen]         = useState("home");
  const [clientName, setClientName] = useState("");
  const [clientDob, setClientDob]   = useState("");
  const [nameError, setNameError]   = useState(false);
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
    const audio = new Audio("https://res.cloudinary.com/da1asg0hq/video/upload/v1775905865/freesound_community-flipcard-91468_oiatib.mp3");
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }

  function handleInfoSubmit() {
    if (!clientName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setScreen("spreads");
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

  // ── SCREEN 1: HOME ──
  if (screen === "home") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, marginTop: 60 }}>
        <div style={{ fontSize: 28, color: "#c9a84c", letterSpacing: 3, marginBottom: 12 }}>✦ Coco's Cosmic Tarot ✦</div>
        <div style={{ fontSize: 13, color: "#a07840", letterSpacing: 3, marginBottom: 40 }}>THE STARS ARE READY FOR YOU</div>
        <button onClick={() => setScreen("info")} style={{ ...btn("#3b1f6e"), fontSize: 15, padding: "12px 32px", letterSpacing: 2 }}>
          Begin Your Reading
        </button>
      </div>
    </div>
  );

  // ── SCREEN 2: CLIENT INFO ──
  if (screen === "info") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1, marginTop: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 20, color: "#c9a84c", letterSpacing: 2, marginBottom: 6 }}>✦ Your Reading ✦</div>
          <div style={{ fontSize: 12, color: "#a07840", letterSpacing: 2 }}>TELL US A LITTLE ABOUT YOURSELF</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ fontSize: 12, color: "#a07840", letterSpacing: 2, display: "block", marginBottom: 6 }}>YOUR NAME *</label>
            <input
              style={{ ...inputStyle, borderColor: nameError ? "#c94c4c" : "#7c5c2e" }}
              type="text"
              placeholder="Enter your name"
              value={clientName}
              onChange={(e) => { setClientName(e.target.value); setNameError(false); }}
            />
            {nameError && <div style={{ color: "#c94c4c", fontSize: 11, marginTop: 4 }}>Please enter your name to continue.</div>}
          </div>

          <div>
            <label style={{ fontSize: 12, color: "#a07840", letterSpacing: 2, display: "block", marginBottom: 6 }}>DATE OF BIRTH</label>
            <input
              style={inputStyle}
              type="date"
              value={clientDob}
              onChange={(e) => setClientDob(e.target.value)}
            />
          </div>

          <button onClick={handleInfoSubmit} style={{ ...btn("#3b1f6e"), fontSize: 14, padding: "12px 0", marginTop: 8, width: "100%", letterSpacing: 2 }}>
            Choose My Spread →
          </button>

          {BGM_URL && (
            <button onClick={toggleBgm} style={{ ...btn(bgmOn ? "#1f3a1f" : "#2a1a40"), fontSize: 12, width: "100%" }}>
              {bgmOn ? "🔊 BGM ON" : "🔇 BGM OFF"}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── SCREEN 3: SPREADS ──
  if (screen === "spreads") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ textAlign: "center", marginBottom: 24, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 13, color: "#a07840", letterSpacing: 2, marginBottom: 4 }}>
          Welcome, {clientName}
        </div>
        <div style={{ fontSize: 20, color: "#c9a84c", letterSpacing: 3, marginBottom: 4 }}>✦ Choose Your Spread ✦</div>
        {BGM_URL && (
          <button onClick={toggleBgm} style={{ ...btn(bgmOn ? "#1f3a1f" : "#2a1a40"), marginTop: 10, fontSize: 12 }}>
            {bgmOn ? "🔊 BGM ON" : "🔇 BGM OFF"}
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {SPREADS.map((sp) => (
          <button key={sp.id} onClick={() => startDraw(sp)} style={{
            background: "#ffffff0d",
            border: "1px solid #7c5c2e",
            borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
            cursor: "pointer",
            color: "#e8d5b7",
            textAlign: "left", width: "100%",
          }}>
            <span style={{ fontSize: 28, width: 36, textAlign: "center" }}>{sp.icon}</span>
            <div>
              <div style={{ fontWeight: "bold", fontSize: 15 }}>{sp.name}</div>
              <div style={{ fontSize: 12, color: "#a07840", marginTop: 2 }}>{sp.desc} · {sp.cards.length} cards</div>
            </div>
          </button>
        ))}
        <button onClick={() => setScreen("info")} style={{ ...btn("#2a1a1a"), fontSize: 12, marginTop: 4 }}>← Back</button>
      </div>
    </div>
  );

  // ── SCREEN 4: DRAW ──
  return (
    <div style={bgStyle}>
      <Stars />

      {/* Client info header */}
      <div style={{ textAlign: "center", marginBottom: 6, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2, marginBottom: 2 }}>READING FOR</div>
        <div style={{ fontSize: 18, color: "#c9a84c", letterSpacing: 2, marginBottom: 2 }}>{clientName}</div>
        {clientDob && (
          <div style={{ fontSize: 11, color: "#a07840", letterSpacing: 1 }}>
            {new Date(clientDob + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        )}
        <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2, marginTop: 6, marginBottom: 2 }}>{spread.desc.toUpperCase()}</div>
        <div style={{ fontSize: 16, color: "#c9a84c", letterSpacing: 2 }}>{spread.name}</div>
      </div>

      <div style={{ marginBottom: 24, overflowX: "auto", width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        {renderGrid()}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
        {flipped.some((f) => !f) && <button onClick={flipAll} style={btn("#3b1f6e")}>Reveal All</button>}
        <button onClick={() => startDraw(spread)} style={btn("#1f3a1f")}>Draw Again</button>
        <button onClick={() => setScreen("spreads")} style={btn("#2a1a2a")}>← Spreads</button>
        <button onClick={() => { setScreen("home"); setClientName(""); setClientDob(""); }} style={btn("#2a1a1a")}>⌂ Home</button>
      </div>

      {flipped.every((f) => !f) && (
        <div style={{ marginTop: 20, fontSize: 12, color: "#7a5a3a", position: "relative", zIndex: 1 }}>
          Tap a card to reveal it
        </div>
      )}
    </div>
  );
}
