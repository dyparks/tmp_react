
var Bootsrap = require('react-bootstrap');
var Grid = Bootsrap.Grid;
var Row = Bootsrap.Row;
var Col = Bootsrap.Col;
var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require('./components/PieChartComponent.js');


var data = [
    {name: "New Users", count: 491900},
    {name: "Purchase Users", count: 34300}
];


var InsightContainer = React.createClass({
  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}><h3>Summary</h3><p>Some summary text here.</p></Col>
          <Col xs={6} md={4}><PieChart /></Col>
          <Col xs={6} md={4}><code>&lt;{'Insert Line chart here.'} /&gt;</code></Col>
        </Row>
      </Grid>
    );
  }
});

ReactDOM.render(<InsightContainer />, document.getElementById('insight_container'));
