import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import SignUp from "./containers/signup";
import SignIn from "./containers/signin";
import PrivateRoute from "./Components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getAllCategory, getInitialData } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/newPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      {/* <Router> */}
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;
