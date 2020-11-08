import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import { Button, Chip, FormControl, Grid, Input, InputLabel, MenuItem } from '@material-ui/core';

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
        width: 600,
        zIndex: 1000,
        [theme.breakpoints.down("sm")]: {
            marginLeft: '10%',
            width: '70%'
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: '30%'
        },
        [theme.breakpoints.up("lg")]: {
            marginLeft: '45%'
        },
    },
    input: {
        paddingTop: '15px',
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
        // maxWidth: 250
    },
    rangeFormControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SearchBar({ searchUsers, location }) {
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedRange, setSelectedRange] = useState("")
    const [requestParams, setRequestParams] = useState({})
  
    const classes = useStyles();
    
    const sendRequest = () => {
        searchUsers(requestParams);
    }

    const onChangeName = (event) => {
        setRequestParams({...requestParams, name: event.target.value});
    };

    const onChangeType = (event) => {
      const value = event.target.value;
      for (let i = 0, l = value.length; i < l; i += 1) {
        if (value[i].selected) {
          value.push(value[i].value);
        }
      }
      setSelectedTypes(value);
      setRequestParams({...requestParams, types: value})
      //SET EN OTRA FUNCION? para el search tardio
    //   search(event)
    };
  
    const onChangeRadius = (event) => {
      const value = event.target.value;
      setSelectedRange(value);
      setRequestParams({...requestParams, ...location, distance: value });
    //   search(event);
    };

    const search = (evt) => {
        evt.preventDefault()
        sendRequest()
    }

    return (
        <Paper>
            <InputBase
                id="Name"
                className={classes.input}
                placeholder="Buscar"
                onChange={(event) => onChangeName(event.target.value)}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton id="SearchIcon" type="submit" onClick={(evt) => search(evt, name)} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Tipos de donacion</InputLabel>
                <Select
                    labelId="donation-chip-label"
                    id="donation"
                    onChange={onChangeType}
                    multiple
                    value={selectedTypes}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((option) => (
                                <Chip key={Types.find(type => type.value === option).value} label={Types.find(type => type.value === option).name} className={classes.chip} />
                            ))}
                        </div>
                    )}>
                    {Types.map(type =>
                        <MenuItem key={type.value} value={type.value}>
                            {type.name}
                        </MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.rangeFormControl}>
                <InputLabel>Distancia</InputLabel>
                <Select
                    labelId="range-label"
                    id="range"
                    value={selectedRange}
                    onChange={evt => onChangeRadius(evt.target.value)}
                >
                    {Ranges.map(type =>
                        <MenuItem value={type.value}>{type.value} Km</MenuItem>
                    )
                    }
                </Select>
            </FormControl>
        </Paper>
    );
}