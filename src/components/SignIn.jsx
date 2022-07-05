import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Container, withStyles } from "@material-ui/core";
import { Link as ContainerLink } from "react-router-dom";
import axios from "axios";
import History from "../history";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://Firstcry.com/">
        Firstcry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: ""
    };
    // this.currentPathname = null;
    // this.currentSearch = null;
  }

  handleClick = event => {
    const baseUrl = "http://localhost:5000/userLogin";
    const payload = {
      emailId: this.state.emailId,
      password: this.state.password
    };
    //console.log(payload);
    axios
      .post(baseUrl, payload)
      .then(response => {
        //console.log(response);
        this.setToken(response.data.token);
        History.push("/Dashbord");
      })
      .catch(error => {
        //console.log(error);
      });
  };

  setToken = idToken => {
    // Saves user token to localStorage
    sessionStorage.setItem("x-access-token", idToken);
  };

  // componentDidMount() {
  //   const { history } = this.props;

  //   history.listen((newLocation, action) => {
  //     if (action === "PUSH") {
  //       if (
  //         newLocation.pathname !== this.currentPathname ||
  //         newLocation.search !== this.currentSearch
  //       ) {
  //         // Save new location
  //         this.currentPathname = newLocation.pathname;
  //         this.currentSearch = newLocation.search;

  //         // Clone location object and push it to history
  //         history.push({
  //           pathname: newLocation.pathname,
  //           search: newLocation.search
  //         });
  //       }
  //     } else {
  //       // Send user back if they try to navigate back
  //       history.go(1);
  //     }
  //   });
  // }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={event => this.setState({ emailId: event.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={event => this.handleClick(event)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <ContainerLink to="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </ContainerLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignIn);
