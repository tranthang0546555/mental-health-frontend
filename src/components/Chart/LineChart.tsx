import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export type TypeLineChart = {
  labels: string[]
  data: number[]
}

type Props = {
  title: string
  label: string
  borderColor?: string
  backgroundColor?: string
  data: TypeLineChart
}
export function LineChart({
  title,
  label,
  borderColor = 'rgb(53, 162, 235)',
  backgroundColor = 'rgba(53, 162, 235, 0.5)',
  data
}: Props) {
  const labels = data.labels

  const dataChart = {
    labels,
    datasets: [
      {
        label: label,
        data: data.data,
        borderColor: borderColor,
        backgroundColor: backgroundColor
      }
    ]
  }

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const
    },
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
    },
    spanGaps: true,
    elements: {
      point: {
        radius: 2,
        backgroundColor: borderColor,
        borderColor: backgroundColor
      },
      line: {
        borderWidth: 2.5,
        tension: 0.4,
        borderColor: borderColor,
        backgroundColor: backgroundColor
      }
    }
    // scales: {
    //   y: {
    //     type: 'linear' as const,
    //     display: true,
    //     position: 'left' as const
    //   }
    // }
  }

  return <Line options={options} data={dataChart} />
}
