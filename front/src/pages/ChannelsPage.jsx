import { useContext, useEffect } from "react";
import { StationContext } from "../contexts/StationProvider"

import styles from "../css/ChannelsPage.module.css";
import ChannelItem from "../components/ChannelItem";
import { FavoriteContext } from "../contexts/FavoritContext";

const ChannelsPage = () => {
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

    return (
        <div className={styles.header}>
            <h1>Channel list</h1>
            { channelView }
        </div>
    );
};

export default ChannelsPage;


