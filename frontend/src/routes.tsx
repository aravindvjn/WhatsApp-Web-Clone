import { Route } from "react-router";
import { BrowserRouter, Routes as Router } from "react-router";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/auth" Component={AuthPage} />
        <Route path="/" Component={HomePage} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
