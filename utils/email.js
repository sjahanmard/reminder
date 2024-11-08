const sender = "s.jahanmard@gmail.com";
const sendToSet = ["s.jahanmard@gmail.com"];

class Email {
  client;
  constructor() {
    import("emailjs").then(
      ({ SMTPClient }) =>
        (this.client = new SMTPClient({
          user: sender,
          password: "kluj ydsn ubex wwou",
          host: "smtp.gmail.com",
          ssl: true,
        }))
    );
  }
  async send(...texts) {
    const subject = `Reminder`;
    const text = texts?.join(" - ");
    try {
      await this.client.sendAsync(
        {
          text,
          from: sender,
          to: sendToSet.join(", "),
          subject,
        },
        (err, message) => {
          console.log(err || message);
        }
      );
      return true;
      console.log("Email sent", text);
    } catch (err) {
      console.log("Email Error:", err);
    }
  }
}

const email = new Email();

module.exports = email;
