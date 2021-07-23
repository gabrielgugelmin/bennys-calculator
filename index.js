const Discord = require("discord.js");
const config = require("./config.json");
const products = require("./products.json");
const client = new Discord.Client();

const prefix = "!";

client.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping":
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
      break;
    case "calc":
      const sum = sumPrices(products.cosmetics, args);
      message.reply(`Essa tunagem vai custar R$ ${sum}!`);
      break;
    case "precos":
      const prices = getCosmeticsProducts();
      message.reply(prices);
      break;
    default:
      break;
  }
});

const getCosmeticsProducts = () => {
  const sortedCosmetics = sortByName(products.cosmetics);
  return sortedCosmetics.map(p => `${p.id} - ${p.name}: R$ ${p.price}`);
};

const sumPrices = (products = products.cosmetics, ids) => {
  if (ids.length === 0) return;
  console.log(ids);
  const intIds = ids.map(id => parseInt(id));
  const filteredProducts = products.filter(product =>
    intIds.includes(product.id)
  );
  return filteredProducts.reduce((acc, curr) => acc + curr.price, 0);
};

const sortByName = arr => {
  return arr.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

client.login(config.BOT_TOKEN);
