<template>
  <div>
    <NodeRelationship
      :appear="true"
      :options="this.options"
      :noderelat="{}"
    />
  </div>
</template>
<script>
import NodeRelationship from '../../components/NodeRelationship';
export default {
  name: "Nodetopo",
  components:{
    NodeRelationship
  },
  data: function() {
    return {
      options : {
        autoResize: false,
        height: "500px",
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
      }
    };
  },
};
</script>
