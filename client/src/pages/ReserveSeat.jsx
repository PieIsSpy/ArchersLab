import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useRooms } from "../features/rooms/hooks/useRooms.js";
import { useReservations } from "../features/reservations/hooks/useReservations.js";
import { TIME_SLOTS } from "../features/reservations/constants.js";
import { SeatGrid, SeatControls, ChosenSeatsList } from "../features/reservations/components";
import { Modal, InpersonModal } from "../components/Modals";
import { LoadingSpinner } from "../components/shared";

function basedate(d = new Date()) {
  const date = new Date(d);
  date.setHours(8, 0, 0, 0);
  return date;
}

function getDateLimits() {
  const today = basedate();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 10);
  return { minDate: today, maxDate };
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

function getReservationDetails(reservations, selectedDate, selectedRoom, selectedTime, seatID) {
  const res = reservations.find(
    (r) =>
      new Date(r.date).toDateString() === selectedDate.toDateString() &&
      r.room._id === selectedRoom._id &&
      r.time === selectedTime &&
      r.seats.includes(seatID)
  );
  if (!res) return { name: "Unknown User", isRegistered: false };
  if (res.isAnonymous) return { name: "Anonymous", isRegistered: false };
  if (res.user) return { name: res.user.name, id: res.user._id, isRegistered: true };
  if (res.inpersonInfo) return { name: res.inpersonInfo.name, isRegistered: false };
  return { name: "Unknown User", isRegistered: false };
}

function BookedSeatModalContent({ info }) {
  return (
    <>
      <p>Seat is already booked by:</p>
      <h1 className="mt-10 text-3xl font-bold google">{info.name}</h1>
      {info.isRegistered
        ? <Link to={`/Profile/${info.id}`} className="text-gray-500 mb-10 hover:text-blue-600 transition-colors block">View Profile</Link>
        : <div className="mb-10" />
      }
    </>
  );
}

export function ReserveSeat() {
  const { currentUser } = useContext(UserContext);
  const { rooms, loading: roomsLoading } = useRooms();
  const { reservations, loading: resLoading, create } = useReservations();
  const { minDate, maxDate } = getDateLimits();
  const anonRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(basedate());
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [timeSlotOptions, setTimeSlotOptions] = useState([]);
  const [inpersonOpen, setInpersonOpen] = useState(false);
  const [bookedModal, setBookedModal] = useState({ open: false, info: null });

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) setSelectedRoom(rooms[0]);
  }, [rooms]);

  useEffect(() => {
    if (!selectedRoom) return;
    const available = getAvailableSlots(reservations, selectedDate, selectedRoom);
    setTimeSlotOptions(available.map((slot) => <option key={slot} value={slot}>{slot}</option>));
    setSelectedTime(available[0] || null);
  }, [selectedDate, selectedRoom, reservations]);

  useEffect(() => {
    if (!selectedRoom) { setTakenSeats([]); setSelectedSeats([]); return; }
    const taken = reservations.filter(
      (res) =>
        new Date(res.date).toDateString() === selectedDate.toDateString() &&
        res.room._id === selectedRoom._id &&
        res.time === selectedTime &&
        res.resStatus !== "Cancelled"
    );
    setTakenSeats(taken);
    setSelectedSeats([]);
  }, [selectedDate, selectedRoom, selectedTime, reservations]);

  function toggleSeat(seatID) {
    if (selectedSeats.includes(seatID)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatID));
      return;
    }
    if (selectedSeats.length >= 5) { alert("You can only reserve 5 seats per timeslot/room!"); return; }
    setSelectedSeats((prev) => [...prev, seatID].sort((a, b) => a - b));
  }

  function handleSeatClick(seatID, isTaken) {
    if (isTaken) {
      const info = getReservationDetails(reservations, selectedDate, selectedRoom, selectedTime, seatID);
      setBookedModal({ open: true, info });
      return;
    }
    toggleSeat(seatID);
  }

  function handleRoomChange(roomId) {
    setSelectedRoom(rooms.find((r) => r._id === roomId));
    setSelectedSeats([]);
  }

  async function reserveSeat(inpersonInfo = null) {
    if (!selectedSeats.length) { alert("Please select a seat!"); return; }
    try {
      await create({
        user: !inpersonInfo ? currentUser._id : null,
        date: selectedDate.toISOString(),
        time: selectedTime,
        room: selectedRoom._id,
        seats: selectedSeats,
        resStatus: "Upcoming",
        reason: "",
        isAnonymous: anonRef.current?.checked || false,
        inpersonInfo: inpersonInfo || null,
      });
      setSelectedSeats([]);
      alert("Reservation Successful!");
    } catch (err) {
      alert(err.message);
    }
  }

  function handleReserveClick() {
    if (!selectedSeats.length) { alert("Please select a seat!"); return; }
    if (currentUser.isAdmin) { setInpersonOpen(true); return; }
    reserveSeat();
  }

  const loading = roomsLoading || resLoading;
  if (loading) return <LoadingSpinner />;
  if (!rooms.length) return <LoadingSpinner message="No rooms available." />;
  if (!selectedRoom) return <LoadingSpinner />;

  return (
    <div className="rounded-2xl gap-3 mx-auto">
      <div className="grid gap-4 w-3/4 grid-rows-[auto_1fr]">
        <div className="text-5xl google font-bold">Reserve a seat</div>

        <SeatControls
          selectedDate={selectedDate} onDateChange={setSelectedDate}
          minDate={minDate} maxDate={maxDate}
          rooms={rooms} selectedRoom={selectedRoom} onRoomChange={handleRoomChange}
          timeSlotOptions={timeSlotOptions} selectedTime={selectedTime} onTimeChange={setSelectedTime}
          anonRef={anonRef}
        />

        <div className="grid grid-cols-[auto_1fr] justify-center items-stretch rounded-2xl gap-4">
          <SeatGrid
            layoutId={selectedRoom.layout}
            takenSeats={takenSeats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
          />
          <ChosenSeatsList
            selectedSeats={selectedSeats}
            onRemove={toggleSeat}
            onReserve={handleReserveClick}
          />
        </div>

        <InpersonModal open={inpersonOpen} onClose={() => setInpersonOpen(false)} onConfirm={(info) => { setInpersonOpen(false); reserveSeat(info); }} />
        <Modal open={bookedModal.open} onClose={() => setBookedModal({ open: false, info: null })}>
          {bookedModal.info && <BookedSeatModalContent info={bookedModal.info} />}
        </Modal>
      </div>
    </div>
  );
}
