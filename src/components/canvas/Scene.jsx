import { Canvas } from '@react-three/fiber';
import { Environment, Stage } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import { BeerCan } from './BeerCan';
import { CameraRig } from './CameraRig';
import { EffectDepthOfField } from './EffectDepthOfField';
import { BackgroundColor } from './BackgroundColor';
import { suspend } from 'suspend-react';

const sunset = import('@pmndrs/assets/hdri/sunset.exr').then(
  (module) => module.default,
);

export const Scene = ({
  speed = 0.5,
  count = 400,
  depth = 80,
  easing = (x) => Math.sqrt(1 - (x - 1) ** 2),
}) => (
  <Canvas
    gl={{ antialias: false }}
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 10], fov: 14, near: 0.01, far: depth + 15 }}>
    <BackgroundColor />
    <spotLight
      position={[10, 20, 10]}
      penumbra={1}
      intensity={1.5}
      color='orange'
    />
    {Array.from(
      { length: count },
      (_, index) => <BeerCan key={index} index={index} z={Math.round(easing(index / count) * depth) + 2} speed={speed} /> /* prettier-ignore */,
    )}
    <Environment files='/img/venice_sunset_1k.hdr' blur={0.8} />
    <EffectComposer multisampling={0}>
      <EffectDepthOfField />
    </EffectComposer>
    <CameraRig />
  </Canvas>
);
