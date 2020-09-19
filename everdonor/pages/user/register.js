import React, { useState } from 'react';
import useForm from "utils/useForm"
import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import API from "api-client/EverdonorAPI"
import DropzoneArea from "components/3rdParty/DropzoneArea";
import MenuItem from '@material-ui/core/MenuItem';
import dynamic from "next/dynamic";
import MapWithSearch from "components/3rdParty/MapWithSearch"

// const MapWithSearch = dynamic(
//     () => {
//         return import("components/3rdParty/MapWithSearch");
//     },
//     { ssr: false }
// );

const types = [
    { name: "Comida", value: "Food" },
    { name: "Ropa", value: "Clothes" },
    { name: "Ayuda economica", value: "Funding" },
]

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [form, addOrUpdateValue, addImageValue] = useForm();
    const [coordenate, setCoordenates] = useState()

    const sendForm = () => {
        event.preventDefault()
        API.createUser({ ...form, ...coordenate })
    }

    const manipulateCoordenates = ({ latitude, longitude }) => {
        setCoordenates({ latitude, longitude })
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Registrate!
                </Typography>
                <form className={classes.form} noValidate onSubmit={sendForm}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={addOrUpdateValue("name")}
                        id="name"
                        label="Nombre"
                        name="name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={addOrUpdateValue("email")}
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={addOrUpdateValue("password")}
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={addOrUpdateValue("phoneNumber")}
                        name="phoneNumber"
                        label="Telefono"
                        type="number"
                        id="phoneNumber"
                    />
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Tipo de donacion"
                        fullWidth
                        onChange={addOrUpdateValue("donationType")}
                        helperText="Por favor seleccione que tipo de donacion necesita"
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={addOrUpdateValue("address")}
                        id="address"
                        label="Direccion"
                        name="address"
                    />

                    <br />

                    <MapWithSearch setCoordenates={manipulateCoordenates} />
                    <br />

                    <DropzoneArea onUpload={addImageValue} reference={form} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Aceptar
                    </Button>
                </form>
            </div>
        </Container>
    );
}


