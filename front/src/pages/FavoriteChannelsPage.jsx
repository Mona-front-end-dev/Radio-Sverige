import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FavoriteContext } from "../contexts/FavoritContext"
import styles from "../css/ProgramPage.module.css";
import ChannelItem from "../components/ChannelItem";


const FavoriteChannelsPage = (props) => {
    
    const { addToChannelFavoriteList, favoriteChannel } = useContext(FavoriteContext);
    const { channelId } = props.match.params;

    useEffect((channelId) => {
        addToChannelFavoriteList(channelId);
    }, []);

//    const filterFavoritChannelsFromOther = () => { is it correct to use filter here?

//    }

    const renderFavoriteChannels = () => {
        return addToChannelFavoriteList().map((favoriteChannel) => 
            <div className={styles.card} key={favoriteChannel.id}>
                <div className={styles.title}>
                    <h2>Favorite channels</h2>
                    <p>{favoriteChannel.name}</p>


                </div>
            </div>
        );
    };
    return (
        <div>
            {addToChannelFavoriteList() && renderFavoriteChannels()}
        </div>
    )

    // if(channelId) {
    //     content =
    //         <div className={styles.card}>
    //             <div className={styles.title}>
    //                 <h2 className={styles.channelType}>My favorite channels: </h2>
    //                 <p className={styles.channelType}>Name : {channelId.name}</p>
    //             </div>
    //         </div>
    // };
    // return <div>{content}</div>
     
}

 
export default FavoriteChannelsPage;