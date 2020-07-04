import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;
Vue.prototype.FORM_UPDATE = 'FORM_UPDATE';
Vue.prototype.FORM_INSERT = 'FORM_INSERT';

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
