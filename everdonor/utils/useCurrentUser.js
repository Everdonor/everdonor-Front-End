import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function useUsers() {

    const [user, setUser] = useState();

    const deleteUser = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded)
        }
    }, [])

    return [user, deleteUser]
}