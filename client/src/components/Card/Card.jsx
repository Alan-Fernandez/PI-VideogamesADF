import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  const { id, name, rating, genres, background_image } = props;
  
  return (
    <div className={style.card}>
      <h1 className={style.name}>{name}</h1>
      <h1 className={style.rating}>Rating: {rating}</h1>
      <p className={style.genres}>
        Genres: {genres.map((genre) => genre.name).join(", ")}
      </p>
      <NavLink to={`/detail/${id}`}>
        <img className={style.image} src={background_image} alt=""></img>
      </NavLink>
    </div>
  );
};

export default Card;
