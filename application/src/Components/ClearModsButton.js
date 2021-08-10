import React from "react";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  card: {
    minWidth: 400,
    minHeight: 200,
  },
  content: {
    flex: "1 0 auto",
    alignItems: "center",
  },
  controls: {
    flex: "1 0 auto",
    alignItems: "center",
    justify: "center",
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ClearModsButton = ({ restart }) => {
  const classes = useStyles();
  const handleSubmit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Confirm Clear Mods
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Are you sure you want to clear all mods?
              </Typography>
            </CardContent>
            <Divider style={{ background: "black" }} variant="middle" />
            <Grid container direction="column" alignItems="flex-start">
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                className={classes.controls}
              >
                <Grid item xs={7}></Grid>
                <Grid item xs>
                  <Button
                    disableElevation
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    edge="end"
                    onClick={() => {
                      restart();
                      onClose();
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    onClick={onClose}
                    edge="end"
                  >
                    {" "}
                    No{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        );
      },
    });
  };

  return (
    <Button className={classes.root} onClick={handleSubmit} variant="contained">
      Clear mods
    </Button>
  );
};

export default ClearModsButton;
