import {
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Graph } from "../components/Graph";
import { SingleCoin } from "../config/api";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/CoinTable";

export const DetailsCrypto = () => {
  const { id_crypto } = useParams();
  const [coin, setCoin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleCoin();
  });
  const getSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id_crypto));
    setCoin(data);
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "#4cd137" }} />;

  return (
    <div style={{ display: "flex", padding: 55 }}>
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: '7%',
          paddingRight: 55,
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
            color: "#ccc",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div
          style={{
            padding: 25,
            paddingTop: 10,
            width: "100%",
            textAlign: "center",
          }}
        >
          <span>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              Current Price: ${" "}
              {numberWithCommas(coin?.market_data.current_price["usd"])}
            </Typography>
          </span>
        </div>
      </div>
      <div style={{ borderLeft: "2px solid #ccc" }}></div>
      <Graph coin={coin} />
    </div>
  );
};
