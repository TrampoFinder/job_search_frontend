import { z } from "zod";

export const DefaultJobApplicationSchema = z.object({
  note: z.string(),
  status: z.string().min(1, "Selecione um status válido"),
});
