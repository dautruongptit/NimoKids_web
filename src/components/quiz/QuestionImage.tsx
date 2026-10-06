import type { Visual } from '../../types';
import AnimalArt, { ANIMALS_WITH_ART } from './AnimalArt';

type QuestionImageProps = {
  image: Visual;
};

/** Render with a changing `key` (the question index) so the entrance animation replays for every question. */
export default function QuestionImage({ image }: QuestionImageProps) {
  return <div className="question-image">
    <span className="image-star one">✦</span><span className="image-star two">✧</span><span className="image-dot" /><span className="image-dot second" />
    {image.imageUrl
      ? <img className="question-photo" src={image.imageUrl} alt={image.name} />
      : ANIMALS_WITH_ART.includes(image.name)
        ? <AnimalArt name={image.name} />
        : <span className="large-emoji" role="img" aria-label={image.name}>{image.emoji}</span>}
    <span className="image-ground" />
  </div>;
}
