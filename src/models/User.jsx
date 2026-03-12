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
    this.password = "password";
    this.isAdmin = isAdmin;
  }

  equals(otherUser) {
    if (!otherUser) return false;
    return this.id === otherUser.id;
  }
}

let users = [
  new User(
    "Karl Omandac",
    "06706789",
    "I invoke the fifth amendment.",
    "karl_omandac@dlsu.edu.ph",
    "College of Computer Studies",
    "Bachelor of Science in Computer Science",
    "Epstein's most prized possession",
    0
  )
]

export let currentUser = users[0];