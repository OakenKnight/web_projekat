Vue.component("welcome",{ 
	data: function(){
		return{
            myModal:false,
            error:false,
            apartments: [],
            amenities:[],
            basicAmenities:[],
            familyAmenities:[],
            facilityAmenities:[],
            diningAmenities:[],
            searchedApartment:{},
            selectedApartment:{},
            comments:[],
            arriveDate: null,
            departDate: null,
            modal:false,
            minPrice: "",
            maxPrice:"",
            numberOfGuests:"",
            loggedIn:null,
            loggedInUser:{},
            disabledArriveDates: {
                to: new Date()
            },
            disabledDepartDates: {
                to:  new Date(2021, 0,1)
            }
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
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/guestProfile'" v-if="loggedIn==true" >Profile</button>

                        </div>
                </li>


                
            </ul>
        </nav>
        <div id="start">
            <div class="container-fluid">

                <div class="bk-img row justify-content-center">
                    <div class="search-form col-md-4">
                        <form class="search" action="!#">
                            <input class="search-destination" type="text" name="destination" placeholder="Search destination" v-model="searchedApartment.destination">
                            <div>
                                <div class="datepicker">
                                    <vuejs-datepicker :disabled-dates="disabledArriveDates" format="dd.MM.yyyy" placeholder="Arrive" name="arriveDate" v-model="arriveDate" ></vuejs-datepicker>
                                </div>
                                <div class="datepicker">
                                    <vuejs-datepicker :disabled-dates="disabledDepartDates" format="dd.MM.yyyy" placeholder="Depart" name="departDate" v-model="departDate"></vuejs-datepicker>
                                </div>
                                <select required v-model="numberOfGuests">
                                    <option value="" disabled selected hidden>Guests</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>

                                <input type="text" placeholder="Min price" name="minP" class="price" v-model="minPrice">
                                <input type="text" placeholder="Max price" name="maxP" class="price" v-model="maxPrice">  
                            </div>
                                <p class="depart-date-error" v-if="arriveDate!=null && departDate==null">Please select the depart date too.</p> 
                            <input name="search-btn" id="search-btn" class="btn btn-block" type="button" value="Search" v-on:click="searchApartments(searchedApartment)" :disabled="arriveDate!=null && departDate==null">
                        </form>
                    </div>
                </div>
            </div>
            <div class="info">
            
                <div class="row">
                    <div class="apartment col" v-for="a in apartments">
                        <div class="apartment-border">
                            <img class="apartment-pic" v-bind:src="'assets/images/apartmentsimg/' + a.pictures[0]" alt="image not found">
                            <div class="apartment-info">
                                <h5><strong>{{a.name}}</strong>, {{a.location.address.city}}</h5>
                                <h5><img class="apartment-info-icons" src="/assets/images/star-icon.png" alt="not found"> <strong class="">{{calculateMark(a)}} </strong></h5>
                                <p><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"> {{a.location.address.street}} {{a.location.address.number}}</p>
                                <p><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"> {{a.guestNumber}} people</p>
                                <p><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"> {{a.roomNumber}} rooms</p>
                                <p><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"> {{a.priceForNight}} €</p>
                                <div class="row">
                                    <button class="reserve-more-info-button" type="button" v-on:click="showMore(a)" >More info...</button>
                                    <button class="reserve-book-button" type="button" v-on:click="bookNow(a)">Book now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row"> 
                    <div class="info-content col-md-4">
                        <img class="icons" src="assets/images/hotel.png" alt="hotel icon">
                        <p><strong> A place for everyone </strong><br>
                            We stand for diversity, inclusion and families everywhere.</p>
                    </div>

                    <div class="info-content col-md-4">
                        <img  class="icons" src="assets/images/money.png" alt="money icon">
                        <p><strong> More for less </strong><br>
                            More space, more privacy, more amenities — more value </p>
                    </div>
                    <div class="info-content col-md-4">
                        <img class="icons" src="assets/images/planet.png" alt="planet icon">
                        <p><strong> Worldwide Coverage </strong><br>
                            Over 1,400,000 hotels in more than 200 countries</p>
                    </div>
                
                </div>

                
                    

                <!--ASFASF-->
                    
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
                                                            <p class="details-hotel-name-p">{{selectedApartment.name}}</p>
                                                        </div>
                                                        <div class="col">
                                                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                                                            <p class="details-hotel-name-p">{{selectedApartment.location.address.street}} {{selectedApartment.location.address.number}}, {{selectedApartment.location.address.city}}</p>
                                                        </div>
                                                        <div class="col">
                                                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Guests</strong></label>
                                                            <p class="details-hotel-name-p">{{selectedApartment.guestNumber}}</p>
                                                        </div>
                                                        <div class="col">
                                                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                                                            <p class="details-hotel-name-p">{{selectedApartment.roomNumber}}</p>
                                                        </div>
                                                        <div class="col">
                                                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"><strong>Price</strong></label>
                                                            <p class="details-hotel-name-p">{{selectedApartment.priceForNight}}</p>
                                                        </div>
                                                    </div

                                                    <div class="row">
                                                        <div class="col">
                                                            <h4>Basic</h4> 
                                                            <div class="amenity col-md-6" v-for="a in basicAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        
                                                            <h4>Family features</h4> 
                                                            <div class="amenity col-md-6" v-for="a in familyAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        </div>

                                                        <div class="col">
                                                            <h4>Facilities</h4> 
                                                            <div class="amenity col-md-6" v-for="a in facilityAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        
                                                            <h4>Dining</h4> 
                                                            <div class="amenity col-md-6" v-for="a in diningAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <h4 class="details-hotel-name-label" v-if="comments.length>0">Comments</h4>
                                                        
                                                    <div class="comments" v-for="c in comments">
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

                                                </div>

                                                <button class="reserve-book-button" type="button" v-on:click="bookNow(selectedApartment)">Book now!</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- </transition> -->
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
        }
	},
	methods:{
        logout: function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        verifyArriveDate: function(){
            //ako je undefined vrati false
            // ako postoji onda vrati true
            if(this.arriveDate){
                return false;
            }else{
                return true;
            }
        },
        verifyDepartDate: function(){
            if(this.departDate){
                return false;
            }else{
                return true;
            }
        },
        verifyDates: function(){
            //ako je arrive pun i ako je depart pun vrati true
            if(this.verifyArriveDate()){
                if(this.verifyDepartDate()){
                    return true;
                }
                return false;
            }
            return true;
        },
        bookNow : function(apartment){
            window.location.href = "#/apartmentDetails?id=" + apartment.id;
        },
		calculateMark: function(apartment){
			var sum = 0;
			apartment.comments.forEach(element => {
				sum += element.reviewsMark;
            });
            if(apartment.comments.length>0){
                return  (sum / apartment.comments.length);
            }else{
                return "No reviews";
            }
        },
        searchApartments: function(searchedApartment){
            
            if(this.verifyArriveDate()){
                var aptDTO = {destination:searchedApartment.destination, arriveDate:null,
                departDate:null, numberOfGuests:searchedApartment.numberOfGuests,
                minPrice:searchedApartment.minPrice, maxPrice:searchedApartment.maxPrice};
                
                axios
                .post('rest/search',aptDTO)
                .then(response => {this.apartments = response.data})
            }else{
                console.log(this.arriveDate);
                var aptDTO = {destination:searchedApartment.destination, arriveDate:this.arriveDate,
                departDate:this.departDate, numberOfGuests:searchedApartment.numberOfGuests,
                minPrice:searchedApartment.minPrice, maxPrice:searchedApartment.maxPrice};     
                axios
                .post('rest/search',aptDTO)
                .then(response => {this.apartments = response.data})           
            }

            
           
			
        },
        showMore: function(a){
            console.log(a);
            this.selectedApartment = a;
            /*
            if(this.verifyDates()){
                window.location.href = "#/apartmentDetails?id=" + this.selectedApartment.id+"&arriveDate="+this.arriveDate+"&departDate="+this.departDate;
            }else{
                window.location.href = "#/apartmentDetails?id=" + this.selectedApartment.id;
            }
            //window.location.href = '#/apartmentDetails'+'?';
            //console.log(this.selectedApartment.name);

            */
            this.amenities = a.amenities;
            this.getBasicAmenities();
            this.getDiningAmenities();
            this.getFacilityAmenities();
            this.getFamilyAmenities();
            this.getComments();
            this.myModal = true;
        },
        getComments:function(){
            this.comments = this.selectedApartment.comments;
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
        guestProfile:function(){
            window.location.href = "#/guestProfile";
            
        }

	},
	watch:{
		arriveDate: function(newDate, oldDate){
            this.searchedApartment.arriveDate = this.arriveDate;


			var date = new Date();
			date.setDate(newDate.getDate());
			date.setMonth(newDate.getMonth());
			this.disabledDepartDates.to = new Date(date);
			console.log(newDate > this.departDate);
			if(this.departDate != null && newDate > this.departDate){
				this.departDate =  new Date(newDate.getTime()+86400000); //date.setDate(date.getDate() +1);
            }

        },
        departDate: function(newDate, oldDate){
            this.departDate = newDate;
            this.searchedApartment.departDate = this.departDate;
        },
		minPrice: function(newPrice, oldPrice){
            this.searchedApartment.minPrice = this.minPrice;
			if(isNaN(newPrice)){
				this.minPrice = newPrice.substring(0,newPrice.length -1);
			}
		},
		maxPrice: function(newPrice, oldPrice){
            this.searchedApartment.maxPrice = this.maxPrice;

			if(isNaN(newPrice)){
				this.maxPrice = newPrice.substring(0,newPrice.length -1);
			}
        },
        numberOfGuests: function(newNumber, oldNumber){
            this.searchedApartment.numberOfGuests = this.numberOfGuests;

			if(isNaN(this.numberOfGuests)){
				this.numberOfGuests = "Guests   ";
			}
		},


	},
    components:{
		vuejsDatepicker
	}
});

