import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Forms/Login";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Forms/Register";
import Navbar from "./components/NavBar/Navbar";
import AddTransaction from "./components/Forms/AddTransaction";
import AccountDashboard from "./components/Dashboard/AccountDashboard";
import AccountDetails from "./components/Dashboard/AccountDetails";
import AddAccount from "./components/Forms/AddAccount";
import UpdateTransaction from "./components/Forms/UpdateTransaction";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-transaction/:id" element={<AddTransaction />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        />

        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/edit-transaction/:id" element={<UpdateTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
