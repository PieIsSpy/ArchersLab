import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { MainLayout, UserGreeting } from "../components/layout";
import { ReservationFilter } from "../features/reservations/components";
import { ReservationTable } from "../components/ReservationTable";
import { useRooms } from "../features/rooms/hooks/useRooms";
import { LoadingSpinner } from "../components/shared";

function UserReservations({ userId }) {
  return (
    <>
      <h2 className="font-black google text-4xl">Current Reservations</h2>
      <div className="px-4 rounded-2xl gray-67 shadow-lg">
        <ReservationTable view={userId} mode="profile" />
      </div>
    </>
  );
}

function AdminReservations({ rooms, date, setDate, room, setRoom, user, setUser }) {
  const filter = [!!date, !!room, !!user];
  const filterBy = [date, room, user];

  return (
    <>
      <h2 className="font-black google text-5xl">All Reservations</h2>
      <ReservationFilter
        rooms={rooms}
        date={date} onDateChange={setDate}
        room={room} onRoomChange={setRoom}
        user={user} onUserChange={setUser}
      />
      <div className="px-4 rounded-2xl gray-67 shadow-lg">
        <ReservationTable filter={filter} filterBy={filterBy} mode="global" />
      </div>
    </>
  );
}

export function Home() {
  const { currentUser } = useContext(UserContext);
  const { rooms, loading } = useRooms();

  const [date, setDate] = useState(null);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout header={<UserGreeting />}>
      {currentUser.isAdmin
        ? <AdminReservations rooms={rooms} date={date} setDate={setDate} room={room} setRoom={setRoom} user={user} setUser={setUser} />
        : <UserReservations userId={currentUser._id} />
      }
    </MainLayout>
  );
}
