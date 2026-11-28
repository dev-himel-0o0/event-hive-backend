import type { QueryResultRow } from "pg";
import type { TRole } from "../../types";

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: TRole;
}

export interface IUserRow extends QueryResultRow {
  id: number;
  name: string;
  email: string;
  password: string;
  role: TRole;
  created_at: Date;
  updated_at: Date;
}

export interface IUserPublicRow extends QueryResultRow {
  id: number;
  name: string;
  email: string;
  role: TRole;
  created_at: Date;
  updated_at: Date;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  role: TRole;
  created_at: string;
  updated_at: string;
}
