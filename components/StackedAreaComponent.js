var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

var chart = nv.models.stackedAreaChart()
            .margin({right: 100})
	    .x(function(d) { return (new Date(d[0])).getTime() })   //We can modify the data accessor functions...
            .y(function(d) { return d[1] })   //...in case your data is formatted different
            .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
            .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
            .showControls(true)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
	    .clipEdge(true);

function drawBarChart (node, data) {
  //Format x-axis labels with custom function.
  chart.xAxis
      .tickFormat(function(d) { 
        return d3.time.format('%x')(new Date(d)) 
  });

  chart.yAxis
      .tickFormat(d3.format(',.2f'));

  d3.select(node)
    .datum(data)
    .call(chart);
}

function updateBarChart (node, data) {
  d3.select(node)
    .datum(data)
    .call(chart);
}

var StackedAreaChart = React.createClass  ({
  componentDidMount: function() {
    drawBarChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  componentDidUpdate: function() {
    updateBarChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  render: function() {
    return (
      <svg height='400px'></svg>
    );
  }
});

module.exports = StackedAreaChart;
