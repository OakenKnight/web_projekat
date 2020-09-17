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
            myModalFail:false,
            addOrDeleteFreeDates: "none",
            freeDatesForDelete: [],
            type:"",
            imagesForBack:[],
            images:[],
            imageCount:0,
            filename:"",
            type:"",
            flag:"",
            disabledButton:""

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
                        <button type="button" class="btn my-2 my-lg-0"  v-on:click="takeMeHome()" v-if="loggedIn==true" >Profile</button>

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
                        <div class="col">
                            <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/calendar.png" alt="not found"><strong>Free dates</strong></label>
                            <div v-if="addOrDeleteFreeDates === 'none'">
                                <button type="button" class="btn btn-primary" style="margin-right:100px" v-on:click="addOrDeleteFreeDates = 'delete'">delete free dates</button>
                                <button type="button" class="btn btn-primary" style="margin-right:10px" v-on:click="addOrDeleteFreeDates = 'add'">Add free dates</button>
                            </div>
                            <div v-if="addOrDeleteFreeDates === 'add'">
                                <div class="datepicker">
                                    <vuejs-datepicker :disabled-dates="disabledArriveDates" format="dd.MM.yyyy" placeholder="Start" name="arriveDate" v-model="arriveDate" ></vuejs-datepicker>
                                </div>
                                <div class="datepicker">
                                    <vuejs-datepicker :disabled-dates="disabledDepartDates" format="dd.MM.yyyy" placeholder="End" name="departDate" v-model="departDate" ></vuejs-datepicker>
                                </div>
                            </div>

                            <div v-for="f in selectedApartment.freeDates" v-if="addOrDeleteFreeDates === 'delete'">
                                <label>{{f.startDate | dateFormat('DD.MM.YYYY')}} - {{f.endDate | dateFormat('DD.MM.YYYY')}}<strong></strong><input class="have-amenity-checkbox" type="checkbox" v-on:click="deleteFreeDates(f)" value=""> </label>
                            </div>
                            <button v-if="addOrDeleteFreeDates === 'delete'" type="button" class="btn btn-primary" style="margin-right:250px" v-on:click="deleteSelectedFreeDates()">delete free dates</button>
                            <button v-if="addOrDeleteFreeDates === 'add'" type="button" class="btn btn-primary" style="margin-right:250px" v-on:click="addNewFreeDates()">add free date</button>
                            <button v-if="addOrDeleteFreeDates === 'add'" type="button" class="btn btn-primary" style="margin-right:250px" v-on:click=" reserFreeDatesForAdd()">Cancel</button>
                            <button v-if="addOrDeleteFreeDates === 'delete'" type="button" class="btn btn-primary" style="margin-right:250px" v-on:click="resetFreeDates()">Cancel</button>
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
                    <h3>Pictures:</h3>
                    <div class="row justify-content-center">
                        <div v-for="p in selectedApartment.pictures">
                            <img class="apartment-pic" v-bind:src="'assets/images/apartmentsimg/' + p" alt="image not found"> 
                            <p>{{p}}</p> <button type="button" class="btn btn-primary" style="margin-top: -40px" v-on:click="deletePicturesFromList(p)">Delete</button>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <h3>Add picture: </h3>
                        <input type="file" id="myFile" name="filename" @change=imageAdded>
                    </div>


                    <button type="button" class="btn btn-primary" style="margin-left:20px" :disabled="selectedApartment.deleted" v-on:click="deleteApartment()">Delete</button>
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
            alert("Please log in!");
            this.loggedIn=false;

            window.location.href = '#/login';

        }else{
            axios
            .get('rest/getUserRole', {params: {
                Authorization: 'Bearer ' + jwt
            }})
            .then(response =>{ this.type = response.data; if (response.data === "GUEST")
                window.location.href = '#/forbidden';
            });

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
                this.setFreeDates();
                
            })
            .catch(error=>{this.$router.push('/bad_request')});

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
        checkPictures:function(){
            if(this.selectedApartment.pictures.length>0){
                return false;
            }
            return true;
        },
        imageAdded(e){
            const file = e.target.files[0];
            this.createBase64(file);
            this.imageCount++;
            this.images.push(URL.createObjectURL(file));
        },
        createBase64(file){
            const reader = new FileReader();
            reader.onload=(e)=>{
                let img = e.target.result;
                img.replace("data:image\/(png|jpg|jpeg);base64","");
                console.log(img);
                this.imagesForBack.push(img);
            }
            reader.readAsDataURL(file);

        },
        deleteApartment:function(){
            this.selectedApartment.deleted=true;
            this.selectedApartment.apartmentStatus = 'INACTIVE';
        },
        takeMeHome:function(){
            if(this.type==="ADMIN"){
                window.location.href="#/admin";
            }else{
                window.location.href="#/housekeeper";
            }
          },
        setFreeDates: function(){
            for(var i = 0; i < this.selectedApartment.freeDates.length; i ++){
                this.disabledArriveDates.ranges.push({from: new Date(this.selectedApartment.freeDates[i].startDate), to: new Date(this.selectedApartment.freeDates[i].endDate)});
            }
        },
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
        reserFreeDatesForAdd: function(){
            this.addOrDeleteFreeDates = 'none';
            arriveDate = null;
            departDate = null;
            disabledArriveDates = {
                to: new Date(),
                ranges:[ ]
            };
            disabledDepartDates = {
                to:  new Date(2022, 0,1),
                from: null
            };

        },
        addNewFreeDates: function(){
            if(this.arriveDate != null && this.departDate != null){
                
                var newDateInterval = {startDate: new Date(this.arriveDate), endDate: new Date(this.departDate)};
                newDateInterval.startDate.setHours(0,0,0,0);
                newDateInterval.endDate.setHours(0,0,0,0);
                this.selectedApartment.freeDates.push(newDateInterval);
                var i, j, min_idx;  
                for (i = 0; i < this.selectedApartment.freeDates.length-1;i++) {  
                    min_idx = i;  
                    for (j = i+1; j < this.selectedApartment.freeDates.length ; j++){
                        if (new Date(this.selectedApartment.freeDates[j].startDate) < new Date(this.selectedApartment.freeDates[i].startDate)){
                            
                            min_idx = j;  
                        }  
                    }
                    var temp = this.selectedApartment.freeDates[min_idx]; 
                    this.selectedApartment.freeDates[min_idx] = this.selectedApartment.freeDates[i]; 
                    this.selectedApartment.freeDates[i] = temp; 
                } 
                
                for (var k = 0; k < this.selectedApartment.freeDates.length; k++ ){
                    console.log(this.selectedApartment.freeDates[k]);
                } 
            }
            this.addOrDeleteFreeDates = 'none';
            this.arriveDate = null;
            this.departDate = null;
            this.disabledArriveDates = {
                to: new Date(),
                ranges:[ ]
            };
            this.disabledDepartDates = {
                to:  new Date(2022, 0,1),
                from: null
            };
            this.setFreeDates();
                 

            
        },
        resetFreeDates: function(){
            this.freeDatesForDelete.splice(0, this.freeDatesForDelete.length);
            this.addOrDeleteFreeDates = 'none';
        },
        deleteFreeDates: function(interval){
            var a = this.freeDatesForDelete.filter(function(freeDate){
                return new Date (freeDate.startDate).getTime() == new Date (interval.startDate).getTime() && new Date (freeDate.endDate).getTime() == new Date (interval.endDate).getTime();
            });
     
            if(a[0]){
                for( var i = 0; i < this.freeDatesForDelete.length; i++){ 
                    if (new Date (this.freeDatesForDelete[i].startDate).getTime() == new Date (interval.startDate).getTime() && new Date (this.freeDatesForDelete[i].startDate).getTime() == new Date (interval.endDate).getTime()){
                        this.freeDatesForDelete.splice(i, 1); 
                    }  
                }
            }else{
                this.freeDatesForDelete.push(interval);
            }
        },
        deleteSelectedFreeDates: function(){
            for( var i = 0; i < this.freeDatesForDelete.length; i++){ 
                for( var j = 0; j < this.selectedApartment.freeDates.length; j++){ 
                    if (new Date (this.freeDatesForDelete[i].startDate).getTime() == new Date (this.selectedApartment.freeDates[j].startDate).getTime() && new Date (this.freeDatesForDelete[i].endDate).getTime() == new Date (this.selectedApartment.freeDates[j].endDate).getTime()){
                        this.selectedApartment.freeDates.splice(j, 1); 
                    }  
                }
            }
            this.addOrDeleteFreeDates = 'none';
            this.arriveDate = null;
            this.departDate = null;
            this.disabledArriveDates = {
                to: new Date(),
                ranges:[ ]
            };
            this.disabledDepartDates = {
                to:  new Date(2022, 0,1),
                from: null
            };
            this.setFreeDates();
        },
        startEditingApartment: function(){
            this.arrivalHours = this.selectedApartment.arrivalTime.split(':')[0];
            this.arrivalMinutes = this.selectedApartment.arrivalTime.split(':')[1];
            this.exitHours = this.selectedApartment.exitTime.split(':')[0];
            this.exitMinutes = this.selectedApartment.exitTime.split(':')[1];
            
            var addressForView = this.selectedApartment.location.address.street+' '+ this.selectedApartment.location.address.city;
            console.log(addressForView);
            document.querySelector('#address').value = addressForView;

            this.priceForNight = this.selectedApartment.priceForNight.toString();
            console.log(this.selectedApartment);
            if(this.selectedApartment.pictures.length>0){
                this.disabledButton=true;
                this.flag = this.selectedApartment.pictures[0];

            }else{
                this.disabledButton=false;
            }
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
                .then(function(response)
                {
                    alert("Edit successfull!");
                })
                .catch(error=>{alert("Ooooops something went wrong :(")});
                
                
                if(this.type=='ADMIN'){
                    this.$router.push('/admin');
                }else{
                    this.$router.push('/housekeeper');
                }
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
        },
        calculateAvaliableDepartDate: function(aD){
            var d = new Date(aD);
            if(new Date(this.selectedApartment.freeDates[0].startDate) >= d){
                return this.selectedApartment.freeDates[0].startDate;
            }
            if(new Date(this.selectedApartment.freeDates[this.selectedApartment.freeDates.length - 1].endDate) <= d){
                return new Date(2021, 0,1);
            }
            for(var i = 0; i < this.selectedApartment.freeDates.length -1; i ++){
                if(new Date(this.selectedApartment.freeDates[i].endDate) <= d  && new Date(this.selectedApartment.freeDates[i + 1].startDate) > d){
                    return this.selectedApartment.freeDates[i + 1].startDate;
                }
                
            }
        }
    },
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
    },
	watch:{
        arriveDate: function(newDate, oldDate){
            if(newDate != null){
                this.arriveDate = newDate;
                var date = new Date();
                date.setDate(newDate.getDate());
                date.setMonth(newDate.getMonth());
                this.disabledDepartDates.to = new Date(date);
                this.disabledDepartDates.from = new Date(this.calculateAvaliableDepartDate(newDate));
                console.log(this.disabledDepartDates.to);
                console.log(this.disabledDepartDates.from);
                if(this.departDate != null && newDate > this.departDate){
                    //this.departDate =  new Date(newDate.getTime()+86400000); 
                    this.departDate = null;
                }
            }
        },
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

