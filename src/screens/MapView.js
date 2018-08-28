import React from 'react';
import PropTypes from 'prop-types';
import Datamap from '../components/Datamap';
import VerticalSlider from '../components/VerticalSlider.js';

import d3 from 'd3';

import data from '../data/map/ABS_LGA.topo.json';
//import jjdata from '../data/scene1.json';

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
        this.makeState2(this.props.mapData);
    }

    makeState2(num){
        var dataset = {};
        var areaInfo = {};
        var minValue = 10000;
        var maxValue = 0;
        var metric = "Age care penetration - Population"

        console.log("num is "+num);

        
        if(num==0) metric = "Age care penetration - Population";
        else if(num==1) metric = "T70pop";
        else if(num==2) metric = "places available per needed";
        else metric = "age_places"; 

        var jjdata = require('../data/scene'+num+'.json');

        var onlyValues = jjdata.map(function(obj) {
            if(minValue > obj[metric]) minValue = obj[metric];
            if(maxValue < obj[metric]) maxValue = obj[metric];
            return obj;
        });

        var paletteScale = d3.scale.linear().domain([minValue, maxValue]).range(["#50c878", "#ffe0cc"]);

        jjdata.forEach(function(item) {

            var region_name = item.region;
                
            var found = data.objects.ABS_LGA_2011.geometries.find(function(element) {
              return element.properties.LGA_NAME11 == region_name;
            });    

            if(found!=undefined || found != null){
                dataset[found.properties.LGA_CODE11] = {
                    numberOfThings: item[metric],
                    fillColor: paletteScale(item[metric]),
                    region: region_name
                };

                areaInfo[found.properties.LGA_CODE11] = {
                    code: found.properties.LGA_CODE11,
                    name: found.properties.LGA_NAME11,
                    state: found.properties.STE_NAME11,
                    squareKms: found.properties.AREA_SQKM,
                    population: item["Tpop.x"],
                    over70: item["T70pop"],
                    eligible: item["In Age care"],
                    places_available: item["age_places"]
                }; 
            }

        })
        AUSTRALIA.areaInfo = areaInfo;
        AUSTRALIA.image="Current State";
        AUSTRALIA.mapCallback = this.props.mapCallback;
        AUSTRALIA.data = dataset;
        this.state = AUSTRALIA;
    }

    componentDidUpdate(){
        this.makeState2(this.props.mapData);
    }

    makeState1(){
        var dataset = {};

        var minValue = 10000;
        var maxValue = 0;
        
        var onlyValues = data.objects.ABS_LGA_2011.geometries.map(function(obj) {
            if(minValue > obj.properties.AREA_SQKM) minValue = obj.properties.AREA_SQKM;
            if(maxValue < obj.properties.AREA_SQKM) maxValue = obj.properties.AREA_SQKM;
            return obj;
        });

        var paletteScale = d3.scale.linear().domain([minValue, maxValue]).range(["#ffe0cc", "#ff471a"]);

        data.objects.ABS_LGA_2011.geometries.forEach(function(item) { 
            dataset[item.id] = {
                numberOfThings: item.properties.AREA_SQKM,
                fillColor: paletteScale(item.properties.AREA_SQKM),
                region: item.properties.LGA_NAME11
            };
        });

        AUSTRALIA.mapCallback = this.props.mapCallback;
        AUSTRALIA.data = dataset;
        this.state = AUSTRALIA;

    }

    
    done(datamap, callback) {
        var self = this;
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) { 
            let info = self.areaInfo[geography.properties.LGA_CODE11];
            if(info!=undefined || info!=null)
                self.mapCallback(info);
            else alert("Data for this area is unavailable.")
        });
        
    }

    display(data){
        this.props.mapCallback(data);
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
        const style = {
            card:{
                //maxHeight:800,
                //backgroundColor:'red',
                resizeMode:'contain',
                marginRight:20,
            },
            content:{
                maxHeight:500,
            }
        };
        return (
            <div style={{flex:1, flexDirection:'row'}}> 
                <Card style={style.card}>
                    <CardContent style={style.content}>

                        <Datamap 
                            {...this.state}
                            done={this.done}
                            //setProjection={this.setProjection}
                            />
                    </CardContent>
                </Card>            
            </div>
        );
    }
}