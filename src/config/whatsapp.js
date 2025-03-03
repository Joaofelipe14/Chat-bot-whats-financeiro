const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
});

module.exports = client;
