import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Position } from '../../types';
import {
  setGuessButtonOrientation,
  setGuessButtonStyle,
  setReverseXGuessButton,
  setReverseYGuessButton,
} from './slices/guessButtonSlice';

export const useGuessButton = (clickPositionOnImage: Position) => {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [clickPositionOnImage]);
};
