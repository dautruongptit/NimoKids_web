type FooterProps = {
  variant: 'home' | 'game';
};

export default function Footer({ variant }: FooterProps) {
  if (variant === 'game') {
    return <footer className="game-footer">Little steps. Big smiles. <span>♡</span></footer>;
  }
  return <footer className="home-footer">
    <div className="footer-left">
      <span className="footer-icon">🛡</span>
      <div>
        <strong>Safe Digital Playroom for Toddlers</strong>
        <span>No ads, gentle guidance, and endless little smiles</span>
      </div>
    </div>
    <span className="footer-center">🤝 Ages 1-5 &bull; No accounts required</span>
    <div className="footer-right">
      <span>&copy; 2026 NimoKids.</span>
      <span>Made with love for little hands.</span>
    </div>
  </footer>;
}
