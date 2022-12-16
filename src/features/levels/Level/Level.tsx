import React, { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import GuessButton from '../GuessButton';
import Hint from '../../../components/Hint';
import Timer from '../../../components/Timer';
import Spinner from '../../../components/Spinner';
import { useFetchSingleLevelQuery } from '../levels-slice';
import LevelScore from '../LevelScore';
import { Position } from '../../../types';

const Level = () => {
  const { levelId } = useParams();

  const levelImage = useRef<HTMLImageElement>(null);

  const [reverseGuessButton, setReverseGuessButton] = useState(true);
  const [hintMessage, setHintMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [guessButtonStyle, setGuessButtonStyle] = useState<React.CSSProperties>(
    {
      left: '-9999px',
      top: '-9999px',
    }
  );

  if (!levelId) return <Navigate to="/" replace />;

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleLevelQuery(levelId);

  const setGuessButton = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const x = e.clientX + window.scrollX - 24;
    const y = e.clientY + window.scrollY - 24;

    setGuessButtonStyle({
      left: `${x}px`,
      top: `${y}px`,
    });

    if (window.innerWidth - x < 400) {
      setReverseGuessButton(true);
    } else {
      setReverseGuessButton(false);
    }
  };

  const setClickPosition = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): Position => {
    const x = e.clientX;
    const y = e.clientY;
    return [x, y];
  };

  const onMouseClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setGuessButton(e);
    setClickPosition(e);
  };

  useEffect(() => {
    if (levelImage.current && levelImage.current.width > window.innerWidth) {
      setTimeout(() => {
        setHintMessage(
          'Hint: you can scroll down and to the right to see the rest of the image'
        );
        setShowHint(true);
      }, 3000);
      setTimeout(() => setShowHint(false), 8000);
    }
  }, [isSuccess]);

  if (isLoading)
    return (
      <div className="m-10 flex w-auto justify-center">
        <Spinner />
      </div>
    );

  if (isError) {
    console.error(error);
    return <p>Server error. Try again later.</p>;
  }

  if (
    isSuccess &&
    // check if response is empty (id is not in db)
    data &&
    Object.keys(data).length === 0 &&
    Object.getPrototypeOf(data) === Object.prototype
  )
    return <Navigate to="/" replace />;

  return (
    <>
      <img
        ref={levelImage}
        src={data?.images.url_big}
        alt={data?.name}
        className="relative min-w-[1750px] cursor-[crosshair]"
        onClick={onMouseClick}
      />
      <Timer />
      <GuessButton
        levelId={levelId}
        style={guessButtonStyle}
        reverse={reverseGuessButton}
      />
      <LevelScore levelId={levelId} />
      <Hint show={showHint} message={hintMessage} />
    </>
  );
};

export default Level;
