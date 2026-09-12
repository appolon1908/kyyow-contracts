namespace Kyyow.Contracts.Compliance;
public sealed record ConsentGranted(string SubjectId, string Purpose, string EvidenceReference, DateTimeOffset GrantedAt);
public sealed record ConsentRevoked(string SubjectId, string Purpose, DateTimeOffset RevokedAt);
public sealed record RecipientSuppressed(string Recipient, string Reason, DateTimeOffset SuppressedAt);
