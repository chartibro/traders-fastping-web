import { useState, useEffect, useRef } from "react";

const EXCHANGES = [
  { name: "Binance", rank: 1 }, { name: "Coinbase", rank: 2 }, { name: "Upbit", rank: 3 },
  { name: "OKX", rank: 4 }, { name: "Bybit", rank: 5 }, { name: "Bitget", rank: 6 },
  { name: "Gate.io", rank: 7 }, { name: "KuCoin", rank: 8 }, { name: "MEXC", rank: 9 },
  { name: "HTX", rank: 10 }, { name: "Crypto.com", rank: 11 }, { name: "Bitfinex", rank: 12 },
  { name: "BingX", rank: 13 }, { name: "Kraken", rank: 14 }, { name: "Binance TR", rank: 15 },
  { name: "BitMart", rank: 16 }, { name: "LBank", rank: 17 }, { name: "Bitstamp", rank: 18 },
  { name: "Bithumb", rank: 19 }, { name: "XT.COM", rank: 20 }, { name: "Tokocrypto", rank: 21 },
  { name: "bitFlyer", rank: 22 }, { name: "Binance.US", rank: 23 }, { name: "Gemini", rank: 24 },
  { name: "Toobit", rank: 25 }, { name: "BTCC", rank: 26 }, { name: "Pionex", rank: 27 },
  { name: "Biconomy", rank: 28 }, { name: "KCEX", rank: 29 }, { name: "CoinW", rank: 30 },
  { name: "Deepcoin", rank: 31 }, { name: "WEEX", rank: 32 }, { name: "DigiFinex", rank: 33 },
  { name: "Binance TH", rank: 34 }, { name: "CoinEx", rank: 35 }, { name: "Zoomex", rank: 36 },
  { name: "BVOX", rank: 37 }, { name: "Bitunix", rank: 38 }, { name: "Poloniex", rank: 39 },
  { name: "Ourbit", rank: 40 }, { name: "Hibt", rank: 41 }, { name: "BiFinance", rank: 42 },
  { name: "OrangeX", rank: 43 }, { name: "CoinUp", rank: 44 }, { name: "FameEX", rank: 45 },
  { name: "Echobit", rank: 46 }, { name: "Bitvavo", rank: 47 }, { name: "Azbit", rank: 48 },
  { name: "Coincheck", rank: 49 }, { name: "Phemex", rank: 50 }, { name: "Tapbit", rank: 51 },
  { name: "WhiteBIT", rank: 52 }, { name: "UZX", rank: 53 }, { name: "Coinstore", rank: 54 },
  { name: "HashKey Global", rank: 55 }, { name: "Zaif", rank: 56 }, { name: "BitbabyExchange", rank: 57 },
  { name: "P2B", rank: 58 }, { name: "LATOKEN", rank: 59 }, { name: "YUBIT", rank: 60 },
  { name: "BTDUex", rank: 61 }, { name: "Bitrue", rank: 62 }, { name: "Coinone", rank: 63 },
  { name: "Bitso", rank: 64 }, { name: "Dex-Trade", rank: 65 }, { name: "AscendEX", rank: 66 },
  { name: "BigONE", rank: 67 }, { name: "Bitbank", rank: 68 }, { name: "BTSE", rank: 69 },
  { name: "Luno", rank: 70 }, { name: "Hotcoin", rank: 71 }, { name: "BitMEX", rank: 72 },
  { name: "Backpack", rank: 73 }, { name: "HashKey", rank: 74 }, { name: "BtcTurk", rank: 75 },
  { name: "C-Patex", rank: 76 }, { name: "Fastex", rank: 77 }, { name: "PointPay", rank: 78 },
  { name: "VOOX", rank: 79 }, { name: "BitradeX", rank: 80 }, { name: "EXMO", rank: 81 },
  { name: "Bit2Me", rank: 82 }, { name: "Korbit", rank: 83 }, { name: "Coinone Pro", rank: 84 },
  { name: "ProBit", rank: 85 }, { name: "GOPAX", rank: 86 }, { name: "Flybit", rank: 87 },
];

const TOP_COLORS = {
  "Binance": "#F3BA2F", "Coinbase": "#0052FF", "Upbit": "#093687",
  "OKX": "#CCCCCC", "Bybit": "#F7A600", "Bitget": "#00F0FF",
  "Gate.io": "#2354E6", "KuCoin": "#23AF91", "MEXC": "#00B897",
  "HTX": "#4589FF", "Crypto.com": "#1199FA", "BingX": "#2B6AFF",
  "Kraken": "#5741D9", "BitMart": "#00B2FF", "Bithumb": "#F37321",
};

