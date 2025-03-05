const genAI = require('../config/googleIA');

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function interpretMessageClassific (message, history) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `
                            Você é um sistema de controle financeiro com funcionalidades de registro de despesas, entradas, relatórios e uma lista de categorias.
                            Interprete a seguinte mensagem e retorne a resposta no formato JSON de acordo com as instruções abaixo
                            Se a mensagem envolver algo informal ou natural, como uma saudação, resposta casual ou comentário, a resposta será natural, e o sistema responderá de forma mais humana e e as vezes use e emoticon no final.  {acao: "saudacao",message:mesagem natural}
                            se for coisas como pedido de ajuda, ou dicas retorna  {acao: "ajuda":message:'dicas de como ajuda  e o sistema responderá de forma mais humana e as vezes use emoticon no final. '}
                            Se a mensagem envolver um registro/cadastro de transação, como uma despesa ou receita, o sistema deve retornar um JSON  {acao: "registrar"}
                            Se a mensagem envolver um relatório de despesas, entradas ou comparação, o sistema deve retornar um JSON  {acao: "relatorio"}
                            Se a mensagem não se enquadrar nas categorias de registros ou relatórios, a resposta será um erro, sugerindo uma ação mais clara para o usuário. e o sistema responderá de forma mais humana e e as vezes use  emoticon no final.   {acao: "erro", message:aqui uma mensagem simples}
                            Mensagem a ser interpretada: "${message}"
                            Histórico das últimas 5 mensagens**: "${history}"

        `
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Erro na interpretação:", error);
    return { action: "erro", message: "Não consegui entender. Poderia reformular?" };
  }
};

module.exports = { interpretMessageClassific };
