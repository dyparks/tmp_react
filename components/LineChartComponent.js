var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}

function drawLineChart (elementParent, data) {
  nv.addGraph(function() {
    var line_chart = nv.models.lineChart()
                  .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                  .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                  .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
                  .showYAxis(true)        //Show the y-axis
                  .showXAxis(true)        //Show the x-axis
    ;

    line_chart.xAxis     //Chart x-axis settings
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));

    line_chart.yAxis     //Chart y-axis settings
        .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));

    /* Done setting the chart up? Time to render it!*/
    var myData = data;   //You need data...

    d3.select(node)    //Select the <svg> element you want to render the chart in.
        .datum(myData)         //Populate the <svg> element with chart data...
        .call(line_chart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function() { line_chart.update() });
    return line_chart;
  });
}

var LineChart = React.createClass  ({
  componentDidMount: function() {
    drawLineChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  render: function() {
    return (
      <svg height='400px'></svg>
    );
  }
});

module.exports = LineChart;
