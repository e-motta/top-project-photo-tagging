import Spinner from '../../components/ui/Spinner';
import { useFetchLevelsQuery } from '../levels/slices/levelsSlice';
import { useFetchHighScoresTablesQuery } from './scoresSlice';
import Table from './components/Table';

const HighScores = () => {
  const {
    data: scoresData,
    isLoading: scoresIsLoading,
    isError: scoresIsError,
    error: scoresError,
  } = useFetchHighScoresTablesQuery();

  const {
    data: levelsData,
    isLoading: levelsIsLoading,
    isError: levelsIsError,
    error: levelsError,
  } = useFetchLevelsQuery();

  if (scoresIsLoading || levelsIsLoading) {
    return (
      <div className="m-10 flex w-auto justify-center">
        <Spinner />
      </div>
    );
  }

  if (scoresIsError) {
    console.error(scoresError);
    return <p>Server error. Try again later.</p>;
  }

  if (levelsIsError) {
    console.error(levelsError);
    return <p>Server error. Try again later.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-10 pt-10 sm:p-10">
      {scoresData
        ? [...scoresData]
            .sort((scoreA, scoreB) => {
              if (scoreA.levelId < scoreB.levelId) return -1;
              if (scoreA.levelId > scoreB.levelId) return 1;
              return 0;
            })
            .map((score) => {
              const levelName = levelsData?.find(
                (level) => level.id === score.levelId
              )?.name;

              const scores = score.scores ? score.scores : [];
              const orderedTop5 = [...scores]
                .sort((scoreA, scoreB) => scoreA.time - scoreB.time)
                .slice(0, 5);

              return (
                <Table
                  key={score.id}
                  levelName={levelName ? levelName : ''}
                  scores={orderedTop5}
                />
              );
            })
        : 'No data'}
    </div>
  );
};

export default HighScores;
