type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SignInModal({ open, onClose }: SignInModalProps) {
  if (!open) return null;

  return <div className="modal-overlay" onClick={onClose}>
    <div className="modal-card" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
      <p className="modal-subtitle">FOR GROWN-UPS &bull; ALWAYS OPTIONAL</p>
      <div className="modal-icon">🌈</div>
      <h2>Save Your Progress! 🌟</h2>
      <p>Sign in to keep your progress, achievements, and game history.</p>
      <ul className="modal-benefits">
        <li>🌟 Little achievements</li>
        <li>📊 Happy game memories</li>
        <li>🤝 Pick up where you left off</li>
      </ul>
      <button className="squishy-btn google-btn" type="button">
        <span className="google-icon">G</span> Continue with Google
      </button>
      <button className="squishy-btn lavender-btn modal-skip" type="button" onClick={onClose}>
        Continue without signing in
      </button>
      <p className="modal-note">No account needed to play. Not now. Not ever. 🤝</p>
    </div>
  </div>;
}
