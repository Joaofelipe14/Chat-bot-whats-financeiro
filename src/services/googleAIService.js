const genAI = require('../config/googleIA');

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const interpretMessage = async (message, history) => {
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
        
        Interprete a seguinte mensagem e retorne a resposta no formato JSON de acordo com as instruções abaixo:
        1. Se a mensagem envolver um **registro de transação**:
           - A chave 'action' deve ser 'registrar'.
           - A chave 'type' deve ser 'saida' (se for uma despesa) ou 'entrada' (se for uma receita).
           - A chave 'category' deve ser uma das seguintes categorias: 
             ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Vestuário", "Tecnologia", "Financeiro", "Serviços", "Pets", "Seguros", "Impostos", "Presentes e Doações", "Outros"].
           - A chave 'value' deve ser um valor numérico do tipo float. Se o valor não for especificado ou for igual a zero, a ação será 'erro'.
           
        2. Se a mensagem envolver um **relatório**:
           - A chave 'action' deve ser 'relatorio'.
           - A chave 'filter' deve ser um objeto contendo:
             - 'type': Pode ser 'entrada', 'saida', ou 'comparacao'. Se não especificado, 'saida' será o valor padrão.
             - 'category': Um array com categorias ou nada.
             - 'date': Um intervalo de datas (por exemplo, {gte: "2025-01-01", lte: "2025-02-28"}). somente se for espeficicada
           
        3. Se a mensagem não for reconhecida como um pedido de registro/cadastro ou relatório, a resposta deve ser um erro. O formato do erro será:
           - A chave 'action' será 'erro'.
           - A chave 'message' deve conter uma mensagem de erro sugerindo uma ação mais clara para o usuário.
        
        Exemplo de uma resposta válida para 'registrar':
        {
          "action": "registrar",
          "type": "saida",
          "category": "Alimentação",
          "value": 50.00
        }
        
        Exemplo de uma resposta válida para 'relatorio':
        {
          "action": "relatorio",
          "filter": {
            "type": "saida",
            "category": {
                in: ["Lazer"]
                },
              "date": {
              "gte": "2025-01-01",
              "lte": "2025-02-28"
            }
          }
        }
        Se a mensagem não for clara ou não puder ser interpretada como um registro ou relatório, retorne o erro no seguinte formato:
        {
          "action": "erro",
          "message": "Desculpe, não entendi a sua solicitação. Tente algo como: 'Registrar uma despesa de R$50,00 em Alimentação' ou 'Gerar relatório de despesas de janeiro'."
        }
        Mensagem a ser interpretada: "${message}"
        Histórico das últimas 5 mensagens**: "${history}"
        `
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: `{
          "action": "outro",
          "message": "Não entendi bem. Poderia reformular?"
        }`,
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

module.exports = { interpretMessage };
