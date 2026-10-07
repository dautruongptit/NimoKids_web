import Bear from '../common/Bear';

export default function WelcomeHero() {
  return <section className="home-welcome">
    <div className="home-welcome-copy">
      <span className="welcome-pill">✨ A happy little place to learn</span>
      <h1>Little discoveries.<br /><span>Big happy smiles.</span></h1>
      <p>Look, listen, and play your way into a world of wonder.<br />A little adventure made just for your little one.</p>
      <div className="home-features">
        <span>👀 Look</span><i aria-hidden="true">→</i>
        <span>👆 Tap</span><i aria-hidden="true">→</i>
        <span>🌟 Celebrate</span>
      </div>
    </div>
    <div className="home-photo">
      <Bear />
      <span className="photo-note">Your next adventure starts here! ✨</span>
      <span className="floating-pill">💛 Little steps. Big wonder.</span>
    </div>
  </section>;
}
