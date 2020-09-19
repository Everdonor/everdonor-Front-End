import { useState } from 'react'
import {
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import API from "api-client/EverdonorAPI"
import { makeStyles } from "@material-ui/core/styles";
import useForm from "utils/useForm"
import Modal from 'components/Modal'
import MapWithSearch from "components/3rdParty/MapWithSearch"


const types = [
    { name: "Comida", value: "Food" },
    { name: "Ropa", value: "Clothes" },
    { name: "Ayuda economica", value: "Funding" },
]


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

    },
    profileCardImage: {
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
        marginBottom: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    avatar: {
        alignItems: "center",
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Modify({ user }) {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [form, addOrUpdateValue, addImageValue] = useForm(user);

    const [coordenate, setCoordenates] = useState({ latitude: form.latitude, longitude: form.longitude })

    const manipulateCoordenates = ({ latitude, longitude }) => {
        setCoordenates({ latitude, longitude })
    }

    const sendTo = (url) => {
        router.push(`/${url}`);
    };

    const modifyUser = () => {
        API.modifyUser({ ...form, ...coordenate }).then(() => sendTo("map"))
    }

    return (
        <Container component="main">
            <CssBaseline />
            <Modal open={open} onAccept={modifyUser} onClose={() => setOpen(false)} title="Inserte Contraseña para confirmar">
                <TextField id="outlined-basic" type="password" onChange={addOrUpdateValue("password")} variant="outlined" className={classes.profileCard} />
            </Modal>
            <div className={classes.paper}>
                <Typography className={classes.title} component="h1" variant="h5">
                    Perfil
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.gridPaper}>
                            <Grid item container className={classes.profileCardImage}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={form.image}
                                    className={classes.largeAvatar}
                                />
                                <TextField id="outlined-basic" defaultValue={form.name} onChange={addOrUpdateValue("name")} variant="outlined" className={classes.profileCard} />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.profileInformationCard}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Email
                                    </Typography>
                                    <TextField id="outlined-basic" defaultValue={form.email} onChange={addOrUpdateValue("email")} variant="outlined" className={classes.profileCard} />
                                    <Typography gutterBottom variant="subtitle1">
                                        Número de telefono
                                    </Typography>
                                    <TextField id="outlined-basic" defaultValue={form.phoneNumber} onChange={addOrUpdateValue("phoneNumber")} variant="outlined" className={classes.profileCard} />
                                    {/* <Typography variant="body2" color="textSecondary">
                                        Horarios de contacto: ADD TO USER
                                    </Typography> */}
                                    <Typography gutterBottom variant="subtitle1">
                                        Dirección
                                    </Typography>
                                    <TextField id="outlined-basic" defaultValue={form.address} onChange={addOrUpdateValue("address")} variant="outlined" className={classes.profileCard} />
                                    <br />
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="Tipo de donacion"
                                        fullWidth
                                        onChange={addOrUpdateValue("donationType")}
                                        helperText="Por favor seleccione que tipo de donacion necesita"
                                    >
                                        {types.map((option) => (
                                            <MenuItem defaultValue={form.donationType} key={option.value} value={option.value}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <MapWithSearch setCoordenates={manipulateCoordenates} />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                        className={classes.submit}
                                    >
                                        Aceptar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
