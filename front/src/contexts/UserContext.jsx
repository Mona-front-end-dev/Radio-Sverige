import {createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    const register = async (user) => {

        let userFromServer = await fetch("/api/v1/register");
        userFromServer = await userFromServer.json();
        console.log(userFromServer);
        setUser(userFromServer);
    };


    const values = {register, user};

    return  <UserContext.Provider value={values}>
                {props.children}
            </UserContext.Provider>
};

// let data = {element: "barium"};

// fetch("/post/data/here", {
//     method: "POST", 
//     body: JSON.stringify(data)
//   }).then(res => {
//     console.log("Request complete! response:", res);
//   });