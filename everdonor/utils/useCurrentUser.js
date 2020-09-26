import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function useUsers() {

    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token);
        setUser(decoded)
    }, [])

    return [user]
}