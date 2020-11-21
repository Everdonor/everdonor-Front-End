import React from "react";
import { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { IconButton } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import API from "api-client/EverdonorAPI";
import Modal from "../Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  report: {
    marginLeft: theme.spacing(26),
  },
}));

export default function EntityCard({
  id,
  name,
  email,
  phoneNumber,
  image,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    router.push("/user/[id]", `/user/${id}`);
  };

  const reportUser = () => {
    API.reportUser(id);
    setOpen(false);
    router.reload(); //TODO: mejorar, hago reload para que vuelva a hacer el get de users
  };

  return (
    <div>
      <Modal
        open={open}
        onAccept={reportUser}
        onClose={() => setOpen(false)}
        title="¿Desea reportar al usuario?"
      >
      </Modal>
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {email}
              <br />
              {phoneNumber}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button id={`id_${name}_vermas`} size="small" color="primary" onClick={handleClick}>
            Ver mas
          </Button>
          <IconButton
            aria-label="report"
            className={classes.report}
            onClick={() => setOpen(true)}
          >
            <ReportIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
