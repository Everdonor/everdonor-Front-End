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
                    <Grid item xs={6}>
                        <img src={"/resaltadoDeLink.PNG"} alt={"icono"} style={{ width: "100%" }} />
                    </Grid>

                    <Grid item xs={6}>
                        <img src={"/linkModificacion.PNG"} alt={"icono"} style={{ width: "100%" }} />
                        <img src={"/linkRegistro.PNG"} alt={"icono"} style={{ width: "100%" }} />
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