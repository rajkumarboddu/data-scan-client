import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";

import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
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
