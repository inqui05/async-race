import { BaseComponent } from '../components/base-component';
import { AnimationID } from './types';
import { FULL_DISTANCE, START_POSITION } from './variables';

export const animation = (car: BaseComponent, duration: number): AnimationID => {
  const start = performance.now();
  const timing = (timeFraction: number) => timeFraction;
  const draw = (progress: number) => {
    car.element.style.left = `${START_POSITION + progress * FULL_DISTANCE}%`;
  };
  const id = { id: 0 } as AnimationID;

  function animate(time: number) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < 1) {
      id.id = requestAnimationFrame(animate);
    }
  }

  id.id = requestAnimationFrame(animate);
  return id;
};
