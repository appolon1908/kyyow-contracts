# Kyyow Contracts

Canonical, versioned contracts shared across Kyyow. This repository contains DTOs, value
objects, OpenAPI, AsyncAPI, JSON Schema, examples, and compatibility tests only. It contains no
business logic, persistence models, provider clients, or infrastructure helpers.

> A Kyyow concept may have exactly one owning domain, one canonical contract, and one public API
> authority. No repository may redefine an externally shared Kyyow model without changing the
> shared contract first.

## Packages

NuGet projects live under `src/` and publish independently as `Kyyow.Contracts.*` packages.
The TypeScript projection publishes as `@kyyow/contracts`. Other languages should be generated
from `schemas/openapi`, `schemas/asyncapi`, and `schemas/json-schema`; handwritten projections are
not authoritative.

The machine-readable schemas are the cross-language source of truth. C# and TypeScript packages
are reviewed projections of those schemas. Provider DTOs (including SMPP/Jasmin fields) remain
private to their adapters.

## Ownership

| Capability              | Authoritative owner                |
| ----------------------- | ---------------------------------- |
| Tenant and API access   | Identity/Tenant                    |
| Contact                 | Contacts                           |
| Consent and suppression | Compliance                         |
| SMS, DLR, inbound SMS   | Messaging                          |
| Campaign                | Campaigns                          |
| Sender ID and number    | Sender/Number Management           |
| Route                   | Routing                            |
| Price/rate              | Rating                             |
| Wallet, invoice summary | Billing                            |
| Usage event             | Metering                           |
| Customer webhook        | Webhook                            |
| Operational alert       | Middleware                         |
| KPI/Odoo snapshot       | Middleware/Odoo integration domain |

`Kyyow.Contracts.Odoo` defines the Middleware boundary; its presence never authorizes another
service to write Odoo. Middleware is the sole Odoo writer.

## Contract rules

- HTTP APIs use `/v1` and `/v2`; a breaking change requires a new major path.
- Events describe immutable facts and use the standard envelope. Commands are not events.
- Event meaning never changes silently; increment `version` and migrate consumers first.
- `PATCH` is documentation/example correction, `MINOR` is backward-compatible addition, and
  `MAJOR` is removal, required-field addition, type narrowing, or semantic break.
- Producers publish a new version only after affected consumers accept both old and new versions.
- Every mutation contract supports an idempotency key and correlation ID at the API boundary.
- Provider statuses are normalized to the canonical SMS lifecycle before publication.

## Validation

```bash
npm ci
npm run check
npm run format-check
dotnet build
```

`npm test` validates examples, stable operation/event names, canonical statuses and mandatory
envelope fields, API version boundaries, and the absence of common implementation/persistence
types. CI also packs the TypeScript projection. A protected baseline change is an explicit
compatibility decision and must receive the owners in `CODEOWNERS`.

## Publishing

Publishing is tag-driven. Use `vMAJOR.MINOR.PATCH`; CI must validate first. NuGet packages and the
npm package use the same release version so a schema release can be traced across languages.
