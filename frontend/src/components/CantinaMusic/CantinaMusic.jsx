import { useEffect, useState } from "react";
import "./cantinaMusic.scss";
import { useGlobalContext } from "../../context/ChatContext";

function CantinaMusic() {
  const { music } = useGlobalContext();
  const [sound, setSound] = useState(false);
  music.loop = true;

  const toggleMusic = () => {
    if (sound) {
      music.pause();
      setSound(false);
    } else {
      music.play();
      setSound(true);
    }
  };

  useEffect(() => {
    return () => {
      music.pause();
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="toggle music on or off"
      className={
        sound ? `toggleMusic toggleMusic--on` : `toggleMusic toggleMusic--off`
      }
      onClick={toggleMusic}
    />
  );
}

export default CantinaMusic;
