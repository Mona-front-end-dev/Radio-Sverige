import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoritContext";
import styles from "../css/ProgramPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
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
      <FontAwesomeIcon
        icon={faHeart}
        size="2x"
        className={styles.button}
        onClick={() => programFavRemoveHandler(props.program.id)}
      />
    );
  else
    favBtnContent = (
      <FontAwesomeIcon
        icon={farHeart}
        size="2x"
        className={styles.button}
        onClick={() => programFavAddHandler(props.program.id)}
      />
    );
  return (
    <div>
      <div className={styles.card} key={props.program.id}>
        <div>
          <img
            src={props.program.programimagewide}
            alt="program image"
            width="100%"
            height="100%"
          />
          <h2>{props.program.name}</h2>
          <div className={styles.flex}>
            <button
              onClick={() => clickInfoHandler(props.program.id)}
              className={styles.infoClick}
            >
              More info
            </button>
            <div className={styles.buttonBox}>{favBtnContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramItem;
