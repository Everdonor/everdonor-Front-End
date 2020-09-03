import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Slide, Grid } from '@material-ui/core';
import EntityCard from './Card'
import MenuIcon from '@material-ui/icons/Menu';
import useUsers from '../../utils/useUsers';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    Icon: {
        width: '10%',
        marginLeft: "auto"
    },
    putOver: {
        zIndex: 9999,
        position: "absolute"
    }
}));

export default function Header() {
    const classes = useStyles();
    const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

    const users = useUsers()
    const toggleSideMenu = () => { setIsOpenSideMenu(!isOpenSideMenu) }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container className={classes.wrapper}>
                        <IconButton edge="start" onClick={toggleSideMenu} className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <img src={"/large_everdonor.png"} alt={"icono"} className={classes.Icon} />
                    </Grid>
                </Toolbar>
            </AppBar>
            <Slide direction="right" in={isOpenSideMenu} mountOnEnter unmountOnExit>
                <Grid container className={classes.putOver} spacing={3}>
                    <Grid item xs={3}>
                        {users.map((user) => (
                            <EntityCard {...user} />
                        ))
                        }
                    </Grid>
                </Grid>
            </Slide>
        </div >
    );
}
