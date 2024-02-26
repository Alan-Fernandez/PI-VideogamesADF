import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getVideogameById, clean_detail } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(-1);
  }
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clean_detail());
    dispatch(getVideogameById(id));
  }, [dispatch, id]);
  const videogame = useSelector((state) => state.videogame);

  return (
    <div>
      <button className={style.backButton} onClick={handleBackClick}>
        Go Back
      </button>
      <div className={style.elementsDiv}>
        <h1 className={style.detail}>Videogame Detail</h1>
        <h2 className={style.id}>ID: {videogame.id}</h2>
        <h2 className={style.name}>Name: {videogame.name}</h2>
        <h2 className={style.description}>
          Description: {videogame.description}
        </h2>
        <h2 className={style.released}>Released: {videogame.released}</h2>
        <h2 className={style.rating}>Rating: {videogame.rating}</h2>
        {videogame.genres && (
          <h2 className={style.genres}>
            Genres:{" "}
            {videogame.genres.map((genre, index) => (
              <span key={genre.id}>
                {genre.name}
                {index !== videogame.genres.length - 1 ? ", " : ""}
              </span>
            ))}
          </h2>
        )}
        {videogame.platforms && (
          <h2 className={style.platforms}>
            Platforms:{" "}
            {videogame.platforms.map((platforms, index) => (
              <span key={platforms.id}>
                {platforms.name}
                {index !== videogame.platforms.length - 1 ? ", " : ""}
              </span>
            ))}
          </h2>
        )}
        <img
          className={style.image}
          src={videogame.background_image}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default Detail;
