import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramPage.module.css";

const ProgramsByCategoryPage = (props) => {
  const history = useHistory();
  const { getProgramsByCategoryId, programsByCategoryId } =
    useContext(StationContext);
  const { categoryId } = props.match.params;

  const clickHandler = (programId) => {
    history.push(`/programs/${programId}`);
  };

  useEffect(() => {
    getProgramsByCategoryId(categoryId);
  }, []);

  let content = <h2>Loading..</h2>;
  if (programsByCategoryId) {
    content = programsByCategoryId.map((p) => (
        
      <div className="col-3">
        <div
          className={styles.card}
          key={p.id}
          onClick={() => clickHandler(p.id)}
        >
          <div>
            <img
              src={p.programimagewide}
              alt="program image"
              width="100%"
              height="100%"
            />
            <p>
              {" "}
              <b>{p.name}</b>
            </p>
            <p> {p.description} </p>
            <p> {p.broadcastinfo} </p>
          </div>
        </div>
      </div>
    ));
  }
  return <div className="row">{content}</div>;
};

export default ProgramsByCategoryPage;
