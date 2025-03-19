import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ["ec2-15-228-225-108.sa-east-1.compute.amazonaws.com", "all"],
  },
  plugins: [tailwindcss(), react()],
});
