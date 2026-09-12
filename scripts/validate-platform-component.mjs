import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";

const profilePath = process.argv[2] ?? "kyyow-integration.v1.json";
const schema = JSON.parse(
  fs.readFileSync(
    new URL(
      "../schemas/json-schema/platform-component.v1.json",
      import.meta.url,
    ),
  ),
);
const profile = JSON.parse(fs.readFileSync(profilePath));
const validate = new Ajv2020({ strict: true }).compile(schema);
if (!validate(profile)) {
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}
console.log(`KYYOW_PLATFORM_COMPONENT=PASS component=${profile.component}`);
