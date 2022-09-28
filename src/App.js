import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import SignIn from "./components/login";
import Todo from "./components/todo";

function App() {
  return (
    <div className="">
      <Switch>
        {/* <ProtectedRoute path="/movies/:id" component={MovieForm} /> */}
        {/* <Route path="/" component={SignIn} /> */}

        <Route path="/" component={Todo} />
      </Switch>
    </div>
  );
}

export default App;
