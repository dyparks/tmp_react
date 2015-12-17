var InsightSummary = React.createClass({
  render: function() {
    return (
      <div>
        <Treemap />
        <Linechart />
        <CampaignSummary />
      </div>
    );
  }
});

var Treemap = React.createClass({
  render: function() {
    /* TODO, CHECK D3 + REACT: https://github.com/skellyb/react-d3-wrap
    function position() {
      this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
    }
    
    var d3_json =
    '"name": "flare", "children": [ { "name": "vis", "children": [ { "name": "operator", "children": [ {"name": "PURCHASE", "size": 29100}, {"name": "VIEWCONTENT", "size": 103800}, {"name": "VISITS", "size": 183400} ] }, {"name": "NEW USER", "size": 14000000} ] } ] }'; 
  
    var margin = {top: 40, right: 10, bottom: 10, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var color = d3.scale.category20c();

    var treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.size; });

    var div = d3.select("body").append("div")
      .style("position", "relative")
      .style("width", (width + margin.left + margin.right) + "px")
      .style("height", (height + margin.top + margin.bottom) + "px")
      .style("left", margin.left + "px")
      .style("top", margin.top + "px");

    var node = div.datum(JSON.parse(d3_json)).selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .call(this.position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; });

    d3.selectAll("input").on("change", function change() {
      var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };
      node
        .data(treemap.value(value).nodes)
        .transition()
        .duration(1500)
        .call(this.position);
    });
    */
    return (
      <form>
        <label><input type="radio" name="mode" value="size" checked /> Size</label>
        <label><input type="radio" name="mode" value="count" /> Count</label>
      </form>
    );
  }
});

var Linechart = React.createClass({
  /*  TODO - SETUP Component
  renderChart: function() {
      var node = this.refs.chartNode.getDOMNode();;
      <script type="text/javascript">
          var d1 = [[1, 300], [2, 600], [3, 550], [4, 400], [5, 300]];
          $(document).ready(function () {
            $.plot($("#placeholder"), [d1]);
          });
        </script>
      });
  });
}
  */
  render: function() {
    return (
      <div>
        ADD TAG TO BE UPDATED HERE 
      </div>
    );
  }
});

var CampaignSummary = React.createClass({
  render: function() {
    return (
      <div>
        CampaignSummary
      </div>
    );
  }
});



ReactDOM.render(
  <InsightSummary />,
  document.getElementById('insight_container')
);
