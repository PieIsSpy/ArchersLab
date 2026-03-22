import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/dark-datepicker.css";

const formcontrol =
  "gray-89 text-xl text-center px-3 h-10 w-43 rounded-xl bg-transparent " +
  "focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] " +
  "selection:bg-blue-300 selection:text-black";

function ClearIcon({ onClick }) {
  return (
    <div className="w-8 h-8 gray-89 rounded-lg cursor-pointer" onClick={onClick}>
      <svg viewBox="-2.5 0 61 61" xmlns="http://www.w3.org/2000/svg" fill="#c5c5c5" stroke="#c5c5c5">
        <path fillRule="evenodd" d="M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z"/>
      </svg>
    </div>
  );
}

export function ReservationFilter({
  rooms,
  date, onDateChange,
  room, onRoomChange,
  user = undefined, onUserChange = undefined,
}) {
  const showUserFilter = onUserChange !== undefined;

  return (
    <div className="p-4 gray-67 flex flex-col rounded-2xl">
      <h2 className="google text-3xl text-gray-400 mb-3">Filter by</h2>
      <div className="justify-center items-center rounded-2xl text-2xl google flex gap-12 w-full">

        <div className="gap-2 flex flex-row items-center justify-center">
          <div className="text-xl google flex items-center">Date:</div>
          <DatePicker
            className={formcontrol}
            selected={date}
            onChange={onDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date..."
          />
          <ClearIcon onClick={() => onDateChange(null)} />
        </div>

        <div className="gap-2 flex flex-row items-center">
          <div className="text-xl google flex items-center">Room:</div>
          <select
            value={room ?? ""}
            className={formcontrol}
            onChange={(e) => onRoomChange(e.target.value || null)}
          >
            <option value="">Select room...</option>
            {rooms.map((r) => (
              <option key={r.name} value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>

        {showUserFilter && (
          <div className="gap-2 flex flex-row items-center">
            <div className="text-xl google flex items-center">Name:</div>
            <input
              value={user ?? ""}
              className={formcontrol}
              onChange={(e) => onUserChange(e.target.value)}
              placeholder="Input a user..."
            />
            <ClearIcon onClick={() => onUserChange("")} />
          </div>
        )}
      </div>
    </div>
  );
}
