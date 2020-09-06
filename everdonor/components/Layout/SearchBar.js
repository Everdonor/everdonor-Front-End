import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        zIndex: 1000,
        marginLeft: 750
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function CustomizedInputBase({ onClick }) {
    const classes = useStyles();
    const [name, setName] = useState("")

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Buscar"
                onBlur={(event) => setName(event.target.value)}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" onClick={() => onClick(name)} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}