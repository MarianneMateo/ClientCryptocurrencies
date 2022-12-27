import {
  Button,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Graph } from "./Graph";
import { SingleCoin } from "../config/api";

export const Sell = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [amount, setAmount] = useState(0);

  const number = {
    marginBottom: 20,
    width: "100%",
  };

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const handleAmount = () => {
    return (amount * coin?.market_data.current_price["usd"]).toFixed(2);
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "#4cd137" }} />;

  return (
    <div style={{ display: "flex", marginTop: "30px" }}>
      <div
        style={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "150px 25px 25px",
          padding: "30px",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="100"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <TextField
          label="Amount"
          variant="filled"
          type="number"
          style={number}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={coin?.image.large} alt={coin?.name} height="30" />
                {coin.symbol.toUpperCase()}
              </InputAdornment>
            ),
          }}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          label="Total"
          variant="filled"
          type="number"
          style={number}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MonetizationOnIcon />
                {"USD"}
              </InputAdornment>
            ),
          }}
          value={handleAmount()}
          disabled
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#4cd137",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Continue
        </Button>
      </div>
      <div style={{ borderLeft: "2px solid black" }}></div>
      <Graph coin={coin} />
    </div>
  );
};
