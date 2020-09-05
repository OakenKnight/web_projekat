Vue.component("login",{ 
    data: function(){
		return{
      user: null,
			username: "",
			password: ""
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
				<a class="nav-link" href="#/reserve">Reserve</a>
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
                  <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'">Create
                      account</button>

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
          <div id="log" class="login-wrapper my-auto">
            <h1 class="login-title">Log in</h1>
            <form action="/rest/login">
              <div class="form-group">
                <label for="username">Usename</label>
                <input type="text" name="username" id="username" class="form-control" placeholder="enter your username" v-model="username">
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="enter your passsword" v-model="password">
              </div>
              <input name="login" id="login" class="btn btn-block login-btn" type="button" value="Login" v-on:click="tryLog(username,password)" >
            </form>
            <a href="#/reset" class="forgot-password-link">Forgot password?</a>
            <p class="login-wrapper-footer-text">Don't have an account? <a href="#/register" class="text-reset">Register here</a></p>
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
    	tryLog : function(username, password) {
    		axios
    		.post("/rest/login", {username: this.username, password: this.password})
    		.then(function(response) {
          this.user = response.data;
          window.localStorage.setItem('jwt', user.JWTToken);
          if(this.user.userType === 'HOUSEKEEPER'){
            window.location.href = '#/housekeeper';
          }else{
            window.location.href = '/test.html';
          }
			})
			.catch(function(error){alert("Wrong username or password")})
			
		},
    	
    }
});