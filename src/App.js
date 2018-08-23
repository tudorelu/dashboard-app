import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import d3 from 'd3';

import ButtonAppBar from './components/ButtonAppBar.js'; 
import MiniDrawer from './components/MiniDrawer.js'; 
import SimpleCard from './components/SimpleCard.js';
import Datamap from './components/Datamap.js';

import MapView from './screens/MapView.js';

import {Doughnut, Line, Bar} from 'react-chartjs-2';

import Button from '@material-ui/core/Button';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <MiniDrawer title="Dashboard">

            <Route exact path="/" component={Main} />
            <Route path="/second" component={Second} />
            <Route path="/third" component={Third} />
            <Route path="/fourth" component={Fourth} />

          </MiniDrawer>
        
        </div>
      </Router>
    );
  }
}

const Main = () => (
  <div className="Dashboard-content">

    <div className="Dashboard-tab">
      <SimpleCard title="Doughnut Chart">
        <Doughnut data={chartData} />
      </SimpleCard>

      <SimpleCard title="Line Chart">
        <Line data={chartData} />
      </SimpleCard>
    </div>

    <div className="Dashboard-tab">
      <SimpleCard title="Doughnut Chart" >
        <Bar data={chartData} />
      </SimpleCard>
    </div>
    
    <Button variant="contained" color="primary">
      Hello World
    </Button>


  </div>
);

const Second = () => (
  <div className="Dashboard-content">

    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Second</h1>
    </header>
    
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

const colors = d3.scale.category10();

const Third = () => (

  <div className="Map">

    <Datamap
      scope="world"
      setProjection={this.setProjection}
      fills={{
        defaultFill: '#abdda4',
        gt50: colors(Math.random() * 20),
        eq50: colors(Math.random() * 20),
        lt25: colors(Math.random() * 10),
        gt75: colors(Math.random() * 200),
        lt50: colors(Math.random() * 20),
        eq0: colors(Math.random() * 1),
        pink: '#0fa0fa',
        gt500: colors(Math.random() * 1)
      }}
      data={{
        ZAF: { fillKey: 'gt50' },
        ZWE: { fillKey: 'lt25' },
        NGA: { fillKey: 'lt50' },
        MOZ: { fillKey: 'eq50' },
        MDG: { fillKey: 'eq50' },
        EGY: { fillKey: 'gt75' },
        TZA: { fillKey: 'gt75' },
        LBY: { fillKey: 'eq0' },
        DZA: { fillKey: 'gt500' },
        SSD: { fillKey: 'pink' },
        USA: { fillKey: 'gt50' },
        GIB: { fillKey: 'eq50' },
        AGO: { fillKey: 'lt50' }
      }}
      bubbles={[
        {
          name: 'Bubble 1',
          latitude: 21.32,
          longitude: -7.32,
          radius: 45,
          fillKey: 'gt500'
        },
        {
          name: 'Bubble 2',
          latitude: 12.32,
          longitude: 27.32,
          radius: 25,
          fillKey: 'eq0'
        },
        {
          name: 'Bubble 3',
          latitude: 0.32,
          longitude: 23.32,
          radius: 35,
          fillKey: 'lt25'
        },
        {
          name: 'Bubble 4',
          latitude: -31.32,
          longitude: 23.32,
          radius: 55,
          fillKey: 'eq50'
        }
      ]}
      bubbleOptions={{
        popupTemplate: (geo, data) =>
          `<div class="hoverinfo">Bubble for ${data.name}`
      }}
    />
  </div>
);

const Fourth = () => (
  <div className="Dashboard-content">
    <div className="Map">
      <div className="Map">
        <MapView />
      </div>
    </div>
    
    <div className="Dashboard-tab">
      <SimpleCard title="Doughnut Chart">
        <Doughnut data={chartData} />
      </SimpleCard>

      <SimpleCard title="Line Chart">
        <Line data={chartData} />
      </SimpleCard>
    </div>

    <div className="Dashboard-tab">
      <SimpleCard title="Doughnut Chart" >
        <Bar data={chartData} />
      </SimpleCard>
    </div>

  </div>
);

export default App;
