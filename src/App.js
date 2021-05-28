import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.css";

import Login from "./components/pages/Login";
import ForgotCredentials from "./components/pages/ForgotCredentials";
import { theme } from "./theme/index";
import Suppliers from "./components/pages/supplier/Suppliers";
import axios from "./utils/axios";
import { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                const isAuthenticated = localStorage.getItem("accessToken");
                return isAuthenticated ? (
                  <Redirect to="/suppliers" />
                ) : (
                  <Login />
                );
              }}
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
  const [authState, setAuthState] = useState({ isAuthenticated: false, path: undefined });
  const history = useHistory();
  

  useEffect(() => {
    if(history.location.pathname !== authState.path) {
      axios
      .get("/api/erpdatascan/isSessionActive")
      .then(() => {
        setAuthState({
          isAuthenticated: true, 
          path: history.location.pathname
        });
      })
      .catch((err) => {
        console.log(err);
        if (localStorage.getItem("accessToken")) {
          localStorage.clear();
        }
        history.push("/");
      });
    }
  });

  return (
    authState.isAuthenticated && (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      />
    )
  );
}

export default App;
