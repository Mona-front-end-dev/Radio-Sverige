import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ChannelsPage.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";


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
      <FontAwesomeIcon
        icon={faHeart}
        size="2x"
        className={styles.button}
        onClick={() => channelFavoritRemoveHandler(props.channel.id)}
      />
    );
  else
    favoriteButtonContent = (
      <FontAwesomeIcon
        icon={farHeart}
        size="2x"
        className={styles.button}
        onClick={() => channelFavoritAddHandler(props.channel.id)}
      />
    );

  return (
    <div className="col-3">
      <div className={styles.card} key={props.channel.id}>
        <div className="title">
          <img
            src={props.channel.image}
            alt="channel logo"
            width="100%"
            height="100%"
          />
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
              Schema
              </button>
              
            {favoriteButtonContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
