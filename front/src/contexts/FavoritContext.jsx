import { createContext, useState } from "react";
export const FavoriteContext = createContext();

export const FavoritProvider = (props) => {
    const [favoriteChannels, setFavoriteChannels] = useState(null);




    const addToChannelFavoriteList = async (channelId) => {
        let favoriteChannel = await fetch(`/api/v1/users/addFavoriteChannel/${channelId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        });
        favoriteChannel = await favoriteChannel.json();
        console.log(favoriteChannel);
    };

    const getFavoriteChannels = async () => {
        let favoriteChannels = await fetch(`/api/v1/users/getFavoriteChannels`);
        favoriteChannels = await favoriteChannels.json();

        console.log(favoriteChannels);
        setFavoriteChannels(favoriteChannels);
    };

    const deleteFromChannelFavoriteList = async (channelId, userId) => {
        await fetch(`/api/v1/users/deleteFavoriteChannel/${channelId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        });
        getFavoriteChannels(userId);
        
    };
        


    const values = { addToChannelFavoriteList, favoriteChannels, getFavoriteChannels, deleteFromChannelFavoriteList};

    return <FavoriteContext.Provider value={values}>
        {props.children}
    </FavoriteContext.Provider>
};


