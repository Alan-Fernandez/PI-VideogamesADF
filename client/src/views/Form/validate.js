const spacesRegEx = /^(\S+\s{0,1})+$/;
const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;

const validate = (form) => {
  const { name, description, rating, released, background_image } = form;
  const errors = {};
  if (!spacesRegEx.test(name)) {
    errors.name2 = "There can be no more than 1 space between each word";
  }
  if (name.length === 0) {
    errors.name1 = "Required name";
  }
  if (!spacesRegEx.test(description)) {
    errors.description2 = "There can be no more than 1 space between each word";
  }
  if (description.length === 0) {
    errors.description1 = "Required description";
  }
  if (isNaN(parseFloat(rating))) {
    errors.rating2 = "Rating must be a number";
  }
  if (rating < 0 || rating > 5) {
    errors.rating1 = "Rating must be between 0 and 5";
  }
  if (!dateRegEx.test(released)) {
    errors.released2 = "Incorrect Date format. eg 2020-8-20";
  }
  if (released.length === 0) {
    errors.released1 = "Required released";
  }
  if (background_image.length === 0) {
    errors.background_image = "Required background_image";
  }

  return errors;
};
export default validate;
