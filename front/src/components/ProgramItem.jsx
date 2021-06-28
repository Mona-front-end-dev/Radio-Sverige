import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ProgramPage.module.css";

import { useHistory } from "react-router-dom";

const ProgramItem = (props) => {
  const history = useHistory();
  const { addToProgramFavoriteList, deleteFromProgramFavoriteList } =
    useContext(FavoriteContext);

  const programFavAddHandler = (programId) => {
    addToProgramFavoriteList(programId);
  };

  const programFavRemoveHandler = (programId) => {
    deleteFromProgramFavoriteList(programId);
  };

  const clickInfoHandler = (programId) => {
    history.push(`/programs/${programId}`);
  };

  let user = localStorage.getItem("user");

  let favBtnContent;
  if (!user) favBtnContent = null;
  else if (props.isInFavorite)
    favBtnContent = (
      <button
        className={styles.button}
        onClick={() => programFavRemoveHandler(props.program.id)}
      >
        Remove the program from my favarites
      </button>
    );
  else
    favBtnContent = (
      <button
        className={styles.button}
        onClick={() => programFavAddHandler(props.program.id)}
      >
        Add the program to my favarites
      </button>
    );
  return (
    <div>
    <div className={styles.card} key={props.program.id}>
      <div  >
        <img
          src={props.program.programimagewide}
          alt="program image"
          width="100%"
          height="100%"
        />
        <h2>{props.program.name}</h2>
        <div className={styles.buttonBox}>{favBtnContent}</div>
        <span
          onClick={() => clickInfoHandler(props.program.id)}
          className={styles.infoClick}
        >
          More info
        </span>
      </div>
    </div>
    </div>
  );
};

export default ProgramItem;
