const genAI = require('../config/googleIA');

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function processActionRegistrar(message, history) {
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
        1. O condeudo da messanegm caiu com a acao registrar ou seja a mensagem envolver um **registro de transação**:
             status: "sucess"
           - A chave 'acao' deve ser 'registrar'.
           - A chave 'tipo' deve ser 'saida' (se for uma despesa) ou 'entrada' (se for uma receita).
           - A chave 'categoria' deve ser uma das seguintes categorias: 
             ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Vestuário", "Tecnologia", "Financeiro", "Serviços", "Pets", "Seguros", "Impostos", "Presentes e Doações", "Outros"].
             O sistema sera capaz de classificar a categoria.
           - A chave 'valor' deve ser um valor numérico do tipo float. Se o valor não for especificado ou for igual a zero, a o status será 'erro' e uma mensagem de como enviar os parametros corretos.
           
            - se a respostar for valida incluir a chave status: "sucess"
 
        Exemplo de uma resposta válida para 'registrar':
        {
          status: "sucess"
          "action": "registrar",
          "tipo": "saida",
          "categoria": "Alimentação",
          "valor": 50.00
        }
        
           Exemplo de uma resposta caso para 'registrar se for erro':
        {
          "status": "erro",
          "message": "Aqui vai uma mensagem natural indicando coom resolver o erro, com exemplos(Por favor forneca o valor que foi gasto nessa transação ou algo do tipo)"

        }
        
        Mensagem a ser interpretada: "${message}"
        Histórico das últimas 5 mensagens**: "${history}"                

     `
                        },
                    ],
                }
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


async function processActionRelatorio(message, history) {
    try {

        const dataAtual = new Date();

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
        A mensgem foi classificada com conteudo referente a informações sobre relatorio
              - A chave 'acao' deve ser 'relatorio'.
              - A chave 'filtro' deve ser um objeto contendo:
              - 'tipo': Pode ser 'ENTRADA', 'SAIDA', ou 'COMPARACAO'. Se não especificado, 'SAIDA' será o valor padrão.
              - 'categoria': Um array com categorias ou nada. voce tem que categorizar ele em um desses aqui: ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Vestuário", "Tecnologia", "Financeiro", "Serviços", "Pets", "Seguros", "Impostos", "Presentes e Doações", "Outros"].
              - 'criadoEm': Um intervalo de datas no formato dateTIme. use como data atual esse valor ${dataAtual}" se base nela para fazer o calculos dos filtros, caso a mensgem nao menciona nenhuma dia, mes ou semana espeficia não mande esse filtro
              - se a respostar for valida incluir a chave status: "sucess"
               Exemplo de uma resposta válida para 'relatorio':
        {
          "acao": "relatorio",
          "status":"sucess";
          "filtro": {
            "tipo": "SAIDA",->upercase obrigatorio
            "categoria": {
                in: // se ao tiver nao mande o campo categoria  aqui traz os arrays das cateogiras mencionadas, se nao tiver nada nem traga chave categoria
                }, 
              "criadoEm": {
             gte: dt inicial
      lte: dtfinal do intervalo
          } mande o campo no formato DATetime
        }
        Se a mensagem não for clara ou não puder ser interpretada como um registro ou relatório, retorne o erro no seguinte formato:
        {
          "action": "relatorio",
            "status":"erro";
          "message": "Aqui vai uma mensagem natural indicando as informações necessaria para processar melhor a resposta exemplo: forna um intervalo de datas ou cateogrias que voce quer filtrar"
"
        }
           
        Mensagem a ser interpretada: "${message}"
        Histórico das últimas 5 mensagens**: "${history}"                

     `
                        },
                    ],
                }
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


async function processActionDetalhes(message, history) {
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

           - A chave 'categoria' deve ser uma das seguintes categorias: 
             ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Vestuário", "Tecnologia", "Financeiro", "Serviços", "Pets", "Seguros", "Impostos", "Presentes e Doações", "Outros"].
             O sistema sera capaz de classificar a mensgaem e uma  categoria.
           
            - se a respostar for valida incluir a chave status: "sucess"
 
        Exemplo de uma resposta válida para 'registrar':
        {
          status: "sucess"
          "categoria": "Alimentação",
        }
        
           Exemplo de uma resposta caso para 'registrar se for erro':
        {
          "status": "erro",
          "message": "Aqui vai uma mensagem natural indicando como resolver o erro, com exemplos(Por favor forneca sobre o que voce deseja ver mais detalhes."

        }
        
        Mensagem a ser interpretada: "${message}"
        Histórico das últimas 5 mensagens**: "${history}"                

     `
                        },
                    ],
                }
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

module.exports = { processActionRegistrar,processActionRelatorio,processActionDetalhes };
