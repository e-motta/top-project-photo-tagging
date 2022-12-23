import { useAppDispatch } from '../../../app/hooks';
import { CharactersPosition } from '../../../types';
import { useFetchSingleLevelQuery } from '../levels-slice';
import { setFoundCharacter } from '../found-characters-slice';

const useGameRound = ({
  levelId,
  clickPosition,
  selectedCharacterId,
}: {
  levelId: string;
  clickPosition: [number, number];
  selectedCharacterId: string | null;
}) => {
  const dispatch = useAppDispatch();

  const { data, isSuccess, isError, error } = useFetchSingleLevelQuery(levelId);

  if (isError) console.error(error);

  if (isSuccess) {
    data.characters_positions.forEach((charPosition: CharactersPosition) => {
      if (
        Math.abs(charPosition.position[0] - clickPosition[0]) < 24 &&
        Math.abs(charPosition.position[1] - clickPosition[1]) < 24 &&
        selectedCharacterId === charPosition.character_id
      ) {
        dispatch(setFoundCharacter(charPosition.character_id));
      }
    });
  }
};

export default useGameRound;
