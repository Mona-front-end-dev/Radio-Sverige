import {createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    const register = async (user) => {
        console.log(JSON.stringify(user));
        debugger;
        let userToRegister = await fetch("/api/v1/users/register", {
            method: "post",
            headers: { "Content-Type": "application/json" }, 
            body:JSON.stringify(user)
        });

        userToRegister = await userToRegister.json();
        console.log(userToRegister);
    };


    const values = {register, user};

    return  <UserContext.Provider value={values}>
                {props.children}
            </UserContext.Provider>
};