namespace Kyyow.Contracts.Observability;
public sealed record KpiSnapshot(string Key, decimal Value, DateTimeOffset WindowStart, DateTimeOffset WindowEnd, IReadOnlyDictionary<string, string> Dimensions);
