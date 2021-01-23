const axios = require("axios");

const jokesUrl =
  "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria";

// !dice
exports.dice = (commandName, client, target) => {
  const num = rollDice(commandName);
  client.say(
    target,
    `You rolled a ${num}. Link: https://github.com/DenysLins/twitch_bot`
  );
  console.log(`* Executed ${commandName} command`);
};

// !help
exports.help = (commandName, client, target) => {
  client.say(
    target,
    `!dice: return a random dice number.
     !joke: return a random joke.
    Link: https://github.com/DenysLins/twitch_bot`
  );
  console.log(`* Executed ${commandName} command`);
};

// !joke
exports.joke = (commandName, client, target) => {
  // set the headers
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  // make request to api
  axios({
    method: "get",
    url: jokesUrl,
    config,
  })
    .then((res) => {
      client.say(target, res.data.pergunta);
      console.log(`* Executed ${commandName} command`);
      setTimeout(function () {
        client.say(target, res.data.resposta);
      }, 10000);
    })
    .catch((err) => {
      console.log(err);
    });
};

// !unknown
exports.unknown = (commandName, client, target) => {
  if (commandName.startsWith("!")) {
    client.say(target, `* Unknown command ${commandName}`);
    console.log(`* Unknown command ${commandName}`);
  }
};

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}
