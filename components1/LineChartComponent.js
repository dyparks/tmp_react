var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

function sinAndCos() {
  var sin = [],
      sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({ x: i, y: Math.sin(i / 10) });
    sin2.push({ x: i, y: Math.sin(i / 10) * 0.25 + 0.5 });
    cos.push({ x: i, y: .5 * Math.cos(i / 10) });
  }

  //Line chart data should be sent as an array of series objects.
  return [{
    values: sin, //values - represents the array of {x,y} data points
    key: 'Sine Wave', //key  - the name of the series.
    color: '#ff7f0e' //color - optional: choose your own line color.
  }, {
    values: cos,
    key: 'Cosine Wave',
    color: '#2ca02c'
  }, {
    values: sin2,
    key: 'Another sine wave',
    color: '#7777ff',
    area: true //area - set to true if you want this line to turn into a filled area chart.
  }];
}

var myData = sinAndCos();

var line_chart = nv.models.lineChart().useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
.showLegend(false) //Show the legend, allowing users to turn on/off line series.
.showYAxis(true) //Show the y-axis
.showXAxis(false) //Show the x-axis
;

function drawLineChart(node, data) {
  nv.addGraph(function () {
    line_chart.xAxis //Chart x-axis settings
    .axisLabel('Time (ms)').tickFormat(d3.format(',r'));

    line_chart.yAxis //Chart y-axis settings
    .axisLabel('').tickFormat(d3.format('.02f'));

    d3.select(node) //Select the <svg> element you want to render the chart in.
    .datum(data) //Populate the <svg> element with chart data...
    .call(line_chart); //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function () {
      line_chart.update();
    });
    return line_chart;
  });
}

function updateLineChart(node, data) {
  d3.select(node).datum(data).call(line_chart);
}

var LineChart = React.createClass({
  displayName: 'LineChart',

  componentDidMount: function () {
    drawLineChart(ReactDOM.findDOMNode(this), myData);
  },
  componentDidUpdate: function () {
    updateLineChart(ReactDOM.findDOMNode(this), myData);
  },
  render: function () {
    return (
      <svg></svg>
    );
  }
});

module.exports = LineChart;
