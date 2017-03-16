var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", msg => {
	if (msg.content.startsWith("ping")) {
		bot.sendMessage(msg, "pong!");
	}
});

bot.loginWithToken("yourcomplicatedsecretcodehere");
