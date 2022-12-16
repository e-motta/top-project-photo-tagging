import { useState } from 'react';
import Spinner from '../../components/spinner';
import { CharactersPosition } from '../../types';

import {
  useFetchCharactersQuery,
  useFetchSingleLevelQuery,
} from './levels-slice';

const LevelScore = ({ levelId }: { levelId: string }) => {
  const [hideScore, setHideScore] = useState(false);

  const { data: levelData, isSuccess: levelIsSuccess } =
    useFetchSingleLevelQuery(levelId);

  const { data: charactersData, isSuccess: charactersIsSuccess } =
    useFetchCharactersQuery();

  let content;
  if (charactersIsSuccess && levelIsSuccess) {
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
        {charactersData.map((character) => {
          const found = levelData?.characters_positions.find(
            (pos: CharactersPosition) => pos.character_id === character.id
          )?.found;
          character = { ...character, found };
          return (
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
          );
        })}
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
