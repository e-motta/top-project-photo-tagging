import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      id="header"
      className="min-w-[400px] bg-red-600 px-4 py-2 text-white"
    >
      <div className="container mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="flex scale-75 items-center py-1 sm:scale-100 sm:py-5">
          <Link to="/">
            <div
              className="flex gap-2 rounded-md border-4 border-blue-500 bg-white p-2
                px-4 font-['Optima'] text-4xl font-extrabold uppercase 
                transition-all duration-300 hover:scale-105"
            >
              <span className="text-blue-500">Where's</span>
              <span className="text-red-600">Wally?</span>
            </div>
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="text-xl transition-all duration-300 hover:scale-105 sm:text-2xl"
          >
            High scores
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
