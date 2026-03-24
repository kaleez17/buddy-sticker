const { useState, useEffect, useRef } = React;

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Skull Drip", category: "Gothic", price: 149, rating: 4.9, reviews: 87, emoji: "💀", tag: "BESTSELLER", desc: "Hand-drawn dripping skull, weatherproof vinyl. Perfect for helmets & tanks.", sizes: ["3\"", "5\"", "8\""], colors: ["Black/White", "Red/Black", "Gold/Black"] },
  { id: 2, name: "Street Tiger", category: "Animals", price: 199, rating: 4.8, reviews: 63, emoji: "🐯", tag: "HOT", desc: "Aggressive tiger face in graffiti style. Fade-resistant outdoor ink.", sizes: ["4\"", "6\"", "10\""], colors: ["Orange/Black", "White/Black", "Neon/Black"] },
  { id: 3, name: "Flame Rider", category: "Bikes", price: 249, rating: 5.0, reviews: 41, emoji: "🔥", tag: "NEW", desc: "Full-wrap flame kit for bikes & cars. UV-resistant, 5-year guarantee.", sizes: ["Kit S", "Kit M", "Kit L"], colors: ["Red/Orange", "Blue/White", "Green/Yellow"] },
  { id: 4, name: "Oni Mask", category: "Gothic", price: 179, rating: 4.7, reviews: 52, emoji: "👹", tag: "TRENDING", desc: "Japanese oni demon mask, ultra-detailed linework on matte black vinyl.", sizes: ["3\"", "5\"", "8\""], colors: ["Red/Black", "Blue/Black", "Gold/Black"] },
  { id: 5, name: "Chrome Eagle", category: "Patriotic", price: 219, rating: 4.8, reviews: 38, emoji: "🦅", tag: "POPULAR", desc: "Metallic chrome eagle spread wings. Mirror-finish vinyl, premium quality.", sizes: ["5\"", "8\"", "12\""], colors: ["Chrome", "Gold", "Gunmetal"] },
  { id: 6, name: "Graffiti Tag", category: "Street", price: 99, rating: 4.6, reviews: 94, emoji: "✍️", tag: "BUDGET PICK", desc: "Custom graffiti-style name tag. Each one handcrafted to order.", sizes: ["4\"", "6\"", "10\""], colors: ["Multi", "Mono", "Neon"] },
  { id: 7, name: "Mecha Skull", category: "Gothic", price: 269, rating: 4.9, reviews: 29, emoji: "🤖", tag: "PREMIUM", desc: "Cyberpunk mechanical skull fusion. Holographic finish available.", sizes: ["5\"", "8\"", "12\""], colors: ["Holo", "Chrome/Red", "Black/Blue"] },
  { id: 8, name: "Serpent Wrap", category: "Bikes", price: 349, rating: 5.0, reviews: 18, emoji: "🐍", tag: "CUSTOM", desc: "Full serpent body wrap for bikes. Custom fit, Gopi's signature work.", sizes: ["Kit S", "Kit M", "Kit L"], colors: ["Green/Black", "Red/Gold", "Black/Silver"] },
];

const CATEGORIES = ["All", "Gothic", "Bikes", "Animals", "Street", "Patriotic"];

