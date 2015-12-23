var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

var chart = nv.models.bulletChart();

function drawBarChart (node, data) {
  d3.select('#chart div')
    .datum(data)
    .transition().duration(1000)
    .call(chart);
}

function updateBarChart (node, data) {
  d3.select(node)
    .datum(data)
    .call(chart);
}

var BarChart = React.createClass  ({
  componentDidMount: function() {
    drawBarChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  componentDidUpdate: function() {
    updateBarChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  render: function() {
    return (
      <svg height='100px'></svg>
    );
  }
});

module.exports = BarChart;
