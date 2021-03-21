const telebot = require("telebot");

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const API = "https://thecatapi.com/api/images/get?format=src&type=";

const usePlugins = ["commandButton"];

const jimmyimg =
  "https://arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/2JV4SN6CHREIFNAKTOJAGJLYWE.jpg";

const nosoyimg =
  "https://i.pinimg.com/474x/54/9c/02/549c025a3190fd3afa9286244dea4cca.jpg";

const sisoyimg =
  "https://i.pinimg.com/236x/9d/57/48/9d57483299665f07c6ba17817baa37ee.jpg";

const infoText = "El código de este bot está alojado en github.com/javierrh2812/peroeresonoeres"

module.exports = function (token) {
  const bot = new telebot({
    token,
    usePlugins,
  });

  // Command keyboard
  const replyMarkup = bot.keyboard(
    [
      ["/sisoy", "/nosoy"],
      ["/putamare", "/cierraEstaMrd"],
    ],
    {
      resize: true,
      once: false,
    }
  );

  // Log every text message
  bot.on("text", function (msg) {
    console.log(`[text] ${msg.chat.id} ${msg.text}`);
  });

  bot.on(["/kitty", "/kittygif"], function (msg) {
    let promise;
    let id = msg.chat.id;
    let cmd = msg.text.split(" ")[0];

    // Photo or gif?
    if (cmd == "/kitty") {
      promise = bot.sendPhoto(id, API + "jpg", {
        fileName: "kitty.jpg",
        serverDownload: true,
      });
    } else {
      promise = bot.sendDocument(id, API + "gif#", {
        fileName: "kitty.gif",
        serverDownload: true,
      });
    }

    // Send "uploading photo" action
    bot.sendAction(id, "upload_photo");

    return promise.catch((error) => {
      console.log("[error]", error);
      // Send an error
      bot.sendMessage(id, `😿 An error ${error} occurred, try again.`);
    });
  });

  bot.on("/start", async (msg) => {
    let { id, first_name } = msg.from;

    msg.reply.text(`Hola ${first_name}, mucho gusto! \n`);

    await wait();

    msg.reply.photo(jimmyimg);

    return bot.sendMessage(id, "Pues, tengo una pregunta...Eres o no eres?", {
      replyMarkup,
    });
  });

  bot.on("/cierraEstaMrd", (msg) =>
    msg.reply.text("Presiona:  \n /start para que vuelva a pasar lo mismo xd \n /info para ver info? ", {
      replyMarkup: "hide",
    })
  );

  bot.on("/putamare", (msg) => bot.sendMessage(msg.from.id, "No no no noo"));
  bot.on("/nosoy", (msg) => bot.sendPhoto(msg.from.id, nosoyimg));
  bot.on("/sisoy", (msg) => bot.sendPhoto(msg.from.id, sisoyimg));
  bot.on("/hora", (msg) => bot.sendMessage(msg.from.id, new Date()));
  bot.on("/info", (msg)=> bot.sendMessage(msg.from.id, infoText))
  bot.start();
};
