import { useState, useMemo } from "react";

export default function useUsers(value = {}) {

    const [form, setForm] = useState(value);


    const addOrUpdateValue = (name) => ({ target: { value } }) => {
        setForm({ ...form, [name]: value })
    }

    const addImageValue = (value) => {
        setForm({ ...form, image: value })
    }

    // const addCoordenatesValue = ({ latitude, longitude }) => {
    //     setForm({ ...form, latitude, longitude })

    // }

    return [form, addOrUpdateValue, addImageValue]
}