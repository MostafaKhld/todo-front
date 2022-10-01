import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import SignIn from "./components/login";
import Todo from "./components/todo";
import AppAppBar from "./components/AppAppBar";
import AppTheme from "./components/AppTheme";
import SignUp from "./components/signup";
import auth, { logout } from "./services/authService";
import { ToastContainer } from "react-toastify";
import SignOut from "./components/signout";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./components/Welcome";

function App() {
  const user = auth.getCurrentUser();
  return (
    <>
      <ToastContainer position="top-center" />
      <AppTheme title="Todo Task" description="A onepirate theme">
        <AppAppBar user={user} />
        <Switch>
          {/* <ProtectedRoute path="/movies/:id" component={MovieForm} /> */}
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* {!user && <Redirect to="/signin" />} */}
          <Route path="/confirm/:confirmationCode" component={Welcome} />
          <ProtectedRoute
            path="/"
            render={(props) => <Todo {...props} user={user} />}
          />
        </Switch>
      </AppTheme>
    </>
  );
}

export default App;
