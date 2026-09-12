export type TenantId = string;
export type CorrelationId = string;
export type EventId = string;

export interface EventEnvelope<TData extends object> {
  id: EventId;
  type: string;
  version: number;
  source: `kyyow-${string}`;
  tenant_id: TenantId;
  correlation_id: CorrelationId;
  causation_id: EventId;
  occurred_at: string;
  data: TData;
}

export type SmsEncoding = "GSM7" | "UCS2" | "BINARY";
export type SmsMessageStatus =
  | "CREATED"
  | "VALIDATED"
  | "QUEUED"
  | "ROUTING"
  | "SUBMITTED"
  | "ACCEPTED"
  | "DELIVERED"
  | "REJECTED"
  | "FAILED"
  | "EXPIRED"
  | "UNDELIVERABLE"
  | "CANCELLED"
  | "SUPPRESSED";

export interface SmsMessageRequested {
  event_id: string;
  tenant_id: TenantId;
  message_id: string;
  from: string;
  to: string;
  body: string;
  encoding: SmsEncoding;
  segment_count: number;
  campaign_id?: string | null;
  route_profile_id?: string | null;
  requested_at: string;
  metadata?: Readonly<Record<string, string>>;
}

export interface SmsDeliveryUpdated {
  message_id: string;
  provider_message_id?: string | null;
  provider: string;
  status: SmsMessageStatus;
  occurred_at: string;
  received_at: string;
  error_code?: string | null;
  metadata: Readonly<Record<string, string>>;
}

export interface SmsInboundReceived {
  message_id: string;
  from: string;
  to: string;
  body: string;
  encoding: SmsEncoding;
  provider: string;
  received_at: string;
}

export type SmsDeliveryUpdatedEvent = EventEnvelope<SmsDeliveryUpdated>;
export type SmsInboundReceivedEvent = EventEnvelope<SmsInboundReceived>;

export interface OdooKpiSnapshot {
  kpi_key: string;
  value: number;
  window_start: string;
  window_end: string;
}

export interface OperationalAlert {
  alert_id: string;
  severity: string;
  summary: string;
  status: string;
  occurred_at: string;
}
