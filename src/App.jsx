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
  { icon: "🌐", title: "실시간 한글 번역", desc: "87개 해외 거래소의 전문 트레이딩 용어를 정확한 한국어로 자동 번역합니다. 4,800+ 전문 사전과 구글 번역 AI의 하이브리드 엔진.", tag: "TRANSLATE", accent: "#00F0FF" },
  { icon: "⚡", title: "패스트핑 속도 최적화", desc: "DNS 프리페치, 프리커넥트, 호가창 렌더링 최적화로 거래소 페이지 로딩 속도를 극대화합니다. 124개 사이트 최적화.", tag: "SPEED", accent: "#F7A600" },
  { icon: "🎁", title: "자동 추천코드 입력", desc: "거래소 가입 시 추천인 코드가 자동으로 입력됩니다. 수수료 할인 혜택을 놓치지 마세요.", tag: "REFERRAL", accent: "#00E676" },
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
  { step: "03", title: "자동 번역 & 최적화", desc: "한글화 + 속도부스트 자동 작동", icon: "✨" },
];

const CHANGELOG = [
  { ver: "v7.2.0", date: "2025.03", items: ["87개 코인거래소 한글화 지원", "124개 사이트 속도 최적화", "코인마켓캡 상위 전체 거래소 커버"] },
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
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>{children}</div>;
}

