namespace Kyyow.Contracts.Webhooks;
public sealed record WebhookEnvelope<T>(string Id, string Type, int Version, DateTimeOffset OccurredAt, T Data);
