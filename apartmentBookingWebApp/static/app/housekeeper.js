Vue.component("housekeeper",{ 
    data: function(){
		return{
            apartments: [],
            guests: [],
            reservations: []
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
                  </li>

              </ul>
          </nav>

          <div class="row">
              <div class="options column">
                  <ul>
                      <li class="option"><a href="#apartments">Apartments</a></li>
                      <li class="option"><a href="#guests">Guests</a></li>
                      <li class="option"><a href="#reservations">Reservations</a></li>
                  </ul>
              </div>
              <div class="sections column">
                  <section id="apartments">
                      <h3>All your apartments</h3>
                      <div class="search"><input type="text" name="guest" placeholder="Search apartment"></div>
                      <hr>
                      <div class="apartment" v-for="a in apartments">
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
                  </section>
                  <section id="guests">
                      <h1>-------------------------------------------------------------------------------------------------------------------------</h1>
                      <h3>All your guests</h3>
                      <div class="search"><input type="text" name="guest" placeholder="Search guest"></div>
                      <div class="gender">
                          <img class="gender-sign-all" src="assets/images/female-male-sign.png" alt="not found">
                          <label for="all">Show all</label>
                          <input type="radio" id="all" name="gender" value="all" checked>
                          <img class="gender-sign" src="assets/images/female-sign.png" alt="not found">
                          <label for="ladies">Show only ladies</label>
                          <input type="radio" id="ladies" name="gender" value="ladies">
                          <img class="gender-sign" src="assets/images/male-sign.png" alt="not found">
                          <label for="gentlemens">Show only gentlemens</label>
                          <input type="radio" id="gentlemens" name="gender" value="algentlemens">
                      </div>
                      <hr>
                      <div class="users" v-for="g in guests">
                          <img class="icon" v-if="g.gender == 'MALE'" src="assets/images/male-icon.png">
                          <img class="icon" v-else src="assets/images/female-icon.png">
                          <div class="user-info">
                              <h3 class="no-margin">{{g.firstName}} {{g.lastName}}</h3>
                              <p class="no-margin">Username: {{g.username}}</p>
                              <p>Last reservation: {{lastReservation(g)}}</p>
                          </div>
                          <div class="all-apartments">
                              <h4 class="no-margin"> All guest's reservation:</h4>
                              <p class="no-margin" v-for="r in g.reservationId">{{allGuestReservation(r)}}</p>
                          </div>
                      </div>
                  </section>
                  <section id="reservations">
                      <h1>-------------------------------------------------------------------------------------------------------------------------</h1>
                      <h3>All your reservations</h3>
                      <div class="search"><input type="text" name="reservation" placeholder="Search reservation by guest username"></div>
                      <div class="select-apartment-type">
                          <select required>
                              <option value="1" selected>Show all</option>
                              <option value="2">Show only accepted</option>
                              <option value="3">Show only rejected</option>
                              <option value="4">Show only created</option>
                              <option value="5">Show only finished</option>
                          </select>
                      </div>
                      <hr>
                      <div class="reservation row">
                          <div class="column left">
                              <div style="text-align: center;">
                                  <h3 style="display: inline-block;">Reservation accepted</h3>
                              </div>
                              <div class="row">
                                  <div class="reservation-apartment-info column">
                                      <h4>Apartment info</h4>
                                      <p>Apartment name: Hotel neki</p>
                                      <p>Arrival date: 22.10.2020.</p>
                                      <p>Depart date: 26.10.2020.</p>
                                      <p>Number of guests: 2</p>
                                      <p>Total price: 130€</p>
                                  </div>
                                  <div class="reservation-guest-info column">
                                      <h4>Guest info</h4>
                                      <p>Guest name: Radovan Zupunski</p>
                                      <p>Guest username: rale</p>
                                      <p>Message:<br>Dolazim oko pola 4</p>
                                  </div>
                              </div>
                          </div>
                          <div class="column right">
                              <button type="button" class="btn btn-primary" disabled>Accept</button>
                              <button type="button" class="btn btn-primary" >Reject</button>
                              <button type="button" class="btn btn-primary" >Finish</button>
                          </div>
                      </div>
                      <div class="reservation row">
                          <div class="column left">
                              <div style="text-align: center;">
                                  <h3 style="display: inline-block;">Reservation rejected</h3>
                              </div>
                              <div class="row">
                                  <div class="reservation-apartment-info column">
                                      <h4>Apartment info</h4>
                                      <p>Apartment name: Hotel neki</p>
                                      <p>Arrival date: 22.10.2020.</p>
                                      <p>Depart date: 26.10.2020.</p>
                                      <p>Number of guests: 2</p>
                                      <p>Total price: 130€</p>
                                  </div>
                                  <div class="reservation-guest-info column">
                                      <h4>Guest info</h4>
                                      <p>Guest name: Radovan Zupunski</p>
                                      <p>Guest username: rale</p>
                                      <p>Message:<br>Dolazim oko pola 4</p>
                                  </div>
                              </div>
                          </div>
                          <div class="column right">
                              <button type="button" class="btn btn-primary" disabled>Accept</button>
                              <button type="button" class="btn btn-primary" disabled>Reject</button>
                              <button type="button" class="btn btn-primary" disabled>Finish</button>
                          </div>
                      </div>
                      <div class="reservation row">
                          <div class="column left">
                              <div style="text-align: center;">
                                  <h3 style="display: inline-block;">Reservation created</h3>
                              </div>
                              <div class="row">
                                  <div class="reservation-apartment-info column">
                                      <h4>Apartment info</h4>
                                      <p>Apartment name: Hotel neki</p>
                                      <p>Arrival date: 22.10.2020.</p>
                                      <p>Depart date: 26.10.2020.</p>
                                      <p>Number of guests: 2</p>
                                      <p>Total price: 130€</p>
                                  </div>
                                  <div class="reservation-guest-info column">
                                      <h4>Guest info</h4>
                                      <p>Guest name: Radovan Zupunski</p>
                                      <p>Guest username: rale</p>
                                      <p>Message:<br>Dolazim oko pola 4</p>
                                  </div>
                              </div>
                          </div>
                          <div class="column right">
                              <button type="button" class="btn btn-primary" >Accept</button>
                              <button type="button" class="btn btn-primary" >Reject</button>
                              <button type="button" class="btn btn-primary" disabled>Finish</button>
                          </div>
                      </div>
                      <div class="reservation row">
                          <div class="column left">
                                  <div style="text-align: center;">
                                      <h3 style="display: inline-block;">Reservation finished</h3>
                                  </div>
                                  <div class="row">
                                      <div class="reservation-apartment-info column">
                                          <h4>Apartment info</h4>
                                          <p>Apartment name: Hotel neki</p>
                                          <p>Arrival date: 22.10.2020.</p>
                                          <p>Depart date: 26.10.2020.</p>
                                          <p>Number of guests: 2</p>
                                          <p>Total price: 130€</p>
                                      </div>
                                      <div class="reservation-guest-info column">
                                          <h4>Guest info</h4>
                                          <p>Guest name: Radovan Zupunski</p>
                                          <p>Guest username: rale</p>
                                          <p>Message:<br>Dolazim oko pola 4</p>
                                      </div>
                                  </div>
                          </div>
                          <div class="column right">
                              <button type="button" class="btn btn-primary" disabled>Accept</button>
                              <button type="button" class="btn btn-primary" disabled>Reject</button>
                              <button type="button" class="btn btn-primary" disabled>Finish</button>
                          </div>
                      </div>

                  </section>
              </div>
          </div>
        </div>
    `
    ,
    
    mounted () {
        axios
        .get('rest/housekeepersApartment', {params: {
            housekeeper: "joca"
        }})
        .then(response => (this.apartments = response.data));

        axios
        .get('rest/housekeepersReservation', {params: {
            housekeeper: "joca" 
        }})
        .then(response => (this.reservations = response.data));

        axios
        .get('rest/housekeepersGuests', {params: {
            housekeeper: "joca"
        }})
        .then(response => (this.guests = response.data));
	},
    methods: {
        calculateMark: function(apartment){
			var sum = 0;
			apartment.comments.forEach(element => {
				sum += element.reviewsMark;
			});
			return  (sum / apartment.comments.length);
        },
        findApartmentName: function(apId){
            var n;
            this.apartments.forEach(element =>{
                if(element.Id === apId)
                    n =  element.name;
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
            this.reservations.forEach(element => {
				if(element.Id === lr){
                    var d = Date.parse(element.arrivalDate);
                    info = this.findApartmentName(element.apartmentId) + " (" + this.dateF(d,'DD.MM.YYYY') +"-" + this.dateF(d + 86400000*element.numberOfNights,'DD.MM.YYYY') +")";
                }
            });
            
            return info;
        },
        allGuestReservation: function(res){
            var info;
            this.reservations.forEach(element => {
				if(element.Id === res){
                    var d = Date.parse(element.arrivalDate);
                    info = this.findApartmentName(element.apartmentId) + " (" + this.dateF(d,'DD.MM.YYYY') +"-" + this.dateF(d + 86400000*element.numberOfNights,'DD.MM.YYYY') +")";
                }
            });
            
            return info;
        }

    },

});