<template>
  <!-- <div id="visualization"></div> -->
	<h1>sys拓扑图</h1>
</template>

<script>
//按需引入
// import { DataSet, Network } from "vis/index-network";
// export default {
//   name: "VisNetWork",
//   data() {
//     return {
// 			index:1,
// 			network: null,
// 				img0: [[0,58,50],[17,33,4,83],[93,15,31,73],[7,9]],
// 				img1: [[30,45,70],[37,21,55],[91,99,18,8,7],[8]],
// 				img2: [[57,20],[3,97,28],[39,94,86],[6,8]],
// 				img3: [[34,36,72,81],[77,62],[27,13,19,5,69,9],[1,5]],
// 				img4: [[14,26],[38,76,2,65],[82,74,60,85,6],[6,7]],
// 				img5: [[67,56],[48,59,32,25],[46,98,1,35],[4,10]],
// 				img6: [[53,63],[89,61],[51,24,23,54],[3,10]],
// 				img7: [[10,95,84,49],[41,88,43],[79,71,87],[4]],
// 				img8: [[68,78,92,16],[75,47],[80,12,44,22,66],[2]],
// 				img9: [[29,64,96],[90,11,42],[52,40],[2,4]],
// 				imgArr:[img0,img1,img2,img3,img4,img5,img6,img7,img8,img9]
//     };
//   },
//   mounted() {
//     this.create();
//   },
//   methods: {
//     create() {
//       // create an array with nodes
		 
// 		  var node = [];
//       for(let i = 0; i <imgArr[1][0].length;i++){
//           node.push(
//             {
//               id: i, label: "Node "+imgArr[1][0][i]
//             }
//           )
//         }
//         for(let i = 0; i <imgArr[1][1].length;i++){
//           node.push(
//             {
//               id: i+imgArr[1][0].length, label: "Node "+imgArr[1][1][i]
//             }
//           )
//         }
//         for(let i = 0; i <imgArr[1][2].length;i++){
//           node.push(
//             {
//               id: i+imgArr[1][0].length+imgArr[1][1].length, label: "Node "+imgArr[1][2][i]
//             }
//           )
//         }
        
//       var nodes = new DataSet(node
        
//       );
      
//       // create an array with edges
//       var line = [];
//       for(let i = 0; i <imgArr[1][0].length; i++){
//         for(let j=0;j<imgArr[1][1].length; j++){
//           line.push(
//             {form: i, to: j+imgArr[1][0].length}
//           )
//         }
//       }
//       for(let i = 0; i <imgArr[1][1].length; i++){
//         for(let j=0;j<imgArr[1][2].length; j++){
//           line.push(
//             {form: i+imgArr[1][0].length, to: j+imgArr[1][0].length+imgArr[1][1].length}
//           )
//         }
//       }
//       for(let i = 0; i <imgArr[1][2].length; i++){
//         for(let j=0;j<imgArr[1][3].length; j++){
//           line.push(
//             {form: i+imgArr[1][0].length+imgArr[1][1].length, to: j+imgArr[1][0].length+imgArr[1][1].length+imgArr[1][2].length}
//           )
//         }
//       }
//       var edges = new DataSet(line
     
//       );
//       // create a network
//       var container = document.querySelector("#visualization");
//       // provide the data in the vis format
//       var data = {
//         nodes: nodes,
//         edges: edges
//       };
//       var options = {
//         autoResize: false,
//         height: "400px",
//         width: "600px",
//         edges: {
//           arrows: {
//             to: {
//               enabled: true,
//               imageHeight: undefined,
//               imageWidth: undefined,
//               scaleFactor: 0.5,
//               src: undefined,
//               type: "arrow"
//             }
//           },
//           chosen: false,
//           labelHighlightBold: false,
//           smooth: {
//             enabled: true,
//             type: "straightCross",
//             roundness: 1
//           }
//         },
//         interaction: {
//           dragNodes: false,
//           dragView: false,
//           selectable: false,
//           selectConnectedEdges: false,
//           tooltipDelay: 300,
//           zoomView: true
//         },
//         layout: {
//           randomSeed: undefined,
//           hierarchical: {
//             enabled: true,
//             parentCentralization: true,
//             direction: "LR", // UD, DU, LR, RL
//             sortMethod: "directed", // hubsize, directed
//             shakeTowards: "roots" // roots, leaves
//           }
//         },
//         physics: {
//           enabled: false
//         }
//       };
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
//       this.network = new Network(container, data, options);
//       //})
//     }
//   }
// };
</script>

<style>
#visualization {
  border: 1px solid black;
  background: white;
  display: inline-block;
}
</style>