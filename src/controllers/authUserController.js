const { verificarAutenticacao, pedirEscolhaDePlano, processarEscolhaDePlano } = require('./userController');

let historyAuth = {}

/* retorna se esta logado ou nao */
async function authUser(msg) {


    if (!historyAuth[msg.from]) {
        historyAuth[msg.from] = [];
    }
    //** Verificar se o usuario está cadastrado, se não vai devolver os planos de cadastro pra ele**/
    let isAuthenticated = await verificarAutenticacao(msg.from);

    if (!isAuthenticated) {

        if (historyAuth[msg.from].contexto == 'escolher_plano') {
            const retornoPorcessarPlano = await processarEscolhaDePlano(msg.from, msg.body, msg._data.notifyName);
            isAuthenticated = retornoPorcessarPlano;
            historyAuth[msg.from].contexto = isAuthenticated ? null:'escolher_plano' ;
            return false;

        } else {
            await pedirEscolhaDePlano(msg.from);
            historyAuth[msg.from].contexto = "escolher_plano";
            return false
        }
    }
    return true
}

module.exports = { authUser };
