import { useState, useMemo } from "react";

export default function useUsers(value = {}) {

    const [form, setForm] = useState(value);

    const addOrUpdateValue = (name) => ({ target: { value } }) => {
        setForm({ ...form, [name]: value })
    }

    const addComaSepareted = (name) => ({ target: { value } }) => {
        setForm({ ...form, [name]: value.split(',') })
    }

    const addLinkTodoPago = (value) => {
        setForm({ ...form, todoPagoLink: value })
    }

    const addImageValue = (value) => {
        setForm({ ...form, image: value })
    }

    return [form, addOrUpdateValue, addImageValue, addLinkTodoPago, addComaSepareted]
}