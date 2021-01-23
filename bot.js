const tmi = require("tmi.js");
const dotenv = require("dotenv");
const commands = require("./commands.js");

// Define configuration options
const opts = {
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Load environment variables
dotenv.config();

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim().toLowerCase();

  // If the command is known, let's execute it
  switch (commandName) {
    case "!dice":
      commands.dice(commandName, client, target);
      break;
    case "!help":
      commands.help(commandName, client, target);
      break;
    case "!joke":
      commands.joke(commandName, client, target);
      break;
    default:
      commands.unknown(commandName, client, target);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
