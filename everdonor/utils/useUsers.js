import { useEffect, useState } from "react";
import EverdonorAPI from "api-client/EverdonorAPI";


export default function useUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        EverdonorAPI.getUsers('/users')
            .then(resData => setUsers(resData))
    }, []);

    return users
}