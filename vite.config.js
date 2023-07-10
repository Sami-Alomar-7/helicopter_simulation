import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
// https://vitejs.dev/config/

export default defineConfig({
    server : {
        port : 7000,
    },
    plugins: [
        legacy({
            targets: ["defaults"],
        }),
    ],
});
