using Kyyow.Contracts.Core;
namespace Kyyow.Contracts.Billing;
public sealed record UsageRecorded(string UsageId, string TenantId, string Meter, decimal Quantity, DateTimeOffset RecordedAt);
public sealed record MessageRated(string MessageId, Money Cost, Money Price, DateTimeOffset RatedAt);
public sealed record WalletDebited(string WalletId, string EntryId, Money Amount, DateTimeOffset OccurredAt);
public sealed record WalletCredited(string WalletId, string EntryId, Money Amount, DateTimeOffset OccurredAt);
