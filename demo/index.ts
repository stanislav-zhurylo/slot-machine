import Vue from 'vue';
import store from '../src/store'
import App from '../src/App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = new Vue({
    store,
    template: '<App/>',
    components: {App}
});

app.$mount('#app');