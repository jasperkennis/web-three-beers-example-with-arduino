import { isSceneLoadedAtom } from '@/store/app';
import { useProgress } from '@react-three/drei';
import { useSetAtom } from 'jotai';

export const Loader = () => {
  const { progress } = useProgress();

  const setIsSceneLoaded = useSetAtom(isSceneLoadedAtom);

  if (progress >= 100) {
    setIsSceneLoaded(true);
  }
};
