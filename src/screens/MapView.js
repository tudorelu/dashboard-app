import React from 'react';
import PropTypes from 'prop-types';
import Datamap from '../components/Datamap';

import d3 from 'd3';

import data from '../data/map/data.js';
import {RadioGroup} from 'react-radio-group';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {GLOBAL_STATE, INDIA, AUSTRALIA} from './MapStates.js';

export default class MapView extends React.Component {
    constructor(props) {
        super(props);
        var dataset = {};

        var onlyValues = data.series.map(function(obj) {
            return obj[1];
        });
        var minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        var paletteScale = d3.scale.linear().domain([minValue, maxValue]).range(["#ffe0cc", "#ff471a"]);
        data.series.forEach(function(item) {
            var iso = item[0],
                value = item[1],
                region = item[2];
            dataset[iso] = {
                numberOfThings: value,
                fillColor: paletteScale(value),
                region: region
            };
        });
        this.state = AUSTRALIA;

    }

    setProjection(element) {
        const projection = d3.geo.equirectangular()
            .center([23, -3])
            .rotate([4.4, 0])
            .scale(400)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        const path = d3.geo.path()
            .projection(projection);

        return { path, projection };
    }

    update = (region) => {
        var _this = this;
        let filteredData = Object.keys(this.state.allData).filter(function(country) {
            let item = _this.state.allData[country];
            if (item.region === region || 'ALL' === region) {
                return true;
            } else {
                return false;
            }
        });

        let regionData = {};
        filteredData.map(function(country) {
            regionData[country] = _this.state.allData[country];
        });

        this.setState(Object.assign({}, {
            data: regionData,
            selectedRegion:region
        }, window.example));
    }

    render() { 
        return (
            <div className="App"> 
                <Card>
                    <CardContent>

                        <Datamap 
                            {...this.state} 
                            //setProjection={this.setProjection}
                            />
                    </CardContent>
                </Card>            
            </div>
        );
    }
}