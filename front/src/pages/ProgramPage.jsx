import { useEffect, useContext } from "react";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramPage.module.css";

const ProgramPage = (props) => {
  const { getProgramById, programById } = useContext(StationContext);
  const { programId } = props.match.params;

  useEffect(() => {
    getProgramById(programId);
  }, []);

  let content = <h2>Loading..</h2>;

  if (programById) {
    content = (
      <div className={styles.card}>
        <div className={styles.title}>
          <img
            src={programById.socialimagetemplate}
            alt="program image"
            width="100%"
            height="100%"
          />
          <p className={styles.channelType}><b>{programById.name}</b></p>
          <p> {programById.description} </p>
          <p> {programById.broadcastinfo} </p>
          
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default ProgramPage;
