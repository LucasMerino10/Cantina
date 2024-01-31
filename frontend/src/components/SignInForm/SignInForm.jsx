import "./signInForm.scss";
import { Link, useNavigate } from "react-router-dom";

import Fieldset from "../FormFieldset/Fieldset";

function SignInForm() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/chat");
  };
  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Sign In</h3>
      <Fieldset label="Username" placeholder="Enter your username" />
      <Fieldset label="Password" placeholder="Enter your password" />
      <button type="submit" className="form__button">
        Enter the Cantina
      </button>
      <p className="form__info">Already have an account ?</p>
      <Link to="/signUp" className="form__redirect">
        Create an account
      </Link>
    </form>
  );
}

export default SignInForm;
