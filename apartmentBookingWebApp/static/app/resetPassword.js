Vue.component("resetPassword",{ 
    data: function(){
		return{
			username: "",
			password: "",
			confirmPassword: "",
			loggedIn:null,
			loggedInUser:{},
			emptyUsername:"",
			emptyPassword1:"",
			emptyPassword2:"",
			passwordFieldType1:"password",
			passwordFieldType2:"password"
		}
	},
	template:`
	<main>
	<nav class="navbar navbar-expand-md navbar-dark" style="background-color: #3268a8;">
	  <a class="navbar-brand"><img src="assets/images/logo.png" style="width:70px;height:70px;"></a>
	  <span class="navbar-text" style="color: white;">BnBBooking</span>
	  <ul class="navbar-nav">
	  	<li class="nav-item">
			<a class="nav-link" href="#/">Home</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="#/about">About us</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="#/contact">Contact us</a>
		</li>
		<li>
			<div class="sign-in-up" style="right:0">
				<button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" v-if="loggedIn!=true" >Create account</button>
				<button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" v-if="loggedIn!=true" >Sign in</button>
				<button type="button" class="btn my-2 my-lg-0"  v-on:click="logout()" v-if="loggedIn" >Sign out</button>
				<button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/guestProfile'" v-if="loggedIn==true" >Profile</button>
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
			  <p style="color:red; margin-right:10px">{{emptyUsername}}</p>
			</div>
			<div class="form-group mb-4">
			  <label for="password">New Password</label>
			  <input type="password" name="password" id="password" class="form-control" :type="passwordFieldType1" placeholder="enter your new passsword" v-model="password">
			  <td><input type="checkbox" v-on:click="togglePassword1()">Show Password</td>
			  <p style="color:red; margin-right:10px">{{emptyPassword1}}</p>

			</div>
			<div class="form-group mb-4">
			  <label for="password">New Password</label>
			  <input type="password" name="password" id="password" class="form-control"  :type="passwordFieldType2" placeholder="enter your new passsword again" v-model="confirmPassword">
			  <td><input type="checkbox" v-on:click="togglePassword2()">Show Password</td>

			  <p style="color:red; margin-right:10px">{{emptyPassword2}}</p>

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
	mounted () {
        var jwt = window.localStorage.getItem('jwt');
        if(!jwt){
            this.loggedIn=false;
        }else{
            this.loggedIn=true;
            axios
            .get('rest/userLoggedIn',{params:{
                Authorization: 'Bearer ' + jwt
            }})
            .then(response=>(this.loggedInUser = response.data));
        }
	},

	watch:{
		password: function(newPassword, oldPassword){
			
		}
	},
    methods: {
		togglePassword1: function(){
			if(this.passwordFieldType1 === "password"){
				this.passwordFieldType1 = "text";
			  }else {
				this.passwordFieldType1 = "password";
			  }
		  },
		  togglePassword2: function(){
			if(this.passwordFieldType2 === "password"){
				this.passwordFieldType2 = "text";
			  }else {
				this.passwordFieldType2 = "password";
			  }
		  },
		logout: function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
		},
		validatePassword1: function(){
			if(this.password==="" || this.password.trim()===""){
				this.emptyPassword1="Please enter password";
				return false;
			}
			this.emptyPassword1="";
			return true;
		},
		validatePassword2: function(){
			if(this.confirmPassword==="" || this.confirmPassword.trim()===""){
				this.emptyPassword2="Please enter password";
				return false;
			}
			this.emptyPassword2="";
			return true;
		},
		validateUsername: function(){
			if(this.username==="" || this.username.trim()===""){
				this.emptyUsername="Please enter username";
				return false;
			}
			
			this.emptyUsername="";
			return true;
		},
		validate:function(){
			let vp1 = this.validatePassword1();
			let vp2 = this.validatePassword2();
			let vu = this.validateUsername();

			return vp1 && vp2 && vu;
		},
		passwordsMatch:function(){
			if(this.password === this.confirmPassword){
				this.emptyPassword2=""
				return true;
			}	
			this.emptyPassword2="Passwords do not match!";
			return false;
		},
    	resetPassword : function(username, password) {
			if(this.validate() && this.passwordsMatch()){
				axios
    			.post("/rest/reset", {username: this.username, password: this.password})
    			.then(function(response) {
					alert("Password reset successfull!");
    				window.location.href = '#/login';
    			})
    			.catch(error=>{this.emptyUsername="Username doesn't exists!"});
			}
    		
		
			
		},
		


    	
	}
});


