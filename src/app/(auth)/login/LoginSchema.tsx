import { z } from "zod";

export const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .trim()
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {message: 'Invalid password'}),
  })
