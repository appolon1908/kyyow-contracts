namespace Kyyow.Contracts.Api;

public sealed record ApiError(string Code, string Message, string CorrelationId);
public sealed record PageResponse<T>(IReadOnlyList<T> Items, string? NextPageToken);
