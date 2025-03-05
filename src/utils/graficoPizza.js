// chartGenerator.js
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function generatePieChart(data) {
  try {
    const categories = Array.from(new Set(data.map(item => item.categoria)));
    const values = categories.map(categoria => {
      return data
        .filter(item => item.categoria == categoria)
        .reduce((sum, exp) => sum + Number(exp.valor), 0);
    });


    const total = values.reduce((sum, val) => sum + val, 0);

    const percentages = values.map(value => {
      return total === 0 ? "0%" : `${((value / total) * 100).toFixed(2)}%`;
    });
    
    const labelsWithPercentages = categories.map((categoria, index) => {
      return `${categoria}: ${percentages[index]}`;  
    });

    const width = 600;
    const height = 400;

    const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width,
      height,
      backgroundColor: 'white',
    });

    console.log(labelsWithPercentages);
    console.log(values);

    const configuration = {
      type: 'pie',
      data: {
        labels: labelsWithPercentages, 
        datasets: [
          {
            data: values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(201, 203, 207, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(201, 203, 207, 1)',
            ],
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
        },
      },
      // plugins: [di],  // Se ainda quiser usar para outros detalhes
    };

    // Gerar o gráfico e salvar como imagem
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    console.log('Gráfico de pizza gerado com sucesso!');
    return imageBuffer;

  } catch (error) {
    console.error('Erro ao processar dados:', error);
    return null;
  }
}

module.exports = { generatePieChart };
