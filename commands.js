// !Dice
exports.dice = (commandName, client, target) => {
  const num = rollDice(commandName);
  client.say(
    target,
    `You rolled a ${num}. Link: https://github.com/DenysLins/twitch_bot`
  );
  console.log(`* Executed ${commandName} command`);
};

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}
