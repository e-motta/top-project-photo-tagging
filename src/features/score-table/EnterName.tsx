const EnterName = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-50">
      <form
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
              />
            </label>
          </div>
          <div className="flex justify-center gap-12">
            <button
              type="button"
              className="rounded-md bg-blue-400 px-5 py-1 text-white"
            >
              Submit
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 px-5 py-1 text-white"
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EnterName;
