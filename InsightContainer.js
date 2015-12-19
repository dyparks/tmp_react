
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

  componentWillMount: function() {
    var Strategy = Parse.Object.extend("strategies");
    var query = new Parse.Query(Strategy);
    var here = this;
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var data = {};
          var object = results[i];
          data[object.get('a')] = object.get('a_size');
          data[object.get('b')] = object.get('b_size');
        } 
        here.setState({
          SegmentData: [data]
        })
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    var Audiences = Parse.Object.extend("audiences");
    var query = new Parse.Query(Audiences);
    var here = this;
    query.equalTo('name', 'PURCHASE_WAU');
    query.find({
      success: function(results) {
        var data_list = [];
        for (var i = 0; i < results.length; i++) {
          var data = {};
          var object = results[i];
          data[i] = object.get('approximate_count');
          data_list.push(data);
        }
        here.setState({
          LineData: data_list
        })
        console.log(data_list);
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
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
