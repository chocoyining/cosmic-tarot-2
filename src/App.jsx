import { useState, useRef, useEffect } from "react";
// html2canvas loaded via CDN in index.html

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
const BGM_URL  = "https://res.cloudinary.com/da1asg0hq/video/upload/v1775831307/Silver_Leaf_Drift_jrf2xh.mp3";
const FLIP_URL = "https://res.cloudinary.com/da1asg0hq/video/upload/v1775905865/freesound_community-flipcard-91468_oiatib.mp3";

// Colour palette for the breathing card — from the provided swatch image
const PALETTE = [
  ["#655D8A", "#9B8FBF"],  // deep purple → mid purple
  ["#9B8FBF", "#C8BDEA"],  // mid purple → lavender
  ["#7897AB", "#5A7A8E"],  // steel blue → slate
  ["#2E5A6B", "#1A3D50"],  // deep teal → midnight teal
  ["#D885A3", "#C87090"],  // blush pink → rose
  ["#B85A78", "#7B2040"],  // rose → deep burgundy
  ["#FDCEB9", "#F0A07A"],  // peach → soft coral
  ["#E8845A", "#C85A3A"],  // coral → deep terracotta
];

// How many fan cards to show (more = denser fan)
const FAN_COUNT = 21;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function btn(bg, extra = {}) {
  return {
    background: bg, border: "1px solid #7c5c2e", borderRadius: 8,
    color: "#e8d5b7", padding: "8px 16px", fontSize: 13, cursor: "pointer",
    letterSpacing: 0.5, fontFamily: "'Georgia', serif", ...extra,
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
  background: "#ffffff0d", border: "1px solid #7c5c2e", borderRadius: 8,
  color: "#e8d5b7", padding: "10px 14px", fontSize: 14, width: "100%",
  fontFamily: "'Georgia', serif", outline: "none",
};

const clamp = (min, val, max) => Math.max(min, Math.min(max, val));

// ── Intention screen messages ──
const INTENTION_MESSAGES = [
  "Close your eyes for a moment...",
  "Take a deep breath...",
  "Hold your question in your heart...",
  "The cards are listening...",
  "Trust your intuition...",
];

export default function App() {
  const [screen, setScreen]                 = useState("home");
  const [clientName, setClientName]         = useState("");
  const [clientDob, setClientDob]           = useState("");
  const [clientQuestion, setClientQuestion] = useState("");
  const [nameError, setNameError]           = useState(false);
  const [spread, setSpread]                 = useState(null);
  const [shuffledDeck, setShuffledDeck]     = useState([]);
  const [pickedIndices, setPickedIndices]   = useState([]);
  const [drawnCards, setDrawnCards]         = useState([]);
  const [flipped, setFlipped]               = useState([]);
  const [bgmOn, setBgmOn]                   = useState(false);
  const [winW, setWinW]                     = useState(window.innerWidth);
  const [saving, setSaving]                 = useState(false);
  const [intentionMsg, setIntentionMsg]     = useState(0);
  const [hoveredFan, setHoveredFan]         = useState(null);
  const [slotIndex, setSlotIndex]           = useState(0);
  const [slotPicked, setSlotPicked]         = useState([]);
  const [slotCurrent, setSlotCurrent]       = useState(0);
  const [topColorIdx, setTopColorIdx]       = useState(0);  // index of front layer
  const [backColorIdx, setBackColorIdx]     = useState(1);  // index of back layer
  const [topOpacity, setTopOpacity]         = useState(1);  // front layer fading out
  const bgmAudio  = useRef(null);
  const captureRef = useRef(null);
  const slotTimer  = useRef(null);
  const colorTimer = useRef(null);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Cycle intention messages
  useEffect(() => {
    if (screen !== "intention") return;
    const id = setInterval(() => setIntentionMsg(m => (m + 1) % INTENTION_MESSAGES.length), 2000);
    return () => clearInterval(id);
  }, [screen]);

  const desktop = winW > 600;

  function startBgm() {
    if (!BGM_URL || bgmOn) return;
    if (!bgmAudio.current) {
      const audio = new Audio(BGM_URL);
      audio.loop = true; audio.volume = 0.5;
      bgmAudio.current = audio;
    }
    bgmAudio.current.play().then(() => setBgmOn(true)).catch(() => {});
  }

  function toggleBgm() {
    if (!BGM_URL) return;
    if (!bgmAudio.current) {
      const audio = new Audio(BGM_URL);
      audio.loop = true; audio.volume = 0.5;
      bgmAudio.current = audio;
    }
    if (bgmOn) { bgmAudio.current.pause(); setBgmOn(false); }
    else { bgmAudio.current.play().then(() => setBgmOn(true)).catch(() => {}); }
  }

  function playCardFlip() {
    const audio = new Audio(FLIP_URL);
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }

  function handleInfoSubmit() {
    if (!clientName.trim()) { setNameError(true); return; }
    setNameError(false); startBgm(); setScreen("spreads");
  }

  function selectSpread(sp) {
    setSpread(sp); setClientQuestion(""); setScreen("question");
  }

  function handleQuestionSubmit() {
    setScreen("intention");
    setIntentionMsg(0);
  }

  function startColorCycle() {
    if (colorTimer.current) clearInterval(colorTimer.current);
    let opacity = 1;
    let front = 0;
    let back = 1;
    setTopColorIdx(front);
    setBackColorIdx(back);
    setTopOpacity(1);

    // Fade out front layer over 0.5s (step every 50ms)
    const FADE_DURATION = 500;
    const HOLD_DURATION = 100;
    const STEP = 50;
    const fadeStep = STEP / FADE_DURATION;
    let holding = false;
    let holdCount = 0;
    const holdSteps = HOLD_DURATION / STEP;

    colorTimer.current = setInterval(() => {
      if (holding) {
        holdCount++;
        if (holdCount >= holdSteps) {
          holding = false;
          holdCount = 0;
        }
        return;
      }
      opacity -= fadeStep;
      if (opacity <= 0) {
        opacity = 1;
        front = back;
        back = (back + 1) % PALETTE.length;
        setTopColorIdx(front);
        setBackColorIdx(back);
        setTopOpacity(1);
        holding = true;
      } else {
        setTopOpacity(opacity);
      }
    }, STEP);
  }

  function handleIntentionReady() {
    const deck = shuffle(CARD_IMAGES);
    setShuffledDeck(deck);
    setSlotPicked([]);
    setSlotIndex(0);
    setSlotCurrent(0);
    setTopColorIdx(0);
    setBackColorIdx(1);
    setTopOpacity(1);
    startColorCycle();
    setScreen("fan");
  }

  function pickFanCard(idx) {
    if (pickedIndices.includes(idx)) return;
    if (pickedIndices.length >= spread.cards.length) return;
    playCardFlip();
    const newPicked = [...pickedIndices, idx];
    setPickedIndices(newPicked);
    if (newPicked.length === spread.cards.length) {
      setTimeout(() => {
        setDrawnCards(newPicked.map(i => shuffledDeck[i]));
        setFlipped(new Array(spread.cards.length).fill(false));
        setScreen("draw");
      }, 600);
    }
  }

  function flipCard(i) {
    playCardFlip();
    setFlipped(prev => { const n = [...prev]; n[i] = true; return n; });
  }

  function flipAll() {
    flipped.forEach((f, i) => { if (!f) setTimeout(() => playCardFlip(), i * 120); });
    setFlipped(new Array(spread.cards.length).fill(true));
  }

  async function saveSpread() {
    if (!captureRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS: true, allowTaint: true,
        backgroundColor: "#0d0221", scale: 2, width: 480, windowWidth: 480,
      });
      const link = document.createElement("a");
      link.download = `${clientName.replace(/\s+/g, "_")}_tarot_reading.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      alert("Could not save image. Please take a screenshot instead.");
    }
    setSaving(false);
  }

  function getCardSize(cols, captureMode = false) {
    if (captureMode) {
      // Always fit within 480px for saved image
      return clamp(50, Math.floor((480 - 48) / cols) - 12, 120);
    }
    const maxW = Math.min(winW - 48, 1000);
    return clamp(70, Math.floor(maxW / cols) - 16, 180);
  }

  function renderGrid(captureMode = false) {
    const { cards, cols, rows } = spread;
    const size = getCardSize(cols, captureMode);
    const gap = captureMode ? 10 : 14;
    const cellW = size + gap;
    const cellH = Math.round(size * 1.6) + gap + 28;
    return (
      <div style={{ position: "relative", width: cols * cellW, height: rows * cellH, margin: "0 auto" }}>
        {cards.map((c, i) => (
          <div key={i} style={{ position: "absolute", left: c.x * cellW, top: c.y * cellH }}>
            <CardSlot label={c.label} img={drawnCards[i]} flipped={flipped[i]} onClick={() => !captureMode && flipCard(i)} cardBack={CARD_BACK} size={size} />
          </div>
        ))}
      </div>
    );
  }

  const bgStyle = {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    fontFamily: "'Georgia', serif", color: "#e8d5b7",
    padding: desktop ? "40px 60px" : "24px 16px",
    position: "relative", overflow: "hidden",
  };

  const maxW = desktop ? 600 : "100%";
  const resetHome = () => {
    if (slotTimer.current) { clearInterval(slotTimer.current); slotTimer.current = null; }
    if (colorTimer.current) { clearInterval(colorTimer.current); colorTimer.current = null; }
    setScreen("home"); setClientName(""); setClientDob(""); setClientQuestion("");
    setSlotPicked([]); setSlotCurrent(0); setPickedIndices([]);
  };

  const BgmBtn = () => BGM_URL ? (
    <button onClick={toggleBgm} style={{ ...btn(bgmOn ? "#1f3a1f" : "#2a1a40"), fontSize: 12 }}>
      {bgmOn ? "🔊 Music ON" : "🔇 Music OFF"}
    </button>
  ) : null;

  // ── HOME ──
  if (screen === "home") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, marginTop: desktop ? 120 : 60 }}>
        <div style={{ fontSize: desktop ? 40 : 26, color: "#c9a84c", letterSpacing: 3, marginBottom: 14 }}>✦ Coco's Cosmic Tarot ✦</div>
        <div style={{ fontSize: desktop ? 15 : 12, color: "#a07840", letterSpacing: 3, marginBottom: 52 }}>THE STARS ARE READY FOR YOU</div>
        <button onClick={() => { startBgm(); setScreen("info"); }}
          style={{ ...btn("#3b1f6e"), fontSize: desktop ? 18 : 15, padding: desktop ? "16px 52px" : "12px 32px", letterSpacing: 2 }}>
          Begin Your Reading
        </button>
      </div>
    </div>
  );

  // ── INFO ──
  if (screen === "info") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ width: "100%", maxWidth: maxW, position: "relative", zIndex: 1, marginTop: desktop ? 60 : 40 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: desktop ? 28 : 20, color: "#c9a84c", letterSpacing: 2, marginBottom: 8 }}>✦ Your Reading ✦</div>
          <div style={{ fontSize: 12, color: "#a07840", letterSpacing: 2 }}>TELL US A LITTLE ABOUT YOURSELF</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, color: "#a07840", letterSpacing: 2, display: "block", marginBottom: 6 }}>YOUR NAME *</label>
            <input style={{ ...inputStyle, fontSize: desktop ? 16 : 14, borderColor: nameError ? "#c94c4c" : "#7c5c2e" }}
              type="text" placeholder="Enter your name" value={clientName}
              onChange={(e) => { setClientName(e.target.value); setNameError(false); }} />
            {nameError && <div style={{ color: "#c94c4c", fontSize: 11, marginTop: 4 }}>Please enter your name to continue.</div>}
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#a07840", letterSpacing: 2, display: "block", marginBottom: 6 }}>DATE OF BIRTH</label>
            <input style={{ ...inputStyle, fontSize: desktop ? 16 : 14 }} type="date" value={clientDob} onChange={(e) => setClientDob(e.target.value)} />
          </div>
          <button onClick={handleInfoSubmit}
            style={{ ...btn("#3b1f6e"), fontSize: desktop ? 16 : 14, padding: "13px 0", width: "100%", letterSpacing: 2 }}>
            Choose My Spread →
          </button>
          <div style={{ textAlign: "center" }}><BgmBtn /></div>
          <button onClick={resetHome} style={{ ...btn("#2a1a1a"), fontSize: 12 }}>⌂ Home</button>
        </div>
      </div>
    </div>
  );

  // ── SPREADS ──
  if (screen === "spreads") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ textAlign: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: desktop ? 14 : 13, color: "#a07840", letterSpacing: 2, marginBottom: 6 }}>Welcome, {clientName}</div>
        <div style={{ fontSize: desktop ? 28 : 20, color: "#c9a84c", letterSpacing: 3, marginBottom: 8 }}>✦ Choose Your Spread ✦</div>
        <BgmBtn />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: maxW, position: "relative", zIndex: 1 }}>
        {SPREADS.map((sp) => (
          <button key={sp.id} onClick={() => selectSpread(sp)} style={{
            background: "#ffffff0d", border: "1px solid #7c5c2e", borderRadius: 12,
            padding: desktop ? "20px 28px" : "16px 20px",
            display: "flex", alignItems: "center", gap: 18,
            cursor: "pointer", color: "#e8d5b7", textAlign: "left", width: "100%",
          }}>
            <span style={{ fontSize: desktop ? 36 : 28, width: 44, textAlign: "center" }}>{sp.icon}</span>
            <div>
              <div style={{ fontWeight: "bold", fontSize: desktop ? 18 : 15 }}>{sp.name}</div>
              <div style={{ fontSize: desktop ? 13 : 12, color: "#a07840", marginTop: 3 }}>{sp.desc} · {sp.cards.length} cards</div>
            </div>
          </button>
        ))}
        <button onClick={() => setScreen("info")} style={{ ...btn("#2a1a1a"), fontSize: 12, marginTop: 4 }}>← Back</button>
        <button onClick={resetHome} style={{ ...btn("#2a1a1a"), fontSize: 12 }}>⌂ Home</button>
      </div>
    </div>
  );

  // ── QUESTION ──
  if (screen === "question") return (
    <div style={bgStyle}>
      <Stars />
      <div style={{ width: "100%", maxWidth: maxW, position: "relative", zIndex: 1, marginTop: desktop ? 60 : 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: "#a07840", letterSpacing: 2, marginBottom: 6 }}>{spread.name.toUpperCase()}</div>
          <div style={{ fontSize: desktop ? 28 : 20, color: "#c9a84c", letterSpacing: 2, marginBottom: 8 }}>✦ Set Your Intention ✦</div>
          <div style={{ fontSize: desktop ? 14 : 12, color: "#a07840", letterSpacing: 1 }}>What would you like the cards to guide you on?</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, color: "#a07840", letterSpacing: 2, display: "block", marginBottom: 6 }}>YOUR QUESTION OR INTENTION</label>
            <textarea
              style={{ ...inputStyle, minHeight: desktop ? 120 : 100, resize: "vertical", lineHeight: 1.7, fontSize: desktop ? 16 : 14 }}
              placeholder="e.g. What should I focus on in my career right now?"
              value={clientQuestion}
              onChange={(e) => setClientQuestion(e.target.value)}
            />
          </div>
          <button onClick={handleQuestionSubmit}
            style={{ ...btn("#3b1f6e"), fontSize: desktop ? 16 : 14, padding: "13px 0", width: "100%", letterSpacing: 2 }}>
            Continue →
          </button>
          <button onClick={() => setScreen("spreads")} style={{ ...btn("#2a1a1a"), fontSize: 12 }}>← Back</button>
          <button onClick={resetHome} style={{ ...btn("#2a1a1a"), fontSize: 12 }}>⌂ Home</button>
        </div>
      </div>
    </div>
  );

  // ── INTENTION (Option D) ──
  if (screen === "intention") return (
    <div style={{ ...bgStyle, justifyContent: "center" }}>
      <Stars />
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }
        @keyframes fade-msg {
          0% { opacity: 0; transform: translateY(8px); }
          20%, 80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
      `}</style>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        {/* Glowing orb */}
        <div style={{
          width: desktop ? 160 : 120, height: desktop ? 160 : 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, #c9a84c55 0%, #7c2d9e44 50%, transparent 70%)",
          border: "1px solid #c9a84c44",
          animation: "pulse-glow 3s ease-in-out infinite",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: desktop ? 52 : 40, color: "#c9a84c",
        }}>✦</div>

        {/* Cycling message */}
        <div key={intentionMsg} style={{
          fontSize: desktop ? 20 : 16, color: "#e8d5b7", letterSpacing: 2,
          fontStyle: "italic", animation: "fade-msg 2s ease-in-out",
          minHeight: 32,
        }}>
          {INTENTION_MESSAGES[intentionMsg]}
        </div>

        {clientQuestion && (
          <div style={{ fontSize: desktop ? 14 : 12, color: "#c9a84c88", fontStyle: "italic", maxWidth: 360, lineHeight: 1.7 }}>
            "{clientQuestion}"
          </div>
        )}

        <button onClick={handleIntentionReady}
          style={{ ...btn("#3b1f6e"), fontSize: desktop ? 16 : 14, padding: desktop ? "14px 48px" : "12px 32px", letterSpacing: 2, marginTop: 8 }}>
          I'm Ready · Draw My Cards
        </button>
        <button onClick={resetHome} style={{ ...btn("#2a1a1a"), fontSize: 12 }}>⌂ Home</button>
      </div>
    </div>
  );

  // ── SLOT MACHINE DRAW ──
  if (screen === "fan") {
    const needed = spread.cards.length;
    const picked = slotPicked.length;
    const isComplete = picked >= needed;
    const cardW = desktop ? 160 : 120;
    const cardH = Math.round(cardW * 1.6);

    function stopCard() {
      if (isComplete) return;
      playCardFlip();
      if (slotTimer.current) { clearInterval(slotTimer.current); slotTimer.current = null; }
      const chosenImg = shuffledDeck[slotCurrent % shuffledDeck.length];
      const newPicked = [...slotPicked, chosenImg];
      setSlotPicked(newPicked);
      if (newPicked.length >= needed) {
        setTimeout(() => {
          setDrawnCards(newPicked);
          setFlipped(new Array(needed).fill(false));
          setScreen("draw");
        }, 800);
      } else {
        setTimeout(() => {
          setSlotIndex(newPicked.length);
          if (slotTimer.current) clearInterval(slotTimer.current);
          slotTimer.current = setInterval(() => setSlotCurrent(c => c + 1), 80);
        }, 500);
      }
    }

    if (!slotTimer.current && !isComplete) {
      slotTimer.current = setInterval(() => setSlotCurrent(c => c + 1), 80);
    }

    return (
      <div style={{ ...bgStyle, justifyContent: "center" }}>
        <Stars />
        <style>{`
          @keyframes card-lock { 0%{transform:scale(1.15);} 100%{transform:scale(1);} }
        `}</style>

        {/* Header */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1, marginBottom: 24 }}>
          <div style={{ fontSize: desktop ? 14 : 12, color: "#a07840", letterSpacing: 2, marginBottom: 6 }}>
            {spread.name.toUpperCase()}
          </div>
          <div style={{ fontSize: desktop ? 22 : 18, color: "#c9a84c", letterSpacing: 2, marginBottom: 4 }}>
            {isComplete ? "Your cards are ready..." : `Card ${picked + 1} of ${needed}`}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 8 }}>
            {Array.from({ length: needed }).map((_, i) => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: i < picked ? "#c9a84c" : i === picked ? "#c9a84c66" : "#ffffff22",
                border: `1px solid ${i <= picked ? "#c9a84c" : "#c9a84c33"}`,
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>

        {/* Flashing card */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 32 }}>
          <div
            onClick={!isComplete ? stopCard : undefined}
            style={{
              width: cardW, height: cardH, borderRadius: 12, overflow: "hidden",
              border: `2px solid ${isComplete ? "#c9a84c" : "#7c5c2e"}`,
              boxShadow: isComplete ? "0 0 24px #c9a84c88" : "0 8px 32px #0009",
              animation: isComplete ? "card-lock 0.4s ease-out" : "none",
              cursor: isComplete ? "default" : "pointer",
            }}
          >
            {CARD_BACK
              ? <img src={CARD_BACK} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="card" />
              : <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  {/* Back layer — always opacity 1, next colour ready */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, ${PALETTE[backColorIdx][0]}, ${PALETTE[backColorIdx][1]})`,
                  }} />
                  {/* Front layer — fades out slowly */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, ${PALETTE[topColorIdx][0]}, ${PALETTE[topColorIdx][1]})`,
                    opacity: topOpacity,
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 56, color: "#ffffff22", zIndex: 10,
                  }}>✦</div>
                </div>
            }
          </div>
        </div>

        {/* Locked cards row */}
        {picked > 0 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 24, zIndex: 1, position: "relative" }}>
            {slotPicked.map((img, i) => (
              <div key={i} style={{
                width: desktop ? 60 : 46, height: Math.round((desktop ? 60 : 46) * 1.6),
                borderRadius: 6, overflow: "hidden",
                border: "2px solid #c9a84c",
                boxShadow: "0 0 10px #c9a84c44",
              }}>
                {img
                  ? <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={`card ${i + 1}`} />
                  : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a0545,#2d0b6b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#c9a84c" }}>✦</div>
                }
              </div>
            ))}
          </div>
        )}

        {/* Stop button */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          {!isComplete && (
            <>
              <div style={{ fontSize: 12, color: "#7a5a3a", marginBottom: 4 }}>
                Focus on your question · tap when you feel it
              </div>
              <button onClick={stopCard} style={{
                ...btn("#7c1f1f"),
                fontSize: desktop ? 20 : 17,
                padding: desktop ? "16px 60px" : "14px 44px",
                letterSpacing: 3,
                border: "2px solid #c94c4c",
                animation: "slot-flash 1.2s ease-in-out infinite",
              }}>
                ✦ Select
              </button>
            </>
          )}
          <button onClick={resetHome} style={{ ...btn("#2a1a1a"), fontSize: 12, marginTop: 8 }}>⌂ Home</button>
        </div>
      </div>
    );
  }

  // ── DRAW ──
  return (
    <div style={bgStyle}>
      <Stars />

      {/* Hidden capture div — always 480px wide for consistent saved image */}
      <div ref={captureRef} style={{
        position: "fixed", left: -9999, top: 0,
        background: "linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
        padding: "24px 16px 28px", width: 480,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ fontSize: 13, color: "#c9a84c", letterSpacing: 3, marginBottom: 10 }}>✦ Coco's Cosmic Tarot ✦</div>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2, marginBottom: 2 }}>READING FOR</div>
          <div style={{ fontSize: 18, color: "#c9a84c", letterSpacing: 2, marginBottom: 2 }}>{clientName}</div>
          {clientDob && (
            <div style={{ fontSize: 11, color: "#a07840", letterSpacing: 1, marginBottom: 4 }}>
              {new Date(clientDob + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          )}
          {clientQuestion && (
            <div style={{ fontSize: 12, color: "#c9a84c99", fontStyle: "italic", maxWidth: 440, margin: "4px auto 8px", lineHeight: 1.6 }}>
              "{clientQuestion}"
            </div>
          )}
          <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2, marginTop: 4, marginBottom: 2 }}>{spread.desc.toUpperCase()}</div>
          <div style={{ fontSize: 15, color: "#c9a84c", letterSpacing: 2 }}>{spread.name}</div>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {renderGrid(true)}
        </div>
      </div>

      {/* Visible display area */}
      <div style={{
        width: "100%", maxWidth: desktop ? 900 : "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ fontSize: 13, color: "#c9a84c", letterSpacing: 3, marginBottom: 10 }}>✦ Coco's Cosmic Tarot ✦</div>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2, marginBottom: 2 }}>READING FOR</div>
          <div style={{ fontSize: desktop ? 26 : 18, color: "#c9a84c", letterSpacing: 2, marginBottom: 2 }}>{clientName}</div>
          {clientDob && (
            <div style={{ fontSize: desktop ? 13 : 11, color: "#a07840", letterSpacing: 1, marginBottom: 4 }}>
              {new Date(clientDob + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          )}
          {clientQuestion && (
            <div style={{ fontSize: desktop ? 14 : 12, color: "#c9a84c99", fontStyle: "italic", maxWidth: maxW, margin: "4px auto 8px", lineHeight: 1.6 }}>
              "{clientQuestion}"
            </div>
          )}
          <div style={{ fontSize: 11, color: "#7a5a3a", letterSpacing: 2, marginTop: 4, marginBottom: 2 }}>{spread.desc.toUpperCase()}</div>
          <div style={{ fontSize: desktop ? 20 : 15, color: "#c9a84c", letterSpacing: 2 }}>{spread.name}</div>
        </div>
        <div style={{ overflowX: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
          {renderGrid(false)}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1, marginTop: 20 }}>
        {flipped.some((f) => !f) && <button onClick={flipAll} style={btn("#3b1f6e")}>Reveal All</button>}
        {flipped.every((f) => f) && (
          <button onClick={saveSpread} style={btn("#5a2e0e")} disabled={saving}>
            {saving ? "Saving..." : "📸 Save My Spread"}
          </button>
        )}
        <button onClick={() => { handleIntentionReady(); }} style={btn("#1f3a1f")}>Draw Again</button>
        <button onClick={() => setScreen("spreads")} style={btn("#2a1a2a")}>← Spreads</button>
        <button onClick={resetHome} style={btn("#2a1a1a")}>⌂ Home</button>
        <BgmBtn />
      </div>

      {flipped.every((f) => !f) && (
        <div style={{ marginTop: 20, fontSize: 12, color: "#7a5a3a", position: "relative", zIndex: 1 }}>
          Tap a card to reveal it
        </div>
      )}
    </div>
  );
}
