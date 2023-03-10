import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";
import { HistoricalChart } from "../config/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Graph = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(
      HistoricalChart(coin.id, days, "USD")
      /* `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}` */
    );
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 35,
      }}
    >
      {!historicData | (flag === false) ? (
        <CircularProgress
          style={{ color: "#4cd137" }}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in usd`,
                  borderColor: "#4cd137",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 15,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
