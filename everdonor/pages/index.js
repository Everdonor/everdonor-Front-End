import React from 'react';
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
    return (
        <>
        <CssBaseline />
        <Grid container justify="center" alignItems="center" direction="column">
            <Grid item sm={4}>
                <img src={"/large_everdonor.png"} alt={"icono"} style={{marginTop: '2em'}}/>
            </Grid>
            <Grid item sm={8}>
                <Typography 
                variant="h5" 
                color="textSecondary"
                align="center"
                paragraph>
                    Everdonor es la applicacion facil para que encuentres a quien mas necesita lo que vos tenes para dar!<br /> <br />
                    {/* Ingresa <a href="/map" onClick={() => router.push("/map")}>aqui!</a>, para poder empezar a ver quien puede recibir tu donacion! */}
                </Typography>
            </Grid>
        </Grid>
        <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
                <Button variant="contained" color="primary" href="/map">Empezá a donar!</Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" href="#howItWorks" >¿Como Funciona?</Button>
            </Grid>
            </Grid>
        </div>
        <Container maxWidth="md">
            <Typography 
            id="howItWorks"
            variant="h4" 
            paragraph
            style={{marginTop: '6em'}}>
                ¿Como Funciona?
            </Typography>
            <Typography 
            variant="h5" 
            color="textSecondary"
            align="center"
            paragraph>
                La función principal de esta herramienta es poder hacer visibles las necesidades de otros y que se puedan mostrar cerca tuyo!<br /><br />
                Solamente clickea en el marcador que te llame la atencion y podras ver todos los datos de contacto, donaciones que necesitan y horarios de atencion!
            </Typography>
        </Container>
        </>
    );
}