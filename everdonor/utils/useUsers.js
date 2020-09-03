import { useEffect, useState } from "react";
import EverdonorAPI from "../components/Layout/EverdonorAPI";


export default function useUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        EverdonorAPI.getUsers('/users')
            .then(resData => setUsers(resData))
    }, []);

    return users
}