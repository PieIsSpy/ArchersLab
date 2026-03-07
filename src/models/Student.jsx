import { Reservation } from "./Reservation";

export class Student {
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
    this.reservations = [
      new Reservation(new Date("2025-2-16"), "6:00AM-7:00AM", "GK201", [11, 12], "Upcoming"),
      new Reservation(new Date("2025-2-16"), "6:00AM-7:00AM", "GK201", [11, 12], "Cancelled"),
    ];
    this.isAdmin = isAdmin;
  }
}

export const initialStudent = new Student(
  "Karl Omandac",
  "06706789",
  "I invoke the fifth amendment.",
  "karl_omandac@dlsu.edu.ph",
  "College of Computer Studies",
  "Bachelor of Science in Computer Science",
  "Epstein's most prized possession",
  0
);