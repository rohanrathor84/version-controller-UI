import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import History from "../history";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddIOSVersion() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [appVersion, setAppVersion] = React.useState("");
  const [reactNativeVersion, setReactNativeVersion] = React.useState("");
  const [shopReactVersion, setShopReactVersion] = React.useState("");
  const [parentReactVersion, setParentReactVersion] = React.useState("");
  const [shopBundlePath, setShopBundlePath] = React.useState("");
  const [parentBundlePath, setParentBundlePath] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    History.push("/Dashbord");
  };

  const handleClick = () => {
    const baseUrl = "http://localhost:5000/ios/version";
    const payload = {
      appVersion: appVersion,
      reactNativeVersion: reactNativeVersion,
      shopReactVersion: shopReactVersion,
      parentReactVersion: parentReactVersion,
      shopBundlePath: shopBundlePath,
      parentBundlePath: parentBundlePath,
      description: description
    };
    //console.log(payload);
    axios
      .post(baseUrl, payload, {
        headers: { "x-access-token": sessionStorage.getItem("x-access-token") }
      })
      .then(response => {
        History.push("/Dashbord");
        //console.log(response);
      })
      .catch(error => {
        //console.log(error);
      });
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              IOS version
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick}>
              Upload
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="appVersion"
                    label="App version"
                    name="appVersion"
                    autoFocus
                    onChange={event => setAppVersion(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="reactNativeVersion"
                    label="React Native Version"
                    id="reactNativeVersion"
                    onChange={event =>
                      setReactNativeVersion(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="shopReactVersion"
                    label="Shop React Version"
                    name="shopReactVersion"
                    autoFocus
                    onChange={event => setShopReactVersion(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="parentReactVersion"
                    label="Parent React Version"
                    id="parentReactVersion"
                    onChange={event =>
                      setParentReactVersion(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="shopBundlePath"
                    label="Shop Bundle Path"
                    name="shopBundlePath"
                    autoFocus
                    onChange={event => setShopBundlePath(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="parentBundlePath"
                    label="Parent Bundle Path"
                    id="parentBundlePath"
                    onChange={event => setParentBundlePath(event.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="versionCode"
            label="Version code"
            id="versionCode"
          />
          </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    onChange={event => setDescription(event.target.value)}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
