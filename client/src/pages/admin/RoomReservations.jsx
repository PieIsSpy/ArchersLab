import { useState } from "react";
import { MainLayout, UserGreeting } from "../../components/layout";
import { ReservationFilter } from "../../features/reservations/components";
import { ReservationTable } from "../../components/ReservationTable";
import { useRooms } from "../../features/rooms/hooks/useRooms";
import { LoadingSpinner } from "../../components/shared";

export function RoomReservations() {
  const { rooms, loading } = useRooms();

  const [date, setDate] = useState(null);
  const [room, setRoom] = useState(null);

  const filter = [!!date, !!room, false];
  const filterBy = [date, room, null];

  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout header={<UserGreeting />}>
      <h2 className="font-black google text-5xl">Room Reservations</h2>
      <ReservationFilter
        rooms={rooms}
        date={date} onDateChange={setDate}
        room={room} onRoomChange={setRoom}
      />
      <div className="px-4 rounded-2xl gray-67 shadow-lg">
        <ReservationTable filter={filter} filterBy={filterBy} mode="room" />
      </div>
    </MainLayout>
  );
}
