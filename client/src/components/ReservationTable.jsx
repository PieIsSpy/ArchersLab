import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useReservations } from "../features/reservations/hooks/useReservations.js";

const SortIcon = () => (
  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#c5c5c5">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 7c.265 0 .52.105.707.293l7 7a1 1 0 0 1-1.414 1.414L12 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 12 7z" fill="#c5c5c5"/>
  </svg>
);

const ActionArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 -960 960 960" className="flex-shrink-0">
    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" fill="currentColor"/>
  </svg>
);

function ReservationTableBody({ reservations, sort, filter, filterBy, mode, view, onApprove, onCancel }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser || reservations.length === 0) return null;

  const now = new Date();

  let list = reservations.filter((res) => {
    if (mode === "profile" && String(res.user?._id) !== String(view)) return false;

    const isOwner = String(res.user?._id) === String(currentUser._id);

    if (currentUser.isAdmin || isOwner) {
      if (mode === "room") return res.seats.length === 0;
      if (currentUser.isAdmin && res.seats.length === 0) return false;
      return true;
    }

    return res.isAnonymous === false;
  });

  list.forEach((row) => {
    const date = new Date(row.date);
    const [hour, minute] = row.time.split("-")[0].split(":").map(Number);
    date.setHours(hour, minute, 0, 0);
    row.status = row.resStatus === "Upcoming" && date < now ? "Completed" : row.resStatus;
  });

  const sortFns = {
    "date-sort": (a, b) => a.date.toString().localeCompare(b.date.toString()),
    "time-sort": (a, b) => {
      const [aH, aM] = a.time.split("-")[0].split(":").map(Number);
      const [bH, bM] = b.time.split("-")[0].split(":").map(Number);
      return aH !== bH ? aH - bH : aM - bM;
    },
    "room-sort": (a, b) => a.room._id.localeCompare(b.room._id),
    "status-sort": (a, b) => {
      const rank = { Upcoming: 1, Ongoing: 2, Cancelled: 3, Completed: 4 };
      return (rank[a.status] || 99) - (rank[b.status] || 99);
    },
    "user-sort": (a, b) =>
      (a.user?.name || "").toUpperCase().localeCompare((b.user?.name || "").toUpperCase()),
  };

  if (sortFns[sort]) list = [...list].sort(sortFns[sort]);

  if (filter) {
    if (filter[0] && filterBy[0]) {
      const target = new Date(filterBy[0]);
      list = list.filter((res) => {
        const d = new Date(res.date);
        return d.getFullYear() === target.getFullYear() && d.getMonth() === target.getMonth() && d.getDate() === target.getDate();
      });
    }
    if (filter[1]) list = list.filter((res) => res.room._id === filterBy[1]);
    if (filter[2] && filterBy[2]) {
      const q = filterBy[2].toLowerCase();
      list = list.filter((res) => (res.user?.name || "").toLowerCase().includes(q));
    }
  }

  return list.map((res, index) => (
    <tr key={index} className="border-t-2 border-gray-67">
      <td>{res.date.split("T")[0]}</td>
      <td>{res.time}</td>
      <td>{res.room._id}</td>
      {mode !== "room"
        ? <td>{res.seats.length ? res.seats.join(", ") : "Entire Room"}</td>
        : <td>{res.reason}</td>
      }
      {mode === "global" && currentUser.isAdmin && (
        <td className="flex items-center gap-2">
          {res.user?.name ?? res.inpersonInfo?.name ?? "Anonymous"}
          <button className="flex items-center gap-2 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-5 h-5">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </td>
      )}
      <td>{res.status}</td>
      <td className="flex items-center gap-2">
        {res.status === "Upcoming" && (currentUser._id === res.user?._id || currentUser.isAdmin) && (
          <button onClick={() => onCancel(res._id)} className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200">
            Cancel <ActionArrow />
          </button>
        )}
        {res.status === "Pending" && currentUser.isAdmin && (
          <>
            <button onClick={() => onApprove(res._id)} className="ml-auto flex items-center gap-2 text-green-400 hover:text-green-600 hover:scale-105 transition-all duration-200">
              Approve <ActionArrow />
            </button>
            <button onClick={() => onCancel(res._id)} className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200">
              Cancel <ActionArrow />
            </button>
          </>
        )}
      </td>
    </tr>
  ));
}

export function ReservationTable({ view = null, mode = "global", filter = [], filterBy = [] }) {
  const [sort, setSort] = useState("");
  const { reservations, loading, approve, cancel } = useReservations();

  const handleApprove = async (id) => {
    await approve(id);
    alert("Reservation approved!");
  };

  const handleCancel = async (id) => {
    await cancel(id);
    alert("Reservation cancelled!");
  };

  const th = "hover:bg-[#2e2e31] transition-colors ease-in duration-100 p-4";
  const thDiv = "flex flex-row";

  if (loading) return <div>Loading reservations...</div>;

  return (
    <div className="max-h-[50vh] overflow-auto rounded-lg">
      <table className="table-auto w-full text-left">
        <thead className="font-bold border-gray-600 sticky gray-67 top-0">
          <tr>
            {[
              { label: "Date", key: "date-sort" },
              { label: "Time", key: "time-sort" },
              { label: "Room", key: "room-sort" },
            ].map(({ label, key }) => (
              <th key={key} className={th} onClick={() => setSort(key)}>
                <div className={thDiv}>{label}{sort === key && <SortIcon />}</div>
              </th>
            ))}

            {mode !== "room" ? <th>Seats Reserved</th> : <th>Reason</th>}

            {mode === "global" && (
              <th className={th} onClick={() => setSort("user-sort")}>
                <div className={thDiv}>User{sort === "user-sort" && <SortIcon />}</div>
              </th>
            )}

            <th className={th} onClick={() => setSort("status-sort")}>
              <div className={thDiv}>Status{sort === "status-sort" && <SortIcon />}</div>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <ReservationTableBody
            reservations={reservations}
            mode={mode}
            view={view}
            sort={sort}
            filter={filter}
            filterBy={filterBy}
            onApprove={handleApprove}
            onCancel={handleCancel}
          />
        </tbody>
      </table>
    </div>
  );
}
