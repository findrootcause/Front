<template>
<div>
	<h1>Sys_{{index}}内部节点拓扑图 :</h1>
	<h3>前三列为系统内部node,最后一列为该系统所连接的系统的第一列node</h3>
  <center>
    <div>
    <img :src="imgArr[index-1]" alt="系统内部节点拓扑图">
	</div>
   <a-pagination v-model:default-current="index" :total="100" />
  </center>
</div>

</template>

<script>
  export default{
    //name: Topo
    data(){
      return{
        index: 1,
        imgArr: ['/img/0.png','./img/1.png','./img/2.png','./img/3.png','./img/4.png','./img/5.png','./img/6.png','./img/7.png','./img/8.png','./img/9.png']
      }
    },
    methods:{
        // test: function(){
        //    console.log(this.imglist[this.index])
        // }
    }
  }
</script>

<style>
  
  h1{
	  font-size: 24px;
  }
</style>
