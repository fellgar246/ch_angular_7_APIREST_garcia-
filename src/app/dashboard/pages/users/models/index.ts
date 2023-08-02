export interface User {
  id: Number;
  name: String;
  lastName: String;
  age: Number;
  email: String;
  course: String;
  password: String;
}

export interface CreateUserData {
  name: String;
  lastName: String;
  age: Number;
  email: String;
  course: String;
  password: String;
}

export interface UpdateUserData {
  name?: String;
  lastName?: String;
  age?: Number;
  email?: String;
  course?: String;
}
