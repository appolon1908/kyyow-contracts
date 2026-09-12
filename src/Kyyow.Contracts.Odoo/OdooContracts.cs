namespace Kyyow.Contracts.Odoo;
public sealed record OdooKpiWriteRequest(string IdempotencyKey, Kyyow.Contracts.Integrations.OdooKpiSnapshot Snapshot);
public sealed record OdooIncidentWriteRequest(string IdempotencyKey, Kyyow.Contracts.Integrations.OperationalAlert Alert);
