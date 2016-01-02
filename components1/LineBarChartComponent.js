var React = require('react');
var ReactDOM = require('react-dom');

var data1 = [
        [1354586000000, 153], [1364587000000, 658], [1374588000000, 198],
        [1384589000000, 663], [1394590000000, 801], [1404591000000, 1080],
        [1414592000000, 353], [1424593000000, 749], [1434594000000, 523],
        [1444595000000, 258], [1454596000000, 688], [1464597000000, 364]
    ];

var data2 = [
        [1354586000000, 53], [1364587000000, 65], [1374588000000, 98],
        [1384589000000, 83], [1394590000000, 980], [1404591000000, 808],
        [1414592000000, 720], [1424593000000, 674], [1434594000000, 23],
        [1444595000000, 79], [1454596000000, 88], [1464597000000, 36]
    ];

var chartData = [{
        label: "data1",
        data: data1,
        bars: {
            show: true,
            barWidth: 30 * 60 * 60 * 1000 * 80
        }
    },{
        label: "data2",
        data: data2,
        lines: {
            show: true
        },
        points:{
            show:true
        }
    }];

var chartOptions = {
        series: {
        bars: {
            show: true,
            barWidth: 0.6,
            fill: true,
            fillColor: {
                colors: [{
                    opacity: 0.8
                }, {
                    opacity: 0.8
                }]
            }
        }
    },
    xaxis: {
        tickDecimals: 0
    },
    colors: ["#1ab394"],
    grid: {
        color: "#999999",
        hoverable: true,
        clickable: true,
        tickColor: "#D4D4D4",
        borderWidth: 0
    },
    legend: {
        show: false
    },
    tooltip: true,
    tooltipOpts: {
        content: "x: %x, y: %y"
    }
};

var BarLineChart = React.createClass({
  displayName: 'BarLineChart',
  renderChart: function() {
    var
      chartDiv = this.refs.barLineDiv;
      // chartOptions = this.props.options;
      jQuery.plot(chartDiv, chartData, chartOptions);
  },
  componentWillReceiveProps: function(nextProps) {
    // called to see if the component is receiving props
  },
  shouldComponentUpdate: function(nextProps, nextState) {
        // called to ask whether the component should be updated
    return true;
  },
  componentDidMount: function() {
    // called when the component is mounted
    this.renderChart();
  },
  componentDidUpdate: function() {
        // called after the props are updated
    this.renderChart();
  },
  render: function() {
    return React.DOM.div({
            className: "flot-chart-content",
            ref: "barLineDiv"});
  }
});

module.exports = BarLineChart;