import { useEffect, useState } from "react";
import EverdonorAPI from "api-client/EverdonorAPI";


export default function useUsers() {

    const [users, setUsers] = useState([]);

    const searchUsers = (parameters) => {
        let request = {params: {...parameters}}
        EverdonorAPI.getUsers(request)
            .then(resData => setUsers(resData))
    }

    useEffect(() => {
        EverdonorAPI.getUsers()
            .then(resData => setUsers(resData))
    }, []);

    return [users, searchUsers]
}