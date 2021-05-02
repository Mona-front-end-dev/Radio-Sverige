import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/CategoryPage.module.css"

const CategoryPage = () => {
    const history = useHistory();
    const { getAllCategories, categories } = useContext(StationContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    const clickHandler = (categoryId) => {
        history.push(`/programs/category/${categoryId}`);
    };

    let content = <h2>Loading..</h2>
    if(categories) {
        content =  categories.map((c) => (
            <div className={styles.card} key={c.id} >
                <div className={styles.title}>
                    <h2 className={styles.channelType}>Category specification</h2>
                    <p>Category Name: {c.name} </p>
                    <button className={styles.button} onClick={() => clickHandler(c.id)}>Programs</button>
                </div>
            </div>
        ));
    };
    return <div>{content}</div>;
};

export default CategoryPage;