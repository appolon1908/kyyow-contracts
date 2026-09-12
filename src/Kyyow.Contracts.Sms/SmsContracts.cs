namespace Kyyow.Contracts.Sms;

public enum SmsEncoding { Gsm7, Ucs2, Binary }
public enum SmsMessageStatus
{
    Created, Validated, Queued, Routing, Submitted, Accepted, Delivered,
    Rejected, Failed, Expired, Undeliverable, Cancelled, Suppressed
}

public sealed record SmsMessageRequested
{
    public required Guid EventId { get; init; }
    public required string TenantId { get; init; }
    public required string MessageId { get; init; }
    public required string From { get; init; }
    public required string To { get; init; }
    public required string Body { get; init; }
    public SmsEncoding Encoding { get; init; }
    public int SegmentCount { get; init; }
    public string? CampaignId { get; init; }
    public string? RouteProfileId { get; init; }
    public required DateTimeOffset RequestedAt { get; init; }
    public IReadOnlyDictionary<string, string>? Metadata { get; init; }
}

public sealed record SmsMessageQueued(string MessageId, DateTimeOffset QueuedAt);
public sealed record SmsMessageSubmitted(string MessageId, string Provider, string ProviderMessageId, DateTimeOffset SubmittedAt);
public sealed record SmsDeliveryUpdated(string MessageId, string? ProviderMessageId, string Provider, SmsMessageStatus Status, DateTimeOffset OccurredAt, DateTimeOffset ReceivedAt, string? ErrorCode, IReadOnlyDictionary<string, string> Metadata);
public sealed record SmsInboundReceived(string MessageId, string From, string To, string Body, SmsEncoding Encoding, string Provider, DateTimeOffset ReceivedAt);
public sealed record SenderIdentity(string Value, string Type);
