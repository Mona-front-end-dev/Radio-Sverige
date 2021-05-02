import { useEffect, useContext } from "react";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramPage.module.css"

const ProgramPage = (props) => {
    const { getProgramById, programById } = useContext(StationContext);
    const { programId } = props.match.params;

    useEffect(() => {
        getProgramById(programId);
    }, []);

    let content = <h2>Loading..</h2>
    
    if(programById) {
        content =
            <div className={styles.card}>
                <div className={styles.title}>
                    <h2 className={styles.channelType}>Program's information: </h2>
                    <p className={styles.channelType}>Name : {programById.name}</p>
                    <p> Description: {programById.description} </p>
                </div>
            </div>
    };
    return <div>{content}</div>;
}

export default ProgramPage ;