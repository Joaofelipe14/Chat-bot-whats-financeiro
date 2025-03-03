const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const path = require('path');
const fs = require('fs');
const ChartDataLabels = require('chartjs-plugin-datalabels'); // Importando o plugin

// Configuração do gráfico
const width = 800;  // Largura do gráfico
const height = 600; // Altura do gráfico

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColor: 'white',  // Fundo branco para o gráfico
});

// Função para gerar gráfico de barras com gastos diários e fundo branco
async function generateBarChart(days, expenses, outputFileName) {
  // Configuração do gráfico de barras
  const configuration = {
    type: 'bar', // Gráfico de barras
    data: {
      labels: days,  // Dias da semana como rótulos (Ex: "Segunda", "Terça", ...)
      datasets: [
        {
          label: 'Gastos Diários',  // Rótulo para o gráfico
          data: expenses,  // Valores dos gastos para cada dia
          backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Cor de fundo das barras
          borderColor: 'rgba(75, 192, 192, 1)',  // Cor das bordas das barras
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        // Adicionando o plugin de data labels para exibir os valores nas barras
        datalabels: {
          formatter: (value) => {
            return `$${value.toFixed(2)}`; // Exibindo o valor com 2 casas decimais
          },
          color: '#fff',  // Cor do texto das porcentagens
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Faz com que o eixo Y comece do zero
        },
      },
    },
    plugins: [ChartDataLabels], // Registrando o plugin de data labels
  };

  // Gerar o gráfico e salvar como imagem
  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync(path.join(__dirname, outputFileName), imageBuffer);
  console.log(`Gráfico de barras gerado com sucesso! Salvo como ${outputFileName}`);
}

// Exemplo de uso da função
const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const expenses = [200, 150, 100, 50, 75, 130, 80]; // Gasto de cada dia

// Chama a função para gerar o gráfico de barras
generateBarChart(days, expenses, 'grafico_barras_gastos_diarios.png');
