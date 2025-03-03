// const responses = {
//     nao_entendido: [
//         "Hmm, não entendi muito bem. Pode explicar de outra forma?",
//         "Desculpe, não peguei essa. Quer tentar de novo?",
//         "Não ficou claro. Você pode reformular?"
//     ]
// };

// const getRandomResponse = (key, data = {}) => {
//     const options = responses[key] || ["Ops, algo deu errado!"];
//     const response = options[Math.floor(Math.random() * options.length)];
//     return response.replace(/{(\w+)}/g, (_, variable) => data[variable] || "");
// };

// module.exports = { getRandomResponse };
