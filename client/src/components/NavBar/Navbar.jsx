import { NavLink, useLocation  } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import FiltersBar from "../FiltersBar/FiltersBar";

const NavBar = () => {
  const location = useLocation();
  return (
    <div className={style.container}>
      <div>
        {location.pathname !== "/create" && (
            <>
            <div
              className={style.searchBar}
            >
              <SearchBar/>
            </div>
            <div
              className={style.filtersBar}
            >
              <FiltersBar />
            </div>
            </>
        )}
      </div>
      <div
        className={style.links}
      >
        <NavLink className={style.home} to="/home">
          HOME
        </NavLink>
        <NavLink className={style.form} to="/create">
          FORM
        </NavLink>
      </div>

    </div>
  );
};

export default NavBar;
