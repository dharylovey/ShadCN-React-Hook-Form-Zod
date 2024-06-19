import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }).trim(),
    last: z.string().min(2, { message: "Last name is required" }).trim(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .trim()
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {message: 'Invalid password'}),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
