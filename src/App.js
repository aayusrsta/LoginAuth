import "./App.css";
import SignIn from "./components/Form/form";
import AuthDetails from "./components/authDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/auth-details" element={<AuthDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
