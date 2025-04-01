import * as z from "zod";

export const RecoveryPasswordSchema = z.object({
  email: z.string().email().nonempty("Enter valid email"),
});
