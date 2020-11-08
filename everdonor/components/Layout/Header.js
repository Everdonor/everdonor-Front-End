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
  Button,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EntityCard from "./Card";
import useUsers from "utils/useUsers";
import useCurrentUser from 'utils/useCurrentUser'
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import SearchBar from "components/3rdParty/SearchBar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

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
          <div style={{ marginLeft: "auto" }}>
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