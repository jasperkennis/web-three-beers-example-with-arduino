import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { CanFunkyFalcon } from './CanFunkyFalcon';

export const BeerCanStill = ({ index, z, speed }) => {
  const ref = useRef();

  const { viewport, camera } = useThree();

  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  // By the time we're here the model is loaded, this is possible through React suspense

  // Local component state, it is safe to mutate because it's fixed data
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  // useFrame((state, dt) => {
  //   if (dt < 0.1)
  //     ref.current.position.set(
  //       index === 0 ? 0 : data.x * width,
  //       (data.y += dt * speed),
  //       -z,
  //     );
  //   // Rotate the object around
  //   ref.current.rotation.set(
  //     (data.rX += dt / data.spin),
  //     Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
  //     (data.rZ += dt / data.spin),
  //   );
  //   // If they're too far up, set them back to the bottom
  //   if (data.y > height * (index === 0 ? 4 : 1))
  //     data.y = -(height * (index === 0 ? 4 : 1));
  // });

  return (
    <CanFunkyFalcon
      ref={ref}
      distances={[0, 65, 0]}
      position={[0, 0, 5]}
      rotation={[0, 0.5 * Math.PI, 0]}
    />
  );
};
