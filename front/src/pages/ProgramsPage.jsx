import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramPage.module.css";
import { FavoriteContext } from "../contexts/FavoritContext";
import ProgramItem from "../components/ProgramItem" ;

const ProgramsPage = (props) => {
  const history = useHistory();
  const { getProgramsByChannelId, programsByChannelId } =
    useContext(StationContext);
  const { getFavoritePrograms, favoritePrograms } = useContext(FavoriteContext);
  const { channelId } = props.match.params;

  useEffect(() => {
    getProgramsByChannelId(channelId);
    getFavoritePrograms();
  }, []);

  const clickInfoHandler = (programId) => {
    history.push(`/programs/${programId}`);
  };

  let content = <h2>Loading..</h2>;

const generateProgram = (program) => {
    const isInFavorite = favoritePrograms.find(fp => fp.programId === program.id);
    return <ProgramItem program={program} isInFavorite={isInFavorite} /> 

};



  if (programsByChannelId) {
    content = programsByChannelId.map((p) => (
      <div className={styles.card} key={p.id}>
        <div className={styles.title}>
          <h2>Program Name: {p.name} </h2>
        </div>
        <div className={styles.flex}>
          <button onClick={() => clickInfoHandler(p.id)}>Info</button>
          {generateProgram(p)}
        </div>
      </div>
    ));
  }
  return <div>{content}</div>;
};

export default ProgramsPage;
