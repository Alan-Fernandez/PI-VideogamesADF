import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions/index";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const searchByName = () => {
    const reLetters = /^[a-zA-Z]{2,50}$/;
    reLetters.test(name) === true
      ? dispatch(getVideogameByName(name))
      : alert("formato de busqueda incorrecto");
  };

  return (
    <div className={style.div}>
      <input
        className={style.searchbarInput}
        placeholder="Search by name"
        maxLength={50}
        value={name}
        onChange={handleChange}
      ></input>
      <button
        className={style.button}
        onClick={() => {
          searchByName(name);
          setName("");
        }}
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
