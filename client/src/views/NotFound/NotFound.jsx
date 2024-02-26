import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.css";
import notFoundImage from "../../assets/error-404.jpg";

const NotFound = () => {
  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }
  return (
    <div>
      <button className={style.backButton} onClick={handleBackClick}>
        Go Back
      </button>
      <img className={style.image} src={notFoundImage} alt=""></img>
    </div>
  );
};

export default NotFound;
