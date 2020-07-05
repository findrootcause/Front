<template>
  <div>
    <center>
      <h1>Sys关系拓扑图 :</h1>
      <div>
        <div id="visualization"></div>
      </div>
      <a-pagination v-model:default-current="index" :total="100" />
    </center>
  </div>
</template>

<script>
import { DataSet, Network } from "vis/index-network";
export default {
  name: "VisNetWork2",
  data() {
    return {
      index: 1,
      network: null,
      img0:[7,9],
      img1:[8],
      img2:[6,8],
      img3:[1,5],
      img4:[6,7],
      img5:[4,10],
      img6:[3,10],
      img7:[4],
      img8:[2],
      img9:[4,2]
    };
  },
  computed: {
    nodes: function() {
      var imgArr = [
        this.img0,
        this.img1,
        this.img2,
        this.img3,
        this.img4,
        this.img5,
        this.img6,
        this.img7,
        this.img8,
        this.img9
      ];
      var node = [];
      var sum = 1;
      node.push({
        id:0,
        label: "Sys" + this.index
      })
      imgArr[this.index-1].forEach((element, index_a) => {
         
            node.push({
            id: sum,
            label: "Sys " + element
          });
          
          
          
          sum += 1;
        });
      return node;
    },
    edges: function() {1
      var imgArr = [
        this.img0,
        this.img1,
        this.img2,
        this.img3,
        this.img4,
        this.img5,
        this.img6,
        this.img7,
        this.img8,
        this.img9
      ];
      var line = [];
      imgArr[this.index-1].forEach((element, index_a) => {
        // if (index_a !== 3) {
        //   var to = imgArr[this.index-1][index_a+1]
        //   element.forEach((nodename,index_b) => {
        //     to.forEach((tonodename,index_c) =>{
        //       line.push({
        //       from: sum,
        //       to: sum -index_b + element.length + index_c
        //     });
        //     })
        //     sum += 1
        //   });
        // }
        line.push({
          from: 0,
          to: index_a+1
        })
      });

      return line;
    }
  },
  watch: {
    index: function (newindex) {
      this.network.destroy()
      this.create();
    }
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      var nodes = new DataSet(
        this.nodes
      );
      // create an array with edges
      var edges = new DataSet(
        this.edges
      )
      // create a network
      var container = document.querySelector("#visualization");
      // provide the data in the vis format
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {
        autoResize: false,
        height: "400px",
        width: "600px",
        edges: {
          arrows: {
            to: {
              enabled: true,
              scaleFactor: 0.5,
              type: "arrow"
            }
          },
          chosen: false,
          labelHighlightBold: false,
          smooth: {
            enabled: true,
            type: "straightCross",
            roundness: 1
          }
        },
        interaction: {
          dragNodes: false,
          dragView: false,
          selectable: false,
          selectConnectedEdges: false,
          tooltipDelay: 300,
          zoomView: false
        },
        layout: {
          randomSeed: undefined,
          hierarchical: {
            enabled: true,
            parentCentralization: true,
            direction: "LR", 
            sortMethod: "directed",
          }
        },
        physics: {
          enabled: false
        }
      };
      this.network = new Network(container, data, options);
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
