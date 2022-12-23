import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedCharacterId } from './guess-button-slice';
import { useFetchCharactersQuery } from './levels-slice';

const GuessButton = ({
  style,
  reverse,
  hideGuessButton,
}: {
  style: React.CSSProperties;
  reverse: boolean;
  hideGuessButton: () => void;
}) => {
  const dispatch = useAppDispatch();

  const {
    data: charactersData,
    isSuccess: charactersIsSuccess,
    isError: charactersIsError,
    error: charactersError,
  } = useFetchCharactersQuery();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setSelectedCharacterId(e.currentTarget.id));
    hideGuessButton();
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

  let content;
  if (charactersIsSuccess) {
    content = notFoundCharacters?.map((character) => (
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

  return reverse ? (
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
          <div className="flex gap-2">{content}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="absolute w-[280px]" style={style}>
      <div className="flex gap-4">
        <div className="h-12 w-12 border-4 border-dashed border-black"></div>
        <div className="flex gap-2">{content}</div>
      </div>
    </div>
  );
};

export default GuessButton;
