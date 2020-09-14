Vue.component("editApartment",{ 
	data: function(){
		return{
            selectedApartmentBackUp:{},
            selectedApartment:{},
            apartments:[],
            basicAmenities:[],
            familyAmenities:[],
            facilityAmenities:[],
            diningAmenities:[],
            comments:[],
            loggedIn:null,
            apartmentSortCriteria: "1",
            loggedInUser:{},
            allAmenitiesEver: [],
            addressAlg:"",
            cityAlg:"",
            stateAlg:"",
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
            priceForNight:"",
            myModal:false,
            myModalFail:false
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
                            <input class="edit-apartment-input" type="text" name="hotelName" v-model="selectedApartment.name">
                            <p style="color:red">{{emptyName}}</p>

                        </div>
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>

                            <input type="search" id="address" placeholder="Address" value=''/>
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
                                <select required v-model="selectedApartment.guestNumber">
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
                                <select required v-model="selectedApartment.roomNumber">
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
                                <select required v-model="selectedApartment.apartmentType">
                                    <option value="" selected disabled>Type</option>
                                    <option value="APARTMENT">Apartment</option>
                                    <option value="ROOM">Room</option>
                                </select>
                            </div>
                            <p style="color:red">{{emptyApartmentType}}</p>
                        </div>

                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"><strong>Price</strong></label>
                            <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Price for night" style="width:220px" v-model="priceForNight"/>
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
                            <h4>Basic</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'BASIC'">
                                <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox" :checked="doesAmenityExist(a)" v-on:click="addAmenity(a)" value=""> </label>
                                <p>{{a.description}}</p>
                            </div>
                        
                            <h4>Family features</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'FAMILY_FEATURES'">
                                <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox" :checked="doesAmenityExist(a)" v-on:click="addAmenity(a)" value=""></label>
                                <p>{{a.description}}</p>
                            </div>
                        </div>

                        <div class="col">
                            <h4>Facilities</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'FACILITIES'">
                                <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox" :checked="doesAmenityExist(a)" v-on:click="addAmenity(a)" value=""></label>
                                <p>{{a.description}}</p>
                            </div>
                        
                            <h4>Dining</h4> 
                            <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'DINING'">
                                <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox" :checked="doesAmenityExist(a)" v-on:click="addAmenity(a)" value=""></label>
                                <p>{{a.description}}</p>
                            </div>
                        </div>
                    </div>

                    <div v-for="c in selectedApartment.comments">
                        <div class="comments" v-if="!c.disabledForGuests">
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
                                    <div class="col hide-checkbox">
                                        <label><input type="checkbox" v-on:click="changeCommentarVisibillity(c)" value=""> Hide this comment</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comments" v-else>
                            <div class="comment-wrapper-disabled">
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
                                    <div class="col hide-checkbox" >
                                        <label><input type="checkbox" v-on:click="changeCommentarVisibillity(c)" :checked="true" value=""> Hide this comment</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" style="margin-left:20px" v-on:click="cancleEditingApartment()">Cancel</button>
                    <button type="button" class="btn btn-primary" style="margin-left:20px" v-on:click="saveEditingApartmentChanges()">Save changes</button>
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
            .get('rest/getHousekeeper', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>(this.housekeeper = response.data));

            axios
            .get('rest/editApartment/' + this.$route.query.id)
            .then(response => {
                this.selectedApartment = response.data;
                this.selectedApartmentBackUp = response.data;
                this.startEditingApartment();
            });

            axios
            .get('rest/getAllAmenities')
            .then(response => (this.allAmenitiesEver = response.data));

            axios
            .get('rest/housekeepersApartment', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>(this.apartments = response.data, this.apartmentsBackUp = [...this.apartments]));
    
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
        findApartmentName: function(apId){
            var n;
            this.apartmentsBackUp.forEach(element =>{
                if(element.id === apId){
                    n =  element.name;
                }
            });
            return n;
        },
        startEditingApartment: function(){
            this.arrivalHours = this.selectedApartment.arrivalTime.split(':')[0];
            this.arrivalMinutes = this.selectedApartment.arrivalTime.split(':')[1];
            this.exitHours = this.selectedApartment.exitTime.split(':')[0];
            this.exitMinutes = this.selectedApartment.exitTime.split(':')[1];
            
            var addressForView = this.selectedApartment.location.address.street+' '+ this.selectedApartment.location.address.city;

            document.querySelector('#address').value = addressForView;
            this.priceForNight = this.selectedApartment.priceForNight.toString();
        },
        cancleEditingApartment: function(){
            this.selectedApartment = JSON.parse(JSON.stringify(this.selectedApartmentBackUp));
            this.$router.push('/housekeeper');

        },
        saveEditingApartmentChanges: function(){
            this.selectedApartment.arrivalTime = this.arrivalHours + ":" + this.arrivalMinutes;
            this.selectedApartment.exitTime = this.exitHours + ":" + this.exitMinutes;

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
            this.selectedApartment.location = this.location;

            if(this.validate()){
                axios
                .post("/rest/updateApartment", this.selectedApartment)
                .then(function(response){
                    var jwt = window.localStorage.getItem('jwt');
                    axios
                    .get('rest/housekeepersApartment', {params: {
                     Authorization: 'Bearer ' + jwt
                    }})
                    .then(response =>(this.apartments = response.data, this.apartmentsBackUp = [...this.apartments]));

                });

                this.$router.push('/housekeeper');

            }
            
        },
        addAmenity: function(amenity){
            if(this.doesAmenityExist(amenity)){
                for( var i = 0; i < this.selectedApartment.amenities.length; i++){ 
                    if ( this.selectedApartment.amenities[i].id === amenity.id){
                        this.selectedApartment.amenities.splice(i, 1); 
    
                    }  
                }
            }else{
                this.selectedApartment.amenities.push(amenity);
            }
        },
        doesAmenityExist:function(amn){
            var a = this.selectedApartment.amenities.filter(function(amenity){
                return amenity.id == amn.id;
            });
     
            if(a[0]){
                return true;
            }else{
                return false;
            }
        },
        changeCommentarVisibillity: function(comment){
            this.selectedApartment.comments.forEach(element =>{
                if(element.id === comment.id){
                    element.disabledForGuests = !element.disabledForGuests;
                }
            });
        },
        validateName:function(){
            if(this.selectedApartment.name==="" | this.selectedApartment.name.trim() ===""){
                this.emptyName="Please enter name";
                return false;
            }
            this.emptyName="";
            return true;
        },
        validatePrice:function(){
            if(this.priceForNight ==="" | this.priceForNight.trim() ===""){
                this.emptyPrice="Please enter price";
                return false;
            }
            this.emptyPrice="";
            return true;
        },
        validateType:function(){
            if(this.selectedApartment.apartmentType===""){
                this.emptyApartmentType="Please select type"
                return false;
            }
            this.emptyApartmentType="";
            return true;
        },
        validateGuests:function(){
            if(this.selectedApartment.guestNumber===""){
                this.emptyGuests="Please select guest num"
                return false;
            }
            this.emptyGuests="";
            return true;
        },
        validateRooms:function(){
            if(this.selectedApartment.roomNumber===""){
                this.emptyRoomNumber="Please select rooms";
                return false;
            }
            this.emptyRoomNumber="";
            return true;
        },
        validateArrivalTime:function(){
            if(this.selectedApartment.arrivalTime==="" & this.selectedApartment.arrivalTime.trim()===""){
                this.arrivalTimeEmpty="Please enter arrival time";
                return false;
            }
            this.arrivalTimeEmpty="";
            return true;
        },
        validateExitTime:function(){
            if(this.selectedApartment.exitTime==="" & this.selectedApartment.exitTime.trim()===""){
                this.exitTimeEmpty="Please enter arrival time";
                return false;
            }
            this.exitTimeEmpty="";
            return true;
        },
        validateAddress:function(){
            if(this.adresaZaPretragu===""){
                this.emptyAddress="Please enter address";
                return false;
            }
            this.emptyAddress="";
            return true;
        },
        validate:function(){
            if(this.validateName() & this.validateGuests() & this.validatePrice() & this.validateRooms() & this.validateType() & this.validateArrivalTime() & this.validateExitTime() & this.validateAddress()){
                return true;
            }
            return false;
        }
    },
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
    },
	watch:{
        priceForNight: function(newPrice, oldPrice){
            this.selectedApartment.priceForNight = this.priceForNight;

			if(isNaN(newPrice)){
				this.priceForNight = newPrice.substring(0,newPrice.length -1);
			}
        },
        
	},
    components:{
        vuejsDatepicker,
        
	}
});

