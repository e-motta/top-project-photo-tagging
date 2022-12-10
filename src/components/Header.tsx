const Header = () => {
  return (
    <header className="flex items-center justify-between bg-red-600 text-white">
      <div className="flex items-center gap-5 p-5 pl-10">
        <div className="rounded-t-full bg-white">
          <img
            // todo: change img src to backend
            src="../../resources/wally-head.png"
            alt="wally's face"
            className="h-20 object-scale-down"
          />
        </div>
        <div>
          <button type="button" className="text-4xl font-bold">
            Where's Wally?
          </button>
        </div>
      </div>
      <div className="p-5 pr-10">
        <button type="button" className="text-2xl">
          High scores
        </button>
      </div>
    </header>
  );
};

export default Header;
