import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import classes from "./Graph.module.css";

const Graph = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Incomes", "Expenses"],
          datasets: [
            {
              label: "",
              data: [props.totalIncome, props.totalExpenses],
              backgroundColor: [
                "rgb(255, 185, 130, 0.6)",
                "rgb(250, 190, 120, 0.3)"
              ],
              borderColor: [
                "rgb(255, 128, 0)",
                "rgb(255, 202, 128)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }, [props.totalIncome, props.totalExpenses, chartRef]);


  return (
    <div className={classes.page}>
      <div className={classes.graph}>
        <h1>Incomes-Expenses</h1>
        <canvas ref={chartRef}
        />
      </div>
    </div>
  )
}


export default Graph; 
