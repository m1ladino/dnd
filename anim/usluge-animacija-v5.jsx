const W = 1920, H = 1080, G = 820;
const MOTION = {
  enter: (p) => Easing.easeOutExpo(p),
  draw: (p) => Easing.easeInOutCubic(p),
  pop: (p) => Easing.easeOutBack(p),
};
const prog = (T, a, b) => clamp((T - a) / (b - a), 0, 1);
const frac = (x) => ((x % 1) + 1) % 1;
const lerp = (a, b, p) => a + (b - a) * p;
const hump = (p) => Math.sin(Math.PI * p);
const Y = '#FFBF04', Y2 = '#D99F00', DARK = '#2A2C2F', GRAY = '#8A8D91', LIGHT = '#C9C8C3', BG = '#F7F6F2', DISC = '#ECEAE3', GLASS = '#E4E2DC', WINOFF = '#46494D';
const STRIPES = `repeating-linear-gradient(-45deg, ${Y} 0 22px, ${DARK} 22px 44px)`;
const SHIELD = 'polygon(50% 0, 100% 14%, 100% 52%, 50% 100%, 0 52%, 0 14%)';
const KEYS = ['BZR', 'Sredina', 'Vanredne', 'Plan', 'Hemikalije', 'PrvaPomoc', 'Kraj'];

const GRAD = {
  [Y]: 'linear-gradient(150deg, #FFD24D 0%, #FFBF04 42%, #DDA000 100%)',
  [DARK]: 'linear-gradient(150deg, #4C4F54 0%, #2A2C2F 55%, #1B1C1F 100%)',
  [GRAY]: 'linear-gradient(150deg, #A7AAAE 0%, #8A8D91 50%, #6C6F73 100%)',
  [WINOFF]: 'linear-gradient(160deg, #56595E 0%, #393B3F 100%)',
  [GLASS]: 'linear-gradient(120deg, #FFFFFF 0%, #ECEAE5 40%, #D4D1C9 100%)',
  '#FFFFFF': 'linear-gradient(180deg, #FFFFFF 0%, #DCDCDA 100%)',
};
const FLAMEG = 'radial-gradient(circle at 35% 65%, #FFF1A0 0%, #FFBF04 40%, #E39500 100%)';
const CORE = 'radial-gradient(circle at 35% 65%, #FFFFFF 0%, #FFF4B8 100%)';
const SHADOW = 'drop-shadow(0 18px 22px rgba(42,44,47,0.18))';
const A = (l, t, w, h, bg, x) => ({ position: 'absolute', left: l, top: t, width: w, height: h, background: GRAD[bg] || bg, ...x });
const D = (s) => <div style={s}></div>;
const Disc = ({ cx, cy, d, p }) => D(A(cx - d / 2, cy - d / 2, d, d, 'radial-gradient(circle at 38% 30%, #FBFAF7 0%, #ECEAE3 55%, #DDDAD1 100%)', { borderRadius: '50%', opacity: p, transform: `scale(${0.85 + 0.15 * p})` }));

