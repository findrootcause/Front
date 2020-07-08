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
  name: "causevisualization",
  props: {
    options: Object,
    thenode: Array,
    theedge: Array,
  },
  data: function() {
    return {
      network: null
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      var nodes = new DataSet(this.thenode);
      var edges = new DataSet(this.theedge);
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