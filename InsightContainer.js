
var Bootsrap = require('react-bootstrap');
var Grid = Bootsrap.Grid;
var Row = Bootsrap.Row;
var Col = Bootsrap.Col;
var React = require('react');
var ReactDOM = require('react-dom');

var ChartContainer = require('./components/ChartContainerComponent.js');
var LineChart = require('./components1/LineChartComponent');
var DiscreteChart = require('./components1/DiscreteChartComponent');
var BulletChart = require('./components1/BulletChartComponent');
var LineBarChart = require('./components1/LineBarChartComponent');
var FlotChart = require('./components1/FlotChartComponent');

var Parse = require('parse').Parse;

Parse.initialize("MKlW3fNIyL8vANQwzz6d2bgaHv7mW9YMb9M0bCoO", "Iy5f8ZfxxMSoYPlBVYUonN3tyjW0QlPi9r5Uwt0A");

var InsightContainer = React.createClass({

  getInitialState: function() {
    return {
      SegmentData: [],
      LineData: [],
      BarData: [],
    };
  },

  convertSegmentData: function(results) {
    data = [];
    var object = results[0];
    entry_a = {};
    entry_b = {};
    entry_a["label"] = object.get('a');
    entry_a["value"] = object.get('a_size');
    entry_b["label"] = object.get('b');
    entry_b["value"] = object.get('b_size');
    data.push(entry_a);
    data.push(entry_b);
    return data;
  },

  convertLineData: function(results) {
    var data_list = [];
      for (var i = 0; i < results.length; i++) {
        var data = {};
        var object = results[i];
        data['x'] = i
        data['y'] = object.get('approximate_count');
        data_list.push(data);
      }
    return data_list;
  },

  convertBarData: function(results) {
    data = {};
    data['title'] = 'Purchase';
    data['subtitle'] = 'cost per purchase';
    data['ranges'] = [1511, 9000, 13154]; //clicks, reach, total_audience
    data['measures'] = [310]; //conversions
    data['markers'] =  [10000]; //low bar
    return data;
  },

  componentWillMount: function() {
    var strategyQuery = new Parse.Query('strategies');
    var here = this;
    strategyQuery.find().then(function(segment_results) {
      data = here.convertSegmentData(segment_results);
      here.setState({
        SegmentData: data
      })
      var perf = new Parse.Query('audiences');
      perf.equalTo('name', data[1]['label']);
      perf.ascending('createdAt');
      return perf.find();
    }).then(function(results) {
      data1 = here.convertLineData(results);
      here.setState({
        BarData: here.convertBarData(),
        LineData: [{
          values: data1,
          key: 'JAMES LIN',
          color:'#2ca02c'
        }]
      })
    });
  },

  render: function() {
    return (
        <Row>
          <ChartContainer title="Chart 1" description="discription1"> 
            <FlotChart />
          </ChartContainer>
        </Row>
    );
  }
});

ReactDOM.render(<InsightContainer />, document.getElementById('insight_container'));
