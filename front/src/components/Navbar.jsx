import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import styles from "../css/Navbar.module.css";

const Navbar = (props) => {
const { logout } = useContext(UserContext);
const [links, setLinks] = useState([
    
    
    { name: "Channels", url: "/", showState: 0 },
    { name: "Categories", url: "/categories", showState: 0 },
    { name: "Favorites", url: "/favorites", showState: 2 },
    { name: "Register", url: "/register", showState: 1 },
    { name: "Login", url: "/login", showState: 1 },
    {
    name: "Logout",
    url: "/",
    showState: 2,
    callback: (e) => logoutHandler(e),
    },
    

]);

const logoutHandler = async (e) => {
    e.preventDefault();
    logout();
};

const renderLinks = () => {
    const user = localStorage.getItem("user");

    return links
    .filter(
        (link) =>
        !link.showState ||
        (!user && link.showState === 1) ||
        (user && link.showState === 2)
    )
    .map((link) => {
        if (link.callback)
        return (
            <Link
            className={styles.link}
            key={link.name}
            to={link.url}
            onClick={link.callback}
            >
            {link.name}
            </Link>
        );
        else
        return (
            <Link className={styles.link} key={link.name} to={link.url}>
            {link.name}
            </Link>
        );
    });
};

return <header className={styles.topHeader}>
    <Link className={`${styles.link} ${styles.brand}`} to={'/'}>
                RadioSWEDEN
                </Link>
    <nav className={styles.navbar}>
        {renderLinks() }
    </nav>
</header> 
}

export default Navbar;
