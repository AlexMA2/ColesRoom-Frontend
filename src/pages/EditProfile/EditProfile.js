import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "grey" },
  card: { textAlign: "justified", maxWidth: 700, margin: "auto" },
}));

const fetchMyUser = async () => {
  const res = await fetch(`https://colesroomapp.herokuapp.com/teacher/${sessionStorage.getItem("user")}`);
  const data = await res.json();
  return data;
};

const EditProfile = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  useEffect(() => {
    const getUser = async () => {
      await fetchMyUser().then((a) => {
        setUser(a);
      });
    };
    getUser();
  }, []);

  console.log(user);

  const classes = useStyles();
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const surnameChangeHandler = (e) => {
    setSurname(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const phoneChangeHandler = (e) => {
    setPhone(e.target.value);
  };
  const submitHandler = () => {
    if (name !== "" && name !== user.name) {
    }
    if (surname !== "" && name !== user.surname) {
    }
    if (email !== "" && name !== user.email) {
    }
    if (phone !== "" && name !== user.phone) {
    }
  };
  const scapeHandler = () => {};
  const deleteHandler = () => {};
  return (
    <main className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src="/broken-image.jpg" />}
          title={`${user.name} ${user.surname}`}
        />
        <CardContent>
          <span>Deje vacios aquellos campos que no piensa cambiar</span>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <aside>
                <span>Nombre</span>
              </aside>
            </Grid>
            <Grid item>
              <TextField
                id="name"
                type="text"
                placeholder="Nombre"
                onChange={nameChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <aside>
                <span>Apellido</span>
              </aside>
            </Grid>
            <Grid item>
              <TextField
                id="surname"
                type="text"
                placeholder="Apellido"
                onChange={surnameChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item>
              <aside>
                <span>E-mail</span>
              </aside>
            </Grid>
            <Grid item>
              <TextField
                id="email"
                type="email"
                placeholder="example@example.com"
                onChange={emailChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <aside>
                <span>Teléfono</span>
              </aside>
            </Grid>
            <Grid item>
              <TextField id="phone" type="tel" onChange={phoneChangeHandler} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="primary" onClick={submitHandler}>
            Confirmar
          </Button>
          <Button variant="contained" color="secondary" onClick={scapeHandler}>
            Volver
          </Button>
          <div>
            <span>¿Desea eliminar su cuenta?</span>
            <Button color="secondary" onClick={deleteHandler}>
              Eliminar
            </Button>
          </div>
        </CardActions>
      </Card>
    </main>
  );
};

export default EditProfile;
