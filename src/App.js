import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import SignIn from "./components/login";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <ProtectedRoute path="/movies/:id" component={MovieForm} /> */}
        <Route path="/" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
