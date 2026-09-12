namespace Kyyow.Contracts.Integrations;
public sealed record OdooKpiSnapshot(string KpiKey, decimal Value, DateTimeOffset WindowStart, DateTimeOffset WindowEnd);
public sealed record OperationalAlert(string AlertId, string Severity, string Summary, string Status, DateTimeOffset OccurredAt);
public sealed record IntegrationFailure(string Integration, string OperationId, string ErrorCode, DateTimeOffset FailedAt);
