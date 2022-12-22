import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import GuessButton from '../GuessButton';
import Hint from '../../../components/Hint';
import Timer from '../../../components/Timer';
import Spinner from '../../../components/Spinner';
import { resetScore, useFetchSingleLevelQuery } from '../levels-slice';
import LevelScore from '../LevelScore';
import { Position } from '../../../types';
import useGameRound from './useGame';
import { setDelayedHintMessage } from './helper';
import { useAppDispatch } from '../../../app/hooks';

const Level = () => {
  const { levelId } = useParams();

  const mainLevelImage = useRef<HTMLImageElement>(null);

  const dispatch = useAppDispatch();

  // Local state
  const [hintMessage, setHintMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [allowScroll, setAllowScroll] = useState(true);
  const [showGuessButton, setShowGuessButton] = useState(false);
  const [reverseGuessButton, setReverseGuessButton] = useState(true);
  const [scaleGuessButton, setScaleGuessButton] = useState(false);
  const [guessButtonStyle, setGuessButtonStyle] = useState<React.CSSProperties>(
    {
      left: '-9999px',
      top: '-9999px',
    }
  );

  const [clickPositionOnScreen, setClickPositionOnScreen] = useState<Position>([
    -1, -1,
  ]);
  const [clickPositionOnImage, setClickPositionOnImage] = useState<Position>([
    -1, -1,
  ]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );

  if (!levelId) return <Navigate to="/" replace />;

  // Event handlers
  const handleGuessButton = () => {
    const x = clickPositionOnScreen[0] - 24;
    const y = clickPositionOnScreen[1] - 24;

    if (showGuessButton) {
      setGuessButtonStyle({
        left: `${x}px`,
        top: `${y}px`,
      });

      // Avoid overlapping with Score component, rendering off screen
      if (window.innerWidth - x < 400) {
        setReverseGuessButton(true);
      } else {
        setReverseGuessButton(false);
      }
      setShowGuessButton(false);
    } else {
      setGuessButtonStyle({
        display: 'none',
      });
      setShowGuessButton(true);
    }
  };

  const handleScroll = () => {
    if (allowScroll) {
      window.onscroll = null;
    } else {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      window.onscroll = () => window.scrollTo(scrollX, scrollY);
    }
  };

  // const handlePlay = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
  //   setClickPosition([e.screenX, e.screenY]);
  // };

  const { gameover } = useGameRound({
    levelId,
    clickPosition: clickPositionOnImage,
    selectedCharacterId,
  });

  const onMouseClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const x = e.clientX; // + window.scrollX;
    const y = e.clientY + window.scrollY;
    setClickPositionOnScreen([x, y]);
    setClickPositionOnImage(
      mainLevelImage.current ? [x - mainLevelImage.current.x / 2, y] : [x, y]
    );
    handleScroll();
  };

  useEffect(() => {
    handleGuessButton();
    setSelectedCharacterId(null);
    if (allowScroll) {
      setAllowScroll(false);
    } else {
      setAllowScroll(true);
    }
  }, [clickPositionOnScreen]);

  // Data
  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleLevelQuery(levelId);

  const dispatchResetCallback = useCallback(() => {
    dispatch(resetScore());
  }, [dispatch]);

  useEffect(() => {
    return () => dispatchResetCallback();
  }, []);

  useEffect(() => {
    if (
      mainLevelImage.current &&
      mainLevelImage.current.width > window.innerWidth
    ) {
      setDelayedHintMessage(
        'You can scroll down and to the right to see the rest of the image',
        3000,
        8000,
        setHintMessage,
        setShowHint
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    const onScroll = () => {
      if (allowScroll && !showHint) {
        setDelayedHintMessage(
          'Select a character or click anywhere in the image to resume scrolling',
          0,
          5000,
          setHintMessage,
          setShowHint
        );
        setScaleGuessButton(true);
        setTimeout(() => {
          setScaleGuessButton(false);
        }, 600);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [showGuessButton, showHint]);

  if (isLoading) {
    return (
      <div className="m-10 flex w-auto justify-center">
        <Spinner />
      </div>
    );
  }

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
      <div className={allowScroll ? 'overflow-hidden' : 'overflow-auto'}>
        <img
          ref={mainLevelImage}
          src={data?.images.url_big}
          alt={data?.name}
          className="relative min-w-[1750px] cursor-[crosshair]"
          onClick={onMouseClick}
        />
        <Timer />

        <LevelScore />
        <Hint show={showHint} message={hintMessage} />
      </div>
      <GuessButton
        levelId={levelId}
        style={guessButtonStyle}
        scale={scaleGuessButton}
        reverse={reverseGuessButton}
        hideGuessButton={() => {
          setShowGuessButton(false);
          setAllowScroll(true);
          handleScroll();
          setGuessButtonStyle({
            display: 'none',
          });
          setClickPositionOnScreen([-1, -1]);
        }}
        setSelectedCharacterId={setSelectedCharacterId}
      />
    </>
  );
};

export default Level;
