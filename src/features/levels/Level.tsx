import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import GuessButton from './GuessButton';
import Hint from '../../components/Hint';
import Timer from '../timer/Timer';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchSingleLevelQuery } from './levels-slice';
import { resetScore } from './found-characters-slice';
import {
  setGuessButtonStyle,
  setReverseXGuessButton,
  setReverseYGuessButton,
  setSelectedCharacterId,
  setShowGuessButton,
  setGuessButtonOrientation,
} from './guess-button-slice';
import LevelScore from './LevelScore';
import { Position } from '../../types';
import { useGameOver, useGameRound } from './useGame';
import { setDelayedHintMessage } from './helper';
import EnterName from '../scores/EnterName';
import { useFetchHighScoresTableByLevelIdQuery } from '../scores/scores-slice';
import { getElapsedTime } from '../timer/helper';
import BackHome from '../../components/BackHome';

const Level = () => {
  const { levelId } = useParams();
  if (!levelId) return <Navigate to="/" replace />;

  const mainLevelImage = useRef<HTMLImageElement>(null);

  // Redux
  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleLevelQuery(levelId);

  const { data: scoreData } = useFetchHighScoresTableByLevelIdQuery(levelId);

  const dispatch = useAppDispatch();

  const guessButtonOrientation = useAppSelector(
    (state) => state.guessButton.guessButtonOrientation
  );
  const reverseXGuessButton = useAppSelector(
    (state) => state.guessButton.reverseXGuessButton
  );
  const reverseYGuessButton = useAppSelector(
    (state) => state.guessButton.reverseYGuessButton
  );
  const guessButtonStyle = useAppSelector(
    (state) => state.guessButton.guessButtonStyle
  );

  // Local state
  const [hintMessage, setHintMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showEnterName, setShowEnterName] = useState(false);
  const [showBackHome, setShowBackHome] = useState(false);
  const [clickPositionOnScreen, setClickPositionOnScreen] = useState<Position>([
    -9999, -9999,
  ]);
  const [clickPositionOnImage, setClickPositionOnImage] = useState<Position>([
    -9999, -9999,
  ]);

  // Event handlers
  const handleGuessButton = () => {
    const headerHeight = document.querySelector('#header')?.clientHeight;

    const x = clickPositionOnImage[0] - 24;
    const y = headerHeight
      ? clickPositionOnImage[1] - 24 - headerHeight
      : clickPositionOnImage[1] - 24;

    dispatch(
      setGuessButtonStyle({
        left: `${x}px`,
        top: `${y}px`,
      })
    );

    // Avoid overlapping with Score component, rendering off screen
    if (window.innerWidth < 640) {
      dispatch(setGuessButtonOrientation('Y'));
    } else {
      dispatch(setGuessButtonOrientation('X'));
    }

    if (window.innerWidth - x < 400) {
      dispatch(setReverseXGuessButton(true));
    } else {
      dispatch(setReverseXGuessButton(false));
    }

    if (window.innerHeight + window.scrollY - y < 400) {
      dispatch(setReverseYGuessButton(true));
    } else {
      dispatch(setReverseYGuessButton(false));
    }
  };

  const onMouseClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    dispatch(setShowGuessButton(true));

    const x = e.clientX;
    const y = e.clientY + window.scrollY;

    setClickPositionOnScreen([x, y]);

    let imageHorizontalScroll;
    if (mainLevelImage.current)
      imageHorizontalScroll = Boolean(
        navigator.userAgent.match(/Chrome|iPhone|iPad/g)
      )
        ? x - mainLevelImage.current.x / 2
        : x - mainLevelImage.current.x;
    setClickPositionOnImage(
      imageHorizontalScroll ? [imageHorizontalScroll, y] : [x, y]
    );
  };

  useEffect(() => {
    handleGuessButton();
  }, [clickPositionOnScreen]);

  useEffect(() => {
    dispatch(setSelectedCharacterId(null));
  });

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
  });

  const gameover = useGameOver();
  const startTime = useAppSelector((state) => state.timer.start);
  const stopTime = useAppSelector((state) => state.timer.stop);
  const time = getElapsedTime(startTime, stopTime);
  const top5 = scoreData?.scores?.at(4)?.time;
  useEffect(() => {
    if (gameover && top5 && time < top5) {
      setShowEnterName(true);
    } else if (gameover && top5 === undefined) {
      setShowEnterName(true);
    } else if (gameover) {
      setShowBackHome(true);
    }
  }, [gameover]);

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
    // check if response is empty (id is not in db) // fixme: not working
    data &&
    Object.keys(data).length === 0 &&
    Object.getPrototypeOf(data) === Object.prototype
  )
    return <Navigate to="/" replace />;

  return (
    <>
      <div className="overflow-auto">
        <div className="relative">
          <img
            ref={mainLevelImage}
            src={data?.images.url_big}
            alt={data?.name}
            className="relative min-w-[1750px] cursor-[crosshair]"
            onClick={onMouseClick}
          />
          <Timer />
          <GuessButton
            style={guessButtonStyle}
            orientation={guessButtonOrientation}
            reverseX={reverseXGuessButton}
            reverseY={reverseYGuessButton}
          />
          <LevelScore />
          <Hint show={showHint} message={hintMessage} />
          <EnterName show={showEnterName} levelId={levelId} />
          <BackHome show={showBackHome} />
        </div>
      </div>
    </>
  );
};

export default Level;