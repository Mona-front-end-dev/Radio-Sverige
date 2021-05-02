import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramPage.module.css";
 
const ProgramsByCategoryPage = (props) => {
    const history = useHistory();
    const { getProgramsByCategoryId, programsByCategoryId } = useContext(StationContext);
    const { categoryId } = props.match.params;

    const clickHandler = (programId) => {
        history.push(`/programs/${programId}`);
    };

    useEffect(() => {
        getProgramsByCategoryId(categoryId);
    }, []);
    
    let content = <h2>Loading..</h2>
    if(programsByCategoryId) {
        content =  programsByCategoryId.map((p) => (
            <div className={styles.card} key={p.id} onClick={() => clickHandler(p.id)}>
                <div className={styles.title}>
                    <h2 className={styles.channelType}>A progrom chosen by category Id</h2>
                    <p>Program Name: {p.name} </p>
                </div>
            </div>
        ));
    };
    return <div>{content}</div>;
}

export default ProgramsByCategoryPage;