var log = new Vue({ 
    el: '#log',
    data: {
    	username: "",
    	password: ""
    },
    methods: {
    	tryLog : function(username, password) {
    		axios
    		.post("/rest/login", {username: this.username, password: this.password})
    		.then(function(response) {
				window.location.href = '/index.html';
			})
			.catch(function(error){alert("Wrong username or password")})
			
		},
    	
    }
});

var reg = new Vue({ 
    el: '#registrationFormDiv',
    data: {
		user:{},
		confirmPassword: ""
    },
    methods: {
    	tryRegister : function(user) {
    		axios
    		.post("/rest/register", user)
    		.then(function(response) {
				window.location.href = '/login.html';
			})
			.catch(function(error){alert("Username already exists!!!")})
			
		},
    	
    }
});

var reset = new Vue({ 
    el: '#resetPasswordFormDiv',
    data: {
		username: "",
		password: "",
		confirmPassword: "",
		
	},
	watch:{
		password: function(newPassword, oldPassword){
			if(newPassword.length < 8){
				// obavestenje o passwordu u toku kucanja
			}
		}
	},
    methods: {
    	resetPassword : function(username, password) {
    		if(this.password === this.confirmPassword){
    			axios
    			.post("/rest/reset", {username: this.username, password: this.password})
    			.then(function(response) {
    				window.location.href = '/login.html';
    			})
    			.catch(function(error){
    				alert("Username doesn't exists!!!");})
    		}else{
    			alert("Wrong password confirmation");
    		}
		
			
		},
		


    	
	}
});