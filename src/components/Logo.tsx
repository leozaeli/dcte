export default function Logo({ height = 48 }: { height?: number }) {
  const id = `logo-${height}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 120" className="logo-svg" style={{ height }}>
      <defs>
        <linearGradient id={`goldGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`whiteGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <filter id={`logoGlow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(10, 10)">
        <path d="M45,20 H68 C84,20 94,30 94,50 C94,70 84,80 68,80 H45 Z" fill={`url(#whiteGrad-${id})`} />
        <path d="M57,31.5 H67 C75,31.5 81,37 81,50 C81,63 75,68.5 67,68.5 H57 Z" fill="#090a0c" />
        <polygon points="34,10 50,44 38,44 47,81 21,47 33,47" fill={`url(#goldGrad-${id})`} filter={`url(#logoGlow-${id})`} />
        <path d="M37,45 Q48,56 42,67 Q36,76 49,79" fill="none" stroke={`url(#goldGrad-${id})`} strokeWidth="3" strokeLinecap="round" />
        <rect x="47" y="74.5" width="8" height="10" rx="2" fill={`url(#goldGrad-${id})`} transform="rotate(15 47 74.5)" />
        <line x1="51" y1="84.5" x2="52.5" y2="89.5" stroke={`url(#goldGrad-${id})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="56" y1="82.5" x2="57.5" y2="87.5" stroke={`url(#goldGrad-${id})`} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <text x="110" y="76" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="64" fill={`url(#goldGrad-${id})`} letterSpacing="1">CTE</text>
      <text x="112" y="96" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="15" fill="#FFFFFF" letterSpacing="2">DEIVIDSON CHARLES</text>
      <text x="112" y="112" fontFamily="'Outfit', sans-serif" fontWeight="600" fontSize="11.5" fill={`url(#goldGrad-${id})`} letterSpacing="1.5">TÉCNICO EM ELETROTÉCNICA</text>
    </svg>
  );
}
