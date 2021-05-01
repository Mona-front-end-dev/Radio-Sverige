import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StationContext } from "../contexts/StationProvider"

import styles from "../css/HomePage.module.css";

const HomePage = () => {
    const history = useHistory();
    const { channels, getAllChannels} = useContext(StationContext);
    
    useEffect(() => {
        getAllChannels();
    }, []);

    const clickHandler = (channelId) => {
        history.push(`/channel/${channelId}`);
    };

    const scheduleHandler = (channelId) => {
        history.push(`schedule/${channelId}`);
    };

    const renderChannels = () => {
        return channels.map((channel) => (
            <div className={styles.card} key={channel.id}>
                <div className="title">
                    <h2 className={styles.channeltype}>Channel type: {channel.channeltype}</h2>
                    <p>Channel Name: {channel.name}</p>
                    <div className={styles.buttonBox}>
                        <button className={styles.button} onClick={() => clickHandler(channel.id)}>Programs</button>
                        <button className={styles.button} onClick={() => scheduleHandler(channel.id)}>Schedule</button>
                    </div>
                </div>
            </div>
        ));
    };
    return (
        <div className={styles.channelsList}>
            <h1>All channels are listed below</h1>
            {channels && renderChannels()}
        </div>
    );
};

export default HomePage;


