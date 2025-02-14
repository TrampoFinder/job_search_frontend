import { z } from "zod";

export const UpdateJobApplicationSchema = z.object({
  note: z.string(),
  status: z.string().min(1, "Selecione um status válido"),
});
