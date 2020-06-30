<template>
<div>
	<h1>Sys_{{index}}内部节点拓扑图 :</h1>
	<h3>前三列为系统内部node,最后一列为该系统所连接的系统的第一列node</h3>
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
  name: "VisNetWork",
  data() {
    return {
      index:1,
			network: null,
				img0: [[0,58,50],[17,33,4,83],[93,15,31,73],[7,9]],
				img1: [[30,45,70],[37,21,55],[91,99,18,8,7],[8]],
				img2: [[57,20],[3,97,28],[39,94,86],[6,8]],
				img3: [[34,36,72,81],[77,62],[27,13,19,5,69,9],[1,5]],
				img4: [[14,26],[38,76,2,65],[82,74,60,85,6],[6,7]],
				img5: [[67,56],[48,59,32,25],[46,98,1,35],[4,10]],
				img6: [[53,63],[89,61],[51,24,23,54],[3,10]],
				img7: [[10,95,84,49],[41,88,43],[79,71,87],[4]],
				img8: [[68,78,92,16],[75,47],[80,12,44,22,66],[2]],
				img9: [[29,64,96],[90,11,42],[52,40],[2,4]],
				imgArr:[img0,img1,img2,img3,img4,img5,img6,img7,img8,img9]
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      // create an array with nodes
      var node = [];
      for(let i = 0; i <imgArr[this.index][0].length;i++){
          node.push(
            {
              id: i, label: "Node "+imgArr[this.index][0][i]
            }
          )
        }
        for(let i = 0; i <imgArr[this.index][1].length;i++){
          node.push(
            {
              id: i+imgArr[this.index][0].length, label: "Node "+imgArr[this.index][1][i]
            }
          )
        }
        for(let i = 0; i <imgArr[this.index][2].length;i++){
          node.push(
            {
              id: i+imgArr[this.index][0].length+imgArr[this.index][1].length, label: "Node "+imgArr[this.index][2][i]
            }
          )
        }
        for(let i = 0; i <imgArr[this.index][2].length;i++){
          node.push(
            {
              id: i+imgArr[this.index][0].length+imgArr[this.index][1].length+imgArr[this.index][2][i], label: "Sys "+imgArr[this.index][3][i]
            }
          )
        }
        
      var nodes = new DataSet(node
        //[
        // { id: 1, label: "Node 0" },
        // { id: 2, label: "Node 50" },
        // { id: 3, label: "Node 58" },
        // { id: 4, label: "Node 4" },
        // { id: 5, label: "Node 17" },
        // { id: 6, label: "Node 33" },
        // { id: 7, label: "Node 15" },
        // { id: 8, label: "Node 31" },
        // { id: 9, label: "Node 73" },
        // { id: 10, label: "Node 83" },
        // { id: 11, label: "Node 93" },
        // { id: 12, label: "sys7" },
        // { id: 13, label: "sys9" }
      //]
      );
      
      // create an array with edges
      var line = [];
      for(let i = 0; i <imgArr[this.index][0].length; i++){
        for(let j=0;j<imgArr[this.index][1].length; j++){
          line.push(
            {form: i, to: j+imgArr[this.index][0].length}
          )
        }
      }
      for(let i = 0; i <imgArr[this.index][1].length; i++){
        for(let j=0;j<imgArr[this.index][2].length; j++){
          line.push(
            {form: i+imgArr[this.index][0].length, to: j+imgArr[this.index][0].length+imgArr[this.index][1].length}
          )
        }
      }
      for(let i = 0; i <imgArr[this.index][2].length; i++){
        for(let j=0;j<imgArr[this.index][3].length; j++){
          line.push(
            {form: i+imgArr[this.index][0].length+imgArr[this.index][1].length, to: j+imgArr[this.index][0].length+imgArr[this.index][1].length+imgArr[this.index][2].length}
          )
        }
      }
      var edges = new DataSet(line
      //   [
      //   { from: 1, to: 4 },
      //   { from: 1, to: 5 },
      //   { from: 1, to: 6 },
      //   { from: 1, to: 7 },
      //   { from: 2, to: 4 },
      //   { from: 2, to: 5 },
      //   { from: 2, to: 6 },
      //   { from: 2, to: 7 },
      //   { from: 3, to: 4 },
      //   { from: 3, to: 5 },
      //   { from: 3, to: 6 },
      //   { from: 3, to: 7 },
      //   { from: 4, to: 8 },
      //   { from: 4, to: 9 },
      //   { from: 4, to: 10 },
      //   { from: 4, to: 11 },
      //   { from: 5, to: 8 },
      //   { from: 5, to: 9 },
      //   { from: 5, to: 10 },
      //   { from: 5, to: 11 },
      //   { from: 6, to: 8 },
      //   { from: 6, to: 9 },
      //   { from: 6, to: 10 },
      //   { from: 6, to: 11 },
      //   { from: 7, to: 8 },
      //   { from: 7, to: 9 },
      //   { from: 7, to: 10 },
      //   { from: 7, to: 11 },
      //   { from: 8, to: 12 },
      //   { from: 8, to: 13 },
      //   { from: 9, to: 12 },
      //   { from: 9, to: 13 },
      //   { from: 10, to: 12 },
      //   { from: 10, to: 13 },
      //   { from: 11, to: 12 },
      //   { from: 11, to: 13 }
      // ]
      );
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
              imageHeight: undefined,
              imageWidth: undefined,
              scaleFactor: 0.5,
              src: undefined,
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
          zoomView: true
        },
        layout: {
          randomSeed: undefined,
          hierarchical: {
            enabled: true,
            parentCentralization: true,
            direction: "LR", // UD, DU, LR, RL
            sortMethod: "directed", // hubsize, directed
            shakeTowards: "roots" // roots, leaves
          }
        },
        physics: {
          enabled: false
        }
      };
      //var network = new vis.Network(container, data, options);
      // Set the coordinate system of Network such that it exactly
      // matches the actual pixels of the HTML canvas on screen
      // this must correspond with the width and height set for
      // the networks container element.
      // network.moveTo({
      //     position: {x: 0, y: 0},
      //     offset: {x: -width/2, y: -height/2},
      //     scale: 1,
      // initialize your network!
      this.network = new Network(container, data, options);
      //})
    }
  }
};
  // export default{
  //   //name: Topo
  //   data(){
  //     return{
  //       index: 1,
  //       imgArr: ['/img/0.png','./img/1.png','./img/2.png','./img/3.png','./img/4.png','./img/5.png','./img/6.png','./img/7.png','./img/8.png','./img/9.png']
  //     }
  //   },
  //   methods:{
  //       // test: function(){
  //       //    console.log(this.imglist[this.index])
  //       // }
  //   }
  // }
</script>

<style>
  
  h1{
	  font-size: 24px;
  }
  #visualization {
  border: 1px solid black;
  background: white;
  display: inline-block;
}
</style>
