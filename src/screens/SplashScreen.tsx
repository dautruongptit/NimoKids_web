import Bear from '../components/common/Bear';

export default function SplashScreen() {
  return <main className="splash-content">
    <div className="splash-stars">✦ <Bear /> ✦</div>
    <h1>guess<span>Game</span></h1>
    <p>Let's Play & Learn!</p>
    <div className="loading-dots"><i /><i /><i /></div>
  </main>;
}
