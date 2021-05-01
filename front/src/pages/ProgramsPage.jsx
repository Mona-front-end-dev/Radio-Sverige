import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { StationContext } from "../contexts/StationProvider";
import styles from "../css/ProgramsPage.module.css"

const ProgramsPage = (props) => {
    const history = useHistory();
    const { getProgramsByChannelId, programsByChannelId } = useContext(StationContext);

    const { channelId } = props.match.params;

    useEffect(() => {
        getProgramsByChannelId(channelId);
    }, []);

    const clickHandler = (programId) => {
        history.push(`/programs/${programId}`);
    };

    let content = <h2>Loading..</h2>
    
    if(programsByChannelId) {

        content =  programsByChannelId.map(p =>
            <div className={styles.card} key={p.id} onClick={() => clickHandler(p.id)}>
                <div className={styles.title}>
                    <h2>Program Name: {p.name} </h2>
                </div>
            </div>
        );
    };
    return <div>{content}</div>;
};

export default ProgramsPage;