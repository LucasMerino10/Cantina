import { useEffect, useState } from "react";
import cantinaBand from "../../assets/CantinaBand.mp3";
import "./cantinaMusic.scss";

function CantinaMusic() {
  const [sound, setSound] = useState(false);
  const [music] = useState(new Audio(cantinaBand));
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
