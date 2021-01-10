//Setup:
declare var require: any
declare var process: any
console.log("Starting bot");
//Imports the discord.js API to interact with Discord
const { Client } = require("discord.js");
const client = new Client();
//Start a web server so Replit keeps the bot running
const keep_alive = require('./keep_alive.js');
//Brings in the token from the .env file
const token = process.env.BOT_TOKEN;
//Using a variable for the prefix makes it easy to change later
const prefix = "rd!";

//Confirm that the bot has logged in
client.on("ready", () => {
	console.log(client.user.username + " is online and ready for action!\n");
});

//Commands
client.on("message", (message) => {
	//Make sure the message is meant for the us:
	//Disregard if it was sent by a bot
	if(message.author.bot) return;
	//Disregard if it doesn't start with our prefix
	if(!message.content.startsWith(prefix)) return;

	//Takes takes off the prefix, leaving just the command itself
	var command = message.content.slice(prefix.length);

	if(command === "ping") {
		return message.channel.send("pong");
	}
	
	if (command==="testgreet") {
		greet(message.member);
	}
	
});

// Create an event listener for new guild members
client.on('guildMemberAdd', (member) => {
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
	var channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	// Only send the message if the channel was found
	if (!channel) {
		console.log('Channel "general" was not found in the server!');
	} else {
		// Send the message, mentioning the member
		channel.send(`Welcome to the server, ${member.displayName}!`)
	}

	//Apply role
	if (member.user.bot) {
		member.roles.add(member.guild.roles.cache.find(role => role.name==='Bot'));
	} else {
		member.roles.add(member.guild.roles.cache.find(role => role.name==='Human'));
	}

}

client.login(token);
