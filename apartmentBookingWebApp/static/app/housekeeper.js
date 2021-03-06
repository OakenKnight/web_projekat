Vue.component("housekeeper",{ 
    data: function(){
		return{
            apartments: [],
            apartmentsBackUp: [],
            guests: [],
            guestsBackUp: [],
            reservations: [],
            reservationsBackUp: [],
            guestForSearch: "",
            apartmentForSearch: "",
            reservationForSearch: "",
            gen: "all",
            reservationTypeFilter: "1",
            mode: "apartments",
            showApartment: false,
            selectedApartment: null,
            selectedApartmentBackUp: null,
            basicAmenities:[],
            familyAmenities:[],
            facilityAmenities:[],
            diningAmenities:[],
            editApartmentMode: false,
            allAmenitiesEver: [],
            newApartmentDialog: false,
            newApartment: {
                id: null,
                name: null,
                apartmentType: "",
                roomNumber: "",
                guestNumber: "",
                location: {latitude: null, longitude: null, address:{street: null, number: null, city:null, zipCode: null}},
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
            loggedIn:null,
            loggedInUser:{},
            loggedInUserBackup:{},
            password1:"",
            password2:"",
            oldPassword:"",
            emptyName:"",
            emptyLastname:"",
            emptyGender:"",
            emptyPassword1:"",
            emptyPassword2:"",
            passwordFieldType0:"password",
            passwordFieldType1:"password",
            passwordFieldType2:"password",
            emptyOldPassword:"",
            activeOrInactiveApartment: 1,
            roomOrApartment: 1,
            amenitiesForFilter: [],
            apartmentSortCriteria:1,
            reservationSortCriteria:1


		}
	},
    template:`
    <div >
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
                            <button type="button" class="btn my-2 my-lg-0"  v-on:click="logout()" >Sign out</button>
                            <button type="button" class="btn my-2 my-lg-0" >Profile</button>
                        </div>
                    </li>

                </ul>
            </nav>
            <div class="main">
            <div class="row">
                <div class="options-housekeeper column">
                    <ul>
                        <li class="option-housekeeper" v-on:click="setMode('profile')"><p>Account info</p></li>
                        <li class="option-housekeeper" v-on:click="setMode('apartments')"><p>Apartments</p></li>
                        <li class="option-housekeeper" v-on:click="setMode('guests')"><p>Guests</p></li>
                        <li class="option-housekeeper" v-on:click="setMode('reservations')"><p>Reservations</p></li>
                    </ul>
                </div>
                <div class="sections-housekeeper column">
                    <section v-if="mode === 'apartments'" id="apartments">
                        <h3>All your apartments</h3><button type="button" class="btn btn-primary" onclick="location.href='#/addApartment'">Create New apartment</button>
                        <div class="search-housekeeper">
                            <div>
                                <input type="text" name="guest" placeholder="Search apartment" @keyup.enter="searchApartment(apartmentForSearch)" v-model="apartmentForSearch">
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click="searchApartment(apartmentForSearch)">Search</button>
                            <button type="button" class="btn btn-primary" v-on:click="searchApartment('')">Reset</button>
                                  
                        </div>
                        <hr>
                        <div style="position:absolute; text-align:left">
                            <div class="select-apartment-type-filter">
                                <select required v-model="activeOrInactiveApartment">
                                    <option value="1" selected>Active/inactive</option>
                                    <option value="2">Active only</option>
                                    <option value="3">Inactive only</option>
                                </select>
                            </div>
                            <div class="select-apartment-type-filter">
                                <select required v-model="roomOrApartment">
                                <option value="1" selected>Apartment/room</option>
                                <option value="2">Apartment only</option>
                                <option value="3">Room only</option>
                                </select>
                            </div>
                            <div class="select-apartment-type-filter">
                                <ul style="list-style-type:none">
                                    <li class="dropdown">
                                        <p data-toggle="dropdown" class="dropdown-toggle" 
                                        style="text-align: center; height: 50px;
                                            width: 150px;
                                            background-color:white;
                                            border-radius: 4px;
                                            margin: 10px;
                                            margin-left: -18%;
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
                                                        <label style="margin-left:8px; font-weight:bold;font-size: medium;">{{a.name}}<input type="checkbox" :id='a.id' v-on:click="addAmenitiesForFilter(a)":checked="doesAmenityExistInFilter(a)"/></label>
                                                    </div>
                                                </li>
                                            </ul>
                                    </li>
                                </ul>
                                <button type="button" class="btn btn-primary" style="margin-right: 80px" v-on:click="filterSearch()">Filter</button>
                            </div>
                            <div class="select-apartment-type-filter">
                                <select required v-model="apartmentSortCriteria">
                                    <option value="1" selected >Sort</option>
                                    <option value="2">Sort by price asc</option>
                                    <option value="3">Sort by price desc</option>
                                </select>
                            </div>
                            
                        </div>
                        <div class="apartment-housekeeper" v-for="a in apartments" >
                            <div class="apartment-border-housekeeper" v-on:click="showApartmentDetails(a)" v-if="a.deleted==false">
                            <img class="apartment-pic-housekeeper" v-if="a.pictures.length>0" v-bind:src="'assets/images/apartmentsimg/' + a.pictures[0]" alt="image not found"> 
                                <div class="apartment-info-housekeeper">
                                    <h5><strong>{{a.name}}</strong>, {{a.location.address.city}}</h5>
                                    <h5><img class="apartment-info-icons-housekeeper" src="/assets/images/star-icon.png" alt="not found"> <strong class="">{{calculateMark(a)}} </strong></h5>
                                    <p><img class="apartment-info-icons-housekeeper" src="/assets/images/location-icon.png" alt="not found"> {{a.location.address.street}} {{a.location.address.number}}</p>
                                    <p><img class="apartment-info-icons-housekeeper" src="/assets/images/people-icon.png" alt="not found"> {{a.guestNumber}} people</p>
                                    <p><img class="apartment-info-icons-housekeeper" src="/assets/images/rooms-icon.png" alt="not found"> {{a.roomNumber}} rooms</p>
                                    <p><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"> {{a.priceForNight}} €</p>
    
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="guests" v-if="mode === 'guests'">
                        <h3>All your guests</h3>
                        <div class="search-housekeeper">
                             <div>                        
                                <input @keyup.enter="searchGuest(guestForSearch)" type="text" name="guest" placeholder="Search guest" v-model="guestForSearch">
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click="searchGuest(guestForSearch)">Search</button>
                            <button type="button" class="btn btn-primary" v-on:click="searchGuest('')">Reset</button>
                        </div>
                        <div class="gender-housekeeper">
                            <img class="gender-sign-all" src="assets/images/female-male-sign.png" alt="not found">
                            <label for="all">Show all</label>
                            <input type="radio" id="all" name="gender" value="all" v-model="gen" checked>
                            <img class="gender-sign" src="assets/images/female-sign.png" alt="not found">
                            <label for="ladies">Show only ladies</label>
                            <input type="radio" id="ladies" name="gender" value="ladies"  v-model="gen">
                            <img class="gender-sign" src="assets/images/male-sign.png" alt="not found">
                            <label for="gentlemens">Show only gentlemens</label>
                            <input type="radio" id="gentlemens" name="gender" value="gentlemens"  v-model="gen">
                        </div>
                        <hr>
                        <div class="users-housekeeper" v-for="g in guests">
                            <img class="icon-housekeeper" v-if="g.gender == 'MALE'" src="assets/images/male-icon.png">
                            <img class="icon-housekeeper" v-else src="assets/images/female-icon.png">
                            <div class="user-info-housekeeper">
                                <h3 class="no-margin">{{g.firstName}} {{g.lastName}}</h3>
                                <p class="no-margin">Username: {{g.username}}</p>
                                <p>Last reservation: {{lastReservation(g)}}</p>
                            </div>
                            <div class="all-apartments-housekeeper">
                                <h4 class="no-margin"> All guest's reservation:</h4>
                                <p class="no-margin" v-for="r in g.reservationId">{{allGuestReservation(r)}}</p>
                            </div>
                        </div>
                    </section>
                    <section id="reservations" v-if="mode === 'reservations'">
                        <h3>All your reservations</h3>
                        <div class="search-housekeeper">

                            <div>                        
                                <input type="text" name="reservation" placeholder="Search guest username" @keyup.enter="searchReservation(reservationForSearch)"  v-model="reservationForSearch">
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click="searchReservation(reservationForSearch)">Search</button>
                            <button type="button" class="btn btn-primary" v-on:click="searchReservation('')">Reset</button>
                        </div>
                        <div class="select-apartment-type">
                            <select required v-model="reservationTypeFilter">
                                <option value="1" selected>Show all</option>
                                <option value="2">Show only accepted</option>
                                <option value="3">Show only rejected</option>
                                <option value="4">Show only created</option>
                                <option value="5">Show only finished</option>
                                <option value="6">Show only canceled</option>
                            </select>
                        </div>

                        <div class="select-apartment-type-filter">
                            <select required v-model="reservationSortCriteria">
                                <option value="1" selected >Sort</option>
                                <option value="2">Sort by price asc</option>
                                <option value="3">Sort by price desc</option>
                            </select>
                        </div>
                        <hr>
                        <div class="reservation-housekeeper" v-for="r in reservations">
                            <div class="row" >
                                <div class="column left-housekeeper">
                                    <div style="text-align: center;">
                                        <h3 style="display: inline-block;">Reservation {{r.reservationStatus}}</h3>
                                    </div>
                                    <div class="row">
                                        <div class="reservation-apartment-info-housekeeper column">
                                            <h4>Apartment info</h4>
                                            <p>Apartment name: {{findApartmentName(r.apartmentId)}}</p>
                                            <p>Arrival date: {{r.arrivalDate | dateFormat('DD.MM.YYYY')}}</p>
                                            <p>Number of nights: {{r.numberOfNights}}</p>
                                            <p>Total price: {{r.totalPrice}}€</p>
                                        </div>
                                        <div class="reservation-guest-info-housekeeper column">
                                            <h4>Guest info</h4>
                                            <p v-for="g in guests" v-if="g.username == r.guestId">Guest name: {{g.firstName}} {{g.lastName}}</p>
                                            <p>Guest username: {{r.guestId}}</p>
                                            <p>Message:<br>{{r.message}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="column right-housekeeper">
                                    <div class="buttons-housekeeper">
                                        <button type="button" class="btn btn-primary" :disabled="r.reservationStatus != 'CREATED'" v-on:click="acceptReservation(r)">Accept</button>
                                        <button type="button" class="btn btn-primary" :disabled="r.reservationStatus != 'ACCEPTED' && r.reservationStatus != 'CREATED'" v-on:click="rejectReservation(r)">Reject</button>
                                        <button type="button" class="btn btn-primary" :disabled="r.reservationStatus != 'ACCEPTED' ||  !isFinish(r)" v-on:click="finishReservation(r)">Finish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="profile" v-if="mode === 'profile'">

                        <div class="column user-column" style="width:40%">
                            <p class="profile-info-label">Username:</p>
                            <p class="profile-info-label">Name:</p>

                            <p class="profile-info-label">Lastname:</p>

                            <p class="profile-info-label">Gender:</p>

                        </div>

                        <div class="column user-column" style="width:40%">
                            <p class="profile-info-p">{{loggedInUser.username}}</p>

                            <p class="profile-info-p">{{loggedInUser.firstName}}</p>
                            <p class="profile-info-p">{{loggedInUser.lastName}}</p>

                            <p class="profile-info-p" style="padding-bottom: 25px;">{{loggedInUser.gender}}</p>

                        </div>


                        <button class="edit-info-button" type="button" v-on:click="setMode('edit')"><i class="edit-icon material-icons">edit</i>Edit info</button>
                    </section>

                    <section id="edit" v-if="mode === 'edit'">

                        <div class="row">
                            
                                <table style="width:900px">
                                
                                    <tr>
                                        <td><p class="profile-info-label">Username</p></td>
                                        <td><p class="profile-info-p">{{loggedInUser.username}}</p></td>    
                                    </tr>

                                    <tr>
                                        <td><p class="profile-info-label">Name</p></td>
                                        <td><input required class="profile-info-p" type="text" name="firstName" v-model="loggedInUser.firstName"></td> 
                                        <td><p style="color:red">{{emptyName}}</p></td>  
                                    </tr>

                                    <tr>
                                        <td><p class="profile-info-label">Lastname</p></td>
                                        <td><input class="profile-info-p" type="text" name="lastname" v-model="loggedInUser.lastName"></td> 
                                        <td><p style="color:red">{{emptyLastname}}</p></td>  
                                    </tr>

                                    <tr>
                                        <td><p class="profile-info-label">Gender</p></td>
                                        <td><select class="profile-info-p" required v-model="loggedInUser.gender">
                                        <option value="MALE" selected>MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                        <option value="OTHER">OTHER</option>
                                    </select></td> 
                                        <td><p style="color:red" v-if="emptyGender">Gender field is empty.</p></td>  
                                    </tr>
                                    <tr>
                                    <td><p style="color:white">AAAAAAAAAAAAAA</p></td></tr>
                                    <tr>
                                        <td><button class="edit-info-button" type="button" v-on:click="setMode('passwordReset')">Reset password</button></td>
                                        <td><button class="edit-info-button" type="button" v-on:click="cancelEdit()">Cancel</button> <button class="edit-info-button" type="button" v-on:click="save()" >Save</button></td>
                                    </tr>
                                </table> 
                                
                            
                        </div>
                        
                            
                       

                    </section>
        
                    <section v-if="mode==='passwordReset'" id="passwordReset">
                        <div class="row">
                            <table>
                                <tr>
                                    <td><label class="profile-info-label">Old password:</label></td>
                                    <td><input class="profile-info-p" name="password" id="oldinput" :type="passwordFieldType0" v-model="oldPassword"></td>
                                    <td><input type="checkbox" v-on:click="toggleOldPassword()">Show Password</td>
                                    <td><p style="color:red; margin-top:14px">{{emptyOldPassword}}</p></td>
                                </tr>
                                <tr>
                                    <td><label class="profile-info-label">Password:</label></td>
                                    <td><input class="profile-info-p" name="password" id="firstinput" :type="passwordFieldType1" v-model="password1"></td>
                                    <td><input type="checkbox" v-on:click="toggleFirstPassword()">Show Password</td>
                                    <td><p style="color:red; margin-top:14px">{{emptyPassword1}}</p></td>
                                </tr>
                                <tr>
                                    <td><label class="profile-info-label">Please enter password again:</label></td>
                                    <td><input class="profile-info-p" :type="passwordFieldType2" name="password" id="secondinput" v-model="password2"></td>
                                    <td><input type="checkbox" v-on:click="toggleSecondPassword()">Show Password</td>
                                    <td><p style="color:red; margin-top:14px">{{emptyPassword2}}</p></td>
                                </tr>
                                <tr>
                                    <td><button class="edit-info-button" type="button" v-on:click="cancelPasswordReset()">Cancel</button></td>
                                    <td><button class="edit-info-button" type="button" v-on:click="reset()" >Reset password</button></td>
                                </tr>

                            </table>
                        </div>
                    </section>      
                </div>
            </div>
            </div>
            
                <div v-if="newApartmentDialog">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">More info about apartment</h4>
                                        <button type="button" class="close absolute pin-t pin-r" v-on:click="newApartmentDialog = false">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="details">
                                        
                                            <div class="row">
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/hotel-icon.png" alt="not found"><strong>Hotel name</strong></label>
                                                    <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Apartment's name" v-model="newApartment.name">
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                                                    <div>
                                                    <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Street" v-model="newApartment.location.address.street">
                                                    <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Number" v-model="newApartment.location.address.number">
                                                    <input class="edit-apartment-input" type="text" name="hotelName" placeholder="City" v-model="newApartment.location.address.city">
                                                    <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Zip code" v-model="newApartment.location.address.zipCode">
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Guests</strong></label>
                                                    <div class="edit-combobox">
                                                        <select required v-model="newApartment.guestNumber">
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
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                                                    <div class="edit-combobox">
                                                        <select required v-model="newApartment.roomNumber">
                                                            <option value="">Rooms</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"><strong>Price</strong></label>
                                                    <input class="edit-apartment-input" type="text" name="hotelName" placeholder="Price for night" v-model="newApartment.priceForNight">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col">
                                                    <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/room-apartment-icon.png" alt="not found"><strong>Apartment Type</strong></label>
                                                    <div class="edit-combobox">
                                                        <select required v-model="newApartment.apartmentType">
                                                            <option value="" selected disabled>Type</option>
                                                            <option value="APARTMENT">Apartment</option>
                                                            <option value="ROOM">Room</option>
                                                        </select>
                                                    </div>
                                                </div>
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
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <h4>Basic</h4> 
                                                        <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'BASIC'">
                                                            <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox"  v-on:click="addAmenityToNewApartment(a)" value=""> </label>
                                                            <p>{{a.description}}</p>
                                                        </div>
                                                        <h4>Family features</h4> 
                                                        <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'FAMILY_FEATURES'">
                                                            <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox"  v-on:click="addAmenityToNewApartment(a)" value=""></label>
                                                            <p>{{a.description}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <h4>Facilities</h4> 
                                                        <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'FACILITIES'">
                                                            <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox" v-on:click="addAmenityToNewApartment(a)" value=""></label>
                                                            <p>{{a.description}}</p>
                                                        </div>
                                                        <h4>Dining</h4> 
                                                        <div class="amenity col-md-6" v-for="a in allAmenitiesEver" v-if="a.type === 'DINING'">
                                                            <label><strong>{{a.name}}</strong><input class="have-amenity-checkbox" type="checkbox"  v-on:click="addAmenityToNewApartment(a)" value=""></label>
                                                            <p>{{a.description}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="reserve-book-button" type="button" v-on:click="createNewApartment(newApartment)">Create apartment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
            <div v-if="showApartment">
                            <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-dialog modal-xl modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">More info about apartment</h4>
                                            <button type="button" class="btn btn-primary" style="margin-left:20px" v-on:click="editApartment(selectedApartment)" v-if="editApartmentMode === false">Update info</button>
                                            <span v-else>
                                            <button type="button" class="btn btn-primary" style="margin-left:20px" v-on:click="cancleEditingApartment()">Cancel</button>
                                            <button type="button" class="btn btn-primary" style="margin-left:20px" v-on:click="saveEditingApartmentChanges()">Save changes</button>
                                            </span>
                                            <button type="button" class="close absolute pin-t pin-r" v-on:click="showApartment = false">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="details">
                                                <div class="row">
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/hotel-icon.png" alt="not found"><strong>Hotel name</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.name}}</p>
                                                        <input class="edit-apartment-input" type="text" name="hotelName" v-model="selectedApartment.name" v-else>
                                                    </div>
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/location-icon.png" alt="not found"><strong>Hotel address</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.location.address.street}} {{selectedApartment.location.address.number}}, {{selectedApartment.location.address.city}}</p>
                                                        <div v-else>
                                                        <input class="edit-apartment-input" type="text" name="hotelName" v-model="selectedApartment.location.address.street">
                                                        <input class="edit-apartment-input" type="text" name="hotelName" v-model="selectedApartment.location.address.number">
                                                        <input class="edit-apartment-input" type="text" name="hotelName" v-model="selectedApartment.location.address.city">
                                                        <input class="edit-apartment-input" type="text" name="hotelName" v-model="selectedApartment.location.address.zipCode">
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/people-icon.png" alt="not found"><strong>Guests</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.guestNumber}}</p>
                                                        <div class="edit-combobox" v-else>
                                                            <select required v-model="selectedApartment.guestNumber">
                                                                <option value="1"selected>1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/rooms-icon.png" alt="not found"><strong>Rooms</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.roomNumber}}</p>
                                                        <div class="edit-combobox" v-else>
                                                            <select required v-model="selectedApartment.roomNumber">
                                                                <option value="1"selected>1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/euro.png" alt="not found"><strong>Price</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.priceForNight}}</p>
                                                        <input class="edit-apartment-input" type="text" name="hotelName" v-else v-model="selectedApartment.priceForNight">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/room-apartment-icon.png" alt="not found"><strong>Apartment Type</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.apartmentType}}</p>
                                                        <div class="edit-combobox" v-else>
                                                            <select required v-model="selectedApartment.apartmentType">
                                                                <option value="" selected disabled>Type</option>
                                                                <option value="APARTMENT">Apartment</option>
                                                                <option value="ROOM">Room</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/check-in-icon.png" alt="not found"><strong>Arrival time</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.arrivalTime}}</p>
                                                        <div class="time" v-else>
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
                                                    </div>
                                                    <div class="col">
                                                        <label class="details-hotel-name-label"><img class="apartment-info-icons" src="/assets/images/check-out-icon.png" alt="not found"><strong>Exit time</strong></label>
                                                        <p class="details-hotel-name-p" v-if="editApartmentMode === false">{{selectedApartment.exitTime}}</p>
                                                        <div class="time" v-else>
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
                                                    </div>
                                                </div>
                                                    <div class="row" v-if="editApartmentMode === false">
                                                        <div class="col">
                                                            <h4 v-if="basicAmenities.length>0">Basic</h4> 
                                                            <div class="amenity col-md-6" v-for="a in basicAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        
                                                            <h4 v-if="familyAmenities.length>0">Family features</h4> 
                                                            <div class="amenity col-md-6" v-for="a in familyAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        </div>

                                                        <div class="col">
                                                            <h4 v-if="facilityAmenities.length>0">Facilities</h4> 
                                                            <div class="amenity col-md-6" v-for="a in facilityAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        
                                                            <h4 v-if="diningAmenities.length>0">Dining</h4> 
                                                            <div class="amenity col-md-6" v-for="a in diningAmenities">
                                                                <label><strong>{{a.name}}</strong></label>
                                                                <p>{{a.description}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" v-else >
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

                                                <h4 class="details-hotel-name-label" v-if="selectedApartment.comments.length>0">Comments</h4>
                                                    

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
                                                                    <div class="col hide-checkbox" v-if="editApartmentMode === true">
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
                                                                    <div class="col hide-checkbox" v-if="editApartmentMode === true">
                                                                        <label><input type="checkbox" v-on:click="changeCommentarVisibillity(c)" :checked="true" value=""> Hide this comment</label>
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
            .then(response =>{  if (response.data !== "HOUSEKEEPER")
                window.location.href = '#/forbidden';
            });

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
            .then(response =>(this.loggedInUser=response.data, this.loggedInUserBackup=response.data));
        }

	},
    methods: {
        save: function(){
            if(this.checkFieldsForUpdate()){
                axios
                .post('rest/updateHousekeeper',this.loggedInUser)
                .then(response=>(this.loggedInUser = response.data), this.setMode('profile'));
            }
        },
        cancelEdit:function(){
            this.loggedInUser=JSON.parse(JSON.stringify(this.loggedInUserBackup))
            this.setMode('profile');
        },
        setMode:function(mode){
            if(mode === "profile"){                

                this.password1="";
                this.password2="";
                this.oldPassword="";
                this.mode = mode;
            }else if(mode === "edit"){
                this.loggedInUserBackup = JSON.parse(JSON.stringify(this.loggedInUser));
                this.secondPassword = this.loggedInUser.password;
                
                this.mode = mode;
            }else if(mode ==='passwordReset'){
                this.mode=mode;
            }else if(mode === "apartments"){
                this.mode = mode;
            }else if(mode === "guests"){
                this.mode = mode;
            }else if(mode === "reservations"){
                this.mode = mode;
            }
        },
        reset: function(){

            if(this.password1!=="" && this.password2!=="" && this.oldPassword!==""){
                this.emptyPassword1="";
                this.emptyPassword2="";
                this.emptyOldPassword="";
                if(this.password1 === this.password2 && this.oldPassword === this.loggedInUserBackup.password){
                    axios
                    .post('rest/updateAdmin',this.loggedInUser)
                    .then(response=>(this.loggedInUser = response.data), this.setMode('profile'));
                }else if(this.password1!==this.password2){
                    this.emptyPassword2="Passwords do not match!";
                }else if(this.oldPassword!==this.loggedInUserBackup.password){
                    this.emptyOldPassword="Old password doesnt match!";
                }
            }else{
                if(this.oldPassword ===""){
                    this.emptyOldPassword="OldPassword is empty!";
                }else{
                    this.emptyOldPassword="";
                }
                
                if(this.password1===""){
                    this.emptyPassword1="Password field is empty";
                }else{
                    this.emptyPassword1="";
                }
    
                if(this.password2===""){
                    this.emptyPassword2="Password field is empty";
                }else{
                    this.emptyPassword2="";
                }
            }
        },
        validateName: function(){
            if(this.loggedInUser.firstName==="" | this.loggedInUser.firstName.trim().length==0){          //length==0 | !this.name.trim()){
                this.emptyName="Name field is empty!";
                return false;
            }else{
                this.emptyName="";
                return true;                
            }
        },
        validateLastName: function(){
            if(this.loggedInUser.lastName==="" | this.loggedInUser.lastName.trim().length==0){          //length==0 | !this.name.trim()){
                this.emptyLastname="Last name field is empty!";
                return false;
            }else{
                this.emptyLastname="";
                return true;                
            }  
        },
        validatePassword1: function(){
            if(this.password1==="" | this.password1.trim().length==0){          //length==0 | !this.name.trim()){
                this.emptyPassword1="Password field is empty!";
                return false;
            }else{
                this.emptyPassword1="";
                return true;                
            }
        },
        
        toggleFirstPassword: function(){
            if(this.passwordFieldType1 === "password"){
                this.passwordFieldType1 = "text";
              }else {
                this.passwordFieldType1 = "password";
              }
        },
        toggleOldPassword: function(){
            if(this.passwordFieldType0 === "password"){
                this.passwordFieldType0 = "text";
              }else {
                this.passwordFieldType0 = "password";
              }
        },
        toggleSecondPassword: function(){
            if(this.passwordFieldType2 === "password"){
                this.passwordFieldType2 = "text";
              }else {
                this.passwordFieldType2 = "password";
              }
        },
        checkFieldsForUpdate: function(){
            let vn = this.validateName();
            let vln = this.validateLastName();
            return vn && vln;
        },
        cancelPasswordReset:function(){
            this.loggedInUser=JSON.parse(JSON.stringify(this.loggedInUserBackup))
            this.setMode('edit');
        },
        logout:function(){
            window.localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        editApartment:function(selectedApartment){
            window.location.href = "#/editApartment?id=" + selectedApartment.id;  
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
        findApartmentName: function(apId){
            var n;
            this.apartmentsBackUp.forEach(element =>{
                if(element.id === apId){
                    n =  element.name;
                }
            });
            return n;
        },
        dateF: function(value, format){
            var parsed = moment(value);
    		return parsed.format(format);
        },
        lastReservation: function(guest){
            var lr = guest.reservationId[guest.reservationId.length -1];
            var info;
            this.reservationsBackUp.forEach(element => {
				if(element.Id === lr){
                    var d = Date.parse(element.arrivalDate);
                    info = this.findApartmentName(element.apartmentId) + " (" + this.dateF(d,'DD.MM.YYYY') +"-" + this.dateF(d + 86400000*element.numberOfNights,'DD.MM.YYYY') +"), "+ element.reservationStatus.charAt(0).toUpperCase() + element.reservationStatus.slice(1).toLowerCase();
                }
            });
            
            return info;
        },
        allGuestReservation: function(res){
            var info;
            this.reservationsBackUp.forEach(element => {
				if(element.Id === res){
                    var d = Date.parse(element.arrivalDate);
                    info = this.findApartmentName(element.apartmentId) + " (" + this.dateF(d,'DD.MM.YYYY') +"-" + this.dateF(d + 86400000*element.numberOfNights,'DD.MM.YYYY') +"), " +element.reservationStatus.charAt(0).toUpperCase() + element.reservationStatus.slice(1).toLowerCase();
                }
            });
            
            return info;
        },
        searchGuest: function(keyWord){
            if(keyWord === ""){
                this.guests.splice(0,this.guests.length);
                this.guests = [...this.guestsBackUp]; 
                this.guestForSearch="";
                this.gen = "all";
            }else{
                this.guests.splice(0,this.guests.length);
                this.guests = [...this.guestsBackUp]; 
                var i = this.guests.length;
                while(i--){
                    if(this.guests[i].username.toLowerCase() !== keyWord.toLowerCase()){
                        this.guests.splice(i,1);
                    }
                }
            }
        },
        searchApartment: function(keyWord){
            if(keyWord === ""){
                this.apartmentForSearch="";
                this.roomOrApartment = 1;
                this.activeOrInactiveApartment = 1;
                this.amenitiesForFilter.splice(0, this.amenitiesForFilter.length);
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp];
            }else{
                this.amenitiesForFilter.splice(0, this.amenitiesForFilter.length);
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp];  
                var i = this.apartments.length;
                while(i--){
                    if(!this.apartments[i].name.toLowerCase().includes(keyWord.toLowerCase()) && !this.apartments[i].location.address.city.toLowerCase().includes(keyWord.toLowerCase())){
                        this.apartments.splice(i,1);
                    }
                }
            }
        },
        searchReservation: function(keyWord){
            if(keyWord === ""){
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp]; 
                this.reservationForSearch = "";
                this.reservationTypeFilter = 1;
            }else{
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp]; 
                var i = this.reservations.length;
                while(i--){
                    if(this.reservations[i].guestId.toLowerCase() !== keyWord.toLowerCase()){
                        this.reservations.splice(i,1);
                    }
                }
            }
        },
        showApartmentDetails: function(apartmentToShow){
            this.selectedApartment = apartmentToShow;
            this.selectedApartmentBackUp = JSON.parse(JSON.stringify(apartmentToShow)); 
            this.showApartment = true;
            this.getBasicAmenities();
            this.getDiningAmenities();
            this.getFacilityAmenities();
            this.getFamilyAmenities();
        },
        getBasicAmenities:function(){
            this.basicAmenities = this.selectedApartment.amenities.filter(function(amenity){
                return amenity.type === 'BASIC';
            });
        },
        getFamilyAmenities:function(){
            this.familyAmenities = this.selectedApartment.amenities.filter(function(amenity){
                return amenity.type === 'FAMILY_FEATURES';
            });
        },
        getDiningAmenities:function(){
            this.diningAmenities = this.selectedApartment.amenities.filter(function(amenity){
                return amenity.type === 'DINING';
            });

        },
        getFacilityAmenities:function(){
            this.facilityAmenities = this.selectedApartment.amenities.filter(function(amenity){
                return amenity.type === 'FACILITIES';
            });

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
        startEditingApartment: function(){
            this.arrivalHours = this.selectedApartment.arrivalTime.split(':')[0];
            this.arrivalMinutes = this.selectedApartment.arrivalTime.split(':')[1];
            this.exitHours = this.selectedApartment.exitTime.split(':')[0];
            this.exitMinutes = this.selectedApartment.exitTime.split(':')[1];
            this.editApartmentMode = true;

        },
        cancleEditingApartment: function(){
            this.editApartmentMode = false;
            this.selectedApartment = JSON.parse(JSON.stringify(this.selectedApartmentBackUp));
        },
        saveEditingApartmentChanges: function(){
            this.editApartmentMode = false;
            this.selectedApartment.arrivalTime = this.arrivalHours + ":" + this.arrivalMinutes;
            this.selectedApartment.exitTime = this.exitHours + ":" + this.exitMinutes;
            axios
            .post("/rest/updateApartment", this.selectedApartment)
            .then(function(response){
                alert(response.data);
                var jwt = window.localStorage.getItem('jwt');
                axios
                .get('rest/housekeepersApartment', {params: {
                 Authorization: 'Bearer ' + jwt
                }})
                .then(response =>(this.apartments = response.data, this.apartmentsBackUp = [...this.apartments]));

            });
            this.showApartment = false;
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
        addAmenitiesForFilter: function(amenity){
            if(this.doesAmenityExistInFilter(amenity)){
                for( var i = 0; i < this.amenitiesForFilter.length; i++){ 
                    if ( this.amenitiesForFilter[i].id === amenity.id){
                        this.amenitiesForFilter.splice(i, 1); 
                    }  
                }
            }else{
                this.amenitiesForFilter.push(amenity);
            }
        },
        doesAmenityExistInFilter:function(amn){
            var a = this.amenitiesForFilter.filter(function(amenity){
                return amenity.id == amn.id;
            });
     
            if(a[0]){
                return true;
            }else{
                return false;
            }
        },
        addAmenityToNewApartment: function(amenity){
            this.newApartment.amenities.push(amenity);
        },
        changeCommentarVisibillity: function(comment){
            this.selectedApartment.comments.forEach(element =>{
                if(element.id === comment.id){
                    element.disabledForGuests = !element.disabledForGuests;
                }
            });
        },
        acceptReservation: function(reservation){
            reservation.reservationStatus = "ACCEPTED";
            axios
            .post("/rest/updateReservation", reservation)
            .then(response=>(alert(response.data)))
            .catch(error=>{alert("Oooops something went wrong!")})
        },
        finishReservation: function(reservation){
            reservation.reservationStatus = "FINISH";
            axios
            .post("/rest/updateReservation", reservation)
            .then(response=>(alert(response.data)))
            .catch(error=>{alert("Oooops something went wrong!")})

        },
        rejectReservation: function(reservation){
            reservation.reservationStatus = "REJECTED";
            axios
            .post("/rest/updateReservation", reservation)
            .then(response=>(alert(response.data)))
            .catch(error=>{alert("Oooops something went wrong!")})

        },
        createNewApartment: function(){
            var d = new Date();
            this.newApartment.id = d.getTime();
            var jwt = window.localStorage.getItem('jwt');
            this.newApartment.housekeeper = this.loggedInUser;
            this.newApartment.apartmentStatus = "ACTIVE";
            this.newApartment.arrivalTime = this.arrivalHours + ":" + this.arrivalMinutes;
            this.newApartment.exitTime = this.exitHours + ":" + this.exitMinutes;
            axios
            .post("/rest/createNewApartment", this.newApartment)
            .then(function(response){
                alert(response.data);
                var jwt = window.localStorage.getItem('jwt');
                axios
                .get('rest/housekeepersApartment', {params: {
                 Authorization: 'Bearer ' + jwt
                }})
                .then(response =>(this.apartments = response.data, this.apartmentsBackUp = [...this.apartments]));

            });

            this.newApartmentDialog = false;
            this.newApartment= {
                id: null,
                name: null,
                apartmentType: "",
                roomNumber: "",
                guestNumber: "",
                location: {latitude: null, longitude: null, address:{street: null, number: null, city:null, zipCode: null}},
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
        },
        isFinish: function(reservation){
            var todaysDate = new Date();
            var arrDate = new Date(new Date(reservation.arrivalDate).getTime() + 86400000*reservation.numberOfNights);
            if(todaysDate < arrDate){
                return false;
            }else{
                return true;
            }
        },

        filterSearch:function(){
            var lista=[];
           
            var brojac=0;
            if(this.amenitiesForFilter.length>0){
                for(var i=0;i<this.apartments.length;i++){
                    for(var j=0;j<this.amenitiesForFilter.length;j++){
                        for(var k=0;k<this.apartments[i].amenities.length;k++){
                            if(this.apartments[i].amenities[k].id===this.amenitiesForFilter[j].id){
                                brojac++;
                            }
                        }
                        if(brojac==this.amenitiesForFilter.length){
                            lista.push(this.apartments[i]);
                        }
                    }
                    brojac=0;
                }
    
               this.apartments=[...lista];

            }else{
                this.apartments=[...this.apartmentsBackUp];
                if(this.activeOrInactiveApartment == 2){
                    this.filterApartmentByStatus("ACTIVE");
                } else if(this.activeOrInactiveApartment == 3){
                    this.filterApartmentByStatus("INACTIVE");
                }
                if(this.roomOrApartment == 2){
                    this.filterApartmentByType("APARTMENT");
                }else if(this.roomOrApartment == 3){
                    this.filterApartmentByType("ROOM");
                } 
            }
            
        },

        comparePriceDESCApartment: function(a, b) {
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
        comparePriceASCApartment: function(a, b) {
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
        sortApartmentsByPriceASC:function(){
            this.apartments.sort(this.comparePriceASCApartment);
        },
        sortApartmentsByPriceDESC:function(){
            this.apartments.sort(this.comparePriceDESCApartment);
        },
        comparePriceDESCReservation: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const priceA = a.totalPrice;
            const priceB = b.totalPrice;
          
            let comparison = 0;
            if (priceA < priceB) {
              comparison = 1;
            } else if (priceA > priceB) {
              comparison = -1;
            }
            return comparison;
        },
        comparePriceASCReservation: function(a, b) {
            // Use toUpperCase() to ignore character casing
            const priceA = a.totalPrice;
            const priceB = b.totalPrice;
          
            let comparison = 0;
            if (priceA < priceB) {
              comparison = -1;
            } else if (priceA > priceB) {
              comparison = 1;
            }
            return comparison;
        },
        sortReservationByPriceASC:function(){
            this.reservations.sort(this.comparePriceASCReservation);
        },
        sortReservationByPriceDESC:function(){
            this.reservations.sort(this.comparePriceDESCReservation);
        },
        filterApartmentByStatus: function(status){
            var i = this.apartments.length;
            while(i--){
                if(this.apartments[i].apartmentStatus !== status){
                       this.apartments.splice(i,1);
                }
            }
        },
        filterApartmentByType: function(type){
            var i = this.apartments.length;
            while(i--){
                if(this.apartments[i].apartmentType !== type){
                    this.apartments.splice(i,1);
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
        gen: function(newGender, oldGender){
           if(newGender === "ladies"){
            this.guests.splice(0,this.guests.length);
            this.guests = [...this.guestsBackUp];  
            var i = this.guests.length;
            while(i--){
                if(this.guests[i].gender !== "FEMALE"){
                    this.guests.splice(i,1);
                }
            }
           }else if(newGender === "gentlemens"){
                this.guests.splice(0,this.guests.length);
                this.guests = [...this.guestsBackUp];  
                var i = this.guests.length;
                while(i--){
                    if(this.guests[i].gender !== "MALE"){
                        this.guests.splice(i,1);
                    }
                }
           }else{
            this.guests.splice(0,this.guests.length);
            this.guests = [...this.guestsBackUp];
           }
        },
        reservationTypeFilter: function(newType, oldType){
            if(newType == 2){
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
                var i = this.reservations.length;
                while(i--){
                    if(this.reservations[i].reservationStatus !== "ACCEPTED"){
                        this.reservations.splice(i,1);
                    }
                }
            }else if(newType == 3){
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
                var i = this.reservations.length;
                while(i--){
                    if(this.reservations[i].reservationStatus !== "REJECTED"){
                        this.reservations.splice(i,1);
                    }
                }
            }else if(newType == 4){
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
                var i = this.reservations.length;
                while(i--){
                    if(this.reservations[i].reservationStatus !== "CREATED"){
                        this.reservations.splice(i,1);
                    }
                }
            }else if(newType == 5){
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
                var i = this.reservations.length;
                while(i--){
                    if(this.reservations[i].reservationStatus !== "FINISHED"){
                        this.reservations.splice(i,1);
                    }
                }
            }else if(newType == 6){
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
                var i = this.reservations.length;
                while(i--){
                    if(this.reservations[i].reservationStatus !== "QUIT"){
                        this.reservations.splice(i,1);
                    }
                }
            }else{
                this.reservations.splice(0,this.reservations.length);
                this.reservations = [...this.reservationsBackUp];  
            }
        },
        name: function(newName, oldName){
            this.name = newName;
            this.loggedInUser.firstName = newName;

        },
        lastName: function(newLastname, oldLastname){
            this.lastname = newLastname;
            this.loggedInUser.lastName = newLastname;
        },
        gender: function(newGender, oldGender){
            this.gender = newGender;
            this.loggedInUser = newGender;
        },
        oldPassword:function(newOldPassword, oldOldPassword){
            this.oldPassword = newOldPassword;
        },
        password1: function(newPassword1, oldPassword1){
            this.password1 = newPassword1;
            this.loggedInUser.password = this.password1;
        },
        password2: function(newPassword2, oldPassword2){
            this.password2 = newPassword2;
            
        },
        roomOrApartment: function(newValue, oldValue){
            if(newValue == 2){
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp];
                this.filterSearch();
                this.filterApartmentByType("APARTMENT");
                if(this.activeOrInactiveApartment == 2){
                    this.filterApartmentByStatus("ACTIVE");
                } else if(this.activeOrInactiveApartment == 3){
                    this.filterApartmentByStatus("INACTIVE");
                }
            }else if(newValue == 3){
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp];
                this.filterSearch();
                this.filterApartmentByType("ROOM");
                if(this.activeOrInactiveApartment == 2){
                    this.filterApartmentByStatus("ACTIVE");
                } else if(this.activeOrInactiveApartment == 3){
                    this.filterApartmentByStatus("INACTIVE");
                } 
            }else{
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp];
                this.filterSearch();
                if(this.activeOrInactiveApartment == 2){
                    this.filterApartmentByStatus("ACTIVE");
                } else if(this.activeOrInactiveApartment == 3){
                    this.filterApartmentByStatus("INACTIVE");
                } 
            }
        },
        activeOrInactiveApartment: function(newValue, oldValue){
            if(newValue == 2){
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp]; 
                this.filterSearch();
                this.filterApartmentByStatus("ACTIVE");
                if(this.roomOrApartment == 2){
                    this.filterApartmentByType("APARTMENT");
                }else if(this.roomOrApartment == 3){
                    this.filterApartmentByType("ROOM");
                } 
            }else if(newValue == 3){
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp]; 
                this.filterSearch();
                this.filterApartmentByStatus("INACTIVE");
                if(this.roomOrApartment == 2){
                    this.filterApartmentByType("APARTMENT");
                }else if(this.roomOrApartment == 3){
                    this.filterApartmentByType("ROOM");
                }  
            }else{
                this.apartments.splice(0,this.apartments.length);
                this.apartments = [...this.apartmentsBackUp]; 
                this.filterSearch();
                if(this.roomOrApartment == 2){
                    this.filterApartmentByType("APARTMENT");
                }else if(this.roomOrApartment == 3){
                    this.filterApartmentByType("ROOM");
                }   
            }
        },
        apartmentSortCriteria: function(newType, oldType){
            console.log(newType);
            if(newType == 2){
                this.sortApartmentsByPriceASC();
            }else if(newType == 3){
                this.sortApartmentsByPriceDESC();
            }else{
                
            }
        },
        reservationSortCriteria: function(newType, oldType){
            console.log(newType);
            if(newType == 2){
                this.sortReservationByPriceASC();
            }else if(newType == 3){
                this.sortReservationByPriceDESC();
            }else{
                
            }
        }
    }

});
