import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { PencilSvg } from "../components/PencilSvg";
import { ReservationTable } from "../components/ReservationTable";

const formelement =
  "w-full p-3 rounded-xl gray-89 text-l font-['Inter',sans-serif] box-border " +
  "focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]" +
  " selection:bg-blue-300 selection:text-black";



export function UserProfile({user}) {
	const fields = [
	{ label: "FULL NAME", key: "name", editable: false, display: true },
	{ label: "ID", key: "_id", editable: false, display: true },
	{ label: "EMAIL", key: "email", editable: true, display: true },
	{ label: "COLLEGE", key: "college", editable: true, display: true },
	{ label: "PROGRAM", key: "program", editable: true, display: true },
	{ label: "ABOUT", key: "about", editable: true, display: true },
	];

	return (
	<div className="space-y-3">
		{fields
		.filter((field) => field.display)
		.map((field) => (
			<div key={field.key}>
			<h2 className="font-bold text-xs ml-3 mb-1">{field.label}</h2>
			<div className="rounded-xl gray-89 p-3">
				<h1 className="text-l">{user[field.key] ?? "N/A"}</h1>
			</div>
			</div>
		))}
	</div>
	);
}

export function UserForm() {
	const {currentUser, setUser} = useContext(UserContext)
	const [form, setForm] = useState({
		nickname: null,
		email: null,
		college: null,
		program: null,
		bio: null,
		about: null,
		pfp_url: null
	})

	const handleChange = (e) => {
		setForm({...form, [e.target.name]: e.target.value})
	}

	const updateUser = async (e) => {
		e.preventDefault();
		for (const key in form) {
			if (form[key] === null)
				delete form[key]
		}

		console.log(form)

		try {
			const response = await fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(form)
			})

			if (response.ok) {
				const data = await response.json();
				console.log(data)

				alert(`Profile Successfully Updated`)
				setUser(data)
			}
			else {
				alert('The user ID and password does not match')
			}
		} catch (err) {
			console.error("Failed to fetch data:", err);
		}
	}

	return (
		<form className="w-full" onSubmit={updateUser}>
			<div className="flex gap-[15px]">
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1 ml-3">FULL NAME</label>
					<input maxLength="40"
					className={`${formelement}`}
					type="text" defaultValue={currentUser.name} readOnly></input>
				</div>
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1 ml-3">DISPLAY NAME</label>
					<input maxLength="25"
					onChange={handleChange}
					name='nickname'
					value={form.nickname}
					className={`${formelement}`}
					type="text" defaultValue={currentUser.nickname}></input>
				</div>
			</div>

			<div className="flex gap-[15px]">
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1 ml-3">STUDENT ID</label>
					<input maxLength="10"
					className={`${formelement}`}
					type="text" defaultValue={currentUser._id} readOnly></input>
				</div>
				<div className="mb-3 w-full flex-1">
					<label className="block font-bold text-xs mb-1 ml-3">EMAIL</label>
					<input maxLength="50"
					onChange={handleChange}
					name='email'
					value={form.email}
					className={`${formelement}`}
					type="text" defaultValue={currentUser.email}></input>
				</div>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1 ml-3">COLLEGE</label>
				<input maxLength="50"
				onChange={handleChange}
				name='college'
				value={form.college}
					className={`${formelement}`}
				type="text" defaultValue={currentUser.college}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1 ml-3">PROGRAM</label>
				<input maxLength="50"
				onChange={handleChange}
				name='program'
				value={form.program}
					className={`${formelement}`}
				type="text" defaultValue={currentUser.program}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1 ml-3">BIO</label>
				<input maxLength="75"
				onChange={handleChange}
				name='bio'
				value={form.bio}
					className={`${formelement}`}
				type="text" defaultValue={currentUser.bio}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1 ml-3">PROFILE PICTURE URL</label>
				<input maxLength="1000"
				onChange={handleChange}
				name='pfp_url'
				value={form.pfp_url}
					className={`${formelement}`}
				type="text" defaultValue={currentUser.pfp_url}></input>
			</div>

			<div className="mb-3 w-full">
				<label className="block font-bold text-xs mb-1 ml-3">ABOUT</label>
				<textarea rows="2" maxLength="200"
				onChange={handleChange}
				name='about'
				value={form.about}
					className={`${formelement}`}
				type="text" defaultValue={currentUser.about}></textarea>
			</div>

			<div className="flex justify-center mt-4 mb-3">
				<button 
					type='submit'
					className=" px-[10px] py-[6px]
						bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none">
					Save Changes
				</button>
			</div>
		</form>
	)
}

