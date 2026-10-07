import type { AgeGroup } from '../types';

type AgeScreenProps = {
  onSelectAge: (age: AgeGroup) => void;
  onBack: () => void;
};

const AGE_OPTIONS: { age: AgeGroup; label: string; years: string; description: string; features: string[]; emoji: string; ctaIcon: string }[] = [
  {
    age: '1-3',
    label: 'First little discoveries',
    years: '1–3 YEARS',
    description: 'Big bright pictures, gentle sounds, and simple discoveries for little learners.',
    features: ['🖼️ Big bright pictures', '🎵 Gentle sounds', '✨ Easy little questions'],
    emoji: '🐱',
    ctaIcon: '⭐',
  },
  {
    age: '4-5',
    label: 'Curious little explorers',
    years: '4–5 YEARS',
    description: 'Growing curious minds with letters, numbers, and a colorful world of wonder.',
    features: ['💡 Curious thinking', '🔢 Numbers & letters', '🌍 Explore the world'],
    emoji: '🐻',
    ctaIcon: '🎨',
  },
];

export default function AgeScreen({ onSelectAge, onBack }: AgeScreenProps) {
  return <main className="age-page">
    <div className="age-top">
      <button className="back-btn" onClick={onBack}>← Back</button>
    </div>

    <div className="age-stepper">
      <span className="stepper-step active"><span className="stepper-num">1</span> Choose Age</span>
      <span className="stepper-arrow">›</span>
      <span className="stepper-step">Choose Topic</span>
      <span className="stepper-arrow">›</span>
      <span className="stepper-step">Play</span>
      <span className="stepper-arrow">›</span>
      <span className="stepper-step">Celebrate</span>
    </div>

    <div className="age-heading">
      <h1>⭐ Choose Your Age 🎈</h1>
      <p>Tap your age to begin a happy learning adventure!</p>
    </div>

    <div className="age-grid">
      {AGE_OPTIONS.map(opt => <button
        key={opt.age}
        className={`age-card${opt.age === '4-5' ? ' older' : ''}`}
        onClick={() => onSelectAge(opt.age)}
      >
        <div className="age-card-top">
          <span className="age-years">{opt.emoji} {opt.years}</span>
          <span className="age-icon">{opt.age === '1-3' ? '😊' : '🧭'}</span>
        </div>
        <div className="age-card-photo">
          <span className="age-photo-placeholder">{opt.emoji}</span>
        </div>
        <h2>{opt.label} {opt.age === '1-3' ? '🐚' : '🎒'}</h2>
        <p>{opt.description}</p>
        <div className="age-features">
          {opt.features.map(f => <span key={f}>{f}</span>)}
        </div>
        <span className="age-cta">Choose {opt.years} {opt.ctaIcon}</span>
      </button>)}
    </div>

    <div className="age-hint">
      <strong>One tap, and on to Choose Topic! ✨</strong>
      <p>Pick the little card that fits your child.</p>
    </div>
  </main>;
}
