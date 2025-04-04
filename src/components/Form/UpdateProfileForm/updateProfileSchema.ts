import * as z from "zod";

export const UpdateProfileSchema = z.object({
  firstName: z.string().nonempty("Enter valid first name").optional(),
  lastName: z.string().nonempty("Enter valid last name").optional(),
  email: z.string().email().nonempty("Enter valid email"),
  password: z.string().nonempty("Enteder valid password").optional(),
});
