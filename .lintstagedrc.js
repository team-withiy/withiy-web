import path from "path";

const getFiles = (filenames) =>
  filenames.map((f) => path.relative(process.cwd(), f)).map((f) => f.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));

export default {
  "*.{ts,tsx}": (filenames) => [
    `prettier --write ${getFiles(filenames).join(" ")} --ignore-unknown --check`,
    `next lint --fix --file ${getFiles(filenames).join(" --file ")}`,
    `vitest related ${getFiles(filenames).join(" ")} --run`,
  ],
  "src/**/*.scss": (filenames) => `stylelint --fix ${getFiles(filenames).join(" ")}`,
};
