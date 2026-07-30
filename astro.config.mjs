import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://demo-base-app.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
