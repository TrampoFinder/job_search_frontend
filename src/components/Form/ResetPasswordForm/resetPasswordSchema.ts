import * as z from "zod";


export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("Enter a valid password"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
      .nonempty("Enter a valid confirmation password"),
    recoveryCode: z.string().nonempty("Enter valid recovery code"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });