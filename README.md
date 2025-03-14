# Controle Financeiro via WhatsApp

Este projeto visa criar um sistema de controle financeiro pessoal utilizando o **WhatsApp Web**, **Node.js** e **Prisma** para gerenciamento de dados. O objetivo é permitir que o usuário registre suas receitas e despesas diretamente pelo WhatsApp, com categorias personalizáveis, geração de gráficos financeiros e sugestões de economia ou investimentos quando houver saldo positivo.

Detalhes de transação armazenar na tabela mesagem [X]
lista detalhes de transação [ ]
Apagar transação pelo codigo [ ]
Ajustar gráficos [ ]
gráfico semanal [ ]
Melhorar respostar do bot [ ]
Setar o Tutorial do app :
Cadastro [ ]
Detalhes da transação [ ]
geração de relátorios [ ] 

## Funcionalidades

### Funcionalidades Principais

1. **Receber Mensagens via WhatsApp**
- O sistema captura as mensagens enviadas pelos usuários no WhatsApp com informações de receitas ou despesas.

2. **Classificação Automática de Despesas e Receitas**
- O sistema será capaz de identificar automaticamente o que o usuário está registrando (despesa ou receita), e vincular a categoria correspondente.
- Vai primeiro ser testado de varias forma e expressões(chatbot), se der sucesso, ok, porém se não ele vai pergunta pra api do chat gpt - ai responde e salva

3. **Categorias de Gastos Personalizadas**
- O usuário pode escolher entre categorias padrão, como **Alimentação**, **Transporte**, **Lazer**, **Saúde**, entre outras.

1. **Armazenamento de Dados no Banco de Dados**
   - Todos os registros de transações financeiras, categorias e mensagens são salvos em um banco de dados utilizando **Prisma**.

2. **Gráficos Financeiros**
   - O sistema gera gráficos interativos baseados nas transações registradas (gráficos de barras, pizza, etc).

6. **Sugestões de Economia ou Investimentos**
   - Caso o usuário tenha um saldo positivo no final do mês, o sistema sugere investimentos ou dicas de economia.

7. **Excluir Mensagens e Registros**
   - O sistema permite apagar mensagens e transações, removendo-as tanto do banco de dados quanto dos gráficos gerados.

8. **Interface Web para Cadastro e Visualização**
   - Uma interface web onde os usuários podem cadastrar suas transações financeiras, visualizar gráficos e acessar relatórios detalhados sobre suas finanças.

---

## Requisitos Funcionais

### 1. **Recebimento de Mensagens**
   - O sistema deve ser capaz de ouvir as mensagens enviadas para o WhatsApp, identificar se a mensagem é de receita ou despesa, e processar esses dados.
   
### 2. **Classificação de Despesas e Categorias**
   - Ao identificar uma transação, o sistema deve:
     - **Classificar** a transação como receita ou despesa.
     - **Vincular** a categoria correta (ex: Alimentação, Transporte, etc.).
     - **Salvar** as transações no banco de dados.

### 3. **Armazenamento de Dados no Banco de Dados**
   - O sistema deve salvar as transações, usuários, categorias e mensagens em um banco de dados relacional (usando Prisma).
   
### 4. **Geração de Gráficos Financeiros**
   - O sistema deve gerar gráficos interativos para mostrar a distribuição das receitas e despesas:
     - Gráficos de barras, pizza, ou linha.

### 5. **Cadastro e Login Web**
   - O sistema terá uma interface web onde o usuário pode:
     - Criar uma conta.
     - Visualizar registros de transações anteriores.
     - Adicionar ou editar transações.
     - Visualizar gráficos de performance financeira.

### 6. **Sugestões de Investimentos**
   - Se o usuário estiver com saldo positivo no final do mês, o sistema deve sugerir investimentos, como Tesouro Direto, Fundos de Emergência, etc.

### 7. **Excluir Mensagens e Registros**
   - O usuário pode excluir uma mensagem ou transação, e essas informações serão removidas do banco de dados e dos gráficos.

---

## Tecnologias Utilizadas

- **Backend**: Node.js com **Express**.
- **Banco de Dados**: Prisma + PostgreSQL/MySQL.
- **WhatsApp API**: **whatsapp-web.js** para comunicação com o WhatsApp.
- **Frontend**: HTML, CSS, **React.js** (para interface web).
- **Gráficos**: **Chart.js** para a visualização gráfica de dados financeiros.

---

## Como Rodar o Projeto

### Pré-requisitos
1. Node.js e npm instalados.
2. Banco de dados PostgreSQL ou MySQL configurado.
3. Instalar o **WhatsApp Web** (no modo de desenvolvimento).

### Preview
![Imagem 1](https://raw.githubusercontent.com/Joaofelipe14/Chat-bot-whats-financeiro/refs/heads/main/src/assets/2.jpeg)
![Imagem 1](https://raw.githubusercontent.com/Joaofelipe14/Chat-bot-whats-financeiro/refs/heads/main/src/assets/1.jpeg)
