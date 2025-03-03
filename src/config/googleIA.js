const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = 'AIzaSyDvMGDbuPqzV1Q365PhLYgyroscn_kToJc'
const genAI = new GoogleGenerativeAI(apiKey);

module.exports = genAI;