const FEATURES = [
  { icon: "⚡", title: "패스트핑 속도 부스터", desc: "불필요한 요소 및 호가창 렌더링 최적화로 반응속도를 개선합니다. DNS 프리페치·프리커넥트로 124개 사이트를 부스트.", tag: "FASTPING", accent: "#F7A600" },
  { icon: "🌐", title: "트레이딩 전문 번역", desc: "전문 금융 용어에 최적화된 한국어 번역을 제공합니다. 4,800+ 전문 사전과 구글 번역 AI의 하이브리드 엔진으로 오역 없는 트레이딩.", tag: "TRANSLATE", accent: "#F7A600" },
  { icon: "🔒", title: "완전한 프라이버시", desc: "사용자 데이터를 수집·저장·전송하지 않습니다. 로그인 불필요, 모든 번역 사전이 로컬에 내장되어 있으며, 설정값(ON/OFF)만 Chrome Storage에 저장됩니다.", tag: "PRIVACY", accent: "#00E676" },
];

const STATS = [
  { value: "4887", label: "번역 사전 항목", suffix: "+" },
  { value: "87", label: "지원 거래소", suffix: "개" },
  { value: "124", label: "속도최적화 사이트", suffix: "개" },
  { value: "24/7", label: "자동 업데이트", suffix: "" },
];

const DICT_EXAMPLES = [
  { en: "Isolated Margin", ko: "격리 마진" },
  { en: "Take Profit", ko: "익절" },
  { en: "Funding Rate", ko: "펀딩비" },
  { en: "Open Interest", ko: "미결제약정" },
  { en: "Liquidation", ko: "청산" },
  { en: "Unrealized PnL", ko: "미실현 손익" },
];

const WORKFLOW = [
  { step: "01", title: "크롬 확장 설치", desc: "Chrome 웹스토어에서 원클릭 설치", icon: "📦" },
  { step: "02", title: "거래소 접속", desc: "87개 해외 거래소 어디든 접속", icon: "🌍" },
  { step: "03", title: "속도 부스트 & 전문 번역", desc: "속도는 패스트핑, 해석은 딥러닝", icon: "✨" },
];

const CHANGELOG = [
  { ver: "v7.2.0", date: "2025.03", items: ["87개 코인거래소 한글화 지원", "124개 사이트 속도 최적화", "상위 87개 거래소 전체 커버"] },
  { ver: "v7.1.3", date: "2025.02", items: ["외부 사전 실시간 업데이트", "GT 오역 보정 150+ 패턴"] },
  { ver: "v7.0.0", date: "2025.01", items: ["외부 dictionary.json 통합 관리", "사전·보존단어·래퍼럴 일괄 로딩"] },
];


function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/,/g, "")) || 0;
    if (num === 0) { setCount(target); return; }
    let start = 0;
    const step = Math.ceil(num / 100);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { start = num; clearInterval(timer); }
      setCount(start.toLocaleString());
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ children }) {
  const [ref, visible] = useScrollReveal();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", zIndex: 4 }}>{children}</div>;
}