const REVIEWS = [
  { name: "Sooraj Kumar", rating: 5, text: "Got 3 of my works done here. Gopi is the reason I keep coming back. Extraordinary output every single time.", badge: "Local Guide", date: "3 months ago" },
  { name: "Praveen", rating: 5, text: "Gopi did an amazing job on my Aprilia RS457. The detailing was so good — lot of dedication and the best result.", badge: "Local Guide", date: "3 months ago" },
  { name: "Sadam Mathik", rating: 5, text: "Stunning work done by Gopi for my Verna. Give him time and space and the output will be exactly as you liked.", badge: "Verified", date: "1 month ago" },
];

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = {
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Cart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  ArrowLeft: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  MapPin: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18a2 2 0 012-2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 6.32a16 16 0 006.29 6.29l1.28-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 13.92z"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0a;
    --dark: #111111;
    --card: #161616;
    --border: #2a2a2a;
    --red: #e63946;
    --red-dark: #c1121f;
    --yellow: #ffd60a;
    --white: #f8f8f8;
    --gray: #888;
    --light: #ccc;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Barlow Condensed', sans-serif;
    --font-mono: 'Space Mono', monospace;
  }

  body { background: var(--black); color: var(--white); font-family: var(--font-body); overflow-x: hidden; }

  .app { min-height: 100vh; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--red); }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 28px;
    letter-spacing: 3px;
    color: var(--white);
    cursor: pointer;
  }
  .nav-logo span { color: var(--red); }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-links { display: flex; gap: 24px; }
  .nav-link {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gray);
    cursor: pointer;
    transition: color 0.2s;
    background: none; border: none;
  }
  .nav-link:hover, .nav-link.active { color: var(--white); }
  .cart-btn {
    position: relative;
    background: none; border: none;
    color: var(--white); cursor: pointer;
    padding: 8px;
    transition: color 0.2s;
  }
  .cart-btn:hover { color: var(--red); }
  .cart-badge {
    position: absolute; top: 2px; right: 2px;
    background: var(--red);
    color: white;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    width: 18px; height: 18px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  /* HERO */
  .hero {
    position: relative;
    min-height: 90vh;
    display: flex; align-items: center;
    overflow: hidden;
    padding: 60px 40px;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 80% 50%, rgba(230,57,70,0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(255,214,10,0.05) 0%, transparent 50%),
      linear-gradient(180deg, #0a0a0a 0%, #111 100%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.3;
  }
  .hero-content { position: relative; z-index: 2; max-width: 700px; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--red);
    color: white;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 6px 14px;
    margin-bottom: 24px;
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(64px, 10vw, 120px);
    line-height: 0.9;
    letter-spacing: 2px;
    color: var(--white);
    margin-bottom: 8px;
  }
  .hero-title-accent { color: var(--red); display: block; }
  .hero-sub {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 56px);
    letter-spacing: 6px;
    color: var(--yellow);
    margin-bottom: 24px;
  }
  .hero-desc {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray);
    line-height: 1.6;
    max-width: 480px;
    margin-bottom: 40px;
  }
  .hero-desc strong { color: var(--white); }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--red);
    color: white;
    border: none;
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 3px;
    padding: 14px 36px;
    cursor: pointer;
    transition: all 0.2s;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  }
  .btn-primary:hover { background: var(--red-dark); transform: translateY(-2px); }
  .btn-outline {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border);
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 3px;
    padding: 14px 36px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--white); }

  .hero-stats {
    position: absolute; right: 40px; bottom: 60px;
    display: flex; flex-direction: column; gap: 20px;
    z-index: 2;
  }
  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 16px 24px;
    text-align: center;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .stat-num {
    font-family: var(--font-display);
    font-size: 36px;
    color: var(--red);
    line-height: 1;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--gray);
    text-transform: uppercase;
  }

  /* TICKER */
  .ticker {
    background: var(--red);
    padding: 10px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .ticker-inner {
    display: inline-flex;
    animation: ticker 20s linear infinite;
  }
  .ticker-item {
    font-family: var(--font-display);
    font-size: 18px;
    letter-spacing: 4px;
    color: white;
    padding: 0 40px;
  }
  .ticker-sep { color: rgba(255,255,255,0.4); }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* SECTION */
  .section { padding: 80px 40px; }
  .section-header { margin-bottom: 48px; }
  .section-tag {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--red);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 64px);
    letter-spacing: 2px;
    color: var(--white);
    line-height: 1;
  }

  /* FILTERS */
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
  .filter-btn {
    background: transparent;
    color: var(--gray);
    border: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 8px 18px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn:hover { color: var(--white); border-color: var(--white); }
  .filter-btn.active { background: var(--red); color: white; border-color: var(--red); }

  /* PRODUCT GRID */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }

  /* PRODUCT CARD */
  .product-card {
    background: var(--card);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .product-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--red);
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .product-card:hover { border-color: #3a3a3a; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
  .product-card:hover::before { transform: scaleX(1); }

  .card-img {
    height: 200px;
    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
    display: flex; align-items: center; justify-content: center;
    font-size: 80px;
    position: relative;
    overflow: hidden;
  }
  .card-tag {
    position: absolute; top: 12px; left: 0;
    background: var(--red);
    color: white;
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 4px 10px;
    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%);
  }
  .card-tag.yellow { background: var(--yellow); color: var(--black); }
  .card-tag.green { background: #2ecc71; color: var(--black); }

  .card-body { padding: 16px; }
  .card-category {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--red);
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .card-name {
    font-family: var(--font-display);
    font-size: 24px;
    letter-spacing: 1px;
    color: var(--white);
    margin-bottom: 8px;
  }
  .card-rating { display: flex; align-items: center; gap: 4px; margin-bottom: 12px; }
  .stars { display: flex; gap: 1px; color: var(--yellow); }
  .rating-num {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--gray);
    margin-left: 4px;
  }
  .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
  .card-price {
    font-family: var(--font-display);
    font-size: 28px;
    color: var(--white);
  }
  .card-price span { font-size: 16px; color: var(--gray); }
  .add-btn {
    background: var(--red);
    color: white;
    border: none;
    font-family: var(--font-display);
    font-size: 14px;
    letter-spacing: 1px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .add-btn:hover { background: var(--red-dark); }

  /* PRODUCT DETAIL */
  .detail-page { padding: 40px; max-width: 1100px; margin: 0 auto; }
  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: none;
    color: var(--gray); cursor: pointer;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 40px;
    transition: color 0.2s;
  }
  .back-btn:hover { color: var(--white); }

  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .detail-img {
    aspect-ratio: 1;
    background: linear-gradient(135deg, #1c1c1c, #111);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 140px;
    position: relative;
  }
  .detail-tag {
    position: absolute; top: 20px; left: 0;
    background: var(--red); color: white;
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 2px; padding: 6px 16px;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
  }

  .detail-info { padding: 8px 0; }
  .detail-category {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 3px; color: var(--red); text-transform: uppercase;
    margin-bottom: 8px;
  }
  .detail-name {
    font-family: var(--font-display);
    font-size: clamp(48px, 5vw, 72px);
    letter-spacing: 2px; color: var(--white); line-height: 0.95;
    margin-bottom: 20px;
  }
  .detail-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
  .detail-stars { display: flex; gap: 2px; color: var(--yellow); }
  .detail-rating-num { font-family: var(--font-mono); font-size: 14px; color: var(--gray); }
  .detail-price {
    font-family: var(--font-display); font-size: 56px;
    color: var(--white); margin-bottom: 8px;
  }
  .detail-price-note { font-family: var(--font-mono); font-size: 11px; color: var(--gray); letter-spacing: 1px; margin-bottom: 32px; }
  .detail-desc { font-size: 15px; color: var(--gray); line-height: 1.7; margin-bottom: 32px; }

  .option-label {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--light); margin-bottom: 10px;
  }
  .option-group { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .option-btn {
    background: transparent; color: var(--gray);
    border: 1px solid var(--border);
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 1px; padding: 8px 16px;
    cursor: pointer; transition: all 0.2s;
  }
  .option-btn:hover { color: var(--white); border-color: var(--white); }
  .option-btn.selected { background: var(--red); color: white; border-color: var(--red); }

  .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
  .qty-ctrl { display: flex; align-items: center; gap: 0; border: 1px solid var(--border); }
  .qty-btn {
    background: var(--dark); color: var(--white); border: none;
    width: 40px; height: 40px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .qty-btn:hover { background: var(--border); }
  .qty-num {
    width: 48px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 16px; color: var(--white);
    border-left: 1px solid var(--border); border-right: 1px solid var(--border);
  }
  .qty-label { font-family: var(--font-mono); font-size: 11px; color: var(--gray); letter-spacing: 1px; }

  .btn-add-large {
    width: 100%; background: var(--red); color: white; border: none;
    font-family: var(--font-display); font-size: 22px; letter-spacing: 4px;
    padding: 18px; cursor: pointer; transition: all 0.2s;
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  }
  .btn-add-large:hover { background: var(--red-dark); transform: translateY(-2px); }

  /* REVIEWS SECTION */
  .reviews-section { padding: 80px 40px; background: var(--dark); }
  .reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 48px; }
  .review-card {
    background: var(--card); border: 1px solid var(--border);
    padding: 24px; position: relative;
  }
  .review-card::before {
    content: '"';
    position: absolute; top: 16px; right: 20px;
    font-family: var(--font-display); font-size: 60px;
    color: var(--red); opacity: 0.2; line-height: 1;
  }
  .reviewer-name { font-family: var(--font-display); font-size: 22px; color: var(--white); margin-bottom: 4px; }
  .reviewer-badge {
    display: inline-block;
    background: rgba(230,57,70,0.15); color: var(--red);
    font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px;
    padding: 3px 8px; margin-bottom: 12px;
  }
  .review-stars { display: flex; gap: 2px; color: var(--yellow); margin-bottom: 12px; }
  .review-text { font-size: 14px; color: var(--gray); line-height: 1.6; margin-bottom: 12px; }
  .review-date { font-family: var(--font-mono); font-size: 10px; color: #555; letter-spacing: 1px; }

  /* ABOUT SECTION */
  .about-section { padding: 80px 40px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .about-visual {
    background: var(--card); border: 1px solid var(--border);
    padding: 48px; text-align: center;
    clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px));
  }
  .about-icon { font-size: 80px; margin-bottom: 20px; }
  .about-shop-name { font-family: var(--font-display); font-size: 40px; letter-spacing: 3px; color: var(--white); }
  .about-shop-sub { font-family: var(--font-mono); font-size: 12px; letter-spacing: 2px; color: var(--gray); margin-top: 8px; }
  .about-rating-big { font-family: var(--font-display); font-size: 80px; color: var(--red); line-height: 1; margin-top: 24px; }
  .about-rating-label { font-family: var(--font-mono); font-size: 11px; color: var(--gray); letter-spacing: 2px; }
  .about-info { display: flex; flex-direction: column; gap: 24px; }
  .about-title { font-family: var(--font-display); font-size: 56px; letter-spacing: 2px; color: var(--white); line-height: 1; margin-bottom: 16px; }
  .about-desc { font-size: 15px; color: var(--gray); line-height: 1.7; margin-bottom: 32px; }
  .info-row { display: flex; align-items: flex-start; gap: 10px; }
  .info-icon { color: var(--red); margin-top: 2px; flex-shrink: 0; }
  .info-text { font-family: var(--font-mono); font-size: 13px; color: var(--light); line-height: 1.5; }

  /* CART SIDEBAR */
  .cart-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    z-index: 200; backdrop-filter: blur(4px);
  }
  .cart-sidebar {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 420px; max-width: 100%;
    background: var(--dark);
    border-left: 1px solid var(--border);
    z-index: 201;
    display: flex; flex-direction: column;
  }
  .cart-header {
    padding: 24px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .cart-title { font-family: var(--font-display); font-size: 32px; letter-spacing: 2px; color: var(--white); }
  .cart-close-btn {
    background: none; border: none; color: var(--gray);
    cursor: pointer; transition: color 0.2s; padding: 4px;
  }
  .cart-close-btn:hover { color: var(--white); }
  .cart-items { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
  .cart-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }
  .cart-empty-icon { font-size: 60px; opacity: 0.3; }
  .cart-empty-text { font-family: var(--font-mono); font-size: 13px; color: var(--gray); letter-spacing: 1px; }

  .cart-item {
    background: var(--card); border: 1px solid var(--border);
    padding: 16px; display: flex; gap: 16px; align-items: center;
  }
  .cart-item-emoji { font-size: 36px; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-family: var(--font-display); font-size: 18px; color: var(--white); }
  .cart-item-meta { font-family: var(--font-mono); font-size: 10px; color: var(--gray); letter-spacing: 1px; margin-top: 2px; }
  .cart-item-price { font-family: var(--font-display); font-size: 20px; color: var(--red); }
  .cart-item-qty { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .qty-mini-btn {
    background: var(--border); color: var(--white); border: none;
    width: 24px; height: 24px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .qty-mini-btn:hover { background: #3a3a3a; }
  .qty-mini-num { font-family: var(--font-mono); font-size: 13px; color: var(--white); min-width: 24px; text-align: center; }
  .remove-btn { background: none; border: none; color: #555; cursor: pointer; transition: color 0.2s; }
  .remove-btn:hover { color: var(--red); }

  .cart-footer { padding: 24px; border-top: 1px solid var(--border); }
  .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .cart-total-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 2px; color: var(--gray); text-transform: uppercase; }
  .cart-total-amt { font-family: var(--font-display); font-size: 36px; color: var(--white); }
  .checkout-btn {
    width: 100%; background: var(--red); color: white; border: none;
    font-family: var(--font-display); font-size: 20px; letter-spacing: 4px;
    padding: 16px; cursor: pointer; transition: all 0.2s;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  }
  .checkout-btn:hover { background: var(--red-dark); }

  /* CHECKOUT */
  .checkout-page { padding: 40px; max-width: 960px; margin: 0 auto; }
  .checkout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; }
  .form-section-title { font-family: var(--font-display); font-size: 28px; letter-spacing: 2px; color: var(--white); margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--gray); text-transform: uppercase; margin-bottom: 6px; display: block; }
  .form-input {
    width: 100%; background: var(--card); border: 1px solid var(--border);
    color: var(--white); font-family: var(--font-mono); font-size: 13px;
    padding: 12px 16px; outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--red); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .order-summary { background: var(--card); border: 1px solid var(--border); padding: 24px; }
  .summary-title { font-family: var(--font-display); font-size: 28px; letter-spacing: 2px; color: var(--white); margin-bottom: 20px; }
  .summary-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .summary-item:last-child { border: none; }
  .summary-item-left { display: flex; align-items: center; gap: 10px; }
  .summary-item-emoji { font-size: 24px; }
  .summary-item-name { font-family: var(--font-body); font-size: 15px; font-weight: 600; color: var(--white); }
  .summary-item-meta { font-family: var(--font-mono); font-size: 10px; color: var(--gray); }
  .summary-item-price { font-family: var(--font-display); font-size: 20px; color: var(--white); }
  .summary-total { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; margin-top: 8px; }
  .summary-total-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 2px; color: var(--gray); }
  .summary-total-amt { font-family: var(--font-display); font-size: 40px; color: var(--red); }
  .place-order-btn {
    width: 100%; background: var(--red); color: white; border: none;
    font-family: var(--font-display); font-size: 22px; letter-spacing: 4px;
    padding: 20px; cursor: pointer; transition: all 0.2s; margin-top: 24px;
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  }
  .place-order-btn:hover { background: var(--red-dark); transform: translateY(-2px); }

  /* SUCCESS */
  .success-page {
    min-height: 80vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center; padding: 40px;
  }
  .success-icon {
    width: 80px; height: 80px; background: var(--red); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; color: white;
    margin: 0 auto 24px;
  }
  .success-title { font-family: var(--font-display); font-size: 64px; letter-spacing: 3px; color: var(--white); margin-bottom: 12px; }
  .success-sub { font-family: var(--font-mono); font-size: 13px; color: var(--gray); letter-spacing: 2px; margin-bottom: 40px; }

  /* FOOTER */
  footer {
    background: var(--dark); border-top: 1px solid var(--border);
    padding: 40px; text-align: center;
  }
  .footer-logo { font-family: var(--font-display); font-size: 32px; letter-spacing: 4px; color: var(--white); margin-bottom: 8px; }
  .footer-logo span { color: var(--red); }
  .footer-sub { font-family: var(--font-mono); font-size: 11px; color: var(--gray); letter-spacing: 2px; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 500;
    background: var(--red); color: white;
    font-family: var(--font-mono); font-size: 12px; letter-spacing: 1px;
    padding: 14px 20px;
    display: flex; align-items: center; gap: 10px;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  @media (max-width: 768px) {
    .hero { padding: 40px 20px; min-height: auto; }
    .hero-stats { display: none; }
    .section { padding: 60px 20px; }
    .detail-grid { grid-template-columns: 1fr; gap: 32px; }
    .about-grid { grid-template-columns: 1fr; }
    .checkout-grid { grid-template-columns: 1fr; }
    .reviews-section { padding: 60px 20px; }
    .about-section { padding: 60px 20px; }
  }
`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.floor(count) ? "var(--yellow)" : "#333" }}>
          <Icon.Star />
        </span>
      ))}
    </div>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, []);
  return (
    <div className="toast">
      <Icon.Check />
      {msg}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const showToast = (msg) => setToast(msg);

  const addToCart = (product, size, color, qty = 1) => {
    const key = `${product.id}-${size}-${color}`;
    setCart(prev => {
      const exists = prev.find(i => i.key === key);
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { key, ...product, size, color, qty }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (key) => setCart(prev => prev.filter(i => i.key !== key));
  const updateQty = (key, delta) => setCart(prev =>
    prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );

  const filteredProducts = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const navTo = (p) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <>
      <style>{G}</style>
      <div className="app">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={() => navTo("home")}>
            BUDDY<span>.</span>
          </div>
          <div className="nav-right">
            <div className="nav-links">
              {["home", "shop", "about"].map(p => (
                <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => navTo(p)}>
                  {p}
                </button>
              ))}
            </div>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <Icon.Cart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* PAGES */}
        {page === "home" && <HomePage navTo={navTo} addToCart={addToCart} filter={filter} setFilter={setFilter} filteredProducts={filteredProducts} setSelectedProduct={setSelectedProduct} />}
        {page === "shop" && <ShopPage filter={filter} setFilter={setFilter} filteredProducts={filteredProducts} setSelectedProduct={setSelectedProduct} navTo={navTo} />}
        {page === "detail" && selectedProduct && <DetailPage product={selectedProduct} navTo={navTo} addToCart={addToCart} />}
        {page === "checkout" && !orderDone && <CheckoutPage cart={cart} cartTotal={cartTotal} onOrder={() => setOrderDone(true)} navTo={navTo} />}
        {page === "checkout" && orderDone && <SuccessPage navTo={navTo} setCart={setCart} setOrderDone={setOrderDone} />}
        {page === "about" && <AboutPage />}

        {/* FOOTER */}
        <footer>
          <div className="footer-logo">BUDDY<span>.</span></div>
          <div className="footer-sub" style={{ marginTop: 4 }}>STICKER SHOP · ADYAR, CHENNAI · EST. 2020</div>
          <div className="footer-sub" style={{ marginTop: 12, color: "#444" }}>© 2025 Buddy Sticker Shop. All rights reserved.</div>
        </footer>

        {/* CART SIDEBAR */}
        {cartOpen && (
          <>
            <div className="cart-overlay" onClick={() => setCartOpen(false)} />
            <div className="cart-sidebar">
              <div className="cart-header">
                <span className="cart-title">YOUR CART</span>
                <button className="cart-close-btn" onClick={() => setCartOpen(false)}><Icon.X /></button>
              </div>
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <div className="cart-empty-text">YOUR CART IS EMPTY</div>
                  <button className="btn-primary" style={{ fontSize: 16 }} onClick={() => { setCartOpen(false); navTo("shop"); }}>SHOP NOW</button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.key} className="cart-item">
                        <div className="cart-item-emoji">{item.emoji}</div>
                        <div className="cart-item-info">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-meta">{item.size} · {item.color}</div>
                          <div className="cart-item-qty">
                            <button className="qty-mini-btn" onClick={() => updateQty(item.key, -1)}><Icon.Minus /></button>
                            <span className="qty-mini-num">{item.qty}</span>
                            <button className="qty-mini-btn" onClick={() => updateQty(item.key, 1)}><Icon.Plus /></button>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                          <div className="cart-item-price">₹{item.price * item.qty}</div>
                          <button className="remove-btn" onClick={() => removeFromCart(item.key)}><Icon.Trash /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-total-row">
                      <span className="cart-total-label">Total</span>
                      <span className="cart-total-amt">₹{cartTotal}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => { setCartOpen(false); navTo("checkout"); }}>
                      CHECKOUT
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* TOAST */}
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </div>
    </>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ navTo, addToCart, filter, setFilter, filteredProducts, setSelectedProduct }) {
  const tickerItems = ["CUSTOM STICKERS", "BIKE WRAPS", "CAR DECALS", "HELMET ART", "WEATHERPROOF", "PREMIUM VINYL", "MADE IN CHENNAI"];
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">⚡ ADYAR, CHENNAI</div>
          <h1 className="hero-title">
            BUDDY
            <span className="hero-title-accent">STICKER</span>
          </h1>
          <div className="hero-sub">SHOP</div>
          <p className="hero-desc">
            <strong>Gopi's custom work</strong> brings your wildest designs to life.
            Bikes, cars, helmets — we wrap it all in premium weatherproof vinyl.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navTo("shop")}>SHOP NOW</button>
            <button className="btn-outline" onClick={() => navTo("about")}>OUR STORY</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-num">4.5★</div>
            <div className="stat-label">Google Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">105+</div>
            <div className="stat-label">Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">5YR</div>
            <div className="stat-label">Guarantee</div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="ticker-item">{t} <span className="ticker-sep">✦</span></span>
          ))}
        </div>
      </div>

      {/* FEATURED SHOP */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">// FEATURED PRODUCTS</div>
          <h2 className="section-title">FRESH DROPS</h2>
        </div>
        <div className="filters">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="product-grid">
          {filteredProducts.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onView={() => { setSelectedProduct(p); navTo("detail"); }} onAdd={(e) => { e.stopPropagation(); addToCart(p, p.sizes[0], p.colors[0]); }} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button className="btn-outline" onClick={() => navTo("shop")}>VIEW ALL PRODUCTS</button>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />
    </>
  );
}

// ── SHOP PAGE ──────────────────────────────────────────────────────────────────
function ShopPage({ filter, setFilter, filteredProducts, setSelectedProduct, navTo }) {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-tag">// ALL PRODUCTS</div>
        <h2 className="section-title">THE COLLECTION</h2>
      </div>
      <div className="filters">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gray)", letterSpacing: 2, marginBottom: 24 }}>
        SHOWING {filteredProducts.length} PRODUCTS
      </div>
      <div className="product-grid">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} onView={() => { setSelectedProduct(p); navTo("detail"); }} onAdd={(e) => { e.stopPropagation(); }} />
        ))}
      </div>
    </section>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product: p, onView, onAdd }) {
  const tagColor = p.tag === "NEW" ? "green" : p.tag === "HOT" ? "" : "yellow";
  return (
    <div className="product-card" onClick={onView}>
      <div className="card-img">
        <span style={{ fontSize: 80 }}>{p.emoji}</span>
        <span className={`card-tag ${tagColor}`}>{p.tag}</span>
      </div>
      <div className="card-body">
        <div className="card-category">{p.category}</div>
        <div className="card-name">{p.name}</div>
        <div className="card-rating">
          <Stars count={p.rating} />
          <span className="rating-num">{p.rating} ({p.reviews})</span>
        </div>
        <div className="card-footer">
          <div className="card-price"><span>₹</span>{p.price}</div>
          <button className="add-btn" onClick={onAdd}>+ ADD</button>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
function DetailPage({ product: p, navTo, addToCart }) {
  const [size, setSize] = useState(p.sizes[0]);
  const [color, setColor] = useState(p.colors[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navTo("shop")}>
        <Icon.ArrowLeft /> BACK TO SHOP
      </button>
      <div className="detail-grid">
        <div>
          <div className="detail-img">
            <span>{p.emoji}</span>
            <span className="detail-tag">{p.tag}</span>
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-category">{p.category}</div>
          <h1 className="detail-name">{p.name}</h1>
          <div className="detail-rating">
            <div className="detail-stars"><Stars count={p.rating} /></div>
            <span className="detail-rating-num">{p.rating} · {p.reviews} reviews</span>
          </div>
          <div className="detail-price">₹{p.price}</div>
          <div className="detail-price-note">TAX INCLUDED · FREE DELIVERY ON ORDERS OVER ₹999</div>
          <p className="detail-desc">{p.desc}</p>

          <div className="option-label">Size</div>
          <div className="option-group">
            {p.sizes.map(s => (
              <button key={s} className={`option-btn${size === s ? " selected" : ""}`} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>

          <div className="option-label">Color</div>
          <div className="option-group">
            {p.colors.map(c => (
              <button key={c} className={`option-btn${color === c ? " selected" : ""}`} onClick={() => setColor(c)}>{c}</button>
            ))}
          </div>

          <div className="qty-row">
            <div className="qty-ctrl">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><Icon.Minus /></button>
              <div className="qty-num">{qty}</div>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}><Icon.Plus /></button>
            </div>
            <span className="qty-label">QUANTITY</span>
          </div>

          <button className="btn-add-large" onClick={() => addToCart(p, size, color, qty)}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

// ── REVIEWS SECTION ───────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="section-tag" style={{ paddingLeft: 40 }}>// WHAT THEY SAY</div>
      <h2 className="section-title" style={{ paddingLeft: 40 }}>REAL REVIEWS</h2>
      <div className="reviews-grid" style={{ padding: "0 40px" }}>
        {REVIEWS.map((r, i) => (
          <div key={i} className="review-card">
            <div className="reviewer-name">{r.name}</div>
            <div className="reviewer-badge">{r.badge}</div>
            <div className="review-stars"><Stars count={r.rating} /></div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-date">{r.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <section className="about-section">
      <div className="about-grid">
        <div className="about-visual">
          <div className="about-icon">🎨</div>
          <div className="about-shop-name">BUDDY</div>
          <div className="about-shop-sub">STICKER SHOP · EST. 2020</div>
          <div className="about-rating-big">4.5</div>
          <div style={{ color: "var(--yellow)", display: "flex", justifyContent: "center", gap: 3, marginTop: 6 }}>
            {[1,2,3,4,5].map(i => <Icon.Star key={i} />)}
          </div>
          <div className="about-rating-label" style={{ marginTop: 8 }}>105 GOOGLE REVIEWS</div>
        </div>
        <div className="about-info">
          <div>
            <div className="section-tag">// OUR STORY</div>
            <h2 className="about-title">BRINGING YOUR IMAGINATION TO REALITY</h2>
          </div>
          <p className="about-desc">
            Buddy Sticker Shop is Chennai's premium destination for custom vinyl wraps, stickers, and decals.
            Whether you come with a reference photo or just a vague idea — Gopi and the team will bring it to life,
            delivering results that exceed your wildest expectations.
          </p>
          <div>
            <div className="info-row">
              <span className="info-icon"><Icon.MapPin /></span>
              <span className="info-text">Shop No. 4, Corporation Shopping Complex, No. 24, Indira Nagar, Adyar, Chennai, Tamil Nadu 600020</span>
            </div>
          </div>
          <div>
            <div className="info-row">
              <span className="info-icon"><Icon.Phone /></span>
              <span className="info-text">072006 57003</span>
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--gray)", letterSpacing: 1 }}>
            MON–SAT · OPEN UNTIL 9 PM
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
function CheckoutPage({ cart, cartTotal, onOrder, navTo }) {
  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={() => navTo("shop")}>
        <Icon.ArrowLeft /> CONTINUE SHOPPING
      </button>
      <div className="section-tag">// SECURE CHECKOUT</div>
      <h2 className="section-title">CHECKOUT</h2>
      <div className="checkout-grid">
        <div>
          <div className="form-section-title">DELIVERY INFO</div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-input" placeholder="Street address" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="Chennai" />
            </div>
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input className="form-input" placeholder="600020" />
            </div>
          </div>

          <div className="form-section-title" style={{ marginTop: 32 }}>PAYMENT</div>
          <div className="option-group">
            {["UPI", "Card", "Cash on Delivery"].map(m => (
              <button key={m} className="option-btn">{m}</button>
            ))}
          </div>
          <button className="place-order-btn" onClick={onOrder}>PLACE ORDER</button>
        </div>
        <div>
          <div className="order-summary">
            <div className="summary-title">ORDER SUMMARY</div>
            {cart.map(item => (
              <div key={item.key} className="summary-item">
                <div className="summary-item-left">
                  <span className="summary-item-emoji">{item.emoji}</span>
                  <div>
                    <div className="summary-item-name">{item.name}</div>
                    <div className="summary-item-meta">{item.size} · {item.color} · ×{item.qty}</div>
                  </div>
                </div>
                <div className="summary-item-price">₹{item.price * item.qty}</div>
              </div>
            ))}
            <div className="summary-total">
              <span className="summary-total-label">TOTAL</span>
              <span className="summary-total-amt">₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SUCCESS PAGE ──────────────────────────────────────────────────────────────
function SuccessPage({ navTo, setCart, setOrderDone }) {
  return (
    <div className="success-page">
      <div className="success-icon"><Icon.Check /></div>
      <h1 className="success-title">ORDER PLACED!</h1>
      <p className="success-sub">BUDDY STICKER SHOP WILL REACH OUT SHORTLY · 072006 57003</p>
      <button className="btn-primary" onClick={() => { setCart([]); setOrderDone(false); navTo("home"); }}>
        BACK TO HOME
      </button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
