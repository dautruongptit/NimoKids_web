type FooterProps = {
  /** "home" sits inside the home page, "game" closes the quiz and result pages. */
  variant: 'home' | 'game';
};

export default function Footer({ variant }: FooterProps) {
  if (variant === 'game') {
    return <footer className="game-footer">Little steps. Big smiles. <span>♡</span></footer>;
  }
  return <footer><span>Made for little curious minds <span>♡</span></span><span>Just play. No sign-up. Always a little joy.</span></footer>;
}
