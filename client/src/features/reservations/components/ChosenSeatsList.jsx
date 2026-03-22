export function ChosenSeatsList({ selectedSeats, onRemove, onReserve }) {
  return (
    <div className="flex flex-col justify-center gray-67 rounded-2xl p-3">
      <div className="flex justify-center w-full text-xl font-bold google border-b-2 pb-3 border-gray-600">
        Chosen Seats
      </div>

      <div className="overflow-auto flex-1">
        <table className="w-full mx-auto">
          <tbody>
            {selectedSeats.map((seatID) => (
              <tr key={seatID} className="border-b-2 border-gray-600">
                <td className="text-left google">Seat #{seatID}</td>
                <td className="w-1/3 py-1 google">
                  <button
                    className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200"
                    onClick={() => onRemove(seatID)}
                  >
                    Remove
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 -960 960 960" className="flex-shrink-0">
                      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" fill="currentColor" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="w-full font-bold bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:bg-[#02497F] active:shadow-inner select-none"
        onClick={onReserve}
      >
        Reserve
      </button>
    </div>
  );
}
