<template>
  <div>
    <center>
      <div>
        <div id="visualization"></div>
      </div>
    </center>
  </div>
</template>


<script>
import { DataSet, Network } from "vis/index-network";
export default {
  name: "commondraw",
  props: {
    options: Object,
    thenode: Object,
    theedge: Array,
  },
  data: function() {
    return {
      network: null
    };
  },
  computed: {
    nodes: function() {
      var node = [];
      var id = 0;
      for (let key in this.thenode) {
        node.push({
          id: id,
          label: key,
          chosen: false,
          color: {
            border: "green",
            background: "green"
          },
          title: '<span>系统内部告警种类个数与节点数占比：</span>'+this.thenode[key],
        });
        id = id+1
      }
      return node;
    },
    edges: function() {
      var key = Object.keys(this.thenode)
      var edge = [];
      console.log(this.theedge)
      this.theedge.forEach(element => {
        edge.push({
            from: key.indexOf(element[0]),
            to: key.indexOf(element[1]),
        });
      });
      return edge;
    }
  },
  watch: {
    index: function(newindex) {
      this.network.destroy();
      this.create();
    }
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      var nodes = new DataSet(this.nodes);
      var edges = new DataSet(this.edges);
      var container = document.querySelector("#visualization");
      var data = {
        nodes: nodes,
        edges: edges
      };
      this.network = new Network(container, data, this.options);
    }
  }
};
</script>

<style>
h1 {
  font-size: 24px;
}
#visualization {
  border: 1px solid black;
  background: white;
  display: inline-block;
}
</style>