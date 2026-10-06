import Bear from '../common/Bear';

export default function WelcomeHero() {
  return <section className="welcome">
    <div className="welcome-copy">
      <span className="eyebrow"><span /> A LITTLE PLAY. A LOT OF WONDER.</span>
      <h1>Ready, set,<br /><span>let's play!</span><svg viewBox="0 0 200 20" aria-hidden="true"><path d="M4 13Q90 -2 194 9" /></svg></h1>
      <p>A world of little discoveries.<br />What will we learn today?</p>
      <div className="hero-chips"><span>👀 Look</span><span>👆 Tap</span><span>🎉 Celebrate</span></div>
    </div>
    <div className="welcome-bear">
      <span className="speech-bubble">Hi, little explorer! <span>♡</span></span>
      <span className="bear-star">✦</span>
      <Bear />
      <div className="bear-platform" />
      <span className="bear-heart">♥</span>
    </div>
  </section>;
}
