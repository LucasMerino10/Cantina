import CantinaLogo from "../../components/CantinaLogo/CantinaLogo";
import SignInForm from "../../components/SignInForm/SignInForm";
import "./signIn.scss";

function SignIn() {
  return (
    <main className="signIn__container">
      <CantinaLogo />
      <SignInForm />
    </main>
  );
}

export default SignIn;
