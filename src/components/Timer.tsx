import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-32 left-1/2 flex w-28 -translate-x-1/2 cursor-default 
      justify-center rounded-full bg-red-600 py-2 text-white opacity-70
      hover:opacity-100"
    >
      <div className="font-mono">
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default Timer;
