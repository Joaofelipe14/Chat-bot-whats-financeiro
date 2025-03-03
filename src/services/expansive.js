const prisma = require('../config/prisma');
const { generatePieChart } = require('../utils/graficoPizza');  // Ajuste o caminho conforme necessário

const responseController = require('../controllers/responseController');

const registerExpense = async (user, interpretation) => {
    try {
        await prisma.expense.create({
            data: {
                user,
                category: interpretation.category,
                type: interpretation.type,
                amount: parseFloat(interpretation.value),
                date: new Date(),
            }
        });
        return {
            msg: responseController.getRandomResponse("registrar_gasto", interpretation),

        }
    } catch (error) {
        console.error("Erro ao registrar gasto:", error);
        return { msg: "Houve um erro ao registrar. Tente novamente." };

    }
};

const generateReport = async (user, interpretation) => {
    try {



        console.log(typeof interpretation.filter)

        const filter = interpretation.filter  || null;

        console.log(filter)
        const expenses = await prisma.expense.findMany({ where: { user ,...filter // Adiciona as condições do filtro diretamente
        } });
        console.log(expenses)
        let report = expenses.map(exp => `- ${exp.category}: R$${exp.amount} em ${new Date(exp.date).toLocaleDateString()}`).join("\n");

        let imageBuffer = null;

        imageBuffer = imageBuffer || await generatePieChart(expenses);
        return {
            msg: responseController.getRandomResponse("relatorio", { report: report || "Nenhum gasto encontrado." }),
            media: imageBuffer
        };

    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        return { msg: "Houve um erro ao gerar seu relatório. Tente novamente. 🥲" };
    }
};

module.exports = { registerExpense, generateReport };
