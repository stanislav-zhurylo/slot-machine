import Vue from 'vue'
import store from './store'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = new Vue({
    store,
    template: '<App/>',
    components: {App}
});

app.$mount('#app');
