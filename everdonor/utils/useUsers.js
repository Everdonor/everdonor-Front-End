import { useEffect, useState } from "react";
import EverdonorAPI from "api-client/EverdonorAPI";


export default function useUsers() {

    const [users, setUsers] = useState([]);

    const searchByName = (name) => {
        EverdonorAPI.searchByName(name)
            .then(resData => setUsers(resData))
    }

    const searchByType = (name) => {
        EverdonorAPI.searchByType(name)
            .then(resData => setUsers(resData))
    }

    useEffect(() => {
        EverdonorAPI.getUsers()
            .then(resData => setUsers(resData))
    }, []);

    return [users, searchByName, searchByType]
}