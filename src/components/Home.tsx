import { Link } from 'react-router-dom';
import { useFetchLevelsQuery } from '../features/levels/slices/levels-slice';
import SelectLevel from '../features/levels/components/LevelSelectButton';
import Spinner from './ui/Spinner';

const Home = () => {
  const { data, isLoading, isError, error } = useFetchLevelsQuery();

  if (isError) {
    console.error(error);
    return <p>Server error. Try again later.</p>;
  }

  return (
    <div
      id="home"
      className="container mx-auto flex grid-cols-3 flex-col gap-16 py-12 
      lg:grid lg:gap-4"
    >
      <section id="hero">
        <div className="flex flex-col gap-4 px-5 text-xl">
          <h1 className="text-4xl font-bold">
            It's all about finding the characters!
          </h1>
          <p>
            After you select a level, click on the screen and choose a
            character. If you are right about their location, a marker will be
            placed there. You win when you find all the characters!
          </p>
          <p>
            If you qualify, your score will be recorded in the high scores
            table.
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="self-center justify-self-center">
          <Spinner />
        </div>
      ) : (
        <section id="levels" className="col-span-2">
          <div className="flex flex-col gap-10 px-0 md:px-10">
            {data?.map((level) => (
              <Link to={`level/${level.id}`} key={level.id}>
                <SelectLevel
                  levelName={level.name}
                  levelImg={level.images.url_small}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
