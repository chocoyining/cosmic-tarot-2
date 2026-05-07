import { useState, useRef, useEffect } from "react";

const EMAILJS_SERVICE_ID  = "service_fcfjy1t";
const EMAILJS_TEMPLATE_ID = "template_lpj8t7s";
const EMAILJS_PUBLIC_KEY  = "sy_V-u-yyGBno659d";
const CLOUDINARY_CLOUD    = "da1asg0hq";
const CLOUDINARY_PRESET   = "coco_readings";

const ORACLE_CARDS = [
  {
    id: 1,
    en: "The Rose Path",
    zh: "玫瑰之路",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120147/The_Rose_Path_lodtay.png",
    meaning_en: "Love, attraction, self-worth, relationship growth",
    meaning_zh: "爱、吸引、自我价值、关系成长",
    message_en: "You will be loved for who you are.",
    message_zh: "你会因为真实的自己而被爱。",
  },
  {
    id: 2,
    en: "The Lotus Moon",
    zh: "莲月",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120147/The_Lotus_Moon_j8pnol.png",
    meaning_en: "Healing, intuition, emotional cleansing, spiritual stillness",
    meaning_zh: "疗愈、直觉、情绪净化、灵魂沉淀",
    message_en: "You will find peace in the quiet moments, the power to heal is within yourself.",
    message_zh: "你会在安静之中找到平静，而疗愈的力量一直都在你心里。",
  },
  {
    id: 3,
    en: "The Sunflower Keeper",
    zh: "向日葵守望者",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120147/The_Sunflower_Keeper_h28hqz.png",
    meaning_en: "Abundance, confidence, vitality, inner light",
    meaning_zh: "好运、丰盛、自信、生命力",
    message_en: "You will bloom with warmth and confidence, under the sunshine that you carry on your own.",
    message_zh: "你会带着温暖与自信盛放，而你本身就是自己的阳光。",
  },
  {
    id: 4,
    en: "The Wisteria Veil",
    zh: "紫藤之幕",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120148/The_Wisteria_Veil_zuqllw.png",
    meaning_en: "Destiny, soul connection, emotional pull",
    meaning_zh: "命运感、灵魂连接、深层牵引",
    message_en: "You will recognize the souls that are truly meant for you.",
    message_zh: "你会认出那些真正属于你灵魂频率的人。",
  },
  {
    id: 5,
    en: "The Lily Letter",
    zh: "百合来信",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120146/The_Lily_Letter_ph0dhg.png",
    meaning_en: "New messages, hope, gentle beginnings",
    meaning_zh: "新讯息、希望、温柔靠近、新篇章",
    message_en: "You will receive the message your heart has been waiting for.",
    message_zh: "你会收到内心一直等待着的答案。",
  },
  {
    id: 6,
    en: "The Camellia Heart",
    zh: "山茶之心",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120146/The_Camellia_Heart_zertwb.png",
    meaning_en: "Devotion, loyalty, enduring love",
    meaning_zh: "克制的深爱、忠诚、长久陪伴",
    message_en: "You will be loved in ways that feel calm, steady, and true.",
    message_zh: "你会被一种平静、坚定而真实的方式深爱着。",
  },
  {
    id: 7,
    en: "The Tulip Promise",
    zh: "郁金香之约",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120148/The_Tulip_Promise_ineyhp.png",
    meaning_en: "Mutual love, sincerity, being cherished",
    meaning_zh: "双向奔赴、真诚、被珍惜",
    message_en: "You will be chosen with sincerity and conviction.",
    message_zh: "你会被坚定而真诚地选择。",
  },
  {
    id: 8,
    en: "The Daisy Whisper",
    zh: "雏菊低语",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778122106/The_Daisy_Whisper_heskdc.png",
    meaning_en: "Joy, innocence, simple happiness",
    meaning_zh: "纯粹快乐、日常幸福、童心",
    message_en: "You will rediscover joy in the simplest moments of life.",
    message_zh: "你会重新在生活最简单的时刻里感受到快乐。",
  },
  {
    id: 9,
    en: "The Midnight Peony",
    zh: "夜牡丹",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120147/The_Midnight_Peony_pptqxp.png",
    meaning_en: "Mystery, feminine power, magnetic attraction",
    meaning_zh: "神秘魅力、女性力量、高级吸引力",
    message_en: "You will become impossible to ignore without asking for attention.",
    message_zh: "你无需刻意吸引目光，也会令人无法忽视。",
  },
  {
    id: 10,
    en: "The Lavender Breeze",
    zh: "薰衣草微风",
    image: "https://res.cloudinary.com/da1asg0hq/image/upload/v1778120146/The_Lavender_Breeze_aysw8i.png",
    meaning_en: "Rest, softness, emotional relief, inner peace",
    meaning_zh: "放松、睡眠、释压、内在平静",
    message_en: "You will be lifted from the heaviness and showered by joy.",
    message_zh: "你会从沉重中被轻轻托起，并再次被喜悦包围。",
  },
];

