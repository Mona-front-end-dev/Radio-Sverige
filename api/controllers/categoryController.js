const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities");

const getAllCategories = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programcategories?${json}&${paginationFalse}`
  );
  categories = await categories.json();
  res.json(categories.programcategories);
};

module.exports = {
  getAllCategories,
};
