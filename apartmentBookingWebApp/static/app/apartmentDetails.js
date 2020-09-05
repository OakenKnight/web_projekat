Vue.component("apartmentDetails", {
    data: function () {
        return {
            myModal: false,
            error: false,
            apartments: [],
            searchedApartment: {},
            selectedApartment: {},
            arriveDate: null,
            departDate: null,
            maxPrice:"",
            minPrice:"",
            destination:"",
            price: "",
            picture: "",
            numberOfGuests: "",
            modal: false,
            disabledArriveDates: {
                to: new Date()
            },
            disabledDepartDates: {
                to:  new Date(2021, 0,1)
            }

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
                        <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" >Create account</button>
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" >Sign in</button>
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
                            <p class="depart-date-error" v-if="error">Please select the depart date too.</p>
                            <input name="search-btn" id="search-btn" class="btn btn-block justify-content-center" type="button" value="Search" v-on:click="searchApartments(searchedApartment)">
                        </form>
                    </div>
                </div>
            </div>
            <div class="info">
                <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/hotel.png" alt="not found"><strong>Hotel name</strong></label>
                <p class="details-hotel-name-p">{{selectedApartment.name}}</p>
                                                        
                <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                <p class="details-hotel-name-p">{{selectedApartment.location.address.street}} {{selectedApartment.location.address.number}}, {{selectedApartment.location.address.city}}</p>
                
                <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Number of guests</strong></label>
                <p class="details-hotel-name-p">{{selectedApartment.guestNumber}}</p>
            
                <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                <p class="details-hotel-name-p">{{selectedApartment.roomNumber}}</p>

                <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/money.png" alt="not found"><strong>Price for night</strong></label>
                <p class="details-hotel-name-p">{{selectedApartment.priceForNight}}</p>
            </div>
        </div>

            
    </div>


 





        
        

<!--
            <table class="table">
                                                        
                                                        <tbody>
                                                            <tr>
                                                                <td><strong>Hotel name</strong></td>
                                                                <td><strong>{{selectedApartment.name}}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Address</strong></td>
                                                                <td><strong>{{selectedApartment.location.address.street}} {{selectedApartment.location.address.number}}, {{selectedApartment.location.address.city}}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Number of guests</strong></td>
                                                                <td><strong>{{selectedApartment.guestNumber}}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Number of rooms</strong></td>
                                                                <td><strong>{{selectedApartment.roomNumber}}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Number of rooms</strong></td>
                                                                <td><strong>{{selectedApartment.roomNumber}}</strong></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>



    </div>
    -->
	`
    ,
    mounted() {
        axios
            .get('rest/apartments/' + this.$route.query.id)
            .then(response => {
                this.selectedApartment = response.data
            });
        //console.log(this.searchedApartment);
    },
    methods: {
        verifyArriveDate: function(){
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
            if(this.verifyArriveDate()){
                if(this.verifyDepartDate()){
                    return true;
                }
                return false;
            }
            return false;
        },

    },
    watch: {
        arriveDate: function(newDate, oldDate){
            this.searchedApartment.arriveDate = this.arriveDate;


			var date = new Date();
			date.setDate(newDate.getDate());
			date.setMonth(newDate.getMonth());
			this.disabledDepartDates.to = new Date(date);
			console.log(newDate > this.departDate);
			if(this.departDate != null && newDate > this.departDate){
				this.departDate = date.setDate(date.getDate() +1);
            }

        },
        departDate: function(newDate, oldDate){
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
    components: {
        vuejsDatepicker
    }
});

