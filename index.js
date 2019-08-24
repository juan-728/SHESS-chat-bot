const Discord = require('discord.js')
const newUsers = new Discord.Collection();
const client = new Discord.Client()
/* const fs = require('fs')


fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})
 */

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

})

client.on('guildMemberAdd', member => { //This code is used to send a DM to each member
  member.send(
    `Welcome to the SHESS Familia! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
})
module.exports = (client, message) => {
  if (message.content.startsWith('!kick')) {
    const member = message.mentions.members.first()

    if (!member) {
      return message.reply(
        `Who are you trying to kick? You must mention a user.`
      )
    }

    if (!member.kickable) {
      return message.reply(`I can't kick this user. Sorry!`)
    }

    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch(error => message.reply(`Sorry, an error occured.`))
  }
}
/* This code was meant for a full on message to each memeber on the server
	client.on("guildMemberAdd", (member) => {
  newUsers.set(member.id, member.user);
});
client.on("guildMemberRemove", (member) => {
  if(newUsers.has(member.id)) newUsers.delete(member.id);
});
client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  newUsers.set(member.id, member.user);

  if (newUsers.size > 10) {
    const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    const userlist = newUsers.map(u => u.toString()).join(" ");
    defaultChannel.send("Welcome our new users!\n" + userlist);
    newUsers.clear();
  }
}); */

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0 & arguments.length > 10) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
	}
 	else if (arguments.legnth = 10){
			receivedMessage.channel.send("It looks like you might need help with " + arguments + "! Join our opportunities channel!👍" )
    } 
	else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

/* function joinCommand(arguments, receivedMessage) {
	if (arguments.legnth = 10){
		member.join('614340557195575306')
	}
}
 */
function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    // You can copy/paste the actual unicode emoji in the code (not _every_ unicode emoji works)
    receivedMessage.react("👍")
   // receivedMessage.react("🛐")
    // Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html

    // Get every custom emoji from the server (if any) and react with each one
    receivedMessage.guild.emojis.forEach(customEmoji => {
        console.log(`Reacting with custom emoji: ${customEmoji.name} (${customEmoji.id})`)
        receivedMessage.react(customEmoji)
    })
    // If you know the ID of the custom emoji you want, you can get it directly with:
    // let customEmoji = receivedMessage.guild.emojis.get(emojiId)
})
client.login('NTc5MzgzMjU3OTUxMzcxMjc2.XV9iVQ.bFHOvOIy_FemYHMfzFA6IBI-UC8')