const client = require('../config/whatsapp');
const { greetings, helpKeywords, generalInquiryKeywords } = require('../utils/keywords');

function messageSet(userNumber, lowerCaseMessage) {


    
    const welcomeMessage = "Bem-vindo ao seu assistente financeiro! 💰\n\n" +
    "Olá, estamos muito felizes em ter você por aqui! Este é o seu novo assistente de controle financeiro, pronto para te ajudar a gerenciar suas despesas de forma simples e eficiente. 😊\n\n" +
    "Com ele, você pode:\n\n" +
    "- **Registrar suas despesas**: A qualquer momento, me avise sobre suas compras e eu as registrarei para você. Por exemplo, digite 'Registrar despesa de 50 reais em alimentação' e pronto!\n" +
    "- **Gerar relatórios**: Quer saber como está o seu controle financeiro? Pergunte sobre o seu histórico de despesas e eu te mostro tudo com um relatório claro e detalhado.\n" +
    "- **Consultar o saldo das suas despesas**: Quer saber quanto já gastou até agora? Pergunte 'Qual o total das minhas despesas?' e eu te mostro!\n\n" +
    "Fique à vontade para explorar e, se precisar de ajuda, basta pedir!\n\n" +
    "Estou aqui para tornar seu controle financeiro mais fácil e eficiente. Vamos começar? 😉";



    // Verificar saudações
    if (greetings.some(greeting => lowerCaseMessage.includes(greeting))) {
        const msg = "Olá! Como posso te ajudar com seu controle financeiro hoje? Você pode pedir para *registrar uma despesa* ou *gerar um relatório de despesas*.";
        client.sendMessage(userNumber, msg);
        return true; 
    }

    // Verificar se a mensagem contém pedidos de ajuda
    if (helpKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        const msg = "Eu sou um assistente de controle financeiro. Você pode me pedir para: \n\n" +
            "- Registrar suas despesas (ex: 'Registrar despesa de 50 reais em alimentação') 💰\n" +
            "- Gerar um relatório de despesas (ex: 'Quais foram minhas despesas do mês passado?') 📊\n" +
            "- Ou pedir para mostrar o saldo de suas despesas (ex: 'Qual o total das minhas despesas?') 💸\n\n" +
            "Se precisar de algo mais, é só falar! 😊";
        client.sendMessage(userNumber, msg);
        return true; 
    }

    // Verificar se a mensagem contém dúvidas gerais
    if (generalInquiryKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        const msg = "Parece que você tem uma dúvida. Como posso te ajudar? Você pode perguntar sobre 'registrar uma despesa' ou 'gerar um relatório de despesas'.";
        client.sendMessage(userNumber, msg);
        return true; 
    }

    return false;
}


module.exports = { messageSet };
