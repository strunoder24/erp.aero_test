import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import 'normalize.css';
import '~/styles/common.scss';

import { router } from './routes';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});