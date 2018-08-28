import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import VerticalSlider from './VerticalSlider.js';

const styles = {
  container:{
    flex:1,
    marginRight:20,
  },
  card: { 
    flex:1,
    flexDirection:'row', 
  },
	variable:{
		fontSize:10,
		fontWeight: 'bold',
	},
	value:{
		fontSize:9
	},
  title: {
    marginBottom: 16,
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
};

function Levers(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Card className={classes.card}>


        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Levers
          </Typography>

      	<VerticalSlider callback={(data)=>props.callback(data)}/> 

        </CardContent>
 			{/*
       
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>

      */}
      </Card>
    </div>
  );
}

Levers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Levers);
