import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography'; 

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});

class DataMap extends React.Component {
  state = {

  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>

      <Typography> Here we'll display the DataMap </Typography>

      </div>
    );
  }
}

DataMap.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DataMap);