using Kyyow.Contracts.Core;

namespace Kyyow.Contracts.Events;

public sealed record EventEnvelope<TData>
{
    public required string Id { get; init; }
    public required string Type { get; init; }
    public required int Version { get; init; }
    public required string Source { get; init; }
    public required TenantId TenantId { get; init; }
    public required CorrelationId CorrelationId { get; init; }
    public required string CausationId { get; init; }
    public required DateTimeOffset OccurredAt { get; init; }
    public required TData Data { get; init; }
}
