type ProgressStarsProps = {
  /** Zero-based index of the current question. */
  index: number;
  total: number;
};

export default function ProgressStars({ index, total }: ProgressStarsProps) {
  return <div className="progress-stars" aria-label={`Question ${index + 1} of ${total}`}>
    {Array.from({ length: total }, (_, position) => <span key={position} className={position <= index ? 'filled' : ''}>★</span>)}
  </div>;
}
