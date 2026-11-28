import * as bcrypt from "bcrypt";
import { AppError } from "../../utils/app-error";
import type { ISignupPayload, IUserResponse } from "./auth.interface";
import authRepository from "./auth.repository";

const SALT_ROUNDS = 10;

const signup = async (payload: ISignupPayload): Promise<IUserResponse> => {
  const { name, email, password, role } = payload;
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await authRepository.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  };
};

const authService = {
  signup,
};

export default authService;
