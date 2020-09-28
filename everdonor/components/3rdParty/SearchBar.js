import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';

const Types = [
    { name: "Comida", value: "Food" },
    { name: "Ropa", value: "Clothes" },
    { name: "Ayuda economica", value: "Funding" },
]

const Ranges = [
    { value: 1 },
    { value: 3 },
    { value: 5 },
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 }
]

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
    paddingLeft: {
        marginLeft: 10
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function CustomizedInputBase({ onClick, onChangeType, onChangeRadius }) {
    const classes = useStyles();
    const [name, setName] = useState("")

    const sendName = (evt, name) => {
        evt.preventDefault()
        onClick(name)
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Buscar"
                onChange={(event) => setName(event.target.value)}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" onClick={(evt) => sendName(evt, name)} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Select
                native
                onChange={evt => onChangeType(evt.target.value)}
                className={classes.paddingLeft}
            >
                {Types.map(type =>
                    <option value={type.value}>{type.name}</option>
                )
                }
            </Select>
            <Select
                native
                onChange={evt => onChangeRadius(evt.target.value)}
                className={classes.paddingLeft}
            >
                {Ranges.map(type =>
                    <option value={type.value}>{type.value} Km</option>
                )
                }
            </Select>
        </Paper>
    );
}