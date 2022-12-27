import { Score } from '../../../types';
import { splitTime } from '../../timer/helper';

const Table = ({
  levelName,
  scores,
}: {
  levelName: string;
  scores: Score[];
}) => {
  return (
    <div className="relative cursor-default overflow-x-auto border border-red-400 shadow-md sm:rounded-lg md:w-[650px]">
      <h2 className="p-1 pl-5 text-xl font-bold text-blue-500">
        Top 5 - {levelName}
      </h2>
      <table className="w-full table-auto text-left text-sm text-red-100">
        <thead className="bg-red-600 text-xs uppercase text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Player
            </th>
            <th scope="col" className="py-3 px-6">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.length ? (
            scores.map((score) => {
              const { hh, mm, ss, msec } = splitTime(score.time);
              return (
                <tr
                  key={score.id}
                  className="border-b border-red-400 bg-red-400 hover:bg-red-500"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-white"
                  >
                    {score.name}
                  </th>
                  <td className="w-1 py-4 px-6 font-mono">
                    <span>{('0' + hh).slice(-2)}:</span>
                    <span>{('0' + mm).slice(-2)}:</span>
                    <span>{('0' + ss).slice(-2)}.</span>
                    <span>{(msec + '00').slice(0, 3)}</span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="border-b border-red-400 bg-red-400">
              <td className="py-4 px-6">No scores yet!</td>
              <td className="w-[150px]"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
