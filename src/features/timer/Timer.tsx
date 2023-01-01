import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getElapsedTime, splitTime } from './helper';
import { resetTimer } from './timerSlice';

const Timer = () => {
  const [time, setTime] = useState(0);

  const dispatch = useAppDispatch();

  const start = useAppSelector((state) => state.timer.start);
  const stop = useAppSelector((state) => state.timer.stop);

  const dispatchResetTimerCallback = useCallback(() => {
    dispatch(resetTimer());
  }, [dispatch]);

  useEffect(() => {
    dispatchResetTimerCallback();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(() => getElapsedTime(start, stop));
    }, 10);
    if (stop) clearInterval(interval);
    return () => clearInterval(interval);
  }, [start, stop]);

  useEffect(() => {
    setTime(getElapsedTime(start, new Date().getTime()));
  }, [start]);

  const { hh, mm, ss } = splitTime(time);

  return (
    <div
      data-testid="timer"
      className="fixed top-32 left-1/2 flex w-28 -translate-x-1/2 cursor-default 
      justify-center rounded-full bg-red-600 py-2 text-white opacity-70
      hover:opacity-100"
    >
      <div className="font-mono">
        <span>{('0' + hh).slice(-2)}:</span>
        <span>{('0' + mm).slice(-2)}:</span>
        <span>{('0' + ss).slice(-2)}</span>
      </div>
    </div>
  );
};

export default Timer;
