import React, { Component } from 'react';
import PropTypes from 'prop-types';

import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  container:{
    flex:1,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: { 
    marginBottom: 12,
  },
};

function MapComponent(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {props.title}
          </Typography>
          This will be the map.
          {props.children}

        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

MapComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapComponent);
