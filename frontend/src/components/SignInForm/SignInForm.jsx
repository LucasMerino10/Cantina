import "./signInForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../../context/ChatContext";
import Fieldset from "../FormFieldset/Fieldset";

function SignInForm() {
  const navigate = useNavigate();
  const { setLoggedUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };
    const userResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );

    if (userResponse.status === 200) {
      const loggedUser = await userResponse.json();
      setLoggedUser(loggedUser);
      navigate("/chat");
    }
  };

  return (
    <form className="form">
      <h3 className="form__title">Sign In</h3>
      <Fieldset
        type="text"
        label="Email"
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
      />
      <Fieldset
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
        handleSubmit={handleSubmit}
      />
      <button type="button" className="form__button" onClick={handleSubmit}>
        Enter the Cantina
      </button>
      <p className="form__info">You don't have an account ?</p>
      <Link to="/signUp" className="form__redirect">
        Create an account
      </Link>
    </form>
  );
}

export default SignInForm;
