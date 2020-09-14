Vue.component("guestProfile",{ 
	data: function(){
		return{
            myModal:false,
            error:false,
            loggedIn:null,
            loggedInUser:{},
            loggedInUserBackup:{},
            userReservations:[],
            reservationsBackUp: [],
            userApartments:[],
            apartmentsBackUp:[],
            selectedReservation:{},
            mode:"profile",
            passwordFieldType0:"password",
            passwordFieldType1:"password",
            passwordFieldType2:"password",
            secondPassword:"",
            emptyName:"",
            emptyLastname:"",
            emptyGender:"",
            emptyPassword1:"",
            emptyPassword2:"",
            name:"",
            lastname:"",
            gender:"",
            password1:"",
            password2:"",
            emptyOldPassword:"",
            oldPassword:"",
            selectedApartment:"",
            commentText:"",
            commentRate:"",
            commentApartment:{}
        }
	},
    template:`
    <div>
        <nav class="navbar navbar-expand-md navbar-dark " style="background-color: #3268a8;">
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
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="location.href='#/register'" v-if="loggedIn!=true" >Create account</button>
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="location.href='#/login'" v-if="loggedIn!=true" >Sign in</button>
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="logout()" v-if="loggedIn" >Sign out</button>
                    </div>
                </li>                
            </ul>
        </nav>
        <div id="start">

            <div class="main">
                <div class="row">
                    <div class="guest-profile-options column">
                        <ul>                            
                            <li class="option-guest" v-on:click="setMode('profile')"><p>My profile</p></li>
                            <li class="option-guest" v-on:click="setMode('reservations')"><p>My reservations</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        
            <div class="container-fluid">
                <div class="bk-img row justify-content-center"/>
            </div>
            
            <div class="info">


            
                <div>
                    <section v-if="mode==='profile'" id="profile">
                        <div class="row" style="width:40%">
                            <div class="col">
                                <label class="profile-info-label">Username:</label>
                            </div>
                            <div class="col">
                                <p class="profile-info-p">{{loggedInUser.username}}</p>
                            </div>
                        </div>

                        <div class="row" style="width:40%">
                            <div class="col">
                                <label class="profile-info-label">Name:</label>
                            </div>
                            <div class="col">
                                <p class="profile-info-p">{{loggedInUser.firstName}}</p>
                            </div>
                        </div>

                        <div class="row" style="width:40%">
                            <div class="col">
                                <label class="profile-info-label">Lastname:</label>
                            </div>
                            <div class="col">
                                <p class="profile-info-p">{{loggedInUser.lastName}}</p>
                            </div>
                        </div>

                        <div class="row" style="width:40%">
                            <div class="col">
                                <label class="profile-info-label">Gender:</label>
                            </div>
                            <div class="col">
                                <p class="profile-info-p" style="padding-bottom: 25px;">{{loggedInUser.gender}}</p>
                            </div>
                        </div>

                        
                        
                        <button class="edit-info-button" type="button" v-on:click="setMode('edit')"><i class="edit-icon material-icons">edit</i>Edit info</button>
                    </section>

                    <section v-if="mode==='edit'" id="edit">
                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Username:</label>
                            </div>
                            <div class="col">
                                <p class="profile-info-p">{{loggedInUser.username}}</p>
                            </div>
                            <div class="col">

                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Name:</label>
                            </div>
                            <div class="col">
                                <input required class="profile-info-p" type="text" name="firstName" v-model="loggedInUser.firstName">
                                <p style="color:red">{{emptyName}}</p>
                            </div>
                            <div class="col">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Lastname:</label>
                            </div>
                            <div class="col">
                                <input class="profile-info-p" type="text" name="lastname" v-model="loggedInUser.lastName">
                                <p style="color:red">{{emptyLastname}}</p>

                            </div>
                            <div class="col">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Gender:</label>
                            </div>
                            <div class="col" style="padding-bottom: 25px;">
                                <select class="profile-info-p" required v-model="loggedInUser.gender">
                                    <option value="MALE" selected>MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                                <p style="color:red" v-if="emptyGender">Gender field is empty.</p>
                            </div>
                            <div class="col">
                            </div>
                        </div>

                        
                        <button class="edit-info-button" type="button" v-on:click="setMode('passwordReset')">Reset password</button>
                        <button class="edit-info-button" type="button" v-on:click="cancelEdit()">Cancel</button>
                        <button class="edit-info-button" type="button" v-on:click="save()" >Save</button>

                    </section>

                    <section v-if="mode==='passwordReset'" id="passwordReset">
                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Old password:</label>
                            </div>
                            <div class="col">
                                <input class="profile-info-p" name="password" id="oldinput" :type="passwordFieldType0" v-model="oldPassword">
                                <input type="checkbox" v-on:click="toggleOldPassword()">Show Password
                                <p style="color:red">{{emptyOldPassword}}</p>

                            </div>
                            <div class="col">

                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Password:</label>
                            </div>
                            <div class="col">
                                <input class="profile-info-p" name="password" id="firstinput" :type="passwordFieldType1" v-model="password1">
                                <input type="checkbox" v-on:click="toggleFirstPassword()">Show Password
                                <p style="color:red">{{emptyPassword1}}</p>

                            </div>
                            <div class="col">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label class="profile-info-label">Please enter password again:</label>
                            </div>
                            <div class="col">
                                <input class="profile-info-p" :type="passwordFieldType2" name="password" id="secondinput" v-model="password2">
                                <input type="checkbox" v-on:click="toggleSecondPassword()">Show Password
                                <p style="color:red">{{emptyPassword2}}</p>

                            </div>
                            <div class="col">
                            </div>
                        </div>

                        <button class="edit-info-button" type="button" v-on:click="cancelPasswordReset()">Cancel</button>
                        <button class="edit-info-button" type="button" v-on:click="reset()" >Reset password</button>
                    </section>

                    <section v-if="mode==='reservations'" id="reservations">
                        <div class = "row">
                            <div class="apartment col" v-for="r in userReservations" v-on:click="rateApartmentFromReservation(r)">
                                <div class="apartment-border">

                                    
                                    <img class="apartment-pic" v-bind:src="'assets/images/apartmentsimg/' + findApartment(r.apartmentId).pictures[0]" alt="image not found">

                                    <div class="reservation-info">
                                        <h5><strong>{{findApartmentName(r.apartmentId)}}</strong>, {{findApartment(r.apartmentId).location.address.city}}</h5>
                                        <p><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found">Address: {{findApartment(r.apartmentId).location.address.street}} {{findApartment(r.apartmentId).location.address.number}}</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found">Number of people: {{findApartment(r.apartmentId).guestNumber}} people</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found">Number of rooms: {{findApartment(r.apartmentId).roomNumber}} rooms</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/night.png" alt="not found"> Number of nights: {{r.numberOfNights}}</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/calendar.png" alt="not found"> Arrival date: {{r.arrivalDate | dateFormat('DD.MM.YYYY')}}</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"> Total price: {{r.totalPrice}}€</p>
                                        
                                    </div>
                                    <div style="text-align: center;">
                                        <h3 style="display: inline-block;">Reservation status: <img class="apartment-info-icons" src="/assets/images/created.png" alt="not found" v-if="r.reservationStatus==='CREATED'"><img class="apartment-info-icons" src="/assets/images/rejected.png" alt="not found" v-if="r.reservationStatus==='REJECTED'"><img class="apartment-info-icons" src="/assets/images/finished.png" alt="not found" v-if="r.reservationStatus==='FINISHED'"><img class="apartment-info-icons" src="/assets/images/accepted.png" alt="not found" v-if="r.reservationStatus==='ACCEPTED'">{{r.reservationStatus}}</h3>
                                    </div>

                                    <div class="row justify-content-center">
                                        <button class="reserve-more-info-button " type="button" v-if="r.reservationStatus==='CREATED' | r.reservationStatus==='ACCEPTED'" v-on:click="cancel(r)" >Cancel</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </section>

                    <section v-if="mode==='comment'" id="comment">
                        <div>
                            <label class="profile-info-p"><strong>Enter your comment:</strong></label>
                            <textarea class="form-control" id="comment" rows="3" v-model="commentText"></textarea>

                            <label class="profile-info-p"><strong>Enter your rating:</strong></label>
                            <select v-model="commentRate" required>
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                        </div>

                        <button class="edit-info-button" type="button" v-on:click="setMode('reservations')">Cancel</button>
                        <button class="edit-info-button" type="button" v-on:click="comment()">Submit comment</button>
                    </section>
                </div>

                




               
        
            </div>

        </div>


	</div>
	`
	,
	mounted () {
        var jwt = window.localStorage.getItem('jwt');
        if(!jwt){
            this.loggedIn=false;
            window.location.href = '#/forbidden';

        }else{
            this.loggedIn=true;
            axios
            .get('rest/userLoggedIn',{params:{
                Authorization: 'Bearer ' + jwt
            }})
            .then(response=>(this.loggedInUser = response.data));

            axios
            .get('rest/userLoggedInReservations',{params:{
                Authorization: 'Bearer ' + jwt
            }})
            .then(response=>(this.userReservations = response.data ,this.reservationsBackUp = [...this.userReservations]));

            
            axios
            .get('rest/userLoggedInApartments',{params:{
                Authorization: 'Bearer ' + jwt
            }})
            .then(response=>(this.userApartments = response.data ,this.apartmentsBackUp = [...this.userApartments]));

        }
	},
	methods:{
        save: function(){
                if(this.checkFieldsForUpdate()){
                    axios
                    .post('rest/update',this.loggedInUser)
                    .then(response=>(this.loggedInUser = response.data), this.setMode('profile'));
                }
                
            
            
        },
        checkFieldsForUpdate: function(){
            if(this.validateName() && this.validateLastName()){ 
                return true;
            }else{
                return false;
            }
        },
        validateName: function(){
            if(this.loggedInUser.firstName==="" | this.loggedInUser.firstName.trim().length==0){          //length==0 | !this.name.trim()){
                this.emptyName="Name field is empty!";
                return false;
            }else{
                this.emptyName="";
                return true;                
            }
        },
        validateLastName: function(){
            if(this.loggedInUser.lastName==="" | this.loggedInUser.lastName.trim().length==0){          //length==0 | !this.name.trim()){
                this.emptyLastname="Last name field is empty!";
                return false;
            }else{
                this.emptyLastname="";
                return true;                
            }  
        },
        validatePassword1: function(){
            if(this.password1==="" | this.password1.trim().length==0){          //length==0 | !this.name.trim()){
                this.emptyPassword1="Password field is empty!";
                return false;
            }else{
                this.emptyPassword1="";
                return true;                
            }
        },
        
        toggleFirstPassword: function(){
            if(this.passwordFieldType1 === "password"){
                this.passwordFieldType1 = "text";
              }else {
                this.passwordFieldType1 = "password";
              }
        },
        toggleOldPassword: function(){
            if(this.passwordFieldType0 === "password"){
                this.passwordFieldType0 = "text";
              }else {
                this.passwordFieldType0 = "password";
              }
        },
        toggleSecondPassword: function(){
            if(this.passwordFieldType2 === "password"){
                this.passwordFieldType2 = "text";
              }else {
                this.passwordFieldType2 = "password";
              }
        },
        cancelEdit:function(){
            this.loggedInUser=JSON.parse(JSON.stringify(this.loggedInUserBackup))
            this.setMode('profile');
        },
        logout: function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        setMode: function(mode){
            if(mode === "profile"){                

                this.password1="";
                this.password2="";
                this.oldPassword="";
                this.mode = mode;
            }else if(mode === "reservations"){

                
                this.mode = mode;
            }else if(mode === "edit"){
                this.loggedInUserBackup = JSON.parse(JSON.stringify(this.loggedInUser));
                this.secondPassword = this.loggedInUser.password;
                
                this.mode = mode;
            }else if(mode==="passwordReset"){
                this.loggedInUserBackup = JSON.parse(JSON.stringify(this.loggedInUser));
                this.mode=mode;
            }else if(mode==="comment"){
                this.loggedInUserBackup = JSON.parse(JSON.stringify(this.loggedInUser));
                this.mode=mode;
            }
        },
        cancelPasswordReset:function(){
            this.loggedInUser=JSON.parse(JSON.stringify(this.loggedInUserBackup))
            this.setMode('edit');
        },
        findApartmentName: function(apId){
            var n;
            this.apartmentsBackUp.forEach(element =>{
                if(element.id === apId){
                    n =  element.name;
                }
            });
            return n;
        },
        findApartment: function(apId){
            var n;
            this.apartmentsBackUp.forEach(element =>{
                if(element.id === apId){
                    n =  element;
                }
            });
            return n;
        },

        cancel:function(reservation){
            
            axios
                .post('rest/cancelReservation',reservation)
                .then(response => {this.userReservations = response.data})
        },
        reset: function(){

            if(this.password1!=="" && this.password2!=="" && this.oldPassword!==""){
                this.emptyPassword1="";
                this.emptyPassword2="";
                this.emptyOldPassword="";
                if(this.password1 === this.password2 && this.oldPassword === this.loggedInUserBackup.password){
                    axios
                    .post('rest/update',this.loggedInUser)
                    .then(response=>(this.loggedInUser = response.data), this.setMode('profile'));
                }else if(this.password1!==this.password2){
                    alert("Passwords do not match!");
                }else if(this.oldPassword!==this.loggedInUserBackup.password){
                    alert("Old password doesnt match!");
                }
            }else{
                if(this.oldPassword ===""){
                    this.emptyOldPassword="OldPassword is empty!";
                }else{
                    this.emptyOldPassword="";
                }
                
                if(this.password1===""){
                    this.emptyPassword1="Password field is empty";
                }else{
                    this.emptyPassword1="";
                }
    
                if(this.password2===""){
                    this.emptyPassword2="Password field is empty";
                }else{
                    this.emptyPassword2="";
                }
            }
        },
        rateApartmentFromReservation : function(reservation){
            selectedApartment = this.findApartment(reservation.apartmentId);
            if(reservation.reservationStatus==='REJECTED' | reservation.reservationStatus==='FINISHED'){
                this.commentApartment = this.findApartment(reservation.apartmentId);
                this.setMode('comment');
            }
        },
        comment: function(){
            var comment = {id:new Date().getTime().toString(), guestId:this.loggedInUser.username,
                text:this.commentText, reviewsMark:this.commentRate,disabledForGuests:true, apartmentId:this.commentApartment.id};
            if(this.commentText!=="" && this.commentRate!==""){
                axios
                .post('rest/comment',comment)
                .then(response => { 
                    this.setMode('reservations');
                 })
                .catch(function(error){alert("Oooops something went wrong!")});
            }else if(this.commentText==="" && this.commentRate===""){
                alert("Please enter text and rating!");
            }else if(this.commentText!=="" && this.commentRate===""){
                alert("Please enter rating!");
            }else if(this.commentText==="" && this.commentRate!==""){
                alert("Please enter text!");
            }
            

        }

    },
    
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
    },

	watch:{
		
        name: function(newName, oldName){
            this.name = newName;
            this.loggedInUser.firstName = newName;

        },
        lastName: function(newLastname, oldLastname){
            this.lastname = newLastname;
            this.loggedInUser.lastName = newLastname;
        },
        gender: function(newGender, oldGender){
            this.gender = newGender;
            this.loggedInUser = newGender;
        },
        oldPassword:function(newOldPassword, oldOldPassword){
            this.oldPassword = newOldPassword;
        },
        password1: function(newPassword1, oldPassword1){
            this.password1 = newPassword1;
            this.loggedInUser.password = this.password1;
        },
        password2: function(newPassword2, oldPassword2){
            this.password2 = newPassword2;
            
        },
        commentRate:function(newRate,oldRate){
            this.commentRate = newRate;
        },
        commentText:function(newText,oldText){
            this.commentText = newText;
        }
	},
    components:{
		vuejsDatepicker
	}
});

