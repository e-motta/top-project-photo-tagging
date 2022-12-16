const LevelSelectButton = ({
  levelName,
  levelImg,
}: {
  levelName: string;
  levelImg: string;
}) => {
  return (
    <div
      className="group relative h-44 
      overflow-hidden hover:opacity-100 md:rounded-3xl"
    >
      <img
        src={levelImg}
        alt={levelName}
        className="absolute top-1/2 -translate-y-1/2"
      />
      <span
        className="absolute left-0 top-0 
        h-full w-full bg-white opacity-50
        group-hover:hidden"
      />
      <span
        className="absolute bottom-10 left-10 text-8xl 
        font-extrabold text-red-700 transition-all duration-700
        group-hover:text-red-900"
      >
        {levelName}
      </span>
    </div>
  );
};

export default LevelSelectButton;
