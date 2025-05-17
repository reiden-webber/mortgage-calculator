import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Green
          '#8B5CF6', // Purple
          '#F59E0B', // Amber
          '#EF4444', // Red
          '#6366F1', // Indigo
        ],
        hoverBackgroundColor: [
          '#2563EB',
          '#059669',
          '#7C3AED',
          '#D97706',
          '#DC2626',
          '#4F46E5',
        ],
        borderWidth: 2,
        borderColor: '#ffffff', // White border for segments
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
      },
    },
    cutout: '70%', // Creates the donut chart effect
  };

  return (
    <div className="w-full h-full">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;