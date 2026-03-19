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

export let users = [
  new User(
    "Karl Omandac", // Name
    "06706789", // ID
    "karl_omandac@dlsu.edu.ph", // Email
    "Backend Rat", // Nickname
    "Specializer in backend", // BIO
    "College of Computer Studies", // College
    "Bachelor of Science in Computer Science", // program
    "Man I dont even know what i want, excuse me do you sell crab legs?" // about
  ),
  new User(
    "Byron Ang",
    "124676767",
    "byron_ang@dlsu.edu.ph",
    "Frontend God",
    "College of Computer Studies",
    "Bachelor of Science in Computer Science",
    "Burger? Your last name is burger?",
  )
]

export let currentUser = users[0];