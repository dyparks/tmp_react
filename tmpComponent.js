function createChart(dom, props){
  var width = props.width;
  var height = props.height;
    width = width + 200;
  var data = props.data;
  var sum = data.reduce(function(memo, num){ return memo + num.count; }, 0);
  var chart = d3.select(dom).append('svg').attr('class', 'd3').attr('width', width).attr('height', height)
        .append("g")
          .attr("transform", "translate(" + (props.width/2) + "," + (height/2) + ")");
  var outerRadius = props.width/2.2;
  var innerRadius = props.width/8;
  var arc = d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

  var colors = ['#FD9827', '#DA3B21', '#3669C9', '#1D9524', '#971497'];
  var pie = d3.layout.pie()
      .value(function (d) { return d.count; });

  var g = chart.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("click", function(d) {
          alert('you clicked ' + d.data.name)
        })
        .on('mouseover', function (d, i) {
          d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', function (d) {
              var dist = 10;
              d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
              var x = Math.sin(d.midAngle) * dist;
              var y = -Math.cos(d.midAngle) * dist;
              return 'translate(' + x + ',' + y + ')';
            });
          d3.select(this).append("text").style("fill", function(d) { return colors[i]; }).attr("id", "percent")
          .attr('transform', "translate(0,-5)")
          .attr("text-anchor", "middle").attr("dy", ".35em").style("font", "bold 15px Arial")
          .text(function(d) { return (((d.value/sum)*100).toFixed(1) + " %"); });
          g.filter(function(e) { return e.value != d.value; }).style('opacity',0.5);
        }).on('mouseout', function (d, i) {
            d3.select(this)
            .transition()
            .duration(500)
            .ease('bounce')
            .attr('transform', 'translate(0,0)');
            d3.select("#percent").remove();
            g.filter(function(e) { return e.value != d.value; }).style('opacity',1)
          });

  g.append("path")
    .style("fill", function(d, i) { return colors[i]; })
    .transition().delay(function(d, i) { return i * 400; }).duration(500)
    .attrTween('d', function(d) {
         var i = d3.interpolate(d.startAngle, d.endAngle);
         return function(t) {
             d.endAngle = i(t);
           return arc(d);
         }
    });
  var center =
  g.filter(function(d) { return d.endAngle - d.startAngle > .1; }).append("text").style("fill", "white")
    .attr('transform', function(d){
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle").attr("dy", ".35em")
    .text(function(d) { return d.value; });

    var legend = chart.selectAll(".legend")
    .data(data)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
    return "translate(150," + (-i * 20) + ")";
    });

    var rect = legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return colors[i]; }).style('opacity', 0);

    var name = legend.append("text")
        .attr("x", 24)
        .attr("y", 12)
        .text(function (d) {
          var text = d.name;
          if(text.length >30){
            text = text.substring(0,26);
            text = text + '...';
          }
        return text;
    }).style('opacity', 0);
    rect.transition().delay(function(d, i) { return i * 400; }).duration(1000).style('opacity',1);
    name.transition().delay(function(d, i) { return i * 400; }).duration(1000).style('opacity',1);

};

var PieChart = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
  },

  getDefaultProps: function() {
    return {
      width: 300,
      height: 350,
      title: '',
      Legend: true,
    };
  },

  render: function() {
    return (
      <div>
      </div>
    );
  },
  componentDidMount: function() {
    var dom =  this.getDOMNode();
    createChart(dom, this.props);
  },
  shouldComponentUpdate: function() {
      var dom =  this.getDOMNode();
      createChart(dom, this.props);
      return false;
  }
});

var HighchartsBar = React.createClass({displayName: 'HighchartsBar',
  renderChart: function() {
        var node = this.refs.chartNode.getDOMNode();
        var dataSeries = [[0, 3], [4, 8], [8, 5], [9, 13]];
        jQuery(function ($) {
        $(node).highcharts({
            chart: {
              plotBackgroundColor: '#EFEFEF',
                height:300,
                type: 'bar'
            },
            series: dataSeries
        });
    });

  },
  componentDidUpdate: function() {
    this.renderChart(); // after the component props are updated, render the chart into the DOM node
  },
  render: function() {
    return (
      React.DOM.div({className: "chart", ref: "chartNode"})
    );
  }
});

var data = [
    {name: "New Users", count: 491900},
    {name: "Purchase Users", count: 34300}
];

var JamesLin = React.createClass({
  render: function() {
    return (
      <div>
        <PieChart data={data}/>
        <HighchartsBar />
      </div>
    );
  }
});

ReactDOM.render(<JamesLin />, document.getElementById('insight_container'));
