import { createContext, useState } from "react";
export const FavoriteContext = createContext();

export const FavoritProvider = (props) => {
    const [favoriteChannels, setFavoriteChannels] = useState([]);




    const addToChannelFavoriteList = async (channelId) => {
        const response = await fetch(`/api/v1/users/addFavoriteChannel/${channelId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        });

        if(response.status === 200)
            getFavoriteChannels();
    };

    const getFavoriteChannels = async () => {
        let response = await fetch(`/api/v1/users/getFavoriteChannels`);
        if(response.status !== 200)
            return;

        let favoriteChannels = await response.json();

        setFavoriteChannels(favoriteChannels);
    };

    const deleteFromChannelFavoriteList = async (channelId) => {
        await fetch(`/api/v1/users/deleteFavoriteChannel/${channelId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        });

        getFavoriteChannels();
        
    };
        


    const values = { addToChannelFavoriteList, favoriteChannels, getFavoriteChannels, deleteFromChannelFavoriteList};

    return <FavoriteContext.Provider value={values}>
        {props.children}
    </FavoriteContext.Provider>
};


