import Bear from '../common/Bear';

type WelcomeHeroProps = {
  onPlay?: () => void;
};

export default function WelcomeHero({ onPlay }: WelcomeHeroProps) {
  return <section className="home-welcome">
    <div className="home-welcome-copy">
      <span className="welcome-pill">✨ A happy little place to learn</span>
      <h1>Little discoveries.<br /><span>Big happy smiles.</span></h1>
      <p>Look, listen, and play your way into a world of wonder.<br />A little adventure made just for your little one.</p>
      {onPlay && <button className="squishy-btn primary hero-cta" onClick={onPlay}>
        {"Let's Play! 🎈 ▶"}
      </button>}
      <span className="hero-subtitle">For curious little minds, ages 1-5</span>
      <div className="home-features">
        <span>👀 Look</span><i aria-hidden="true">→</i>
        <span>👆 Tap</span><i aria-hidden="true">→</i>
        <span>🌟 Celebrate</span>
      </div>
    </div>
    <div className="home-photo">
      <Bear />
      <span className="floating-pill">💛 Little steps. Big wonder.</span>
      <span className="photo-note">Your next adventure starts here! ✨</span>
    </div>
  </section>;
}
