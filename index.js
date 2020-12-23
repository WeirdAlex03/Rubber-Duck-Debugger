console.log("Starting bot");
//Imports the discord.js API to interact with Discord
var Client = require("discord.js").Client;
var client = new Client();
//Start a web server so Replit keeps the bot running
var keep_alive = require('./keep_alive.js');
//Brings in the token from the .env file
var token = process.env.BOT_TOKEN;
//Using a variable for the prefix makes it easy to change later
var prefix = "rd!";
//Confirm that the bot has logged in
client.on("ready", function () {
    console.log(client.user.username + " is online and ready for action!");
});
//Commands
client.on("message", function (message) {
    //Make sure the message is meant for the us:
    //Disregard if it was sent by a bot
    if (message.author.bot)
        return;
    //Disregard if it doesn't start with our prefix
    if (!message.content.startsWith(prefix))
        return;
    //Takes takes off the prefix, leaving just the command itself
    var command = message.content.slice(prefix.length);
    if (command === "ping") {
        return message.channel.send("pong");
    }
});
client.login(token);
