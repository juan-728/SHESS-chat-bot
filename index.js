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

client.login('NTc5MzgzMjU3OTUxMzcxMjc2.XV9iVQ.bFHOvOIy_FemYHMfzFA6IBI-UC8')