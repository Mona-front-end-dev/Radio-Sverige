import { useEffect, useContext, useState } from "react";
import { StationContext } from "../contexts/StationProvider";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ProgramPage.module.css";
import ChannelItem from "../components/ChannelItem";
import ProgramItem from "../components/ProgramItem";
// import { UserContext } from "../contexts/UserContext";

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
      .map((p) => <div className="col-3"><ProgramItem program={p} isInFavorite={true} /></div>);
  };

  return (
    <>
  {/* <h1>Welcome {props.user}</h1> */}
        <h2>My Channels</h2>
        <div className="row">{renderFavoriteChannels()}</div>

        <h2>My Programs</h2>
        <div className="row">{renderFavoritePrograms()}</div>
    </>
  );
};

export default FavoritePage;
