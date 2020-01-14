import VueRouter from 'vue-router';

let mode = '';
if (process.env.NODE_ENV === 'production') mode = 'history';


const routes = [
    { path: '/', component: () => import('~v/index.vue'), name: 'index'},
];


export const router = new VueRouter({
    routes,
    mode,
});