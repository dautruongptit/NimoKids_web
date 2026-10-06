/** Animals that have a hand-drawn illustration. Any other item is shown as a large emoji instead. */
export const ANIMALS_WITH_ART = ['Cat', 'Dog', 'Rabbit'];

export default function AnimalArt({ name }: { name: string }) {
  if (!ANIMALS_WITH_ART.includes(name)) return null;
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
