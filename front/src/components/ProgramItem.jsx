import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ProgramPage.module.css";

const ProgramItem = (props) => {
  const { addToProgramFavoriteList, deleteFromProgramFavoriteList } =
    useContext(FavoriteContext);

  const programFavAddHandler = (programId) => {
    addToProgramFavoriteList(programId);
  };

  const programFavRemoveHandler = (programId) => {
    deleteFromProgramFavoriteList(programId);
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
    <div className={styles.card} key={props.program.id}>
      <div className="title">
        <h2>{props.program.name}</h2>
        <div className={styles.buttonBox}>{favBtnContent}</div>
      </div>
    </div>
  );
};

export default ProgramItem;
