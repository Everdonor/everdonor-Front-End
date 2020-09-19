
import { useState, useEffect } from "react";
import Profile from 'components/Profile'
import Modify from 'components/Modify'
import Switch from '@material-ui/core/Switch';
import { makeStyles } from "@material-ui/core/styles";
import EverdonorAPI from "api-client/EverdonorAPI";
import { useRouter } from "next/router";


const useStyles = makeStyles((theme) => ({
  moveLeft: {
    direction: "rtl"
  },
}));

export default function ProfileAndModify() {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [willModify, setWillModify] = useState(false);

  useEffect(() => {
    EverdonorAPI.searchById(router.query.id).then((resData) =>
      setUser(resData)
    );
  }, [router.query.id]);

  return (
    <div>
      <div className={classes.moveLeft}>
        <Switch
          checked={willModify}
          onChange={() => setWillModify(!willModify)}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        Modificar
      </div>
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
