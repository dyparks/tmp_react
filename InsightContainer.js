
var Bootsrap = require('react-bootstrap');
var Grid = Bootsrap.Grid;
var Row = Bootsrap.Row;
var Col = Bootsrap.Col;
var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require('./components/PieChartComponent.js');
var LineChart = require('./components/LineChartComponent.js');
var Parse = require('parse').Parse;

Parse.initialize("MKlW3fNIyL8vANQwzz6d2bgaHv7mW9YMb9M0bCoO", "Iy5f8ZfxxMSoYPlBVYUonN3tyjW0QlPi9r5Uwt0A");

var data = [
    {name: "New Users", count: 491900},
    {name: "Purchase Users", count: 34300}
];

var InsightContainer = React.createClass({

  getInitialState: function() {
    return {
      SegmentData: [],
      LineData: [],
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
      return perf.find();
    }).then(function(results) {
      data = here.convertLineData(results); 
      here.setState({
        LineData: [{
          values: data,
          key: 'JAMES LIN',
          color:'#2ca02c'
        }]
      })
    });
  },

  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}><h3>Summary</h3><p>Some summary text here.</p></Col>
          <Col xs={6} md={4}><PieChart data={this.state.SegmentData} /></Col>
          <Col xs={6} md={4}><LineChart data={this.state.LineData} /></Col>
        </Row>
      </Grid>
    );
  }
});

ReactDOM.render(<InsightContainer />, document.getElementById('insight_container'));
