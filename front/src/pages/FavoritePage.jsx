import { useEffect, useContext } from "react";
import { StationContext } from "../contexts/StationProvider";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ProgramPage.module.css";
import ChannelItem from "../components/ChannelItem";
import ProgramItem from "../components/ProgramItem";

const FavoritePage = () => {
  const { channels, getAllChannels, programs, getAllPrograms } =
    useContext(StationContext);
  const {
    favoriteChannels,
    getFavoriteChannels,
    getFavoritePrograms,
    favoritePrograms,
  } = useContext(FavoriteContext);

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
    .map((p) => <ProgramItem program={p} isInFavorite={true} />);
  };

  return (
    <div>
      <h1>Your Channels</h1>
      <div>{renderFavoriteChannels()}</div>
      <h1>Your Programs</h1>
      <div>{renderFavoritePrograms()}</div>
    </div>
  );
};

export default FavoritePage;
