import { useContext, useState } from "react";
import styles from "../css/RegisterPage.module.css";
import { UserContext } from "../contexts/UserContext";

const RegisterPage = () => {
  const { register } = useContext(UserContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    let userInfo = { firstName, lastName, email, password };
    await register(userInfo);
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className={styles.card} onSubmit={(e) => handleAccountSubmit(e)}>
      <div className={styles.title}>
        <label htmlFor="firstName">First name: </label>
        <input
          type="text"
          className="formControl"
          placeholder="Leanna"
          onChange={firstNameHandler}
        />
      </div>
      <div className={styles.title}>
        <label htmlFor="lastName">Last name: </label>
        <input
          type="text"
          className="formControl"
          placeholder="Gilpin"
          onChange={lastNameHandler}
        />
      </div>
      <div className={styles.title}>
        <label htmlFor="exampleInputEmail1">Email address: </label>
        <input
          type="email"
          className="formControl"
          placeholder="Leanna@example.com"
          onChange={emailHandler}
        />
      </div>
      <div className={styles.title}>
        <label htmlFor="Password">Password: </label>
        <input
          type="password"
          className="formControl"
          placeholder="Password"
          onChange={passwordHandler}
        />
      </div>
      <button type="submmit" className={styles.button}>
        Create account
      </button>
    </form>
  );
};

export default RegisterPage;
