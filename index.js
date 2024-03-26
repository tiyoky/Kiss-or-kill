const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();
const PREFIX = '+';

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'kissorkill') {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send("Vous n'avez pas la permission de gérer le serveur.");
        }

        try {
            const response = await fetch('https://api.waifu.pics/sfw/kiss');
            const data = await response.json();
            const animeImageUrl = data.url;

            const embed = new Discord.MessageEmbed()
                .setTitle('Kiss or Kill ?')
                .setImage(animeImageUrl)
                .setColor(getRandomColor())
                .setDescription('Réagissez avec 🔪 pour "Kill" ou 💋 pour "Kiss".');

            message.channel.send(embed)
                .then(sentMessage => {
                    sentMessage.react('🔪')
                        .then(() => sentMessage.react('💋'))
                        .catch(err => console.error('Error reacting:', err));
                })
                .catch(err => console.error('Error sending message:', err));
        } catch (error) {
            console.error('Error fetching anime image:', error);
            message.channel.send("Une erreur s'est produite lors de la récupération de l'image d'anime.");
        }
    }
});

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

client.login('process.env.TOKEN');
