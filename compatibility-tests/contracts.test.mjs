import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import yaml from "js-yaml";

const root = path.resolve(import.meta.dirname, "..");
const json = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const yml = (file) => yaml.load(fs.readFileSync(path.join(root, file), "utf8"));
const baseline = json("compatibility-tests/contract-baseline.json");

test("examples conform to canonical JSON Schemas", () => {
  const ajv = new Ajv2020({ strict: true });
  addFormats(ajv);
  const envelope = json("schemas/json-schema/event-envelope.v1.json");
  const requested = json("schemas/json-schema/sms-message-requested.v1.json");
  const status = json("schemas/json-schema/sms-status.v1.json");
  const delivery = json("schemas/json-schema/sms-delivery-updated.v1.json");
  const inbound = json("schemas/json-schema/sms-inbound-received.v1.json");
  ajv.addSchema(status);
  assert.equal(
    ajv.compile(requested)(json("examples/sms-message-requested.v1.json")),
    true,
  );
  const deliveryEvent = json("examples/sms-delivery-updated.v1.json");
  assert.equal(ajv.compile(envelope)(deliveryEvent), true);
  assert.equal(ajv.compile(delivery)(deliveryEvent.data), true);
  const inboundEvent = json("examples/sms-inbound-received.v1.json");
  assert.equal(ajv.compile(envelope)(inboundEvent), true);
  assert.equal(ajv.compile(inbound)(inboundEvent.data), true);
});

test("published API and event names retain the compatibility baseline", () => {
  const v1 = yml("schemas/openapi/kyyow-api-v1.yaml");
  const v2 = yml("schemas/openapi/kyyow-api-v2.yaml");
  const asyncapi = yml("schemas/asyncapi/kyyow-events-v1.yaml");
  const operationIds = [v1, v2].flatMap((api) =>
    Object.values(api.paths).flatMap((item) =>
      Object.values(item)
        .map((operation) => operation.operationId)
        .filter(Boolean),
    ),
  );
  for (const required of baseline.publicOperations)
    assert.ok(operationIds.includes(required));
  const addresses = Object.values(asyncapi.channels).map(
    ({ address }) => address,
  );
  for (const required of baseline.eventChannels)
    assert.ok(addresses.includes(required));
  const statuses = v1.components.schemas.SmsStatus.enum;
  for (const required of baseline.smsStatuses)
    assert.ok(statuses.includes(required));
  const requiredFields = json(
    "schemas/json-schema/event-envelope.v1.json",
  ).required;
  assert.deepEqual(requiredFields, baseline.eventEnvelopeRequired);
});

test("repository contains contracts but no implementation or persistence code", () => {
  const forbiddenNames =
    /(?:Repository|DbContext|SqlConnection|JasminClient|OdooClient|RedisClient)\b/;
  const files = fs.readdirSync(path.join(root, "src"), {
    recursive: true,
    withFileTypes: true,
  });
  for (const entry of files) {
    if (!entry.isFile() || !entry.name.endsWith(".cs")) continue;
    const source = fs.readFileSync(
      path.join(entry.parentPath, entry.name),
      "utf8",
    );
    assert.equal(
      forbiddenNames.test(source),
      false,
      `${entry.name} contains implementation code`,
    );
  }
});

test("OpenAPI versions expose only their matching major path", () => {
  assert.equal(
    yml("schemas/openapi/kyyow-api-v1.yaml").servers[0].url.endsWith("/v1"),
    true,
  );
  assert.equal(
    yml("schemas/openapi/kyyow-api-v2.yaml").servers[0].url.endsWith("/v2"),
    true,
  );
});

test("platform stack preserves sole-writer and private telemetry topology", () => {
  const schema = json("schemas/json-schema/platform-stack.v1.json");
  const stack = json("schemas/json-schema/kyyow-platform-stack.v1.json");
  const ajv = new Ajv2020({ strict: true });
  assert.equal(ajv.compile(schema)(stack), true);
  assert.deepEqual(stack.public_hosts, [
    "app.kyyow.com",
    "api.kyyow.com",
    "search.kyyow.com",
    "docs.kyyow.com",
    "auth.kyyow.com",
    "status.kyyow.com",
  ]);
  assert.deepEqual(stack.alert_flow, [
    "Prometheus evaluates",
    "Alertmanager groups and routes",
    "Middleware receives operational alert",
    "Middleware writes the Odoo incident",
  ]);
  assert.equal(stack.activation.runtime_verified, false);
  assert.equal(stack.activation.production_authorized, false);
});
