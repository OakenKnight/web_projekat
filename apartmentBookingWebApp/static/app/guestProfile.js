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
            commentApartment:{},
            selectedApartment1:{},
            comments:[],
            apartmentSortCriteria:"1",
            commentsToSee:[],
            emptyText:"",
            emptyRating:""
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
                            <div style="text-align: center; height: 30px;
                                width: 230px;
                                background-color:white;
                                margin: 20px;
                                box-sizing: border-box;
                                border:0px;
                                outline:0px;
                                box-shadow: 0 4px 8px 0 rgba(0,0,0,.19);" >
                                <select required v-model="apartmentSortCriteria">
                                    <option value="1" selected >Select sort method</option>
                                    <option value="2">Sort by price ascending</option>
                                    <option value="3">Sort by price descending</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="apartment col" v-for="r in userReservations" >
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
                                        <button class="reserve-more-info-button" type="button" v-on:click="showMore(r)">Show apartment</button>
                                        <button class="reserve-more-info-button" type="button" v-if="r.reservationStatus==='REJECTED' | r.reservationStatus==='FINISHED'" v-on:click="rateApartmentFromReservation(r)">Comment</button>

                                        <button class="reserve-more-info-button" type="button"   v-if="showCancelButton(r)" >Cancel</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </section>

                    <section v-if="mode==='comment'" id="comment">
                        <div>
                            <label class="profile-info-p"><strong>Enter your comment:</strong></label>

                            <textarea class="form-control" id="comment" rows="3" v-model="commentText"></textarea>
                            <p style="color:red; margin-left:10px">{{emptyText}}</p>

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
                                <p style="color:red; margin-left:10px">{{emptyRating}}</p>

                        </div>

                        <button class="edit-info-button" type="button" v-on:click="setMode('reservations')">Cancel</button>
                        <button class="edit-info-button" type="button" v-on:click="comment()">Submit comment</button>
                    </section>
                </div>

                




               
        
            </div>


                <div v-if="myModal">
                <!-- <transition name="modal"> -->
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">More info about apartment</h4>
                                        <button type="button" class="close absolute pin-t pin-r" v-on:click="myModal = false">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                        
                                    </div>
                                    <div class="modal-body">
                                        <div class="details">
                                        
                                            <div class="row">
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/hotel-icon.png" alt="not found"><strong>Hotel name</strong></label>
                                                    <p class="details-hotel-name-p">{{selectedApartment1.name}}</p>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                                                    <p class="details-hotel-name-p">{{selectedApartment1.location.address.street}} {{selectedApartment1.location.address.number}}, {{selectedApartment1.location.address.zipCode}} {{selectedApartment1.location.address.city}} </p>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/building-type.png" alt="not found"><strong>Type</strong></label>
                                                    <p class="details-hotel-name-p">{{selectedApartment1.apartmentType}}</p>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Guests</strong></label>
                                                    <p class="details-hotel-name-p">{{selectedApartment1.guestNumber}}</p>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                                                    <p class="details-hotel-name-p">{{selectedApartment1.roomNumber}}</p>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"><strong>Price</strong></label>
                                                    <p class="details-hotel-name-p">{{selectedApartment1.priceForNight}}</p>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col">
                                                    <h4 v-if="basicAmenities.length>0">Basic</h4> 
                                                    <div class="amenity col-md-6" v-for="a in basicAmenities">
                                                        <label><strong>{{a.name}}</strong></label>
                                                        <p>{{a.description}}</p>
                                                    </div>
                                                
                                                    <h4 v-if="familyAmenities.length>0">Family features</h4> 
                                                    <div class="amenity col-md-6" v-for="a in familyAmenities">
                                                        <label><strong>{{a.name}}</strong></label>
                                                        <p>{{a.description}}</p>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <h4 v-if="facilityAmenities.length>0">Facilities</h4> 
                                                    <div class="amenity col-md-6" v-for="a in facilityAmenities">
                                                        <label><strong>{{a.name}}</strong></label>
                                                        <p>{{a.description}}</p>
                                                    </div>
                                                
                                                    <h4 v-if="diningAmenities.length>0">Dining</h4> 
                                                    <div class="amenity col-md-6" v-for="a in diningAmenities">
                                                        <label><strong>{{a.name}}</strong></label>
                                                        <p>{{a.description}}</p>
                                                    </div>
                                                </div>

                                            </div>

                                            

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- </transition> -->
            </div>


        </div>


	</div>
	`
	,
	mounted () {
        var jwt = window.localStorage.getItem('jwt');
        if(!jwt){
            alert("Please log in!");
            this.loggedIn=false;

            window.location.href = '#/login';

        }else{
            axios
            .get('rest/getUserRole', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>{ if (response.data !== "GUEST")
                window.location.href = '#/forbidden';
            });
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
        showCancelButton:function(reservation){
            let past  = this.oldReservation(reservation);
            console.log(past);
            return past && (reservation.reservationStatus==='CREATED' | reservation.reservationStatus==='ACCEPTED');

        },
        showMore:function(reservation){
            this.selectedApartment1 = this.findApartment(reservation.apartmentId);
            this.amenities = this.selectedApartment1.amenities;
            this.getBasicAmenities();
            this.getDiningAmenities();
            this.getFacilityAmenities();
            this.getFamilyAmenities();
            this.getComments();
            this.myModal=true;
        },
        getComments:function(){
            this.comments = this.selectedApartment1.comments;
            for(i=0;i<this.comments.length;i++){
                if(this.comments[i].disabledForGuests===false){
                    this.commentsToSee.push(this.comments[i]);
                }
            }
        },
       
        getBasicAmenities:function(){
            this.basicAmenities = this.amenities.filter(function(amenity){
                return amenity.type === 'BASIC';
            });
        },
        getFamilyAmenities:function(){
            this.familyAmenities = this.amenities.filter(function(amenity){
                return amenity.type === 'FAMILY_FEATURES';
            });
        },
        getDiningAmenities:function(){
            this.diningAmenities = this.amenities.filter(function(amenity){
                return amenity.type === 'DINING';
            });

        },
        getFacilityAmenities:function(){
            this.facilityAmenities = this.amenities.filter(function(amenity){
                return amenity.type === 'FACILITIES';
            });

        },
        oldReservation:function(r){
            var todaysDate = new Date();
            var milis = r.arrivalDate;
            if(todaysDate.getTime() < new Date((new Date(milis)).getTime() - 86400000).getTime()){
                return false;
            }else{
                return true;
            }
        },
        save: function(){
                if(this.checkFieldsForUpdate()){
                    axios
                    .post('rest/update',this.loggedInUser)
                    .then(response=>(this.loggedInUser = response.data),alert("Profile info update successfull!"), this.setMode('profile'))
                    .catch(error=>{alert("Ooops something went wrong!")});
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
                .then(response => {this.userReservations = response.data, alert("Reservation canceled!")})
                .catch(error=>{alert("Ooops something went wrong!")});
        },
        reset: function(){

            if(this.password1!=="" && this.password2!=="" && this.oldPassword!==""){
                this.emptyPassword1="";
                this.emptyPassword2="";
                this.emptyOldPassword="";
                if(this.password1 === this.password2 && this.oldPassword === this.loggedInUserBackup.password){
                    axios
                    .post('rest/update',this.loggedInUser)
                    .then(response=>(this.loggedInUser = response.data), alert("Password reset success!"),this.setMode('profile'))
                    .catch(error=>{alert("Ooooooooops something went wrong!")})
                }else if(this.password1!==this.password2){
                    this.emptyPassword2="Passwords do not match!";
                }else if(this.oldPassword!==this.loggedInUserBackup.password){
                    this.emptyOldPassword="Old password doesnt match!";
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
        
        validateComText:function(){
            if(this.commentText==="" || this.commentText.trim()===""){
                this.emptyText="Please enter comment";
                return false;
            }
            
            this.emptyText="";
            return true;
        },
        
        validateComRating:function(){
            if(this.commentRate===""){
                this.emptyRating="Please enter comment";
                return false;
            }
            
            this.emptyRating="";
            return true;
        },
        validateComment:function(){
            let vt = this.validateComText();
            let vr = this.validateComRating();

            return vt && vr;
        },
        comment: function(){
            var comment = {id:new Date().getTime().toString(), guestId:this.loggedInUser.username,
                text:this.commentText, reviewsMark:this.commentRate,disabledForGuests:true, apartmentId:this.commentApartment.id};
                if(this.validateComment()){
                    axios
                .post('rest/comment',comment)
                .then(response => { 
                    this.setMode('reservations');
                 })
                .catch(function(error){alert("Oooops something went wrong!")});
                }
                /*
            if(this.commentText!=="" && this.commentRate!==""){
                axios
                .post('rest/comment',comment)
                .then(response => { 
                    this.setMode('reservations');
                 })
                .catch(function(error){alert("Oooops something went wrong!")});
            }else if(this.commentText==="" && this.commentRate===""){
                ("Please enter text and rating!");
            }else if(this.commentText!=="" && this.commentRate===""){
                alert("Please enter rating!");
            }else if(this.commentText==="" && this.commentRate!==""){
                alert("Please enter text!");
            }
            */

        },
        comparePriceDESC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const priceA = a.totalPrice;
            const priceB = b.totalPrice;
          
            let comparison = 0;
            if (priceA < priceB) {
              comparison = 1;
            } else if (priceA > priceB) {
              comparison = -1;
            }
            return comparison;
        },
        comparePriceASC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const priceA = a.totalPrice;
            const priceB = b.totalPrice;
          
            let comparison = 0;
            if (priceA < priceB) {
              comparison = -1;
            } else if (priceA > priceB) {
              comparison = 1;
            }
            return comparison;
        },
        sortByPriceASC:function(){
            this.userReservations.sort(this.comparePriceASC);
        },
        sortByPriceDESC:function(){
            this.userReservations.sort(this.comparePriceDESC);
        },

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
        },
        apartmentSortCriteria: function(newType, oldType){
            console.log(newType);
            if(newType == 2){
                this.sortByPriceASC();
            }else if(newType == 3){
                this.sortByPriceDESC();
            }else{
                
            }
        }
	},
    components:{
		vuejsDatepicker
	}
});

