const client = require('./config/whatsapp');
const qrcode = require('qrcode-terminal'); //
const { handleUserMessage } = require('./controllers/messageController');

client.on('qr', (qr) => {
    console.log('QR Code recebido, escaneie com o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
});
let history = {}

client.on('message', async msg => {
    if (!msg.from.endsWith('@g.us')) {

        console.log()
        let userNumber = msg.from

        if (!history[msg.from]) {
            history[msg.from] = [];
        }

        history[msg.from].push(msg.body);
        if (history[msg.from].length > 3) {
            history[msg.from].shift();
        }

    
       await handleUserMessage(userNumber, msg, history);
        // client.sendMessage(userNumber, response.msg);


    }
});

client.initialize();
