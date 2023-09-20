import { potentiometerPositionAtom, serialPortAtom } from '@/store/app';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const Page = () => {
  const [portIsOpen, setPortIsOpen] = useState(false);

  const [serialPort, setSerialPort] = useAtom(serialPortAtom);
  const [, setPotentiometerPosition] = useAtom(potentiometerPositionAtom);

  const startAConnection = () => {
    if ('serial' in navigator) {
      navigator.serial.requestPort().then(async (newPort) => {
        setSerialPort(newPort);
      });
    }
  };

  useEffect(() => {
    if (!serialPort) {
      return;
    }
    serialPort
      .open({ baudRate: 9600 /* pick your baud rate */ })
      .then(async () => {
        const reader = serialPort.readable.getReader();

        setPortIsOpen(true);
        while (true) {
          // eslint-disable-next-line no-await-in-loop
          const { value, done } = await reader.read();

          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
          }
          // value is a Uint8Array.
          setPotentiometerPosition(value[0]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialPort]);

  const sendMessage = async (message) => {
    if (!serialPort) {
      return;
    }

    const writer = serialPort.writable.getWriter();

    await writer.write(new TextEncoder().encode(message.toString()));

    writer.releaseLock();
  };

  return (
    <>
      {!portIsOpen && (
        <button onClick={startAConnection}>Start a connection</button>
      )}
      {portIsOpen && <button onClick={sendMessage}>Start a connection</button>}
    </>
  );
};

Page.canvas = () => ({});

export default Page;
