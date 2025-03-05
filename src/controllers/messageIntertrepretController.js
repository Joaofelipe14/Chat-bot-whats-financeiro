const client = require('../config/whatsapp');
const { MessageMedia } = require('whatsapp-web.js');
const { interpretMessageClassific } = require('../services/ClassifiqueMessageService');
const { processActionRegistrar, processActionRelatorio } = require('../services/processMessageIaService');

const transection = require('./TransectionController')

async function interpretMessageAndResponse(userNumber, message, historyMessage) {

    const classificacaoMsg = await interpretMessageClassific(message, historyMessage);


    console.log(classificacaoMsg)


    let interpretation = {}

    // Verificar a ação da interpretação
    switch (classificacaoMsg.acao) {
        case "registrar":
            console.log('caiu no registrar ')

            interpretation = await processActionRegistrar(message, historyMessage);

            if(interpretation.status=="sucess"){
                const retornoRegistrar = await transection.registerExpense(userNumber, interpretation);
             
                client.sendMessage(userNumber, retornoRegistrar.message);
            }

            if(interpretation.status=="erro"){
                client.sendMessage(userNumber, interpretation.message);
            }

            break;

        case "relatorio":
            interpretation = await processActionRelatorio(message, historyMessage);


            if(interpretation.status=="sucess"){
                const retornoRelatorio = await transection.generateReport(userNumber, interpretation);
                client.sendMessage(userNumber, retornoRelatorio.message);

                if (retornoRelatorio.media) {
                    const media = new MessageMedia('image/png', retornoRelatorio.media.toString('base64'));
                    client.sendMessage(userNumber, media);
                }
            }


            if(interpretation.status=="erro"){
                client.sendMessage(userNumber, interpretation.message);
            }

            break;

        case "erro":
        case "ajuda":
        case "saudacao":
        case "outro":
            client.sendMessage(userNumber, classificacaoMsg.message);
            break;

        default:
            client.sendMessage(userNumber, "Não entendi. Tente perguntar sobre 'registrar uma despesa' ou 'gerar um relatório'.");
            break;
    }
}

module.exports = { interpretMessageAndResponse };
