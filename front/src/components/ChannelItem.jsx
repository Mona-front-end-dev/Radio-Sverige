import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/HomePage.module.css";

const ChannelItem = (props) => {
  const history = useHistory();
  const { addToChannelFavoriteList, deleteFromChannelFavoriteList } =
    useContext(FavoriteContext);

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
    deleteFromChannelFavoriteList(channelId);
  };

  let user = localStorage.getItem("user");
  // console.log(user.favoriteChannel);

  let favoriteButtonContent;
  if (!user) favoriteButtonContent = null;
  else if (props.isInFavorite)
    favoriteButtonContent = (
      <button
        className={styles.button}
        onClick={() => channelFavoritRemoveHandler(props.channel.id)}
      >
        Remove the channel from my favarites
      </button>
    );
  else
    favoriteButtonContent = (
      <button
        className={styles.button}
        onClick={() => channelFavoritAddHandler(props.channel.id)}
      >
        Add the channel to my favarit
      </button>
    );

  return (
    <div className={styles.card} key={props.channel.id}>
      <div className="title">
        <h2 className={styles.channeltype}>
          {props.channel.channeltype}
          {" , "}
          {props.channel.name}
        </h2>
        <div className={styles.buttonBox}>
          <button
            className={styles.button}
            onClick={() => clickHandler(props.channel.id)}
          >
            Programs
          </button>
          <button
            className={styles.button}
            onClick={() => scheduleHandler(props.channel.id)}
          >
            Schedule
          </button>
          {favoriteButtonContent}
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
