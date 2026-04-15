// Product & blog card illustrations (inline SVG data URIs)

function toUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}

function card(bg1: string, bg2: string, bg3: string, icon: string): string {
  return toUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${bg1}"/><stop offset="50%" stop-color="${bg2}"/><stop offset="100%" stop-color="${bg3}"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#bg)"/>
<circle cx="60" cy="50" r="80" fill="white" opacity="0.04"/>
<circle cx="340" cy="250" r="100" fill="white" opacity="0.04"/>
<circle cx="330" cy="40" r="35" fill="white" opacity="0.03"/>
<circle cx="70" cy="260" r="50" fill="white" opacity="0.03"/>
<g transform="translate(200,145)">${icon}</g>
</svg>`)
}

// Product illustrations by object ID
export const productImages: Record<string, string> = {
  // obj-1: Vintage Jacket
  'obj-1': card('#1a1a2e', '#16213e', '#0f3460', `
    <path d="M-30,-55 L-45,-25 L-65,-20 L-55,60 L-20,60 L-20,5 L20,5 L20,60 L55,60 L65,-20 L45,-25 L30,-55 L12,-42 L-12,-42 Z" fill="#c8a97e" opacity="0.9"/>
    <path d="M-12,-42 L-12,60" stroke="#b8956e" stroke-width="1.5" opacity="0.4"/>
    <path d="M12,-42 L12,60" stroke="#b8956e" stroke-width="1.5" opacity="0.4"/>
    <circle cx="0" cy="-15" r="3" fill="#a07850" opacity="0.5"/>
    <circle cx="0" cy="0" r="3" fill="#a07850" opacity="0.5"/>
    <circle cx="0" cy="15" r="3" fill="#a07850" opacity="0.5"/>
    <path d="M-12,-42 C-12,-55 12,-55 12,-42" fill="none" stroke="#c8a97e" stroke-width="3" opacity="0.6"/>
  `),

  // obj-2: Smartwatch
  'obj-2': card('#0f2027', '#203a43', '#2c5364', `
    <rect x="-10" y="-75" width="20" height="20" rx="4" fill="#5ec4d4" opacity="0.7"/>
    <rect x="-10" y="55" width="20" height="20" rx="4" fill="#5ec4d4" opacity="0.7"/>
    <circle r="52" fill="#1a3a4a" stroke="#5ec4d4" stroke-width="5" opacity="0.9"/>
    <circle r="44" fill="#0d2530" opacity="0.8"/>
    <line x1="0" y1="0" x2="0" y2="-30" stroke="#5ec4d4" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="22" y2="8" stroke="#5ec4d4" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <circle r="3" fill="#5ec4d4"/>
    ${[0,30,60,90,120,150,180,210,240,270,300,330].map(a =>
      `<circle cx="${(Math.sin(a*Math.PI/180)*40).toFixed(1)}" cy="${(-Math.cos(a*Math.PI/180)*40).toFixed(1)}" r="${a%90===0?3:1.5}" fill="#5ec4d4" opacity="0.6"/>`
    ).join('')}
  `),

  // obj-3: Fantasy Books (PDF)
  'obj-3': card('#1a0a2e', '#2d1b69', '#44318d', `
    <rect x="-38" y="-5" width="76" height="55" rx="3" fill="#b8a9c9" opacity="0.65" transform="rotate(-8)"/>
    <rect x="-38" y="-12" width="76" height="55" rx="3" fill="#c8b9d9" opacity="0.75" transform="rotate(-3)"/>
    <rect x="-38" y="-20" width="76" height="55" rx="3" fill="#e8daf3" opacity="0.9" transform="rotate(2)"/>
    <line x1="-22" y1="-2" x2="22" y2="-2" stroke="#44318d" stroke-width="2" opacity="0.2" transform="rotate(2)"/>
    <line x1="-22" y1="8" x2="18" y2="8" stroke="#44318d" stroke-width="2" opacity="0.15" transform="rotate(2)"/>
    <line x1="-22" y1="18" x2="14" y2="18" stroke="#44318d" stroke-width="2" opacity="0.1" transform="rotate(2)"/>
    <path d="M-50,-40 L-46,-50 L-38,-45 L-42,-35 Z" fill="#ffd700" opacity="0.6"/>
    <path d="M-44,-42" r="2" fill="#ffd700" opacity="0.5"/>
  `),

  // obj-4: YouTube Promo
  'obj-4': card('#1a0000', '#4a0e0e', '#7a1b1b', `
    <circle r="55" fill="white" opacity="0.12"/>
    <circle r="45" fill="white" opacity="0.08"/>
    <rect x="-50" y="-35" width="100" height="70" rx="12" fill="#ff4444" opacity="0.85"/>
    <polygon points="-12,-18 -12,18 18,0" fill="white" opacity="0.95"/>
    <circle cx="60" cy="-45" r="8" fill="#ff6b6b" opacity="0.5"/>
    <text x="56" y="-41" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif" font-weight="bold" opacity="0.9">1K</text>
  `),

  // obj-5: AI Portraits (10 pcs)
  'obj-5': card('#1a0a20', '#3d1f5c', '#6b3fa0', `
    <circle cy="-22" r="28" fill="white" opacity="0.75"/>
    <ellipse cy="30" rx="38" ry="32" fill="white" opacity="0.65"/>
    <circle cx="-8" cy="-28" r="4" fill="#6b3fa0" opacity="0.5"/>
    <circle cx="8" cy="-28" r="4" fill="#6b3fa0" opacity="0.5"/>
    <path d="M-5,-18 Q0,-14 5,-18" fill="none" stroke="#6b3fa0" stroke-width="2" opacity="0.4"/>
    <path d="M45,-40 L48,-32 L56,-34 L52,-26 L60,-22 L52,-18 L56,-10 L48,-12 L45,-4 L42,-12 L34,-10 L38,-18 L30,-22 L38,-26 L34,-34 L42,-32 Z" fill="#ffd700" opacity="0.75"/>
    <path d="M-50,-35 L-48,-30 L-43,-31 L-45,-26 L-40,-24 L-45,-22 L-43,-17 L-48,-18 L-50,-13 L-52,-18 L-57,-17 L-55,-22 L-60,-24 L-55,-26 L-57,-31 L-52,-30 Z" fill="#ffd700" opacity="0.45"/>
  `),

  // obj-6: Leather Bag
  'obj-6': card('#1c1008', '#3a2a15', '#5c4330', `
    <path d="M-18,-65 C-18,-78 18,-78 18,-65" fill="none" stroke="#d4a76a" stroke-width="5" stroke-linecap="round"/>
    <rect x="-42" y="-45" width="84" height="90" rx="10" fill="#d4a76a" opacity="0.9"/>
    <rect x="-30" y="-35" width="60" height="8" rx="3" fill="#b8905a" opacity="0.5"/>
    <circle cy="5" r="10" fill="none" stroke="#b8905a" stroke-width="2.5" opacity="0.5"/>
    <circle cy="5" r="4" fill="#b8905a" opacity="0.4"/>
    <line x1="-42" y1="-15" x2="42" y2="-15" stroke="#b8905a" stroke-width="1" opacity="0.3"/>
  `),

  // obj-7: Steam Key (Game Key)
  'obj-7': card('#0a0a1f', '#151540', '#1e1e5a', `
    <rect x="-55" y="-28" width="110" height="56" rx="22" fill="#4444cc" opacity="0.8"/>
    <rect x="-55" y="-28" width="110" height="56" rx="22" fill="none" stroke="#6666ff" stroke-width="2" opacity="0.5"/>
    <circle cx="-25" cy="0" r="14" fill="none" stroke="white" stroke-width="2" opacity="0.7"/>
    <rect x="-28" y="-2" width="6" height="4" fill="white" opacity="0.6"/>
    <rect x="-27" y="-8" width="4" height="6" fill="white" opacity="0.6"/>
    <circle cx="20" cy="-10" r="6" fill="#ff4444" opacity="0.7"/>
    <circle cx="33" cy="0" r="6" fill="#44cc44" opacity="0.7"/>
    <circle cx="20" cy="10" r="6" fill="#4488ff" opacity="0.7"/>
    <circle cx="7" cy="0" r="6" fill="#ffcc00" opacity="0.7"/>
  `),

  // obj-8: Instagram Account 10K
  'obj-8': card('#1a0520', '#5c2580', '#833ab4', `
    <rect x="-45" y="-45" width="90" height="90" rx="20" fill="white" opacity="0.15"/>
    <rect x="-40" y="-40" width="80" height="80" rx="18" fill="none" stroke="white" stroke-width="3" opacity="0.8"/>
    <circle r="22" fill="none" stroke="white" stroke-width="3" opacity="0.8"/>
    <circle r="15" fill="white" opacity="0.15"/>
    <circle cx="23" cy="-23" r="5" fill="white" opacity="0.7"/>
    <text x="0" y="65" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold" opacity="0.7">10K followers</text>
  `),

  // obj-9: 3D Model Character (Rigged)
  'obj-9': card('#001a1a', '#003333', '#005555', `
    <polygon points="0,-55 55,-20 55,20 0,55 -55,20 -55,-20" fill="none" stroke="#00ccaa" stroke-width="2" opacity="0.6"/>
    <polygon points="0,-45 45,-16 0,14 -45,-16" fill="#00ccaa" opacity="0.15"/>
    <polygon points="-45,-16 0,14 0,45 -45,15" fill="#00ccaa" opacity="0.1"/>
    <polygon points="45,-16 0,14 0,45 45,15" fill="#00ccaa" opacity="0.07"/>
    <line x1="0" y1="14" x2="0" y2="45" stroke="#00ccaa" stroke-width="1.5" opacity="0.4"/>
    <line x1="-45" y1="-16" x2="-45" y2="15" stroke="#00ccaa" stroke-width="1.5" opacity="0.3"/>
    <line x1="45" y1="-16" x2="45" y2="15" stroke="#00ccaa" stroke-width="1.5" opacity="0.3"/>
    <line x1="-45" y1="15" x2="0" y2="45" stroke="#00ccaa" stroke-width="1.5" opacity="0.3"/>
    <line x1="45" y1="15" x2="0" y2="45" stroke="#00ccaa" stroke-width="1.5" opacity="0.3"/>
    <circle cx="0" cy="-2" r="4" fill="#00ccaa" opacity="0.6"/>
  `),

  // obj-10: AI Landscapes (20 images)
  'obj-10': card('#0a1628', '#1a3050', '#2a4a78', `
    <circle cx="45" cy="-45" r="22" fill="#ffd700" opacity="0.7"/>
    <circle cx="45" cy="-45" r="18" fill="#ffee88" opacity="0.5"/>
    <polygon points="-80,55 -30,-30 20,55" fill="#4a7a5a" opacity="0.6"/>
    <polygon points="-20,55 25,-55 70,55" fill="#5a9a6a" opacity="0.75"/>
    <polygon points="25,-55 18,-35 32,-35" fill="white" opacity="0.85"/>
    <polygon points="-30,-30 -35,-18 -25,-18" fill="white" opacity="0.6"/>
    <line x1="-80" y1="55" x2="80" y2="55" stroke="#2a6a4a" stroke-width="2" opacity="0.3"/>
  `),

  // obj-11: Telegram Promo 5000
  'obj-11': card('#0a1a2e', '#0d47a1', '#1565c0', `
    <polygon points="-55,5 55,-45 15,12" fill="white" opacity="0.85"/>
    <polygon points="15,12 55,-45 30,55" fill="white" opacity="0.65"/>
    <line x1="15" y1="12" x2="25" y2="55" stroke="white" stroke-width="1.5" opacity="0.4"/>
    <polygon points="-55,5 15,12 25,55 -10,25" fill="white" opacity="0.15"/>
    <text x="0" y="75" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif" font-weight="bold" opacity="0.5">5000+</text>
  `),

  // obj-12: Sneakers (Lot)
  'obj-12': card('#1a1020', '#2a2040', '#3a3060', `
    <ellipse cx="-5" cy="35" rx="55" ry="8" fill="black" opacity="0.15"/>
    <path d="M-55,15 C-55,-15 -35,-35 -5,-35 C15,-35 35,-30 50,-22 C62,-16 65,0 58,10 L58,22 C58,28 -45,28 -45,28 C-55,28 -60,22 -58,15 Z" fill="white" opacity="0.85"/>
    <path d="M58,-22 C62,-16 65,0 58,10" stroke="#3a3060" stroke-width="2" fill="none" opacity="0.3"/>
    <path d="M-55,15 L58,15" stroke="#3a3060" stroke-width="1.5" opacity="0.15"/>
    <circle cx="-25" cy="-5" r="4" fill="#3a3060" opacity="0.12"/>
    <circle cx="-10" cy="-12" r="4" fill="#3a3060" opacity="0.12"/>
    <circle cx="5" cy="-5" r="4" fill="#3a3060" opacity="0.12"/>
    <path d="M-40,22 L-40,28" stroke="#e0e0e0" stroke-width="2" opacity="0.3"/>
    <path d="M-20,22 L-20,28" stroke="#e0e0e0" stroke-width="2" opacity="0.3"/>
    <path d="M0,22 L0,28" stroke="#e0e0e0" stroke-width="2" opacity="0.3"/>
    <path d="M20,22 L20,28" stroke="#e0e0e0" stroke-width="2" opacity="0.3"/>
  `),

  // obj-13: Photoshop Actions
  'obj-13': card('#0a0a2e', '#1a1a5e', '#2d2d8e', `
    <rect x="-32" y="-10" width="50" height="50" rx="4" fill="white" opacity="0.5" transform="rotate(-10)"/>
    <rect x="-22" y="-20" width="50" height="50" rx="4" fill="white" opacity="0.65" transform="rotate(-3)"/>
    <rect x="-18" y="-28" width="50" height="50" rx="4" fill="white" opacity="0.85"/>
    <polygon points="-8,12 5,-3 28,12" fill="#6666cc" opacity="0.35"/>
    <circle cx="20" cy="-14" r="6" fill="#ffcc00" opacity="0.5"/>
    <line x1="35" y1="-48" x2="50" y2="-63" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
    <path d="M50,-68 L52,-60 L60,-58 L52,-56 L50,-48 L48,-56 L40,-58 L48,-60 Z" fill="#ffd700" opacity="0.85"/>
    <path d="M-45,-50 L-44,-46 L-40,-45 L-44,-44 L-45,-40 L-46,-44 L-50,-45 L-46,-46 Z" fill="#ffd700" opacity="0.5"/>
  `),
}

// Blog post illustrations by type
export const blogImages: Record<string, string> = {
  // Unpacking — open box with items
  unpacking: card('#1a2a0a', '#2a4a1a', '#3a6a2a', `
    <rect x="-48" y="-8" width="96" height="65" rx="6" fill="#c8b080" opacity="0.85"/>
    <polygon points="-48,-8 -55,-32 -5,-14 -5,-8" fill="#d4c090" opacity="0.8"/>
    <polygon points="48,-8 55,-32 5,-14 5,-8" fill="#c0a878" opacity="0.75"/>
    <rect x="-18" y="-50" width="14" height="42" rx="2" fill="#e8d8c0" opacity="0.65"/>
    <rect x="6" y="-45" width="16" height="37" rx="2" fill="#dcc8a8" opacity="0.7" transform="rotate(6,14,-26)"/>
    <rect x="-36" y="-38" width="12" height="30" rx="2" fill="#f0e0c8" opacity="0.55" transform="rotate(-8,-30,-23)"/>
    <circle cx="45" cy="-40" r="3" fill="#ffd700" opacity="0.6"/>
    <circle cx="50" cy="-35" r="2" fill="#ffd700" opacity="0.4"/>
  `),

  // News — broadcast screen with signal
  news: card('#0a1a2e', '#1a3050', '#2a4a78', `
    <rect x="-45" y="-38" width="90" height="62" rx="6" fill="white" opacity="0.85"/>
    <rect x="-38" y="-32" width="76" height="45" rx="3" fill="#2a4a78" opacity="0.3"/>
    <line x1="-28" y1="-15" x2="28" y2="-15" stroke="#2a4a78" stroke-width="2.5" opacity="0.2"/>
    <line x1="-28" y1="-5" x2="20" y2="-5" stroke="#2a4a78" stroke-width="2.5" opacity="0.15"/>
    <line x1="-28" y1="5" x2="15" y2="5" stroke="#2a4a78" stroke-width="2.5" opacity="0.1"/>
    <rect x="-6" y="24" width="12" height="14" fill="white" opacity="0.7"/>
    <rect x="-18" y="36" width="36" height="6" rx="2" fill="white" opacity="0.6"/>
    <path d="M52,-22 C62,-14 62,0 52,8" fill="none" stroke="white" stroke-width="2.5" opacity="0.4"/>
    <path d="M58,-30 C72,-18 72,6 58,16" fill="none" stroke="white" stroke-width="2" opacity="0.25"/>
    <circle cx="-50" cy="-45" r="8" fill="#ff4444" opacity="0.7"/>
    <text x="-50" y="-42" text-anchor="middle" fill="white" font-size="7" font-family="sans-serif" font-weight="bold">NEW</text>
  `),

  // Guide — open book with bookmark
  guide: card('#1a0a20', '#2d1b50', '#442d80', `
    <path d="M0,-45 C-22,-40 -55,-35 -60,-12 L-60,45 C-55,22 -22,16 0,10 Z" fill="white" opacity="0.82"/>
    <path d="M0,-45 C22,-40 55,-35 60,-12 L60,45 C55,22 22,16 0,10 Z" fill="white" opacity="0.72"/>
    <line x1="0" y1="-45" x2="0" y2="10" stroke="#442d80" stroke-width="1" opacity="0.15"/>
    <line x1="-42" y1="-12" x2="-10" y2="-12" stroke="#442d80" stroke-width="2" opacity="0.12"/>
    <line x1="-42" y1="-2" x2="-15" y2="-2" stroke="#442d80" stroke-width="2" opacity="0.1"/>
    <line x1="10" y1="-12" x2="42" y2="-12" stroke="#442d80" stroke-width="2" opacity="0.12"/>
    <line x1="10" y1="-2" x2="38" y2="-2" stroke="#442d80" stroke-width="2" opacity="0.1"/>
    <polygon points="32,-48 32,-22 37,-28 42,-22 42,-48" fill="#ff6b6b" opacity="0.75"/>
  `),
}

// Get image for a catalog object — falls back to type-based
export function getObjectImage(id: string, type: string, _categoryId: string): string {
  if (productImages[id]) return productImages[id]
  // Fallback by type
  const typeDefaults: Record<string, string> = {
    material: productImages['obj-1'],
    digital: productImages['obj-3'],
    service: productImages['obj-4'],
    ai_content: productImages['obj-5'],
  }
  return typeDefaults[type] || productImages['obj-1']
}

// Get image for a blog post
export function getBlogImage(type: string): string {
  return blogImages[type] || blogImages.news
}

// Improved AI image generator — creates themed SVGs
export function generateAIImage(prompt: string): string {
  const p = prompt.toLowerCase()
  const seed = prompt.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const rand = (i: number) => ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280

  if (p.includes('животн') || p.includes('animal') || p.includes('кот') || p.includes('cat') || p.includes('собак') || p.includes('dog')) {
    return toUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a3a1a"/><stop offset="100%" stop-color="#0a2a2a"/></linearGradient></defs>
<rect width="400" height="400" fill="url(#bg)"/>
<circle cx="300" cy="80" r="40" fill="#ffd700" opacity="0.3"/>
<ellipse cx="200" cy="350" rx="180" ry="30" fill="#1a4a1a" opacity="0.5"/>
${Array.from({length: 5}, (_, i) => {
  const x = 60 + i * 75, h = 80 + rand(i) * 60
  return `<line x1="${x}" y1="340" x2="${x}" y2="${340-h}" stroke="#2a5a2a" stroke-width="${3+rand(i+10)*4}" stroke-linecap="round" opacity="0.4"/>
<circle cx="${x}" cy="${340-h-15}" r="${12+rand(i+5)*8}" fill="#3a7a3a" opacity="0.5"/>`
}).join('')}
<ellipse cx="200" cy="260" rx="35" ry="30" fill="#f0d080" opacity="0.8"/>
<circle cx="200" cy="215" r="22" fill="#f0d080" opacity="0.85"/>
<polygon points="185,195 180,175 192,190" fill="#f0d080" opacity="0.8"/>
<polygon points="215,195 220,175 208,190" fill="#f0d080" opacity="0.8"/>
<circle cx="192" cy="210" r="4" fill="#2a2a1a" opacity="0.7"/>
<circle cx="208" cy="210" r="4" fill="#2a2a1a" opacity="0.7"/>
<ellipse cx="200" cy="220" rx="5" ry="3" fill="#c88060" opacity="0.7"/>
<path d="M192,225 Q200,232 208,225" fill="none" stroke="#c88060" stroke-width="1.5" opacity="0.6"/>
<path d="M165,260 C140,270 130,300 160,310" fill="none" stroke="#f0d080" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
</svg>`)
  }

  if (p.includes('город') || p.includes('city') || p.includes('здани') || p.includes('building') || p.includes('небоскрёб') || p.includes('skyline')) {
    return toUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a2e"/><stop offset="40%" stop-color="#1a1a5e"/><stop offset="100%" stop-color="#2a2a6e"/></linearGradient></defs>
<rect width="400" height="400" fill="url(#bg)"/>
<circle cx="320" cy="60" r="30" fill="#ffeedd" opacity="0.15"/>
${Array.from({length: 15}, (_, i) => `<circle cx="${rand(i)*400}" cy="${rand(i+20)*150}" r="1.5" fill="white" opacity="${0.3+rand(i+40)*0.5}"/>`).join('')}
${[
  {x:10,w:50,h:180},{x:55,w:40,h:220},{x:90,w:55,h:260},{x:140,w:35,h:190},{x:170,w:60,h:300},
  {x:225,w:45,h:240},{x:265,w:50,h:200},{x:310,w:40,h:270},{x:345,w:55,h:210}
].map((b, i) => {
  const windows = Array.from({length: Math.floor(b.h/25)}, (_, j) =>
    Array.from({length: Math.floor(b.w/14)}, (_, k) =>
      `<rect x="${b.x+4+k*14}" y="${400-b.h+8+j*25}" width="8" height="12" fill="#ffd700" opacity="${rand(i*10+j*3+k)>0.4?0.6:0.15}"/>`
    ).join('')
  ).join('')
  return `<rect x="${b.x}" y="${400-b.h}" width="${b.w}" height="${b.h}" fill="#${(0x1a1a3e+i*0x080808).toString(16).slice(-6)}" opacity="0.9"/>${windows}`
}).join('')}
<rect x="0" y="385" width="400" height="15" fill="#111130"/>
</svg>`)
  }

  if (p.includes('природ') || p.includes('natur') || p.includes('лес') || p.includes('forest') || p.includes('гор') || p.includes('mountain') || p.includes('пейзаж') || p.includes('landscape')) {
    return toUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff8844"/><stop offset="30%" stop-color="#ff6644"/><stop offset="60%" stop-color="#4488aa"/><stop offset="100%" stop-color="#1a4a3a"/></linearGradient></defs>
<rect width="400" height="400" fill="url(#bg)"/>
<circle cx="320" cy="100" r="40" fill="#ffdd44" opacity="0.6"/>
<circle cx="320" cy="100" r="35" fill="#ffee88" opacity="0.4"/>
<polygon points="50,400 130,180 210,400" fill="#2a5a4a" opacity="0.7"/>
<polygon points="130,180 120,210 140,210" fill="white" opacity="0.7"/>
<polygon points="160,400 260,120 360,400" fill="#3a7a5a" opacity="0.8"/>
<polygon points="260,120 248,160 272,160" fill="white" opacity="0.85"/>
<polygon points="280,400 340,220 400,400" fill="#2a6a4a" opacity="0.6"/>
<ellipse cx="100" cy="130" rx="50" ry="20" fill="white" opacity="0.2"/>
<ellipse cx="120" cy="128" rx="40" ry="18" fill="white" opacity="0.15"/>
<rect x="0" y="350" width="400" height="50" fill="#1a4a3a" opacity="0.5"/>
</svg>`)
  }

  if (p.includes('портрет') || p.includes('portrait') || p.includes('лицо') || p.includes('face') || p.includes('человек') || p.includes('person')) {
    return toUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2a1a3a"/><stop offset="100%" stop-color="#1a2a4a"/></linearGradient>
<radialGradient id="glow"><stop offset="0%" stop-color="#6644aa" stop-opacity="0.3"/><stop offset="100%" stop-color="#6644aa" stop-opacity="0"/></radialGradient></defs>
<rect width="400" height="400" fill="url(#bg)"/>
<circle cx="200" cy="200" r="150" fill="url(#glow)"/>
<circle cx="200" cy="170" r="55" fill="#e8c8a8" opacity="0.8"/>
<ellipse cx="200" cy="310" rx="75" ry="70" fill="#4a4a8a" opacity="0.7"/>
<circle cx="182" cy="162" r="7" fill="#3a2a2a" opacity="0.6"/>
<circle cx="218" cy="162" r="7" fill="#3a2a2a" opacity="0.6"/>
<ellipse cx="200" cy="182" rx="6" ry="4" fill="#c8a888" opacity="0.6"/>
<path d="M188,195 Q200,205 212,195" fill="none" stroke="#b89878" stroke-width="2" opacity="0.5"/>
<path d="M155,140 Q200,110 245,140" fill="none" stroke="#5a3a2a" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
</svg>`)
  }

  // Default: abstract geometric art
  const hue = (seed % 360)
  return toUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="hsl(${hue},40%,12%)"/><stop offset="100%" stop-color="hsl(${(hue+60)%360},50%,18%)"/></linearGradient></defs>
<rect width="400" height="400" fill="url(#bg)"/>
${Array.from({length: 6}, (_, i) => {
  const x = 40 + rand(i) * 320, y = 40 + rand(i+6) * 320
  const r = 30 + rand(i+12) * 60
  const h2 = (hue + rand(i+18) * 120) % 360
  return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="hsl(${h2.toFixed(0)},60%,60%)" opacity="${(0.1+rand(i+24)*0.2).toFixed(2)}"/>`
}).join('')}
${Array.from({length: 4}, (_, i) => {
  const x = 50 + rand(i+30) * 300, y = 50 + rand(i+36) * 300
  const s = 40 + rand(i+42) * 60
  const rot = rand(i+48) * 360
  const h2 = (hue + 30 + rand(i+54) * 90) % 360
  return `<rect x="${(x-s/2).toFixed(0)}" y="${(y-s/2).toFixed(0)}" width="${s.toFixed(0)}" height="${s.toFixed(0)}" rx="8" fill="hsl(${h2.toFixed(0)},50%,55%)" opacity="${(0.08+rand(i+60)*0.15).toFixed(2)}" transform="rotate(${rot.toFixed(0)},${x.toFixed(0)},${y.toFixed(0)})"/>`
}).join('')}
${Array.from({length: 3}, (_, i) => {
  const x1 = rand(i+70) * 400, y1 = rand(i+76) * 400
  const x2 = rand(i+82) * 400, y2 = rand(i+88) * 400
  return `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="white" stroke-width="2" opacity="0.08"/>`
}).join('')}
<text x="200" y="385" text-anchor="middle" fill="white" font-size="11" opacity="0.4" font-family="sans-serif">AI • ${prompt.slice(0,35)}</text>
</svg>`)
}
