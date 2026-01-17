export const CodeTerminal = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="18" y="16" width="2" height="2" fill="currentColor" opacity="0.6">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
    </rect>
  </svg>
);

export const NeuralCore = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="9.5" y1="7.5" x2="10.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14.5" y1="7.5" x2="13.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8.5" y1="16.5" x2="10.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15.5" y1="16.5" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PrecisionTarget = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.8" />
    <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CodeShield = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const AchievementTrophy = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M18 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="3" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export const EnergyZap = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  </svg>
);

export const Zap = EnergyZap;

export const PulseActivity = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const Activity = PulseActivity;

export const SecureLock = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.6" />
  </svg>
);

export const RunPlay = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
  </svg>
);

export const VerifiedCheck = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const CodeFile = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Processor = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="4" y1="10" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="4" y1="14" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="4" x2="10" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="4" x2="14" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="20" x2="10" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="20" x2="14" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Sparkles = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="19" cy="19" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="5" cy="19" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="19" cy="5" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);

export const TrendingUp = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const AwardMedal = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 14v6M8 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 8l1.5 3L12 9l1.5 2L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const Eye = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export const EyeOff = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChevronDown = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const Skull = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 10L9.01 10M15 10L15.01 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 20v-2h8v2M12 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 4c4.418 0 8 3.358 8 7.5c0 1.901-.755 3.637-2 4.933V18c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-1.567C4.755 15.137 4 13.401 4 11.5 4 7.358 7.582 4 12 4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export const ShieldAlert = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L3 7v9c0 5 9 8 9 8s9-3 9-8V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Heart = ({ size = 24, className = "", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
