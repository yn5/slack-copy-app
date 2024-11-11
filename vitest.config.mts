import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "lcov"], // lcov for SonarCloud compatibility
      exclude: [
        "**/*.config.*",
        "**/node_modules/**",
        "**/dist/**",
        "**/.next/**",
        "next-env.d.ts",
      ],
    },
  },
});
