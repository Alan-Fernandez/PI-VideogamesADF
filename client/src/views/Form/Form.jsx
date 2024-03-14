import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import validate from "./validate";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms } from "../../redux/actions";
import InputField from "../../components/InputField/InputField";
import SelectField from "../../components/SelectField/SelectField";
import Modal from "../../components/Modal/Modal";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const toggleModal = () =>{ 
    setShowModal(!showModal)
  }


const transformDate = (date) => {
  const parts = date.split("/");
  if (parts.length !== 3) {
    return date;
  }
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};



  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "released") {
      value = transformDate(value);
    }
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const handleGenresChange = (event) => {
    const selectedOptions = event.target.value;

    const uniqueOptions = new Set(selectedGenres);
    uniqueOptions.add(selectedOptions);
    setSelectedGenres(Array.from(uniqueOptions));
  };

  const handlePlatformsChange = (event) => {
    const selectedOptions = event.target.value;

    const uniqueOptions = new Set(selectedPlatforms);
    uniqueOptions.add(selectedOptions);
    setSelectedPlatforms(Array.from(uniqueOptions));
  };

const SubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (
      (Object.keys(errors).length === 0) &&
      (selectedPlatforms.length !== 0) &&
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

      await axios.post("http://localhost:3001/api/v1/videogames", newDog);

      setMessage("Game Created Successfully");

      setShowModal(true);
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
    }
  } catch (error) {
    setMessage("Failed to Create Game");
    setShowModal(true);
  }
};

  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
      <button className={style.backButton} onClick={handleBackClick}>
        Go Back
      </button>

  return (
    <div>

      <form 
        // className={style.form} 
        onSubmit={SubmitHandler}
      >
        
        <Modal
          toggleModal={toggleModal}
          showModal={showModal}
        >
          <h1>{message}</h1>
        </Modal>

        <h1 className={style.title}>Create Game</h1>

        <div>
          <div
            className={style.form} 
          >          
            <InputField 
              label="Name: " 
              type="text" 
              value={form.name} 
              onChange={changeHandler} 
              name="name" 
              errors={errors} 
            />

            <InputField 
              label="Background_image: " 
              type="text" 
              value={form.background_image} 
              onChange={changeHandler} 
              name="background_image" 
              errors={errors} 
            />
            <InputField 
              label="Released: " 
              type="date" 
              value={form.released} 
              onChange={changeHandler} 
              name="released" 
              errors={errors} 
            />
            <InputField 
              label="Rating: " 
              type="text" 
              value={form.rating} 
              onChange={changeHandler} 
              name="rating" 
              errors={errors} 
            />

            <InputField 
                label="Description: " 
                type="textarea" 
                value={form.description} 
                onChange={changeHandler} 
                name="description" 
                errors={errors} 
              />
          </div>
          <div
            className={style.selectContainer}
          >
            <SelectField 
              name="genres" 
              value={selectedGenres} 
              onChange={handleGenresChange} 
              options={genres} 
            />
            <SelectField 
              name="platforms" 
              value={selectedPlatforms} 
              onChange={handlePlatformsChange} 
              options={platforms} 
            />
          </div>

            <div>
          </div>
        </div>
        <button 
          className={style.submitButton} 
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;