import "./App.css";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import SignIn from "./components/login";
import Todo from "./components/todo";
import AppAppBar from "./components/AppAppBar";
import AppTheme from "./components/AppTheme";
import SignUp from "./components/signup";
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import SignOut from "./components/signout";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./components/Welcome";
import ResetPassword from "./components/resetpassowd";
import PasswordConfirm from "./components/passwordConfirm";

function App() {
  const user = auth.getCurrentUser();
  return (
    <>
      <ToastContainer position="top-center" />
      <AppTheme title="Todo Task" description="Blue Developments Task">
        <AppAppBar user={user} />
        <Switch>
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />

          <Route
            path="/password-reset/:userId/:token"
            component={PasswordConfirm}
          />
          <Route path="/password-reset/" component={ResetPassword} />
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
