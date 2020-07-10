<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1" @click="home">
          <a-icon type="user" />
          <!-- <router-link to="/home">首页</router-link> -->
          <span>首页</span>
        </a-menu-item>
        
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="pie-chart" /><span>关系拓扑图</span></span>
          <a-menu-item key="3" @click="sys_topo">
            系统关系拓扑图
          </a-menu-item>
          <a-menu-item key="4" @click="node_topo">
            系统内部节点关系拓扑图
          </a-menu-item>
          <!-- <a-menu-item key="5">
            Alex
          </a-menu-item> -->
        </a-sub-menu>
		<a-menu-item key="2" @click="analyze">
          <a-icon type="desktop" />
          <span>实时分析</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <!-- <a-breadcrumb-item>work</a-breadcrumb-item> -->
          <a-breadcrumb-item>{{way2}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {
      collapsed: false,
	  way2: '首页'
    };
  },

  methods:{
    home: function(){
      this.$router.replace('/home');
      this.way2 = '首页'
    },
	sys_topo: function(){
		this.$router.replace('/systopo');
		this.way2 = '系统间关系拓扑图'
	},
    node_topo: function(){
      this.$router.replace('/nodetopo');
      this.way2 = '系统内部节点关系拓扑图'
    },
	analyze: function(){
	  this.$router.replace('/analyze');
	  this.way2 = '实时分析'
	}
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: #001529 url(./logo.png) no-repeat;
  background-size: 168px 32px;
  margin: 16px;
}
</style>
