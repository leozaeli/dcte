import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DCTE - Deividson Charles | Técnico em Eletrotécnica';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#090a0c',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          top: -100,
          left: -100,
        }}
      />

      {/* Logo area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, zIndex: 1 }}>

        {/* Lightning bolt + DCTE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          {/* Lightning bolt SVG */}
          <svg width="72" height="96" viewBox="0 0 50 80" fill="none">
            <polygon
              points="28,4 40,38 30,38 36,76 10,42 22,42"
              fill="url(#gold)"
            />
            <defs>
              <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>

          {/* DCTE text */}
          <div style={{ display: 'flex', gap: 0 }}>
            <span style={{ fontSize: 128, fontWeight: 900, color: '#FFFFFF', letterSpacing: -4, lineHeight: 1 }}>
              D
            </span>
            <span
              style={{
                fontSize: 128,
                fontWeight: 900,
                letterSpacing: -4,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              CTE
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 480,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #F59E0B, #FCD34D, transparent)',
            marginBottom: 24,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: 8,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          Deividson Charles
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: '#F59E0B',
            letterSpacing: 5,
            textTransform: 'uppercase',
          }}
        >
          Técnico em Eletrotécnica
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {['NBR 5410', 'NR-10', 'CFT/CRT Ativo', 'CNPJ 65.714.300/0001-88'].map(t => (
          <div
            key={t}
            style={{
              fontSize: 18,
              color: 'rgba(245,158,11,0.7)',
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
