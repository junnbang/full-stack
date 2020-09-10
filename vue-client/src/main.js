import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
