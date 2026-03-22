import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/dark-datepicker.css";

const selectStyle = { width: "120px", height: "50px", borderRadius: "8px", padding: "6px 10px" };
const timeslotStyle = { width: "160px", height: "50px", borderRadius: "8px", padding: "6px 10px" };

export function SeatControls({
  selectedDate, onDateChange, minDate, maxDate,
  rooms, selectedRoom, onRoomChange,
  timeSlotOptions, selectedTime, onTimeChange,
  anonRef,
}) {
  return (
    <div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex gap-20 px-10">
      <div className="gap-2 flex flex-row justify-center items-center">
        <div className="text-xl google flex items-center justify-center">Date:</div>
        <div className="text-xl w-[150px] h-[100px] flex items-center justify-center">
          <DatePicker
            className="gray-89 text-xl w-full p-3 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
            selected={selectedDate}
            onChange={onDateChange}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>

      <label className="text-xl gap-3 flex flex-row justify-center items-center">
        <div>Room:</div>
        <select className="text-xl gray-89 text-center" style={selectStyle} value={selectedRoom._id} onChange={(e) => onRoomChange(e.target.value)}>
          {rooms.map((r) => <option key={r._id} value={r._id}>{r._id}</option>)}
        </select>
      </label>

      <label className="text-xl gap-3 flex flex-row justify-center items-center">
        <div>Timeslot:</div>
        <select className="text-xl gray-89" style={timeslotStyle} value={selectedTime ?? ""} onChange={(e) => onTimeChange(e.target.value)}>
          {timeSlotOptions}
        </select>
      </label>

      <label className="text-xl gap-3 flex flex-row justify-center items-center">
        <div>Anonymous?</div>
        <input ref={anonRef} type="checkbox" className="appearance-none w-5 h-5 border-2 border-gray-400 rounded checked:bg-gray-500 checked:border-gray-500" />
      </label>
    </div>
  );
}
