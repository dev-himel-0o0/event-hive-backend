import { z } from "zod";
import { USER_ROLE, USER_ROLES } from "../../constants";

export const signupSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name is required"),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .pipe(z.email("Invalid email address")),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
  role: z
    .enum(USER_ROLES, { error: "Role must be attendee or organizer" })
    .default(USER_ROLE.attendee),
});
