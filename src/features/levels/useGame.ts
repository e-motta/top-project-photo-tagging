import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CharactersPosition } from '../../types';
import { useFetchSingleLevelQuery } from './slices/levels-slice';
import { resetScore, setFoundCharacter } from './slices/found-characters-slice';
import { stoptimer } from '../timer/timer-slice';

const useGameRound = async ({
  levelId,
  clickPosition,
}: {
  levelId: string;
  clickPosition: [number, number];
}) => {
  const dispatch = useAppDispatch();
  const selectedCharacterId = useAppSelector(
    (state) => state.guessButton.selectedCharacterId
  );

  const { data, isSuccess, isError, error } = useFetchSingleLevelQuery(levelId);

  if (isError) console.error(error);

  if (isSuccess) {
    data.characters_positions.forEach((charPosition: CharactersPosition) => {
      if (
        Math.abs(charPosition.position[0] - clickPosition[0]) < 24 &&
        Math.abs(charPosition.position[1] - clickPosition[1]) < 24 &&
        selectedCharacterId === charPosition.character_id
      ) {
        setTimeout(() => {
          dispatch(setFoundCharacter(charPosition.character_id));
        }, 0);
      }
    });
  }
};

const useGameOver = () => {
  const dispatch = useAppDispatch();

  const allCharacters = useAppSelector((state) => state.foundCharacters);
  const gameover = allCharacters.every((character) => character.found === true);

  if (gameover)
    setTimeout(() => {
      dispatch(resetScore());
      dispatch(stoptimer());
    }, 0);

  return gameover;
};

export { useGameRound, useGameOver };
