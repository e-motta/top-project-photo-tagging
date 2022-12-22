import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { CharactersPosition } from '../../../types';
import { setFoundCharacter, useFetchSingleLevelQuery } from '../levels-slice';

const useGameRound = ({
  levelId,
  clickPosition,
  selectedCharacterId,
}: {
  levelId: string;
  clickPosition: [number, number];
  selectedCharacterId: string | null;
}) => {
  const [gameover, setGameover] = useState(false);

  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSingleLevelQuery(levelId);

  if (isError) console.error(error);

  if (isSuccess) {
    data.characters_positions.forEach((charPosition: CharactersPosition) => {
      if (
        Math.abs(charPosition.position[0] - clickPosition[0]) < 24 &&
        Math.abs(charPosition.position[1] - clickPosition[1]) < 24 &&
        selectedCharacterId === charPosition.character_id
      ) {
        console.log('setFoundCharacter');
        dispatch(setFoundCharacter(charPosition.character_id));
      }
    });
  }

  return { gameover };
};

export default useGameRound;
