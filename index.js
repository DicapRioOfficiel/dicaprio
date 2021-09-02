const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const client = new CommandoClient({
      commandPrefix: "D.",
      owner: "793611755225088051",
      invite: "https://discord.gg/Bt9JUwcG4k"
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup("music", "Music")
    .registerCommandsIn(path.join(__dirname, "commands"));

client.server = {
    queue: [],
    currentVideo: {title: "", url: ""},
    dispatcher: null
};

    client.once("ready", () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
})

client.on("error", console.error);

client.login(process.env.TOKEN);