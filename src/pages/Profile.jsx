import { useState } from "react";
import { initialStudent } from "../models/Student";
import { PencilSvg } from "../components/PencilSvg";
import { ReservationTable } from "../components/ReservationTable";

const fields = [
  { label: "NAME", key: "name", editable: false, display: false},
  { label: "ID", key: "id", editable: false, display: true},
  { label: "BIO", key: "bio", editable: true, display: false},
  { label: "EMAIL", key: "email", editable: true, display: true},
  { label: "COLLEGE", key: "college", editable: true, display: true},
  { label: "COURSE", key: "course", editable: true, display: true},
  { label: "ABOUT", key: "about", editable: true, display: true},
];

export function StudentProfile() {
	const [student, setStudent] = useState(initialStudent);

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

// export function StudentForm({ student, handleToggle }) {
// 	const [formData, setFormData] = useState({ ...student });

// 	const handleSave = () => {
// 		Object.keys(formData).forEach((key) => {
// 			student[key] = formData[key];
// 		});
// 		// alert("Profile updated!");
// 		handleToggle();
// 	};

//   	return (
// 		<div className="space-y-2">
// 		{fields.map((field) => (
// 			field.editable ? (
// 				<div
// 					key={field.key}
// 					className="my-2 rounded-2xl gray-89 p-2 transition-transform transform hover:scale-103"
// 				>
// 				<h2 className="font-bold text-xs">{field.label}</h2>
// 				<input 
// 					type="text" 
// 					value={formData[field.key]}
// 					onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))} 
// 					className="w-full border-b border-gray-700 gray-89 focus:outline-none focus:border-blue-800 text-gray-900"
// 				/>
// 				</div>
// 			) : (
// 				<div
// 					key={field.key}
// 					className="my-2 rounded-2xl gray-89 p-2 transition-transform transform hover:scale-103 cursor-not-allowed"
// 				>
// 				<h2 className="font-bold text-xs">{field.label}</h2>
// 				<h1>{student[field.key]}</h1>
// 				</div>
// 			)
// 		))}
// 			<div className="flex gap-2 justify-center mt-4">
// 					<button 
// 					className="border p-2 rounded-xl flex items-center 
// 					transition transform active:scale-95"
// 					onClick={handleSave}>
// 					Save
// 				</button>
// 				<button 
// 					className="border p-2 rounded-xl flex items-center 
// 					transition transform active:scale-95"
// 					onClick={handleToggle}>
// 					Discard
// 				</button>
// 			</div>
// 		</div>
//   	);
// }

export function Profile() {
    const [showFirst, setShowFirst] = useState(true);

    const handleToggle = () => {
        setShowFirst((prev) => !prev);
    };
    
    return(
        <div className="m-5 flex gap-4">
            <div className="rounded-2xl pb-2 gray-67 flex flex-col items-center w-1/3">
                <img className="mt-10 mb-5 rounded-full w-40" src="./src/resources/karl.png"></img>
                <h1 className="text-3xl mb-6 google font-bold">{initialStudent.name}</h1>
                <div className="text-center mb-6">
                    <h2 className="font-[serif] italic text-xl">{initialStudent.bio}</h2>
                </div>
                <div className="w-full px-2 google">
                    <StudentProfile />
                </div>
                <button 
                    className="border p-2 rounded-xl flex items-center 
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
			<div className="rounded-2xl pb-2 gray-67 flex flex-col items-center w-2/3">
				<div className="text-3xl mb-6 google font-bold mt-4">
					Reservations
				</div>
				<ReservationTable/>
			</div>
        </div>
    );
}