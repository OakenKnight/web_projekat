
const Login = {template: '<login></login>'}
const Reserve = {template: '<reserve></reserve>'}
const ResetPassword = {template: '<resetPassword></resetPassword>'}
const Register = {template: '<register></register>'}
const Contact = {template: '<contact></contact>'}
const About = {template: '<about></about>'}
const Welcome = {template: '<welcome></welcome>'}
const Housekeeper = {template: '<housekeeper></housekeeper>'}
const ApartmentDetails = {template: '<apartmentDetails></apartmentDetails>'}
const GuestPofile = {template: '<guestProfile></guestProfile>'}
const Admin = {template: '<admin></admin>'}
const algoliaPLACES = {template: '<algoliaPLACES></algoliaPLACES>'}
const addApartment = {template: '<addApartment></addApartment>'}
const editApartment={template:'<editApartment></editApartment>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/login', component: Login},
	    { path: '/reset', component: ResetPassword},
	    { path: '/register', component: Register },
	    { path: '/contact', component: Contact },
		{ path: '/about', component: About },
		{ path: '/reserve', component: Reserve },
		{ path: '/', component: Welcome },
		{ path: '/housekeeper', component: Housekeeper},
		{ path: '/apartmentDetails', component: ApartmentDetails},
		{ path: '/guestProfile', component:GuestPofile},
		{ path: '/admin', component: Admin},
		{path:'/algoliaPLACES', component:algoliaPLACES},
		{path:'/addApartment', component:addApartment},
		{path:'/editApartment',component:editApartment}
	  ]
});



var app = new Vue({
	router,
	el: '#app',
});
