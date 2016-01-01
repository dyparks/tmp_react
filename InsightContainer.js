
var Bootsrap = require('react-bootstrap');
var Grid = Bootsrap.Grid;
var Row = Bootsrap.Row;
var Col = Bootsrap.Col;
var React = require('react');
var ReactDOM = require('react-dom');
var ChartContainer = require('./components/ChartContainerComponent.js');
var PieChart = require('./components/PieChartComponent.js');
var LineChart = require('./components/LineChartComponent.js');
var BarChart = require('./components/BarChartComponent.js');
var StackedAreaChart = require('./components/StackedAreaComponent.js');
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
  console.log("123123132")
  tdata = [
  {"key":"Total Growth","values":[["2015-12-11",10300],["2015-12-12",10400],["2015-12-13",10400],["2015-12-14",10666.66667],["2015-12-16",12800],["2015-12-17",13700],["2015-12-18",14100],["2015-12-19",14675],["2015-12-20",15000],["2015-12-21",15300]]},  {"key":"Ad Spend","values":[["2015-12-11",0], ["2015-12-12",3],["2015-12-13",5],["2015-12-14",10],["2015-12-16",485],["2015-12-17",631],["2015-12-18",508],["2015-12-19",515],["2015-12-20",758],["2015-12-21",800]]}
  ,{"key":"Ad Spend", "values": [
  ["2015-12-11",0],
  ["2015-12-12",0],
  ["2015-12-13",0],
  ["2015-12-14",0],
  ["2015-12-16",50000],
  ["2015-12-17",50000],
  ["2015-12-18",50000],
  ["2015-12-19",49460],
  ["2015-12-20",200000],
  ["2015-12-21",117073]
]}
 ];
  return (
        <Row>
          <ChartContainer title="Chart 1" description="discription1"> <LineChart data={this.state.LineData} /></ChartContainer>
          <ChartContainer title="Chart 2" description="discription2"> <LineChart data={this.state.LineData} /></ChartContainer>
          <ChartContainer title="Chart 3" description="discription3"> <LineChart data={this.state.LineData} /></ChartContainer>
        </Row>
    );
  }
});

ReactDOM.render(<InsightContainer />, document.getElementById('insight_container'));
