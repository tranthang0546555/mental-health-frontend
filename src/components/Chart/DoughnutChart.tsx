import { Doughnut } from 'react-chartjs-2'

import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

export type DoughnutChart = {
  labels: string[]
  data: number[]
}

type Props = {
  title: string
  label: string
  data: DoughnutChart
}

export function DoughnutChart({ title, label, data }: Props) {
  const labels = data.labels

  const dataChart = {
    labels,
    datasets: [
      {
        label: label,
        data: data.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    // interaction: {
    //   intersect: false,
    //   mode: "index" as const,
    // },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: title || 'Tittle'
      },
      tooltip: {
        position: 'nearest' as const,
        backgroundColor: '#181b1f' as const,
        titleSpacing: 3,
        padding: 20,
        footerAlign: 'right' as const,
        mode: 'nearest' as const,
        boxWidth: 13,
        boxHeight: 3
      }
    }
    // spanGaps: true,
    // scales: {
    //   y: {
    //     type: "linear" as const,
    //     display: true,
    //     position: "left" as const,
    //   },
    // },
  }

  return <Doughnut options={options} data={dataChart} />
}
