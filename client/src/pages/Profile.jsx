import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PencilSvg } from "../components/PencilSvg";
import { Button } from "../components/ui";
import { ReservationTable } from "../components/ReservationTable";
import { LoadingSpinner } from "../components/shared";
import { useProfileView } from "../features/profile/hooks/useProfileView.js";
import { UserProfile, UserForm, AccountSettings } from "../features/profile/components";

const defaultPfp = "/src/resources/default.jpg";

function ProfileCard({ view, isCurrentUser, showFirst, onToggleEdit }) {
  return (
    <div className="col-span-1 min-h-[50vh] flex flex-col">
      <div className="text-4xl font-black google mb-4 w-full">Profile</div>
      <div className="gray-67 flex flex-col rounded-2xl p-4 items-center flex-1">
        <img className="rounded-full w-40 h-40 object-cover" src={view.pfp_url || defaultPfp} alt="Profile" />
        <h1 className="text-5xl font-bold google">{view.nickname || view.name || "Anonymous"}</h1>
        <div className="text-center">
          <h2 className="font-[serif] italic text-xl">{view.bio}</h2>
        </div>
        <div className="w-100 mt-8">
          <UserProfile user={view} />
        </div>
        {isCurrentUser && !view.isAdmin && (
          <Button variant="ghost" onClick={onToggleEdit} className="mt-4 flex items-center">
            <PencilSvg />{showFirst ? "Edit Profile" : "Cancel Editing"}
          </Button>
        )}
      </div>
    </div>
  );
}

function ReservationsPanel({ id }) {
  return (
    <>
      <div className="text-3xl font-bold google mb-4 w-full">Reservations</div>
      <div className="rounded-2xl p-4 gray-67 items-center flex-1">
        <ReservationTable view={id} mode="profile" />
      </div>
    </>
  );
}

function EditPanel() {
  return (
    <div className="flex flex-col flex-1">
      <div className="text-3xl font-bold google w-full mb-4">Edit Details</div>
      <div className="gray-67 flex flex-col rounded-2xl p-4 items-center mb-4 flex-1">
        <UserForm />
      </div>
      <div className="text-3xl font-bold google w-full mb-4">Account Settings</div>
      <div className="rounded-2xl gray-67 flex flex-col items-center">
        <AccountSettings />
      </div>
    </div>
  );
}

function RightPanel({ showFirst, isCurrentUser, isAdmin, id }) {
  const showReservations = showFirst && (!isCurrentUser || !isAdmin);
  if (showReservations) return <ReservationsPanel id={id} />;
  if (isCurrentUser) return <EditPanel />;
  return null;
}

export function Profile() {
  const { id } = useParams();
  const { currentUser, loading: authLoading } = useContext(UserContext);
  const { user: view, loading: profileLoading } = useProfileView(id);
  const [showFirst, setShowFirst] = useState(true);

  const isCurrentUser = currentUser && String(currentUser._id) === String(id);

  if (authLoading || profileLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-3 gap-4 items-stretch mx-auto">
      <ProfileCard
        view={view}
        isCurrentUser={isCurrentUser}
        showFirst={showFirst}
        onToggleEdit={() => setShowFirst((p) => !p)}
      />
      <div className="col-span-2 min-h-[50vh] flex flex-col">
        <RightPanel
          showFirst={showFirst}
          isCurrentUser={isCurrentUser}
          isAdmin={currentUser?.isAdmin}
          id={id}
        />
      </div>
    </div>
  );
}
