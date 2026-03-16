import { Link } from "react-router-dom";
import { useState } from "react";
import { currentUser } from "../models/User";
import { PencilSvg } from "../components/PencilSvg";
import { ReservationTable } from "../components/ReservationTable";

const formelement =
  "w-full px-[10px] py-[6px] rounded-xl gray-89 text-lg font-['Inter',sans-serif] box-border " +
  "focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]" +
  " selection:bg-blue-300 selection:text-black";

export function StudentProfile() {
  const [student, setStudent] = useState(currentUser);

  const fields = [
    { label: "FULL NAME", key: "name", editable: false, display: true },
    { label: "ID", key: "id", editable: false, display: true },
    { label: "EMAIL", key: "email", editable: true, display: true },
    { label: "COLLEGE", key: "college", editable: true, display: true },
    { label: "PROGRAM", key: "program", editable: true, display: true },
    { label: "ABOUT", key: "about", editable: true, display: true },
  ];

  return (
    <div className="space-y-2">
      {fields
        .filter((field) => field.display)
        .map((field) => (
          <div key={field.key}>
            <h2 className="font-bold text-s mb-1">{field.label}</h2>
            <div className="rounded-xl gray-89 p-2 transition-transform transform hover:scale-[1.03]">
              <h1 className="text-lg">{student[field.key] ?? "N/A"}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}
export function StudentForm() {
	return (
		<form className="w-full px-4">
			<div className="flex gap-[15px]">
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">FULL NAME</label>
					<input 
					className={`${formelement}`}
					type="text" defaultValue={currentUser.name}></input>
				</div>
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">DISPLAY NAME</label>
					<input 
					className={`${formelement}`}
					type="text" defaultValue={currentUser.nickname}></input>
				</div>
			</div>

			<div className="flex gap-[15px]">
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">STUDENT ID</label>
					<input 
					className={`${formelement}`}
					type="text" defaultValue={currentUser.id}></input>
				</div>
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">EMAIL</label>
					<input 
					className={`${formelement}`}
					type="text" defaultValue={currentUser.email}></input>
				</div>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">COLLEGE</label>
				<input 
					className={`${formelement}`}
				type="text" defaultValue={currentUser.college}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">PROGRAM</label>
				<input 
					className={`${formelement}`}
				type="text" defaultValue={currentUser.program}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">BIO</label>
				<input 
					className={`${formelement}`}
				type="text" defaultValue={currentUser.bio}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">DESCRIPTION</label>
				<textarea rows="2" 
					className={`${formelement}`}
				type="text" defaultValue={currentUser.about}></textarea>
			</div>

			<div className="flex justify-center mt-4 mb-3">
				<button 
					className=" px-[10px] py-[6px]
						bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none">
					Save Changes
				</button>
			</div>
		</form>
	)
}

export function AccountSettings() {
	return (
		<div className="w-full flex gap-5 m-5 px-4">
			<div className="w-1/2 px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
				<div className="my-2 text-xlgoogle font-bold">
					Change Password
				</div>
				<p className="mt-2">Update your password.</p>
				<br/>
				<Link to="/ChangePassword">
					<button 
						className="px-[15px] py-[5px] mb-2
						bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none">
						Update
					</button>
				</Link>
			</div>

			{
				!(currentUser.isAdmin) ? (
				<div className="w-1/2 px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
					<div className="my-2 text-xlgoogle font-bold">
							Delete Account
						</div>
				<p className="mt-2">Action is permanent.</p>
				<br/>
						<Link to="/DeleteAccount">
							<button 
								className="px-[15px] py-[5px] mb-2
								bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 hover:bg-[#7f0202] active:shadow-inner select-none">
								Delete
							</button>
						</Link>
					</div>
				) : (
				<div className="w-1/2 px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
					<div className="my-2 text-xlgoogle font-bold">
							Create Admin Account
					</div>
				<p className="mt-2">Create an admin account for lab technicians</p>
				<br/>
						<Link to="/admin/AdminRegistration">
							<button 
								className="px-[15px] py-[5px] mb-2
								bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none">
								Create
							</button>
						</Link>
					</div>
				)
			}
			
		</div>
	)
}

export function Profile() {
    const [showFirst, setShowFirst] = useState(true);

    const handleToggle = () => {
        setShowFirst((prev) => !prev);
    };
    
    return (
		<div className="m-5 grid grid-cols-3 gap-4 items-stretch">
			<div className="col-span-1 min-h-[50vh] flex flex-col">
			<div className="text-4xl font-black google mb-4 w-full">Profile</div>
			<div className="gray-67 flex flex-col rounded-2xl p-4 items-center flex-1">
				<img
				className="rounded-full w-40"
				src="./src/resources/karl.png"
				alt="Profile"
				/>

				<h1 className="text-5xl font-bold google">
				{currentUser.nickname.length === 0 ? currentUser.name : currentUser.nickname}
				</h1>

				<div className="text-center">
				<h2 className="font-[serif] italic text-xl">{currentUser.bio}</h2>
				</div>

				<div className="w-full flex-1">
				<StudentProfile />
				</div>

				{!currentUser.isAdmin ? (
				<button
					className="border p-2 rounded-xl flex items-center transition-transform transform hover:scale-103 active:scale-95 mt-4"
					onClick={handleToggle}
				>
					{showFirst ? (
					<>
						<PencilSvg /> Edit Profile
					</>
					) : (
					<>
						<PencilSvg /> Cancel Editing
					</>
					)}
				</button>
				): null}
			</div>
			</div>

			<div className="col-span-2 min-h-[50vh] flex flex-col">
			{showFirst && !currentUser.isAdmin ? (
				<div className="flex flex-col flex-1">
				<div className="text-3xl font-bold google mb-4 w-full">Reservations</div>
				<div className="rounded-2xl p-4 gray-67 flex flex-col items-center flex-1">
					<ReservationTable student={currentUser} />
				</div>
				</div>
			) : (
				<div className="flex flex-col flex-1">
					<div className="text-3xl font-bold google w-full mb-4">Edit Details</div>
					<div className="gray-67 flex flex-col rounded-2xl p-4 items-center mb-4 flex-1">
						<StudentForm />
					</div>

					<div className="text-3xl font-bold google w-full mb-4">Account Settings</div>
					<div className="rounded-2xl pb-2 gray-67 flex flex-col items-center flex-1">
						<AccountSettings />
					</div>
				</div>
			)}
			</div>
		</div>
	);
}