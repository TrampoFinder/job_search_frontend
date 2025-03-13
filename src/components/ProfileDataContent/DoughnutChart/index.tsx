import { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip);

export const DoughnutChart = ({
  applied,
  inProgress,
  approved,
  rejected,
  closed,
  notProcessing,
  size = 100,
}: {
  applied: string;
  inProgress: string;
  approved: string;
  rejected: string;
  closed: string;
  notProcessing: string;
  size?: number;
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Applied",
          "In Progress",
          "Approved",
          "Rejected",
          "Closed",
          "Not Processing",
        ],
        datasets: [
          {
            data: [
              Number(applied),
              Number(inProgress),
              Number(approved),
              Number(rejected),
              Number(closed),
              Number(notProcessing),
            ],
            backgroundColor: [
              "#8B5CF6",
              "#C4B5FD",
              "#DDD6FE",
              "#EDE9FE",
              "#F5F3FF",
              "#FAF5FF",
            ],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {autoPadding: true, padding: 5},
        cutout: "50%",

        plugins: {
          legend: { position: "top", align: "center" },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return ` ${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [applied, inProgress, approved, rejected, closed, notProcessing]);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
