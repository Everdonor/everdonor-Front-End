import {
    TextField,
    Typography
} from "@material-ui/core";
import { useState } from 'react'
import API from "api-client/EverdonorAPI"
import { makeStyles } from "@material-ui/core/styles";
import useForm from "utils/useForm"
import Modal from 'components/Modal'


const useStyles = makeStyles((theme) => ({
    profileCard: {
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",

    }
}));

export default function UpdatePasswordModal({ open, onCloseModal, userId }) {
    const classes = useStyles();
    const [form, addOrUpdateValue] = useForm();
    const [error, setError] = useState()

    const modifyPassword = () => {
        API.modifyUserPassword({ ...form, userId }).then(onCloseModal).catch((err) => setError(err))
    }

    return (
        <Modal open={open} onAccept={modifyPassword} onClose={onCloseModal} title="Inserte Contraseña para confirmar">
            <TextField id="outlined-basic" label="Password viejo" type="password" onChange={addOrUpdateValue("oldPassword")} variant="outlined" className={classes.profileCard} />
            <TextField id="outlined-basic" label="Password nuevo" type="password" onChange={addOrUpdateValue("newPassword")} variant="outlined" className={classes.profileCard} />
            {error &&
                <Typography variant="h6" style={{ color: "red", margin: "auto" }} gutterBottom>
                    Contraseña incorrecta
                </Typography>
            }
        </Modal>
    );
}
