import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MapIcon from "@material-ui/icons/Map";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Header from './Header';
import useCurrentUser from 'utils/useCurrentUser'
import { useRouter } from 'next/router';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.default,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    content: {
      width: `calc(100vw - ${drawerWidth}px)`,
    }
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    content: {
      width: `calc(100vw - ${theme.spacing(7) + 1})`,
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - 64px)`,
  },
  Icon: {
    height: 58,
  },
  drawerBottom: {
    position: 'absolute',
    bottom: '12px',
  }
}));

export default function MiniDrawer({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentUser, deleteUser] = useCurrentUser()
  const router = useRouter();
  const drawerItems = [
    {
      text: 'Mapa',
      icon: <MapIcon />,
      onClick: () => sendTo("map"),
      enabled: true
    },
    {
      text: 'Mostrate!',
      icon: <AddCircleIcon />,
      onClick: () => sendTo("user/register"),
      enabled: !currentUser && true
    },
    {
      text: 'Nosotros',
      icon: <HomeIcon />,
      onClick: () => sendTo(""),
      enabled: true
    },
    {
      text: 'Iniciar sesión',
      icon: <AccountCircleIcon />,
      onClick: () => sendTo("login"),
      enabled: !currentUser && true
    },
  ];

  const sendTo = (url) => {
    router.push(`/${url}`);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header styleClasses={classes} open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerItems.map((item) => (
            item.enabled && 
              <ListItem 
                button 
                key={item.text} 
                onClick={item.onClick}
                // selected
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
          ))}
        </List>
        <List className={classes.drawerBottom}>
          {currentUser && 
          <ListItem button key="logout" onClick={deleteUser}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Salir de la cuenta" />
          </ListItem>}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}