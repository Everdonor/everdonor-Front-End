
import { useState, useEffect } from "react";
import Profile from 'components/Profile'
import Modify from 'components/Modify'
import Switch from '@material-ui/core/Switch';
import { makeStyles } from "@material-ui/core/styles";
import EverdonorAPI from "api-client/EverdonorAPI";
import { useRouter } from "next/router";
import useCurrentUser from 'utils/useCurrentUser'
import {
  Typography,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  moveLeft: {
    direction: "rtl"
  },
}));

export default function ProfileAndModify() {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [willModify, setWillModify] = useState(false);
  const [currentUser] = useCurrentUser()

  useEffect(() => {
    EverdonorAPI.searchById(router.query.id).then((resData) =>
      setUser(resData)
    );
  }, [router.query.id]);

  return (
    <div className={classes.paper}>
      <Grid container 
            direction="column"
            justify="center"
            alignItems="center"
      >
        <Grid item xs={6} className={classes.moveLeft}>
          <Typography component="h1" variant="h5">
            Perfil
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {currentUser && user.email === currentUser.sub &&
            <>
              < Switch
                checked={willModify}
                onChange={() => setWillModify(!willModify)}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
          Modificar
          </>
          }
        </Grid>
      </Grid>
      {
        willModify
          ?
          <Modify user={user} setModify={setWillModify} />
          :
          <Profile user={user} setModify={setWillModify} />
      }
    </div>
  );
}
