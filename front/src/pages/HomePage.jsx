import { useContext, useEffect } from "react";
import { StationContext } from "../contexts/StationProvider"

import styles from "../css/HomePage.module.css";
import ChannelItem from "../components/ChannelItem";

const HomePage = () => {
    const { channels, getAllChannels} = useContext(StationContext);
   
    
    useEffect(() => {
        getAllChannels();
    }, []);

    let channelView;
    if(channels)
        channelView = channels.map(channel => <ChannelItem channel={channel} isInFavorite={true} /> );
    else
        channelView = null;

    return (
        <div className={styles.channelsList}>
            <h1>All channels are listed below</h1>
            { channelView }
        </div>
    );
};

export default HomePage;


