var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

var bullet_chart = nv.models.bulletChart();

function exampleData() {
  return {
    "title": "Revenue", //Label the bullet chart
    "subtitle": "US$, in thousands", //sub-label for bullet chart
    "ranges": [150, 225, 300], //Minimum, mean and maximum values.
    "measures": [220], //Value representing current measurement (the thick blue line in the example)
    "markers": [250] //Place a marker on the chart (the white triangle marker)
  };
}

function drawBulletChart(node, data) {
  d3.select(node).datum(data).call(bullet_chart);
}

function updateBulletChart(node, data) {
  d3.select(node).datum(data).call(bullet_chart);
}

var myData = exampleData();

var BulletChart = React.createClass({
  displayName: 'BulletChart',

  componentDidMount: function () {
    drawBulletChart(ReactDOM.findDOMNode(this), myData);
  },
  componentDidUpdate: function () {
    updateBulletChart(ReactDOM.findDOMNode(this), myData);
  },
  render: function () {
    return (  
      <svg></svg>
    );
  }
});

module.exports = BulletChart;

