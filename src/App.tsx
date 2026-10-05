import { useEffect, useRef, useState } from 'react';

type Item = { name: string; emoji: string };
type Topic = { name: string; emoji: string; color: string; items: Item[] };
const topics: Topic[] = [
  { name: 'Animals', emoji: '🐶', color: 'peach', items: [{ name: 'Cat', emoji: '🐱' }, { name: 'Dog', emoji: '🐶' }, { name: 'Elephant', emoji: '🐘' }, { name: 'Rabbit', emoji: '🐰' }, { name: 'Lion', emoji: '🦁' }, { name: 'Bear', emoji: '🐻' }, { name: 'Panda', emoji: '🐼' }] },
  { name: 'Food', emoji: '🍎', color: 'pink', items: [{ name: 'Apple', emoji: '🍎' }, { name: 'Banana', emoji: '🍌' }, { name: 'Strawberry', emoji: '🍓' }, { name: 'Carrot', emoji: '🥕' }, { name: 'Watermelon', emoji: '🍉' }, { name: 'Bread', emoji: '🍞' }] },
  { name: 'Vehicles', emoji: '🚙', color: 'blue', items: [{ name: 'Car', emoji: '🚗' }, { name: 'Bus', emoji: '🚌' }, { name: 'Train', emoji: '🚂' }, { name: 'Airplane', emoji: '✈️' }, { name: 'Bicycle', emoji: '🚲' }, { name: 'Boat', emoji: '⛵' }] },
  { name: 'Colors', emoji: '🌈', color: 'lavender', items: [{ name: 'Red', emoji: '🔴' }, { name: 'Blue', emoji: '🔵' }, { name: 'Yellow', emoji: '🟡' }, { name: 'Green', emoji: '🟢' }, { name: 'Purple', emoji: '🟣' }, { name: 'Orange', emoji: '🟠' }] },
  { name: 'Shapes', emoji: '🔷', color: 'lavender', items: [{ name: 'Circle', emoji: '🔵' }, { name: 'Square', emoji: '🟧' }, { name: 'Triangle', emoji: '🔺' }, { name: 'Star', emoji: '⭐' }, { name: 'Diamond', emoji: '🔷' }, { name: 'Heart', emoji: '💗' }] },
  { name: 'Ocean', emoji: '🐠', color: 'blue', items: [{ name: 'Fish', emoji: '🐠' }, { name: 'Octopus', emoji: '🐙' }, { name: 'Crab', emoji: '🦀' }, { name: 'Whale', emoji: '🐳' }, { name: 'Dolphin', emoji: '🐬' }, { name: 'Shell', emoji: '🐚' }] },
  { name: 'Nature', emoji: '🌳', color: 'mint', items: [{ name: 'Tree', emoji: '🌳' }, { name: 'Flower', emoji: '🌸' }, { name: 'Sun', emoji: '☀️' }, { name: 'Cloud', emoji: '☁️' }, { name: 'Rainbow', emoji: '🌈' }, { name: 'Butterfly', emoji: '🦋' }] },
  { name: 'Toys', emoji: '🧸', color: 'yellow', items: [{ name: 'Teddy', emoji: '🧸' }, { name: 'Ball', emoji: '⚽' }, { name: 'Kite', emoji: '🪁' }, { name: 'Puzzle', emoji: '🧩' }, { name: 'Drum', emoji: '🥁' }, { name: 'Rocket', emoji: '🚀' }] },
];

