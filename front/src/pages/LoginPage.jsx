import { useContext, useState } from "react";
import styles from "../css/LoginPage.module.css";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleAccountSubmit = async (e) => {
        e.preventDefault();
        let userInfo = { email, password };
        await login(userInfo); 
    };

    const emailHandler = (e) => {
        setEmail (e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword (e.target.value);
    };

    return ( 
        <form className={styles.card} onSubmit={(e) => handleAccountSubmit(e)} >
            <div className={`${styles.title} ${styles.margin}`}>
                <label htmlFor="exampleInputEmail1">Email address: </label>
                <input type="email" className="formControl" placeholder="Leanna@example.com" onChange={emailHandler}/>
            </div>
            <div className={styles.title}>
                <label htmlFor="Password" >Password: </label>
                <input type="password" className="formControl" placeholder="Password" onChange={passwordHandler}/>
            </div>
            <button type="submmit" className={styles.button} >Submit</button>
            
        </form>
    );
}

export default LoginPage;