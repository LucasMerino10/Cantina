import CantinaChat from "../../components/CantinaChat/CantinaChat";
import CantinaLogo from "../../components/CantinaLogo/CantinaLogo";
import "./cantina.scss";

function Cantina() {
  return (
    <main className="cantina__container">
      <CantinaLogo />
      <CantinaChat />
    </main>
  );
}

export default Cantina;
