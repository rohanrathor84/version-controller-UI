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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      empId: "",
      emailId: "",
      password: "",
      roleId: ""
    };
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    const baseUrl = "http://localhost:5000/createUser";
    const payLoad = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      empId: this.state.empId,
      emailId: this.state.emailId,
      password: this.state.password,
      roleId: this.state.roleId
    };
    //console.log(this);
    axios
      .post(baseUrl, payLoad)
      .then(response => {
        History.push("/SignIn");
        //console.log(response.response);
      })
      .catch(function(error) {
        //console.log(error);
      });
    //console.log(event);
  };

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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={event =>
                    this.setState({ firstName: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={event =>
                    this.setState({ lastName: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={event =>
                    this.setState({ emailId: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="employeeId"
                  variant="outlined"
                  required
                  fullWidth
                  id="empId"
                  label="Employee ID"
                  autoFocus
                  onChange={event =>
                    this.setState({ empId: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-role-native-simple">
                    Role
                  </InputLabel>
                  <Select
                    native
                    onChange={event =>
                      this.setState({ roleId: event.target.value })
                    }
                    labelWidth={50}
                    inputProps={{
                      name: "role",
                      id: "outlined-role-native-simple"
                    }}
                  >
                    <option value="" />
                    <option value={1}>Admin</option>
                    <option value={2}>User</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={event => this.handleClick(event)}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <ContainerLink to="/SignIn">
                  Already have an account? Sign in
                </ContainerLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignUp);
