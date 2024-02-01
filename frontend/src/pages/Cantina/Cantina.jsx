import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CantinaChat from "../../components/CantinaChat/CantinaChat";
import CantinaLogo from "../../components/CantinaLogo/CantinaLogo";
import CantinaMusic from "../../components/CantinaMusic/CantinaMusic";
import "./cantina.scss";

function Cantina() {
  const [socket] = useState(io(import.meta.env.VITE_BACKEND_URL));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <main className="cantina__container">
      <CantinaLogo />
      <section className="cantina">
        <CantinaChat socket={socket} />
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
