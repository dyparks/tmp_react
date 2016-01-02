var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

function exampleData() {
  return [{
    key: "Cumulative Return",
    values: [{
      "label": "A Label",
      "value": -29.765957771107
    }, {
      "label": "B Label",
      "value": 0
    }, {
      "label": "C Label",
      "value": 32.807804682612
    }, {
      "label": "D Label",
      "value": 196.45946739256
    }, {
      "label": "E Label",
      "value": 0.19434030906893
    }, {
      "label": "F Label",
      "value": -98.079782601442
    }, {
      "label": "G Label",
      "value": -13.925743130903
    }, {
      "label": "H Label",
      "value": -5.1387322875705
    }]
  }];
}

var myData = exampleData();

var discrete_chart = nv.models.discreteBarChart().x(function (d) {
  return d.label;
}) //Specify the data accessors.
.y(function (d) {
  return d.value;
}).staggerLabels(true) //Too many bars and not enough room? Try staggering labels.
.duration(350).showValues(true) //...instead, show the bar value right on top of each bar.
;

function drawDiscreteChart(node, data) {
  nv.addGraph(function () {
    d3.select(node).datum(data).call(discrete_chart);

    nv.utils.windowResize(discrete_chart.update);

    return discrete_chart;
  });
}

function updateDiscreteChart(node, data) {
  d3.select(node).datum(data).call(discrete_chart);
}

var DiscreteChart = React.createClass({
  displayName: 'DiscreteChart',

  componentDidMount: function () {
    drawDiscreteChart(ReactDOM.findDOMNode(this), myData);
  },

  componentDidUpdate: function () {
    updateDiscreteChart(ReactDOM.findDOMNode(this), myData);
  },

  render: function () {
    return (
      <svg></svg>
    );
  }
});

module.exports = DiscreteChart;
