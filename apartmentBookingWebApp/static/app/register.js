var reg = new Vue({ 
    el: '#registrationFormDiv',
    data: {
		user:{},
		password: "",
		confirmPassword: ""
    },
    methods: {
    	tryRegister : function(user) {
			if(this.password > 8 && this.password === this.confirmPassword){
				axios
				.post("/rest/register", user)
				.then(function(response) {
					window.location.href = '/login.html';
				})
				.catch(function(error){alert("Username already exists!!!")})
			}else{
				alert("The password does not match or is shorter than 8 characters");
			}
			
		},
    	
	},
	watch:{
		password: function(newPassword, oldPassword){
			this.user.password = this.password;
			if(newPassword.length < 8){
				// obavestenje o passwordu u toku kucanja
			}
		},
	},
});