function Worker({ x, bob, legA, armL, armR, vest, sy, s, o }) {
  return (
    <div style={{ position: 'absolute', left: x, top: G - bob, width: 0, height: 0, opacity: o, transformOrigin: '0 0', transform: `scale(${s}) scaleY(${sy})` }}>
      <div style={A(-40, -150, 34, 150, '#3A3C40', { borderRadius: 17, transformOrigin: '17px 10px', transform: `rotate(${legA}deg)` })}>{D(A(-6, 128, 52, 26, DARK, { borderRadius: '12px 22px 8px 8px' }))}</div>
      <div style={A(6, -150, 34, 150, DARK, { borderRadius: 17, transformOrigin: '17px 10px', transform: `rotate(${-legA}deg)` })}>{D(A(-6, 128, 52, 26, DARK, { borderRadius: '12px 22px 8px 8px' }))}</div>
      <div style={A(-88, -312, 26, 140, '#3A3C40', { borderRadius: 13, transformOrigin: '13px 13px', transform: `rotate(${armL}deg)` })}>{D(A(-3, 116, 32, 32, GRAY, { borderRadius: '50%' }))}</div>
      {D(A(-16, -344, 32, 30, DARK, { borderRadius: 8 }))}
      <div style={A(-62, -322, 124, 186, DARK, { borderRadius: '42px 42px 20px 20px', overflow: 'hidden' })}>
        <div style={A(0, 186 * (1 - vest), 124, 186, Y)}>
          {D(A(0, 96, 124, 16, '#FFFFFF'))}
          {D(A(0, 124, 124, 16, '#FFFFFF'))}
          {D(A(58, 0, 8, 96, 'rgba(0,0,0,0.12)'))}
        </div>
        {D(A(0, 168, 124, 18, '#1B1C1F'))}
        {D(A(52, 168, 20, 18, GRAY, { borderRadius: 3 }))}
        {D(A(70, 0, 54, 186, 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 100%)'))}
      </div>
      <div style={A(62, -312, 26, 140, DARK, { borderRadius: 13, transformOrigin: '13px 13px', transform: `rotate(${armR}deg)` })}>{D(A(-3, 116, 32, 32, GRAY, { borderRadius: '50%' }))}</div>
      <div style={A(-44, -420, 88, 88, DARK, { borderRadius: '50%', overflow: 'hidden' })}>{D(A(12, 10, 34, 26, 'rgba(255,255,255,0.14)', { borderRadius: '50%' }))}</div>
    </div>
  );
}

function Helmet({ x, y, s, r, o }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, opacity: o, transform: `scale(${s}) rotate(${r}deg)` }}>
      {D(A(-60, -68, 120, 68, Y, { borderRadius: '60px 60px 4px 4px' }))}
      {D(A(-8, -64, 16, 56, Y2, { borderRadius: 8 }))}
      {D(A(-74, -12, 148, 18, Y, { borderRadius: 9, boxShadow: '0 6px 10px rgba(0,0,0,0.18)' }))}
      {D(A(-46, -60, 34, 22, 'rgba(255,255,255,0.5)', { borderRadius: '24px 24px 8px 8px', transform: 'rotate(-24deg)' }))}
    </div>
  );
}

const ICONS = {
  helmet: { d: ['M4.5 16v-2a7.5 7.5 0 0 1 15 0v2', 'M10 7V11.5', 'M14 7V11.5', 'M3 16h18v3.5H3z'], fill: 'M4.5 16v-2a7.5 7.5 0 0 1 15 0v2z' },
  recycle: { d: ['M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5', 'M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12', 'm14 16-3 3 3 3', 'M8.293 13.596 7.196 9.5 3.1 10.598', 'm9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843', 'm13.378 9.633 4.096 1.098 1.097-4.096'], fill: 'M12 8.5l4.2 7.5H7.8z' },
  warning: { d: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'], fill: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z' },
  shield: { d: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'], fill: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' },
  tube: { d: ['M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3', 'm16 2 6 6', 'M12 16H4'], fill: 'M12 16 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L4 16z' },
  cross: { d: ['M9 3h6v6h6v6h-6v6H9v-6H3V9h6z'], fill: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z' },
};
const KINDS = ['helmet', 'recycle', 'warning', 'shield', 'tube', 'cross'];

function Badge({ kind, x, y, size = 150, p = 1, draw = 1 }) {
  const ic = ICONS[kind];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: size * 0.2, background: Y, boxShadow: '0 20px 40px rgba(42,44,47,0.16), inset 0 -4px 0 rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(p, 0, 0.15), transform: `scale(${p}) rotate(${(1 - p) * -10}deg)` }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
        <path d={ic.fill} fill={DARK} stroke="none" opacity={0.2 * prog(draw, 0.6, 1)}></path>
        {ic.d.map((d, i) => <path key={i} d={d} pathLength="1" strokeDasharray="1.02" strokeDashoffset={1.02 * (1 - prog(draw, i * 0.08, 0.7 + i * 0.05))}></path>)}
      </svg>
    </div>
  );
}

function Glyph({ kind, color = DARK }) {
  const P = {
    helmet: [A(30, 60, 140, 80, color, { borderRadius: '70px 70px 6px 6px' }), A(15, 135, 170, 22, color, { borderRadius: 11 })],
    leaf: [A(45, 45, 110, 110, color, { borderRadius: '100% 0' }), A(30, 96, 140, 8, Y, { transform: 'rotate(-45deg)' })],
    flame: [A(52, 62, 96, 96, color, { borderRadius: '50% 0 50% 50%', transform: 'rotate(-45deg)' }), A(80, 112, 40, 40, Y, { borderRadius: '50% 0 50% 50%', transform: 'rotate(-45deg)' })],
    shield: [A(45, 30, 110, 140, color, { clipPath: SHIELD })],
    flask: [A(82, 30, 36, 64, color), A(70, 24, 60, 14, color, { borderRadius: 7 }), A(50, 80, 100, 100, color, { borderRadius: '50%' })],
    cross: [A(75, 35, 50, 130, color, { borderRadius: 8 }), A(35, 75, 130, 50, color, { borderRadius: 8 })],
  }[kind];
  return <div style={{ position: 'relative', width: 200, height: 200 }}>{P.map((s, i) => <div key={i} style={s}></div>)}</div>;
}

