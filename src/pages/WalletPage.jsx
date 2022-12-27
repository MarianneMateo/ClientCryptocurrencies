import {
  Container,
  LinearProgress,
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
  Modal,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { CoinList } from "../config/api";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const WalletPage = ({ stateUser, setStateUser }) => {
  const { isConnected, id_user, name, email } = stateUser;
  const [loading, setLoading] = useState(false);
  const [myCrypto, setMyCrypto] = useState();
  const [isAccount, setIsAccount] = useState();
  const [open, setOpen] = useState(false);
  const [myId_user, setId_user] = useState(id_user);
  const [myId_account, setMyId_account] = useState();
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const TypographyStyles = {
    flex: 1,
    color: "#4cd137",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "uppercase",
  };

  const ModalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    border: "2px solid #4cd137",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 4,
  };

  const FormStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  useEffect(() => {
    getCryptos();
  }, []);

  const getCryptos = async () => {
    const response = await axios.get(
      `http://localhost:4000/user_cryptos/${id_user}`
    );
    setMyCrypto(response.data);
  };

  console.log("response", myCrypto);

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ margin: 50 }}>
        Welcome {name} to your Wallet {id_user}
      </Typography>
      {/* Table accounts or create button */}
      {myCrypto?.hasCrypto == false ? (
        <>
          <Typography>
            You do not have any crypto on Crypto Wallet
          </Typography>
          <Button onClick={() => navigate(`/app/home/${id_user}`)}>Buy Cryptocurrencies</Button>
        </>
      ) : (
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#FAFAFA" }}>
                <TableRow>
                  {["Cryptocurrency", "Amount", "Options"].map((head) => (
                    <TableCell
                      style={{
                        color: "#777",
                        fontWeight: "700",
                      }}
                      key={head}
                      >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                  {myCrypto?.map((a, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <img
                        src={a.photo}
                        alt={a.name_crypto}
                        height="40"
                        style={{ alignSelf: "center" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItem: "center",
                        }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 20,
                            fontWeight: 600,
                            color: "darkgrey",
                          }}
                        >
                          {a.name_crypto}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{a.amount}</TableCell>
                    <TableCell>
                      <Button
                        /* onClick={() => deleteAccount(a.id_account)} */ style={
                          TypographyStyles
                        }
                      >
                        Sell
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
    </Container>
  );
};
