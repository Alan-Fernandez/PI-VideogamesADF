import { useNavigate } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();
  const access = () => {
    navigate("/home");
  };
  return (
    <div className={style.div}>
      <h1 className={style.title}>
        Epic Plays <span id="colorSpan"></span>
      </h1>
      {/* imagen de landing */}
      <button className={style.button} onClick={access}>
        Start
      </button>
    </div>
  );
};

export default Landing;
