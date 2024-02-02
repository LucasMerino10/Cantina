import { Link } from "react-router-dom";
import "./cantinaLogo.scss";

function CantinaLogo() {
  return (
    <header className="nav">
      <Link to="/" className="nav__link">
        <img
          src="/src/assets/CantinaLogo.png"
          alt="The Cantina Live Chat logo"
          className="nav__logo"
        />
      </Link>
    </header>
  );
}

export default CantinaLogo;
