Vue.component("guestProfile",{ 
	data: function(){
		return{
            myModal:false,
            error:false,
            loggedIn:null,
            loggedInUser:{},
            userReservations:[],
            reservationsBackUp: [],
            userApartments:[],
            apartmentsBackUp:[],
            selectedReservation:{},
            mode:"profile"
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
                        <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" v-if="loggedIn!=true" >Create account</button>
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" v-if="loggedIn!=true" >Sign in</button>
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
                            <li class="option-guest" v-on:click="setMode('reservations')" v-if="mode==='profile'"><p>My reservations</p></li>
                            <li class="option-guest" v-on:click="setMode('profile')" v-if="mode==='reservations'"><p>My profile</p></li>
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
                        <label class="profile-info-label">Username:</label>
                        <p class="profile-info-p">{{loggedInUser.username}}</p>
                        <p></p>
        
                        <label class="profile-info-label">Name:</label>
                        <p class="profile-info-p">{{loggedInUser.firstName}}</p>
                        <p></p>
                    
                        <label class="profile-info-label">Lastname:</label>
                        <p class="profile-info-p">{{loggedInUser.lastName}}</p>
                        <p></p>
                        
                        <label class="profile-info-label">Gender:</label>
                        <p class="profile-info-p" style="padding-bottom: 25px;">{{loggedInUser.gender}}</p>
                        
                        
                        <button class="edit-info-button" type="button" v-on:click=""><i class="edit-icon material-icons">edit</i>Edit info</button>
                    </section>
                    <section v-if="mode==='reservations'" id="reservations">
                        <div class = "row">
                            <div class="apartment col" v-for="r in userReservations">
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
                                    <!--
                                    <div class="row justify-content-center">
                                        <p v-if="r.reservationStatus==='CREATED' | r.reservationStatus==='ACCEPTED'">You can't cancel reservations less than 48h before start.</p>
                                    </div>
                                    -->
                                </div>
                            </div>
                        </div>

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
        logout: function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        setMode: function(mode){
            if(mode === "profile"){
                this.mode = mode;
            }else if(mode === "reservations"){
                this.mode = mode;
            }
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
        }
        

    },
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
    },

	watch:{
		


	},
    components:{
		vuejsDatepicker
	}
});

