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
}: {
  applied: string;
  inProgress: string;
  approved: string;
  rejected: string;
  closed: string;
  notProcessing: string;
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
        layout: { autoPadding: true, padding: 5 },
        cutout: "30%",

        plugins: {
          legend: { position: "top", align: "center" },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="lg:w-[85px] lg:h-[85px] md:w-[75px] md:h-[75px] sm:w-[60px] sm:h-[60px]"
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
