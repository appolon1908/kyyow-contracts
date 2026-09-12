namespace Kyyow.Contracts.Campaigns;
public sealed record CampaignCreated(string CampaignId, string Name, DateTimeOffset CreatedAt);
public sealed record CampaignScheduled(string CampaignId, DateTimeOffset ScheduledFor);
public sealed record CampaignStarted(string CampaignId, DateTimeOffset StartedAt);
public sealed record CampaignCompleted(string CampaignId, DateTimeOffset CompletedAt, long Submitted, long Delivered, long Failed);
