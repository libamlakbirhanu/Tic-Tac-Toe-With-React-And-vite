type Props = {
  restart: () => void;
  message?: string;
};

function Modal({ restart, message }: Props) {
  return (
    <div className="absolute inset-0 backdrop-blur z-50">
      <div className="absolute top-1/2 left-1/2 p-10 rounded-md bg-white transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center font-display font-extrabold text-5xl">
          Game Over
        </h1>
        <h3 className="text-center font-display font-semibold text-red-300">
          {message}
        </h3>

        <div className="flex justify-center">
          <button
            className="bg-red-500 rounded-md p-4 mt-5 text-white"
            onClick={restart}
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
