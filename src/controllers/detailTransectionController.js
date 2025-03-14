const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getMensagemByCategoria = async (usuario, interpretation) => {
    try {
        console.log('aqui no getMensagemByCategoria');

        // 1. Consultar as transações com o usuarioId e categoria
        const transacoes = await prisma.transacao.findMany({
            where: {
                usuarioId: usuario.id,
                categoria: interpretation.categoria,
            },
            include: {
                // Incluir as mensagens relacionadas a cada transação
                mensagens: true,
            },
        });

        // 2. Verificar se há transações
        if (transacoes.length === 0) {
            return { message: "Não há transações para a categoria informada." };
        }

        // 3. Criar mensagens para cada transação, se necessário
        const mensagens = await Promise.all(
            transacoes.map(async (transacao) => {
                // Verificar se já existe uma mensagem para a transação, caso contrário, criar
                if (transacao.mensagens.length === 0) {
                    const mensagem = await prisma.mensagem.create({
                        data: {
                            usuarioId: usuario.id,
                            conteudo: `Transação registrada: ${transacao.codigo} - ${transacao.valor} ${transacao.tipo}`,
                            transacaoId: transacao.id, // associando a transação com a mensagem
                        },
                    });
                    return mensagem;
                }
                return transacao.mensagens[0]; // Retornar a mensagem existente se já houver
            })
        );

        console.log(mensagens)
        return { mensagens };

    } catch (error) {
        console.error("Erro ao buscar e registrar mensagens:", error);
        return { message: "Houve um erro ao buscar registro. Tente novamente." };
    }
};

module.exports = { getMensagemByCategoria };
