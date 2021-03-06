Vue.component("login",{ 
    data: function(){
		return{
      user: null,
			username: "",
      password: "",
      emptypassword:"",
      emptyusername:"",
      passwordFieldType:"password"
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
                  <p style="color:red">{{emptyusername}}</p>
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" :type="passwordFieldType" class="form-control" placeholder="enter your passsword" v-model="password">
                <td><input type="checkbox" v-on:click="togglePassword()">Show Password</td>

                <p style="color:red">{{emptypassword}}</p>
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
  mounted() {
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
    methods: {
      togglePassword: function(){
        if(this.passwordFieldType === "password"){
            this.passwordFieldType = "text";
          }else {
            this.passwordFieldType = "password";
          }
      },
      validate:function(){
        if(this.validatePassword() & this.validateUsername()){
          return true;
        }
        return false;
      },
      validateUsername:function(){
        if(this.username==="" | this.username.trim()===""){
          this.emptyusername="Username field is empty";
          return false;
        }
        this.emptyusername="";
        return true;
      },
      validatePassword:function(){
        if(this.password==="" | this.password.trim()===""){
          this.emptypassword = "Password field is empty!"
          return false;
        }
        this.emptypassword="";
        return true;
      },
    	tryLog : function(username, password) {
        if(this.validate()){
          axios
          .post("/rest/login", {username: this.username, password: this.password})
          .then( function(response) {


            this.user = response.data;
            window.localStorage.setItem('jwt', user.JWTToken);
            if(this.user.userType === 'HOUSEKEEPER'){
              window.location.href = '#/housekeeper';
            }else if(this.user.userType === 'GUEST'){
              window.location.href = '#/';
            }else if(this.user.userType==='ADMIN'){
              window.location.href = '#/admin';
            }
        })
		    .catch(error => {this.emptypassword="Wrong username or password!"});
          
      }
    		
        
      },
    	
    }
});