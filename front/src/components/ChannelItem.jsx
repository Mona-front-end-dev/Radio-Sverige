import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/HomePage.module.css";


const ChannelItem = (props) => {
    const history = useHistory();
    const {addToChannelFavoriteList} = useContext(FavoriteContext);

    const clickHandler = (channelId) => {
        history.push(`/channel/${channelId}`);
    };

    const scheduleHandler = (channelId) => {
        history.push(`schedule/${channelId}`);
    };

    const channelFavoritAddHandler = (channelId) => {
        addToChannelFavoriteList(channelId);
    };

    const channelFavoritRemoveHandler = (channelId) => {
        // remove channel from ffavorites by implementing a method in context to call an api from backend to remove the channel from the favorite list of the current aiuthenticated user

    };

    let user = localStorage.getItem('user');

    let favoriteButtonContent;
    if(!user)
        favoriteButtonContent = null;
    else if(props.isInFavorite)
        favoriteButtonContent = <button className={styles.button} onClick={() => channelFavoritRemoveHandler(props.channel.id)}>Remove the channel to my favarits</button>
    else
    favoriteButtonContent = <button className={styles.button} onClick={() => channelFavoritAddHandler(props.channel.id)}>Add the channel to my favarits</button>
   
    return ( 
        <div className={styles.card} key={props.channel.id}>
        <div className="title">
            <h2 className={styles.channeltype}>Channel type: {props.channel.channeltype}</h2>
            <p>Channel Name: {props.channel.name}</p>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={() => clickHandler(props.channel.id)}>Programs</button>
                <button className={styles.button} onClick={() => scheduleHandler(props.channel.id)}>Schedule</button>
                { favoriteButtonContent }
            </div>
        </div>
    </div>
     );
}
 
export default ChannelItem;