type SoundButtonProps = { onClick: () => void; muted?: boolean };

/** Round speaker button: "read aloud" in the quiz, mute toggle in the header. */
export default function SoundButton({ onClick, muted = false }: SoundButtonProps) {
  return <button className="sound-button" onClick={onClick} aria-label={muted ? 'Turn sound on' : 'Read aloud'}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H3V15H6L11 19Z" />{muted ? <path d="M16 9L22 15M22 9L16 15" /> : <><path d="M15 8C18 10 18 14 15 16" /><path d="M18 5C23 9 23 15 18 19" /></>}</svg></button>;
}
