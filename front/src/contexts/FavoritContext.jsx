import { createContext, useState } from "react";
export const FavoriteContext = createContext();

export const FavoritProvider = (props) => {
    const [favoriteChannel, setFavoriteChannel] = useState(null);


    const addToChannelFavoriteList = async (channelId) => {
        let favoriteChannel = await fetch(`/api/v1/users/addFavoriteChannel/${channelId}`, {
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


