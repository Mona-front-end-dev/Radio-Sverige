const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities");

//kunna lista alla program för en viss kanal.
const getProgramsByChannelId = async (req, res) => {

    const response = await fetch(
        `http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${paginationFalse}`
        ); 
    body = await response.json();
    res.json(body.programs);
};

//lista alla program i en viss kategori.
const getProgramsByCategoryId = async (req, res) => {
    const categoryId = req.params.categoryId;

    let response = await fetch(
        `http://api.sr.se/api/v2/programs/index/?programcategoryid=${categoryId}&${json}`
    );
    body = await response.json();
    res.json(body.programs);
};

//kunna se information om ett program.
const getProgramById = async (req, res) =>{
    let programId = req.params.programId;

    let response = await fetch(
        `http://api.sr.se/api/v2/programs/${programId}?${json}`);

    body = await response.json();
    res.json(body.program);
}

module.exports = {
    getProgramsByChannelId,
    getProgramsByCategoryId,
    getProgramById
}