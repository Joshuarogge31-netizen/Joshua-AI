import "../core/database/db.js";
import type {
  EmailMessage,
  ProcessedEmail
} from "../integrations/email/types.js";

const testEmail: EmailMessage = {
  id: "test-email-001",
  provider: "microsoft",
  sender: "hochschule@example.de",
  recipients: ["27229008@stud.dhfpg.de"],
  subject: "Präsenzphase und Prüfung",
  body: "Testnachricht für Joshua AI OS.",
  receivedAt: new Date().toISOString(),
};

const processed: ProcessedEmail = {
  email: testEmail,
  classification: "study",
  confidence: 0.99,
  extractedInformation: {
    type: "university_information"
  }
};

console.log("\n=== EMAIL SYSTEM TEST ===\n");
console.log(processed);
console.log("\n=== EMAIL TYPES OK ===\n");
