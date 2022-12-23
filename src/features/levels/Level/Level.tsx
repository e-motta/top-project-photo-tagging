import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import GuessButton from '../GuessButton';
import Hint from '../../../components/Hint';
import Timer from '../../../components/Timer';
import Spinner from '../../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useFetchSingleLevelQuery } from '../levels-slice';
import { resetScore } from '../found-characters-slice';
import {
  setGuessButtonStyle,
  setReverseGuessButton,
  setScaleGuessButton,
  setShowGuessButton,
} from '../guess-button-slice';
import LevelScore from '../LevelScore';
import { Position } from '../../../types';
import useGameRound from './useGame';
import { setDelayedHintMessage } from '../helper';

const Level = () => {
  const { levelId } = useParams();
  if (!levelId) return <Navigate to="/" replace />;

  const mainLevelImage = useRef<HTMLImageElement>(null);

  // Redux
  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleLevelQuery(levelId);

  const dispatch = useAppDispatch();

  const showGuessButton = useAppSelector(
    (state) => state.guessButton.showGuessButton
  );
  const reverseGuessButton = useAppSelector(
    (state) => state.guessButton.reverseGuessButton
  );
  const scaleGuessButton = useAppSelector(
    (state) => state.guessButton.scaleGuessButton
  );
  const guessButtonStyle = useAppSelector(
    (state) => state.guessButton.guessButtonStyle
  );

  // Local state
  const [hintMessage, setHintMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [allowScroll, setAllowScroll] = useState(true);

  const [clickPositionOnScreen, setClickPositionOnScreen] = useState<Position>([
    -1, -1,
  ]);
  const [clickPositionOnImage, setClickPositionOnImage] = useState<Position>([
    -1, -1,
  ]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );

  // Event handlers
  const handleGuessButton = () => {
    const x = clickPositionOnScreen[0] - 24;
    const y = clickPositionOnScreen[1] - 24;

    if (showGuessButton) {
      dispatch(
        setGuessButtonStyle({
          left: `${x}px`,
          top: `${y}px`,
        })
      );

      // Avoid overlapping with Score component, rendering off screen
      if (window.innerWidth - x < 400) {
        dispatch(setReverseGuessButton(true));
      } else {
        dispatch(setReverseGuessButton(false));
      }
      dispatch(setShowGuessButton(false));
    } else {
      dispatch(
        setGuessButtonStyle({
          display: 'none',
        })
      );
      dispatch(setShowGuessButton(true));
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

  const onMouseClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const x = e.clientX;
    const y = e.clientY + window.scrollY;

    setClickPositionOnScreen([x, y]);

    let imageHorizontalScroll;
    if (mainLevelImage.current)
      imageHorizontalScroll = navigator.userAgent.includes('Chrome')
        ? x - mainLevelImage.current.x / 2
        : x - mainLevelImage.current.x;
    setClickPositionOnImage(
      imageHorizontalScroll ? [imageHorizontalScroll, y] : [x, y]
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

  // Hint messages
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
      if (allowScroll) {
        setDelayedHintMessage(
          'Select a character or click anywhere in the image to resume scrolling',
          0,
          5000,
          setHintMessage,
          setShowHint
        );
        dispatch(setScaleGuessButton(true));
        setTimeout(() => {
          dispatch(setScaleGuessButton(false));
        }, 600);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [allowScroll]);

  // Data
  const dispatchResetCallback = useCallback(() => {
    dispatch(resetScore());
  }, [dispatch]);

  useEffect(() => {
    return () => dispatchResetCallback();
  }, []);

  useGameRound({
    levelId,
    clickPosition: clickPositionOnImage,
    selectedCharacterId,
  });

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
          dispatch(setShowGuessButton(false));
          setAllowScroll(true);
          handleScroll();
          dispatch(
            setGuessButtonStyle({
              display: 'none',
            })
          );
          setClickPositionOnScreen([-1, -1]);
        }}
        setSelectedCharacterId={setSelectedCharacterId}
      />
    </>
  );
};

export default Level;
