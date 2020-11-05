import { useRouter } from "next/router";
import {
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  Divider,
  List,
  Drawer,
  useTheme,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EntityCard from "./Card";
import useUsers from "utils/useUsers";
import useCurrentUser from 'utils/useCurrentUser'
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

export default function Header({styleClasses, open, handleDrawerOpen}) {
  const classes = styleClasses;
  const theme = useTheme();
  const [] = useCurrentUser()

  const router = useRouter();
  const [users] = useUsers([]);

  return (
    <>
      <AppBar //MIN HEIGHT 64
        position="fixed"
        className={clsx(classes.appColor, classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
            aria-label="open drawer"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CURRENT PAGE
          </Typography>
          {/* <IconButton
            onClick={() => sendTo("map")}
            className={classes.menuButton}
            aria-label="open drawer"
            edge="end"
          >
            <MapIcon />
            Mapa
          </IconButton>
          {!currentUser && <IconButton
            onClick={() => sendTo("user/register")}
            className={classes.menuButton}
            aria-label="open drawer"
            edge="end"
          >
            <AddCircleIcon />
            Mostrate!
          </IconButton>}
          <IconButton
            onClick={() => sendTo("")}
            className={classes.menuButton}
            aria-label="open drawer"
            edge="end"
          >
            <HomeIcon />
            Nosotros
          </IconButton>
          {!currentUser && <IconButton
            onClick={() => sendTo("login")}
            className={classes.menuButton}
            aria-label="open drawer"
            edge="end"
          >
            <AccountCircleIcon />
            Login
          </IconButton>} */}
          <div style={{ marginLeft: "auto" }}>
            {/* {currentUser &&
              <IconButton
                style={{ marginTop: "-50px" }}
                onClick={deleteUser}
                className={classes.menuButton}
                aria-label="open drawer"
                edge="end"
              >
                <ExitToAppIcon />
              </IconButton>
            } */}
            <img
              src={"/large_everdonor.png"}
              alt={"icono"}
              className={classes.Icon}
            />
          </div>
        </Toolbar>
      </AppBar>
      {/* <main
        className={clsx({
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
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
                <EntityCard {...user} closeDrawerOnClick={handleDrawerClose} />
              ))}
            </Grid>
          </Grid>
        </List>
      </Drawer> */}
    </>
  );
}