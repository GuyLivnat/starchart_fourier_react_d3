import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/https://GuyLivnat.github.io/starchart_fourier_react_d3",
});
