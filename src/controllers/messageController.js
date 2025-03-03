// controllers/messageController.js
const client = require('../config/whatsapp');


const { greetings, helpKeywords, generalInquiryKeywords } = require('../utils/keywords');
const googleAIService = require('../services/googleAIService');
const expenseService = require('../services/expansive');

const handleUserMessage = async (user, message, historyMessage) => {
    const lowerCaseMessage = message.toLowerCase();


    // Verificar se a mensagem contém saudações
    if (greetings.some(greeting => lowerCaseMessage.includes(greeting))) {
        return {
            msg: "Olá! Como posso te ajudar com seu controle financeiro hoje? Você pode pedir para *registrar uma despesa* ou *gerar um relatório de despesas*."
        }
    }

    // lista de categorias

    // Verificar se a mensagem contém pedidos de ajuda
    if (helpKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return {
            msg: "Claro! Eu sou um assistente de controle financeiro. Você pode me pedir para: \n\n" +
                "- Registrar suas despesas (ex: 'Registrar despesa de 50 reais em alimentação') 💰\n" +
                "- Gerar um relatório de despesas (ex: 'Quais foram minhas despesas do mês passado?') 📊\n" +
                "- Ou pedir para mostrar o saldo de suas despesas (ex: 'Qual o total das minhas despesas?') 💸\n\n" +
                "Se precisar de algo mais, é só falar! 😊"
        }
    }
    
    // Verificar se a mensagem contém dúvidas ou questões gerais
    if (generalInquiryKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return {
            msg: "Parece que você tem uma dúvida. Como posso te ajudar? Você pode perguntar sobre 'registrar uma despesa' ou 'gerar um relatório de despesas'."
        }
    }

    // Processar comandos financeiros, aqui ele vai requsição para a APi
    const interpretation = await googleAIService.interpretMessage(message,historyMessage);
    console.log("Interpretação:", interpretation);

    if (interpretation.action === "registrar") {
        if(interpretation.value  <= 0){  
            console.log('caiu aqui ')
            return   client.sendMessage(user,interpretation.message);
        }
        return await expenseService.registerExpense(user, interpretation);
    }

    if (interpretation.action === "relatorio") {
        return await expenseService.generateReport(user,interpretation);
    }

    if (interpretation.action === "erro" || interpretation.action == "outro") {
        return { msg: interpretation.message}; 
    }

    // Caso de ação desconhecida
    return { msg: "Não entendi. Tente perguntar sobre 'registrar uma despesa' ou 'gerar um relatório'." };
};

module.exports = { handleUserMessage };
