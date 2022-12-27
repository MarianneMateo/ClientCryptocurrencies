import {
  Container,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/api";

export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const TypographyStyles = {
    flex: 1,
    color: "#4cd137",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  };

  useEffect(() => {
    fetchCoins();
    handleSearch();
  }, ["USD"]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList("USD"));
    setCoins(data);
    setLoading(false);
  };

  const handleSearch = () => {
    return coins?.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <div
        style={{
          height: "100px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <TextField
          label="Search"
          color="info"
          style={{
            marginBottom: 20,
            width: "50%",
            height: "40px",
            display: "flex",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#FAFAFA" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap", "Options"].map(
                  (head) => (
                    <TableCell
                      style={{
                        color: "#777",
                        fontWeight: "700",
                      }}
                      key={head}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow key={row.name}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="40"
                          style={{ alignSelf: "center" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 20,
                              fontWeight: 600,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {"$"} {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        {"$"}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          style={TypographyStyles}
                          onClick={() =>
                            navigate(`/app/crypto_details/${row.id}`)
                          }
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        count={10}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};