export function AccountSettings() {
	const {currentUser} = useContext(UserContext)
	return (
		<div className="w-full flex gap-5 m-5 px-4">
				<div className="w-1/2">
					<div className="mb-2 font-bold">
						CHANGE PASSWORD
					</div>
					<div className="px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
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
				</div>
			{
				!(currentUser.isAdmin) ? (
				<div className="w-1/2">
					<div className="mb-2 font-bold">
							DELETE ACCOUNT
					</div>
					<div className="px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
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
				</div>
				) : (
				<div className="w-1/2">
					<div className="mb-2 font-bold">
							CREATE ADMIN ACCOUNT
					</div>
					<div className="px-[10px] py-[6px] gray-89 rounded-xl text-sm font-['Inter',sans-serif] box-border">
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
				</div>
				)
			}
		</div>
	)
}

export function Profile() {
	const {id} = useParams();
	const {currentUser, loading} = useContext(UserContext)
    const [showFirst, setShowFirst] = useState(true);
	const [fetching, setFetching] = useState(true);
	const [view, setView] = useState(null)
	const isCurrentUser = currentUser && (String(currentUser._id) === String(id))
	console.log(currentUser)

	useEffect(() => {
		const fetchView = async () => {
			setFetching(true);
			try {
				const response = await fetch(`http://localhost:5000/api/users/${id}`)

				if (response.ok) {
					const data = await response.json();
					setView(data)
				}
			} catch (err) {
				console.error('Error fetching:', err)
			} finally {
				setFetching(false)
			}
		}

		fetchView()
	}, [id])

    const handleToggle = () => {
        setShowFirst((prev) => !prev);
    };

	if (loading || fetching) {
		return <div className="mx-auto">Loading...</div>
	}
	
	console.log(view)
    
    return (
		<div className="grid grid-cols-3 gap-4 items-stretch mx-auto">
			<div className="col-span-1 min-h-[50vh] flex flex-col">
				<div className="text-4xl font-black google mb-4 w-full">Profile</div>
				<div className="gray-67 flex flex-col rounded-2xl p-4 items-center flex-1">
					<img
					className="rounded-full w-40 h-40 object-cover"
					// src="./src/resources/default.jpg"
					width='100'
					// src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSepbhRLPNDHSzHUzCtAGMAL77l09LCnMDClA&s'
					src={view.pfp_url ? view.pfp_url : "./src/resources/default.jpg"}
					alt="Profile"
					/>

					<h1 className="text-5xl font-bold google">
					{view.nickname ? view.nickname : view.name ? view.name : "Anonymous"}
					</h1>

					<div className="text-center">
					<h2 className="font-[serif] italic text-xl">{view.bio}</h2>
					</div>

					<div className="w-100 mt-8">
					<UserProfile user={view}/>
					</div>

					{isCurrentUser && !view.isAdmin ? (
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
			{showFirst && (!isCurrentUser || (isCurrentUser && !currentUser.isAdmin)) ? (
				<div className="flex flex-col flex-1">
				<div className="text-3xl font-bold google mb-4 w-full">Reservations</div>
				<div className="rounded-2xl p-4 gray-67 flex flex-col items-center flex-1">
					<ReservationTable view={id} mode={'profile'} />
				</div>
				</div>
			) : (
				(isCurrentUser && (
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
					)
				)
			)}
			</div>
		</div>
	);
}