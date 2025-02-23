import * as z from "zod";

export const SearchByCompanySchema = z.object({
  companyName: z.string(),
});
