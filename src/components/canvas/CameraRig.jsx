import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { isMobile } from 'react-device-detect';

const FACTOR = 4;

export const CameraRig = () => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();

  return useFrame(() => {
    if (isMobile) return;

    camera.position.lerp(
      vec.set(
        (mouse.x / FACTOR) * -1,
        (mouse.y / FACTOR) * -1,
        camera.position.z,
      ),
      0.05,
    );
    camera.lookAt(0, 0, 0);
  });
};
