// Image Fallback & Universal Error Handler for PahadiVibe

// Beautiful SVG Data URI placeholders with Himalayan mountain silhouettes & gradients
export const getMountainFallback = (title = 'Himalayan Devbhoomi', subtitle = 'Sacred Peaks • Uttarakhand') => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0F172A" />
        <stop offset="40%" stop-color="#1E293B" />
        <stop offset="70%" stop-color="#2E1065" />
        <stop offset="100%" stop-color="#7C2D12" />
      </linearGradient>
      <linearGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="70%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#EA580C" />
      </linearGradient>
      <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="30%" stop-color="#E2E8F0" />
        <stop offset="100%" stop-color="#64748B" />
      </linearGradient>
      <linearGradient id="shadowPeak" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="100%" stop-color="#0F172A" />
      </linearGradient>
    </defs>
    
    <!-- Deep Alpine Night Sky -->
    <rect width="800" height="500" fill="url(#skyGrad)" />
    
    <!-- Stars -->
    <circle cx="120" cy="80" r="1.5" fill="#FFF" opacity="0.8" />
    <circle cx="280" cy="45" r="1.2" fill="#FFF" opacity="0.9" />
    <circle cx="450" cy="90" r="1" fill="#FFF" opacity="0.7" />
    <circle cx="680" cy="60" r="1.8" fill="#FFF" opacity="0.85" />
    <circle cx="560" cy="110" r="1.2" fill="#FFF" opacity="0.6" />
    
    <!-- Golden Rising Sun -->
    <circle cx="400" cy="240" r="85" fill="url(#sunGrad)" opacity="0.85" />
    
    <!-- Background Mountains -->
    <polygon points="50,420 220,210 390,420" fill="#1E293B" opacity="0.7" />
    <polygon points="410,420 580,190 750,420" fill="#1E293B" opacity="0.7" />
    
    <!-- Main Nanda Devi / Trishul Twin Peaks -->
    <polygon points="180,450 360,150 540,450" fill="url(#shadowPeak)" />
    <!-- Snow Cap Left -->
    <polygon points="360,150 310,240 360,230" fill="url(#snowGrad)" />
    <!-- Snow Cap Right -->
    <polygon points="360,150 360,230 420,250" fill="#CBD5E1" />
    
    <!-- Fore Peaks & Pine Ridge -->
    <polygon points="0,500 160,330 350,500" fill="#0A0E1A" />
    <polygon points="320,500 480,310 660,500" fill="#0B132B" />
    <polygon points="560,500 700,340 800,500" fill="#0A0E1A" />
    
    <!-- Ambient Mist Over Pine Trees -->
    <ellipse cx="400" cy="450" rx="420" ry="60" fill="#38BDF8" opacity="0.15" />
    
    <!-- Title Banner -->
    <rect x="180" y="380" width="440" height="70" rx="16" fill="#030712" fill-opacity="0.85" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="400" y="415" font-family="'Cinzel', serif, sans-serif" font-size="20" font-weight="bold" fill="#F8FAFC" text-anchor="middle" letter-spacing="1">${title}</text>
    <text x="400" y="436" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#FBBF24" text-anchor="middle" letter-spacing="2">${subtitle}</text>
  </svg>
  `.trim();
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Universal error handler to attach to <img onError={handleImageError} />
export const handleImageError = (e, fallbackTitle = 'PahadiVibe Mountain') => {
  e.currentTarget.onerror = null; // Prevent infinite loop
  e.currentTarget.src = getMountainFallback(fallbackTitle);
};

// Curated 100% verified rock-solid high-resolution photography URLs
export const RELIABLE_HIMALAYAN_IMAGES = {
  nainital: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  almora: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  chopta: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  kedarnath: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
  rishikesh: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  auli: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
  heroBg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=85'
};
