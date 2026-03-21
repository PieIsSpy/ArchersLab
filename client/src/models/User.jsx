export class User {
  /*
    Parameters:
    name: string
    id: int
    bio: string
    email: string
    college: string
    course: string
    about: string
  */
  constructor(name, id, email, nickname, bio, college, program, about, pfp_url) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.bio = bio;
    this.college = college;
    this.program = program;
    this.about = about;
    this.pfp_url = pfp_url;
  }

  equals(otherUser) {
    if (!otherUser) return false;
    return this.id === otherUser.id;
  }
}

export function userJSON_to_Object(json) {
  return new User(
    json.name, 
    json._id, 
    json.email, 
    json?.nickname || "",
    json?.bio || "", 
    json?.college || "", 
    json?.program || "Walk-in", 
    json?.about || "",
    json?.pfp_url || ""
  )
}