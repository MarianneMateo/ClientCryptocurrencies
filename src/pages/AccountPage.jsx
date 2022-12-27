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

export const AccountPage = ({ stateUser, setStateUser }) => {
  const { isConnected, id_user, name, email } = stateUser;
  const [loading, setLoading] = useState(false);
  const [myAccount, setMyAccount] = useState();
  const [isAccount, setIsAccount] = useState();
  const [open, setOpen] = useState(false);
  /*   const [body, setBody] = useState({ id_user: 0, account: 0, amount: 0 }); */
  const [myId_user, setId_user] = useState(id_user);
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /*   const handleChange = ({ target }) => {
    const { namep, value } = target;
    setBody({ ...body, [namep]: value });
  }; */

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
    getAccount();
  }, []);

  const getAccount = async () => {
    const response = await axios.get(
      `http://localhost:4000/user_accounts/${id_user}`
    );
    setMyAccount(response.data);
  };

  console.log(myAccount);

  const deleteAccount = async (id_account) => {
    try {
      await axios.delete(`http://localhost:4000/accounts/${id_account}`);
      getAccount();
      setAccount();
      setAmount();
    } catch (error) {
      console.log(error);
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/accounts", {
      id_user,
      account,
      amount,
    });
    if (response.data.status) {
      setMyAccount([
        {
          id_user: response.data.id_user,
          account: response.data.account,
          amount: response.data.amount,
        },
      ]);
      getAccount();
      handleClose();
    } else {
      swal("Something went wrong");
    }
  };

  console.log("respuesta", myAccount);

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ margin: 50 }}>
        Welcome {name} to Accounts {id_user}
      </Typography>
      {/* Table accounts or create button */}
      {myAccount?.hasAccount == false ? (
        <>
          <Typography>
            You do not have any account associated with Crypto Wallet
          </Typography>
          <Button onClick={handleOpen}>Add Account</Button>
        </>
      ) : (
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#FAFAFA" }}>
                <TableRow>
                  {["Name", "Account", "Amount", "Options"].map((head) => (
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
                {myAccount?.map((a, index) => (
                  <TableRow key={index}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{a.account}</TableCell>
                    <TableCell>{a.amount}</TableCell>
                    <TableCell>
                      <Button /* onClick={() => deleteAccount(a.id_account)} */>
                        Edit
                      </Button>
                      <Button onClick={() => deleteAccount(a.id_account)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
      {/* Modal create */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={TypographyStyles}>associate account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your account number and available balance
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Owner"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            disabled
          />
          <TextField
            margin="dense"
            id="name"
            label="User_Id"
            type="number"
            fullWidth
            variant="standard"
            value={myId_user}
            disabled
          />
          <TextField
            margin="dense"
            id="accountNumber"
            label="Account Number"
            type="number"
            fullWidth
            variant="standard"
            value={account}
            onChange={({ target }) => setAccount(target.value)}
          />
          <TextField
            margin="dense"
            id="balance"
            label="Balance $"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createAccount}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
