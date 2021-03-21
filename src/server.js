const telebot = require("telebot");

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const API = "https://thecatapi.com/api/images/get?format=src&type=";

const usePlugins = [];

const casaDeAnna =
  "https://www.google.com/maps/place/12%C2%B009'07.7%22S+76%C2%B056'58.3%22W/@-12.152127,-76.949527,16z/data=!4m5!3m4!1s0x0:0x0!8m2!3d-12.152127!4d-76.949527";

const jimmyimg =
  "https://arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/2JV4SN6CHREIFNAKTOJAGJLYWE.jpg";

const nosoyimg =
  "https://i.pinimg.com/474x/54/9c/02/549c025a3190fd3afa9286244dea4cca.jpg";

const sisoyimg =
  "https://i.pinimg.com/236x/9d/57/48/9d57483299665f07c6ba17817baa37ee.jpg";
const infoText =
  "Ah, y el código de este bot está alojado en github.com/javierrh2812/peroeresonoeres";

let chupetaTxt = "";

module.exports = function (token) {
  const bot = new telebot({
    token,
    usePlugins,
  });

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

    const {
      chat: { id, type },
      from: { first_name },
      text,
    } = msg;

    let cmd = text.split(" ")[0];

    if (type === "group")
      msg.reply.text(
        `Enviando un sticker de michi bonito para ${first_name}, un toque p.`
      );

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

    bot.sendAction(id, "upload_photo");

    return promise.catch((error) => {
      console.log("[error]", error);
      bot.sendMessage(id, `😿 An error ${error} occurred, try again.`);
    });
  });

  bot.on("/start", async (msg, props) => {
    msg.reply.text(`Hola ${msg.from.first_name}, mucho gusto! \n`);
    console.log("props", props);

    await wait();

    msg.reply.photo(jimmyimg);

    return bot.sendMessage(
      msg.chat.id,
      "Pues, tengo una pregunta...Eres o no eres?",
      {
        replyMarkup,
      }
    );
  });

  bot.on("/cierraEstaMrd", onClose);
  bot.on("/putamare", (msg) => bot.sendMessage(msg.chat.id, "No no no noo"));
  bot.on("/nosoy", (msg) => msg.reply.photo(nosoyimg));
  bot.on("/sisoy", (msg) => bot.sendPhoto(msg.chat.id, sisoyimg));
  bot.on("/hora", (msg) => bot.sendMessage(msg.chat.id, new Date()));
  bot.on("/info", (msg) => bot.sendMessage(msg.chat.id, getDescription()));
  bot.on("/nextChupeta", nextChupeta);
  bot.on("/setChupeta", setChupeta);
  bot.on("/getChupeta", getChupeta);
  bot.start();
};

const setChupeta = (msg) => {
  
  chupetaTxt = msg.text;

  chupetaTxt = chupetaTxt.substring(12, 100)
  return msg.reply.text("Chupeta Programada");
};

const getChupeta = (msg) => {
  if (chupetaTxt==='') return msg.reply.text('No hay chupeta programada pipipi')
  return msg.reply.text(chupetaTxt);
};
const nextChupeta = (msg) => msg.reply.text('No hay chupeta programada, ir a casa de Anna por si acaso, no inviten a '+ msg.from.first_name);

const onClose = (msg) => {
  let l1 = `Tmre ${msg.from.first_name}, presiona:  \n`;
  let l2 = `/start para que vuelva a pasar lo mismo xd \n`;
  let l3 = `/info para ver info? \n`;
  let l4 = `/hora para ver la hora XDDD \n`;
  let txt = l1 + l2 + l3 + l4;

  return msg.reply.text(txt, {
    replyMarkup: "hide",
  });
};

const getDescription = () => {
  let lines = [
    "Este bot no hace nada útil (aún?) \n Comandos: \n",
    "/start: para empezar \n",
    "/putamare /sisoy /nosoy \n",
    "/info:  para ver info? \n",
    "/hora:  te digo que hora es \n",
    "/kitty: te mando la foto de un michi \n",
    "/kittygit: te mando el gif de un michi \n",
    infoText,
  ];
  return lines.join("");
};
