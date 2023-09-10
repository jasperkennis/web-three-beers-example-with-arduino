import { potentiometerPositionAtom } from '@/store/app';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useItemActive } from '@/hooks/useItemActive';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { ID_FUNKY_FALCON } from './CanFunkyFalcon';
import { ID_GREEN_BULLET } from './CanGreenBullet';
import { ID_HOWLING_WOLF } from './CanHowlingWolf';

function componentToHex(c) {
  if (!c) {
    return 'ff';
  }

  const hex = c.toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export const COLORS = {
  [ID_FUNKY_FALCON]: '#e1d24e',
  [ID_GREEN_BULLET]: '#566def',
  [ID_HOWLING_WOLF]: '#6026b1',
};

export const BackgroundColor = () => {
  const [potentiometerPosition] = useAtom(potentiometerPositionAtom);

  const [defaultColor, setDefaultColor] = useState(rgbToHex(255, 255, 255));

  useEffect(() => {
    setDefaultColor(
      rgbToHex(
        potentiometerPosition,
        potentiometerPosition,
        potentiometerPosition,
      ),
    );
  }, [potentiometerPosition]);

  const ref = useRef(null);
  const { itemActive } = useItemActive();

  const bgColor = COLORS[itemActive?.name] || defaultColor;

  useFrame((_, delta) => {
    easing.dampC(ref.current, bgColor, 0.25, delta);
  });

  return <color ref={ref} attach='background' args={[defaultColor]} />;
};
