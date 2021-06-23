import { useEffect, useContext } from "react";
import { StationContext } from "../contexts/StationProvider";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ProgramPage.module.css";
import ChannelItem from "../components/ChannelItem";

const FavoritePage = (props) => {
  const { channels, getAllChannels } = useContext(StationContext);
  const { favoriteChannels, getFavoriteChannels } = useContext(FavoriteContext);

  useEffect(() => {
    getAllChannels();
    getFavoriteChannels();
  }, []);

  const renderFavoriteChannels = () => {
    return channels
      .filter(c => favoriteChannels.find(fc => fc.channelId === c.id))
      .map(c => <ChannelItem channel={c} isInFavorite={true} />);
  };
  return <div>{renderFavoriteChannels()}</div>;
};

export default FavoritePage;
