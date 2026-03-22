import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/dark-datepicker.css";

const selectStyle = { width: "120px", height: "50px", borderRadius: "8px", padding: "6px 10px" };
const timeslotStyle = { width: "160px", height: "50px", borderRadius: "8px", padding: "6px 10px" };

export function RoomReservationForm({
  selectedDate, onDateChange, minDate, maxDate,
  rooms, selectedRoom, onRoomChange,
  timeSlotOptions, selectedTime, onTimeChange,
  reasonRef,
  onReserve,
}) {
  return (
    <div className="flex flex-col gray-67 rounded-2xl text-2xl google p-6">
      <div className="flex justify-center items-center gap-x-12">

        <div className="gap-2 flex flex-row">
          <div className="text-xl google flex items-center justify-center">Date:</div>
          <div className="text-xl w-[150px] flex items-center justify-center">
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

        <div className="gap-2 flex flex-row">
          <div className="text-xl google flex items-center justify-center">Room:</div>
          <select
            className="text-xl gray-89 text-center"
            style={selectStyle}
            value={selectedRoom._id}
            onChange={(e) => onRoomChange(e.target.value)}
          >
            {rooms.map((r) => <option key={r._id} value={r._id}>{r._id}</option>)}
          </select>
        </div>

        <div className="gap-2 flex flex-row">
          <div className="text-xl google flex items-center justify-center">Timeslot:</div>
          <select
            className="text-xl gray-89"
            style={timeslotStyle}
            value={selectedTime ?? ""}
            onChange={(e) => onTimeChange(e.target.value)}
          >
            {timeSlotOptions}
          </select>
        </div>
      </div>

      <div className="mt-5 text-xl google flex items-center">Reason:</div>
      <textarea
        ref={reasonRef}
        rows={2}
        placeholder="Please insert reason here"
        className="w-full p-3 rounded-xl gray-89 text-l font-['Inter',sans-serif] box-border focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
        maxLength={100}
      />

      <div className="flex justify-center mt-6">
        <div
          className="bg-[#145b92] p-3 rounded-xl transition-all hover:scale-110 active:scale-105 active:bg-[#02497F] active:shadow-inner select-none cursor-pointer"
          onClick={onReserve}
        >
          Request Room Reservation
        </div>
      </div>
    </div>
  );
}
