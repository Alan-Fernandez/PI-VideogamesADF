import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import FiltersBar from "../FiltersBar/FiltersBar";

const NavBar = () => {
  return (
    <div className={style.container}>
      <NavLink className={style.home} to="/home">
        HOME
      </NavLink>
      <NavLink className={style.form} to="/create">
        FORM
      </NavLink>
      <FiltersBar />
      <SearchBar />
    </div>
  );
};

export default NavBar;
