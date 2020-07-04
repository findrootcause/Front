import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
import axios from 'axios';
import "vis/dist/vis.css";
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
