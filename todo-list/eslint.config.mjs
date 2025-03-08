import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "semi": ["error", "always"], // Ejemplo: requerir punto y coma al final de las líneas
      "quotes": ["error", "double"], // Ejemplo: requerir comillas dobles
    },
  },
];

export default eslintConfig;
