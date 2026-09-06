import type { EmailMessage } from "./types.js";

export interface EmailProvider {
  name: "gmail" | "microsoft";

  authenticate(): Promise<void>;

  fetchNewEmails(
    since?: Date
  ): Promise<EmailMessage[]>;
}