function Intro({ T }) {
  const p = MOTION.pop(prog(T, 0.15, 0.85));
  return <div>{D(A(520 - 300, 520 - 300, 600, 600, Y, { borderRadius: '50%', transform: `scale(${p})` }))}</div>;
}

function Cone({ x, p }) {
  return (
    <div style={{ position: 'absolute', left: x, top: G, width: 0, height: 0, transform: `scale(${p})`, transformOrigin: '0 0', WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 14%)', maskImage: 'linear-gradient(180deg, transparent 0, #000 14%)' }}>
      <div style={A(-60, -176, 120, 162, Y, { clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' })}>{D(A(0, 70, 120, 28, DARK))}</div>
      {D(A(-80, -18, 160, 18, DARK, { borderRadius: 4 }))}
    </div>
  );
}

function S1({ T, c }) {
  const ck = MOTION.pop(prog(T, c + 2.7, c + 3.1));
  return (
    <div>
      <Disc cx={1300} cy={520} d={760} p={MOTION.enter(prog(T, c - 0.6, c + 0.4))}></Disc>
      <Cone x={1060} p={MOTION.pop(prog(T, c + 2.2, c + 2.6))}></Cone>
      <Cone x={1540} p={MOTION.pop(prog(T, c + 2.35, c + 2.75))}></Cone>
      <div style={A(1245, 300, 110, 110, DARK, { borderRadius: '50%', transform: `scale(${ck})` })}>
        {D(A(30, 28, 50, 26, 'transparent', { borderLeft: `12px solid ${Y}`, borderBottom: `12px solid ${Y}`, transform: 'rotate(-45deg)' }))}
      </div>
    </div>
  );
}

function S2({ T, c }) {
  const sun = MOTION.enter(prog(T, c - 0.2, c + 1.3));
  const stem = MOTION.draw(prog(T, c + 0.7, c + 1.9));
  const sh = 300 * stem;
  const l1 = MOTION.pop(prog(T, c + 1.2, c + 1.6)), l2 = MOTION.pop(prog(T, c + 1.5, c + 1.9)), bud = MOTION.pop(prog(T, c + 1.8, c + 2.2));
  const dirty = 1 - prog(T, c + 1.4, c + 2.6);
  const clean = MOTION.pop(prog(T, c + 2.4, c + 2.9));
  const base = G - 50;
  return (
    <div>
      <div style={{ position: 'absolute', left: 1250, top: lerp(700, 360, sun), width: 0, height: 0, opacity: prog(T, c - 0.2, c + 0.3) }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `rotate(${T * 18}deg)` }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => D(A(-8, -230, 16, 50, Y, { borderRadius: 8, transformOrigin: '8px 230px', transform: `rotate(${k * 36}deg)`, key: k })))}
        </div>
        {D(A(-150, -150, 300, 300, 'radial-gradient(circle at 38% 32%, #FFE680 0%, #FFBF04 55%, #E0A800 100%)', { borderRadius: '50%', boxShadow: '0 0 160px 60px rgba(255,191,4,0.32)' }))}
      </div>
      {D(A(1100, base, 300, 50, GRAY, { borderRadius: '150px 150px 0 0 / 50px 50px 0 0' }))}
      {D(A(1244, base - sh, 12, sh, DARK, { borderRadius: 6 }))}
      {D(A(1250 - 116, base - 140 - 116, 116, 116, DARK, { borderRadius: '0 100%', transformOrigin: '100% 100%', transform: `scale(${l1})` }))}
      {D(A(1250, base - 220 - 116, 116, 116, DARK, { borderRadius: '100% 0', transformOrigin: '0 100%', transform: `scale(${l2})` }))}
      {D(A(1220, base - 330, 60, 60, DARK, { borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', transform: `scale(${bud})` }))}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const ph = frac((T - c) * 0.6 + k / 6);
        const s = 50 + ph * 110;
        return D(A(1728 + ph * 140 - s / 2, G - 350 - ph * 300 - s / 2, s, s, ph < 0.5 ? GRAY : LIGHT, { borderRadius: '50%', opacity: (1 - ph) * dirty, key: k }));
      })}
      {D(A(1700, G - 350, 56, 160, GRAY))}
      <div style={A(1480, G - 200, 300, 200, GRAY)}>{[0, 1, 2].map((k) => D(A(34 + k * 88, 70, 56, 56, clean > 0.5 ? Y : WINOFF, { key: k, transform: `scale(${clean > 0 ? 0.8 + 0.2 * clean : 1})` })))}</div>
      {[0, 1].map((k) => D(A(1480 + k * 100, G - 270, 100, 70, GRAY, { clipPath: 'polygon(0 100%, 100% 0, 100% 100%)', key: k })))}
    </div>
  );
}

function Flame({ x, s, color, T, k, out }) {
  const f = 1 + 0.08 * Math.sin(T * 13 + k * 2.1);
  return (
    <div style={{ position: 'absolute', left: x, top: G - 40, width: 0, height: 0, transformOrigin: '0 0', transform: `scale(${out}) scaleY(${f}) scaleX(${2 - f})` }}>
      {D(A(-s / 2, -s * 1.25, s, s, color === Y ? FLAMEG : CORE, { borderRadius: '50% 0 50% 50%', transform: 'rotate(-45deg)' }))}
    </div>
  );
}

function S3({ T, c, raise }) {
  const app = MOTION.enter(prog(T, c - 0.8, c + 0.2));
  const out = app * (1 - MOTION.draw(prog(T, c + 1.6, c + 2.9)));
  const sp = prog(T, c + 1.0, c + 1.15) * (1 - prog(T, c + 2.8, c + 3.0));
  const alarm = out > 0.05;
  const ring = frac((T - c) * 1.3);
  const steam = prog(T, c + 2.6, c + 3.2) * (1 - prog(T, c + 3.6, c + 4.2));
  return (
    <div>
      <Disc cx={1350} cy={520} d={760} p={MOTION.enter(prog(T, c - 0.6, c + 0.4))}></Disc>
      {D(A(1628, G - 360, 16, 360, GRAY))}
      {alarm && D(A(1636 - 40, G - 430 - 40, 80, 80, 'transparent', { border: `6px solid ${Y}`, borderRadius: '50%', boxSizing: 'border-box', opacity: 1 - ring, transform: `scale(${1 + ring * 2.4})` }))}
      {D(A(1596, G - 432, 80, 72, alarm ? (Math.sin(T * 14) > 0 ? Y : '#FFFFFF') : GRAY, { borderRadius: '40px 40px 8px 8px', border: `5px solid ${DARK}`, boxSizing: 'border-box' }))}
      {D(A(1230, G - 44, 240, 30, DARK, { borderRadius: 15, transform: 'rotate(9deg)' }))}
      {D(A(1230, G - 44, 240, 30, DARK, { borderRadius: 15, transform: 'rotate(-9deg)' }))}
      {D(A(1350 - 300, G - 420, 600, 600, 'radial-gradient(circle, rgba(255,191,4,0.5) 0%, rgba(255,191,4,0) 62%)', { opacity: out * (0.85 + 0.15 * Math.sin(T * 9)) }))}
      <Flame x={1250} s={130} color={Y} T={T} k={1} out={out}></Flame>
      <Flame x={1455} s={120} color={Y} T={T} k={2} out={out}></Flame>
      <Flame x={1350} s={200} color={Y} T={T} k={0} out={out}></Flame>
      <Flame x={1350} s={100} color={'#FFFFFF'} T={T} k={3} out={out}></Flame>
      {[0, 1, 2].map((k) => {
        const ph = frac((T - c) * 0.8 + k / 3);
        const s = 60 + ph * 80;
        return D(A(1350 + (k - 1) * 70 - s / 2, G - 80 - ph * 280 - s / 2, s, s, LIGHT, { borderRadius: '50%', opacity: steam * (1 - ph), key: k }));
      })}
      {Array.from({ length: 18 }).map((_, k) => {
        const ph = frac((T - c) * 1.8 + k / 18);
        const s = 16 + ph * 44;
        const x = lerp(790, 1330, ph), y = lerp(566, 720, ph) + ((k % 5) - 2) * 34 * ph;
        return D(A(x - s / 2, y - s / 2, s, s, '#B9BBBE', { borderRadius: '50%', opacity: sp * (1 - ph * 0.7), key: k }));
      })}
      <div style={{ position: 'absolute', left: 700, top: 520, width: 0, height: 0, transformOrigin: '0 0', transform: `scale(${raise})` }}>
        {D(A(0, 10, 66, 130, DARK, { borderRadius: 22 }))}
        {D(A(0, 56, 66, 34, Y))}
        {D(A(17, -14, 32, 28, DARK, { borderRadius: 6 }))}
        {D(A(40, -10, 60, 14, DARK, { borderRadius: 7 }))}
      </div>
    </div>
  );
}

function S4({ T, c }) {
  const sh = MOTION.pop(prog(T, c + 0.1, c + 0.8));
  const scan = prog(T, c + 0.6, c + 1.7);
  const lock = MOTION.pop(prog(T, c + 2.3, c + 2.7));
  return (
    <div>
      {D(A(1040, 140, 580, 660, Y, { clipPath: SHIELD, transform: `scale(${sh})` }))}
      {D(A(1130, 382, 400, 26, DARK))}
      {D(A(1150, 400, 360, 420, DARK))}
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((col) => {
        const k = r * 3 + col;
        const on = T > c + 0.8 + k * 0.08;
        return D(A(1190 + col * 108, 430 + r * 76, 64, 50, on ? 'linear-gradient(160deg, #FFF0A0 0%, #FFBF04 70%)' : WINOFF, { key: k, boxShadow: on ? '0 0 26px rgba(255,191,4,0.75)' : 'none' }));
      }))}
      {scan > 0 && scan < 1 && D(A(1120, lerp(390, 820, scan), 420, 8, '#FFFFFF', { opacity: hump(scan) }))}
      <div style={{ position: 'absolute', left: 1330, top: G - 8, width: 0, height: 0, transformOrigin: '0 0', transform: `scale(${lock})` }}>
        {D(A(-34, -118, 68, 70, 'transparent', { border: `14px solid ${Y}`, borderBottom: 'none', borderRadius: '34px 34px 0 0', boxSizing: 'border-box' }))}
        {D(A(-52, -62, 104, 78, Y, { borderRadius: 14 }))}
        {D(A(-8, -44, 16, 30, DARK, { borderRadius: 8 }))}
      </div>
      {D(A(1510, 424, 44, 12, GRAY))}
      <div style={{ position: 'absolute', left: 1550, top: 430, width: 0, height: 0, transform: `rotate(${Math.sin((T - c) * 1.6) * 16 + 10}deg)` }}>
        {D(A(0, -22, 96, 44, GRAY, { borderRadius: 10 }))}
        {D(A(88, -14, 22, 28, DARK, { borderRadius: 6 }))}
      </div>
    </div>
  );
}

function S5({ T, c }) {
  const fill = 0.22 + 0.45 * MOTION.draw(prog(T, c + 0.4, c + 1.6));
  const bub = prog(T, c + 0.9, c + 1.3);
  const dia = MOTION.pop(prog(T, c + 1.9, c + 2.4));
  const sprayP = prog(T, c + 2.5, c + 3.5);
  const trig = hump(frac((T - c - 2.5) * 2.5)) * (sprayP > 0 && sprayP < 1 ? 1 : 0);
  return (
    <div>
      <Disc cx={1300} cy={520} d={760} p={MOTION.enter(prog(T, c - 0.6, c + 0.4))}></Disc>
      <div style={A(1100, 510, 300, 300, GLASS, { border: `10px solid ${DARK}`, borderRadius: '50%', overflow: 'hidden', boxSizing: 'border-box' })}>
        {D(A(0, 280 * (1 - fill), 300, 300, Y))}
      </div>
      {D(A(1200, 350, 100, 184, GLASS, { borderLeft: `10px solid ${DARK}`, borderRight: `10px solid ${DARK}`, boxSizing: 'border-box' }))}
      {D(A(1176, 334, 148, 26, DARK, { borderRadius: 13 }))}
      {Array.from({ length: 9 }).map((_, k) => {
        const ph = frac((T - c) * 0.8 + k / 9);
        const s = 14 + (k % 3) * 8;
        const x = 1250 + (((k * 37) % 70) - 35) * (1 - ph * 0.6) + Math.sin(ph * 7 + k) * 8;
        return D(A(x - s / 2, lerp(770, 330, ph) - s / 2, s, s, '#FFFFFF', { borderRadius: '50%', border: `3px solid ${DARK}`, opacity: bub * (ph > 0.85 ? (1 - ph) / 0.15 : 1), key: k }));
      })}
      <div style={{ position: 'absolute', left: 1250, top: 200, width: 0, height: 0, transform: `scale(${dia}) rotate(${Math.sin((T - c) * 2) * 5}deg)` }}>
        {D(A(-68, -68, 136, 136, Y, { border: `10px solid ${DARK}`, boxSizing: 'border-box', transform: 'rotate(45deg)' }))}
        {D(A(-8, -46, 16, 56, DARK, { borderRadius: 8 }))}
        {D(A(-9, 20, 18, 18, DARK, { borderRadius: '50%' }))}
      </div>
      {D(A(1560, G - 190, 100, 190, GRAY, { borderRadius: '22px 22px 12px 12px' }))}
      {D(A(1575, G - 140, 70, 64, Y, { borderRadius: 6 }))}
      {D(A(1592, G - 232, 36, 44, DARK))}
      {D(A(1570, G - 266, 94, 38, DARK, { borderRadius: 10 }))}
      {D(A(1660, G - 258, 40, 16, DARK, { borderRadius: 4 }))}
      {D(A(1624, G - 232, 16, 44, DARK, { borderRadius: 6, transformOrigin: '8px 0', transform: `rotate(${-trig * 22}deg)` }))}
      {Array.from({ length: 12 }).map((_, k) => {
        const ph = frac((T - c) * 1.6 + k / 12);
        const s = 10 + ph * 34;
        const on = sprayP > 0 && sprayP < 1 ? 1 : 0;
        return D(A(1706 + ph * 170 - s / 2, G - 250 + ((k % 5) - 2) * 26 * ph - s / 2, s, s, '#B9BBBE', { borderRadius: '50%', opacity: on * (1 - ph), key: k }));
      })}
    </div>
  );
}

function S6({ T, c }) {
  const drop = MOTION.enter(prog(T, c + 0.1, c + 0.8));
  const land = hump(prog(T, c + 0.55, c + 0.85));
  const cr = MOTION.pop(prog(T, c + 0.9, c + 1.4));
  const ecg = MOTION.draw(prog(T, c + 1.3, c + 2.4));
  const heart = MOTION.pop(prog(T, c + 2.2, c + 2.6));
  const beat = Math.pow(Math.max(0, Math.sin((T - c) * Math.PI * 2 * 1.2)), 8);
  return (
    <div>
      <Disc cx={1300} cy={520} d={760} p={MOTION.enter(prog(T, c - 0.6, c + 0.4))}></Disc>
      <svg style={{ position: 'absolute', left: 900, top: 190, overflow: 'visible' }} width="640" height="200" viewBox="0 0 640 200">
        <polyline points="0,100 250,100 285,30 325,170 360,55 385,100 640,100" fill="none" stroke={DARK} strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - ecg}></polyline>
      </svg>
      <div style={{ position: 'absolute', left: 1610, top: 290, width: 0, height: 0, transform: `scale(${heart * (1 + 0.14 * beat)})` }}>
        {D(A(-48, -38, 96, 96, Y, { transform: 'rotate(45deg)' }))}
        {D(A(-82, -70, 96, 96, Y, { borderRadius: '50%' }))}
        {D(A(-14, -70, 96, 96, Y, { borderRadius: '50%' }))}
      </div>
      <div style={{ position: 'absolute', left: 1300, top: G - (1 - drop) * 900, width: 0, height: 0, transformOrigin: '0 0', transform: `scaleY(${1 - 0.1 * land}) scaleX(${1 + 0.08 * land})`, opacity: prog(T, c + 0.1, c + 0.2) }}>
        {D(A(-70, -306, 140, 70, 'transparent', { border: `18px solid ${DARK}`, borderBottom: 'none', borderRadius: '34px 34px 0 0', boxSizing: 'border-box' }))}
        {D(A(-190, -250, 380, 250, Y, { borderRadius: 32 }))}
        <div style={{ position: 'absolute', left: 0, top: -125, width: 0, height: 0, transform: `scale(${cr}) rotate(${(1 - cr) * 90}deg)` }}>
          {D(A(-27, -76, 54, 152, DARK, { borderRadius: 8 }))}
          {D(A(-76, -27, 152, 54, DARK, { borderRadius: 8 }))}
        </div>
      </div>
    </div>
  );
}

function Finale({ T, c }) {
  const kinds = ['helmet', 'leaf', 'flame', 'shield', 'flask', 'cross'];
  return (
    <div>
      {kinds.map((k, i) => {
        const th = ((195 + i * 30) * Math.PI) / 180;
        const x = 960 + 480 * Math.cos(th), y = 610 + 480 * Math.sin(th) + Math.sin(T * 2 + i) * 8;
        const p = MOTION.pop(prog(T, c + 0.4 + i * 0.12, c + 0.85 + i * 0.12));
        return (
          <Badge key={k} kind={KINDS[i]} x={x - 85} y={y - 85} size={170} p={p} draw={prog(T, c + 0.5 + i * 0.12, c + 1.3 + i * 0.12)}></Badge>
        );
      })}
    </div>
  );
}

function Piece({ band }) {
  const { T, CUES, authoredTotal } = useComposition();
  const cues = KEYS.map((k) => CUES[k]);
  let pos = 0, walk = 0;
  cues.forEach((c) => { const f = prog(T, c - 1.0, c + 0.2); pos += MOTION.draw(f); walk += hump(f); });
  const [c1, , c3] = cues, K = cues[6];
  const camX = pos * W;
  const wx = 520 + 440 * MOTION.draw(prog(T, K - 1.0, K + 0.2));
  const phase = ((camX + wx) / W) * Math.PI * 2 * 3.5;
  const legA = Math.sin(phase) * 26 * walk;
  const cel = MOTION.pop(prog(T, K + 1.5, K + 2.0));
  const jump = hump(prog(T, K + 1.5, K + 2.1)) * 50;
  const bob = Math.abs(Math.sin(phase)) * 12 * walk + jump;
  const raise = MOTION.pop(prog(T, c3 + 0.5, c3 + 0.95)) * (1 - MOTION.draw(prog(T, c3 + 3.0, c3 + 3.4)));
  const vest = MOTION.draw(prog(T, c1 + 2.0, c1 + 2.5));
  const landB = hump(prog(T, c1 + 1.9, c1 + 2.2));
  const intro = MOTION.pop(prog(T, 0.45, 1.0));
  const ground = MOTION.draw(prog(T, 0, 0.9));
  let zoom = 1;
  cues.forEach((c, i) => { const nx = i < 6 ? cues[i + 1] - 1.0 : authoredTotal; zoom += 0.035 * hump(prog(T, c + 0.2, nx)); });
  // helmet
  const hAppear = MOTION.pop(prog(T, c1 + 0.2, c1 + 0.8));
  const fly = MOTION.draw(prog(T, c1 + 1.1, c1 + 1.9));
  const headTop = G - bob - 420 * (1 - 0.05 * landB);
  const hover = Math.sin((T - c1) * 3) * 12 * (1 - fly);
  const hx = lerp(1300, wx, fly), hy = lerp(520 + hover, headTop + 36, fly) - 240 * hump(fly);
  const hs = lerp(3 * hAppear, 1, fly);
  const idx = clamp(Math.round(pos), 1, 6);
  const dots = prog(T, c1 - 0.6, c1) * (1 - prog(T, K - 0.8, K - 0.2));
  const endFade = prog(T, authoredTotal - 0.7, authoredTotal - 0.05);
  const Scenes = [S1, S2, S3, S4, S5, S6];
  return (
    <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(ellipse 110% 85% at 50% 30%, #FFFFFF 0%, #F7F6F2 55%, #E9E6DF 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '960px 600px' }}>
        {D(A(-200, G, W + 400, H - G + 200, 'linear-gradient(180deg, #E4E1D9 0%, #EFEDE7 45%, #F7F6F2 100%)', { opacity: ground }))}
        <div style={{ position: 'absolute', left: 0, top: 0, width: W * 8, height: H, transform: `translateX(${-camX}px)` }}>
          <div style={A(0, 0, W, H, 'transparent', { filter: SHADOW })}><Intro T={T}></Intro></div>
          {Scenes.map((S, i) => (
            <div key={i} style={A((i + 1) * W, 0, W, H, 'transparent', { filter: SHADOW })}><S T={T} c={cues[i]} raise={raise}></S></div>
          ))}
          {KINDS.map((k, i) => <Badge key={k} kind={k} x={(i + 1) * W + 445 + 960 * 0} y={150 + Math.sin((T - cues[i]) * 2) * 8} size={150} p={MOTION.pop(prog(T, cues[i] - 0.1, cues[i] + 0.45))} draw={prog(T, cues[i] + 0.05, cues[i] + 1.0)}></Badge>)}
          <div style={A(7 * W, 0, W, H, 'transparent', { filter: SHADOW })}><Finale T={T} c={K}></Finale></div>
        </div>
        {D(A(-200, G, (W + 400) * ground, 6, DARK))}
        {band && D(A(-200, G + 6, (W + 400) * ground, 16, STRIPES, { backgroundPosition: `${-camX}px 0` }))}
        {D(A(wx - 120 * (1 - bob / 160), G - 16, 240 * (1 - bob / 160), 34, 'radial-gradient(ellipse at center, rgba(30,31,34,0.35) 0%, rgba(30,31,34,0) 70%)', { opacity: intro }))}
        <Worker x={wx} bob={bob} legA={legA} armL={-legA * 0.9 + cel * 150} armR={legA * 0.9 - raise * 78 - cel * 150} vest={vest} sy={1 - 0.05 * landB} s={intro} o={prog(T, 0.45, 0.5)}></Worker>
        <Helmet x={hx} y={hy} s={hs} r={-18 * (1 - fly) + 360 * fly} o={T > c1 + 0.2 ? 1 : 0}></Helmet>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, display: 'flex', justifyContent: 'center', gap: 14, opacity: dots }}>
        {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} style={{ width: n === idx ? 54 : 16, height: 16, borderRadius: 8, background: n === idx ? Y : LIGHT }}></div>)}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: BG, opacity: endFade, pointerEvents: 'none' }}></div>
    </div>
  );
}

