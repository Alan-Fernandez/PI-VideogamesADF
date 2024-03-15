import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.css";
import PageNotFound from "../../components/PageNotFound/PageNotFound";


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
      <PageNotFound />
    </div>
  );
};

export default NotFound;
