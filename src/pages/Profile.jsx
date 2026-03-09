import { Link } from "react-router-dom";
import { useState } from "react";
import { currentUser } from "../models/Student";
import { PencilSvg } from "../components/PencilSvg";
import { StudentReservationTable } from "../components/ReservationTable";

const fields = [
  { label: "NAME", key: "name", editable: false, display: true},
  { label: "ID", key: "id", editable: false, display: true},
  { label: "EMAIL", key: "email", editable: true, display: true},
  { label: "COLLEGE", key: "college", editable: true, display: true},
  { label: "PROGRAM", key: "program", editable: true, display: true},
  { label: "ABOUT", key: "about", editable: true, display: true},
];

export function StudentProfile() {
	const [student, setStudent] = useState(currentUser);

	return (
		<div className="space-y-2">
			{fields.map((field) => (
				field.display ? (
					<div
						key={field.key}
						className="my-2 rounded-2xl gray-89 p-2 transition-transform transform hover:scale-103"
					>
						<h2 className="font-bold text-xs">{field.label}</h2>
						<h1>{student[field.key]}</h1>
					</div>
				):
				null
			))}
		</div>
	);
}

export function StudentForm() {
	return (
		<form className="w-full px-4">
			<div className="flex gap-[15px]">
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">Name</label>
					<input 
					className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
					type="text" value={currentUser.name}></input>
				</div>
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">Nickname</label>
					<input 
					className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
					type="text" value={currentUser.nickname}></input>
				</div>
			</div>

			<div className="flex gap-[15px]">
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">Student ID</label>
					<input 
					className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
					type="text" value={currentUser.id}></input>
				</div>
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1">Email</label>
					<input 
					className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
					type="text" value={currentUser.email}></input>
				</div>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">College</label>
				<input 
				className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
				type="text" value={currentUser.college}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">Program</label>
				<input 
				className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
				type="text" value={currentUser.program}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">Bio</label>
				<input 
				className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
				type="text" value={currentUser.bio}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1">Description</label>
				<textarea rows="2" 
				className="w-full px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border"
				type="text" value={currentUser.about}></textarea>
			</div>

			<div className="flex justify-center mt-4">
				<button 
					className=" px-[10px] py-[6px] bg-[#C5C5C5] text-black
					 rounded-md flex justify-center items-center
					 active:scale-95 transition-transform transform hover:scale-103">
					Save Changes
				</button>
			</div>
		</form>
	)
}

export function AccountSettings() {
	return (
		<div className="flex gap-5 w-full m-5 px-4">
			<div className="w-1/2 px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border">
				<div className="text-xlgoogle font-bold">
					Change Password
				</div>
				Update your password.
				<Link to="/ChangePassword">
					<button 
						className="mt-[3px] px-[6px] py-[3px] bg-[#C5C5C5] text-black
						rounded-md flex justify-center items-center
						active:scale-95 transition-transform transform hover:scale-103">
						Update
					</button>
				</Link>
			</div>

			{
				!(currentUser.isAdmin) ? (
					<div className="w-1/2 px-[10px] py-[6px] border-2 border-[#ccc] rounded-md text-sm font-['Inter',sans-serif] box-border">
						<div className="text-xlgoogle font-bold">
							Delete Account
						</div>
						Action is permanent.
						<Link to="/DeleteAccount">
							<button 
								className="mt-[3px] px-[6px] py-[3px] bg-[#C5C5C5] text-black
								rounded-md flex justify-center items-center
								active:scale-95 transition-transform transform hover:scale-103">
								Delete
							</button>
						</Link>
					</div>
				) : null
			}
			
		</div>
	)
}

export function Profile() {
    const [showFirst, setShowFirst] = useState(true);

    const handleToggle = () => {
        setShowFirst((prev) => !prev);
    };
    
    return(
        <div className="m-5 flex gap-4">
            <div className="rounded-2xl pb-2 gray-67 flex flex-col items-center w-1/3">
                <img className="mt-10 mb-5 rounded-full w-40" src="./src/resources/karl.png"></img>
                <h1 className="text-3xl mb-6 google font-bold">{
					currentUser.nickname.length == 0 ? currentUser.name : currentUser.nickname
				}</h1>
                <div className="text-center mb-6">
                    <h2 className="font-[serif] italic text-xl">{currentUser.bio}</h2>
                </div>
                <div className="w-full px-2 google">
                    <StudentProfile />
                </div>
                <button 
                    className="border p-2 rounded-xl flex items-center transition-transform transform hover:scale-103
                    transition transform active:scale-95 "
                    onClick={handleToggle}>
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
            </div>
			{showFirst ? (
				<div className="rounded-2xl pb-2 gray-67 flex flex-col items-center w-2/3">
					<div className="text-3xl mb-6 google font-bold mt-4">
						Reservations
					</div>
					<StudentReservationTable/>
				</div>
			) : (
				<div className="flex flex-col w-2/3 gap-4">
					<div className="rounded-2xl pb-2 gray-67 flex flex-col items-center">
						<div className="text-3xl mb-6 google font-bold mt-4">
							Edit Details
						</div>
						<StudentForm/>
					</div>
					<div className="rounded-2xl pb-2 gray-67 flex flex-col items-center">
						<div className="text-3xl mb-6 google font-bold mt-4">
							Account Settings
						</div>
						<AccountSettings/>
					</div>
				</div>
			)}
        </div>
    );
}