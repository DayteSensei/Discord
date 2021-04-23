const Discord = require("discord.js");
const Client = new Discord.Client;


const prefix = "d!";

Client.on("ready", () => {
    console.log("Bot en ligne!");
});


//HELP embed
Client.on("message", message => {
    if (message.content.startsWith(prefix + "help")) {

        var embed = new Discord.MessageEmbed()
            .setColor("#fffdfd")
            .setAuthor("DayTé", "https://cdn.discordapp.com/attachments/535856540725411890/817949217053605909/f347c7e7a6090d5d62576494c309f91f.gif", "https://www.youtube.com/channel/UC4_QIFOahki4SHDkx21h8wA")

            .setTitle("__**Invite moi sur ton serveur!**__")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=834980835064021064&permissions=8&scope=bot")

            .setDescription("Bot made by DayTé!")

            .setThumbnail("https://cdn.discordapp.com/attachments/807720130230222869/817953681403543613/602efd6aedfb2d3847cd5f862d7a1fb2.gif")

            .addField("Les commands du bot.", "Liste des commandes du bot!", false)
            .addField("Musique", "d!play lien YT seulement", false)
            .addField("Modération", "En bas ce situe les commands de modération", false)
            .addField("Clear", "d!clear", true)
            .addField("Ban", "d!ban", true)
            .addField("Unban", "d!unban", false)
            .addField("Kick", "d!kick", true)
            .addField("Mute", "d!mute", true)
            .addField("Tempmute", "d!tempmute", true)
            .addField("Unmute", "d!unmute", true)
            .addField("Help", "d!help", true)
            .addField("Warn", "d!warn", true)


            .setImage("https://cdn.discordapp.com/attachments/807720130230222869/817950347687100446/smoking.gif")

            .setTimestamp()
            .setFooter("Merci de m'utiliser!", "https://cdn.discordapp.com/attachments/807720130230222869/817954696105820190/8ada529afa1704e8d561690554abe93fcc58456dr1-500-340_hq.gif")

        message.channel.send(embed);
    }
})
Client.login(process.env.TOKEN)