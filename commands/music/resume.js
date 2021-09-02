const { VoiceConnection } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require("discord.js");

module.exports = class ResumeCommand extends Command{
    constructor(client) {
        super(client, {
            name: "resume",
            aliases: ["r"],
            group: "music",
            memberName: "resume",
            description: "Reprend la musique",
        });
    }
    
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
        const dispatcher = message.client.server.dispatcher;

        if(!message.member.voice.channel) {
            return message.say(":x: Tu dois être dans un salon vocal pour executer cette commande");
        }

        if(!message.client.voice.connections.first()) {
            return message.say(":x: Je ne suis pas dans un salon vocal. Tape `D.join` pour me faire venir dans un salon vocal");
        }

        if(dispatcher) {
            dispatcher.resume();
        }
        return message.say("La musique a été repris :notes:");
    }
}