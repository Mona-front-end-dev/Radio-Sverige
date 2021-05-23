import {createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    
    
    const register = async (user) => {
        let response = await fetch("/api/v1/users/register", {
            method: "post",
            headers: { "Content-Type": "application/json" }, 
            body:JSON.stringify(user)
        });

        const body = await response.json();

        if(body.lastID){
            alert('you have registered successfully.');
        
            // redirect to login page
            history.push(`login/`);
        }
        else
            alert(body.error);
    };

    const login = async (user) => {
        let userToLogin = await fetch("/api/v1/users/login", {
            method: "post",
            headers: { "Content-Type": "application/json" }, 
            body:JSON.stringify(user)
        });

        const body = await userToLogin.json();

        if(body.loggedInUser){
            localStorage.setItem('user', JSON.stringify(body.loggedInUser));
            setUser(body.loggedInUser);
            // redirect to home page
            history.push('');
        }
        else
            alert(body.error);
    };

    const logout = async () => {
        let userToDelete = await fetch("/api/v1/users/logout", {
            method: "post"
        });
        const body = await userToDelete.json();

        if(body.success) {
            localStorage.removeItem('user');
            setUser(null);
            history.push('');
        } else {
            alert(body.error);
        }
    };

    const values = {register, login, logout};

    return  <UserContext.Provider value={values}>
                {props.children}
            </UserContext.Provider>
};