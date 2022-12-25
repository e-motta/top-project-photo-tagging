import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  useFetchHighScoresTableByLevelIdQuery,
  useSetNewHighScoreMutation,
} from '../scores/scores-slice';
import { getElapsedTime } from '../timer/helper';

const EnterName = ({ show, levelId }: { show: boolean; levelId: string }) => {
  const navigate = useNavigate();

  const { data } = useFetchHighScoresTableByLevelIdQuery(levelId);
  const scoresTableId = data?.id;

  const [name, setName] = useState('');

  const startTime = useAppSelector((state) => state.timer.start);
  const stopTime = useAppSelector((state) => state.timer.stop);
  const time = getElapsedTime(startTime, stopTime);

  const [setNewHighScore] = useSetNewHighScoreMutation();

  const onCancel = () => navigate('/');

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // handle state changes
    setNewHighScore({
      scoresTableId,
      newHighScore: { name, time },
    });
    setName('');
    // navigate to high scores page
  };

  return (
    <div className={show ? '' : 'hidden'}>
      <div className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-50">
        <form
          id="nameForm"
          action="#"
          className="absolute left-1/2 top-44 w-auto -translate-x-1/2 rounded-xl bg-white p-10"
        >
          <fieldset className="flex flex-col gap-10">
            <legend className="p-4 pb-12 text-xl font-bold">
              Add your time to the high scores table
            </legend>
            <div className="flex w-auto items-center justify-center gap-4">
              <label htmlFor="name" className="relative text-gray-600">
                <span className="absolute left-1 -top-6">Name</span>
                <input
                  className="rounded-md bg-gray-200 p-1 px-2 text-xl"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                  form="nameForm"
                />
              </label>
            </div>
            <div className="flex justify-center gap-12">
              <button
                type="submit"
                className="rounded-md bg-blue-400 px-5 py-1 text-white"
                onClick={onSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                className="rounded-md bg-red-600 px-5 py-1 text-white"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default EnterName;
