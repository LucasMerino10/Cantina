import { useNavigate } from "react-router-dom";
import CantinaChat from "../../components/CantinaChat/CantinaChat";
import CantinaLogo from "../../components/CantinaLogo/CantinaLogo";
import CantinaMusic from "../../components/CantinaMusic/CantinaMusic";
import "./cantina.scss";
import { useGlobalContext } from "../../context/ChatContext";
import UserProfile from "../../components/UserProfile/UserProfile";

function Cantina() {
  const { setCurrentUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <main className="cantina__container">
      <CantinaLogo />
      <section className="cantina">
        <UserProfile />
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
