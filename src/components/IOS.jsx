import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Container, withStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  showList: {
    display: "flex",
    justifyContent: "flex-start"
  }
});

class IOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiers: [],
      idToken: sessionStorage.getItem("x-access-token")
    };
    axios
      .get("http://localhost:5000/ios/version", {
        headers: { "x-access-token": this.state.idToken }
      })
      .then(response => {
        //console.log(response.data.versions);
        this.setState({ tiers: response.data.versions });
      })
      .catch(error => {
        //console.log(error);
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <CssBaseline />
        <Grid container spacing={5} alignItems="flex-end">
          {this.state.tiers.map(tier => (
            <Grid item key={tier.versionCode} xs={12} md={12}>
              <Card>
                <CardHeader
                  title={tier.versionCode}
                  //subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  //subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div>
                    <ul>
                      <li className={classes.showList}>
                        <Typography>App version:</Typography>
                        <Typography color="textSecondary">
                          {tier.appVersion}
                        </Typography>
                      </li>
                      <li className={classes.showList}>
                        <Typography>React native version:</Typography>
                        <Typography color="textSecondary">
                          {tier.reactNativeVersion}
                        </Typography>
                      </li>
                      <li className={classes.showList}>
                        <Typography>Shop react version:</Typography>
                        <Typography color="textSecondary">
                          {tier.shopReactVersion}
                        </Typography>
                      </li>
                      <li className={classes.showList}>
                        <Typography>Parent react version:</Typography>
                        <Typography color="textSecondary">
                          {tier.parentReactVersion}
                        </Typography>
                      </li>
                      <li className={classes.showList}>
                        <Typography>Shop bundle path:</Typography>
                        <Typography color="textSecondary">
                          {tier.shopBundlePath}
                        </Typography>
                      </li>
                      <li className={classes.showList}>
                        <Typography>Parent bundle path:</Typography>
                        <Typography color="textSecondary">
                          {tier.parentBundlePath}
                        </Typography>
                      </li>
                      <li className={classes.showList}>
                        <Typography>Description:</Typography>
                        <Typography color="textSecondary">
                          {tier.description}
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          navigator.clipboard.writeText(tier.shopBundlePath);
                        }}
                      >
                        Copy shop bundle path
                      </Button>
                    </CardActions>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          navigator.clipboard.writeText(tier.parentBundlePath);
                        }}
                      >
                        Copy parenting bundle path
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(IOS);
