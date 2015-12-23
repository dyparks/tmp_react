var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

var pieChart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(false);

function drawPieChart (node, data) {
  nv.addGraph(function() {
    d3.select(node)
        .datum(data)
        .transition().duration(350)
        .call(pieChart);
    return pieChart;
  });
}

function updatePieChart (node, data) {
  d3.select(node)
    .datum(data)
    .call(pieChart);
}

var PieChart = React.createClass  ({
  componentDidMount: function() {
    drawPieChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  componentDidUpdate: function() {
    updatePieChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  render: function() {
    return (
      <svg height='400px'></svg>
    );
  }
});

module.exports = PieChart;
