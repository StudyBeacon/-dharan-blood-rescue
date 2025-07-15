const twilio = require('twilio');

exports.sendSMS = (to, message) => {
  const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  return client.messages.create({
    body: message,
    to,
    from: process.env.TWILIO_PHONE
  });
};