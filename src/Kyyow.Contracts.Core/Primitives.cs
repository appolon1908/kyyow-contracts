namespace Kyyow.Contracts.Core;

public readonly record struct TenantId(string Value);
public readonly record struct CorrelationId(string Value);
public readonly record struct PageToken(string Value);
public readonly record struct PhoneNumber(string Value);
public readonly record struct Currency(string Value);
public sealed record Money(decimal Amount, Currency Currency);