function ExchangeGrid() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? EXCHANGES : EXCHANGES.slice(0, 30);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
        {displayed.slice(0, 15).map((ex, i) => {
          const color = TOP_COLORS[ex.name] || "#6B7280";
          return (
            <div key={i} className="card-hover" style={{ padding: "16px 14px", borderRadius: 14, border: `1px solid ${color}25`, background: `linear-gradient(135deg, ${color}08, transparent)`, display: "flex", alignItems: "center", gap: 10, cursor: "default" }}>
              <div style={{ minWidth: 22, height: 22, borderRadius: 6, background: `${color}20`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color }}>{ex.rank}</div>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: "#D0D5DD", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ex.name}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {displayed.slice(15).map((ex, i) => (
          <div key={i} style={{ padding: "8px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#4A5568", fontWeight: 600 }}>{ex.rank}</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7A8494", whiteSpace: "nowrap" }}>{ex.name}</span>
          </div>
        ))}
      </div>
      {!showAll ? (
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={() => setShowAll(true)} style={{ padding: "10px 28px", borderRadius: 10, border: "1px solid rgba(0,240,255,0.2)", background: "rgba(0,240,255,0.05)", color: "#00F0FF", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>87개 거래소 모두 보기 ↓</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12.5, color: "#4A5568", fontFamily: "'JetBrains Mono', monospace" }}>코인마켓캡 거래소 랭킹 기준 상위 87개 거래소 지원 · v7.2.0</div>
      )}
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [dictIdx, setDictIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDictIdx((i) => (i + 1) % DICT_EXAMPLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  const navOpacity = Math.min(scrollY / 120, 0.95);
  const top20 = EXCHANGES.slice(0, 20);
  const tickerExchanges = [...top20, ...top20];

  return (
    <div style={{ fontFamily: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif", background: "#050A12", color: "#E8ECF1", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes scan-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes ticker-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes dict-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .nav-blur { backdrop-filter: blur(20px) saturate(1.4); -webkit-backdrop-filter: blur(20px) saturate(1.4); }
        .hero-gradient { background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,240,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(247,166,0,0.06) 0%, transparent 50%); }
        .text-gradient { background: linear-gradient(135deg, #00F0FF 0%, #6366F1 50%, #F7A600 100%); background-size: 200% 200%; animation: gradient-shift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .card-hover:hover { transform: translateY(-4px); }
        .glow-border { position: relative; }
        .glow-border::before { content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(0,240,255,0.3), rgba(99,102,241,0.1), rgba(247,166,0,0.3)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .grid-bg { background-image: linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        .btn-primary { background: linear-gradient(135deg, #00C9DB, #6366F1); transition: all 0.3s ease; position: relative; overflow: hidden; }
        .btn-primary::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transition: left 0.5s; }
        .btn-primary:hover::after { left: 100%; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,200,219,0.3); }
        .scan-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent); animation: scan-line 6s linear infinite; pointer-events: none; }
        .ticker-track { animation: ticker-scroll 40s linear infinite; }
        .section-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #00F0FF; opacity: 0.8; }
        .dict-item { animation: dict-in 0.4s ease; }
        @media (max-width: 768px) { .hero-title { font-size: 2rem !important; } .stat-grid { grid-template-columns: 1fr 1fr !important; } .feature-grid { grid-template-columns: 1fr !important; } .workflow-grid { grid-template-columns: 1fr !important; } .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* NAV */}
      <nav className="nav-blur" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: `rgba(5,10,18,${navOpacity})`, borderBottom: `1px solid rgba(0,240,255,${navOpacity * 0.1})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00F0FF, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#050A12", fontFamily: "'JetBrains Mono', monospace" }}>TF</div>
          <span style={{ fontWeight: 700, fontSize: 17 }}>Traders <span style={{ color: "#00F0FF" }}>Fastping</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 13.5, fontWeight: 500 }}>
          <a href="#features" style={{ color: "#A0AEC0", textDecoration: "none" }}>기능</a>
          <a href="#exchanges" style={{ color: "#A0AEC0", textDecoration: "none" }}>거래소</a>
          <a href="#changelog" style={{ color: "#A0AEC0", textDecoration: "none" }}>업데이트</a>
          <a href="#download" className="btn-primary" style={{ padding: "8px 20px", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>다운로드</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-gradient grid-bg" style={{ position: "relative", paddingTop: 140, paddingBottom: 80, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="scan-line" />
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.06), transparent 70%)", animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "5%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(247,166,0,0.05), transparent 70%)", animation: "float 10s ease-in-out infinite 2s", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 50, border: "1px solid rgba(0,240,255,0.2)", background: "rgba(0,240,255,0.05)", marginBottom: 28, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E676", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            <span style={{ color: "#A0AEC0" }}>v7.2.0 — 87개 코인거래소 지원</span>
          </div>

          <h1 className="hero-title" style={{ fontSize: "3.6rem", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: 24 }}>
            해외 거래소를<br /><span className="text-gradient">한국어로, 더 빠르게</span>
          </h1>

          <p style={{ fontSize: "1.15rem", color: "#8B95A5", maxWidth: 580, margin: "0 auto 16px", lineHeight: 1.7 }}>
            코인마켓캡 상위 87개 거래소의 트레이딩 용어를<br />정확한 한국어로 자동 번역하고, 속도까지 최적화합니다.
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 8, background: "rgba(247,166,0,0.08)", border: "1px solid rgba(247,166,0,0.15)", marginBottom: 36, fontSize: 12.5, color: "#F7A600", fontWeight: 600 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>87</span>개 코인거래소 · Binance, Bybit, Bitget, OKX 등 글로벌 전체 지원
          </div>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            <a href="#download" className="btn-primary" style={{ padding: "14px 36px", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              Chrome에 추가하기
            </a>
            <a href="#features" style={{ padding: "14px 36px", borderRadius: 12, color: "#C0C8D4", fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", display: "inline-flex", alignItems: "center", gap: 8 }}>기능 살펴보기 →</a>
          </div>

          {/* Live Translation Demo */}
          <div className="glow-border" style={{ maxWidth: 500, margin: "0 auto", borderRadius: 16, background: "rgba(10,16,28,0.8)", padding: "20px 28px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28CA41" }} />
              <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#4A5568", letterSpacing: 1 }}>LIVE TRANSLATION · 87 EXCHANGES</span>
            </div>
            <div className="dict-item" key={dictIdx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#4A5568", marginBottom: 4 }}>EN</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#8B95A5" }}>{DICT_EXAMPLES[dictIdx].en}</div>
              </div>
              <div style={{ color: "#00F0FF", fontSize: 22, margin: "0 16px" }}>→</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#4A5568", marginBottom: 4 }}>KO</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#00F0FF" }}>{DICT_EXAMPLES[dictIdx].ko}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)", overflow: "hidden", padding: "20px 0" }}>
        <div style={{ display: "flex", width: "max-content" }} className="ticker-track">
          {tickerExchanges.map((ex, i) => {
            const color = TOP_COLORS[ex.name] || "#6B7280";
            return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 28px", whiteSpace: "nowrap" }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: color, opacity: 0.6, boxShadow: `0 0 8px ${color}30` }} /><span style={{ fontWeight: 600, fontSize: 13, color: "#4A5568" }}>{ex.name}</span></div>);
          })}
        </div>
      </div>

      {/* STATS */}
      <Section>
        <section style={{ padding: "80px 24px" }}>
          <div className="stat-grid" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-1px", background: "linear-gradient(135deg, #00F0FF, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{s.label}</div>
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
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>트레이딩에 집중하세요</h2>
              <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>복잡한 영어 인터페이스 대신, 익숙한 한국어로 더 빠르게 판단하세요.</p>
            </div>
            <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {FEATURES.map((f, i) => (
                <div key={i} className="card-hover" onClick={() => setActiveFeature(i)} style={{ padding: 32, borderRadius: 20, cursor: "pointer", border: `1px solid ${activeFeature === i ? `${f.accent}40` : "rgba(255,255,255,0.06)"}`, background: activeFeature === i ? `linear-gradient(135deg, ${f.accent}08, ${f.accent}03)` : "rgba(255,255,255,0.02)", position: "relative", overflow: "hidden", transition: "all 0.35s ease" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: f.accent, opacity: 0.7, marginBottom: 16 }}>{f.tag}</div>
                  <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#7A8494" }}>{f.desc}</p>
                  <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 2, background: activeFeature === i ? `linear-gradient(90deg, transparent, ${f.accent}60, transparent)` : "transparent", transition: "all 0.4s" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* TRANSLATION ENGINE */}
      <Section>
        <section style={{ padding: "80px 24px", background: "rgba(0,240,255,0.015)", borderTop: "1px solid rgba(0,240,255,0.05)", borderBottom: "1px solid rgba(0,240,255,0.05)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="feature-grid">
            <div>
              <div className="section-tag" style={{ marginBottom: 16 }}>HYBRID ENGINE</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 20 }}>전문 사전 + AI 번역<br /><span style={{ color: "#00F0FF" }}>하이브리드 엔진</span></h2>
              <p style={{ color: "#7A8494", fontSize: 14.5, lineHeight: 1.8, marginBottom: 28 }}>4,887개 전문 트레이딩 용어가 등록된 내장·외부 사전이 먼저 정확한 번역을 적용하고, 사전에 없는 텍스트만 Google 번역 AI가 처리합니다.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { step: "1단계", label: "사전 매칭", desc: "전문 용어를 정확한 한국어로 즉시 변환" },
                  { step: "2단계", label: "AI 번역", desc: "나머지 텍스트를 Google 번역으로 처리" },
                  { step: "3단계", label: "오역 보정", desc: "GT 오역 패턴 150+ 자동 교정" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: `rgba(0,240,255,${0.08 + i * 0.04})`, border: "1px solid rgba(0,240,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: "#00F0FF" }}>{item.step}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 2 }}>{item.label}</div><div style={{ fontSize: 13, color: "#6B7280" }}>{item.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glow-border" style={{ borderRadius: 20, background: "rgba(10,16,28,0.9)", padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4A5568", marginBottom: 20, letterSpacing: 1 }}>TRANSLATION PIPELINE</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { tag: "INPUT", color: "#4A5568", bg: "rgba(255,255,255,0.03)", bd: "rgba(255,255,255,0.06)", text: <span style={{ color: "#8B95A5" }}>Isolated Margin Mode</span> },
                  null,
                  { tag: "DICT MATCH ✓", color: "#00F0FF", bg: "rgba(0,240,255,0.04)", bd: "rgba(0,240,255,0.12)", text: <><span style={{ textDecoration: "line-through", color: "#4A5568" }}>Isolated Margin</span> → <span style={{ color: "#00F0FF", fontWeight: 700 }}>격리 마진</span> <span style={{ color: "#8B95A5" }}>Mode</span></> },
                  null,
                  { tag: "GT TRANSLATE", color: "#818CF8", bg: "rgba(99,102,241,0.04)", bd: "rgba(99,102,241,0.12)", text: <><span style={{ color: "#00F0FF", fontWeight: 700 }}>격리 마진</span> <span style={{ color: "#818CF8", fontWeight: 600 }}>모드</span></> },
                  null,
                  { tag: "OUTPUT ✓", color: "#00E676", bg: "rgba(0,230,118,0.04)", bd: "rgba(0,230,118,0.15)", text: <span style={{ fontSize: 17, fontWeight: 700, color: "#E8ECF1" }}>격리 마진 모드</span> },
                ].map((item, i) => item === null ? (
                  <div key={i} style={{ textAlign: "center", color: "#2D3748", fontSize: 18 }}>↓</div>
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
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}><span className="text-gradient">87개</span> 코인거래소 지원</h2>
              <p style={{ color: "#6B7280", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>코인마켓캡 거래소 랭킹 기준 상위 글로벌 거래소를 모두 지원합니다.<br />한국어 번역 · 속도 최적화 · 추천코드 자동 입력</p>
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
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 52 }}>3단계로 시작하세요</h2>
            <div className="workflow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, rgba(0,240,255,0.15), rgba(99,102,241,0.15), rgba(247,166,0,0.15))", zIndex: 0 }} />
              {WORKFLOW.map((w, i) => (
                <div key={i} style={{ position: "relative", zIndex: 1 }}>
                  <div className="card-hover" style={{ padding: "36px 24px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,16,28,0.8)" }}>
                    <div style={{ fontSize: 40, marginBottom: 20 }}>{w.icon}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#00F0FF", marginBottom: 12, letterSpacing: 2 }}>STEP {w.step}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{w.title}</h3>
                    <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.6 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
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
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>업데이트 내역</h2>
            </div>
            {CHANGELOG.map((log, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: 32, position: "relative" }}>
                {i < CHANGELOG.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: -32, width: 1, background: "rgba(0,240,255,0.1)" }} />}
                <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg, #00F0FF, #6366F1)" : "rgba(255,255,255,0.06)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: i === 0 ? "#050A12" : "#4A5568", fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                  {i === 0 ? "★" : "·"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: i === 0 ? "#00F0FF" : "#A0AEC0" }}>{log.ver}</span>
                    <span style={{ fontSize: 12, color: "#4A5568" }}>{log.date}</span>
                    {i === 0 && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "rgba(0,230,118,0.1)", color: "#00E676", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>LATEST</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {log.items.map((item, j) => (
                      <div key={j} style={{ fontSize: 13.5, color: "#7A8494", lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${i === 0 ? "rgba(0,240,255,0.2)" : "rgba(255,255,255,0.05)"}` }}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* CTA */}
      <Section>
        <section id="download" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "64px 40px", borderRadius: 28, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(0,240,255,0.06), rgba(99,102,241,0.06), rgba(247,166,0,0.04))", border: "1px solid rgba(0,240,255,0.1)" }}>
            <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.08), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 48, marginBottom: 24 }}>🚀</div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16 }}>87개 거래소를 한국어로</h2>
              <p style={{ color: "#7A8494", fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>무료 Chrome 확장 프로그램을 설치하고<br />전 세계 코인거래소를 한국어로 이용하세요.</p>
              <a href="#" className="btn-primary" style={{ padding: "16px 44px", borderRadius: 14, color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>
                Chrome 웹스토어에서 설치
              </a>
              <div style={{ marginTop: 20, fontSize: 12.5, color: "#4A5568" }}>무료 · 설치 즉시 사용 가능 · 개인정보 수집 없음</div>
            </div>
          </div>
        </section>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}>
        <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #00F0FF, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#050A12", fontFamily: "'JetBrains Mono', monospace" }}>TF</div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Traders <span style={{ color: "#00F0FF" }}>Fastping</span></span>
            </div>
            <p style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.7, maxWidth: 300 }}>코인마켓캡 상위 87개 해외 암호화폐 거래소를 한국어로 이용할 수 있게 해주는 크롬 브라우저 확장 프로그램입니다.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>기능</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#4A5568" }}>
              <span>실시간 번역 (87개)</span><span>속도 최적화 (124개)</span><span>자동 추천코드</span><span>외부 사전 업데이트</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>주요 거래소</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#4A5568" }}>
              <span>Binance · Bybit</span><span>Bitget · OKX</span><span>Gate · KuCoin</span><span>외 81개 거래소</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>링크</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "#4A5568" }}>
              <span>Chrome 웹스토어</span><span>업데이트 로그</span><span>문의하기</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#2D3748" }}>© 2025 Traders Fastping. All rights reserved.</span>
          <span style={{ fontSize: 11, color: "#2D3748", fontFamily: "'JetBrains Mono', monospace" }}>v7.2.0 · 87 exchanges · 124 optimized sites</span>
        </div>
      </footer>
    </div>
  );
}
