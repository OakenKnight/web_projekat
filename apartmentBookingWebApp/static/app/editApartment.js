Vue.component("addApartment",{ 
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
            allAmenitiesEver: [],
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
            testApartment:{},
            newApartment: {
                id: null,
                name: null,
                apartmentType: "",
                roomNumber: "",
                guestNumber: "",
                location: {latitude: null, longitude: null, address:{street: null, number: null, city:null, zipCode: null, state:null}},
                freeDates: [],
                housekeeper: null,
                comments: [],
                pictures: [],
                priceForNight: "",
                arrivalTime: "",
                exitTime: "",
                apartmentStatus: null,
                amenities: [],
                reservationsId: []
            },
            arrivalHours: "",
            arrivalMinutes: "",
            exitHours: "",
            exitMinutes: "",
            exitTimeEmpty:"",
            arrivalTimeEmpty:"",
            emptyApartmentType:"",
            emptyGuests:"",
            emptyName:"",
            emptyRoomNumber:"",
            emptyAddress:"",
            emptyPrice:"",

            name:"",
            price:"",
            rooms:"",
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
                <div class="details">
                    <div class="row">
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/hotel-icon.png" alt="not found"><strong>Hotel name</strong></label>
                            <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Apartment's name" v-model="name">
                            <p style="color:red">{{emptyName}}</p>
                        </div>

                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                            <input type="search" id="address" placeholder="Address" />
                            <p style="color:red">{{emptyAddress}}</p>

                            <label hidden for="city">City</label>
                            <input hidden id="cityAlg" class="form-control" type="text">
                                                
                            <label hidden for="state">State</label>
                            <input hidden id="stateAlg" class="form-control" type="text"> 
                                                
                            <label hidden for="kurcina">Zip Code</label>
                            <input hidden id="postalCode" class="form-control" type="text">
                                                
                            <label hidden for="longitude">Long</label>
                            <input  hidden id="long" class="form-control" type="text">
                                            
                            <label hidden for="latitude">Lat</label>
                            <input hidden id="lat" class="form-control" type="text">
                        </div>
                        
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Guests</strong></label>
                            <div class="edit-combobox">
                                <select required v-model="numberOfGuests">
                                    <option value="" selected disabled>Guests</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                            <p style="color:red">{{emptyGuests}}</p>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                            <div class="edit-combobox">
                                <select required v-model="rooms">
                                    <option value="">Rooms</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <p style="color:red">{{emptyRoomNumber}}</p>

                        </div>

                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/room-apartment-icon.png" alt="not found"><strong>Apartment Type</strong></label>
                            <div class="edit-combobox">
                                <select required v-model="type">
                                    <option value="" selected disabled>Type</option>
                                    <option value="APARTMENT">Apartment</option>
                                    <option value="ROOM">Room</option>
                                </select>
                            </div>
                            <p style="color:red">{{emptyApartmentType}}</p>

                        </div>

                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"><strong>Price</strong></label>
                            <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Price for night" style="width:220px" v-model="price"/>
                            <p style="color:red">{{emptyPrice}}</p>

                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/check-in-icon.png" alt="not found"><strong>Arrival time</strong></label>
                            <div class="time">
                                <select required v-model="arrivalHours">
                                    <option value="" selected disabled>Hours</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                </select>
                                <p style="display: inline-block">:</p>
                                <select  required v-model="arrivalMinutes">
                                    <option value="" selected disabled>Mins</option>
                                    <option value="00">00</option>
                                    <option value="30">30</option>
                                </select>
                            </div>
                            <p style="color:red">{{arrivalTimeEmpty}}</p>

                        </div>
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/check-out-icon.png" alt="not found"><strong>Exit time</strong></label>
                            <div class="time">
                                <select required v-model="exitHours">
                                    <option value="" selected disabled>Hours</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                </select>
                                <p style="display: inline-block">:</p>
                                <select  required v-model="exitMinutes">
                                    <option value="" selected disabled>Mins</option>
                                    <option value="00">00</option>
                                    <option value="30">30</option>
                                </select>
                            </div>
                            <p style="color:red">{{exitTimeEmpty}}</p>

                        </div>  
                    </div>

                    <div class="row">
                        <div class="col">
                            <h4 class="details-hotel-name-p">Basic</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'BASIC'">
                                <label class="details-hotel-name-p"><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox"  v-on:click="addAmenityToNewApartment(a)" value=""> </label>
                                <p class="details-hotel-name-p">{{a.description}}</p>
                            </div>
                                        
                            <h4 class="details-hotel-name-p">Family features</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'FAMILY_FEATURES'">
                                <label class="details-hotel-name-p"><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox"  v-on:click="addAmenityToNewApartment(a)" value=""></label>
                                <p class="details-hotel-name-p">{{a.description}}</p>
                            </div>
                        </div>
                                    
                        <div class="col">
                            <h4 class="details-hotel-name-p">Facilities</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'FACILITIES'">
                                <label class="details-hotel-name-p"><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox" v-on:click="addAmenityToNewApartment(a)" value=""></label>
                                <p class="details-hotel-name-p">{{a.description}}</p>
                            </div>
                                        
                            <h4 class="details-hotel-name-p">Dining</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'DINING'">
                                <label class="details-hotel-name-p"><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox"  v-on:click="addAmenityToNewApartment(a)" value=""></label>
                                <p class="details-hotel-name-p">{{a.description}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <button class="reserve-book-button" type="button" v-on:click="createNewApartment(newApartment)">Create apartment</button>
                    </div>

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
            .get('rest/housekeepersApartment', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>(this.apartments = response.data, this.apartmentsBackUp = [...this.apartments]));
    
            axios
            .get('rest/housekeepersReservation', {params: {
                Authorization: 'Bearer ' + jwt 
            }})
            .then(response =>(this.reservations = response.data ,this.reservationsBackUp = [...this.reservations]));
    
            axios
            .get('rest/housekeepersGuests', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response => (this.guests = response.data, this.guestsBackUp = [...this.guests]));

            axios.get('rest/getAllAmenities')
            .then(response => (this.allAmenitiesEver = response.data));

            axios
            .get('rest/getHousekeeper', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>(this.housekeeper = response.data));
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
        logout: function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        
        
        addAmenityToNewApartment: function(amenity){
            this.newApartment.amenities.push(amenity);
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

        validateArrivalTime: function(){
            if(this.arrivalHours==="" && this.arrivalMinutes===""){
                this.testApartment.arrivalTime="14:00";
                this.arrivalTimeEmpty="";
                return true;
            }else{
                if(this.arrivalHours==="" && this.arrivalMinutes!==""){
                    this.arrivalTimeEmpty = "Please select arrival hours";
                    return false;
                }else if(this.arrivalHours!=="" && this.arrivalMinutes===""){
                    this.arrivalTimeEmpty = "Please select arrival minutes";
                    return false;
                }else{
                    this.arrivalTime = this.arrivalHours + ":" + this.arrivalMinutes;
                    this.testApartment.arrivalTime = this.arrivalTime;
                    this.arrivalTimeEmpty="";
                    return true;
                }
            }
        },
        validateDepartTime: function(){
            if((this.exitHours==="" | this.exitHours.trim()==="") && (this.exitMinutes==="" | this.exitMinutes.trim()==="")){
                this.testApartment.exitTime="10:00";
                this.exitTimeEmpty="";
                return true;
            }else{
                if((this.exitHours==="" | this.exitHours.trim()==="") && (this.exitMinutes!=="" | this.exitMinutes.trim()!=="")){
                    this.exitTimeEmpty = "Please select depart hours";
                    return false;
                }else if((this.exitHours!=="" | this.exitHours.trim()!=="") && (this.exitMinutes==="" | this.exitMinutes.trim()==="")){
                    this.exitTimeEmpty = "Please select depart minutes";
                    return false;
                }else{
                    this.testApartment.exitTime = this.exitHours + ":" + this.exitMinutes;
                    this.exitTimeEmpty="";
                    return true;
                }
            }
        },
        validateName: function(){
            if(this.name==="" | this.name.trim()===""){
                this.emptyName="Please enter name";
                console.log('NAME TRUE'+ this.name);
                return false;
            }
            console.log('NAME '+ this.name);
            this.emptyName="";
            return true;
        },
        validateGuests: function(){
            if(this.numberOfGuests===""){
                this.emptyGuests="Please select number of guests";
                return false;
            }
            this.emptyGuests="";
            return true;
        },
        validateRooms: function(){
            if(this.rooms===""){
                this.emptyRoomNumber="Please select number of rooms";
                return false;
            }
            this.emptyRoomNumber="";
            return true;
        },
        validateType: function(){
            if(this.type===""){
                this.emptyApartmentType="Please select type";
                return false;
            }
            this.emptyApartmentType="";
            return true;
        },
        validateAddress:function(){
            this.adresaZaPretragu = document.querySelector('#address').value;
            if(this.adresaZaPretragu===""){
                this.emptyAddress="Please enter address"
                return false;
            }else{
                this.emptyAddress="";
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
                this.testApartment.location = this.location;

                return true;
            }
        },
        validatePrice:function(){
            if(this.price==="" | this.price.trim()===""){
                this.emptyPrice="Please enter price";
                return false;
            }
            this.emptyPrice=""
            return true;
        },
        validate:function(){
            if(this.validateArrivalTime() & this.validateDepartTime() & this.validateAddress() & this.validateGuests() & this.validateName() & this.validatePrice() & this.validateRooms() & this.validateType()){
                return true;
            }

            return false;
        },
        createNewApartment: function(){

            
            this.testApartment.id = (new Date()).getTime();
            this.testApartment.amenities = this.newApartment.amenities;
            this.testApartment.comments = [];
            this.testApartment.reservationsId=[]
            this.testApartment.freeDates=[];
            this.testApartment.pictures=[];
            
            //var jwt = window.localStorage.getItem('jwt');
            this.testApartment.housekeeper = this.housekeeper;
            this.testApartment.apartmentStatus = "ACTIVE";
            
            if(this.validate()){
                axios
                .post("/rest/createNewApartment", this.testApartment)
                .then(function(response){
                    alert(response.data);
                    var jwt = window.localStorage.getItem('jwt');
                    axios
                    .get('rest/housekeepersApartment', {params: {
                    Authorization: 'Bearer ' + jwt
                    }})
                    .then(response =>(this.apartments = response.data, this.apartmentsBackUp = [...this.apartments]));

                });

                this.newApartment= {
                    id: null,
                    name: "",
                    apartmentType: "",
                    roomNumber: "",
                    guestNumber: "",
                    location: {latitude: null, longitude: null, address:{street: null, number: null, city:null, zipCode: null, state:null}},
                    freeDates: [],
                    housekeeper: null,
                    pictures: [],
                    priceForNight: "",
                    arrivalTime: "",
                    exitTime: "",
                    apartmentStatus: null,
                    amenities: [],
                    housekeeper: null,
                }
            }
             
            
        }
    },
    
	watch:{
        type:function(newType,oldType){
            this.type = newType;
            this.testApartment.apartmentType=this.type;
        },
        rooms: function(newRooms, oldRooms){
            this.rooms = newRooms;
            this.testApartment.roomNumber = this.rooms;
        },
		name: function(newName, oldName){
            this.name=newName;
            this.testApartment.name=newName;
		},
		price: function(newPrice, oldPrice){
            this.testApartment.priceForNight = this.price;

			if(isNaN(newPrice)){
				this.price = newPrice.substring(0,newPrice.length -1);
            }

        },
        numberOfGuests: function(newGuests, oldGuests){
            this.numberOfGuests=newGuests;
            this.testApartment.guestNumber = this.numberOfGuests;
        },
        exitHours:function(newH,oldH){
            this.exitHours = newH;
        },
        arrivalHours:function(newH,oldH){
            this.arrivalHours = newH;
        },
        arrivalMinutes:function(newM,oldM){
            this.arrivalMinutes = newM;
        },
        exitMinutes:function(newM,oldM){
            this.exitMinutes = newM;
        },
        
	},
    components:{
        vuejsDatepicker,
        
	}
});

