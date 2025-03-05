const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Memcached = require('memcached');
const client = require('../config/whatsapp');

const memcached = new Memcached('127.0.0.1:11211');

memcached.on('connect', () => {
    console.log("Memcached está pronto.");
});

memcached.on('error', (err) => {
    console.error("Erro no Memcached:", err);
});


async function verificarAutenticacao(numero) {
    try {
        let autenticado = await new Promise((resolve, reject) => {
            memcached.get(numero, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });

        // if (autenticado) {
        //     console.log(`Usuário ${numero} autenticado via cache.`);
        //     return true;
        // }

        const usuario = await prisma.usuario.findFirst({
            where: { celular: numero },
        });

        if (usuario) {
            await new Promise((resolve, reject) => {
                memcached.set(numero, 'true', 604800, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            console.log(`Usuário ${numero} autenticado e armazenado no cache por 7 dias.`);

            // Verifica se o plano do usuário é válido
            const planoValido = await verificarPlanoValido(usuario);

            if (planoValido) {
                return true;
            } else {
                console.log(`Plano do usuário ${numero} expirado.`);
                return false;
            }
        }


        console.log('Usuário não encontrado, listando planos...');
        return false; 
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        return false;
    }
}

let historyUser = {}

async function verificarPlanoValido(usuario) {
    try {
        const dataAtual = new Date();


        if (!historyUser[usuario.celular]) {
            historyUser[usuario.celular] = [];
        }


        if (usuario.expiraEm > dataAtual) {
            console.log(`Plano do usuário ${usuario.id} válido até ${usuario.expiraEm}`);
            historyUser[usuario.celular].contexto = null;
            return true;
        } else {
            console.log(`Plano do usuário ${usuario.id} expirado.`);

            console.log(historyUser)
            if (historyUser[usuario.celular].contexto != 'plano_verificado') {
                await client.sendMessage(usuario.celular, "Infelizmente seu plano expirou, renove para continuar aproveitando os serviços.");
                historyUser[usuario.celular].contexto = "plano_verificado";

            } else {
                console.log('mnegsame ja enviada amigo')
            }
            return false;
        }
    } catch (error) {
        console.error("Erro ao verificar validade do plano:", error);
        // await client.sendMessage(usuario.celular, "Erro ao cadastrar ou atualizar usuário. Tente novamente mais tarde.");
        return false;
    }
}

async function pedirEscolhaDePlano(numero) {
    try {
        const planos = await prisma.plano.findMany();

        let mensagem = "Para continuar é necessario escolher um plano:\n";
        planos.forEach((plano, index) => {
            mensagem += `${index + 1} - ${plano.nome}\n`;
        });

        mensagem += "\nResponda com o número do plano que deseja escolher.";

        await client.sendMessage(numero, mensagem);

        return "Aguardando escolha do plano...";
    } catch (error) {
        console.error("Erro ao listar planos:", error);
        return "Erro ao listar os planos.";
    }
}

async function processarEscolhaDePlano(numero, resposta, nome) {
    try {
        const planoEscolhido = parseInt(resposta.trim());


        console.log(numero, nome, resposta)
        if (isNaN(planoEscolhido)) {
            await client.sendMessage(numero, "Por favor, forneça um número de plano válido.");
            return;
        }

        const plano = await prisma.plano.findUnique({
            where: { id: planoEscolhido }
        });

        if (plano) {
            await cadastrarUsuario(nome, numero, plano.duracao)
            await client.sendMessage(numero, `Você escolheu o plano *${plano.nome}*.`);

            const dataAtual = new Date();
            const dataExpiracao = new Date(dataAtual);
            dataExpiracao.setDate(dataAtual.getDate() + plano.duracao);
            
            const dataFormatada = dataExpiracao.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            const mensagem = `Seu plano foi atualizado até ${dataFormatada}.`;
            await client.sendMessage(numero, mensagem);
            await client.sendMessage(numero, 'Para continuar digite: *como funciona*');

            return true;
        } else {
            await client.sendMessage(numero, "Plano não encontrado. Por favor, escolha um plano válido.");
            return false;
        }


    } catch (error) {
        console.error("Erro ao processar a escolha do plano:", error);
        await client.sendMessage(numero, "Erro tente mais tarde.");
        return false;

    }
}
async function cadastrarUsuario(nome, celular, planoDuracao) {
    try {
        const dataAtual = new Date();

        const expiraEm = new Date(dataAtual);
        expiraEm.setDate(dataAtual.getDate() + planoDuracao);

        const usuarioExistente = await prisma.usuario.findFirst({
            where: { celular: celular },

        });

        if (usuarioExistente) {
            await prisma.usuario.update({
                where: {
                    id: usuarioExistente.id,
                },
                data: {
                    expiraEm: expiraEm,
                },
            });

            return true;


        } else {
            await prisma.usuario.create({
                data: {
                    nome,
                    celular,
                    expiraEm,
                },
            });

            return true;
        }
    } catch (error) {
        console.error("Erro ao cadastrar ou atualizar usuário:", error);
        return false;
    }
}

module.exports = {
    verificarAutenticacao,
    pedirEscolhaDePlano,
    processarEscolhaDePlano
};
