import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useFetchCharactersQuery } from '../slices/levels-slice';

const LevelScore = () => {
  const [hideScore, setHideScore] = useState(false);

  const { data: charactersData, isSuccess: charactersIsSuccess } =
    useFetchCharactersQuery();

  const getFoundCharactersIds = useAppSelector((state) =>
    state.foundCharacters.map((char) => {
      if (char.found === true) return char.id;
    })
  );

  const characters = charactersData?.map((character) => {
    const found = getFoundCharactersIds.includes(character.id);
    return { ...character, found };
  });

  let content;
  if (charactersIsSuccess) {
    content = hideScore ? (
      <button
        onClick={() => {
          setHideScore(false);
        }}
        type="button"
        className="mr-6 px-2 py-1 transition-all hover:scale-110"
      >
        {charactersData ? (
          <img
            src={charactersData[0].image.url}
            alt="characters"
            className="w-12 rounded-full border border-red-600 bg-white"
            title="See all characters"
          />
        ) : (
          ''
        )}
      </button>
    ) : (
      <>
        {characters?.map((character) => (
          <div key={character.id} className="group flex items-center gap-4">
            <span
              className="hidden cursor-default rounded-full bg-white px-3 py-1 
              text-xl group-hover:block"
            >
              {character.name}
            </span>
            <img
              src={character.image.url}
              alt={character.name}
              className={
                character.found
                  ? 'w-20 rounded-full border-2 border-white bg-green-600 opacity-100 transition-all hover:scale-105'
                  : 'w-20 rounded-full border-2 border-white bg-red-600 opacity-70 transition-all hover:scale-105 hover:opacity-100'
              }
            />
          </div>
        ))}
        <button
          onClick={() => {
            setHideScore(true);
          }}
          type="button"
          className="mr-6 rounded-full bg-white px-2 py-1"
        >
          ✖
        </button>
      </>
    );
  }

  return (
    <div className="fixed top-32 right-4 flex flex-col items-end gap-4">
      {content}
    </div>
  );
};

export default LevelScore;
