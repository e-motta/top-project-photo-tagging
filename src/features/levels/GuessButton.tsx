import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Orientation } from '../../types';
import {
  setSelectedCharacterId,
  setShowGuessButton,
} from './slices/guessButtonSlice';
import { useFetchCharactersQuery } from './slices/levelsSlice';

const GuessButton = ({
  style,
  orientation,
  reverseX,
  reverseY,
}: {
  style: React.CSSProperties;
  orientation: Orientation;
  reverseX: boolean;
  reverseY: boolean;
}) => {
  const showGuessButton = useAppSelector(
    (state) => state.guessButton.showGuessButton
  );

  const dispatch = useAppDispatch();

  const {
    data: charactersData,
    isSuccess: charactersIsSuccess,
    isError: charactersIsError,
    error: charactersError,
  } = useFetchCharactersQuery();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setSelectedCharacterId(e.currentTarget.id));
    dispatch(setShowGuessButton(false));
  };

  if (charactersIsError) {
    console.error(charactersError);
    return <p>Server error. Try again later.</p>;
  }

  const getFoundCharactersIds = useAppSelector((state) =>
    state.foundCharacters.map((char) => {
      if (char.found === true) return char.id;
    })
  );

  const notFoundCharacters = charactersData
    ?.map((character) => {
      const found = getFoundCharactersIds.includes(character.id);
      return { ...character, found };
    })
    .filter((character) => !character.found);

  let characterButtons;
  if (charactersIsSuccess) {
    characterButtons = notFoundCharacters?.map((character) => (
      <button
        id={character.id}
        key={character.id}
        type="button"
        className="w-12 transition-all hover:scale-110"
        onClick={onClick}
      >
        <img
          src={character.image.url}
          alt={character.name}
          className="rounded-full border-2 border-red-600 bg-white"
        />
      </button>
    ));
  }

  const orientationXnormal = (
    <div className="absolute w-[280px]" style={style}>
      <div className="flex gap-4">
        <div className="h-12 w-12 border-4 border-dashed border-black"></div>
        <div className="flex gap-2">{characterButtons}</div>
      </div>
    </div>
  );

  const orientationXreverse = (
    <div className="absolute w-[0]" style={style}>
      <div className="relative">
        <div
          style={{
            left: notFoundCharacters
              ? `-${8 + notFoundCharacters.length * 56}px`
              : '-16px',
          }}
          className="absolute flex flex-row-reverse gap-4"
        >
          <div className="h-12 w-12 border-4 border-dashed border-black"></div>
          <div className="flex gap-2">{characterButtons}</div>
        </div>
      </div>
    </div>
  );

  const orientationYnormal = (
    <div className="absolute" style={style}>
      <div className="flex flex-col gap-4">
        <div className="h-12 w-12 border-4 border-dashed border-black"></div>
        <div className="flex flex-col items-start gap-2">
          {characterButtons}
        </div>
      </div>
    </div>
  );

  const orientationYreverse = (
    <div className="absolute w-[0]" style={style}>
      <div className="relative">
        <div
          style={{
            top: notFoundCharacters
              ? `-${8 + notFoundCharacters.length * 56}px`
              : '-16px',
          }}
          className="absolute flex flex-col-reverse gap-4"
        >
          <div className="h-12 w-12 border-4 border-dashed border-black"></div>
          <div className="flex flex-col gap-2">{characterButtons}</div>
        </div>
      </div>
    </div>
  );

  let content;
  if (orientation === 'X') {
    content = reverseX ? orientationXreverse : orientationXnormal;
  } else {
    content = reverseY ? orientationYreverse : orientationYnormal;
  }

  return (
    <div
      data-testid={'guess-button'}
      className={showGuessButton ? '' : 'hidden'}
    >
      {content}
    </div>
  );
};

export default GuessButton;
