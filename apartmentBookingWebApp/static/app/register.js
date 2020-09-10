Vue.component("register",{ 
    data: function(){
		return{
			user:{},
			password: "",
			confirmPassword: ""
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
                <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" >Sign in</button>

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
          <div id="registrationFormDiv" class="login-wrapper my-auto">
            <h1 class="login-title">Register</h1>
            <form action="#!">
              <div class="form-group">
                <label for="name">Enter Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="enter your name" v-model="user.firstName">
              </div>
              <div class="form-group">
                <label for="lastname">Enter Lastname</label>
                <input type="text" name="lastname" id="lastname" class="form-control" placeholder="enter your lastname" v-model="user.lastName">
              </div>
              <div class="form-group">
                <label for="gender">Select Gender</label>
                <select name="gender" id="gender" class="form-control" v-model="user.gender" >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other...</option>
                </select>                
              </div>
              <div class="form-group">
                <label for="username">Enter Usename</label>
                <input type="text" name="username" id="username" class="form-control" placeholder="enter your username" v-model="user.username">
              </div>
              <div class="form-group mb-4">
                <label for="password">Enter Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="enter your passsword" v-model="password">
              </div>
              <div class="form-group mb-4">
                <label for="password">Enter Password Again</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="enter your passsword again" v-model="confirmPassword">
              </div>
              <input name="register" id="register" class="btn btn-block register-btn" type="button" value="Register" v-on:click="tryRegister(user)">
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
    methods: {
    	tryRegister : function(user) {
        console.log(user.password);
			if(this.password > 8 && this.password === this.confirmPassword){
				axios
				.post("/rest/register", user)
				.then(function(response) {
					window.location.href = '/#/login';
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