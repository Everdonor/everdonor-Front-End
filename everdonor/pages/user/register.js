import React, { useState } from 'react';
import useForm from "utils/useForm"
import { Grid, Button, CssBaseline, TextField, Typography, makeStyles, Container, Select, Chip, InputLabel, Link } from '@material-ui/core';
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
    const [form, addOrUpdateValue, addImageValue, addLinkTodoPago] = useForm({ donationTypes: [] });
    const [coordenate, setCoordenates] = useState();
    const router = useRouter()
    const [error, setError] = useState()

    const sendForm = (event) => {
        event.preventDefault()
        API.createUser({ ...form, ...coordenate })
            .then(() => router.push("/login"))
            .catch((err) => {
                setError(err)
            })
    }

    const manipulateCoordenates = ({ latitude, longitude }) => {
        setCoordenates({ latitude, longitude })
    }

    const sanitizeUrl = ({ target: { value } }) => {
        var n = value.match(/<a href='(.*)'>/m);

        if (n.lenght > 1 && n[1].includes("https://forms.todopago.com.ar")) {
            addLinkTodoPago(n[1]);
        } else {
            setError({ message: "Link desconocido" })
        }
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                {error &&
                    <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                        {error.message ? error.message : "Ocurrio un error, intenta de nuevo en unos minutos!"}
                    </Typography>
                }
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
                            <InputLabel id="donation-label">Tipo de donacion</InputLabel>
                            <Select
                                id="donation"
                                select
                                multiple
                                required
                                fullWidth
                                variant="outlined"
                                value={form.donationTypes}
                                onChange={addOrUpdateValue("donationTypes")}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((option) => (
                                            <Chip key={types.find(type => type.value === option).value} label={types.find(type => type.value === option).name} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                helperText="Por favor seleccione que tipo de donacion necesita"
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.value} id={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="left"
                                style={{ width: "49%" }}
                                onChange={sanitizeUrl}
                                id="Link Todo Pago"
                                label="Link de todo pago"
                                name="Link de todo pago"
                            />
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Link href="/todoPago" variant="body2">
                                    {"Que es esto?"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <MapWithSearch height="33vh" setCoordenates={manipulateCoordenates} />

                            </Grid>
                            <Grid item xs={6}>
                                <br />
                                <br />
                                <br />
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
                    </Grid>

                </form>
            </div>
        </Container >
    );
}


