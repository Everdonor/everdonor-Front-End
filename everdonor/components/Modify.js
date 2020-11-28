import { useEffect, useState } from 'react'
import {
    InputLabel,
    Link,
    Container,
    CssBaseline,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Select, Chip, FormControl, useMediaQuery, useTheme
} from "@material-ui/core";
import { useRouter } from "next/router";
import API from "api-client/EverdonorAPI"
import { makeStyles } from "@material-ui/core/styles";
import useForm from "utils/useForm"
import Modal from 'components/Modal'
import UpdatePasswordModal from 'components/UpdatePasswordModal'
import DropzoneArea from "components/3rdParty/DropzoneArea";
import MapWithSearch from "components/3rdParty/MapWithSearch"


const types = [
    { name: "Comida", value: "FOOD" },
    { name: "Ropa", value: "CLOTHES" },
    { name: "Ayuda economica", value: "FUNDING" },
    { name: "Primera necesidad", value: "PRIMARY" },
    { name: "Juguetes", value: "TOYS" },
]

const useStyles = makeStyles((theme) => ({
    formControl: {
        // padding: "5px",
        // display: "flex"
    },
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
    profileCardImage: {
        padding: theme.spacing(1),
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
    },
    profileInformationCard: {
        padding: theme.spacing(1.2),
        textAlign: "left",
        // color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2),
            width: '90%'
        },
        width: '40%'
    },
    select: {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        },
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
    dropzone: {
        // marginBottom: theme.spacing(2),
        transform: 'scale(0.6)',
        display: 'grid'
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));

export default function Modify({ user }) {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openPasswordChange, setOpenPasswordChange] = useState(false);
    const [form, addOrUpdateValue, addImageValue, addLinkTodoPago, addComaSeparated] = useForm(user);
    const [error, setError] = useState();
    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down('sm'));
    const downXs = useMediaQuery(theme.breakpoints.down('xs'));

    const [coordenate, setCoordenates] = useState({ latitude: form.latitude, longitude: form.longitude })

    const manipulateCoordenates = ({ latitude, longitude }) => {
        setCoordenates({ latitude, longitude })
    }

    const sanitizeUrl = ({ target: { value } }) => {
        var n = value.match(/<a href='(.*)'>/m);


        if (n.length > 1 && n[1].includes("https://forms.todopago.com.ar")) {
            addLinkTodoPago(n[1]);
        } else {
            setError({ message: "Link desconocido" })
        }
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
                <TextField id="outlined-basic" type="password" onChange={addOrUpdateValue("password")} variant="outlined" />
            </Modal>

            <UpdatePasswordModal open={openPasswordChange} onCloseModal={() => setOpenPasswordChange(false)} userId={user.id} />

            <div className={classes.paper}>
                {error &&
                    <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                        {error.message ? error.message : "Ocurrio un error, intenta de nuevo en unos minutos!"}
                    </Typography>
                }
                <Grid container spacing={3} direction={downSm ? "column" : "row"}>
                    <Grid item xs={downSm ? 12 : 4}>
                        <Paper className={classes.gridPaper} elevation={4}>
                            <Grid item container className={classes.profileCardImage} direction="column" justify="center" alignItems="center">
                                <DropzoneArea onUpload={addImageValue} className={classes.dropzone} />
                                <TextField id="outlined-basic" label="Nombre" defaultValue={form.name} onChange={addOrUpdateValue("name")} variant="outlined" />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setOpenPasswordChange(true)}
                                    className={classes.submit}
                                >
                                    Cambiar contraseña
                                    </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={downSm ? 12 : 8}>
                        <Paper className={classes.profileInformationCard} elevation={4}>
                            <Grid container direction="column" spacing={2}>
                                <Grid container item xs direction={downXs ? "column" : "row"} className={classes.profileInformationCard}>
                                    <TextField id="outlined-basic"
                                        defaultValue={form.email}
                                        onChange={addOrUpdateValue("email")}
                                        variant="outlined"
                                        label="Email"
                                        className={classes.textField}
                                    />
                                    <TextField id="outlined-basic" defaultValue={form.address}
                                        onChange={addOrUpdateValue("address")}
                                        variant="outlined"
                                        className={classes.textField}
                                        label="Dirección"
                                    />
                                </Grid>
                                <Grid container item xs direction={downXs ? "column" : "row"} className={classes.profileInformationCard}>
                                    <TextField id="outlined-basic"
                                        defaultValue={form.phoneNumber}
                                        onChange={addOrUpdateValue("phoneNumber")}
                                        variant="outlined"
                                        label="Número de telefono"
                                        className={classes.textField}
                                    />
                                    <TextField
                                        defaultValue={form.links.toString()}
                                        variant="outlined"
                                        margin="left"
                                        onChange={addComaSeparated("links")}
                                        id="Links utiles"
                                        label="Links utiles(Facebook, pagina web, etc)"
                                        name="Links utiles"
                                        helperText="Links separados por coma"
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid container item xs direction={downXs ? "column" : "row"} className={classes.profileInformationCard}>
                                    <TextField id="outlined-basic"
                                        variant="outlined"
                                        onChange={sanitizeUrl}
                                        label="Link de todo pago"
                                        className={classes.textField}
                                        helperText={<Link href="/todoPago" variant="body2">
                                            {"Que es esto?"}
                                        </Link>}
                                    />
                                    <FormControl className={classes.formControl}>
                                        {/* <InputLabel id="donation-label" shrink >Tipo de donacion</InputLabel> */}
                                        <Select
                                            id="donation"
                                            select
                                            multiple
                                            required
                                            className={classes.select}
                                            variant="outlined"
                                            value={form.donationTypes}
                                            onChange={addOrUpdateValue("donationTypes")}
                                            MenuProps={{ autoFocus: true }}
                                            renderValue={(selected) => (
                                                selected.map((option) => (
                                                    types.find(type => type.value === option).name
                                                )).join(", ")
                                            )}
                                        >
                                            {types.map((option) => (
                                                <MenuItem key={option.value} id={option.value} value={option.value}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <MapWithSearch setCoordenates={manipulateCoordenates} />
                                    <br />
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
