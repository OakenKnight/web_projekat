Vue.component("apartmentDetails", {
    data: function () {
        return {
            loggedInUser:{},
            loggedIn:false,
            myModal: false,
            error: false,
            arriveDate: null,
            departDate: null,
            disabledArriveDates: {
                to: new Date(),
                ranges:[ ]
            },
            disabledDepartDates: {
                to:  new Date(2022, 0,1),
                from: null
            },
            selectedApartment: {},
            amenities:[],
            basicAmenities:[],
            familyAmenities:[],
            facilityAmenities:[],
            diningAmenities:[],
            comments:[],
            commentsToSee:[],
            numberOfNights: 0,
            message:"",
            price:"",
            reservation:{},
            emptyNights:"",
            emptyDate:"",
            listOfNights:[],
            arriveDateSelected:false
        }
    },
    template: `
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
                        <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" v-if="loggedIn!=true" >Create account</button>
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" v-if="loggedIn!=true" >Sign in</button>
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="logout()" v-if="loggedIn" >Sign out</button>
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/guestProfile'" v-if="loggedIn==true" >Profile</button>
                    </div>
                </li>
            </ul>
        </nav>

        <div id="start">
            <div class="container-fluid"> 
                <div class="bk-img row justify-content-center">
                    
                </div>
            </div>
            <div class="info">
                <div class="row justify-content-center">
                    <img v-bind:src="'assets/images/apartmentsimg/' + selectedApartment.pictures[0]" alt="image not found">
                </div>
                <div class="row">
                    <div class="col">
                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/hotel.png" alt="not found"><strong>Hotel name</strong></label>
                        <p class="details-hotel-name-p">{{selectedApartment.name}}</p>
                    </div>
                    
                      
                    <div class="col">
                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                        <p class="details-hotel-name-p">{{selectedApartment.location.address.street}} {{selectedApartment.location.address.number}}, {{selectedApartment.location.address.zipCode}} {{selectedApartment.location.address.city}}</p> 
                    </div>

                   
                    <div class="col">
                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/building-type.png" alt="not found"><strong>Type</strong></label>
                        <p class="details-hotel-name-p">{{selectedApartment.apartmentType.toLowerCase()}}</p>
                    </div>

                    
                </div>   
                <div class="row">  
                    <div class="col">
                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Number of guests</strong></label>
                        <p class="details-hotel-name-p">{{selectedApartment.guestNumber}}</p>
                    </div>
                   
                    <div class="col">
                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                        <p class="details-hotel-name-p">{{selectedApartment.roomNumber}}</p>
                    </div>
                
                    <div class="col">
                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/money.png" alt="not found"><strong>Price for night</strong></label>
                        <p class="details-hotel-name-p">{{selectedApartment.priceForNight}}</p>
                    </div>

                    
                </div>


                <div class="row">
                    <div class="col">
                        <h4 class="details-hotel-name-label">Basic</h4> 
                        <div class="amenity col-md-6" v-for="a in basicAmenities">
                            <label class="details-hotel-name-p"><strong>{{a.name}}</strong></label>
                            <p class="details-hotel-name-p">{{a.description}}</p>
                        </div>                
                                    
                        <h4 class="details-hotel-name-label">Family features</h4> 
                        <div class="amenity col-md-6" v-for="a in familyAmenities">
                            <label class="details-hotel-name-p"><strong>{{a.name}}</strong></label>
                            <p class="details-hotel-name-p">{{a.description}}</p>
                        </div>
                    </div>
                
                    <div class="col" >
                        <h4 class="details-hotel-name-label">Facilities</h4> 
                        <div class="amenity col-md-6" v-for="a in facilityAmenities">
                            <label class="details-hotel-name-p"><strong>{{a.name}}</strong></label>
                            <p class="details-hotel-name-p">{{a.description}}</p>
                        </div>
                                
                        <h4 class="details-hotel-name-label">Dining</h4> 
                        <div class="amenity col-md-6" v-for="a in diningAmenities">
                            <label class="details-hotel-name-p"><strong>{{a.name}}</strong></label>
                            <p class="details-hotel-name-p">{{a.description}}</p>
                        </div>
                    </div>
                </div>

                <div class="comments" v-for="c in commentsToSee">
                    <div class="comment-wrapper">
                        <div class="row">
                            <div class="col">
                                <p class="details-hotel-name-label"><strong>User: </strong</p>
                                <p class="details-hotel-name-label"><strong>Description:</strong></p>
                            </div>
                            <div class="col">
                                <p class="details-hotel-name-label"><strong>{{c.guestId}}</strong</p>
                                <p class="details-hotel-name-label">{{c.text}}</p>
                            </div>
                            <div class="col">
                                <p class="details-hotel-name-label"><strong>Mark:</strong></p>
                            </div>
                            <div class="col">
                                <p><img class="comment-mark-icon" src="/assets/images/star-icon.png" alt="not found">{{c.reviewsMark}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <button class="reserve-book-button" type="button" v-on:click="myModal=true">Book now!</button>
                </div>

                <!-- MODALNI DIJALOG-->

                <div v-if="myModal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog modal-l modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Booking info</h4>
                                        <button type="button" class="close absolute pin-t pin-r" v-on:click="myModal = false">
                                        <span aria-hidden="true">&times;</span>
                                            </button>
                                            
                                        </div>
                                        <div class="modal-body">
                                            <div class="details" style="height:600px">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <p style="margin-top:22px"><strong>Arrive date:</strong></p>
                                                    </div>
                                                    <div class="col-8">
                                                        <div class="datepicker">
                                                            <vuejs-datepicker :disabled-dates="disabledArriveDates" format="dd.MM.yyyy" placeholder="Arrive" name="arriveDate" v-model="arriveDate" ></vuejs-datepicker>
                                                        </div>
                                                        <p style="color:red">{{emptyDate}}</p>

                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <p style="margin-top:22px"><strong>Number of nights:</strong></p>
                                                    </div>
                                                    <div class="col-8">
                                                   

                                                    <select name="sub_type" class="form-control" v-if="listOfNights.length>0" v-model="numberOfNights">
                                                            <option v-for='a in listOfNights' :value='a'> {{a}}</option>
                                                    </select>    
                                                    <p style="color:red">{{emptyDate}}</p>

                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label><strong>Message for host:</strong></label>
                                                    </div>
                                                    <div class="col-8">
                                                        <textarea class="form-control" style="width:80%" id="message" rows="3" v-model="message"></textarea>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <button style="margin-top:50px" class="reserve-book-button" type="button" v-on:click="requestBooking()">Send request now!</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        </div>
            
    </div>

	`
    ,
    mounted() {
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
        }

        axios
            .get('rest/apartments/' + this.$route.query.id)
            .then(response => {
                this.selectedApartment = response.data;
                this.setFreeDates();
                this.mountAll();

            });
        
    },
    methods: {
        logout: function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        setFreeDates: function(){
            var today = new Date();
            var newYear =  new Date(2021, 0,1);
            this.disabledArriveDates.ranges.push({from: new Date(), to: new Date(this.selectedApartment.freeDates[0].startDate)});
            for(var i = 0; i < this.selectedApartment.freeDates.length - 1; i ++){
                this.disabledArriveDates.ranges.push({from: new Date(this.selectedApartment.freeDates[i].endDate), to: new Date(this.selectedApartment.freeDates[i+1].startDate)});
            }
            this.disabledArriveDates.ranges.push({from: new Date(this.selectedApartment.freeDates[this.selectedApartment.freeDates.length - 1].endDate), to: new Date(2021, 0,1)});
        },
        requestBooking:function(){
            if(this.validate()){
                //this.numberOfNights = (this.departDate.getTime() - this.arriveDate.getTime()) / (1000 * 3600 * 24);
                
                console.log(this.numberOfNights);
                this.calculatePrice();
                this.reservation.apartmentId = this.selectedApartment.id;
                this.reservation.Id = (new Date()).getTime();

                var date = new Date();
                date.setDate(this.arriveDate.getDate());
                date.setMonth(this.arriveDate.getMonth());
                date.setHours(0,0,0,0);

                this.reservation.arrivalDate = date;
                this.reservation.totalPrice = this.price;
                this.reservation.numberOfNights = this.numberOfNights;
                this.reservation.message = this.message;
                this.reservation.guestId = this.loggedInUser.username;
                this.reservation.reservationStatus = 'CREATED';
                console.log(this.reservation.arrivalDate);
                axios
                .post('rest/requestBooking',this.reservation)
                .then(response => {
                    this.$router.push('/');
                })
                .catch(function(error){alert("Ooooops something went wrong!")});       
            }
        },
        calucalateNights:function(aD){
            var dDate = new Date();
            var d = new Date(aD);
            for(var i = 0; i < this.selectedApartment.freeDates.length; i ++){
                if(new Date(this.selectedApartment.freeDates[i].startDate) <= d && new Date(this.selectedApartment.freeDates[i].endDate) >= d){
                    dDate = new Date(this.selectedApartment.freeDates[i].endDate);
                }
                
            }
            var nights = (dDate.getTime() - aD.getTime()) / (1000 * 3600 * 24);
            for(var i=1;i<=nights;i++){
                this.listOfNights.push(i);  
            }
            if(nights < 1){
                this.listOfNights.push(1);
            }
        },
        validate:function(){
            if(this.validateDate() & this.validateNights()){
                return true;
            }
            return false;
        },
        validateDate: function(){
            if(this.arriveDate===null){
                this.emptyDate="Date is not selected!";
                return false;
            }
            this.emptyDate="";
            return true;
        },
        validateNights:function(){
            if(this.numberOfNights===""){
                this.emptyNights="Number of nights field is empty!";
                return false;
            }
            this.emptyNights="";
            return true;
        },
        calculatePrice:function(){
            this.price = this.numberOfNights*this.selectedApartment.priceForNight;
        },
        mountAll:function(){
            this.amenities = this.selectedApartment.amenities;
            this.getBasicAmenities();
            this.getDiningAmenities();
            this.getFacilityAmenities();
            this.getFamilyAmenities();
            this.getComments();
        },
        getComments:function(){
            this.comments = this.selectedApartment.comments;
            for(i=0;i<this.comments.length;i++){
                if(this.comments[i].disabledForGuests===false){
                    this.commentsToSee.push(this.comments[i]);
                }
            }
            //treba dodati da se vide samo oni koji su dozvoljeni
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
        calculateAvaliableDepartDate: function(aD){
            var d = new Date(aD);
            for(var i = 0; i < this.selectedApartment.freeDates.length; i ++){
                if(new Date(this.selectedApartment.freeDates[i].startDate) <= d && new Date(this.selectedApartment.freeDates[i].endDate) >= d){
                    return this.selectedApartment.freeDates[i].endDate;
                }
                
            }
        }

    },
    watch: {
        arriveDate: function(newDate, oldDate){
            this.arriveDate = newDate;
			var date = new Date();
			date.setDate(newDate.getDate());
            date.setMonth(newDate.getMonth());
            this.disabledDepartDates.to = new Date(date);
            this.disabledDepartDates.from = new Date(this.calculateAvaliableDepartDate(newDate));
			if(this.departDate != null && newDate > this.departDate){
                //this.departDate =  new Date(newDate.getTime()+86400000); 
                this.departDate = null;
            }
            this.arriveDateSelected=true;
            this.listOfNights=[];
            this.numberOfNights="";
            this.calucalateNights(this.arriveDate);
        },
    },
    components: {
        vuejsDatepicker
    }
});

