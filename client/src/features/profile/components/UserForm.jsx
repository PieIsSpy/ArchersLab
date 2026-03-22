import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { FormInput, Button } from "../../../components/ui";
import { updateUser } from "../../auth/services/userService.js";

const formelement =
  "w-full p-2 rounded-xl gray-89 text-l font-['Inter',sans-serif] box-border " +
  "focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]" +
  " selection:bg-blue-300 selection:text-black";

export function UserForm() {
  const { currentUser, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    nickname: currentUser.nickname || "",
    email: currentUser.email || "",
    college: currentUser.college || "",
    program: currentUser.program || "",
    bio: currentUser.bio || "",
    about: currentUser.about || "",
    pfp_url: currentUser.pfp_url || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUser(currentUser._id, form);
      alert("Profile Successfully Updated");
      setUser(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex gap-[15px]">
        <div className="mb-3 w-full flex-1">
          <FormInput label="FULL NAME" name="name" value={currentUser.name} onChange={() => {}} readOnly maxLength={40} />
        </div>
        <div className="mb-3 w-full flex-1">
          <FormInput label="DISPLAY NAME" name="nickname" value={form.nickname} onChange={handleChange} maxLength={25} />
        </div>
      </div>

      <div className="flex gap-[15px]">
        <div className="mb-3 w-full flex-1">
          <FormInput label="STUDENT ID" name="_id" value={String(currentUser._id)} onChange={() => {}} readOnly maxLength={10} />
        </div>
        <div className="mb-3 w-full flex-1">
          <FormInput label="EMAIL" name="email" value={form.email} onChange={handleChange} maxLength={50} />
        </div>
      </div>

      <div className="mb-3"><FormInput label="COLLEGE" name="college" value={form.college} onChange={handleChange} maxLength={50} /></div>
      <div className="mb-3"><FormInput label="PROGRAM" name="program" value={form.program} onChange={handleChange} maxLength={50} /></div>
      <div className="mb-3"><FormInput label="BIO" name="bio" value={form.bio} onChange={handleChange} maxLength={75} /></div>
      <div className="mb-3"><FormInput label="PROFILE PICTURE URL" name="pfp_url" value={form.pfp_url} onChange={handleChange} maxLength={1000} /></div>

      <div className="mb-3 w-full">
        <label className="block font-bold text-xs mb-1 ml-3">ABOUT</label>
        <textarea rows={2} maxLength={200} name="about" value={form.about ?? ""} onChange={handleChange} className={formelement} />
      </div>

      <div className="flex justify-center mt-4 mb-3">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
