import { useContext, useEffect } from "react";
import { StationContext } from "../contexts/StationProvider"

import styles from "../css/HomePage.module.css";
import ChannelItem from "../components/ChannelItem";
import { FavoriteContext } from "../contexts/FavoritContext";

const HomePage = () => {
    const { channels, getAllChannels} = useContext(StationContext);
    const { favoriteChannels, getFavoriteChannels} = useContext(FavoriteContext);
   
    
    useEffect(() => {
        getAllChannels();
        getFavoriteChannels();
    }, []);

    let channelView;
    if(channels)
        channelView = channels.map(channel => {
            
            const isInFavorite = favoriteChannels.find(fc => fc.channelId === channel.id);

            return <ChannelItem channel={channel} isInFavorite={isInFavorite} /> 
        });
    else
        channelView = null;
    // console.log(channelView);
    return (
        <div className={styles.channelsList}>
            <h1>All channels are listed below</h1>
            { channelView }
        </div>
    );
};

export default HomePage;


