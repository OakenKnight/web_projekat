const Login = {template: '<login></login>'}
const Reserve = {template: '<reserve></reserve>'}
const ResetPassword = {template: '<resetPassword></resetPassword>'}
const Register = {template: '<register></register>'}
const Contact = {template: '<contact></contact>'}
const About = {template: '<about></about>'}
const Welcome = {template: '<welcome></welcome>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/login', component: Login},
	    { path: '/reset', component: ResetPassword},
	    { path: '/register', component: Register },
	    { path: '/contact', component: Contact },
		{ path: '/about', component: About },
		{ path: '/reserve', component: Reserve },
	    { path: '/', component: Welcome }
	  ]
});

var app = new Vue({
	router,
	el: '#app',
});
