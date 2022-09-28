import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import SignIn from "./components/login";
import Todo from "./components/todo";
import AppAppBar from "./components/AppAppBar";
import AppTheme from "./components/AppTheme";

function App() {
  return (
    <AppTheme title="Todo Task" description="A onepirate theme">
      <AppAppBar />
      <Switch>
        {/* <ProtectedRoute path="/movies/:id" component={MovieForm} /> */}
        {/* <Route path="/" component={SignIn} /> */}

        <Route path="/" component={Todo} />
      </Switch>
    </AppTheme>
  );
}

export default App;
