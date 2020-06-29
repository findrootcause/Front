/<template>
  <div id="visualization"></div>
</template>

<script>
//按需引入
import { DataSet, Network } from 'vis/index-network';

export default {
  name: 'VisNetWork',
  data () {
    return {
      network: null
    }
  },
  mounted(){
    this.create();
  },
  methods: {
    create () {
      // create an array with nodes
      var nodes = new DataSet([
          {id: 1, label: 'Node 0',x:0,y:0},
          {id: 2, label: 'Node 58',x:0,y:30},
          {id: 3, label: 'Node 50',x:0,y:60},
          {id: 4, label: 'Node 17',x:40,y:0},
		  {id: 5, label: 'Node 33',x:40,y:30},
		  {id: 6, label: 'Node 4',x:40,y:60},
		  {id: 7, label: 'Node 83',x:40,y:90},
		  {id: 8, label: 'Node 93',x:80,y:0},
		  {id: 9, label: 'Node 15',x:80,y:30},
		  {id: 10, label: 'Node 31',x:80,y:60},
		  {id: 11, label: 'Node 73',x:80,y:90},
		  {id: 12, label: 'sys9',x:120,y:0},
		  {id: 13, label: 'sys7',x:120,y:30}
		  
      ]);

      // create an array with edges
      var edges = new DataSet([
          {from: 1, to: 4},
					{from: 1, to: 5},
					{from: 1, to: 6},
					{from: 1, to: 7},
					{from: 2, to: 4},
					{from: 2, to: 5},
					{from: 2, to: 6},
					{from: 2, to: 7},
					{from: 3, to: 4},
					{from: 3, to: 5},
					{from: 3, to: 6},
					{from: 3, to: 7},
					{from: 4, to: 8},
					{from: 4, to: 9},
					{from: 4, to: 10},
					{from: 4, to: 11},
					{from: 5, to: 8},
					{from: 5, to: 9},
					{from: 5, to: 10},
					{from: 5, to: 11},
					{from: 6, to: 8},
					{from: 6, to: 9},
					{from: 6, to: 10},
					{from: 6, to: 11},
					{from: 7, to: 8},
					{from: 7, to: 9},
					{from: 7, to: 10},
					{from: 7, to: 11},
					{from: 8, to: 12},
					{from: 8, to: 13},
					{from: 9, to: 12},
					{from: 9, to: 13},
					{from: 10, to: 12},
					{from: 10, to: 13},
					{from: 11, to: 12},
					{from: 11, to: 13},
					 
      ]);

      // create a network
      var container = document.querySelector('#visualization');

      // provide the data in the vis format
      var data = {
          nodes: nodes,
          edges: edges
      };
      var options = {
				//autoResize: true,
				width: '800 px',
				height: '500px',
				// nodes: { 
			 
			 //     shape: 'dot' 
			 
			 //    }, 
			 
			 //    edges: { 
			 
			 //     smooth: false 
			 
			 //    }, 
			 
			 //    physics: false, 
			 
			 //    interaction: { 
			 
			 //     dragNodes: false,// do not allow dragging nodes 
			 
			 //     zoomView: false, // do not allow zooming 
			 
			 //     dragView: false // do not allow dragging 
			 
			 //    } 
			 
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
}
</script>

<style>
	#visualization { 
	 
	    border: 1px solid black; 
	 
	    background: white; 
	 
	    display: inline-block; 
	 
	}
</style>
