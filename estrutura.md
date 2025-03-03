src/
│
├── config/                # Arquivos de configuração
│   ├── googleAI.js        # Configurações do Google Generative AI
│   ├── whatsapp.js        # Configuração do cliente WhatsApp
│   └── prisma.js          # Configuração do Prisma
│
├── controllers/           # Lógica de controle (respostas, processamento de mensagens)
│   ├── messageController.js
│   └── responseController.js
│
├── services/              # Serviços e interações externas (Google AI, Banco de Dados)
│   ├── googleAIService.js
│   └── expenseService.js
│
├── models/                # Definições de dados ou modelos de banco
│   └── expenseModel.js    # Modelos do Prisma, por exemplo
│
├── utils/                 # Funções utilitárias
│   └── randomResponse.js  # Função para gerar respostas aleatórias
│
└── index.js               # Arquivo principal de inicialização
