import { Route } from "react-router";
import { BrowserRouter, Routes as Router } from "react-router";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";
import { useCurrentUser } from "./hooks/useCurrentUser";

const Routes = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" Component={user ? HomePage : AuthPage} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
