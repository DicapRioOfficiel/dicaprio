const { VoiceConnection } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class JoinCommand extends Command{
    constructor(client) {
        super(client, {
            name: "join",
            aliases: ["j"],
            group: "music",
            memberName: "join",
            description: "Me permet de rejoindre un salon vocal",
        });
    }
    
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) {
            return message.say(":x: Tu dois être dans un salon vocal pour executer cette commande");
        }

        await voiceChannel.join();
        
        return message.say(":thumbsup: Je viens de rejoindre" + "`" + voiceChannel.name + "`");
    }
}