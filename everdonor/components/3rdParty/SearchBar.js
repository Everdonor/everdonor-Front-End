import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import { Button, Chip, FormControl, Grid, Input, InputLabel, MenuItem, useMediaQuery, useTheme } from '@material-ui/core';

const Types = [
    { name: "Comida", value: "Food" },
    { name: "Ropa", value: "Clothes" },
    { name: "Ayuda economica", value: "Funding" },
    { name: "Cosas de niños", value: "KIDS" },
    { name: "Juguetes", value: "TOYS" },
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
        flexGrow: 1,
        padding: theme.spacing(2),
        marginRight: theme.spacing(7),
        // [theme.breakpoints.between(0, 300)]: {
        //     display: 'none'
        // },
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: theme.spacing(8),
        position: 'relative',
        zIndex: 1000,
    },
    input: {
        paddingTop: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    scale: {
        transform: 'scale(0.9)'
    }
}));

export default function SearchBar({ searchUsers, location }) {
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedRange, setSelectedRange] = useState("")
    const [requestParams, setRequestParams] = useState({})
    const theme = useTheme();
    const upXs = useMediaQuery(theme.breakpoints.up('xs'));

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
        <div className={classes.root}>
            <Grid container spacing={3} direction={upXs ? "row" : "column"} alignItems="center" justify="flex-end">
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper} elevation={2}>
                        <Grid container spacing={2} direction="row">
                            <Grid item xs={9}>
                                <InputBase
                                    id="Name"
                                    className={classes.input}
                                    placeholder="Buscar por nombre"
                                    onChange={onChangeName}
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton id="SearchIcon" type="submit" onClick={(evt) => search(evt, name)} className={classes.iconButton} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper} elevation={2}>
                        <Grid container spacing={2} direction="row" justify="center" className={classes.scale}>
                            <Grid item sm={8}>
                                <FormControl className={classes.formControl} fullWidth> { /* TODO: check this class*/ }
                                    <InputLabel id="demo-mutiple-chip-label">Tipos de donacion</InputLabel>
                                    <Select
                                        disableUnderline
                                        labelId="donation-chip-label"
                                        id="donation"
                                        onChange={onChangeType}
                                        multiple
                                        value={selectedTypes}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((option) => (
                                                    <Chip size="small" key={Types.find(type => type.value === option).value} label={Types.find(type => type.value === option).name} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}>
                                        {Types.map(type =>
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.name}
                                            </MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>                                
                                <FormControl className={classes.formControl} fullWidth> { /* TODO: check this class */ }
                                    <InputLabel>Distancia</InputLabel>
                                    <Select
                                        disableUnderline
                                        labelId="range-label"
                                        id="range"
                                        value={selectedRange}
                                        onChange={onChangeRadius}
                                    >
                                        {Ranges.map(type =>
                                            <MenuItem value={type.value}>{type.value} Km</MenuItem>
                                        )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                    </Paper>
                </Grid>
                {/* <Grid item xs={12} sm={2}>
                    <Paper className={classes.paper}>

                    </Paper>
                </Grid> */}
            </Grid>
        </div>
    );
}