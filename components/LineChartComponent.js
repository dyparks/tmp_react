var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

var line_chart = nv.models.lineChart()
	  .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
	  .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
	  .showYAxis(true)        //Show the y-axis
	  .showXAxis(false)        //Show the x-axis
;

function drawLineChart (node, data) {
    nv.addGraph(function() {
    line_chart.xAxis     //Chart x-axis settings
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));

    line_chart.yAxis     //Chart y-axis settings
        .axisLabel('')
        .tickFormat(d3.format('.02f'));

    d3.select(node)    //Select the <svg> element you want to render the chart in.
        .datum(data)         //Populate the <svg> element with chart data...
        .call(line_chart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function() { line_chart.update() });
    return line_chart;
  });
}

function updateLineChart (node, data) {
  d3.select(node)
    .datum(data)
    .call(line_chart);
}

var LineChart = React.createClass  ({
  componentDidMount: function() {
    drawLineChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  componentDidUpdate: function() {
    updateLineChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  render: function() {
    return (
      <svg viewBox="0 0 522 200"></svg>
    );
  }
});

module.exports = LineChart;
