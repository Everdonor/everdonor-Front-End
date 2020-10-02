import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: "flex",
        margin: "auto",
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
}));

export default function Modal({ onClose, onAccept, open, children, title }) {
    const classes = useStyles();


    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            {children}
            <div className={classes.root}>
                <Button variant="contained" onClick={onAccept} color="primary">
                    Aceptar
                </Button>
                <Button variant="contained" onClick={onClose} color="red">
                    Cancelar
                </Button>
            </div>
        </Dialog>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
