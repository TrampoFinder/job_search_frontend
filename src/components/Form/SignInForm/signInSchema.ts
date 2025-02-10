import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email().nonempty("Enter valid email"),
  password: z.string().nonempty("Enteder valid password"),
});
