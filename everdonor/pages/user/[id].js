import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import EverdonorAPI from "api-client/EverdonorAPI";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  gridPaper: {
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileCard: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileInformationCard: {
    padding: theme.spacing(1.2),
    textAlign: "left",
    // color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  largeAvatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    EverdonorAPI.searchById(router.query.id).then((resData) =>
      setUser(resData)
    );
  }, [router.query.id]);

console.log(user)

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h5">
          Perfil
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.gridPaper}>
              <Grid item container className={classes.profileCard}>
                <Avatar
                  alt="Remy Sharp"
                  src={user.image}
                  className={classes.largeAvatar}
                />
                <Typography variant="h5" className={classes.profileCard}>
                  {user.name}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.profileInformationCard}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Email
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom style={{ cursor: 'pointer' }}>
                    {user.email}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Número de telefono
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {user.phoneNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Horarios de contacto: ADD TO USER
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Dirección
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {user.address}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Tipos de donación que acepta​
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {user.donationType}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
