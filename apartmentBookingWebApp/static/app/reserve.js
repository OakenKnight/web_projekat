Vue.component("reserve",{ 
	data: function(){
		return{
            apartments: [],
            searchedApartment:{},
            arriveDate: null,
            departDate: null,
            minPrice: "",
            maxPrice:"",
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
                        <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" >Create account</button>
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" >Sign in</button>
                    </div>
                </li>

                <!--
    <li>
                    <button type="button" class="btn btn-primary my-2 my-lg-0" onclick="location.href='#/register'" >Create account</button>
                </li>
                <li>
                    <button type="button" class="btn btn-primary my-2 my-lg-0"  onclick="location.href='#/login'" >Sign in</button>
                </li>
                -->
                
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
                                    <select required v-model="searchedApartment.numberOfGuests">
                                        <option value="" disabled selected>Guests</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    <input type="text" placeholder="Min price" name="minP" class="price" v-model="minPrice">
                                    <input type="text" placeholder="Max price" name="maxP" class="price" v-model="maxPrice">  
                                </div>
                                <input name="search-btn" id="search-btn" class="btn btn-block" type="button" value="Search" v-on:click="searchApartments(searchedApartment)">
                            </form>
                        </div>
                    </div>
                </div>
                <div class="info">
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
                    <div class="row">
                            <div class="apartment col-md-6" v-for="a in apartments">
                                <div class="apartment-border">
                                    <img class="apartment-pic" v-bind:src="'assets/images/apartmentsimg/' + a.pictures[0]" alt="image not found">
                                    <div class="apartment-info">
                                        <h5><strong>{{a.name}}</strong>, {{a.location.address.city}}</h5>
                                        <p><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"> {{a.location.address.street}} {{a.location.address.number}}</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"> {{a.guestNumber}} people</p>
                                        <p><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"> {{a.roomNumber}} rooms</p>
                                        <h5><img class="apartment-info-icons" src="/assets/images/star-icon.png" alt="not found"> <strong class="">{{calculateMark(a)}} </strong></h5>
                                        <div class="price-for-night">
                                            <p style="color: white;">{{a.priceForNight}}€ </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <footer class="footer">
                </footer>
        </div>
	</div>
	`
	,
	mounted () {
        
	},
	methods:{
		calculateMark: function(apartment){
			var sum = 0;
			apartment.comments.forEach(element => {
				sum += element.reviewsMark;
			});
			return  (sum / apartment.comments.length);
        },
        searchApartments: function(searchedApartment){
            console.log(searchedApartment.arriveDate);
			axios
			.post('rest/search',searchedApartment)
			.then(response => {this.apartments = response.data})
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

	},
    components:{
		vuejsDatepicker
	}
});