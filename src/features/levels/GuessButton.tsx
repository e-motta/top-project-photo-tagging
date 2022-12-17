import {
  useFetchCharactersQuery,
  useFetchSingleLevelQuery,
} from './levels-slice';

const GuessButton = ({
  levelId,
  style,
  reverse,
}: {
  levelId: string;
  style: React.CSSProperties;
  reverse: boolean;
}) => {
  const {
    data: levelData,
    isSuccess: levelIsSuccess,
    isError: levelIsError,
    error: levelError,
  } = useFetchSingleLevelQuery(levelId);

  const {
    data: charactersData,
    isSuccess: charactersIsSuccess,
    isError: charactersIsError,
    error: charactersError,
  } = useFetchCharactersQuery();

  if (levelIsError) {
    console.error(levelError);
    return <p>Server error. Try again later.</p>;
  }

  if (charactersIsError) {
    console.error(charactersError);
    return <p>Server error. Try again later.</p>;
  }

  let content;
  if (charactersIsSuccess && levelIsSuccess) {
    const notFoundCharacters = charactersData
      .map((character) => {
        const found = levelData.characters_positions.find(
          (pos) => pos.character_id === character.id
        )?.found;
        return (character = { ...character, found });
      })
      .filter((character) => !character.found);

    content = notFoundCharacters.map((character) => (
      <button
        key={character.id}
        type="button"
        className="w-12 transition-all hover:scale-110"
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
        <div className="absolute -left-[232px] flex flex-row-reverse gap-4">
          <div className="h-12 w-12 border-4 border-dashed border-black"></div>
          <div className="flex gap-2">{content}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="absolute flex w-[280px] gap-4" style={style}>
      <div className="h-12 w-12 border-4 border-dashed border-black"></div>
      <div className="flex gap-2">{content}</div>
    </div>
  );
};

export default GuessButton;
