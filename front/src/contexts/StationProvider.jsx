import { createContext, useState } from "react";

export const StationContext = createContext();

export const StationProvider = (props) => {
  const [channels, setChannels] = useState([]);
  const [singleChannel, setSingleChannel] = useState(null);
  const [programsByCategoryId, setProgramsByCategoryId] = useState(null);
  const [programsByChannelId, setProgramsByChannelId] = useState(null);
  const [channelSchedule, setChannelSchedule] = useState(null);
  const [categories, setCategories] = useState(null);
  const [programById, setProgramById] = useState(null);
  const [programs, setPrograms] = useState([]);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    // console.log(channels);
    setChannels(channels);
  };

  const getChannelSchedule = async (channelId, date = null) => {
    let channelSchedule = await fetch(
      `/api/v1/channels/schedule/${channelId}?date=${date}`
    );
    channelSchedule = await channelSchedule.json();
    // console.log("channelSchedule: ", channelSchedule);

    setChannelSchedule(channelSchedule);
  };

  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel);
  };

  const getProgramsByChannelId = async (channelId) => {
    let programs = await fetch(`/api/v1/programs/channel/${channelId}`);
    programs = await programs.json();
    setProgramsByChannelId(programs);
  };

  const getAllCategories = async () => {
    let categories = await fetch(`/api/v1/categories`);
    categories = await categories.json();
    setCategories(categories);
  };

  const getProgramsByCategoryId = async (categoryId) => {
    let programsByCategoryId = await fetch(
      `/api/v1/programs/category/${categoryId}`
    );
    programsByCategoryId = await programsByCategoryId.json();
    setProgramsByCategoryId(programsByCategoryId);
  };

  const getProgramById = async (programId) => {
    let programById = await fetch(`/api/v1/programs/${programId}`);
    programById = await programById.json();
    setProgramById(programById);
  };

  const getAllPrograms = async () => {
    let response = await fetch(`/api/v1/programs`);
    const programs = await response.json();

    if (response.status === 200) setPrograms(programs);
  };

  const values = {
    channels,
    getAllChannels,
    singleChannel,
    getChannelById,
    getProgramsByChannelId,
    getChannelSchedule,
    getAllCategories,
    getProgramsByCategoryId,
    getProgramById,
    categories,
    programsByCategoryId,
    programsByChannelId,
    programById,
    channelSchedule,
    programs,
    setPrograms,
    getAllPrograms,
  };

  return (
    <StationContext.Provider value={values}>
      {props.children}
    </StationContext.Provider>
  );
};
