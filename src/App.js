import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.css";

import Login from "./components/pages/Login";
import ForgotCredentials from "./components/pages/ForgotCredentials";
import { theme } from "./theme/index";
import Suppliers from "./components/pages/supplier/Suppliers";

const isAuthenticated = localStorage.getItem("accessToken");

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isAuthenticated ? <Redirect to="/suppliers" /> : <Login />
              }
            />
            <Route path="/forgot-password">
              <ForgotCredentials />
            </Route>
            <PrivateRoute path="/suppliers" component={Suppliers} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
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
