export type EmailProvider = "gmail" | "microsoft";

export type EmailMessage = {
  id: string;
  provider: EmailProvider;
  threadId?: string;
  sender: string;
  recipients: string[];
  subject: string;
  body: string;
  receivedAt: string;
  labels?: string[];
  attachments?: {
    filename: string;
    mimeType: string;
  }[];
};

export type EmailClassification =
  | "study"
  | "work"
  | "finance"
  | "social"
  | "personal"
  | "other";

export type ProcessedEmail = {
  email: EmailMessage;
  classification: EmailClassification;
  confidence: number;
  extractedInformation: Record<string, unknown>;
};
