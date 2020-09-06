import { useEffect, useState } from "react";
import EverdonorAPI from "api-client/EverdonorAPI";


export default function useUsers() {

    const [users, setUsers] = useState([]);

    const searchByName = (name) => {
        EverdonorAPI.searchByName(name)
            .then(resData => { debugger; setUsers(resData) })
    }

    useEffect(() => {
        EverdonorAPI.getUsers()
            .then(resData => setUsers(resData))
    }, []);

    return [users, searchByName]
}