function Bear({ mood = 'happy', className = '' }: { mood?: string; className?: string }) {
  return <svg className={`bear ${className}`} viewBox="0 0 260 270" fill="none" role="img" aria-label={`Friendly ${mood} baby bear`}>
    <ellipse cx="133" cy="255" rx="78" ry="10" fill="#DCCDBA" opacity=".24" />
    <ellipse cx="131" cy="193" rx="64" ry="60" fill="#D89C69" />
    <ellipse cx="131" cy="202" rx="39" ry="38" fill="#F9DAB4" />
    <ellipse cx="86" cy="240" rx="29" ry="21" fill="#C98C5E" transform="rotate(-12 86 240)" />
    <ellipse cx="176" cy="240" rx="29" ry="21" fill="#C98C5E" transform="rotate(12 176 240)" />
    <ellipse cx="74" cy="175" rx="22" ry="38" fill="#D89C69" transform="rotate(27 74 175)" />
    <g className="bear-wave"><ellipse cx="205" cy="158" rx="21" ry="40" fill="#D89C69" transform="rotate(36 205 158)" /><ellipse cx="220" cy="134" rx="12" ry="16" fill="#F6CFAC" transform="rotate(36 220 134)" /></g>
    <circle cx="67" cy="57" r="33" fill="#D89C69" /><circle cx="67" cy="57" r="19" fill="#F0BE92" />
    <circle cx="191" cy="57" r="33" fill="#D89C69" /><circle cx="191" cy="57" r="19" fill="#F0BE92" />
    <path d="M130 38C79 38 46 66 46 109C46 155 79 177 130 177C181 177 215 155 215 109C215 65 181 38 130 38Z" fill="#E7B17E" />
    <path d="M64 98C68 61 101 46 135 46" stroke="#F5CBA1" strokeWidth="8" strokeLinecap="round" />
    <ellipse cx="131" cy="134" rx="39" ry="28" fill="#FFE4C5" />
    <ellipse cx="77" cy="127" rx="16" ry="10" fill="#F19D94" opacity=".7" /><ellipse cx="183" cy="127" rx="16" ry="10" fill="#F19D94" opacity=".7" />
    {mood === 'celebrating' ? <><path d="M85 105Q95 92 105 105M155 105Q165 92 175 105" stroke="#513A32" strokeWidth="7" strokeLinecap="round" /></> : <><ellipse cx="96" cy="105" rx="8" ry="11" fill="#513A32" /><ellipse cx="165" cy="105" rx="8" ry="11" fill="#513A32" /><circle cx="99" cy="101" r="3" fill="white" /><circle cx="168" cy="101" r="3" fill="white" /></>}
    <path d="M121 123Q131 116 141 123Q142 132 131 134Q120 131 121 123" fill="#654338" />
    {mood === 'surprised' ? <ellipse cx="131" cy="145" rx="6" ry="7" fill="#654338" /> : <path d="M117 141Q131 155 146 141" stroke="#654338" strokeWidth="4" strokeLinecap="round" />}
    <path d="M112 174L130 183L149 174L147 194L131 187L113 195Z" fill="#9D8AD5" /><circle cx="131" cy="184" r="6" fill="#B5A3E7" />
  </svg>;
}

function Animal({ name }: { name: string }) {
  if (name !== 'Cat' && name !== 'Dog' && name !== 'Rabbit') return null;
  const cat = name === 'Cat';
  const rabbit = name === 'Rabbit';
  const fur = cat ? '#F4B779' : rabbit ? '#EEE6DB' : '#C79469';
  return <svg className="animal-art" viewBox="0 0 300 270" role="img" aria-label={`Cute cartoon ${name.toLowerCase()}`}>
    <ellipse cx="150" cy="249" rx="87" ry="12" fill="#D7BC91" opacity=".24" />
    {cat && <path d="M205 218C269 225 271 163 252 151" fill="none" stroke={fur} strokeWidth="24" strokeLinecap="round" />}
    <ellipse cx="150" cy="191" rx="57" ry="57" fill={fur} /><ellipse cx="150" cy="198" rx="33" ry="36" fill="#FFF2DC" />
    <ellipse cx="113" cy="238" rx="26" ry="15" fill={fur} /><ellipse cx="187" cy="238" rx="26" ry="15" fill={fur} />
    {rabbit ? <><ellipse cx="112" cy="57" rx="23" ry="53" fill={fur} transform="rotate(-13 112 57)" /><ellipse cx="186" cy="57" rx="23" ry="53" fill={fur} transform="rotate(13 186 57)" /><ellipse cx="112" cy="54" rx="11" ry="36" fill="#F8B8BB" transform="rotate(-13 112 54)" /><ellipse cx="186" cy="54" rx="11" ry="36" fill="#F8B8BB" transform="rotate(13 186 54)" /></> : cat ? <><path d="M76 94L77 27Q107 30 124 64M177 62Q209 27 224 29L225 96" fill={fur} /><path d="M86 69L87 41L111 67M190 67L214 41L215 75" fill="#F5A89D" /></> : <><ellipse cx="80" cy="106" rx="29" ry="52" fill="#9B6A49" transform="rotate(16 80 106)" /><ellipse cx="219" cy="106" rx="29" ry="52" fill="#9B6A49" transform="rotate(-16 219 106)" /></>}
    <ellipse cx="150" cy="113" rx="80" ry="65" fill={fur} />
    {cat && <><path d="M135 51L139 71M150 50V73M165 51L161 71" stroke="#D78D4D" strokeWidth="8" strokeLinecap="round" /><path d="M76 108L92 113M74 125L91 124M224 108L208 113M226 125L209 124" stroke="#D78D4D" strokeWidth="6" strokeLinecap="round" /></>}
    <ellipse cx="121" cy="111" rx="8" ry="12" fill="#473B37" /><ellipse cx="180" cy="111" rx="8" ry="12" fill="#473B37" /><circle cx="124" cy="107" r="3" fill="white" /><circle cx="183" cy="107" r="3" fill="white" />
    <ellipse cx="104" cy="132" rx="13" ry="8" fill="#F59D9B" opacity=".8" /><ellipse cx="196" cy="132" rx="13" ry="8" fill="#F59D9B" opacity=".8" />
    <ellipse cx="150" cy="139" rx="29" ry="21" fill="#FFF0DD" /><path d="M142 129Q150 125 158 129Q157 137 150 138Q143 137 142 129" fill="#AA6E64" /><path d="M150 138V143M136 141Q143 151 150 143Q157 151 165 141" stroke="#76554B" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M130 171L151 181L171 171L168 192L151 185L132 193Z" fill={cat ? '#A592D4' : '#80BEB0'} /><circle cx="151" cy="182" r="5" fill="#CEBFF2" />
  </svg>;
}

