export class Student {
  constructor(name, id, bio, email, college, course, about) {
    this.name = name;
    this.id = id;
    this.bio = bio;
    this.email = email;
    this.college = college;
    this.course = course;
    this.about = about;
	this.password = "password";
	this.reservations = [];
  }
}

export const initialStudent = new Student(
  "Karl Omandac",
  "06706789",
  "I invoke the fifth amendment.",
  "karl_omandac@dlsu.edu.ph",
  "College of Computer Studies",
  "Bachelor of Science in Computer Science",
  "Epstein's most prized possession"
);