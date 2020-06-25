import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
