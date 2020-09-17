Vue.component("register",{ 
    data: function(){
		return{
      user:{},
      username:"",
      name:"",
      lastname:"",
      gender:"",
			password: "",
      confirmPassword: "",
      emptyName:"",
      emptyLastName:"",
      emptyGender:"",
      emptyPassword1:"",
      emptyPassword2:"",
      emptyUsername:"",
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
                <input type="text" name="name" id="name" class="form-control" placeholder="enter your name" v-model="name">
                <p style="color:red">{{emptyName}}</p>

              </div>
              <div class="form-group">
                <label for="lastname">Enter Lastname</label>
                <input type="text" name="lastname" id="lastname" class="form-control" placeholder="enter your lastname" v-model="lastname">
                <p style="color:red">{{emptyLastName}}</p>
               </div>
              <div class="form-group">
                <label for="gender">Select Gender</label>
                <select name="gender" id="gender" class="form-control" v-model="gender" >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other...</option>
                </select>
                <p style="color:red">{{emptyGender}}</p>
                
              </div>
              <div class="form-group">
                <label for="username">Enter Usename</label>
                <input type="text" name="username" id="username" class="form-control" placeholder="enter your username" v-model="username">
                <p style="color:red">{{emptyUsername}}</p>
              </div>
              <div class="form-group mb-4">
                <label for="password">Enter Password</label>
                <input type="password" name="password" id="password" class="form-control" :type="passwordFieldType1" placeholder="enter your passsword" v-model="password">
                <td><input type="checkbox" v-on:click="togglePassword1()">Show Password</td>

                <p style="color:red">{{emptyPassword1}}</p>

              </div>
              <div class="form-group mb-4">
                <label for="password">Enter Password Again</label>
                <input type="password" name="password" id="password" class="form-control" :type="passwordFieldType2" placeholder="enter your passsword again" v-model="confirmPassword">
                <td><input type="checkbox" v-on:click="togglePassword2()">Show Password</td>

                <p style="color:red">{{emptyPassword2}}</p>

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
      validate:function(){
        if(this.validateName() & this.validateLastname() & this.validateGender() & this.validateUsername() & this.validatePassword()){
          return true;
        }
        return false;
      },
      validateName:function(){
        if(this.name===""  | this.name.trim()===""){
          this.emptyName = "First name field is empty!";
          return false;
        }
        this.emptyName = "";
        return true;
      },
      validateLastname:function(){
        if(this.lastname==="" | this.lastname.trim()===""){
          this.emptyLastName = "Last name field is empty!";
          return false;
        }
        this.emptyLastName = "";
        return true;
      },
      validateGender:function(){
        if(this.gender===""){
          this.emptyGender = "Gender field is empty!";
          return false;
        }
        this.emptyGender = "";
        return true;
      },
      validateUsername: function(){
        if(this.username===""  | this.username.trim()===""){
          this.emptyUsername = "Username field is empty!";
          return false;
        }
        this.emptyUsername = "";
        return true;
      },
      validatePassword:function(){
        if(this.validatePassword1() & this.validatePassword2()){
          if(this.password===this.confirmPassword){
            this.emptyPassword2="";
            return true;
          }
          this.emptyPassword2="Passwords do not match!";
          return false;
        }
      },
      validatePassword1:function(){
        if(this.password==="" | this.password.trim()===""){
          this.emptyPassword1="Password field is empty!";
          return false;
        }
        this.emptyPassword1="";
        return true;
      },
      validatePassword2:function(){
        if(this.confirmPassword==="" | this.confirmPassword.trim()===""){
          this.emptyPassword2="Password field is empty!";
          return false;
        }
        this.emptyPassword2="";
        return true;
      },
    	tryRegister : function(user) {
        console.log(user.password);
			if(this.validate()){
        console.log("pera");
				axios
				.post("/rest/register", user)
				.then(function(response) {
          this.user = response.data;
          window.localStorage.setItem('jwt', this.user.JWTToken);
          window.location.href = '#/';
          console.log(this.user.JWTToken);
				})
				.catch(error=>{this.emptyUsername="Username is already taken!"})
			}
			
    },
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
    	
	},
	watch:{
    name: function(newName,oldName){
      this.name = newName;
      this.user.firstName = this.name;
    },
    lastname: function(newLastName,oldLastName){
      this.lastname = newLastName;
      this.user.lastName = this.lastname;
    },
    gender: function(newGender,oldGender){
      this.gender = newGender;
      this.user.gender = this.gender;
    },
    username: function(newUserName,oldUserName){
      this.username = newUserName;
      this.user.username = this.username;
    },
		password: function(newPassword, oldPassword){
      this.password = newPassword;
      this.user.password = this.password;
		},
	},
});