var React = require('react');
var ReactDOM = require('react-dom');

var barOptions = {
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

var barData = {
    label: "bar",
    data: [
        [1, 34],
        [2, 25],
        [3, 19],
        [4, 34],
        [5, 32],
        [6, 44]
    ]
};


var BarChart = React.createClass({
    displayName: 'BarChart',
    renderChart: function() {
        var
            chartDiv = this.refs.barChartDiv,
            chartOptions = this.props.options;
            chartData = this.props.model,

        jQuery.plot(chartDiv, [barData], barOptions);
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
            ref: "barChartDiv",
        });
    }
});


module.exports = BarChart;
