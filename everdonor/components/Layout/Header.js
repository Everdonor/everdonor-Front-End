import { useState } from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Slide, Grid } from '@material-ui/core';
import EntityCard from './Card'
import useUsers from 'utils/useUsers';

import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        overflow: 'scroll',
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    spaceIcons: {
        marginRight: theme.spacing(1),
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
    },
    appColor: {
        backgroundColor: "#f5f5e6"
    }
}));

export default function Header() {
    const classes = useStyles();
    const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

    const router = useRouter()

    const [users] = useUsers([]);
    const toggleSideMenu = () => { setIsOpenSideMenu(!isOpenSideMenu) }

    const sendTo = (url) => {
        router.push(`/${url}`)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appColor}>
                <Toolbar>
                    <Grid container className={classes.wrapper}>
                        <IconButton edge="start" onClick={toggleSideMenu} className={classes.menuButton} aria-label="menu">
                            <MenuIcon className={classes.spaceIcons} />
                        </IconButton>
                        <IconButton edge="start" onClick={() => sendTo("map")} className={classes.menuButton} aria-label="menu">
                            <MapIcon className={classes.spaceIcons} />
                            Mapa
                        </IconButton>
                        <IconButton edge="start" onClick={() => sendTo("register")} className={classes.menuButton} aria-label="menu">
                            <AddCircleIcon className={classes.spaceIcons} />
                            Mostrate!
                        </IconButton>
                        <IconButton edge="start" onClick={() => sendTo("")} className={classes.menuButton} aria-label="menu">
                            <HomeIcon className={classes.spaceIcons} />
                            Nosotros
                        </IconButton>
                        <img src={"/large_everdonor.png"} alt={"icono"} className={classes.Icon} />
                    </Grid>
                </Toolbar>
            </AppBar>
            <Slide direction="right" in={isOpenSideMenu} >
                <Grid container className={classes.putOver} spacing={3}>
                    <Grid item xl={2}>
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
