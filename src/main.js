import './styles/styles.sass'

import Vue from 'vue'
import router from './router'
import moment from 'moment'
import vueMoment from 'vue-moment'
require('moment/locale/ru')
import vOutsideEvents from 'vue-outside-events'

import App from './components/app.vue'

Vue.use(moment);
Vue.use(vueMoment);
Vue.use(vOutsideEvents);

const initVueApp = function (){
  var vueApp = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

initVueApp()
