Vue.component("algoliaPLACES",{ 
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
            apartmentSortCriteria: "1",
            loggedInUser:{},
            disabledArriveDates: {
                to: new Date()
            },
            disabledDepartDates: {
                to:  new Date(2021, 0,1)
            },
            addressAlg:"",
            cityAlg:"",
            stateAlg:"",
            place:{},
            places:null,
            address:"",
            adresaZaPretragu:"",
            gradZaPretragu:"",
            drzavaZaPretragu:"",
            zipZaPretragu:"",
            longZaPretragu:"",
            latZaPretragu:"",
            location:{},
            adresaObjekat:{}
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

                    
                    </div>
                </div>
            </div>
            <div class="info">
                




                            <div class="col-md-6 form-group">
                                <label for="addressa">Street Address</label>
                                <input type="search" id="address" placeholder="Where are we going?" />
                            </div>

                            <div class="col-md-6 form-group">
                                <label hidden for="city">City</label>
                                <input hidden id="cityAlg" class="form-control" type="text">
                            </div>

                            <div class="col-md-6 form-group">
                                <label hidden for="state">State</label>
                                <input hidden id="stateAlg" class="form-control" type="text">
                            </div>

                            <div class="col-md-6 form-group">
                                <label hidden for="kurcina">Zip Code</label>
                                <input hidden id="postalCode" class="form-control" type="text">
                            </div>

                            <div class="col-md-6 form-group">
                                <label hidden for="longitude">Long</label>
                                <input  hidden id="long" class="form-control" type="text">
                            </div>
                            <div class="col-md-6 form-group">
                                <label hidden for="latitude">Lat</label>
                                <input hidden id="lat" class="form-control" type="text">
                            </div>
                                <p class="depart-date-error" v-if="arriveDate!=null && departDate==null">Please select the depart date too.</p> 
                            <input name="search-btn" id="search-btn" class="btn btn-block" type="button" value="Search" v-on:click="searchAlg()" :disabled="arriveDate!=null && departDate==null">

                




                    

                
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

      this.places = places({
            appId: 'plQ4P1ZY8JUZ',
            apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
            container: document.querySelector('#address'),
                templates:{
                        value:function(suggestion){
                            return suggestion.name;
                        }
                    }
                }).configure({
                    type:'address'
                });

                this.places.on('change',function getLocationData(e){
                    document.querySelector('#address').value=e.suggestion.value || '';
                    document.querySelector('#stateAlg').value=e.suggestion.country || '';
                    document.querySelector('#cityAlg').value=e.suggestion.city || '';
                    document.querySelector('#long').value=e.suggestion.latlng.lng || '';
                    document.querySelector('#lat').value=e.suggestion.latlng.lat || '';
                    document.querySelector('#postalCode').value=e.suggestion.postcode || '';

                    console.log(this.address);
                });
	},
	methods:{
        searchAlg:function(){
            this.adresaZaPretragu = document.querySelector('#address').value;
            this.drzavaZaPretragu = document.querySelector('#stateAlg').value;
            this.gradZaPretragu = document.querySelector('#cityAlg').value;
            this.longZaPretragu = document.querySelector('#long').value;
            this.latZaPretragu = document.querySelector('#lat').value;                    
            this.zipZaPretragu = document.querySelector('#postalCode').value;

            this.location.latitude =this.latZaPretragu;
            this.location.longitude =this.longZaPretragu;
            this.adresaObjekat.street = this.adresaZaPretragu;
            this.adresaObjekat.city = this.gradZaPretragu;
            this.adresaObjekat.zipCode = this.zipZaPretragu;
            this.adresaObjekat.state = this.drzavaZaPretragu;

            this.location.address = this.adresaObjekat;


            console.log(this.location);


            console.log(this.adresaZaPretragu);
            console.log(this.drzavaZaPretragu);

            console.log(this.gradZaPretragu);

            console.log(this.longZaPretragu);

            console.log(this.latZaPretragu);

            console.log(this.zipZaPretragu);



        },
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
            var jwt = window.localStorage.getItem('jwt');
            if(jwt){
                window.location.href = "#/apartmentDetails?id=" + apartment.id;
            }else{
                alert("Please login to continue");
                window.location.href="#/login";
            }
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
            
        },
        compareNameASC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
          
            let comparison = 0;
            if (nameA > nameB) {
              comparison = 1;
            } else if (nameA < nameB) {
              comparison = -1;
            }
            return comparison;
        },
        compareNameDESC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
          
            let comparison = 0;
            if (nameA < nameB) {
              comparison = 1;
            } else if (nameA > nameB) {
              comparison = -1;
            }
            return comparison;
        },
        comparePriceDESC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const priceA = a.priceForNight;
            const priceB = b.priceForNight;
          
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
            const priceA = a.priceForNight;
            const priceB = b.priceForNight;
          
            let comparison = 0;
            if (priceA < priceB) {
              comparison = -1;
            } else if (priceA > priceB) {
              comparison = 1;
            }
            return comparison;
        },
        compareRatingASC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const markA = this.calculateMark(a);
            const markB = this.calculateMark(b);
          
            let comparison = 0;
            if (markA > markB) {
              comparison = 1;
            } else if (markA < markB) {
              comparison = -1;
            }
            return comparison;
        },
        compareRatingDESC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const markA = this.calculateMark(a);
            const markB = this.calculateMark(b);
          
            let comparison = 0;
            if (markA < markB) {
              comparison = 1;
            } else if (markA > markB) {
              comparison = -1;
            }
            return comparison;
        },
        compareRoomsASC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const roomA = a.roomNumber;
            const roomB = b.roomNumber;
          
            let comparison = 0;
            if (roomA > roomB) {
              comparison = 1;
            } else if (roomA < roomB) {
              comparison = -1;
            }
            return comparison;
        },
        compareRoomsDESC: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const roomA = a.roomNumber;
            const roomB = b.roomNumber;
          
            let comparison = 0;
            if (roomA < roomB) {
              comparison = 1;
            } else if (roomA > roomB) {
              comparison = -1;
            }
            return comparison;
        },
        sortByNameASC : function(){
            this.apartments.sort(this.compareNameASC);
        },
        sortByNameDESC : function(){
            this.apartments.sort(this.compareNameDESC);
        },
        sortByRatingASC:function(){
            this.apartments.sort(this.compareRatingASC);
        },
        sortByRatingDESC:function(){
            this.apartments.sort(this.compareRatingDESC);
        },
        sortByPriceASC:function(){
            this.apartments.sort(this.comparePriceASC);
        },
        sortByPriceDESC:function(){
            this.apartments.sort(this.comparePriceDESC);
        },
        sortByRoomsASC:function(){
            this.apartments.sort(this.compareRoomsASC);
        },
        sortByRoomsDESC:function(){
            this.apartments.sort(this.compareRoomsDESC);
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

        apartmentSortCriteria: function(newType, oldType){
            console.log(newType);
            if(newType == 2){
                this.sortByNameASC();
            }else if(newType == 3){
                this.sortByNameDESC();
            }else if(newType == 4){
                this.sortByRatingASC();
            }else if(newType == 5){
                this.sortByRatingDESC();
            }else if(newType == 6){
                this.sortByPriceASC();
            }else if(newType == 7){
                this.sortByPriceDESC();
            }else if(newType == 8){
                this.sortByRoomsASC();
            }else if(newType == 9){
                this.sortByRoomsDESC();
            }else{
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
            }
        }
	},
    components:{
        vuejsDatepicker,
        
	}
});

