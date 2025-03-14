const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
});
const { generatePieChart } = require('../utils/graficoPizza');
const crypto = require('crypto');
const responseController = require('./responseController');

const registerExpense = async (user, mensagem, interpretation) => {
    try {

        const codigo = await gerarCodigoUnico();
     

        const usuario = await prisma.usuario.findFirst({
            where: { celular: user },
        });

        console.log(usuario)
        const transacao =  await prisma.Transacao.create({
            data: {
                usuarioId: usuario.id,
                codigo: codigo,
                categoria: interpretation.categoria,
                tipo: interpretation.tipo.toUpperCase(),
                valor: parseFloat(interpretation.valor),

            }
        });


        await prisma.Mensagem.create({
            data: {
                usuarioId: usuario.id,
                conteudo: mensagem,
                transacaoId: transacao.id
            }
        })

        return {
            message: responseController.getRandomResponse("registrar_gasto", interpretation),

        }
    } catch (error) {
        console.error("Erro ao registrar gasto:", error);
        return { message: "Houve um erro ao registrar. Tente novamente." };

    }
};

const generateReport = async (user, interpretation) => {
    try {

     
        const usuario = await prisma.usuario.findFirst({
            where: { celular: user },
        });

        const filtro = interpretation.filtro || null;

        let whereClause = { usuarioId: usuario.id };

        if (filtro) {
            if (filtro.tipo) {
                whereClause.tipo = filtro.tipo;
            }
            if (filtro.categoria && filtro.categoria.in) {
                whereClause.categoria = { in: filtro.categoria.in };
            }
            if (filtro.criadoEm) {
                whereClause.criadoEm = filtro.criadoEm;
            }
        }

        const transacoes = await prisma.transacao.findMany({ where: whereClause });
        const resumo = new Map();

        // Agrupar e somar os valores por categoria
        transacoes.forEach(({ categoria, valor }) => {
            resumo.set(categoria, (resumo.get(categoria) || 0) + parseFloat(valor));
        });

        const report = [...resumo.entries()]
            .map(([categoria, total]) => `- ${categoria}: R$${total.toFixed(2)}`)
            .join("\n");


        let imageBuffer = null;

        if(transacoes.length >0 ){
            imageBuffer = imageBuffer || await generatePieChart(transacoes);
        }

        console.log(filtro);

        return {
            message: responseController.getRandomResponse("relatorio", { report: report || "Nenhum gasto encontrado." }),
            media: imageBuffer
        };

    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        return { message: "Houve um erro ao gerar seu relatório. Tente novamente. 🥲" };
    }
};


async function gerarCodigoUnico() {
    let codigo;
    let existe = true;

  
    while (existe) {
        codigo = crypto.randomBytes(3).toString('hex').toUpperCase();
        const transacaoExistente = await prisma.transacao.findFirst({
            where: { codigo }
        });

        if (!transacaoExistente) {
            existe = false;
        }
    }

    return codigo;
}

module.exports = { registerExpense, generateReport };
