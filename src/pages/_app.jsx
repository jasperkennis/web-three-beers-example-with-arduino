import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/config';
import { CanvasParent } from '@/components/dom/CanvasParent';
import '@/styles/index.css';

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((module) => module.Scene),
  { ssr: true },
);

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef();

  return (
    <>
      <Header title={pageProps.title} />
      <CanvasParent ref={ref}>
        <Component {...pageProps} />
        <Suspense fallback={null}>
          {Component?.canvas && (
            <Scene
              className='pointer-events-none'
              eventSource={ref}
              eventPrefix='client'
              camera={{ position: [0, 0, 30] }}>
              {Component.canvas(pageProps)}
            </Scene>
          )}
        </Suspense>
      </CanvasParent>
    </>
  );
}
