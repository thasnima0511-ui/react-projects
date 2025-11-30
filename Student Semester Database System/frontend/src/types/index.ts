
export interface Subject {
  Malayalam: number;
  English: number;
  Science: number;
  Maths: number;
}

export interface Student {
  _id?: string;
  name: string;
  age: number;
  rollno: string;
  phone: string[];
  gender?: string;
  class?: string;
  section?: string;
  classTeacher?: string;
  term1?: Subject;
  term2?: Subject;
  term3?: Subject;
  term4?: Subject;
  status?: 'Pass' | 'Fail';
}