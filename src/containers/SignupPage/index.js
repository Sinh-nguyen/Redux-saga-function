import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  TextField,
  Typography,
  withStyles,
  Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

class SignupPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.signup}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb-xs">
                  <Typography variant="caption">
                    Sign Up your account
                  </Typography>
                </div>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  fullwidth="true"
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullwidth="true"
                  margin="normal"
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullwidth="true"
                  margin="normal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="agree"
                      label="agree with term"
                      className={classes.fullwidth}
                    />
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullwidth="true"
                  types="submit"
                >
                  SignUp
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/login">
                    <Button>Already have account?</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignupPage);
