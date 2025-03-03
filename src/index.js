const client = require('./config/whatsapp');
const { Client, MessageMedia } = require('whatsapp-web.js');
const path = require('path');

const { handleUserMessage } = require('./controllers/messageController');

client.on('qr', (qr) => {
    console.log('QR Code recebido, escaneie com o WhatsApp:', qr);
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
});
let history = {}

client.on('message', async msg => {
    if (!msg.from.endsWith('@g.us')) {
        console.log(`Mensagem de ${msg.from}: ${msg.body}`);
        let chatId = msg.from;

        if (!history[msg.from]) {
            history[msg.from] = [];
        }

        history[msg.from].push(msg.body);
        if (history[msg.from].length > 3) {
            history[msg.from].shift();
        }

        const response = await handleUserMessage(msg.from, msg.body, history);
        client.sendMessage(chatId, response.msg);

        if (response.media) {

            const media = new MessageMedia('image/png', response.media.toString('base64'), 'grafico_pizza_com_porcentagem.png');
            client.sendMessage(chatId, 'Your media');
            client.sendMessage(chatId, media);

        }
    }
});

client.initialize();
