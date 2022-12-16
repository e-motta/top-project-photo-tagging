import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      id="header"
      className="min-w-[500px] bg-red-600 px-4 py-2 text-white"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5 py-7">
          <div>
            <Link to="/">
              <div
                className=" text-4xl font-bold transition-all duration-300 
                hover:scale-105"
              >
                Where's Wally?
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
