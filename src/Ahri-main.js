var Discord = require("discord.js");
var bot = new Discord.Client();

console.log("hello");

var Config = {};
Config.commandPrefix="!"

var commands = {
	"ping": {
		description: "responds pong, useful for checking if bot is alive",
		process: function(bot, msg, suffix) {
			msg.channel.sendMessage("pong!");
			if(suffix){
				msg.channel.sendMessage( "note that !ping takes no arguments!");
			}
		}
	},
	"help": {
		description: "responds pong, useful for checking if bot is alive",
		process: function(bot, msg, suffix) {
			var batch = "Available Commands:";
			var sortedCommands = Object.keys(commands).sort();
			sortedCommands = sortedCommands.filter(function( obj ) {
				return obj !== 'help';
			});
			for(var i in sortedCommands) {
				var cmd = sortedCommands[i];
				var info = ""+Config.commandPrefix + cmd+"";
				var usage = commands[cmd].usage;
				if(usage){
					info += " " + usage;
				}
				var description = commands[cmd].description;
				if(description instanceof Function){
					description = description();
				}
				if(description){
					info += "\n\t" + description;
				}
				var newBatch = batch + "\n" + info;
				if(newBatch.length > (1024 - 8)){ //limit message length
					msg.author.sendMessage("```"+batch+"```");
					batch = info;
				} else {
					batch = newBatch
				}
			}
			if(batch.length > 0){
				msg.author.sendMessage("```"+batch+"```");
			}
		}
	}
}

bot.on("message", msg => {
	if(msg.author.id != bot.user.id && (msg.content.startsWith(Config.commandPrefix))){
		console.log("treating " + msg.content + " from " + msg.author + " as command");
		var cmdTxt = msg.content.split(" ")[0].substring(Config.commandPrefix.length);
		var suffix = msg.content.substring(cmdTxt.length+Config.commandPrefix.length+1);
		var cmd = commands[cmdTxt];
		if (cmd) {
			cmd.process(bot, msg, suffix);
		}
	}
});

bot.login("MjkyMDIyNjAwOTM3MjQyNjI0.C6x-wQ.eDJKnnhkjH5cOHSrCgvIWhhcdJ0");
