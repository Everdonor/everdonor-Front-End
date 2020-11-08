import {
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Paper,
    Typography,
    Tooltip,
    Button
} from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from "@material-ui/core/styles";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import MapWithSearch from "components/3rdParty/MapWithSearch"


const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(3),
    },
    gridPaper: {
        padding: theme.spacing(1),
        textAlign: "center",
        // color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileCard: {
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileInformationCard: {
        padding: theme.spacing(1.2),
        textAlign: "left",
        // color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        paddingBottom: "40px",
        marginBottom: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    largeAvatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
}));

const types = [
    { name: "Comida", value: "FOOD" },
    { name: "Ropa", value: "CLOTHES" },
    { name: "Ayuda economica", value: "FUNDING" },
]

export default function Profile({ user: { image, name, email, phoneNumber, address, donationTypes, latitude, longitude, todoPagoLink } }) {
    const classes = useStyles();

    const openBrowser = () => {
        var win = window.open(`https://wa.me/549${phoneNumber}?text=Hola%20me%20interesa%20donar!`, '_blank', "", false);
        win.focus();
    }
    const parseDonation = (donation) => {
        const element = types.find(({ value }) => value === donation)
        return element.name
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.gridPaper}>
                            <Grid item container className={classes.profileCard}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={image}
                                    className={classes.largeAvatar}
                                />
                                <Typography variant="h5" className={classes.profileCard}>
                                    {name}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.profileInformationCard}>
                            <Grid item xs container direction="row" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Email:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom style={{ cursor: 'pointer' }}>
                                        {email}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Número de telefono:
                                        <Tooltip TransitionComponent={Zoom} title="Comunicarse por Whatsapp" arrow >
                                            <a style={{ cursor: "pointer" }} onClick={openBrowser}>
                                                <WhatsAppIcon style={{ color: "green", marginLeft: "10px" }} />
                                            </a>
                                        </Tooltip>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {phoneNumber}
                                    </Typography>

                                    {todoPagoLink !== "" &&
                                        <a href={todoPagoLink}>
                                            <div class="col-md-4 col-sm-4 col-xs-12 tipo-boton-class boton_solo" id="htmlBoton">
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { }}
                                                    className={classes.submit}
                                                >
                                                    Dona!
                                                </Button>
                                            </div>
                                        </a>
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Dirección:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {address}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Tipos de donación que acepta:
                                    </Typography>
                                    {donationTypes && donationTypes.map((donation) => {
                                        return (
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                                {parseDonation(donation)}
                                            </Typography>
                                        )
                                    }
                                    )}


                                </Grid>
                                <Grid item xs={12}>
                                    <MapWithSearch label="Aca estas!" coordenates={{ latitude: latitude, longitude: longitude }} disableClick={true} height="50vh" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
