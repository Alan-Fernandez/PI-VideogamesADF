import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  return (
    <>
      <button className={style.backButton} onClick={handleBackClick}>
        Go Back
      </button>
      <CardsContainer />
    </>
  );
};

export default Home;
