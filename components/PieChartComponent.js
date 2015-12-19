var React = require('react');
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

function drawPieChart (elementParent) {
  nv.addGraph(function() {
    var pieChart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

    d3.select("#pie-chart svg")
        .datum(exampleData())
        .transition().duration(350)
        .call(pieChart);

    return pieChart;
  });
}

function updatePieChart (elementParent, data) {
  d3.select('#' + elementParent + ' svg')
    .datum(data)
    .call(pieChart);
}

var PieChart = React.createClass  ({
  componentDidMount: function() {
    drawPieChart('pie-chart');
  },
  componentDidUpdate: function() {
    updatePieChart('pie-chart');
  },
  render: function() {
    return (
      <div id='pie-chart'>
        <svg></svg>
      </div>
    );
  }
});

module.exports = PieChart;