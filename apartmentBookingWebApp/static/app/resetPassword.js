Vue.component("resetPassword",{ 
    data: function(){
		return{
			username: "",
			password: "",
			confirmPassword: "",
		}
		
	},
	template:`
	<main>
	<nav class="navbar navbar-expand-md navbar-dark" style="background-color: #3268a8;">
	  <a class="navbar-brand"><img src="assets/images/logo.png" style="width:70px;height:70px;"></a>
	  <span class="navbar-text" style="color: white;">BnBBooking</span>
	  <ul class="navbar-nav">
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Reserve</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="">Recomend</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#/about">About us</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#/contact">Contact us</a>
			</li>
			<li>
			<div class="sign-in-up" style="right:0">
				<button type="button" class="btn my-2 my-lg-0" onclick="location.href='/register.html'" >Create account</button>
				<button type="button" class="btn my-2 my-lg-0"  onclick="location.href='/login.html'" >Sign in</button>
			</div>
		</li>


	  </ul>
  </nav>
  <div class="container-fluid">
	<div class="row">
	  <div class="col-sm-6 login-section-wrapper">
		<div class="brand-wrapper">
		  <img src="assets/images/logo.png" alt="logo" class="logo">
		</div>
		<div id="resetPasswordFormDiv" class="login-wrapper my-auto">
		  <h1 class="login-title">Reset password</h1>
		  <form action="#!">
			<div class="form-group">
			  <label for="username">Usename</label>
			  <input type="text" name="username" id="username" class="form-control" placeholder="enter your username" v-model="username">
			</div>
			<div class="form-group mb-4">
			  <label for="password">New Password</label>
			  <input type="password" name="password" id="password" class="form-control" placeholder="enter your new passsword" v-model="password">
			</div>
			<div class="form-group mb-4">
			  <label for="password">New Password</label>
			  <input type="password" name="password" id="password" class="form-control" placeholder="enter your new passsword again" v-model="confirmPassword">
			</div>
			<input name="login" id="login" class="btn btn-block reset-btn" type="button" value="Reset" v-on:click="resetPassword(username, password)">
		  </form>
		  
		</div>
	  </div>
	  <div class="col-sm-6 px-0 d-none d-sm-block">
		<img src="assets/images/Vacation-Rental-750x498.jpg" alt="login image" class="login-img">
	  </div>
	</div>
  </div>
</main>
	`
	,
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


