<template>
  <div>
    <h1>Sys_{{index}}内部节点拓扑图 :</h1>
    <h3>前三列为系统内部node,最后一列为该系统所连接的其他系统</h3>
    <center>
      <div>
        <!-- <img :src="imgArr[index-1]" alt="系统内部节点拓扑图"> -->
        <div id="visualization"></div>
      </div>
      <a-pagination v-model:default-current="index" :total="100" />
    </center>
  </div>
</template>

<script>
import { DataSet, Network } from "vis/index-network";
export default {
  name: "nodetopo",
  data() {
    return {
      index: 1,
      network: null,
      img0: [
        [0, 58, 50],
        [17, 33, 4, 83],
        [93, 15, 31, 73],
        [7, 9]
      ],
      img1: [[30, 45, 70], [37, 21, 55], [91, 99, 18, 8, 7], [8]],
      img2: [
        [57, 20],
        [3, 97, 28],
        [39, 94, 86],
        [6, 8]
      ],
      img3: [
        [34, 36, 72, 81],
        [77, 62],
        [27, 13, 19, 5, 69, 9],
        [1, 5]
      ],
      img4: [
        [14, 26],
        [38, 76, 2, 65],
        [82, 74, 60, 85, 6],
        [6, 7]
      ],
      img5: [
        [67, 56],
        [48, 59, 32, 25],
        [46, 98, 1, 35],
        [4, 10]
      ],
      img6: [
        [53, 63],
        [89, 61],
        [51, 24, 23, 54],
        [3, 10]
      ],
      img7: [[10, 95, 84, 49], [41, 88, 43], [79, 71, 87], [4]],
      img8: [[68, 78, 92, 16], [75, 47], [80, 12, 44, 22, 66], [2]],
      img9: [
        [29, 64, 96],
        [90, 11, 42],
        [52, 40],
        [2, 4]
      ]
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
      var sum = 0;
      imgArr[this.index-1].forEach((element, index_a) => {
        element.forEach((nodename, index_b) => {
          if (index_a !== 3){
            node.push({
            id: sum,
            label: "Node " + String(nodename)
          });
          }
          else{
            node.push({
            id: sum,
            label: "SYS " + String(nodename)
          });
          }
          sum += 1;
        });
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
      var sum = 0;
      imgArr[this.index-1].forEach((element, index_a) => {
        if (index_a !== 3) {
          var to = imgArr[this.index-1][index_a+1]
          element.forEach((nodename,index_b) => {
            to.forEach((tonodename,index_c) =>{
              line.push({
              from: sum,
              to: sum -index_b + element.length + index_c
            });
            })
            sum += 1
          });
        }
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
