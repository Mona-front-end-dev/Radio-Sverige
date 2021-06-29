import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/CategoryPage.module.css";

const CategoryPage = () => {
  const history = useHistory();
  const { getAllCategories, categories } = useContext(StationContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  const clickHandler = (categoryId) => {
    history.push(`/programs/category/${categoryId}`);
  };

  let content = <h2>Loading..</h2>;
  if (categories) {
    content = categories.map((c) => (
      <div className={`col-3 ${styles.res}`}>
        <div className={`${styles.card} ${styles.title}`} key={c.id}>
          <h2>{c.name}</h2>
          <button className={styles.button} onClick={() => clickHandler(c.id)}>
            Programs
          </button>
        </div>
      </div>
    ));
  }
  return <div className={`"row" ${styles.container}`}>{content}</div>;
};

export default CategoryPage;
