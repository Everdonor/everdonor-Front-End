import { useState, useMemo } from "react";

export default function useUsers(value = {}) {

    const [form, setForm] = useState(value);


    const addOrUpdateValue = (name) => ({ target: { value } }) => {
        setForm({ ...form, [name]: value })
    }

    const addImageValue = (value) => {
        setForm({ ...form, image: value })
    }


    return [form, addOrUpdateValue, addImageValue]
}