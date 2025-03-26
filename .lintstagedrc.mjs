import path from "path";

const getFiles = (filenames) =>
  filenames.map((f) => path.relative(process.cwd(), f)).map((f) => f.replace(/\(/g, "\\(").replace(/\)/g, "\\)"));

export default {
  "*.{ts,tsx}": (filenames) => [
    `prettier --w ${getFiles(filenames).join(" ")} --ignore-unknown --check`,
    `next lint --fix --file ${getFiles(filenames).join(" --file ")}`,
  ],
  "src/**/*.scss": (filenames) => `stylelint --fix ${getFiles(filenames).join(" ")}`,
};
