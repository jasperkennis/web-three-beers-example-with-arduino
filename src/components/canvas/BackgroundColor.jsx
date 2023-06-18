import { useItemActive } from '@/hooks/useItemActive';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef } from 'react';
import { ID_FUNKY_FALCON } from './CanFunkyFalcon';
import { ID_GREEN_BULLET } from './CanGreenBullet';
import { ID_HOWLING_WOLF } from './CanHowlingWolf';

export const COLORS = {
  default: '#70e4da',
  [ID_FUNKY_FALCON]: '#e1d24e',
  [ID_GREEN_BULLET]: '#566def',
  [ID_HOWLING_WOLF]: '#6026b1',
};

export const BackgroundColor = () => {
  const ref = useRef(null);
  const { itemActive } = useItemActive();

  const bgColor = COLORS[itemActive?.name] || COLORS.default;

  useFrame((_, delta) => {
    easing.dampC(ref.current, bgColor, 0.25, delta);
  });

  return <color ref={ref} attach='background' args={[COLORS.default]} />;
};
