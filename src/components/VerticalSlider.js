import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    display: 'flex',
    justifyContent:'center',
  },
  slider: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection:'row',
  }
};

class VerticalSlider extends React.Component {
  state = {
    value1: 1,
    value2: 3,
    value3: 0,
    total: 1,
  };

  handleChange1 = (event, value1) => {
    var old = this.state.value1;
    this.setState({ value1 });
    var number = Math.abs((this.state.total-old+value1)%4);
    console.log("Callback from lever 1 with "+number);
    this.setState({total:number})
    this.props.callback(number);
  };
  
  handleChange2 = (event, value2) => {
    var old = this.state.value2;
    this.setState({ value2 });
    var number = Math.abs((this.state.total-old+value2*2)%4);
    console.log("Callback from lever 2 with "+number);
    this.setState({total:number})

    this.props.callback(number);
  };
  
  handleChange3 = (event, value3) => {
    var old = this.state.value3;
    this.setState({ value3 });
    var number = Math.abs((this.state.total-old+3*value3)%4);
    this.setState({total:(number)})
    
    this.props.callback(number);
  };

  render() {
    const { classes } = this.props;
    const { value1, value2, value3 } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.slider}>
          <Slider value={value1} min={0} max={3} step={1} onChange={this.handleChange1} />
          <Typography> Funding for Providers </Typography>
        </div>
        <div className={classes.slider}>
          <Slider value={value2} min={0} max={3} step={1} onChange={this.handleChange2} />
          <Typography> Funding for Pensions </Typography>
        </div>
        <div className={classes.slider}>  
          <Slider value={value3} min={0} max={3} step={1} onChange={this.handleChange3} />
          <Typography> Cost of Services </Typography>
        </div>
      </div>
    );
  }
}

VerticalSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerticalSlider);