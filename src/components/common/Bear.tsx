type BearProps = { mood?: string; className?: string };

export default function Bear({ mood = 'happy', className = '' }: BearProps) {
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
