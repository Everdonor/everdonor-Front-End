import { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Drawer,
  useTheme,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/Inbox";
import EntityCard from "./Card";
import useUsers from "utils/useUsers";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import MapIcon from "@material-ui/icons/Map";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import clsx from "clsx";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  spaceIcons: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  Icon: {
    height: 64,
    marginLeft: "auto",
  },
  appColor: {
    backgroundColor: "#f5f5e6",
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();

  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const router = useRouter();
  const [users] = useUsers([]);

  const toggleSideMenu = () => {
    setIsOpenSideMenu(!isOpenSideMenu);
  };

  const sendTo = (url) => {
    router.push(`/${url}`);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar //MIN HEIGHT 64
        position="fixed"
        className={clsx(classes.appColor, classes.appBar, {
          [classes.appBarShift]: isOpenSideMenu,
        })}
      >
        <Toolbar>
          <Grid container className={classes.wrapper}>
            <IconButton
              onClick={toggleSideMenu}
              className={classes.menuButton}
              aria-label="open drawer"
              edge="end"
            >
              <MenuIcon className={classes.spaceIcons} />
            </IconButton>
            <IconButton
              onClick={() => sendTo("map")}
              className={classes.menuButton}
              aria-label="open drawer"
              edge="end"
            >
              <MapIcon className={classes.spaceIcons} />
              Mapa
            </IconButton>
            <IconButton
              onClick={() => sendTo("user/register")}
              className={classes.menuButton}
              aria-label="open drawer"
              edge="end"
            >
              <AddCircleIcon className={classes.spaceIcons} />
              Mostrate!
            </IconButton>
            <IconButton
              onClick={() => sendTo("")}
              className={classes.menuButton}
              aria-label="open drawer"
              edge="end"
            >
              <HomeIcon className={classes.spaceIcons} />
              Nosotros
            </IconButton>
            <img
              src={"/large_everdonor.png"}
              alt={"icono"}
              className={classes.Icon}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <main
        className={clsx({
          [classes.contentShift]: isOpenSideMenu,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpenSideMenu}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleSideMenu}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Grid
            container
            spacing={3}
          >
            <Grid item xl={2}>
              {users.map((user) => (
                <EntityCard {...user} />
              ))}
            </Grid>
          </Grid>
        </List>
      </Drawer>
    </div>
  );
}