import React, { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import GuessButton from '../../components/GuessButton';
import Hint from '../../components/Hint';
import Timer from '../../components/Timer';
import Spinner from '../../components/spinner';
import { useFetchSingleLevelQuery } from './levels-slice';
import LevelScore from './LevelScore';

const Level = () => {
  const [reverseGuessButton, setReverseGuessButton] = useState(true);

  const { levelId } = useParams();

  if (!levelId) return <Navigate to="/" replace />;

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleLevelQuery(levelId);

  const [guessButtonStyle, setGuessButtonStyle] = useState<React.CSSProperties>(
    {
      left: '-9999px',
      top: '-9999px',
    }
  );

  const setCoordinates = (
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

  const [hintMessage, setHintMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  const levelImage = useRef<HTMLImageElement>(null);

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

  if (isSuccess && !data) return <Navigate to="/" replace />;

  return (
    <>
      <img
        ref={levelImage}
        src={data?.images.url_big}
        alt={data?.name}
        className="relative min-w-[1750px] cursor-[crosshair]"
        onClick={setCoordinates}
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
