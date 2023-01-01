import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CharactersPosition, Level } from '../../types';
import { resetScore, setFoundCharacter } from './slices/foundCharactersSlice';
import { stoptimer } from '../timer/timerSlice';
import { useEffect } from 'react';

const useGameRound = async ({
  levelData,
  clickPosition,
}: {
  levelData: Level | undefined;
  clickPosition: [number, number];
}) => {
  const dispatch = useAppDispatch();
  const selectedCharacterId = useAppSelector(
    (state) => state.guessButton.selectedCharacterId
  );

  useEffect(() => {
    levelData?.characters_positions.forEach(
      (charPosition: CharactersPosition) => {
        if (
          Math.abs(charPosition.position[0] - clickPosition[0]) < 24 &&
          Math.abs(charPosition.position[1] - clickPosition[1]) < 24 &&
          selectedCharacterId === charPosition.character_id
        ) {
          dispatch(setFoundCharacter(charPosition.character_id));
        }
      }
    );
  }, [selectedCharacterId]);
};

const useGameover = () => {
  const dispatch = useAppDispatch();

  const allCharacters = useAppSelector((state) => state.foundCharacters);
  const gameover = allCharacters.every((character) => character.found === true);

  useEffect(() => {
    if (gameover) {
      dispatch(resetScore());
      dispatch(stoptimer());
    }
  });

  return gameover;
};

export { useGameRound, useGameover };
