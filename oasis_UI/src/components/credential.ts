interface Credentials {
  email: string;
  password: string;
}

const users: Credentials[] = [
  { email: "sarah@gmail.com", password: "123" },
  // { email: "sarah@", password: "123" },
  { email: "thanu@gmail.com", password: "thanu123" },
];

export default users;