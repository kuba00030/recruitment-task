import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/recruitment-task",
  build: { chunkSizeWarningLimit: 1600 },
});
