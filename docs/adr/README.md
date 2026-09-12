# Architecture decisions

The following accepted decisions are normative for Kyyow contracts:

1. **ADR-001 — Middleware is the sole Odoo writer.** Odoo DTOs describe its boundary only.
2. **ADR-002 — Contracts are centrally governed.** Shared concepts change here first.
3. **ADR-003 — A service owns its database.** Contracts never grant cross-database writes.
4. **ADR-004 — Jasmin is transport.** SMPP/Jasmin representations stay adapter-internal.
5. **ADR-005 — Public API is canonical and versioned.** APIM/facade exposes `/v1` and `/v2`.
6. **ADR-006 — Async events use one envelope.** Identity, tracing and timing fields are mandatory.
7. **ADR-007 — Events are immutable facts.** Corrections are new events, not mutation.
8. **ADR-008 — Mutations are idempotent.** Commands carry idempotency and correlation identity.
9. **ADR-009 — Provider semantics are normalized.** Consumers never parse raw provider states.
10. **ADR-010 — Metrics contain no customer PII.** PII is forbidden in metric labels.
11. **ADR-011 — Superset and Grafana are read-only.** Contracts do not authorize writes.
12. **ADR-012 — OpenBao is the application secret authority.** Contracts carry no secrets.
13. **ADR-013 — Routing policy lives outside Jasmin.** Jasmin executes the selected route.
14. **ADR-014 — Billing ledger is immutable.** Corrections use compensating entries.
15. **ADR-015 — Compatibility validation is mandatory.** Breaking changes require a major version
    and owner plus API-governance approval.
