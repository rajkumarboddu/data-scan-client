import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.css";

import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import ForgotCredentials from "./components/pages/ForgotCredentials";
import { theme } from "./theme/index";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/forgot-password">
              <ForgotCredentials />
            </Route>
            <PrivateRoute path="/supplier" component={Dashboard} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

export default App;
