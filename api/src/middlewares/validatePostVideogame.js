

const validatePostVideogame = (req, res, next) => {
  const {
    name,
    description,
    background_image,
    released,
    rating,
    genres,
    platforms,
  } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!description)
    return res.status(400).json({ error: "Missing description" });
  if (!background_image)
    return res.status(400).json({ error: "Missing background_image" });
  if (!released) return res.status(400).json({ error: "Missing released" });
  if (rating < 0 || rating > 5)
    return res.status(400).json({ error: "Rating must be between 0 and 5" });
  if (typeof rating !== "number")
    return res.status(400).json({ error: "Rating must be a number" });
  if (!rating) return res.status(400).json({ error: "Missing rating" });
  if (!genres) return res.status(400).json({ error: "Missing genres" });
  if (!platforms) return res.status(400).json({ error: "Missing platforms" });
  next();
};

module.exports = validatePostVideogame;
