import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const FavoriteContext = createContext();

export const FavoritProvider = (props) => {
    const history = useHistory();
    const [favoriteChannel, setFavoriteChannel] = useState(null);


    const addToChannelFavoriteList = async (channelId) => {
        let favoriteChannel = await fetch(`/api/v1/channels/saveFavoriteChannel`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(channelId),
        });
        favoriteChannel = await favoriteChannel.json();
        console.log(favoriteChannel);
    };

    const getFavoriteChannelList = async (channelId) => {
        let favoriteChannel = await fetch(`/api/v1/users/addFavoriteChannel/${channelId}`);
        favoriteChannel = await favoriteChannel.json();
        debugger;
        console.log(favoriteChannel);
        setFavoriteChannel(favoriteChannel);
    };


    const values = { addToChannelFavoriteList, favoriteChannel, getFavoriteChannelList };

    return <FavoriteContext.Provider value={values}>
        {props.children}
    </FavoriteContext.Provider>
};


