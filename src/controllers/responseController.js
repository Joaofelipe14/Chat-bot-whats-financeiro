const responses = {
    nao_entendido: [
        "Hmm, não entendi muito bem. Pode explicar de outra forma? 🤔",
        "Desculpe, não peguei essa. Quer tentar de novo? 😅",
        "Não ficou claro. Você pode reformular? 🤷‍♂️"
    ],
    registrar_gasto: [
        "Gasto de *R${valor}* em '*{categoria}*' registrado com sucesso! 💸",
        "Anotei! *R${valor}* gastos em '*{categoria}*'. 📝",
        "Beleza! Seu gasto de *R${valor}* na categoria '*{categoria}*' foi salvo. ✅"
    ],
    relatorio: [
        "Aqui está seu relatório:\n{report} 📊",
        "Seus gastos mais recentes:\n{report} 💰",
        "Dá uma olhada no seu histórico:\n{report} 📈"
    ]
};


const getRandomResponse = (key, data = {}) => {
    const options = responses[key] || ["Ops, algo deu errado!"];
    const response = options[Math.floor(Math.random() * options.length)];
    return response.replace(/{(\w+)}/g, (_, variable) => data[variable] || "");
};

module.exports = { getRandomResponse };
