const Discord = require("discord.js");
const Client = new Discord.Client;
const bdd = require("./bdd.json");
const fs = require("fs")
const { token } = require('./config.json')

const prefix = "d!";

Client.on("ready", () => {
    console.log("Bot opérationnel");
});

        //Ban
Client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (message.content.startsWith(prefix + "ban")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.");

            }
            else {
                if (mention.bannable) {
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès")
                }
                else {
                    message.reply("Impossible de bannir ce membre.")
                }
            }
        }
         //kick
         if (message.content.startsWith(prefix + "kick")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if (mention.kickable) {
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès.");
                }
                else {
                    message.reply("Impossible de kick ce membre.")
                }
            }
        }

        //Warn
if (message.content.startsWith(prefix + "warn")) {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {

        if (!message.mentions.users.first()) return message.channel.send("Tu n'as pas indiquer la personne que tu souhaites warn");
        utilisateur = message.mentions.users.first().id

        if (bdd["warn"][utilisateur] == 2) {

            message.guild.members.ban(utilisateur)
            message.channel.send("<@${user.username.id}> à accumulé 3 warn. Il a donc été banni !")
            delete bdd["warn"][utilisateur]
            Savebdd()
        }
        else {
            if (!bdd["warn"][utilisateur]) {
                bdd["warn"][utilisateur] = 1
                message.channel.send("Le compte warn à présent " + bdd["warn"][utilisateur] + " warn !")
                Savebdd();
            }
            else {
                bdd["warn"][utilisateur]++
                message.channel.send("Tu as à présent " + bdd["warn"][utilisateur] + " warn !")
                Savebdd();
            }
        }
    }
    else {
        message.channel.send("Tu n'as pas les permissions pour exécuter cette commande !")
    }
}

function Savebdd() {
fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if (err) message.channel.send("Une erreur est survenue.");
    });
}
        //Mute
         if (message.content.startsWith(prefix + "mute")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("membre non ou mal mentionné.");
            }
            else {
                mention.roles.add("712458554614743040");
                message.channel.send(mention.displayName + " mute avec succès.")
            }
        }
        //Unmute
        else if (message.content.startsWith(prefix + "unmute")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                mention.roles.remove("712458554614743040");
                message.channel.send(mention.displayName + " unmute avec succès.")
            }
        }
        //Tempmute
        else if (message.content.startsWith(prefix + "tempmute")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné")
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("817932561686593546");
                setTimeout(function () {
                    mention.roles.remove("817932561686593546")
                    message.channel.send("<@" + mention.id + "> tu peut désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    };
    //Clear
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        if (message.content.startsWith(prefix + "clear")) {
            let args = message.content.split(" ");

            if (args[1] == undefined) {
                message.reply("Nombre de message mal défini.");
            }
            else {
                let number = parseInt(args[1]);

                if (isNaN(number)) {
                    message.reply("Nombre de message mal défini.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Supression de " + message.size + "Messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear :" + err);
                    });
                }
            }
        }
    }
});



Client.login(process.env.token);