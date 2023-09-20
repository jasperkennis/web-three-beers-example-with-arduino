import { Suspense, useRef } from 'react';
import Header from '@/config';
import { CanvasParent } from '@/components/dom/CanvasParent';
import '@/styles/index.css';

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef();

  return (
    <>
      <Header title={pageProps.title} />
      <CanvasParent ref={ref}>
        <Component {...pageProps} />
        <Suspense fallback={null} />
      </CanvasParent>
    </>
  );
}
