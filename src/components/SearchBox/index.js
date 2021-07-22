import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';

class SearchBox extends Component {
  render() {
    const { handleChange, classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          autoComplete="off"
          className={classes.textField}
          onChange={handleChange}
          margin="normal"
          placeholder="Input Keyword"
        />
      </form>
    );
  }
}
SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
};

export default withStyles(styles)(SearchBox);
