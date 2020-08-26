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
    		if(this.password === this.confirmPassword && this.password > 8){
    			axios
    			.post("/rest/reset", {username: this.username, password: this.password})
    			.then(function(response) {
    				window.location.href = '/login.html';
    			})
    			.catch(function(error){
    				alert("Username doesn't exists!!!");})
    		}else{
    			alert("The password does not match or is shorter than 8 characters");
    		}
		
			
		},
		


    	
	}
});


