import { useEffect, useContext, useState } from "react";
import { StationContext } from "../contexts/StationProvider";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/FavoritePage.module.css";
import ChannelItem from "../components/ChannelItem";
import ProgramItem from "../components/ProgramItem";

const FavoritePage = (props) => {
  const { channels, getAllChannels, programs, getAllPrograms } =
    useContext(StationContext);
  const {
    favoriteChannels,
    getFavoriteChannels,
    getFavoritePrograms,
    favoritePrograms,
  } = useContext(FavoriteContext);

  // const { user } = useContext(UserContext);

  useEffect(() => {
    getAllChannels();
    getAllPrograms();
    getFavoriteChannels();
    getFavoritePrograms();
  }, []);



  const renderFavoriteChannels = () => {
    return channels
      .filter((c) => favoriteChannels.find((fc) => fc.channelId === c.id))
      .map((c) => <ChannelItem channel={c} isInFavorite={true} />);
  };

  const renderFavoritePrograms = () => {
    return programs
      .filter((p) => favoritePrograms.find((fp) => fp.programId === p.id))
      .map((p) => <div className={`col-3 ${styles.res}`}><ProgramItem program={p} isInFavorite={true} /></div>);
  };

  return (
    <>
  {/* <h1>Welcome {props.user}</h1> */}
        <div className="row">
          <div className={`col-12 ${styles.margin}`}>
            <h2 className={styles.faveTitle}>My Channels</h2>
          </div>
        </div>
        <div className={`row ${styles.container}`}>{renderFavoriteChannels()}</div>

        <div className="row">
          <div className="col-12">
            <h2 className={styles.faveTitle}>My Programs</h2>
          </div>
        </div>
        <div className={`row ${styles.container}`}>{renderFavoritePrograms()}</div>
    </>
  );
};

export default FavoritePage;
