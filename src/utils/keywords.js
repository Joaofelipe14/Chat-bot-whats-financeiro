// utils/keywords.js

// Saudações
const greetings = [
    'boa noite', 'olá', 'oi', 'salve', 'bom dia', 'boa tarde',
    'e aí', 'oi tudo bem', 'olá tudo bem?', 'como vai?', 'tudo bem?', 
    'hey', 'hi', 'olá pessoal','.','??'
];

// Pedidos de ajuda
const helpKeywords = [
    'ajuda', 'como funciona', 'me ajude', 'o que posso fazer', 'explica', 'preciso de ajuda',
    'como usar', 'me explique', 'o que você faz', 'quais são suas funcionalidades',
    'como posso interagir', 'o que posso perguntar', 'me mostre o que fazer', 'me ajuda com',
    'funções','funcionalidades'
];

// Dúvidas gerais
const generalInquiryKeywords = [
    'duvida', 'não entendi', 'como funciona isso', 'não sei como usar', 'como faço isso',
    'me ensina', 'me explica', 'como assim', 'o que você faz', 'o que é isso'
];

// Solicitações de informações
const informationKeywords = [
    'me mostre', 'me dê um exemplo', 'demonstra', 'mostra', 'me ensina', 
    'como faço para ver', 'quero ver', 'como ver'
];


// Exportar todas as palavras-chave
module.exports = {
    greetings,
    helpKeywords,
    generalInquiryKeywords,
    informationKeywords
};
