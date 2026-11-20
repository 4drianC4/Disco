import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const serverOnlyInfra = [
  "@/shared/lib/prisma",
  "@/shared/lib/access",
  "@/shared/lib/origin",
  "@/shared/lib/api-error",
  "@/auth",
  "@/generated/**",
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/**",
  ]),

  // 1. El frontend no toca backend ni infraestructura de servidor ni UI de otros módulos.
  {
    files: ["src/features/*/frontend/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["**/backend", "**/backend/**"], message: "El frontend no importa backend: usa el contrato (*.schema.ts) o la API HTTP." },
        { group: serverOnlyInfra, message: "Infraestructura de servidor: prohibida en frontend." },
        { group: ["@/features/*/frontend/**", "../../*/frontend/**"], message: "No importes la UI de otro módulo; súbela a src/shared/ui si es común." },
      ] }],
    },
  },

  // 2. El backend no importa UI.
  {
    files: ["src/features/*/backend/**/*.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["**/frontend", "**/frontend/**", "@/shared/ui/**"], message: "El backend no importa componentes." },
      ] }],
    },
  },

  // 3. El contrato es puro.
  {
    files: ["src/features/*/*.schema.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["**/backend/**", "**/frontend/**", ...serverOnlyInfra], message: "Un contrato solo importa zod y otros contratos." },
      ] }],
    },
  },

  // 4. shared no depende de features.
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["@/features/**"], message: "shared es transversal: no conoce módulos." },
      ] }],
    },
  },
]);
