import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

export default function Dropzone({ onUpload }) {

    const handleChange = async (files) => {
        if (files.length === 0) {
            return null
        } else {
            const base64 = await toBase64(files[0])
            onUpload(base64);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <DropzoneArea
            filesLimit={1}
            onChange={handleChange}
        />
    )

}