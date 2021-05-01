import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../css/Navbar.module.css";

const Navbar = () => {
    const [links, setLinks] = useState([{ name: "Home", url: "/"}, 
    { name: "Categories", url: "/categories"}, { name: "Register", url: "/register"}, { name: "Login", url: "/login"}, { name: "Logout", url: "/logout"}]);

    const renderLinks = () => {
        return links.map((link) => (
            <Link className={styles.link} key={link.name} to={link.url}>
                {link.name}
            </Link>
        ));
    };

    return <nav className={styles.navbar}>{renderLinks()}</nav>
};

export default Navbar;