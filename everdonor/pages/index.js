import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    alignText: {
        marginLeft: 200,
        marginRight: 200,
        backgroundColor: theme.palette.secondary.main
    },
    marginText: {
        margin: 50,
    },
    Icon: {
        textAlign: 'center',
    },
}));

export default function Home() {
    const classes = useStyles();

    const router = useRouter();

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <img src={"/large_everdonor.png"} alt={"icono"} className={classes.Icon} />
                </Grid>
                <Paper item boxShadow={1} xs={12} className={classes.alignText}>
                    <Typography className={classes.marginText} variant="h3" gutterBottom>
                        Everdonor es la applicacion facil para que encuentres a quien mas necesita lo que vos tenes para dar!<br /> <br />
                        Ingresa <a href="/map" onClick={() => router.push("/map")}>aqui!</a>, para poder empezar a ver quien puede recibir tu donacion!
                    </Typography>
                </Paper>
                <hr />
                <Paper item xs={12} className={classes.alignText}>
                    <Typography className={classes.marginText} variant="h2" gutterBottom>
                        Como Funciona?
                    </Typography>
                    <Typography className={classes.marginText} variant="h4" gutterBottom>
                        La funcion principal de esta herramienta es poder hacer visibles las necesidades de otros y que se puedan mostrar cerca tuyo!<br /><br />
                        Solamente clickea en el marcador que te llame la atencion y podras ver todos los datos de contacto, donaciones que necesitan y horarios de atencion!
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}