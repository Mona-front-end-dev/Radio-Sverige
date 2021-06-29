import { useEffect, useContext } from "react";

import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramPage.module.css";
import { FavoriteContext } from "../contexts/FavoritContext";
import ProgramItem from "../components/ProgramItem" ;

const ProgramsPage = (props) => {
  const { getProgramsByChannelId, programsByChannelId } =
    useContext(StationContext);
  const { getFavoritePrograms, favoritePrograms } = useContext(FavoriteContext);
  const { channelId } = props.match.params;

  useEffect(() => {
    getProgramsByChannelId(channelId);
    getFavoritePrograms();
  }, []);

  let content = <h2>Loading..</h2>;

const generateProgram = (program) => {
    const isInFavorite = favoritePrograms.find(fp => fp.programId === program.id);
    return <ProgramItem program={program} isInFavorite={isInFavorite} /> 

};



  if (programsByChannelId) {
    content = programsByChannelId.map((p) => (
      <div className={`"col-3" ${styles.res}`} key={p.id}>

          {generateProgram(p)}
      </div>
    ));
  }
  return <div className={`"row" ${styles.container}`}>{content}</div>;
};

export default ProgramsPage;
