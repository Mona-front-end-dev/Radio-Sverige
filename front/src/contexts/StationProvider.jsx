import {createContext, useState } from "react";

export const StationContext = createContext();

export const StationProvider = (props) => {
    const [channels, setChannels] = useState(null);
    const [singleChannel, setSingleChannel] = useState(null);
    const [programsByCategoryId, setProgramsByCategoryId] = useState(null);
    const [programsByChannelId, setProgramsByChannelId] = useState(null);
    const [channelSchedule, setChannelSchedule] = useState(null);
    const [categories, setCategories] = useState(null);
    const [ programById, setProgramById] = useState(null);

    const getAllChannels = async () => {
        let channels = await fetch("/api/v1/channels");
        channels = await channels.json();
        // console.log(channels);
        setChannels(channels);
    };

    const getChannelSchedule = async (channelId, date = null) => {
        let channelSchedule = await fetch(`/api/v1/channels/schedule/${channelId}?date=${date}`);
        channelSchedule = await channelSchedule.json();
        // console.log("channelSchedule: ", channelSchedule);

        setChannelSchedule(channelSchedule);
    };

    const getChannelById = async (channelId) => {
        let channel = await fetch(`/api/v1/channels/${channelId}`);
        channel = await channel.json();
        setSingleChannel(channel);
    };

    const getProgramsByChannelId = async(channelId) => {
        let programs = await fetch (`/api/v1/programs/channel/${channelId}`);
        programs = await programs.json();
        // console.log("Programs by channel Id: ",programs);
        setProgramsByChannelId(programs);  
    };

    const getAllCategories = async() => {
        let categories = await fetch(`/api/v1/categories`);
        categories = await categories.json();
        // console.log("Categories", categories);
        setCategories(categories);
    };

    const getProgramsByCategoryId = async(categoryId) => {
        let programsByCategoryId = await fetch(`/api/v1/programs/category/${categoryId}`);
        programsByCategoryId = await programsByCategoryId.json();
        // console.log("Programs by category Id: ", programsByCategoryId);
        setProgramsByCategoryId(programsByCategoryId);
    }; 

    const getProgramById = async(programId) => {
        let programById = await fetch(`/api/v1/programs/${programId}`);
        programById = await programById.json();
        // console.log("Program by id: ", programById);
        setProgramById(programById);
    };



    const values = { channels, getAllChannels, singleChannel, getChannelById, 
                    getProgramsByChannelId, getChannelSchedule, getAllCategories,
                    getProgramsByCategoryId, getProgramById, categories, programsByCategoryId, 
                    programsByChannelId, programById, channelSchedule };

    return  <StationContext.Provider value={values}>
                {props.children}
            </StationContext.Provider>
};

