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
  constructor(name, id, bio, email, college, program, about, isAdmin) {
    this.name = name;
    this.nickname = "Karl";
    this.id = id;
    this.bio = bio;
    this.email = email;
    this.college = college;
    this.program = program;
    this.about = about;
  }

  equals(otherUser) {
    if (!otherUser) return false;
    return this.id === otherUser.id;
  }
}

export function userJSON_to_Object(json) {
  return new User(json.name, json._id, json.bio, json.email, json.college, json.program, json.about)
}

export let users = [
  new User(
    "Karl Omandac",
    "06706789",
    "Backend Rat",
    "karl_omandac@dlsu.edu.ph",
    "College of Computer Studies",
    "Bachelor of Science in Computer Science",
    "Man I dont even know what i want, excuse me do you sell crab legs?",
    1
  ),
  new User(
    "Byron Ang",
    "124676767",
    "Frontend God",
    "byron_ang@dlsu.edu.ph",
    "College of Computer Studies",
    "Bachelor of Science in Computer Science",
    "Burger? Your last name is burger?",
    1
  )
]

export let currentUser = users[0];