const PALETTE = [
  ["#655D8A","#9B8FBF"],["#9B8FBF","#C8BDEA"],["#7897AB","#5A7A8E"],
  ["#2E5A6B","#1A3D50"],["#D885A3","#C87090"],["#B85A78","#7B2040"],
  ["#FDCEB9","#F0A07A"],["#E8845A","#C85A3A"],
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Stars = () => (
  <svg style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} xmlns="http://www.w3.org/2000/svg">
    {Array.from({length:60},(_,i)=>(
      <circle key={i} cx={`${(i*37.7)%100}%`} cy={`${(i*23.3)%100}%`} r={i%5===0?1.5:1} fill="#fff" opacity={0.3+(i%5)*0.1}/>
    ))}
  </svg>
);

function btn(bg, extra={}) {
  return {
    background: bg, border: "1px solid #7c5c2e", borderRadius: 8,
    color: "#e8d5b7", padding: "12px 0", fontSize: 14, cursor: "pointer",
    letterSpacing: 1, fontFamily: "'Georgia', serif", width: "100%", ...extra,
  };
}

export default function OracleCard({ onHome, lang, onToggleLang, bgmOn, onToggleBgm }) {
  const desktop = window.innerWidth > 600;
  const isCN = lang === "zh";

  const [screen, setScreen]           = useState("draw"); // draw | reveal
  const [deck, setDeck]               = useState(() => shuffle(ORACLE_CARDS));
  const [slotIdx, setSlotIdx]         = useState(0);
  const [topColorIdx, setTopColorIdx] = useState(0);
  const [backColorIdx, setBackColorIdx] = useState(1);
  const [topOpacity, setTopOpacity]   = useState(1);
  const [drawnCard, setDrawnCard]     = useState(null);
  const [flipped, setFlipped]         = useState(false);
  const [saving, setSaving]           = useState(false);
  const [toast, setToast]             = useState(false);

  const slotTimer  = useRef(null);
  const colorTimer = useRef(null);
  const captureRef = useRef(null);

  const FLIP_URL = "https://res.cloudinary.com/da1asg0hq/video/upload/v1775905865/freesound_community-flipcard-91468_oiatib.mp3";

  function playFlip() {
    const a = new Audio(FLIP_URL); a.volume = 0.8; a.play().catch(()=>{});
  }

  // Start colour cycle on mount
  useEffect(() => {
    startColorCycle();
    slotTimer.current = setInterval(() => setSlotIdx(i => i + 1), 80);
    return () => {
      if (colorTimer.current) clearInterval(colorTimer.current);
      if (slotTimer.current)  clearInterval(slotTimer.current);
    };
  }, []);

  function startColorCycle() {
    if (colorTimer.current) clearInterval(colorTimer.current);
    let opacity = 1, front = 0, back = 1, holding = false, holdCount = 0;
    const STEP = 50, fadeStep = STEP / 500, holdSteps = 100 / STEP;
    setTopColorIdx(front); setBackColorIdx(back); setTopOpacity(1);
    colorTimer.current = setInterval(() => {
      if (holding) { holdCount++; if (holdCount >= holdSteps) { holding = false; holdCount = 0; } return; }
      opacity -= fadeStep;
      if (opacity <= 0) {
        opacity = 1; front = back; back = (back + 1) % PALETTE.length;
        setTopColorIdx(front); setBackColorIdx(back); setTopOpacity(1); holding = true;
      } else { setTopOpacity(opacity); }
    }, STEP);
  }

  function selectCard() {
    if (slotTimer.current)  { clearInterval(slotTimer.current);  slotTimer.current  = null; }
    if (colorTimer.current) { clearInterval(colorTimer.current); colorTimer.current = null; }
    const picked = deck[slotIdx % deck.length];
    setDrawnCard(picked);
    setFlipped(false);
    setScreen("reveal");
  }

  function flipCard() {
    playFlip();
    setFlipped(true);
  }

  function drawAgain() {
    setDeck(shuffle(ORACLE_CARDS));
    setSlotIdx(0);
    setFlipped(false);
    setDrawnCard(null);
    setScreen("draw");
    startColorCycle();
    slotTimer.current = setInterval(() => setSlotIdx(i => i + 1), 80);
  }

  async function saveCard() {
    if (!captureRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS: true, allowTaint: true, backgroundColor: "#0d0221", scale: 2, width: 480, windowWidth: 480,
      });
      const filename = `coco_oracle_${drawnCard.en.replace(/\s+/g,"_")}.jpg`;
      const jpgData  = canvas.toDataURL("image/jpeg", 0.92);
      const isMobile = navigator.maxTouchPoints > 0 && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobile && navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(jpgData)).blob();
          const file = new File([blob], filename, { type: "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: drawnCard.en });
            setSaving(false); showToast(); return;
          }
        } catch(e) {}
      }
      const link = document.createElement("a");
      link.download = filename; link.href = jpgData; link.click();
      showToast();
    } catch(e) { alert("Could not save. Please take a screenshot instead."); }
    setSaving(false);
  }

  async function sendToCoco() {
    if (!captureRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS: true, allowTaint: true, backgroundColor: "#0d0221", scale: 2, width: 480, windowWidth: 480,
      });
      const filename = `coco_oracle_${drawnCard.en.replace(/\s+/g,"_")}.jpg`;
      const jpgData  = canvas.toDataURL("image/jpeg", 0.92);

      let imageUrl = "Image upload failed";
      try {
        const blob = await (await fetch(jpgData)).blob();
        const fd   = new FormData();
        fd.append("file", blob, filename); fd.append("upload_preset", CLOUDINARY_PRESET);
        const r    = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, { method: "POST", body: fd });
        const d    = await r.json();
        imageUrl   = d.secure_url || `Upload error: ${JSON.stringify(d.error || d)}`;
      } catch(e) { imageUrl = `Upload exception: ${e.message}`; }

      if (window.emailjs) {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          client_name:     "Oracle Draw",
          client_dob:      "Not provided",
          client_contact:  "Not provided",
          spread_name:     `Floriography Oracle — ${drawnCard.en}`,
          client_question: isCN ? drawnCard.message_zh : drawnCard.message_en,
          sent_at:         new Date().toLocaleString("en-GB"),
          spread_image:    imageUrl,
        });
      }

      const isMobile = navigator.maxTouchPoints > 0 && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobile && navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(jpgData)).blob();
          const file = new File([blob], filename, { type: "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: drawnCard.en });
            setSaving(false); showToast(); return;
          }
        } catch(e) {}
      }
      const link = document.createElement("a");
      link.download = filename; link.href = jpgData; link.click();
      showToast();
    } catch(e) { alert("Something went wrong. Please try again."); }
    setSaving(false);
  }

  function showToast() { setToast(true); setTimeout(() => setToast(false), 5000); }

  const bgStyle = {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    fontFamily: isCN ? "'Noto Serif SC','Georgia',serif" : "'Georgia',serif",
    color: "#e8d5b7", padding: desktop ? "40px 60px" : "32px 16px",
    position: "relative", overflow: "hidden",
  };

  const cardW = desktop ? 220 : 180;
  const cardH = Math.round(cardW * 1.5);

  // ── DRAW SCREEN ──────────────────────────────────────────────────────────────
  if (screen === "draw") return (
    <div style={bgStyle}>
      <Stars/>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes float-card { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:28,width:"100%",maxWidth:480}}>

        {/* Header */}
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:10,color:"#a07840",letterSpacing:4,marginBottom:8}}>
            {isCN ? "✦ 花语神谕 ✦" : "✦ FLORIOGRAPHY ORACLE ✦"}
          </div>
          <div style={{fontSize:desktop?26:22,color:"#c9a84c",letterSpacing:2,fontFamily:"'IM Fell English',serif"}}>
            {isCN ? "Coco 的花语神谕" : "Coco's Floriography Oracle"}
          </div>
          <div style={{fontSize:12,color:"#a07840",marginTop:8,lineHeight:1.7,maxWidth:340}}>
            {isCN
              ? "深呼吸，将你心中所想轻轻放下，让花为你传递宇宙的讯息。"
              : "Take a breath, clear your mind, and let the flowers carry a message from the universe to you."}
          </div>
        </div>

        {/* Flashing card */}
        <div style={{position:"relative"}}>
          {/* Glow ring */}
          <div style={{
            position:"absolute", inset:-12, borderRadius:16,
            background:"radial-gradient(circle,#c9a84c22 0%,transparent 70%)",
            animation:"pulse-glow 2.5s ease-in-out infinite",
            pointerEvents:"none",
          }}/>
          <div
            onClick={selectCard}
            style={{
              width:cardW, height:cardH, borderRadius:14, overflow:"hidden",
              border:"2px solid #7c5c2e", cursor:"pointer",
              boxShadow:"0 8px 40px #0009",
              animation:"float-card 3s ease-in-out infinite",
              position:"relative",
            }}
          >
            {/* Card back image */}
            <img src="https://res.cloudinary.com/da1asg0hq/image/upload/v1778122835/ChatGPT_Image_May_7_2026_11_00_23_AM_dpsaxb.png" alt="card back" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <div style={{fontSize:11,color:"#7a5a3a",letterSpacing:1}}>
            {isCN ? "专注于你的心，感受后点击" : "Focus on your heart · tap when you feel ready"}
          </div>
          <button onClick={selectCard} style={{
            ...btn("#3b1f6e"), width:"auto", padding:"12px 40px",
            fontSize:14, letterSpacing:2, border:"1px solid #c9a84c",
          }}>
            {isCN ? "✦ 抽取我的花语" : "✦ Draw My Card"}
          </button>
        </div>

        {/* Nav */}
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={onHome} style={{...btn("#2a1a1a"),width:"auto",padding:"8px 20px",fontSize:12}}>
            {isCN ? "⌂ 主页" : "⌂ Home"}
          </button>
          {onToggleLang && (
            <button onClick={onToggleLang} style={{...btn("#2a1a40"),width:"auto",padding:"8px 16px",fontSize:12}}>
              {lang==="en" ? "中文" : "EN"}
            </button>
          )}
          {onToggleBgm && (
            <button onClick={onToggleBgm} style={{...btn(bgmOn?"#1f3a1f":"#2a1a40"),width:"auto",padding:"8px 16px",fontSize:12}}>
              {bgmOn ? "🔊" : "🔇"}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── REVEAL SCREEN ─────────────────────────────────────────────────────────────
  return (
    <div style={bgStyle}>
      <Stars/>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes messageGlow { 0%,100%{text-shadow:0 0 20px #c9a84c33} 50%{text-shadow:0 0 40px #c9a84c88} }
      `}</style>

      {/* Hidden capture div */}
      <div ref={captureRef} style={{
        position:"fixed", left:-9999, top:0,
        background:"linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
        padding:"32px 24px 36px", width:480,
        display:"flex", flexDirection:"column", alignItems:"center", gap:16,
      }}>
        <div style={{fontSize:12,color:"#c9a84c",letterSpacing:3}}>✦ Coco's Floriography Oracle ✦</div>
        {drawnCard && (
          <>
            <img src={drawnCard.image} alt={drawnCard.en} style={{width:200,height:Math.round(200*1.5),objectFit:"cover",borderRadius:12,border:"2px solid #c9a84c88",boxShadow:"0 8px 32px #0008"}}/>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:18,color:"#c9a84c",letterSpacing:2,marginBottom:4,fontFamily:"'Georgia',serif"}}>
                {isCN ? drawnCard.zh : drawnCard.en}
              </div>
              <div style={{fontSize:11,color:"#a07840",marginBottom:16,letterSpacing:1}}>
                {isCN ? drawnCard.meaning_zh : drawnCard.meaning_en}
              </div>
              <div style={{fontSize:14,color:"#e8d5b7",fontStyle:"italic",lineHeight:1.8,maxWidth:380,margin:"0 auto",padding:"0 8px"}}>
                "{isCN ? drawnCard.message_zh : drawnCard.message_en}"
              </div>
            </div>
          </>
        )}
      </div>

      {/* Visible content */}
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:desktop?24:18,width:"100%",maxWidth:480}}>

        {/* Header */}
        <div style={{textAlign:"center",animation:"fadeInUp 0.5s ease-out"}}>
          <div style={{fontSize:10,color:"#a07840",letterSpacing:4,marginBottom:6}}>
            {isCN ? "✦ 花语神谕 ✦" : "✦ FLORIOGRAPHY ORACLE ✦"}
          </div>
          <div style={{fontSize:desktop?22:18,color:"#c9a84c",letterSpacing:2}}>
            {isCN ? "你的花语" : "Your Card"}
          </div>
        </div>

        {/* Card flip */}
        <div style={{perspective:1000}}>
          <div
            onClick={!flipped ? flipCard : undefined}
            style={{
              width:cardW, height:cardH,
              position:"relative", transformStyle:"preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition:"transform 0.7s cubic-bezier(.4,0,.2,1)",
              cursor: flipped ? "default" : "pointer",
            }}
          >
            {/* Back face */}
            <div style={{
              position:"absolute", inset:0, backfaceVisibility:"hidden",
              borderRadius:14, overflow:"hidden",
              border:"2px solid #7c5c2e", boxShadow:"0 8px 40px #0009",
            }}>
              <img src="https://res.cloudinary.com/da1asg0hq/image/upload/v1778122835/ChatGPT_Image_May_7_2026_11_00_23_AM_dpsaxb.png" alt="card back" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            {/* Front face */}
            <div style={{
              position:"absolute", inset:0, backfaceVisibility:"hidden",
              transform:"rotateY(180deg)", borderRadius:14, overflow:"hidden",
              border:"2px solid #c9a84c", boxShadow:"0 0 32px #c9a84c44, 0 8px 40px #0009",
            }}>
              {drawnCard && <img src={drawnCard.image} alt={drawnCard.en} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
            </div>
          </div>
        </div>

        {/* Card info + message — shows after flip */}
        {flipped && drawnCard && (
          <div style={{textAlign:"center",animation:"fadeInUp 0.6s ease-out",width:"100%"}}>
            {/* Card name */}
            <div style={{fontSize:desktop?22:19,color:"#c9a84c",letterSpacing:2,marginBottom:4,fontFamily:"'IM Fell English',serif"}}>
              {isCN ? drawnCard.zh : drawnCard.en}
            </div>
            {/* Flower meaning */}
            <div style={{fontSize:11,color:"#a07840",letterSpacing:1,marginBottom:desktop?20:16}}>
              {isCN ? drawnCard.meaning_zh : drawnCard.meaning_en}
            </div>
            {/* Divider */}
            <div style={{width:60,height:1,background:"#c9a84c44",margin:"0 auto 16px"}}/>
            {/* Oracle message */}
            <div style={{
              fontSize:desktop?17:15, color:"#e8d5b7", fontStyle:"italic",
              lineHeight:1.9, maxWidth:380, margin:"0 auto",
              animation:"messageGlow 3s ease-in-out infinite",
              padding:"0 8px",
            }}>
              "{isCN ? drawnCard.message_zh : drawnCard.message_en}"
            </div>
          </div>
        )}

        {/* Hint before flip */}
        {!flipped && (
          <div style={{fontSize:12,color:"#7a5a3a",letterSpacing:1,animation:"fadeInUp 0.5s ease-out"}}>
            {isCN ? "点击牌面，揭示你的花语" : "Tap the card to reveal your message"}
          </div>
        )}

        {/* Action buttons — show after flip */}
        {flipped && (
          <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",animation:"fadeInUp 0.7s ease-out"}}>
            <button onClick={sendToCoco} style={btn("#5a0e3a")} disabled={saving}>
              {saving ? (isCN?"发送中...":"Sending...") : (isCN?"✦ 发送给 Coco":"✦ Send to Coco")}
            </button>
            <button onClick={saveCard} style={btn("#5a2e0e")} disabled={saving}>
              {saving ? (isCN?"保存中...":"Saving...") : (isCN?"📸 保存我的花语卡":"📸 Save My Card")}
            </button>
            <button onClick={drawAgain} style={btn("#1f3a1f")}>
              {isCN ? "🌸 再抽一张" : "🌸 Draw Again"}
            </button>
            <div style={{display:"flex",gap:8}}>
              <button onClick={onHome} style={{...btn("#2a1a1a"),flex:1,fontSize:12}}>
                {isCN ? "⌂ 主页" : "⌂ Home"}
              </button>
              {onToggleLang && (
                <button onClick={onToggleLang} style={{...btn("#2a1a40"),flex:1,fontSize:12}}>
                  {lang==="en" ? "中文" : "EN"}
                </button>
              )}
              {onToggleBgm && (
                <button onClick={onToggleBgm} style={{...btn(bgmOn?"#1f3a1f":"#2a1a40"),flex:1,fontSize:12}}>
                  {bgmOn ? "🔊" : "🔇"}
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Toast */}
      <style>{`
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes toastOut{from{opacity:1}to{opacity:0}}
      `}</style>
      {toast && (
        <div style={{position:"fixed",bottom:40,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#2d0b6b,#1a0545)",border:"1px solid #c9a84c88",borderRadius:32,padding:"12px 24px",fontSize:13,color:"#c9a84c",letterSpacing:0.5,textAlign:"center",zIndex:999,boxShadow:"0 4px 24px #0009",animation:"toastIn 0.4s ease-out, toastOut 0.6s ease-in 4.3s forwards",whiteSpace:"nowrap"}}>
          {isCN ? "✦ 已成功发送给 Coco！" : "✦ Successfully sent to Coco!"}
        </div>
      )}
    </div>
  );
}
