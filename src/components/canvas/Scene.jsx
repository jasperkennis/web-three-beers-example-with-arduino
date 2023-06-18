import { Canvas } from '@react-three/fiber';
import { Environment, Stage } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import { BeerCan } from './BeerCan';
import { CameraRig } from './CameraRig';
import { EffectDepthOfField } from './EffectDepthOfField';
import { BackgroundColor } from './BackgroundColor';

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
    <Stage
      intensity={0.5}
      environment='city'
      adjustCamera={false}
      shadows={false}>
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
      <Environment preset='sunset' blur={0.8} />
    </Stage>
    <EffectComposer multisampling={0}>
      <EffectDepthOfField />
    </EffectComposer>
    <CameraRig />
  </Canvas>
);
