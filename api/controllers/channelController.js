// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities");

//kunna lista alla kanaler
const getAllChannels = async (req, res) => {
  let response = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  body = await response.json();
  res.json(body.channels);
};

//
const getChannelById = async (req, res) => {
  let response = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  body = await response.json();
  res.json(body.channel);
};
// se alla sändningar per kanal, per dag. Tablå/Radio Schedule.
const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();

  channelSchedule.schedule = channelSchedule.schedule.map((p) => {
    return {
      ...p,
      starttimeutc: utils.convertToDateObject(p.starttimeutc),
      endtimeutc: utils.convertToDateObject(p.endtimeutc),
    };
  });
  res.json(channelSchedule.schedule);
};

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
};
