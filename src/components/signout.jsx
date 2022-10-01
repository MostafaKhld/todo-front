import auth from "../services/authService";
function SignOut() {
  auth.logout();

  window.location = "/";
  return <></>;
}

export default SignOut;
