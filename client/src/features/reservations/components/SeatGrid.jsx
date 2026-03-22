import { LAYOUTS } from "../constants.js";

function SeatButton({ seatID, cell, hasReversed, isTaken, isSelected, onClick }) {
  const btnClass = [
    "w-16 h-16 flex flex-col items-center justify-center",
    isTaken ? "booked" : "hover:bg-gray-500",
    isSelected ? "blue" : "",
  ].join(" ");

  const imgSrc = cell === 2
    ? "./src/resources/computer_flipped.png"
    : "./src/resources/computer.png";

  const showTopLabel = cell === 2 || !hasReversed;
  const showBottomLabel = cell === 1 && hasReversed;

  return (
    <div className="flex flex-col items-center">
      {showTopLabel && <h1 className="m-0 text-xs">{seatID}</h1>}
      <button className={btnClass} onClick={onClick}>
        <img src={imgSrc} alt="computer" className="w-16 h-16 object-contain" />
      </button>
      {showBottomLabel && <h1 className="m-0 text-xs">{seatID}</h1>}
    </div>
  );
}

function GapCell({ cellKey }) {
  return (
    <div key={cellKey} className="w-16 h-10 flex items-center justify-center">
      <img src="./src/resources/emptyspace.png" alt="empty" className="w-16 h-10 object-contain" />
    </div>
  );
}

export function SeatGrid({ layoutId, takenSeats, selectedSeats, onSeatClick }) {
  const layoutArr = LAYOUTS[layoutId] || [];
  const hasReversed = layoutArr.some((row) => row.includes(2));

  let seatidx = 1;
  let cellidx = 0;

  const rows = layoutArr.map((row, rowIdx) => {
    const cols = row.map((cell) => {
      cellidx++;
      if (cell === 0) return <GapCell key={`gap-${cellidx}`} cellKey={`gap-${cellidx}`} />;

      const seatID = seatidx;
      const isTaken = takenSeats.some((res) => res.seats.includes(seatID));
      const isSelected = selectedSeats.includes(seatID);
      seatidx++;

      return (
        <SeatButton
          key={`seat-${seatID}`}
          seatID={seatID}
          cell={cell}
          hasReversed={hasReversed}
          isTaken={isTaken}
          isSelected={isSelected}
          onClick={() => onSeatClick(seatID, isTaken)}
        />
      );
    });

    return <div key={`row-${rowIdx}`} className="flex justify-center">{cols}</div>;
  });

  return (
    <div className="gray-67 w-200 h-160 rounded-2xl flex justify-center items-center p-8">
      <div className="flex-row">{rows}</div>
    </div>
  );
}
