const Hint = ({ show, message }: { show: boolean; message: string }) => {
  return (
    <div className={show ? '' : 'hidden'}>
      <div
        className="fixed top-44 left-1/2 flex -translate-x-1/2 items-center 
    justify-center rounded-lg bg-white py-2 px-5"
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Hint;
