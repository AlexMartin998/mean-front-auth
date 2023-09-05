const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environment.ts";

const envFileContent = `
export const environment = {
  baseUrl: '${process.env["API_URL"]}',
};
`;

mkdirSync("./src/environments", { recursive: true }); // si ya existe lo sobrescribe
writeFileSync(targetPath, envFileContent);
