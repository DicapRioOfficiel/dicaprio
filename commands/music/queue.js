const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class QueueCommand extends Command{
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: ["q"],
            group: "music",
            memberName: "queue",
            description: "Permet d'afficher la liste de musique. Pour afficher différentes pages, tape la commande avec le numéro de page spécifié (queue 2).",
            args: [
                {
                    key: "page",
                    prompt: "Quel page veux-tu afficher ?",
                    default: 1,
                    type: "integer"
                }
            ]
        });
    }
    
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {Number} page 
     */
    async run(message, { page }) {
        const server = message.client.server;

        if(!message.client.voice.connections.first()) {
            return message.say(":x: Je ne suis pas dans un salon vocal. Tape `D.join` pour me faire venir dans un salon vocal");
        }

        page--;

        const numberOfItems = 10;
        const startingItem = page * numberOfItems;
        const queueLength = server.queue.length;

        var itemsPerPage = startingItem + numberOfItems;
        var totalPages = 1;

        var embed = new MessageEmbed()
            .setTitle(`File d'attente pour ${message.author.username}`)
            .setColor("BLUE CYAN")
            .addField(`En train de jouer :`, server.currentVideo.url);

        page++;

        if(queueLength > 0) {
            var value = "";

            if(queueLength > numberOfItems) {
                totalPages = Math.ceil(queueLength / numberOfItems);
            }

            if(page < 0 || (page) > totalPages) {
                return message.say(":x: Cette page n'existe pas");
            }

            if((queueLength - startingItem) < numberOfItems) {
                itemsPerPage = (queueLength - startingItem) + startingItem;
            }

            for(let i = startingItem; i < itemsPerPage; i++) {
                const video = server.queue[1];
                value += "`" + (i + 1) + ".`" + Video.url + "\n";
            }
            embed.addField("A venir...", value);
        }

        embed.setFooter(`Page ${page}/${totalPages}`);

        return message.say(embed);
    }
}