console.log("Starting bot");
//Imports the discord.js API to interact with Discord
var Client = require("discord.js").Client;
var client = new Client();
//Start a web server so Replit keeps the bot running
//const keep_alive = require('./keep_alive.js');
//Brings in the token from the .env file
var token = process.env.BOT_TOKEN;
//Using a variable for the prefix makes it easy to change later
var prefix = "rd!";
//Confirm that the bot has logged in
client.on("ready", function () {
    console.log(client.user.username + " is online and ready for action!\n");
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
    if (command === "testgreet") {
        greet(message.guild.members.cache.get(message.author.id), message.guild);
    }
});
// Create an event listener for new guild members
client.on('guildMemberAdd', function (member) {
    greet(member, member.guild);
});
/* Sends a message greeting the user and assigns a role.
 * Assigns role "Bot" if they are a bot or "Human" if they
 * are a not.
 *
 * member: A GuildMember of the member who joined
 * guild: A Guild that the member joined
 */
function greet(member, guild) {
    // Send the message to a designated channel on a server:
    var channel = guild.channels.cache.find(function (ch) { return ch.name === 'bot-testing-1'; });
    // Do nothing if the channel wasn't found on this server
    if (!channel)
        return;
    // Send the message, mentioning the member
    channel.send("Welcome to the server, " + member.displayName + "!");
    //Apply role
    if (member.bot) {
        member.roles.add(guild.roles.cache.find(function (role) { return role.name === 'Bot'; }));
    }
    else {
        member.roles.add(guild.roles.cache.find(function (role) { return role.name === 'Human'; }));
    }
}
client.login(token);
