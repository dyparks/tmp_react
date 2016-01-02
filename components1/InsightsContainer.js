var React = require('react');
var ReactDOM = require('react-dom');

var LineChart = require('../components/LineChartComponent');
var DiscreteChart = require('../components/DiscreteChartComponent');
var BulletChart = require('../components/BulletChartComponent');
var LineBarChart = require('../components/LineBarChartComponent');

var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var nv = require('nvd3');

var InsightContainer = React.createClass({
  displayName: 'InsightContainer',

  render: function () {
    return (
      <div>
        <LineChart />
        <DiscretChart />
        <BulletChart />
        <LineBarChart />
      </div> 
    );
  }
});

ReactDOM.render(<InsightContainer />, document.getElementById('insight_container'));
