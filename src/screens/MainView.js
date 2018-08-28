import React from 'react';
import PropTypes from 'prop-types';

import SimpleCard from '../components/SimpleCard.js';
import Datamap from '../components/Datamap.js';
import OverviewDataCard from '../components/OverviewDataCard.js';
import Levers from '../components/Levers.js';

import MediaCard from '../components/MediaCard.js';

import MapView from './MapView.js';

import {Doughnut, Line, Bar} from 'react-chartjs-2';

import {dummyData} from '../data/map/dummyData.js';

import Typography from '@material-ui/core/Typography';

const chartData = {
  datasets: [{
    data: [10, 20, 30]
  }],
  labels: [
    'Red',
    'Yellow',
    'Blue'
  ]
}

export default class MainView extends React.Component {
    
    constructor(props) {
        super(props);

        var key = "11600";
        var data = dummyData[key];
       	var name = data["agg_data.Region"];

        var labels = ["2011","2012","2013","2014","2015"]
        var newData = [];
        for (var i = 0; i < labels.length; i++) {
        	newData[i] = data[labels[i]];
        }

        this.state = {
        	title:dummyData[key]["variable"],
        	areaInfo:{
        		code: key,
        		name: name,
        		squareKms: '12000',
                population: '48000',
        	},
        	data: {
        		datasets:[{
        			data:newData,
        		}],
        		labels: labels
        	},
            image:"Scenario 0",
            mapData:"1",
        }
    }

    render() { 
        return (
        	<div className="Dashboard-content">

                <div className="Dashboard-tab">
                  <SimpleCard title="Dashboard">
                    <Typography> 
                        Change the policy levers below to see how certain changes in policy will affect outcomes - per area, but also per individual.
                    </Typography>
                  </SimpleCard>
                </div>


                <div className="Dashboard-tab">
                    <Levers callback={(data) => {
                        console.log("Changed levers");
                        this.setState({
                            image: "Scenario "+data.toString(),
                            mapData: data
                        })
                    }}/>
                </div>

				    <div className="Dashboard-tab">

				      <div style={{flex:2, maxHeight:600}}>
				        <MapView mapData={this.state.mapData} mapCallback={ 
				          (displayData) => { 
                            console.log("Called callback on mapview");

				          	this.setState({
				          		areaInfo:displayData,
					          });
				          } 
				        }/>
				      </div>
				    
                    </div>
				    
				    <div className="Dashboard-tab">

                    <OverviewDataCard areaInfo={this.state.areaInfo}/>

                    <MediaCard image={this.state.image}/>

				    </div>

				    <div className="Dashboard-tab">



                      <SimpleCard title={this.state.title}>
                        <Line data={this.state.data} />
                      </SimpleCard>
                        <SimpleCard title={this.state.title}>
                            <Doughnut data={this.state.data} />
                        </SimpleCard>


				    </div>

			    </div>
        );
    }
}