function SafetyServicesV5() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <React.Fragment>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BG}>
        <Piece band={t.traka}></Piece>
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Animacija"></TweakSection>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)}></TweakToggle>
        <TweakToggle label="Traka upozorenja na tlu" value={t.traka} onChange={(v) => setTweak('traka', v)}></TweakToggle>
      </TweaksPanel>
    </React.Fragment>
  );
}
window.SafetyServicesV5 = SafetyServicesV5;


const HERO_SCENES = [{"name":"Uvod","dur":1.25,"nat":2.5},{"name":"BZR","dur":2.25,"nat":4.5},{"name":"Sredina","dur":2.25,"nat":4.5},{"name":"Vanredne","dur":2.25,"nat":4.5},{"name":"Plan","dur":2.25,"nat":4.5},{"name":"Hemikalije","dur":2.25,"nat":4.5},{"name":"PrvaPomoc","dur":2.25,"nat":4.5},{"name":"Kraj","dur":2.25,"nat":4.5}];

function HeroAnim(props) {
  const band = props.band == null ? true : String(props.band) !== 'false';
  const derived = React.useMemo(() => ccDerive(HERO_SCENES), []);
  const [time, setTime] = React.useState(0);
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0 });
    io.observe(el);
    let raf, last = null, t = 0;
    const tick = (ts) => {
      if (last != null && visible) { t = (t + Math.min(0.05, (ts - last) / 1000)) % derived.total; setTime(t); }
      last = ts; raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [derived]);
  const T = ccWarp(derived, time);
  const value = React.useMemo(() => ({ T, CUES: derived.table, time, duration: derived.total, authoredTotal: derived.authoredTotal, playing: true }), [T, time, derived]);
  const s = box.w && box.h ? Math.max(box.w / W, box.h / H) * 0.88 : 0;
  const FX = 975;
  const ox = s ? Math.min(0, Math.max(box.w - W * s, box.w / 2 - FX * s)) : 0;
  const oy = s ? box.h - H * s : 0;
  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: BG }}>
      {s > 0 && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transform: 'translate(' + ox + 'px,' + oy + 'px) scale(' + s + ')', transformOrigin: '0 0', WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 14%)', maskImage: 'linear-gradient(180deg, transparent 0, #000 14%)' }}>
          <CompositionContext.Provider value={value}><Piece band={band}></Piece></CompositionContext.Provider>
        </div>
      )}
    </div>
  );
}
window.HeroAnim = HeroAnim;

function ServiceMini(props) {
  const k = Math.max(0, Math.min(5, parseInt(props.k, 10) || 0));
  const S = [S1, S2, S3, S4, S5, S6][k];
  const C = 1, LOOP = 4.8, CX = 1310, CY = 500, R = 440;
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [t, setT] = React.useState(reduce ? 3.9 : 0);
  const [w, setW] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el);
    if (reduce) return () => ro.disconnect();
    let vis = false;
    const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting; }, { threshold: 0.2 }); io.observe(el);
    let raf, last = null, acc = 0;
    const tick = (ts) => {
      if (last != null && vis) { acc = (acc + Math.min(0.05, (ts - last) / 1000)) % LOOP; setT(acc); }
      last = ts; raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  const T = C - 0.7 + t;
  const s = w ? w / (R * 2) : 0;
  const fade = reduce ? 1 : 1 - prog(t, LOOP - 0.35, LOOP);
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', borderRadius: '50%', overflow: 'hidden' }}>
      {s > 0 && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transformOrigin: '0 0', transform: 'translate(' + (-(CX - R) * s) + 'px,' + (-(CY - R) * s) + 'px) scale(' + s + ')', opacity: fade }}>
          <div style={A(0, 0, W, H, 'transparent', { filter: SHADOW })}>
            <S T={T} c={C} raise={0}></S>
            {k === 0 && (() => {
              const ap = MOTION.pop(prog(T, C + 0.1, C + 0.7));
              const up = 0;
              const hov = Math.sin((T - C) * 3) * 12;
              return <Helmet x={1300} y={640 + hov} s={2.6 * ap} r={-12 + 8 * Math.sin((T - C) * 2)} o={1 - up}></Helmet>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
window.ServiceMini = ServiceMini;
