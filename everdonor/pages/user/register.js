import React, { useState } from "react";
import useForm from "utils/useForm";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Select,
  Chip,
  InputLabel,
  Link,
  FormControl,
} from "@material-ui/core";
import API from "api-client/EverdonorAPI";
import DropzoneArea from "components/3rdParty/DropzoneArea";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import MapWithSearch from "components/3rdParty/MapWithSearch";

const types = [
  { name: "Comida", value: "Food" },
  { name: "Ropa", value: "Clothes" },
  { name: "Ayuda economica", value: "Funding" },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dropzone: {
    marginTop: theme.spacing(8),
  },
  margin: {
      margin: theme.spacing(1),
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [
    form,
    addOrUpdateValue,
    addImageValue,
    addLinkTodoPago,
    addComaSeparated,
  ] = useForm({ donationTypes: [] });
  const [coordenate, setCoordenates] = useState();
  const router = useRouter();
  const [error, setError] = useState();

  const sendForm = (event) => {
    event.preventDefault();
    API.createUser({ ...form, ...coordenate })
      .then(() => router.push("/login"))
      .catch((err) => {
        setError(err);
      });
  };

  const manipulateCoordenates = ({ latitude, longitude }) => {
    setCoordenates({ latitude, longitude });
  };

  const sanitizeUrl = ({ target: { value } }) => {
    var n = value.match(/<a href='(.*)'>/m);

    if (n.length > 1 && n[1].includes("https://forms.todopago.com.ar")) {
      addLinkTodoPago(n[1]);
    } else {
      setError({ message: "Link desconocido" });
    }
  };
  
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        {error && (
          <Typography variant="h6" style={{ color: "red" }} gutterBottom>
            {error.message
              ? error.message
              : "Ocurrio un error, intenta de nuevo en unos minutos!"}
          </Typography>
        )}
        <Typography component="h1" variant="h5">
          Completa el formulario para registrarte!
        </Typography>
        <form className={classes.form} onSubmit={sendForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={addOrUpdateValue("name")}
            id="name"
            label="Nombre"
            name="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={addOrUpdateValue("email")}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={addOrUpdateValue("password")}
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={addOrUpdateValue("phoneNumber")}
            name="phoneNumber"
            label="Telefono"
            type="number"
            id="phoneNumber"
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel id="donation-label">Tipos de donación</InputLabel>
            <Select
              id="donation"
              label="Tipos de donación"
              select
              multiple
              required
              fullWidth
              variant="outlined"
              value={form.donationTypes}
              onChange={addOrUpdateValue("donationTypes")}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((option) => (
                    <Chip
                      key={types.find((type) => type.value === option).value}
                      label={types.find((type) => type.value === option).name}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
              helperText="Por favor seleccione que tipo de donacion necesita"
            >
              {types.map((option) => (
                <MenuItem
                  key={option.value}
                  id={option.value}
                  value={option.value}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={addOrUpdateValue("address")}
            id="address"
            label="Dirección"
            name="address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={sanitizeUrl}
            id="Link Todo Pago"
            label="Link de Todo Pago"
            name="Link de Todo Pago"
          />
          <Link href="/todoPago" variant="body2" target="_blank">
            {"Que es esto?"}
          </Link>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={addComaSeparated("links")}
            id="Links utiles"
            label="Links utiles(Facebook, pagina web, etc)"
            name="Links utiles"
            helperText="Links separados por coma"
          />
          <MapWithSearch height="33vh" setCoordenates={manipulateCoordenates} />
          <DropzoneArea onUpload={addImageValue} className={classes.dropzone} />
          <Button
            id="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrate!
          </Button>
        </form>
      </div>
    </Container>
  );
}
