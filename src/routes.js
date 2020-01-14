import VueRouter from 'vue-router';
import { store } from '~s'

let mode = '';
if (process.env.NODE_ENV === 'production') mode = 'history';


const routes = [
    { path: '/', component: () => import('~p/index.vue'), name: 'index'},
];


export const router = new VueRouter({
    routes,
    mode,
});