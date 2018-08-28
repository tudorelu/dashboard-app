import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  container:{
    flex:1,
    marginRight:20,
    height:'100%',
  },
  card: {
  	flex:1,
    minWidth: 275,
  },
	variable:{
		fontSize:16,
		fontWeight: 'bold',
		paddingLeft:20,
	},
	value:{
		fontSize:14,
	},
  title: {
    marginBottom: 2,
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
};

function OverviewDataCard(props) {
  const { classes } = props;
  console.log("Inside OverviewDataCard");
  console.log(props);
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            Area Name
	          </Typography>

	          <Typography className={classes.value} color="textSecondary">
	            {props.areaInfo.name}, {props.areaInfo.state}
	          </Typography>
          </div>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            Area Code
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	            {props.areaInfo.code}
	          </Typography>
          </div>

            <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            Square Kms
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	            {Math.round(props.areaInfo.squareKms)}
	          </Typography>
          </div>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            Population     
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	            {props.areaInfo.population}
	          </Typography>
          </div>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            Over 70 Population
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	            {Math.round(props.areaInfo.over70)}
	          </Typography>
          </div>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            % of aging population
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	            {Math.round(props.areaInfo.over70/props.areaInfo.population * 10000)/100}
	          </Typography>
          </div>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            People eligible (Aged Care)
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	          	{Math.round(props.areaInfo.eligible)}
	          </Typography>
          </div>

          <div style={{flex:1, flexDirection:'row'}}>
	          <Typography className={classes.variable} color="textSecondary">
	            Places available (Aged Care)
	          </Typography>
	          <Typography className={classes.value} color="textSecondary">
	          {Math.round(props.areaInfo.places_available)}
	          </Typography>
          </div>

        </CardContent>

      </Card>
    </div>
  );
}

OverviewDataCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OverviewDataCard);
