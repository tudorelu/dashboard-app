import d3 from 'd3';

export const GLOBAL_STATE = {
  scope: 'world',
  selectedRegion:'ALL',
  fills: {
      defaultFill: '#ddd'
  },
  geographyConfig: {  // this one is the xact same config which is you will see in the Datamaps config, you can add any confi option required for the Datamaps instance depending on your requirement.
      borderColor: '#888',
      borderWidth: .5,
      highlightBorderWidth: .5,
      highlightBorderColor: 'black',
      highlightFillColor: function(geo) {
          return geo['fillColor'] || '#ddd';
      },
      popupTemplate: function(geo, data) {
          //some custom popup html fragment
      }
  }
};

// https://raw.githubusercontent.com/tudorelu/Australia-json-data/master/ABS_LGA_2011.json

export const INDIA = {
	scope: 'india',
  geographyConfig: {
      popupOnHover: true,
      highlightOnHover: true,
      borderColor: '#444',
      borderWidth: 0.5,
      dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
      //dataJson: topoJsonData
  },
  fills: {
      'MAJOR': '#306596',
      'MEDIUM': '#0fa0fa',
      'MINOR': '#bada55',
      defaultFill: '#dddddd'
  },
  data: {
      '56620': { fillKey: 'MINOR' },
      "72330": { fillKey: 'MINOR' }
  },
  setProjection: function (element) {
      var projection = d3.geo.mercator()
          .center([95.9629, 19.5937]) // always in [East Latitude, North Longitude]
          .scale(600);
      var path = d3.geo.path().projection(projection);
      return { path: path, projection: projection };
  }
}

//https://raw.githubusercontent.com/tudorelu/Australia-json-data/master/ABS_LGA_2011.json
//https://raw.githubusercontent.com/alwaysblazing/Australia-State-TopoJson-MapChart/master/au-states-topo.json
export const AUSTRALIA = {
	scope: 'ABS_LGA_2011',
  position: 'relative',
  overflow: 'visible',
  geographyConfig: {
    popupOnHover: true,
    highlightOnHover: true,
    highlightFillColor: '#FC8D59',
    borderColor: '#444',
    borderWidth: 0.5,
    dataUrl: 'https://raw.githubusercontent.com/tudorelu/dashboard-app/master/src/data/map/ABS_LGA.topo.json',
    //dataJson: topoJsonData
    popupTemplate: function(geo, data) {
    	return '<div class="hoverinfo"><strong>' 
    	+ geo.properties.LGA_NAME11 + 
    	'</strong></div>';
		},
  },
  fills: {
    'MAJOR': '#306596',
    'MEDIUM': '#0fa0fa',
    'MINOR': '#bada55',
    defaultFill: '#fff'
  },
  data: {
      '56620': { fillKey: 'MINOR' },
      "72330": { fillKey: 'MINOR' }
  },

  setProjection: function (element) {
      var projection = d3.geo.mercator()
          .center([150.77, -27.27]) // always in [East Latitude, North Longitude]
          .scale(600);
      var path = d3.geo.path().projection(projection);
      return { path: path, projection: projection };
  }
}
