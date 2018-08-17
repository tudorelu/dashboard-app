import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ButtonAppBar from './components/ButtonAppBar.js'; 
import MiniDrawer from './components/MiniDrawer.js'; 
import SimpleCard from './components/SimpleCard.js';

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

const Third = () => (
  <div className="Dashboard-content">

    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Third</h1>
    </header>
    
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

export default App;
