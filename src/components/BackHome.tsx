import { useNavigate } from 'react-router-dom';

const BackHome = ({ show }: { show: boolean }) => {
  const navigate = useNavigate();
  const onCancel = () => navigate('/');

  return (
    <div className={show ? '' : 'hidden'}>
      <div className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-50">
        <div className="absolute left-1/2 top-44 flex w-auto -translate-x-1/2 flex-col items-center gap-7 rounded-xl bg-white p-10">
          <span className="text-xl font-bold">
            Congratulations, you found all the characters!
          </span>
          <span>Try doing it more quickly to qualify for the high scores.</span>
          <button
            type="button"
            className="rounded-md bg-red-600 px-5 py-1 text-white"
            onClick={onCancel}
          >
            Back home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackHome;
