import { useDispatch, useSelector } from "react-redux";
import {
  orderVideogames,
  getGenres,
  filterByOrigin,
  filterByGenres,
} from "../../redux/actions/index";
import { useEffect } from "react";
import style from "./FiltersBar.module.css";
const FiltersBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleFilterOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };
  const handleFilterGenres = (event) => {
    dispatch(filterByGenres(event.target.value));
  };
  const handleOrder = (event) => {
    dispatch(orderVideogames(event.target.value));
  };

  const genres = useSelector((state) => state.genres);
  return (
    <div className={style.div}>
      <select className={style.origin} onChange={handleFilterOrigin}>
        <option className={style.allVideogames} value="AllVideogames">
          All videogames
        </option>
        <option className={style.apiVideogames} value="ApiVideogames">
          API videogames
        </option>
        <option className={style.dbVideogames} value="DbVideogames">
          DB Videogames
        </option>
      </select>
      <select className={style.genres} onChange={handleFilterGenres}>
        <option className={style.genresOptions} value="">
          Genres
        </option>
        {genres.map((genre, index) => (
          <option className={style.options} key={index} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
      <select className={style.order} onChange={handleOrder}>
        <option className={style.orderA} value="OrderAs">
          Order Asc. A-Z
        </option>
        <option className={style.orderD} value="OrderD">
          Order Desc. Z-A
        </option>
        <option className={style.orderRatingA} value="OrderByRatingA">
          Order by Rating A
        </option>
        <option className={style.orderRatingD} value="OrderByRatingD">
          Order by Rating D
        </option>
      </select>
    </div>
  );
};

export default FiltersBar;
