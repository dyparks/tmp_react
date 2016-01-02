var React = require('react');
var ReactDOM = require('react-dom');
var nv = require('nvd3');

var chart = nv.models.bulletChart();

function drawBarChart (node, data) {
  d3.select('#chart div')
    .datum(data)
    .transition().duration(1000)
    .call(chart);
}

function updateBarChart (node, data) {
  d3.select(node)
    .datum(data)
    .call(chart);
}

var ChartContainer = React.createClass  ({
  componentDidMount: function() {
    //drawBarChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  componentDidUpdate: function() {
    //updateBarChart(ReactDOM.findDOMNode(this), this.props.data);
  },
  render: function() {
    return (
      <div className="col-lg-6">
          <div className="ibox float-e-margins">
              <div className="ibox-title">
                  <h5>{this.props.title}<small>{this.props.description}</small></h5>
                  <div className="ibox-tools">
                      <a className="collapse-link">
                          <i className="fa fa-chevron-up"></i>
                      </a>
                      <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                          <i className="fa fa-wrench"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-user">
                          <li><a href="#">Config option 1</a>
                          </li>
                          <li><a href="#">Config option 2</a>
                          </li>
                      </ul>
                      <a className="close-link">
                          <i className="fa fa-times"></i>
                      </a>
                  </div>
              </div>
              <div className="ibox-content">
                  <div className="flot-chart">
                      {this.props.children}
                  </div>
              </div>
          </div>
      </div>
    );
  }
});

module.exports = ChartContainer;
