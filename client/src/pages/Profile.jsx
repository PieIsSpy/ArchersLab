import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import defaultPfp from '../resources/default.jpg'

import { PencilSvg } from "../components/Svg";
import { ReservationTable } from "../components/ReservationTable";

import { Button } from "../components/Input"
import { FormInput, FormTextArea, FormLayout } from "../components/Form";

import { fetchAccount, updateAccount } from "../services/userServices";

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

export function UserForm({setView}) {
	const {currentUser, setUser} = useContext(UserContext)
	console.log('cur:', currentUser)
	const [form, setForm] = useState({
        nickname: currentUser?.nickname || '',
        college: currentUser?.college || '',
        program: currentUser?.program || '',
        bio: currentUser?.bio || '',
        about: currentUser?.about || '',
        pfp_url: currentUser?.pfp_url || ''
    });

	useEffect(() => {
        if (currentUser) {
            setForm({
                nickname: currentUser.nickname || '',
                college: currentUser.college || '',
                program: currentUser.program || '',
                bio: currentUser.bio || '',
                about: currentUser.about || '',
                pfp_url: currentUser.pfp_url || ''
            });
        }
    }, [currentUser]);

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
			const response = await updateAccount(currentUser, form)
			if (response.ok) {
				const data = await response.json();
				setUser(data);

				if (setView) 
					setView(data)
				alert(`Profile Successfully Updated`)
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
			<form 
				className="w-full flex flex-col items-center space-y-4"
				onSubmit={updateUser}
				>
				<div className="flex gap-[15px] w-full">
					<FormInput
						label="FULL NAME"
						maxLength="40"
						value={currentUser.name} 
						readOnly
					/>
					<FormInput
						label="DISPLAY NAME"
						maxLength="25"
						onChange={handleChange}
						name='nickname'
						value={form.nickname}
					/>
				</div>

				<div className="flex gap-[15px] w-full">
					<FormInput
						label="STUDENT ID"
						maxLength="10"
						value={currentUser._id}
						readOnly
					/>

					<FormInput
						label="EMAIL"
						maxLength="50"
						onChange={handleChange}
						name='email'
						type='email'
						value={currentUser.email}
						readOnly
					/>
				</div>

				<FormInput
					label="COLLEGE"
					maxLength="50"
					onChange={handleChange}
					name='college'
					value={form.college}
				/>

				<FormInput
					label="PROGRAM"
					maxLength="50"
					onChange={handleChange}
					name='program'
					value={form.program}
				/>

				<FormInput
					label='BIO'
					maxLength="75"
					onChange={handleChange}
					name='bio'
					value={form.bio}
				/>

				<FormInput
					label="PROFILE PICTURE URL"
					maxLength="1000"
					onChange={handleChange}
					name='pfp_url'
					value={form.pfp_url}
				/>

				<FormTextArea
					label="ABOUT"
					textarea={true}
					rows="2"
					maxLength="200"
					onChange={handleChange}
					name='about'
					value={form.about}
				/>
				
				<Button
					label="Save Changes"
					type="submit"
				/>
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
							<Button 
								label="Update"
							/>
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
							<Button 
								label="Delete"
							/>
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
								<Button 
									label="Create"
								/>
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
				const data = await fetchAccount(id)
				setView(data)
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
					width='100'
					src={view.pfp_url ? view.pfp_url : defaultPfp}
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
				<><div className="text-3xl font-bold google mb-4 w-full">Reservations</div>
				<div className="rounded-2xl p-4 gray-67 items-center flex-1">
					<ReservationTable view={id} mode={'profile'} />
				</div></>
			) : (
				(isCurrentUser && (
						<div className="flex flex-col flex-1">
							<div className="text-3xl font-bold google w-full mb-4">Edit Details</div>
							<div className="gray-67 flex flex-col rounded-2xl p-4 items-center mb-4 flex-1">
								<UserForm setView={setView}/>
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