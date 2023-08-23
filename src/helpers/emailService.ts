import sendgrid from "@sendgrid/mail";

class Email {
  private client;
  private defaultFrom = {
    email: "info@mentumm.com",
    name: "Mentumm",
  };

  constructor() {
    this.client = sendgrid;
    this.client.setApiKey(process.env.SENDGRID_API_KEY || "");
  }

  send(templateId: EmailTemplate, to: string, templateData: object) {
    return this.client.send({
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          dynamicTemplateData: templateData,
        },
      ],
      from: this.defaultFrom,
      templateId,
    });
  }
}

export enum EmailTemplate {
  WELCOME = "d-3a0e8c10a97a40e0b3e6940d38b060f4",
  COACH_WELCOME = "d-94fc6a9f20ef493faee21544b64283ad",
  PASSWORD_RESET = "d-c0bc253d671849a58c84395f44659aea",
  PASSWORD_CHANGED = "d-4392fa991e1f44a583dd0b9cfb101615",
}

export const emailService = new Email();
