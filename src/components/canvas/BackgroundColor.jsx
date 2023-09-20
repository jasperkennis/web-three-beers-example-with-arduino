import { potentiometerPositionAtom } from '@/store/app';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

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

  useFrame((_, delta) => {
    easing.dampC(ref.current, defaultColor, 0.25, delta);
  });

  return <color ref={ref} attach='background' args={[defaultColor]} />;
};
