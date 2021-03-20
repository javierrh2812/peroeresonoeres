const telebot = require("telebot");

module.exports = function (token) {

  const bot = new telebot({
    token,
  })

  bot.on("/start", onStart)
  bot.on("/putamare", onPutamare)
  bot.on("/nosoy", onNoSoy)
  bot.on("/sisoy", onSiSoy)

  bot.start();
};

const onStart = (msg) => {
  msg.reply.photo(
    "https://arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/2JV4SN6CHREIFNAKTOJAGJLYWE.jpg"
  );
  msg.reply.text("Ya pero, eres o no eres?");
  return msg;
};

const onPutamare = (msg) => msg.reply.text("No no no noo");

const onNoSoy = (msg) =>
  msg.reply.photo(
    "https://i.pinimg.com/474x/54/9c/02/549c025a3190fd3afa9286244dea4cca.jpg"
  );

const onSiSoy = (msg) => msg.reply.photo('https://i.pinimg.com/236x/9d/57/48/9d57483299665f07c6ba17817baa37ee.jpg')
