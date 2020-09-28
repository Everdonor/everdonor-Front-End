import React, { useState } from 'react';
import useForm from "utils/useForm"
import { Grid, Button, CssBaseline, TextField, Typography, makeStyles, Container } from '@material-ui/core';
import API from "api-client/EverdonorAPI"
import DropzoneArea from "components/3rdParty/DropzoneArea";
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from "next/router";
import MapWithSearch from "components/3rdParty/MapWithSearch"


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
    const [coordenate, setCoordenates] = useState();
    const router = useRouter()

    const sendForm = (event) => {
        event.preventDefault()
        API.createUser({ ...form, ...coordenate }).then(router.push("/map"))
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
                <form className={classes.form} onSubmit={sendForm}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="donation"
                                select
                                required
                                label="Tipo de donacion"
                                fullWidth
                                onChange={addOrUpdateValue("donationType")}
                                helperText="Por favor seleccione que tipo de donacion necesita"
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.value} id={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <br />
                        <Grid item xs={6}>
                            <MapWithSearch height="32vh" setCoordenates={manipulateCoordenates} />
                            <br />
                        </Grid>
                        <Grid item xs={6}>
                            <DropzoneArea onUpload={addImageValue} />
                            <Button
                                id="submit"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Aceptar
                    </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container >
    );
}


