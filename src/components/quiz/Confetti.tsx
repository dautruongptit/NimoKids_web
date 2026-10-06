const PIECES = 12;

/** Celebration sparkles shown over the question card after a correct answer. */
export default function Confetti() {
  return <div className="confetti" aria-hidden="true">
    {Array.from({ length: PIECES }, (_, position) => <i key={position} className={`confetti-${position % 4}`}>✦</i>)}
  </div>;
}
