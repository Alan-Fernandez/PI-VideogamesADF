import axios from "axios";
import React, { useState, useEffect } from "react";
import validate from "./validate";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms } from "../../redux/actions";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    background_image: "",
    released: "",
    rating: "",
    genres: "",
    platforms: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    background_image: "",
    released: "",
    rating: "",
    genres: "",
    platforms: "",
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const handleGenresChange = (event) => {
    const selectedOptions = event.target.value;

    const uniqueOptions = new Set(selectedGenres);
    uniqueOptions.add(selectedOptions);
    console.log("Selected Genres:", selectedOptions);
    setSelectedGenres(Array.from(uniqueOptions));
  };

  const handlePlatformsChange = (event) => {
    const selectedOptions = event.target.value;

    const uniqueOptions = new Set(selectedPlatforms);
    uniqueOptions.add(selectedOptions);
    console.log("Selected PLatforms:", selectedOptions);
    setSelectedPlatforms(Array.from(uniqueOptions));
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    if (
      (Object.keys(errors).length === 0) &
      (selectedPlatforms.length !== 0) &
      (selectedGenres.length !== 0)
    ) {
      const newDog = {
        name: form.name,
        description: form.description,
        background_image: form.background_image,
        released: form.released,
        rating: parseFloat(form.rating),
        genres: selectedGenres,
        platforms: selectedPlatforms,
      };

      axios
        .post("http://localhost:3001/videogames", newDog)
        .then((res) => {
          alert("Game Created Successfully");
          setForm({
            name: "",
            description: "",
            background_image: "",
            released: "",
            rating: "",
            genres: "",
            platforms: "",
          });
          setSelectedGenres([]);
          setSelectedPlatforms([]);
        })
        .catch((error) => alert("Failed to Create Game"));
    }
  };
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  return (
    <form className={style.form} onSubmit={SubmitHandler}>
      <div className={style.divName}>
        <label className={style.labelName}>Name: </label>
        <input
          className={style.inputName}
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
        ></input>
        <span className={style.errorName}>
          {errors.name1 ? <p>{errors.name1}</p> : <p>{errors.name2}</p>}
        </span>
      </div>
      <div className={style.divDescription}>
        <label className={style.labelDescription}>Description: </label>
        <textarea
          className={style.inputDescription}
          value={form.description}
          onChange={changeHandler}
          name="description"
          rows="6"
        />
        <span className={style.errorDescription}>
          {errors.description1 ? (
            <p>{errors.description1}</p>
          ) : (
            <p>{errors.description2}</p>
          )}
        </span>
      </div>
      <div className={style.divImage}>
        <label className={style.labelImage}>Background_image: </label>
        <input
          className={style.inputImage}
          type="text"
          value={form.background_image}
          onChange={changeHandler}
          name="background_image"
        ></input>
        <span className={style.errorImage}>
          <p>{errors.background_image}</p>
        </span>
      </div>
      <div className={style.divReleased}>
        <label className={style.labelReleased}>Released: </label>
        <input
          className={style.inputReleased}
          type="text"
          value={form.released}
          onChange={changeHandler}
          name="released"
        ></input>
        <span className={style.errorReleased}>
          {errors.released1 ? (
            <p>{errors.released1}</p>
          ) : (
            <p>{errors.released2}</p>
          )}
        </span>
      </div>

      <div className={style.divRating}>
        <label className={style.labelRating}>Rating: </label>
        <input
          className={style.inputRating}
          type="text"
          value={form.rating}
          onChange={changeHandler}
          name="rating"
        ></input>
        <span className={style.errorRating}>
          {errors.rating1 ? <p>{errors.rating1}</p> : <p>{errors.rating2}</p>}
        </span>
      </div>
      <div>
        <select
          className={style.genres}
          multiple
          value={selectedGenres}
          onChange={handleGenresChange}
        >
          {genres &&
            genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <p className={style.selectedGenres}>
          SELECTED GENRES: {selectedGenres.join(", ")}
        </p>
      </div>

      <div>
        <select
          className={style.platforms}
          multiple
          value={selectedPlatforms}
          onChange={handlePlatformsChange}
        >
          {platforms &&
            platforms.map((platform, index) => (
              <option key={index} value={platform.name}>
                {platform.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <p className={style.selectedPlatforms}>
          SELECTED PLATFORMS: {selectedPlatforms.join(", ")}
        </p>
      </div>

      <button className={style.submitButton} type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default Form;
