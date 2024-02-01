import { useNavigate } from "react-router-dom";
import CantinaChat from "../../components/CantinaChat/CantinaChat";
import CantinaLogo from "../../components/CantinaLogo/CantinaLogo";
import CantinaMusic from "../../components/CantinaMusic/CantinaMusic";
import "./cantina.scss";

function Cantina() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <main className="cantina__container">
      <CantinaLogo />
      <section className="cantina">
        <CantinaChat />
      </section>
      <CantinaMusic />
      <button
        type="button"
        aria-label="Sign out"
        className="signOut"
        onClick={handleClick}
      />
    </main>
  );
}

export default Cantina;