function ExchangeGrid() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? EXCHANGES : EXCHANGES.slice(0, 30);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
        {displayed.slice(0, 15).map((ex, i) => {
          const color = TOP_COLORS[ex.name] || "#D4D4D4";
          return (
            <div key={i} className="card-hover" style={{ padding: "16px 14px", borderRadius: 14, border: `1px solid ${color}25`, background: `linear-gradient(135deg, ${color}08, transparent)`, display: "flex", alignItems: "center", gap: 10, cursor: "default" }}>
              <div style={{ minWidth: 22, height: 22, borderRadius: 6, background: `${color}20`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color }}>{ex.rank}</div>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: "#D4D4D4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ex.name}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {displayed.slice(15).map((ex, i) => (
          <div key={i} style={{ padding: "8px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#D4D4D4", fontWeight: 600 }}>{ex.rank}</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#D4D4D4", whiteSpace: "nowrap" }}>{ex.name}</span>
          </div>
        ))}
      </div>
      {!showAll ? (
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={() => setShowAll(true)} style={{ padding: "10px 28px", borderRadius: 10, border: "1px solid rgba(229,57,53,0.2)", background: "rgba(229,57,53,0.05)", color: "#E53935", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>87개 거래소 모두 보기 ↓</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12.5, color: "#D4D4D4", fontFamily: "'JetBrains Mono', monospace" }}>상위 87개 거래소 지원 · v7.2.0</div>
      )}
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [dictIdx, setDictIdx] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", type: "광고 문의", message: "" });
  const [contactStatus, setContactStatus] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const logoHover = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDictIdx((i) => (i + 1) % DICT_EXAMPLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Particle Network Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 45;
    const CONNECT_DIST = 130;
    const MOUSE_DIST = 180;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        vz: (Math.random() - 0.5) * 1.0,
        minSpd: Math.random() * 0.8 + 0.15,
        r: Math.random() * 6 + 3,
        baseAlpha: Math.random() * 0.4 + 0.15,
      });
    }

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.z > 250) p.z = 250;
        if (p.z < -250) p.z = -250;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_DIST) {
          const force = (MOUSE_DIST - mDist) / MOUSE_DIST * 0.02;
          p.vx += mdx * force;
          p.vy += mdy * force;
        }

        // Logo 3D sphere attraction + bounce shield
        if (logoRef.current) {
          const rect = logoRef.current.getBoundingClientRect();
          const lx = rect.left + rect.width / 2;
          const ly = rect.top + rect.height / 2;
          const ldx = lx - p.x;
          const ldy = ly - p.y;
          const ldz = 0 - p.z;
          const lDist3D = Math.sqrt(ldx * ldx + ldy * ldy + ldz * ldz);
          const ATTRACT_RADIUS = 500;
          const SHIELD = 255;
          if (lDist3D < ATTRACT_RADIUS && lDist3D > SHIELD) {
            const strength = (ATTRACT_RADIUS - lDist3D) / ATTRACT_RADIUS * 0.06;
            p.vx += ldx / lDist3D * strength;
            p.vy += ldy / lDist3D * strength;
            p.vz += ldz / lDist3D * strength;
          } else if (lDist3D <= SHIELD && lDist3D > 0) {
            const bounce = (SHIELD - lDist3D) / SHIELD * 0.3;
            p.vx -= ldx / lDist3D * bounce;
            p.vy -= ldy / lDist3D * bounce;
            p.vz -= ldz / lDist3D * bounce;
          }
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.vz *= 0.99;
        // Maintain each particle's own minimum speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
        if (spd < p.minSpd) {
          const s = p.minSpd / (spd || 0.01);
          p.vx *= s;
          p.vy *= s;
          p.vz *= s;
        }

        // Draw particle with depth (z affects size and opacity)
        const depthScale = 1 + p.z / 600;
        const depthAlpha = 0.3 + 0.7 * ((p.z + 250) / 500);
        const glow = mDist < MOUSE_DIST ? 1.5 : 1;
        const drawR = p.r * glow * Math.max(depthScale, 0.3);
        const drawAlpha = p.baseAlpha * glow * Math.max(depthAlpha, 0.15);
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 57, 53, ${drawAlpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(229, 57, 53, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      if (mouse.x > 0) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(229, 57, 53, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Logo attraction lines (always active, 3D aware)
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const lx = rect.left + rect.width / 2;
        const ly = rect.top + rect.height / 2;
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - lx;
          const dy = particles[i].y - ly;
          const dz = particles[i].z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist3D < 350) {
            const depthFade = 0.3 + 0.7 * ((particles[i].z + 250) / 500);
            const alpha = (1 - dist3D / 350) * 0.3 * depthFade;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(lx, ly);
            ctx.strokeStyle = `rgba(229, 57, 53, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        // Glow at logo center
        const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, 180);
        grad.addColorStop(0, "rgba(229, 57, 53, 0.08)");
        grad.addColorStop(1, "rgba(229, 57, 53, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(lx, ly, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);


  const navOpacity = Math.min(scrollY / 120, 0.95);
  const top20 = EXCHANGES.slice(0, 20);
  const tickerExchanges = [...top20, ...top20];

  return (
    <div style={{ fontFamily: "'Pretendard', 'Inter', -apple-system, sans-serif", background: "#1C1F26", color: "#E8ECF1", minHeight: "100vh", overflowX: "hidden", position: "relative", letterSpacing: "-0.2px" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes scan-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes ticker-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes stream-h { 0%{transform:translateX(0)} 100%{transform:translateX(500%)} }
        @keyframes stream-v { 0%{transform:translateY(0)} 100%{transform:translateY(500%)} }
        @keyframes dict-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes modal-backdrop-in { from{opacity:0} to{opacity:1} }
        @keyframes modal-panel-in { from{opacity:0;transform:translateY(-30px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        .geo-bg { position: fixed; inset: 0; z-index: 3; pointer-events: none; overflow: hidden; }
        .nav-blur { backdrop-filter: blur(20px) saturate(1.4); -webkit-backdrop-filter: blur(20px) saturate(1.4); }
        .nav-drop:hover > span { color: #E53935; }
        .nav-drop:hover .nav-drop-panel { opacity: 1 !important; pointer-events: auto !important; transform: translateY(0) !important; }
        .hero-gradient { background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(229,57,53,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(247,166,0,0.06) 0%, transparent 50%); }
        .text-gradient { background: linear-gradient(135deg, #FFFFFF 0%, #E53935 50%, #FFFFFF 100%); background-size: 200% 200%; animation: gradient-shift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .card-hover:hover { transform: translateY(-4px); }
        .glow-border { position: relative; }
        .glow-border::before { content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(229,57,53,0.3), rgba(247,166,0,0.15), rgba(229,57,53,0.3)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
        .grid-bg { background-image: linear-gradient(rgba(229,57,53,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(229,57,53,0.02) 1px, transparent 1px); background-size: 66px 66px; }
        .btn-primary { background: linear-gradient(135deg, #E53935, #C62828); transition: all 0.3s ease; position: relative; overflow: hidden; }
        .btn-primary::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transition: left 0.5s; }
        .btn-primary:hover::after { left: 100%; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(229,57,53,0.3); }
        .scan-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(229,57,53,0.3), transparent); animation: scan-line 6s linear infinite; pointer-events: none; }
        .ticker-track { animation: ticker-scroll 40s linear infinite; }
        .section-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #E53935; opacity: 0.8; }
        .dict-item { animation: dict-in 0.4s ease; }
        @media (max-width: 768px) { .hero-title { font-size: 1.75rem !important; } .stat-grid { grid-template-columns: 1fr 1fr !important; } .feature-grid { grid-template-columns: 1fr !important; } .workflow-grid { grid-template-columns: 1fr !important; } .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* PARTICLE NETWORK BACKGROUND */}
      <div className="geo-bg">
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        {/* Diamond shapes */}
        <div className="geo-shape" style={{ width: 60, height: 60, borderColor: "rgba(0,230,118,0.5)", top: "45%", left: "80%", animation: "geo-float-3 15s ease-in-out infinite 1s", transform: "rotate(45deg)" }} />
        <div className="geo-shape" style={{ width: 100, height: 100, borderColor: "rgba(247,166,0,0.4)", top: "80%", left: "60%", animation: "geo-float-1 28s ease-in-out infinite 5s", transform: "rotate(45deg)" }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", borderBottom: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.3px" }}>Traders <span style={{ color: "#E53935" }}>Fastping</span></span>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 10px" }} />
          <div className="nav-drop" style={{ position: "relative" }}>
            <span style={{ color: "#D4D4D4", fontSize: 16, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3, letterSpacing: "-0.2px" }}>Contact <span style={{ fontSize: 11 }}>▾</span></span>
            <div className="nav-drop-panel" style={{ position: "absolute", top: "100%", left: 0, paddingTop: 10, opacity: 0, pointerEvents: "none", transform: "translateY(-8px)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowContact(true); }} style={{ display: "block", width: 260, padding: "16px 20px", borderRadius: 14, background: "rgba(12,18,30,0.98)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 20px 60px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(229,57,53,0.06)"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(12,18,30,0.98)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#E8ECF1", marginBottom: 4 }}>문의하기</div>
                <div style={{ fontSize: 11.5, color: "#D4D4D4", lineHeight: 1.5 }}>비즈니스 제안, 광고 문의, 협업 등 무엇이든 연락주세요</div>
              </a>
            </div>
          </div>
          <div style={{ width: 20 }} />
          <div className="nav-drop" style={{ position: "relative" }}>
            <span style={{ color: "#D4D4D4", fontSize: 16, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3, letterSpacing: "-0.2px" }}>Telegram <span style={{ fontSize: 11 }}>▾</span></span>
            <div className="nav-drop-panel" style={{ position: "absolute", top: "100%", left: 0, paddingTop: 10, opacity: 0, pointerEvents: "none", transform: "translateY(-8px)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <a href="https://t.me/CHARTI_BRO" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: 260, padding: "16px 20px", borderRadius: 14, background: "rgba(12,18,30,0.98)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 20px 60px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(229,57,53,0.06)"; e.currentTarget.style.borderColor = "rgba(229,57,53,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(12,18,30,0.98)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#E8ECF1", marginBottom: 4 }}>@CHARTI_BRO <span style={{ fontSize: 11, color: "#D4D4D4", fontWeight: 400 }}>↗</span></div>
                <div style={{ fontSize: 11.5, color: "#D4D4D4", lineHeight: 1.5 }}>Telegram으로 연결합니다</div>
              </a>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 14, fontWeight: 400 }}>
          <a href="#features" style={{ color: "#D4D4D4", textDecoration: "none", letterSpacing: "-0.2px" }}>기능</a>
          <a href="#exchanges" style={{ color: "#D4D4D4", textDecoration: "none", letterSpacing: "-0.2px" }}>거래소</a>
          <a href="#changelog" style={{ color: "#D4D4D4", textDecoration: "none", letterSpacing: "-0.2px" }}>업데이트</a>
          <a href="https://chromewebstore.google.com/detail/ikmmhbmbnjjhojkdlebjohbamcenanil" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "10px 24px", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>다운로드</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", background: "#1C1F26" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.4 }}>
          <source src={`${import.meta.env.BASE_URL}bg-video.mp4`} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(28,31,38,0.7) 0%, rgba(28,31,38,0.4) 40%, rgba(28,31,38,0.6) 70%, rgba(28,31,38,0.95) 100%)", zIndex: 1, pointerEvents: "none" }} />
        {/* CSS Data Streams */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const isH = i < 8;
            const dur = 3 + Math.random() * 4;
            const delay = Math.random() * 5;
            const pos = 8 + Math.random() * 84;
            const alpha = 0.06 + Math.random() * 0.12;
            return <div key={i} style={{
              position: "absolute",
              [isH ? "top" : "left"]: `${pos}%`,
              [isH ? "left" : "top"]: "-15%",
              [isH ? "width" : "height"]: "30%",
              [isH ? "height" : "width"]: "1px",
              background: isH
                ? `linear-gradient(90deg, transparent, rgba(229,57,53,${alpha}), rgba(255,138,128,${alpha * 2}), transparent)`
                : `linear-gradient(180deg, transparent, rgba(229,57,53,${alpha}), rgba(255,138,128,${alpha * 2}), transparent)`,
              animation: `${isH ? "stream-h" : "stream-v"} ${dur}s linear ${delay}s infinite`,
              opacity: 0.8,
            }} />;
          })}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 5 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, perspective: 1000 }}>
            <img ref={logoRef}
              onMouseEnter={() => { logoHover.current = true; }}
              onMouseLeave={(e) => { logoHover.current = false; e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)"; }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                requestAnimationFrame(() => { e.target.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`; });
              }}
              src={`${import.meta.env.BASE_URL}logo.png`} alt="Traders Fastping"
              style={{ width: 360, height: 360, objectFit: "contain", filter: "drop-shadow(0 0 30px rgba(229,57,53,0.3))", cursor: "pointer", transition: "transform 0.4s ease-out", willChange: "transform" }} />
          </div>

          <h1 className="hero-title" style={{ fontSize: "3.2rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-1.5px", marginBottom: 28 }}>
            버퍼없는 거래, 더 빠른 호가창,<br /><span className="text-gradient">이것이 당신의 진짜 실력입니다.</span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: "#D4D4D4", maxWidth: 620, margin: "0 auto 20px", lineHeight: 1.8, fontWeight: 400 }}>
            불안정한 연결로 인한 슬리피지(Slippage)는 이제 그만.<br />트레이더스패스트핑으로 숨겨진 실력까지 모두 수익으로 연결하세요.
          </p>

          <p style={{ fontSize: "1.1rem", background: "linear-gradient(135deg, #E53935, #FF8A80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.8, fontWeight: 500, textAlign: "center" }}>
            해외 거래소도 국내처럼, 초고속 체결부터 전문 용어 완벽 번역까지
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            <a href="https://chromewebstore.google.com/detail/ikmmhbmbnjjhojkdlebjohbamcenanil" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 32px", borderRadius: 10, color: "#D4D4D4", fontWeight: 500, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "-0.2px", minWidth: 200 }}>
              Chrome에 추가하기
            </a>
            <a href="#features" style={{ padding: "14px 32px", borderRadius: 10, color: "#D4D4D4", fontWeight: 500, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "-0.2px", minWidth: 200 }}>기능 살펴보기</a>
          </div>

          {/* Live Translation Demo */}
          <div className="glow-border" style={{ maxWidth: 500, margin: "0 auto", borderRadius: 16, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", padding: "20px 28px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28CA41" }} />
              <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#D4D4D4", letterSpacing: 1 }}>LIVE TRANSLATION · 87 EXCHANGES</span>
            </div>
            <div className="dict-item" key={dictIdx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#D4D4D4", marginBottom: 4 }}>EN</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#D4D4D4" }}>{DICT_EXAMPLES[dictIdx].en}</div>
              </div>
              <div style={{ color: "#E53935", fontSize: 22, margin: "0 16px" }}>→</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#D4D4D4", marginBottom: 4 }}>KO</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E53935" }}>{DICT_EXAMPLES[dictIdx].ko}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", overflow: "hidden", padding: "28px 0" }}>
        <div style={{ display: "flex", width: "max-content" }} className="ticker-track">
          {tickerExchanges.map((ex, i) => {
            const color = TOP_COLORS[ex.name] || "#D4D4D4";
            return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 36px", whiteSpace: "nowrap" }}><div style={{ width: 9, height: 9, borderRadius: "50%", background: color, opacity: 0.6, boxShadow: `0 0 10px ${color}30` }} /><span style={{ fontWeight: 600, fontSize: 20, color: "#D4D4D4" }}>{ex.name}</span></div>);
          })}
        </div>
      </div>

      {/* STATS */}
      <Section>
        <section style={{ padding: "80px 24px" }}>
          <div className="stat-grid" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-1px", background: "linear-gradient(135deg, #E53935, #FF8A80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, color: "#D4D4D4", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* FEATURES */}
      <Section>
        <section id="features" style={{ padding: "80px 24px 100px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-tag" style={{ marginBottom: 16 }}>CORE FEATURES</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 16 }}>트레이딩에 집중하세요</h2>
              <p style={{ color: "#D4D4D4", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontWeight: 400 }}>호가창·주문 속도를 높이고, 전문 번역으로 더 빠르게 판단하세요.</p>
            </div>
            <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {FEATURES.map((f, i) => (
                <div key={i} className="card-hover" onClick={() => setActiveFeature(i)} style={{
                  borderRadius: 14, cursor: "pointer",
                  border: `1px solid ${activeFeature === i ? `${f.accent}40` : "rgba(255,255,255,0.08)"}`,
                  borderLeft: `3px solid ${f.accent}`,
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: activeFeature === i ? `0 4px 20px ${f.accent}12, 0 0 0 1px ${f.accent}15` : "0 2px 12px rgba(0,0,0,0.2)",
                  overflow: "hidden", transition: "all 0.35s ease", position: "relative"
                }}>
                  {/* Panel header */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{f.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "#E8ECF1" }}>{f.title}</span>
                    </div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1.5,
                      color: f.accent, background: `${f.accent}15`, padding: "2px 8px",
                      borderRadius: 4, fontWeight: 700
                    }}>{f.tag}</span>
                  </div>
                  {/* Panel body */}
                  <div style={{ padding: "14px 16px 16px" }}>
                    <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#aaa", marginBottom: 14 }}>{f.desc}</p>
                    {/* Dashboard-style metric bar */}
                    <div style={{
                      display: "flex", gap: 8,
                    }}>
                      {(i === 0 ? [
                        { label: "차단 트래커", val: "35", color: "#E53935" },
                        { label: "숨긴 요소", val: "12+", color: "#F7A600" },
                        { label: "부스트 사이트", val: "124", color: "#00B8D4" },
                      ] : i === 1 ? [
                        { label: "전문 사전", val: "4,887", color: "#E53935" },
                        { label: "AI 번역", val: "GT", color: "#F7A600" },
                        { label: "오역 보정", val: "150+", color: "#00E676" },
                      ] : [
                        { label: "데이터 수집", val: "0", color: "#00E676" },
                        { label: "로그인", val: "불필요", color: "#00E676" },
                        { label: "로컬 저장", val: "100%", color: "#00E676" },
                      ]).map((m, j) => (
                        <div key={j} style={{
                          flex: 1, textAlign: "center", padding: "8px 4px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 8,
                        }}>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: m.color, marginBottom: 3 }}>{m.val}</div>
                          <div style={{ fontSize: 10, color: "#666", letterSpacing: 0.3 }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Active indicator */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: activeFeature === i ? `linear-gradient(90deg, ${f.accent}, transparent)` : "transparent", transition: "all 0.4s" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* TRANSLATION ENGINE */}
      <Section>
        <section style={{ padding: "80px 24px", background: "rgba(229,57,53,0.015)", borderTop: "1px solid rgba(229,57,53,0.05)", borderBottom: "1px solid rgba(229,57,53,0.05)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="feature-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: 16 }}>HYBRID ENGINE</div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 20 }}>패스트핑 속도 최적화 +<br /><span style={{ background: "linear-gradient(135deg, #E53935, #FF8A80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>트레이딩 전문 번역</span></h2>
              <p style={{ color: "#D4D4D4", fontSize: 14.5, lineHeight: 1.8, marginBottom: 28 }}>호가창·주문·페이지 전환 속도를 최적화하고, 4,887개 트레이딩 전문 용어 사전이 정확한 번역을 적용합니다. 사전에 없는 텍스트만 Google 번역 AI가 처리합니다.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { step: "1단계", label: "사전 매칭", desc: "전문용어를 트레이딩 용어로 즉시 변환" },
                  { step: "2단계", label: "AI 번역", desc: "나머지 텍스트를 Google 번역으로 처리" },
                  { step: "3단계", label: "오역 보정", desc: "GT 오역 패턴 150+ 자동 교정" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: `rgba(229,57,53,${0.08 + i * 0.04})`, border: "1px solid rgba(229,57,53,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: "#E53935" }}>{item.step}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 2 }}>{item.label}</div><div style={{ fontSize: 13, color: "#D4D4D4" }}>{item.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glow-border" style={{ borderRadius: 20, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#D4D4D4", marginBottom: 20, letterSpacing: 1 }}>TRANSLATION PIPELINE</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { tag: "INPUT", color: "#D4D4D4", bg: "rgba(255,255,255,0.03)", bd: "rgba(255,255,255,0.06)", text: <span style={{ color: "#D4D4D4" }}>Isolated Margin Mode</span> },
                  null,
                  { tag: "DICT MATCH ✓", color: "#E53935", bg: "rgba(229,57,53,0.04)", bd: "rgba(229,57,53,0.12)", text: <><span style={{ textDecoration: "line-through", color: "#D4D4D4" }}>Isolated Margin</span> → <span style={{ color: "#E53935", fontWeight: 700 }}>격리 마진</span> <span style={{ color: "#D4D4D4" }}>Mode</span></> },
                  null,
                  { tag: "GT TRANSLATE", color: "#F7A600", bg: "rgba(247,166,0,0.04)", bd: "rgba(247,166,0,0.12)", text: <><span style={{ color: "#E53935", fontWeight: 700 }}>격리 마진</span> <span style={{ color: "#F7A600", fontWeight: 600 }}>모드</span></> },
                  null,
                  { tag: "OUTPUT ✓", color: "#00E676", bg: "rgba(0,230,118,0.04)", bd: "rgba(0,230,118,0.15)", text: <span style={{ fontSize: 17, fontWeight: 700, color: "#E8ECF1" }}>격리 마진 모드</span> },
                ].map((item, i) => item === null ? (
                  <div key={i} style={{ textAlign: "center", color: "#D4D4D4", fontSize: 18 }}>↓</div>
                ) : (
                  <div key={i} style={{ padding: "14px 18px", borderRadius: 12, background: item.bg, border: `1px solid ${item.bd}` }}>
                    <div style={{ fontSize: 11, color: item.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 }}>{item.tag}</div>
                    <div style={{ fontSize: 15 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* 87 EXCHANGES */}
      <Section>
        <section id="exchanges" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="section-tag" style={{ marginBottom: 16 }}>SUPPORTED EXCHANGES</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 12 }}><span className="text-gradient">87개</span> 코인거래소 지원</h2>
              <p style={{ color: "#D4D4D4", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>상위 87개 글로벌 거래소를 모두 지원합니다.<br />속도 최적화 · 트레이딩 전문 번역</p>
            </div>
            <ExchangeGrid />
          </div>
        </section>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <section style={{ padding: "80px 24px 100px", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div className="section-tag" style={{ marginBottom: 16 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 52 }}>3단계로 시작하세요</h2>
            <div className="workflow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, rgba(229,57,53,0.15), rgba(99,102,241,0.15), rgba(247,166,0,0.15))", zIndex: 0 }} />
              {WORKFLOW.map((w, i) => (
                <div key={i} style={{ position: "relative", zIndex: 1 }}>
                  <div className="card-hover" style={{ padding: "36px 24px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)" }}>
                    <div style={{ fontSize: 40, marginBottom: 20 }}>{w.icon}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E53935", marginBottom: 12, letterSpacing: 2 }}>STEP {w.step}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{w.title}</h3>
                    <p style={{ fontSize: 13.5, color: "#D4D4D4", lineHeight: 1.6 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* CONTACT MODAL */}
      {showContact && (
        <div onClick={(e) => { if (e.target === e.currentTarget) { setShowContact(false); setContactStatus(null); } }} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(2,5,10,0.85)", backdropFilter: "blur(24px) saturate(1.2)", WebkitBackdropFilter: "blur(24px) saturate(1.2)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "modal-backdrop-in 0.4s ease" }}>
          <div style={{ maxWidth: 580, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "modal-panel-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <button onClick={() => { setShowContact(false); setContactStatus(null); }} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#D4D4D4", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, fontFamily: "inherit", transition: "all 0.3s", backdropFilter: "blur(10px)" }} onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.color = "#E8ECF1"; }} onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.color = "#D4D4D4"; }}>✕</button>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setContactStatus("sending");
                try {
                  const res = await fetch("https://formspree.io/f/xkoqgady", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: contactForm.name, email: contactForm.email, type: contactForm.type, message: contactForm.message }),
                  });
                  if (res.ok) {
                    setContactStatus("success");
                    setContactForm({ name: "", email: "", type: "광고 문의", message: "" });
                  } else {
                    setContactStatus("error");
                  }
                } catch { setContactStatus("error"); }
              }}
              style={{ borderRadius: 28, background: "linear-gradient(160deg, rgba(15,22,36,0.97), rgba(8,12,24,0.99))", padding: "52px 44px", display: "flex", flexDirection: "column", gap: 22, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 0 0 1px rgba(229,57,53,0.08), 0 25px 80px -12px rgba(0,0,0,0.8), 0 8px 30px rgba(229,57,53,0.04), inset 0 1px 0 rgba(255,255,255,0.06)", position: "relative", zIndex: 10 }}
            >
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <div className="section-tag" style={{ marginBottom: 12 }}>CONTACT</div>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 10 }}>광고 · 협업 문의</h2>
                <p style={{ color: "#D4D4D4", fontSize: 14, lineHeight: 1.7 }}>비즈니스 제안, 광고 문의, 기술 협업 등<br />무엇이든 편하게 연락주세요.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#D4D4D4", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>이름 / 회사명</label>
                  <input
                    type="text" required value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="홍길동 · Company Inc."
                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#E8ECF1", fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "rgba(229,57,53,0.3)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#D4D4D4", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>이메일</label>
                  <input
                    type="email" required value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="hello@company.com"
                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#E8ECF1", fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "rgba(229,57,53,0.3)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#D4D4D4", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>문의 유형</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["광고 문의", "협업 제안", "기술 문의", "기타"].map((t) => (
                    <button key={t} type="button" onClick={() => setContactForm({ ...contactForm, type: t })}
                      style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${contactForm.type === t ? "rgba(229,57,53,0.4)" : "rgba(255,255,255,0.08)"}`, background: contactForm.type === t ? "rgba(229,57,53,0.08)" : "rgba(255,255,255,0.02)", color: contactForm.type === t ? "#E53935" : "#D4D4D4", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#D4D4D4", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>메시지</label>
                <textarea
                  required value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="문의 내용을 자유롭게 작성해 주세요."
                  rows={5}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#E8ECF1", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", lineHeight: 1.7, transition: "border 0.3s" }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(229,57,53,0.3)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={contactStatus === "sending"}
                style={{ padding: "16px 32px", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.2px", opacity: contactStatus === "sending" ? 0.6 : 1 }}>
                {contactStatus === "sending" ? "전송 중..." : "문의 보내기"}
              </button>
              {contactStatus === "success" && <div style={{ textAlign: "center", color: "#00E676", fontSize: 14, fontWeight: 600 }}>문의가 성공적으로 전송되었습니다. 빠른 시일 내 회신드리겠습니다.</div>}
              {contactStatus === "error" && <div style={{ textAlign: "center", color: "#FF5252", fontSize: 14, fontWeight: 600 }}>전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</div>}
            </form>
          </div>
        </div>
      )}

      {/* CTA */}
      <Section>
        <section id="download" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "64px 40px", borderRadius: 28, position: "relative", overflow: "hidden", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,57,53,0.08), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Traders Fastping" style={{ width: 112, height: 112, objectFit: "contain", marginBottom: 24, filter: "drop-shadow(0 0 20px rgba(229,57,53,0.3))" }} />
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 16 }}>번번이 간발의 차로 놓치셨나요?</h2>
              <p style={{ color: "#D4D4D4", fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>수익을 부르는 가장 확실한 투자,<br />트레이더스패스트핑.</p>
              <a href="https://chromewebstore.google.com/detail/ikmmhbmbnjjhojkdlebjohbamcenanil" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "16px 44px", borderRadius: 14, color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
                Chrome 웹스토어에서 설치
              </a>
              <div style={{ marginTop: 20, fontSize: 12.5, color: "#D4D4D4" }}>무료 · 로그인 불필요 · 데이터 수집 없음 · 로컬 사전 내장</div>
            </div>
          </div>
        </section>
      </Section>

      {/* CHANGELOG */}
      <Section>
        <section id="changelog" style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag" style={{ marginBottom: 16 }}>CHANGELOG</div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 12 }}>업데이트 내역</h2>
            </div>
            {CHANGELOG.map((log, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: 32, position: "relative" }}>
                {i < CHANGELOG.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: -32, width: 1, background: "rgba(229,57,53,0.1)" }} />}
                <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg, #E53935, #F7A600)" : "rgba(255,255,255,0.06)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: i === 0 ? "#050A12" : "#D4D4D4", fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                  {i === 0 ? "★" : "·"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: i === 0 ? "#E53935" : "#D4D4D4" }}>{log.ver}</span>
                    <span style={{ fontSize: 12, color: "#D4D4D4" }}>{log.date}</span>
                    {i === 0 && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "rgba(0,230,118,0.1)", color: "#00E676", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>LATEST</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {log.items.map((item, j) => (
                      <div key={j} style={{ fontSize: 13.5, color: "#D4D4D4", lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${i === 0 ? "rgba(229,57,53,0.2)" : "rgba(255,255,255,0.05)"}` }}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)" }}>
        <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Traders Fastping" style={{ width: 42, height: 42, borderRadius: 0, objectFit: "contain" }} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>Traders <span style={{ color: "#E53935" }}>Fastping</span></span>
            </div>
            <p style={{ fontSize: 13, color: "#D4D4D4", lineHeight: 1.7, maxWidth: 300 }}>호가창·주문·페이지 전환 속도를 최적화하고, 트레이딩 전문 번역을 제공하는 크롬 브라우저 확장 프로그램입니다.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#D4D4D4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>기능</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#D4D4D4" }}>
              <span>속도 부스트 (124개)</span><span>전문 번역 (87개)</span><span>외부 사전 업데이트</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#D4D4D4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>주요 거래소</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#D4D4D4" }}>
              <span>Binance · Bybit</span><span>Bitget · OKX</span><span>Gate · KuCoin</span><span>외 81개 거래소</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#D4D4D4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>링크</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#D4D4D4" }}>
              <a href="https://chromewebstore.google.com/detail/ikmmhbmbnjjhojkdlebjohbamcenanil" target="_blank" rel="noopener noreferrer" style={{ color: "#D4D4D4", textDecoration: "none" }}>Chrome 웹스토어</a><a href="#changelog" style={{ color: "#D4D4D4", textDecoration: "none" }}>업데이트 로그</a><span>문의하기</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#D4D4D4" }}>© 2025 Traders Fastping. All rights reserved.</span>
          <span style={{ fontSize: 11, color: "#D4D4D4", fontFamily: "'JetBrains Mono', monospace" }}>v7.2.0 · 87 exchanges · 124 optimized sites</span>
        </div>
      </footer>
    </div>
  );
}
