import { useItemActive } from '@/hooks/useItemActive';
import { AnimatePresence, motion } from 'framer-motion';
import { BEERS } from '@/constants/beers';
import { isSceneLoadedAtom } from '@/store/app';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const Page = () => {
  const { isActive, itemActive } = useItemActive();

  const [isSceneLoaded, setIsSceneLoaded] = useAtom(isSceneLoadedAtom);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSceneLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [setIsSceneLoaded]);

  return (
    <>
      <AnimatePresence>
        {!isSceneLoaded && (
          <>
            <motion.div
              className='absolute inset-0 z-10 w-full h-full pointer-events-none bg-default'
              exit={{ opacity: 0 }}
            />
            <motion.div
              className='absolute z-10 p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80'
              exit={{ opacity: 0 }}>
              <img src='svg/logo.svg' alt='logo' />

              <div className='absolute z-10 flex items-center justify-center w-full mt-36 h-[94px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <span className='loader' />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className='absolute z-10 flex flex-col h-screen p-6 pointer-events-none h-[100dvh]'>
        <div className='flex items-end flex-grow w-full md:items-center md:ml-12'>
          <motion.div
            className='w-full p-8 text-black bg-white opacity-25 md:w-1/2 rounded-3xl bg-opacity-40 backdrop-blur-md'
            animate={{ y: isActive ? 0 : 40, opacity: isActive ? 1 : 0 }}
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 130,
              damping: 10,
              mass: 1,
            }}>
            <AnimatePresence>
              {isActive && (
                <>
                  <motion.h1
                    className='text-6xl uppercase pointer-events-auto font-display'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {BEERS[itemActive?.name]?.title || ''}
                  </motion.h1>
                  <motion.p
                    className='hidden max-w-2xl mt-4 pointer-events-auto md:inline-block font-body'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {BEERS[itemActive?.name]?.text || ''}
                  </motion.p>
                </>
              )}
            </AnimatePresence>
            <button className='px-6 py-2 mt-4 text-lg bg-teal-400 rounded-full pointer-events-auto font-display hover:bg-teal-200 transition-colors'>
              Buy now
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

Page.canvas = () => ({});

export default Page;
