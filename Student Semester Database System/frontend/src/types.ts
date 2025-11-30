export interface Subject {
  Malayalam: number;
  English: number;
  Science: number;
  Maths: number;
}

export interface Student {
  term2: { Malayalam: number; English: number; Science: number; Maths: number; };
  term3: { Malayalam: number; English: number; Science: number; Maths: number; };
  term1: { Malayalam: number; English: number; Science: number; Maths: number; };
  classTeacher: string;
  section: string;
  class: string;
  gender: string;
  _id?: string;
  name: string;
  age: number;
  rollno: string;
  phone: string[];
  subject: Subject;
}

export interface LoginResponse {
  token: string;
  message: string;
}
