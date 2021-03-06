const { VoiceConnection } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const { SemVer } = require("semver");
const ytdl = require("ytdl-core-discord");

module.exports = class PlayCommand extends Command{
    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["p"],
            group: "music",
            memberName: "play",
            description: "test",
            args: [
                {
                    key: "query",
                    prompt: "Quel musique veux tu écouter ?",
                    type: "string"
                }
            ]
        });
    }
    
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message, { query}) {
        const server = message.client.server;
        await message.member.voice.channel.join().then((connection) => {

            if (server.currentVideo.url != ""){
                server.queue.push({ title: "", url: query });
                return message.say("Votre musique a bien été ajouté a la liste avec succès");
            }
            server.currentVideo = { title: "", url: query };
            this.runVideo(message, connection, query);
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection 
     * @param {*} video 
     */
    async runVideo(message, connection, videoUrl) {
        const server = message.client.server;

        if(!message.member.voice.channel) {
            return message.say(":x: Tu dois être dans un salon vocal pour executer cette commande");
        }

        
        const dispatcher = connection.play(await ytdl(videoUrl, {filter: "audioonly"}), {type: "opus"});

        server.queue.shift();
        server.dispatcher = dispatcher;

        dispatcher.on("finish", () => {
            if(server.queue[0]) {
                server.currentVideo = server.queue[0];
                return this.runVideo(message, connection, server.currentVideo.url);
            }
        });

        return message.say("En train de jouer :notes: ");
    }
}