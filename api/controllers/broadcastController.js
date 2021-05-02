const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities");

// This is an unfinished feature which will be implemented for further development.


// const getBroadcastByProgramId = async (req, res) => {
//     let programId = req.params.programId;
//     let broadcastByProgramId = await fetch(
//         `http://api.sr.se/api/v2/broadcasts?programid=${programId}&${json}`
//         );
//         broadcastByProgramId = await broadcastByProgramId.json();
//         res.json(broadcastByProgramId);
// };

module.exports = {
    // getBroadcastByProgramId
};