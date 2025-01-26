import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

// Регистрируем компоненты Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralDiagram = ({diagramData}) => {
  const [chartData, setChartData] = useState(null); // Инициализируем как null

  useEffect(() => {
    // Мнимые данные для графика

    const datasets = [
      {
        label: 'Finished in time',
        data: [124, 102, 124, 75, 82, 64],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Finished with delay',
        data: [292, 293, 178, 144, 184, 87],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Planning in time',
        data: [398, 354, 354, 269, 224, 133],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Planning with delay',
        data: [1123, 398, 354, 269, 224, 133],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ]

    // const data = {
    //   labels: [
    //     'The construction PRO',
    //     'The engineering group',
    //     'The Unicom',
    //     'The garrison',
    //     'Quick Decisions',
    //     'The synergy group',
    //   ],
    //   datasets: datasets,
    // };
    const data = {
      labels: diagramData.labels,
      datasets: diagramData.datasets,
    };

    const options = {
      responsive: true,
      indexAxis: 'y', // Меняем оси, чтобы столбцы были горизонтальными
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'History',
        },
      },
      scales: {
        x: {
          stacked: true,
          position: 'top',
        },
        y: {
          stacked: true,
        },
      },
    };

    setChartData({ data, options });
  }, []);

  if (!chartData) {
    return <div>Loading...</div>; // Пока данные загружаются, можно показывать индикатор
  }

  return <Bar data={chartData.data} options={chartData.options} height={400} />;
};

export default GeneralDiagram;
