import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { Button } from "../../../components/ui";

function SettingCard({ title, description, to, buttonLabel, buttonVariant = "primary" }) {
  return (
    <div className="w-1/2">
      <div className="mb-2 font-bold">{title}</div>
      <div className="px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
        <p className="mt-2">{description}</p>
        <br />
        <Link to={to}><Button variant={buttonVariant} className="mb-2">{buttonLabel}</Button></Link>
      </div>
    </div>
  );
}

export function AccountSettings() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="w-full flex gap-5 m-5 px-4">
      <SettingCard
        title="CHANGE PASSWORD"
        description="Update your password."
        to="/ChangePassword"
        buttonLabel="Update"
      />
      {currentUser.isAdmin
        ? <SettingCard title="CREATE ADMIN ACCOUNT" description="Create an admin account for lab technicians." to="/admin/AdminRegistration" buttonLabel="Create" />
        : <SettingCard title="DELETE ACCOUNT" description="Action is permanent." to="/DeleteAccount" buttonLabel="Delete" buttonVariant="danger" />
      }
    </div>
  );
}