function Speaker({ onClick, muted = false }: { onClick: () => void; muted?: boolean }) {
  return <button className="sound-button" onClick={onClick} aria-label={muted ? 'Turn sound on' : 'Read aloud'}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H3V15H6L11 19Z" />{muted ? <path d="M16 9L22 15M22 9L16 15" /> : <><path d="M15 8C18 10 18 14 15 16" /><path d="M18 5C23 9 23 15 18 19" /></>}</svg></button>;
}

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - .5);
type Question = { answer: Item; choices: Item[] };

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'home' | 'quiz' | 'result'>('splash');
  const [topic, setTopic] = useState(topics[0]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [muted, setMuted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const locked = useRef(false);
  const streak = useRef(0);
  const question = questions[index];

  useEffect(() => { const timeout = setTimeout(() => setScreen('home'), 1500); return () => clearTimeout(timeout); }, []);

  function say(text: string) {
    if (muted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = .85;
    utterance.pitch = 1.25;
    window.speechSynthesis.speak(utterance);
  }

  function start() {
    const answers = shuffle(topic.items).slice(0, 5);
    setQuestions(answers.map(answer => ({ answer, choices: shuffle([answer, ...shuffle(topic.items.filter(item => item.name !== answer.name)).slice(0, 3)]) })));
    setIndex(0); setSeconds(5); setScore(0); setBestStreak(0); streak.current = 0;
    setFeedback(null); setSelected(null); locked.current = false; setTransitioning(false); setScreen('quiz');
    say("Let's play! What is this?");
  }

  function answer(item: Item | null) {
    if (locked.current || transitioning) return;
    locked.current = true;
    const correct = item?.name === question.answer.name;
    setSelected(item?.name ?? null);
    setFeedback(!item ? 'timeout' : correct ? 'correct' : 'wrong');
    if (correct) { setScore(value => value + 1); streak.current += 1; setBestStreak(value => Math.max(value, streak.current)); }
    else streak.current = 0;
    say(correct ? 'Yay! Great job!' : `It's a ${question.answer.name}. You're doing great!`);
  }

  useEffect(() => {
    if (screen !== 'quiz' || feedback || transitioning) return;
    const interval = setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(interval);
  }, [screen, index, feedback, transitioning]);

  useEffect(() => { if (screen === 'quiz' && seconds === 0 && !feedback && !transitioning) answer(null); }, [seconds, screen, feedback, transitioning]);

  useEffect(() => {
    if (!feedback || screen !== 'quiz') return;
    const timeout = setTimeout(() => {
      if (index === 4) { setScreen('result'); say('You did great!'); }
      else setTransitioning(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, [feedback, screen, index]);

  useEffect(() => {
    if (!transitioning) return;
    const timeout = setTimeout(() => {
      setIndex(value => value + 1); setSeconds(5); setSelected(null); setFeedback(null); locked.current = false; setTransitioning(false);
    }, 350);
    return () => clearTimeout(timeout);
  }, [transitioning]);

  function home() { locked.current = true; setScreen('home'); setFeedback(null); setTransitioning(false); window.speechSynthesis?.cancel(); }

  return <div className={`app ${screen}`}>
    <div className="scenery" aria-hidden="true"><div className="cloud cloud-one" /><div className="cloud cloud-two" /><span className="decor star-one">✦</span><span className="decor star-two">✦</span><span className="decor heart-one">♡</span><span className="decor sparkle-one">✧</span><span className="decor sparkle-two">✧</span><span className="bubble bubble-one" /><span className="bubble bubble-two" /><div className="rainbow"><i /><i /><i /></div><div className="hill hill-one" /><div className="hill hill-two" /></div>
    {screen !== 'splash' && <header className="header"><button className="brand" onClick={home} aria-label="guessGame home"><Bear /><span>guess<span>Game</span><i>✦</i></span></button><div className="header-right">{screen === 'quiz' ? <span className="topic-badge">{topic.emoji} {topic.name}</span> : <span className="little-tag"><span>✦</span> Little minds. Big discoveries.</span>}<Speaker muted={muted} onClick={() => { setMuted(value => !value); window.speechSynthesis?.cancel(); }} /></div></header>}

    {screen === 'splash' && <main className="splash-content"><div className="splash-stars">✦ <Bear /> ✦</div><h1>guess<span>Game</span></h1><p>Let's Play & Learn!</p><div className="loading-dots"><i /><i /><i /></div></main>}

    {screen === 'home' && <main className="home-content"><section className="welcome"><div className="welcome-copy"><span className="eyebrow"><span /> A LITTLE PLAY. A LOT OF WONDER.</span><h1>Ready, set,<br /><span>let's play!</span><svg viewBox="0 0 200 20" aria-hidden="true"><path d="M4 13Q90 -2 194 9" /></svg></h1><p>A world of little discoveries.<br />What will we learn today?</p><div className="hero-chips"><span>👀 Look</span><span>👆 Tap</span><span>🎉 Celebrate</span></div></div><div className="welcome-bear"><span className="speech-bubble">Hi, little explorer! <span>♡</span></span><span className="bear-star">✦</span><Bear /><div className="bear-platform" /><span className="bear-heart">♥</span></div></section>
      <section className="topic-section" aria-labelledby="topic-title"><div className="section-heading"><h2 id="topic-title">Pick your little adventure <span>↴</span></h2><span>8 worlds to explore</span></div><div className="topic-grid">{topics.map(item => <button key={item.name} className={`topic-card ${item.color} ${topic.name === item.name ? 'chosen' : ''}`} onClick={() => { setTopic(item); say(item.name); }} aria-pressed={topic.name === item.name}><span className="topic-illustration">{item.emoji}</span><span className="topic-name">{item.name}</span>{topic.name === item.name && <span className="selected-check">✓</span>}<span className="topic-sparkle" aria-hidden="true">✧</span></button>)}</div></section>
      <div className="play-area"><button className="primary play-button" onClick={start}><span className="play-icon">▶</span> Let's play! <span className="button-sparkle">✦</span></button><p>5 little questions. So much fun!</p></div>
      <footer><span>Made for little curious minds <span>♡</span></span><span>Just play. No sign-up. Always a little joy.</span></footer>
    </main>}

    {screen === 'quiz' && question && <main className="quiz-content"><div className="quiz-top"><button className="back-home" onClick={home} aria-label="Return home">⌂ <span>Home</span></button><div className="progress-stars" aria-label={`Question ${index + 1} of 5`}>{Array.from({ length: 5 }, (_, position) => <span key={position} className={position <= index ? 'filled' : ''}>★</span>)}</div><span className="question-count">⭐ <strong>{index + 1}</strong> / 5</span></div>
      <section className={`question-card ${transitioning ? 'transitioning' : ''}`}><div className="question-heading"><div><span className="eyebrow">LET'S LOOK CLOSELY</span><h1>{topic.name === 'Colors' ? 'What color is this?' : 'What is this?'} <Speaker onClick={() => say(topic.name === 'Colors' ? 'What color is this?' : 'What is this?')} /></h1></div><div className={`timer ${seconds <= 2 && !feedback ? 'warning' : ''}`} aria-label={`${seconds} seconds remaining`}><svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="30" className="timer-track" /><circle cx="36" cy="36" r="30" className="timer-ring" strokeDasharray={`${seconds / 5 * 188.5} 188.5`} /></svg><span>{seconds}</span><small>seconds</small></div></div>
      <div className="question-image" key={index}><span className="image-star one">✦</span><span className="image-star two">✧</span><span className="image-dot" /><span className="image-dot second" />{['Cat', 'Dog', 'Rabbit'].includes(question.answer.name) ? <Animal name={question.answer.name} /> : <span className="large-emoji" role="img" aria-label={question.answer.name}>{question.answer.emoji}</span>}<span className="image-ground" /></div>
      <div className="answer-prompt">{feedback ? <span className={`feedback-text ${feedback}`} role="status">{feedback === 'correct' ? 'Yay! You got it! 🎉' : feedback === 'wrong' ? 'Almost! Keep exploring 💕' : "Oops! Time's up! ⏰"}</span> : <>Tap your answer <span>↓</span></>}</div>
      <div className="answers">{question.choices.map((item, position) => { const right = feedback && item.name === question.answer.name; const wrong = feedback && selected === item.name && !right; return <button key={`${index}-${item.name}`} disabled={!!feedback || transitioning} onClick={() => answer(item)} className={`answer-card ${['peach', 'blue', 'lavender', 'mint'][position]} ${right ? 'correct' : ''} ${wrong ? 'wrong' : ''} ${feedback && !right && !wrong ? 'unselected' : ''}`}><span className="answer-emoji">{item.emoji}</span><span>{item.name}</span><span className="answer-marker">{right ? '✓' : wrong ? '×' : ''}</span></button>; })}</div>
      {feedback === 'correct' && <div className="confetti" aria-hidden="true">{Array.from({ length: 12 }, (_, position) => <i key={position} className={`confetti-${position % 4}`}>✦</i>)}</div>}
      </section><div className="quiz-buddy"><Bear mood={feedback === 'correct' ? 'celebrating' : feedback === 'timeout' ? 'surprised' : 'happy'} /><div><strong>{feedback === 'correct' ? "You're a little superstar!" : feedback ? "Every try is a little discovery!" : 'Take a peek. You can do it!'}</strong><span>{feedback ? 'Here comes another little adventure…' : 'Your bear buddy is cheering you on.'}</span></div><span className="buddy-heart">♡</span></div></main>}

    {screen === 'result' && <main className="result-content"><div className="result-card"><span className="eyebrow">A LITTLE ADVENTURE, A BIG HIGH FIVE!</span><div className="result-bear"><span>✦</span><Bear mood="celebrating" /><span>✦</span></div><h1>{score >= 3 ? 'Amazing, little explorer!' : 'Look at you learning!'}</h1><p>Every little discovery deserves a celebration.</p><div className="result-stars" aria-label={`${score} stars earned`}>{Array.from({ length: 5 }, (_, position) => <span className={position < score ? 'earned' : ''} key={position}>★</span>)}</div><div className="result-score"><strong>{score}</strong> / 5 little discoveries</div><div className="result-stats"><span>🔥 <strong>{bestStreak}</strong> best streak</span><span>🎯 <strong>{score * 20}%</strong> accuracy</span></div><button className="primary" onClick={start}>↻ &nbsp; Play again!</button><button className="secondary" onClick={home}>⌂ &nbsp; Pick a new adventure</button><span className="result-topic">{topic.emoji} More fun with {topic.name.toLowerCase()}</span></div></main>}
    {screen !== 'home' && screen !== 'splash' && <footer className="game-footer">Little steps. Big smiles. <span>♡</span></footer>}
  </div>;
}
