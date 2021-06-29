import { useEffect, useContext, useState } from "react";
import { StationContext } from "../contexts/StationProvider";
import styles from "../css/SchedulePage.module.css";

const SchedulePage = (props) => {
  const { getChannelSchedule, channelSchedule } = useContext(StationContext);
  const { channelId } = props.match.params;
  const [activatedDay, setActivatedDay] = useState(0);

  useEffect(() => {
    getChannelSchedule(channelId);
  }, []);

  const updateList = (number) => {
    setActivatedDay(number);
    const today = new Date();
    today.setDate(today.getDate() + number);

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;

    if (mm < 10) mm = "0" + mm;

    const date = yyyy + "-" + mm + "-" + dd;

    getChannelSchedule(channelId, date);
  };

  const getDayName = (number) => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let targetDayNumber = new Date().getDay() + number;

    if (targetDayNumber > 6) targetDayNumber -= 7;

    return dayNames[targetDayNumber];
  };

  const getActiveClass = (number) => {
    if (number === activatedDay) return ` ${styles.active}`;
    else return "";
  };

  let content = <h2>Loading..</h2>;
  let list = "";
  if (channelSchedule) {
    list = (
      <ul className={styles.dayList}>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(-1)}`}
            onClick={() => {
              updateList(-1);
            }}
          >
            Yesterday
          </button>
        </li>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(0)}`}
            onClick={() => {
              updateList(0);
            }}
          >
            Today
          </button>
        </li>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(1)}`}
            onClick={() => {
              updateList(1);
            }}
          >
            {getDayName(1)}
          </button>
        </li>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(2)}`}
            onClick={() => {
              updateList(2);
            }}
          >
            {getDayName(2)}
          </button>
        </li>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(3)}`}
            onClick={() => {
              updateList(3);
            }}
          >
            {getDayName(3)}
          </button>
        </li>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(4)}`}
            onClick={() => {
              updateList(4);
            }}
          >
            {getDayName(4)}
          </button>
        </li>
        <li>
          <button
            className={`${styles.schBtn}${getActiveClass(5)}`}
            onClick={() => {
              updateList(5);
            }}
          >
            {getDayName(5)}
          </button>
        </li>
      </ul>
    );

    content = channelSchedule.map((ch) => (
      <div className={`col-2 ${styles.res}`}>
        <div className={styles.card} key={ch.starttimeutc}>
          <div className={styles.title}>
            <img
              src={
                ch.imageurltemplate ? ch.imageurltemplate : "../oldRadio.jpeg"
              }
              alt="Schedule image"
              width="100%"
              height="100%"
            />
            <h2 className={styles.channelType}> {ch.title}</h2>
            <p className={styles.channelType}> {ch.description}</p>
            <p className={styles.channelType}>
              Tid: {ch.starttimeutc} till {ch.endtimeutc}
            </p>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <section className={styles.schSection}>
      <div>{list}</div>
      <div className={`row ${styles.container}`}>{content}</div>
    </section>
  );
};

export default SchedulePage;
