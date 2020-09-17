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
            minRooms:"",
            maxRooms:"",
            guests:"",
            numberOfGuests:"",
            loggedIn:null,
            apartmentSortCriteria: "1",
            loggedInUser:{},
            commentsToSee:[],
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
            adresaObjekat:{},
            allAmenitiesEver:[],
            amenitiesForFilter:[],
            cboxes:null,
            expanded :false,
            apartmentsBackUp:[],
            apartmentsForFilter:[],
            type:""
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
                        <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" v-if="loggedIn!=true" >Create account</button>
                        <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" v-if="loggedIn!=true" >Sign in</button>
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="logout()" v-if="loggedIn" >Sign out</button>
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="takeMeHome()" v-if="loggedIn==true" >Profile</button>

                        </div>
                </li>


                
            </ul>
        </nav>
        <div id="start">
            <div class="container-fluid">

                <div class="bk-img row justify-content-center">
                    <div class="search-form row">
                        <form class="search" action="!#">
                            <input class="search-destination" type="text" name="destination" placeholder="Search destination" v-model="searchedApartment.destination">

                            <div>
                                <div class="datepicker">
                                    <vuejs-datepicker :disabled-dates="disabledArriveDates" format="dd.MM.yyyy" monday-first placeholder="Arrive" name="arriveDate" v-model="arriveDate" ></vuejs-datepicker>
                                </div>
                                <div class="datepicker">
                                    <vuejs-datepicker :disabled-dates="disabledDepartDates" format="dd.MM.yyyy" monday-first placeholder="Depart" name="departDate" v-model="departDate"></vuejs-datepicker>
                                </div>
                                

                                
                                <input type="text" placeholder="Min rooms" name="minR" class="price" v-model="minRooms">
                                <input type="text" placeholder="Max rooms" name="maxR" class="price" v-model="maxRooms">  
                                
                                <input type="text" placeholder="Guests" name="guests" class="price" v-model="numberOfGuests">

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
                                <option value="2">Sort by name ascending </option>
                                <option value="3">Sort by name descending</option>
                                <option value="4">Sort by rating ascending</option>
                                <option value="5">Sort by rating descending</option>
                                <option value="6">Sort by price ascending</option>
                                <option value="7">Sort by price descending</option>
                                <option value="8">Sort by rooms ascending</option>
                                <option value="9">Sort by rooms descending</option>
                            </select>
                        </div>

                        
                        <ul style="list-style-type:none">
                            <li class="dropdown">
                                <p data-toggle="dropdown" class="dropdown-toggle" 
                                style="text-align: center; height: 30px;
                                    width: 200px;
                                    background-color:white;
                                    border-radius: 4px;
                                    margin: 20px;
                                    border-color: #dddfe2;
                                    border: hidden;
                                    box-sizing: border-box;
                                    box-shadow: 0 4px 8px 0 rgba(0,0,0,.19);
                                    
                                    "
                                    >
                                    Select amenities<b class="caret"></b></p>
                                    <ul class="dropdown-menu" >
                                        <li v-for='a in allAmenitiesEver'>
                                            <div class="checkbox">
                                                <label style="margin-left:8px; font-weight:bold;font-size: medium;">{{a.name}}<input type="checkbox" :id='a.id' v-on:click="addAmenity(a)":checked="doesAmenityExist(a)"/></label>
                                            </div>
                                        </li>
                                    </ul>
                            </li>
                        </ul>

                        <button class="btn" style="height:50px;" v-on:click="filterSearch()">Filter search</button>

                    

                    

                    
                    
                </div>
                <div class="row">
                    <div class="apartment col" v-for="a in apartments">
                        <div class="apartment-border">
                            <img class="apartment-pic" v-if="a.pictures.length>0" v-bind:src="'assets/images/apartmentsimg/' + a.pictures[0]" alt="image not found">
                            <div class="apartment-info">
                                <h5><strong>{{a.name}}</strong></h5>
                                <h5><img class="apartment-info-icons" src="/assets/images/star-icon.png" alt="not found"> <strong class="">{{calculateMark(a)}} </strong></h5>
                                <p><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"> {{a.location.address.street}} {{a.location.address.number}}, {{a.location.address.zipCode}} {{a.location.address.city}}</p>
                                <p><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"> {{a.guestNumber}} people</p>
                                <p><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"> {{a.roomNumber}} rooms</p>
                                <p><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"> {{a.priceForNight}} €</p>
                                <div class="row justify-content-center">
                                    <button class="reserve-more-info-button" type="button" v-on:click="showMore(a)" >More info...</button>
                                    <button class="reserve-book-button" type="button" v-if="loggedIn" v-on:click="bookNow(a)">Book now!</button>
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

                
                    

                <!--MODALNI DIJALOG SA DETALJIMA APARTMANA-->
                    
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
                                                            <p class="details-hotel-name-p">{{selectedApartment.location.address.street}} {{selectedApartment.location.address.number}}, {{selectedApartment.location.address.zipCode}} {{selectedApartment.location.address.city}} </p>
                                                        </div>
                                                        <div class="col">
                                                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/building-type.png" alt="not found"><strong>Type</strong></label>
                                                            <p class="details-hotel-name-p">{{selectedApartment.apartmentType}}</p>
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
                                                    </div>

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

                                                <button class="reserve-book-button" type="button" v-if="loggedIn" v-on:click="bookNow(selectedApartment)">Book now!</button>

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

            axios
            .get('rest/getUserRole', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>{ this.type = response.data });
            
        }

        axios
        .get('rest/getAllAmenities')
        .then(response => (this.allAmenitiesEver = response.data));


        var checkboxes = document.getElementById("checkbox");
        if(!this.expanded){
            checkboxes.style.display="block";
            this.expanded=true;
        }else{
            checkboxes.style.display="none";
            this.expanded=false;
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
        filterSearch:function(){
            console.log(this.apartmentsBackUp);
            this.apartments = [...this.apartmentsBackUp];
            var lista=[];
           
            var brojac=0;
            if(this.amenitiesForFilter.length>0){
                for(var i=0;i<this.apartmentsBackUp.length;i++){
                    for(var j=0;j<this.amenitiesForFilter.length;j++){
                        for(var k=0;k<this.apartmentsBackUp[i].amenities.length;k++){
                            if(this.apartmentsBackUp[i].amenities[k].id===this.amenitiesForFilter[j].id){
                                brojac++;
                            }
                        }
                        if(brojac==this.amenitiesForFilter.length){
                            lista.push(this.apartmentsBackUp[i]);
                        }
                    }
                    brojac=0;
                }
    
               this.apartments=[...lista];

            }else{
                this.apartments=[...this.apartmentsBackUp];
            }
            
        },
        addAmenity: function(amenity){
            if(this.doesAmenityExist(amenity)){
                for( var i = 0; i < this.amenitiesForFilter.length; i++){ 
                    if ( this.amenitiesForFilter[i].id === amenity.id){
                        this.amenitiesForFilter.splice(i, 1); 
    
                    }  
                }
            }else{
                this.amenitiesForFilter.push(amenity);
            }
        },
        doesAmenityExist:function(amn){
            var a = this.amenitiesForFilter.filter(function(amenity){
                return amenity.id == amn.id;
            });
     
            if(a[0]){
                return true;
            }else{
                return false;
            }
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
                departDate:null, minRooms:searchedApartment.minRooms,maxRooms:searchedApartment.maxRooms,
                minPrice:searchedApartment.minPrice, maxPrice:searchedApartment.maxPrice, numberOfGuests:searchedApartment.numberOfGuests};
                
                axios
                .post('rest/search',aptDTO)
                .then(response => {this.apartments = response.data,this.apartmentsBackUp = response.data, this.amenitiesForFilter=[]})
            }else{
                console.log(this.arriveDate);
                var aptDTO = {destination:searchedApartment.destination, arriveDate:this.arriveDate,
                departDate:this.departDate, minRooms:searchedApartment.minRooms,maxRooms:searchedApartment.maxRooms,
                minPrice:searchedApartment.minPrice, maxPrice:searchedApartment.maxPrice, numberOfGuests:searchedApartment.numberOfGuests};     
                axios
                .post('rest/search',aptDTO)
                .then(response => {this.apartments = response.data,this.apartmentsBackUp = response.data, this.amenitiesForFilter=[]})           
            }

            
           
			
        },
        showMore: function(a){
            console.log(a);
            this.selectedApartment = a;

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
            date.setHours(0,0,0,0);
			this.disabledDepartDates.to = new Date(date);
            console.log("DATUM" + date);
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
        minRooms: function(newRooms, oldRooms){
            this.searchedApartment.minRooms = this.minRooms;
			if(isNaN(newRooms)){
				this.minRooms = newRooms.substring(0,newRooms.length -1);
			}
		},
		maxRooms: function(newRooms, oldRooms){
            this.searchedApartment.maxRooms = this.maxRooms;

			if(isNaN(newRooms)){
				this.maxRooms = newRooms.substring(0,newRooms.length -1);
            }
            
        },
        numberOfGuests: function(newGuests, oldGuests){
            this.searchedApartment.numberOfGuests = this.numberOfGuests;

			if(isNaN(newGuests)){
				this.numberOfGuests = newGuests.substring(0,newGuests.length -1);
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
                
            }
        }
	},
    components:{
		vuejsDatepicker
	}
});

