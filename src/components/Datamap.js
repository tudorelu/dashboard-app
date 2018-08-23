import React from 'react';
import PropTypes from 'prop-types';
import Datamaps from 'datamaps/dist/datamaps.world.hires.min.js';

export default class Datamap extends React.Component {

	//defining our expected props which will be directly passed on to the datamaps instance
	static propTypes = {
		arc: PropTypes.array,
		arcOptions:  PropTypes.object,
		bubbleOptions:  PropTypes.object,
		bubbles:  PropTypes.array,
		graticule: PropTypes.bool,
		labels: PropTypes.bool
	};

	constructor(props) {
		super(props);
		window.addEventListener('resize', this.resize);
	}

	resize = () => {
		if (this.map) {
			this.map.resize();
		}
	}

	//this will create the map when the component mounts
	componentDidMount() {
		this.drawMap();
	}

	//this will remove the map from the dom when the react component is unmounted
	componentWillReceiveProps() {
		this.clear();
	}

	//this will update the map with the latest props
	componentDidUpdate() {
		this.drawMap();
	}

	componentWillUnmount() {
		this.clear();
		window.removeEventListener('resize', this.resize);
	}

	clear = () => {
		const container = this.refs.container;

		for (const child of Array.from(container.childNodes)) {
			container.removeChild(child);
		}
	}

	drawMap = () => {
		var map = new Datamaps(Object.assign({}, {
			...this.props
		}, {
			element: this.refs.container, // this is the place where the react dom and the Datamaps dom will be wired
			projection: 'mercator', // this is hardcoded here as we want the projection to be constant
			responsive: true
		}));

		this.map = map;
	}

	render() {
		const style = {
			direction: 'flex',
			alignSelf: 'center',
			alignItems: 'center',
			marginLeft: -200,
			marginRight: 0,
			width: '70%',
		};

		return <div ref="container" style={style}></div>;
	}

}