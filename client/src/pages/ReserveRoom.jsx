import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useRooms } from "../features/rooms/hooks/useRooms.js";
import { useReservations } from "../features/reservations/hooks/useReservations.js";
import { TIME_SLOTS } from "../features/reservations/constants.js";
import { RoomReservationForm } from "../features/reservations/components";
import { InpersonModal } from "../components/Modals";
import { LoadingSpinner } from "../components/shared";

function basedate(d = new Date()) {
  const date = new Date(d);
  date.setHours(8, 0, 0, 0);
  return date;
}

function getRoomDateLimits() {
  const today = basedate();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 14);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 31);
  return { minDate, maxDate };
}

function getAvailableSlots(reservations, selectedDate, selectedRoom) {
  return TIME_SLOTS.filter((slot) =>
    !reservations.some(
      (res) =>
        new Date(res.date).toDateString() === selectedDate.toDateString() &&
        res.room._id === selectedRoom._id &&
        res.seats.length === 0 &&
        res.resStatus !== "Cancelled" &&
        res.time === slot
    )
  );
}

function isRoomBooked(reservations, selectedDate, selectedTime, selectedRoom) {
  return reservations.some(
    (res) =>
      new Date(res.date).toDateString() === selectedDate.toDateString() &&
      res.time === selectedTime &&
      res.room._id === selectedRoom._id &&
      res.seats.length === 0 &&
      res.resStatus !== "Cancelled"
  );
}

export function ReserveRoom() {
  const { currentUser } = useContext(UserContext);
  const { rooms, loading: roomsLoading } = useRooms();
  const { reservations, loading: resLoading, create } = useReservations();
  const { minDate, maxDate } = getRoomDateLimits();
  const reasonRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(() => minDate);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlotOptions, setTimeSlotOptions] = useState([]);
  const [inpersonOpen, setInpersonOpen] = useState(false);

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) setSelectedRoom(rooms[0]);
  }, [rooms]);

  useEffect(() => {
    if (!selectedRoom) return;
    const available = getAvailableSlots(reservations, selectedDate, selectedRoom);
    setTimeSlotOptions(available.map((slot) => <option key={slot} value={slot}>{slot}</option>));
    setSelectedTime(available[0] || null);
  }, [selectedDate, selectedRoom, reservations]);

  function handleRoomChange(roomId) {
    setSelectedRoom(rooms.find((r) => r._id === roomId));
  }

  async function reserveRoom(inpersonInfo = null) {
    const reason = reasonRef.current?.value;
    if (!reason) { alert("Reason field is empty. Please provide a valid reason."); return; }
    if (isRoomBooked(reservations, selectedDate, selectedTime, selectedRoom)) {
      alert("The room is already reserved by someone else");
      return;
    }
    try {
      await create({
        user: !inpersonInfo ? currentUser._id : null,
        date: selectedDate.toISOString(),
        time: selectedTime,
        room: selectedRoom._id,
        seats: [],
        resStatus: "Pending",
        reason,
        isAnonymous: false,
        inpersonInfo: inpersonInfo || null,
      });
      if (reasonRef.current) reasonRef.current.value = "";
      alert("Reservation Successful!");
    } catch (err) {
      alert(err.message);
    }
  }

  function handleReserveClick() {
    if (isRoomBooked(reservations, selectedDate, selectedTime, selectedRoom)) {
      alert("The room is already reserved by someone else");
      return;
    }
    if (currentUser.isAdmin) { setInpersonOpen(true); return; }
    reserveRoom();
  }

  const loading = roomsLoading || resLoading;
  if (loading) return <LoadingSpinner />;
  if (!rooms.length) return <LoadingSpinner message="No rooms available." />;
  if (!selectedRoom) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-2xl gap-3">
        <div className="mr-70">
          <div className="google text-5xl font-bold">Request a room</div>
          <div className="google mt-2 text-gray-400">
            Do note that each reservation must be made 14-31 days in advance.<br />
            All requests are subject for approval.
          </div>
        </div>

        <RoomReservationForm
          selectedDate={selectedDate} onDateChange={setSelectedDate}
          minDate={minDate} maxDate={maxDate}
          rooms={rooms} selectedRoom={selectedRoom} onRoomChange={handleRoomChange}
          timeSlotOptions={timeSlotOptions} selectedTime={selectedTime} onTimeChange={setSelectedTime}
          reasonRef={reasonRef}
          onReserve={handleReserveClick}
        />

        <InpersonModal
          open={inpersonOpen}
          onClose={() => setInpersonOpen(false)}
          onConfirm={(info) => { setInpersonOpen(false); reserveRoom(info); }}
        />
      </div>
    </div>
  );
}
