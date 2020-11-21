import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, CssBaseline, Container, Button, Box } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    marginText: {
        margin: 50,
    },
    heroButtons: {
        margin: theme.spacing(4),
        justifyContent: 'center'
    },
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <CssBaseline />
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item sm={4}>
                    <img src={"/large_everdonor.png"} alt={"icono"} style={{ marginTop: '2em' }} />
                </Grid>
                <Grid item sm={8}>
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                        paragraph>
                        ¿Queres Recibir donaciones por Todo Pago? ¡Es facil!<br /> <br />
                        {/* Ingresa <a href="/map" onClick={() => router.push("/map")}>aqui!</a>, para poder empezar a ver quien puede recibir tu donacion! */}
                    </Typography>
                </Grid>
            </Grid>
            <Container maxWidth="md">
                <Typography
                    id="howItWorks"
                    variant="h4"
                    paragraph
                    style={{ marginTop: '1em' }}>
                    ¿Como Funciona?
                </Typography>
                <Typography
                    variant="h5"
                    color="textSecondary"
                    align="center"
                    paragraph>
                    La función principal de esta herramienta es poder hacer visibles un boton de manera facil para que vos puedas empezar a recibir donaciones!<br />
                    Solamente copia el link que generaste por Todo Pago y pegalo cuando te registres o cuando modifiques tu perfil !
                </Typography>
                <Typography
                    id="steps"
                    variant="h4"
                    paragraph
                    style={{ marginTop: '1em' }}>
                    Pasos
                </Typography>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Typography
                        id="steps-1"
                        variant="h6"
                        paragraph
                        style={{ marginTop: '1em' }}>
                        Inicia sesión a tu cuenta de Todo Pago y clickean en Vender
                    </Typography>
                    <Grid item xs={6}>
                        <img src={"/paso_1.png"} alt={"icono"} style={{ width: "100%" }} />
                    </Grid>
                    <Typography
                        id="steps-1"
                        variant="h6"
                        paragraph
                        style={{ marginTop: '1em' }}>
                        Clickea Nueva Botón
                    </Typography>
                    <Grid item xs={6}>
                        <img src={"/paso_2.png"} alt={"icono"} style={{ width: "100%" }} />
                    </Grid>
                    <Typography
                        id="steps-1"
                        variant="h6"
                        paragraph
                        style={{ marginTop: '1em' }}>
                        Elegí la opción Para sitio web y completa los datos
                    </Typography>
                    <Grid item xs={6}>
                        <img src={"/paso_3.png"} alt={"icono"} style={{ width: "100%" }} />
                    </Grid>
                    <Typography
                        id="steps-1"
                        variant="h6"
                        paragraph
                        style={{ marginTop: '1em' }}>
                        Copiá todo
                    </Typography>
                    <Grid item xs={6}>
                        <img src={"/paso_4.png"} alt={"icono"} style={{ width: "100%" }} />
                    </Grid>
                    <Typography
                        id="steps-1"
                        variant="h6"
                        paragraph
                        style={{ marginTop: '1em' }}>
                        Pegala en Link de todo pago en la página de Modificar Perfil
                    </Typography>
                    <Grid item xs={6}>
                        <img src={"/paso_5.png"} alt={"icono"} style={{ width: "100%" }} />
                    </Grid>
                </Grid>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="primary" href="https://developers.todopago.com.ar/site/integra-el-boton-tu-sitio-web" target="_blank">¡Empezá a recibir donaciónes!</Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}