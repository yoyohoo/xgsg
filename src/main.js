import Vue from 'Vue'
import VueRouter from "vue-router";
Vue.use(VueRouter);

import App from './App.vue'
import Home from '../src/components/home/index.vue'
import History from '../src/components/history/index.vue'
import Success from '../src/components/success/index.vue'
import Risk from '../src/components/risk/index.vue'

Vue.config.debug = true; //开启错误提示

window.onload = function() {

	const routes = [{
		path: '/',
		component: Home
	}, {
		path: '/home',
		component: Home
	}, {
		path: '/history',
		component: History
	}, {
		path: '/risk',
		component: Risk
	}, {
		path: '/success',
		component: Success
	}];
	const router = new VueRouter({
		routes // short for routes: routes
	});
	const app = new Vue({
		router,
		render: h => h(App),
		data: {
			user: {}
		}
	}).$mount('#app');
}