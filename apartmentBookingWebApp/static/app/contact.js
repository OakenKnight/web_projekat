Vue.component("contact",{ 
  data: function(){
		return{
            loggedIn:null,
            loggedInUser:{},
            type:""
        }
	  },
    template:`
    <main>
    <div class="navigationbar"> 
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
                <button type="button" class="btn my-2 my-lg-0"  v-on:click="takeMeHome()" v-if="loggedIn==true" >Profile</button>
              </div>
          </li>
  
        </ul>
    </nav>
    </div>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 login-section-wrapper">
          <div id="log" class="login-wrapper my-auto">
            <h1 class="login-title">Contact us</h1>
              <div class="asf">
                <label for="address">Address</label>
                <p> Big Shopping centar (Sentandrejski put 11), Novi Sad <br> 021-2701-702 <br> 011-7155-807</p>
              </div>
              <div class="form-group mb-4">
                <label for="shifts">Working hours</label>
                <p> Mon: 09:00 - 20:00<br>
                    Tue: 09:00 - 20:00<br>
                    Wed: 09:00 - 20:00<br>
                    Thu: 09:00 - 20:00<br>
                    Fri: 09:00 - 20:00<br>
                    Sat: 10:00 - 18:00<br>
                    Sun: Closed</p>
              </div>
            
           
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img src="assets/images/Vacation-Rental-750x498.jpg" alt="login image" class="login-img">
        </div>
      </div>
    </div>
  </main>
`,
mounted () {
      var jwt = window.localStorage.getItem('jwt');
      if(!jwt){
          this.loggedIn=false;
      }else{
        axios
        .get('rest/getUserRole', {params: {
            Authorization: 'Bearer ' + jwt
        }})
        .then(response =>{ this.type = response.data });
      
      this.loggedIn=true;
          axios
          .get('rest/userLoggedIn',{params:{
              Authorization: 'Bearer ' + jwt
          }})
          .then(response=>(this.loggedInUser = response.data));
      }
},
methods:{
  takeMeHome:function(){
    if(this.type==="GUEST"){
      window.location.href="#/guestProfile";
    }else if(this.type==="ADMIN"){
      window.location.href="#/admin";
    }else{
      window.location.href="#/housekeeper";
    }
  },
      logout: function(){
          window.localStorage.removeItem('jwt');
          this.$router.push('/login');
      },

    }
});


