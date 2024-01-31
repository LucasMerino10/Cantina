import CantinaChat from "../../components/CantinaChat/CantinaChat";
import CantinaLogo from "../../components/CantinaLogo/CantinaLogo";
import CantinaMusic from "../../components/CantinaMusic/CantinaMusic";
import "./cantina.scss";

function Cantina() {
  return (
    <main className="cantina__container">
      <CantinaLogo />
      <CantinaChat />
      <CantinaMusic />
    </main>
  );
}

export default Cantina;
