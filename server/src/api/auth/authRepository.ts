import bcrypt from "bcrypt";
import User from "../../models/User";

export async function findUserById(id: string) {
  return User.findById(id);
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  return newUser.save();
}

export async function checkPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
