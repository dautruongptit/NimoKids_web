/** Decorative background (clouds, sparkles, rainbow, hills). Purely visual, hidden from assistive tech. */
export default function Scenery() {
  return <div className="scenery" aria-hidden="true"><div className="cloud cloud-one" /><div className="cloud cloud-two" /><span className="decor star-one">✦</span><span className="decor star-two">✦</span><span className="decor heart-one">♡</span><span className="decor sparkle-one">✧</span><span className="decor sparkle-two">✧</span><span className="bubble bubble-one" /><span className="bubble bubble-two" /><div className="rainbow"><i /><i /><i /></div><div className="hill hill-one" /><div className="hill hill-two" /></div>;
}
