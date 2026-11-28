import { pool } from "../../config/db";
import type { TRole } from "../../types";
import type { IUserPublicRow, IUserRow } from "./auth.interface";

const findByEmail = async (email: string): Promise<IUserRow | null> => {
  const result = await pool.query<IUserRow>(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
};

const create = async (payload: {
  name: string;
  email: string;
  password: string;
  role: TRole;
}): Promise<IUserPublicRow> => {
  const { name, password, email, role } = payload;

  const result = await pool.query<IUserPublicRow>(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, password, role],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User creation failed");
  }

  return user;
};

const authRepository = {
  findByEmail,
  create,
};

export default authRepository;
