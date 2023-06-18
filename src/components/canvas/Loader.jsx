import { isLoaderRunningAtom, isSceneLoadedAtom } from '@/store/app';
import { useProgress } from '@react-three/drei';
import { useSetAtom } from 'jotai';

export const Loader = () => {
  const { progress } = useProgress();

  const setIsLoaderRunning = useSetAtom(isLoaderRunningAtom);
  const setIsSceneLoaded = useSetAtom(isSceneLoadedAtom);

  setIsLoaderRunning(true);

  if (progress >= 100) {
    setIsSceneLoaded(true);
  }
};
