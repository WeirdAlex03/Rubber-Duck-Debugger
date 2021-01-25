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
        greet(message.member);
    }
});
// Create an event listener for new guild members
client.on('guildMemberAdd', function (member) {
    console.log("new member join");
    greet(member);
});
/* Sends a message greeting the user and assigns a role.
 * Assigns role "Bot" if they are a bot or "Human" if they
 * are a not.
 *
 * member: A GuildMember of the member who joined
 */
function greet(member) {
    // Send the message to a designated channel on a server:
    var channel = member.guild.channels.cache.find(function (ch) { return ch.name === 'general'; });
    /* Looks through all channels of the server looking for one that
     * satisfies `ch.name === 'general', aka one that is named
     * "general". In this case, the message will always be send to
     * the #general channel, if you'd like, you could move that line
     * to the guildMemberAdd listener and pass it as another
     * parameter, then pass the channel where the testgreet command
     * was run to respond there.
     */
    // Only send the message if the channel was found
    if (!channel) {
        console.log('Channel "general" was not found in the server!');
        /* Because the string is bounded with 'single quotes', the
         * "double quotes" do not have to be escaped. Same as
         * "Channel \"general\" was not found in the server!"
         */
    }
    else {
        // Send the message, mentioning the member
        channel.send("Welcome to the server, " + member.displayName + "!");
        /* Using `backticks` like this is a template string, same as
         * "Welcome to the server, " + member.displayName + "!"
         */
    }
    //Apply role
    if (member.user.bot) {
        member.roles.add(member.guild.roles.cache.find(function (role) { return role.name === 'Bot'; }));
    }
    else {
        member.roles.add(member.guild.roles.cache.find(function (role) { return role.name === 'Human'; }));
    }
    /* Note that I am hardcoding the channel  and role names here,
     * ideally you would want to ask someone in the server what
     * channel and roles the bot should assign and store their IDs,
     * but we do not have a good way to store that data yet, which
     * is why I'm doing it like this for now.
     */
}
//This line should always be the last one in the code
client.login(token);
