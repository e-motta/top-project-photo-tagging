import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      id="header"
      className="min-w-[500px] bg-red-600 px-4 py-2 text-white"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center py-5">
          <div>
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
        </div>
        <div>
          <button
            type="button"
            className="text-2xl transition-all duration-300 hover:scale-105"
          >
            High scores
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
