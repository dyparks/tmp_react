var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

function exampleData() {
  return  [
      {
        "label": "One",
        "value" : 29.765957771107
      } ,
      {
        "label": "Two",
        "value" : 0
      } ,
      {
        "label": "Three",
        "value" : 32.807804682612
      } ,
      {
        "label": "Four",
        "value" : 196.45946739256
      } ,
      {
        "label": "Five",
        "value" : 0.19434030906893
      } ,
      {
        "label": "Six",
        "value" : 98.079782601442
      } ,
      {
        "label": "Seven",
        "value" : 13.925743130903
      } ,
      {
        "label": "Eight",
        "value" : 5.1387322875705
      }
    ];
}

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
  d3.select(ReactDOM.findDOMNode())
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
