package rest;

import static spark.Spark.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.security.Key;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.stream.events.Comment;

import com.google.gson.Gson;
import beans.Address;
import beans.Admin;
import beans.Amenity;
import beans.AmenityType;
import beans.Apartment;
import beans.ApartmentComment;
import beans.ApartmentStatus;
import beans.ApartmentType;
import beans.DateInterval;
import beans.Gender;
import beans.Guest;
import beans.Housekeeper;
import beans.Location;
import beans.Reservation;
import beans.ReservationStatus;
import beans.SearchedApartment;
import beans.User;
import beans.UserType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import repository.AdminRepository;
import repository.AmenityRepository;
import repository.ApartmentRepository;
import repository.ApartmentRepositoryInterface;
import repository.GuestRepository;
import repository.HousekeeperRepository;
import repository.ReservationRepository;
import service.SearchService;
import service.UserService;


public class SparkAppMain {
	
	private static Gson g  = new Gson();
	
	static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	public static void main(String[] args) throws FileNotFoundException {
		SimpleDateFormat sdformat = new SimpleDateFormat("dd.MM.yyyy");
		Date d1= null;
		try {
			 d1 = sdformat.parse("15.09.2020");
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Date startDate = new Date();
		Date date = new Date();
		Date endDate = new Date();
		System.out.println(d1.getTime());
		DateInterval dateInterval = new DateInterval(startDate, endDate);

		
		port(5000);
		try {
			staticFiles.externalLocation(new File("./static").getCanonicalPath());

		} catch (IOException e) {
			e.printStackTrace();
		}
		 
		get("/rest/test", (req, res) -> {
			return "Radi";
		});
		
		post("/rest/login", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			User user = g.fromJson(payload, User.class);
			UserService service = new UserService();
			user = service.login(user.getUsername().trim(), user.getPassword());
			String jwt = Jwts.builder().setSubject(user.getUsername()).setExpiration(new Date(2020,12,31)).setIssuedAt(new Date()).signWith(key).compact();
			user.setJWTToken(jwt);

			return g.toJson(user); 
		});
		
		
		
		
		post("/rest/register", (req, res) ->{
			res.type("application/json");
			String payload = req.body();
			User user = g.fromJson(payload, User.class);
			UserService service = new UserService();
			user.setUserType(UserType.GUEST);
			Guest guest = service.registerNewGuest(user);
			
			
			String jwt = Jwts.builder().setSubject(user.getUsername()).setExpiration(new Date(2020,12,31)).setIssuedAt(new Date()).signWith(key).compact();
			user.setJWTToken(jwt);
			
			if(guest == null){
				res.status(500);
			} 

			return g.toJson(user); 
		});
		
		post("/rest/createNewApartment", (req,res) ->{
			res.type("application/json");
			String payload = req.body();
			Apartment apartment = g.fromJson(payload, Apartment.class);
			ApartmentRepository apartmentRepository = new ApartmentRepository();
			if(apartmentRepository.create(apartment)) {
				return "Apartment created successfully";
			}
			return "Someting went wrong";
		});
		
		post("/rest/deleteAmenities", (req,res)->{
			res.type("application/json");
			String payload = req.body();
			payload = payload.substring(1, payload.length()-1);
			String[] ids = payload.split(",");
			for(int i = 0; i < ids.length; i++) {
				ids[i] = ids[i].substring(1, ids[i].length()-1);					
			}
			AmenityRepository amenityRepository = new AmenityRepository();
			for(int i = 0; i < ids.length; i++) {
				amenityRepository.remove(ids[i]);
			}
			//TREBA OBRISATI I IZ SVIH APARTMANA
			return "Amenities deleted successfully";
		});
		
		post("/rest/addNewAmenity", (req,res)->{
			res.type("application/json");
			String payload = req.body();
			Amenity amenity = g.fromJson(payload, Amenity.class);
			AmenityRepository amenityRepository = new AmenityRepository();
			if(amenityRepository.create(amenity)) {
				return "Amenity created successfully";
			}
			return "Someting went wrong";
		});
		
		get("/rest/getHousekeeper", (req,res)->{
			String housekeeperId = getUser(req.queryParams("Authorization"));
			HousekeeperRepository housekeeperRepository = new HousekeeperRepository();
			return g.toJson(housekeeperRepository.getObj(housekeeperId));
		});
		
		post("/rest/updateReservation", (req,res)->{
			res.type("application/json");
			String payload = req.body();
			Reservation reservation = g.fromJson(payload, Reservation.class);
			ReservationRepository reservationRepository = new ReservationRepository();
			if(reservationRepository.update(reservation)) {
				return "Reservation update successfully";
			}
			return "Someting went wrong";
		});
		
		post("/rest/updateApartment", (req,res) ->{
			res.type("application/json");
			String payload = req.body();
			Apartment apartment = g.fromJson(payload, Apartment.class);
			ApartmentRepository apartmentRepository = new ApartmentRepository();
			if(apartmentRepository.update(apartment)) {
				return "Info update successfully";
			}
			return "Someting went wrong";
		});
		
		get("/rest/getAllAmenities", (req,res)->{
			AmenityRepository amenityRepository = new AmenityRepository();
			List<Amenity> amenities = new ArrayList<Amenity>();
			amenities = amenityRepository.getAll();
			return g.toJson(amenities);
		});
		
		get("/rest/getAllApartments", (req,res)->{
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			return g.toJson(apartmentRepository.getAll()); 
		});
		
		get("/rest/getAllReservations", (req,res)->{
			ReservationRepository  reservationRepository = new ReservationRepository();
			return g.toJson(reservationRepository.getAll()); 
		});
		
		get("/rest/getAllGuests", (req,res)->{
			GuestRepository  guestRepository = new GuestRepository();
			return g.toJson(guestRepository.getAll()); 
		});
		
		get("/rest/getAllHousekeepers", (req,res)->{
			HousekeeperRepository housekeeperRepository = new HousekeeperRepository();
			return g.toJson(housekeeperRepository.getAll());
		});
		
		get("/rest/housekeepersApartment", (req,res)->{
			String housekeeperId = getUser(req.queryParams("Authorization"));
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			ArrayList<Apartment> allApartment = (ArrayList<Apartment>)apartmentRepository.getAll();
			ArrayList<Apartment> apartments = new ArrayList<Apartment>();
			for (Apartment a : allApartment) {
				if(a.getHousekeeper().getUsername().equals(housekeeperId))
					apartments.add(a);
			}
			return g.toJson(apartments); 
		});
		get("/rest/userLoggedIn", (req,res)->{
			String username = getUser(req.queryParams("Authorization"));
			GuestRepository guestRepository = new GuestRepository();

			return g.toJson(guestRepository.getObj(username));			
		});
		
		get("/rest/housekeepersGuests", (req,res)->{
			String housekeeperId = getUser(req.queryParams("Authorization"));
			GuestRepository guestRepository = new GuestRepository();
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			ReservationRepository reservationRepository = new ReservationRepository();
			ArrayList<Apartment> allApartment = (ArrayList<Apartment>)apartmentRepository.getAll();
			ArrayList<Apartment> apartments = new ArrayList<Apartment>();
			for (Apartment a : allApartment) {
				if(a.getHousekeeper().getUsername().equals(housekeeperId))
					apartments.add(a);
			}
			ArrayList<Guest> guests = new ArrayList<Guest>();
			for (Apartment a : apartments) {
				for (String reserv : a.getReservationsId()) {	
					if(guests.stream().filter(guest -> guest.getUsername()
							.equals(reservationRepository.getObj(reserv).getGuestId()))
							.findFirst().orElse(null) == null) {
						guests.add(guestRepository.getObj(reservationRepository.getObj(reserv).getGuestId()));
					}
				}
			}
			return g.toJson(guests); 
		});

		
		get("/rest/housekeepersReservation", (req,res)->{
			String housekeeperId = getUser(req.queryParams("Authorization"));
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			ReservationRepository reservationRepository = new ReservationRepository();
			ArrayList<Apartment> allApartment = (ArrayList<Apartment>)apartmentRepository.getAll();
			ArrayList<Apartment> apartments = new ArrayList<Apartment>();
			for (Apartment a : allApartment) {
				if(a.getHousekeeper().getUsername().equals(housekeeperId))
					apartments.add(a);
			}
			ArrayList<Reservation> reservations = new ArrayList<Reservation>();
			for (Apartment a : apartments) {
				for (String reserv : a.getReservationsId()) {
					reservations.add(reservationRepository.getObj(reserv));
				}
			}
			return g.toJson(reservations); 
		});
		
		post("/rest/reset", (req, res) ->{
			res.type("application/json");
			String payload = req.body();
			User user = g.fromJson(payload, User.class);
			UserService service = new UserService();
			
			if(service.resetPassword(user.getUsername(), user.getPassword())) 
				return true;
			else {
				res.status(500);
				return false;
			}
		});
		
		get("/rest/recappart", (req, res) -> {
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			ArrayList<Apartment> apartments = (ArrayList<Apartment>)apartmentRepository.getAll();

			return g.toJson(apartments); 
		});
		
		post("/rest/search", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			System.out.println(payload);
			SearchedApartment searchedApartment = g.fromJson(payload, SearchedApartment.class);
			
			SearchService searchService = new SearchService();

			ArrayList<Apartment> filtered = searchService.searchApartments(searchedApartment);


			return g.toJson(filtered); 
			
		});


		get("/rest/apartments/:id",(req,res)->{
			res.type("application/json");
			String id = req.params("id");
			
			System.out.println(id);
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			
			Apartment a = apartmentRepository.getObj(id);

			return g.toJson(a);
		});
		
		get("/rest/editApartment/:id",(req,res)->{
			res.type("application/json");
			String id = req.params("id");
			
			System.out.println(id);
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			
			Apartment a = apartmentRepository.getObj(id);

			return g.toJson(a);
		});

		get("/rest/userLoggedInReservations", (req,res)->{
		String guestUsername = getUser(req.queryParams("Authorization"));

		ReservationRepository reservationRepository = new ReservationRepository();
		ArrayList<Reservation> allReservations = (ArrayList<Reservation>)reservationRepository.getAll();

		ArrayList<Reservation> guestReservations = new ArrayList<Reservation>();
		for (Reservation r : allReservations) {
			if(r.getGuestId().equals(guestUsername))
				guestReservations.add(r);
		}
		return g.toJson(guestReservations); 
		});

		get("/rest/userLoggedInApartments", (req,res)->{
			String guestUsername = getUser(req.queryParams("Authorization"));

			ReservationRepository reservationRepository = new ReservationRepository();
			ArrayList<Reservation> allReservations = (ArrayList<Reservation>)reservationRepository.getAll();

			ApartmentRepository  apartmentRepository = new ApartmentRepository();

			ArrayList<Apartment> apartments = new ArrayList<Apartment>();

			for (Reservation r : allReservations) {
				if(r.getGuestId().equals(guestUsername)){
					apartments.add(apartmentRepository.getObj(r.getApartmentId()));
				}
			}
			return g.toJson(apartments); 

			});
		post("/rest/cancelReservation", (req, res) -> {
				res.type("application/json");
				String payload = req.body();
				System.out.println(payload);
				Reservation reservation = g.fromJson(payload, Reservation.class);
				
				ReservationRepository reservationRepository = new ReservationRepository();
				
				reservation.setReservationStatus(ReservationStatus.QUIT);

				reservationRepository.update(reservation);

				ArrayList<Reservation> guestReservations = new ArrayList<Reservation>();
				for (Reservation r : reservationRepository.getAll()) {
					if(r.getGuestId().equals(reservation.getGuestId()))
						guestReservations.add(r);
				}
				
				return g.toJson(guestReservations); 				
		});


			
		post("/rest/update",(req,res)->{
				res.type("application/json");
				String payload = req.body();

				System.out.println(payload);
				
				User guestUser = g.fromJson(payload, User.class);

				UserService service = new UserService();

				service.updateGuest(guestUser);

				return g.toJson(guestUser);
		});
			
		post("/rest/comment",(req,res)->{
			res.type("application/json");
			String payload = req.body();

			System.out.println(payload);
			
			ApartmentComment comment  = g.fromJson(payload, ApartmentComment.class);
			ApartmentRepository apartmentRepository = new ApartmentRepository();
			Apartment apartment = apartmentRepository.getObj(comment.getApartmentId());

			ArrayList<ApartmentComment> apartmentComments = apartment.getComments();
			apartmentComments.add(comment);
			apartment.setComments(apartmentComments);


			if(apartmentRepository.update(apartment)) 
				return true;
			else {
				res.status(500);
				return false;
			}
		});
		
		post("/rest/requestBooking",(req,res)->{
			res.type("application/json");
			String payload = req.body();
			System.out.println(payload);
			Reservation reservation = g.fromJson(payload, Reservation.class);
			ReservationRepository reservationRepository = new ReservationRepository();
			if(reservationRepository.create(reservation)){
				ApartmentRepository apartmentRepository = new ApartmentRepository();
				Apartment apartment = apartmentRepository.getObj(reservation.getApartmentId());
				ArrayList<String> reservations = apartment.getReservationsId();
				reservations.add(reservation.getId());
				apartment.setReservationsId(reservations);
				for (int i = 0; i < apartment.getFreeDates().size(); i++) {
					if(apartment.getFreeDates().get(i).isDateInInterval(reservation.getArrivalDate())) {
						ArrayList<DateInterval> dateIntervals = resizeInterval(apartment.getFreeDates().get(i), reservation.getArrivalDate(), new Date(reservation.getArrivalDate().getTime() + reservation.getNumberOfNights()*86400000));
						apartment.getFreeDates().remove(i);
						for (DateInterval di : dateIntervals) {
							if(di != null) {
								apartment.getFreeDates().add(di);								
							}
						}
						break;
					}
				}
				apartmentRepository.update(apartment);

				return true;
			}else{
				res.status(500);
				return false;
			}
		});
		
	}
	
	public static String getUser(String auth) {
		if ((auth != null) && (auth.contains("Bearer "))) {
			String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
			try {
			    Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
			    return claims.getBody().getSubject();
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
		return "";
	}
	
	public static ArrayList<DateInterval> resizeInterval(DateInterval intervalToResize, Date startReservation, Date endReservation){
		ArrayList<DateInterval> newIntervals = new ArrayList<DateInterval>();
		if(startReservation.compareTo(intervalToResize.getStartDate())==0 && endReservation.compareTo(intervalToResize.getEndDate())<=0){
			newIntervals.add(new DateInterval(endReservation,intervalToResize.getEndDate()));
			return newIntervals;
		}else if(endReservation.compareTo(intervalToResize.getEndDate())==0 && startReservation.compareTo(intervalToResize.getStartDate())>=0){
			newIntervals.add(new DateInterval(intervalToResize.getStartDate(),startReservation));
			return newIntervals;
		}else if(endReservation.compareTo(intervalToResize.getEndDate())==0 && startReservation.compareTo(intervalToResize.getStartDate())==0){
			newIntervals.add(null);
			return newIntervals;
		}else{
			newIntervals.add(new DateInterval(intervalToResize.getStartDate(),startReservation));
			newIntervals.add(new DateInterval(endReservation,intervalToResize.getEndDate()));
			return newIntervals;
		}
	}
	

}

/* OVO JE ZA PRINT DATUMA U MILIS FORMATU NA SKRINU DA MOZES DA IH UZMES ZA JSON
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			Date d;
			try {
				d = sdf.parse("13/09/2020");
				long milis = d.getTime();
				System.out.println(milis);
				dates.add(d);
				d = sdf.parse("14/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("15/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("16/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("20/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("22/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("23/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("24/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("25/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("26/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);

				d = sdf.parse("27/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);
				
				d = sdf.parse("28/09/2020");
				milis = d.getTime();
				System.out.println(milis);
				dates.add(d);


				a.setFreeDates(dates);
			} catch (ParseException e1) {
				e1.printStackTrace();
			}
			

			*/


//DODAVANJE REZERVACIJA
//SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//Date arrivalDate = null;
//try {
//	arrivalDate = sdf.parse("12/10/2020");
//} catch (ParseException e1) {
//	e1.printStackTrace();
//}
//String message = "...";
//String guestId = "kristina93";
//
//Reservation reservation = new Reservation("app32", arrivalDate, 3, 100, message, guestId, ReservationStatus.ACCEPTED);
//reservation.setId(guestId+"1");
//ReservationRepository reservationRepository = new ReservationRepository();
//reservationRepository.create(reservation);






//DODAVANJE APARTMANA
//Address address = new Address("Strazilovska","15","Novi Sad","21000");
//Location location = new Location(78.93, 15.65, address);
//ArrayList<Date> freeDates = new ArrayList<Date>();
//SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//Date d;
//try {
//	d = sdf.parse("22/09/2020");
//	freeDates.add(d);
//	d = sdf.parse("23/08/2020");
//	freeDates.add(d);
//	d = sdf.parse("24/08/2020");
//	freeDates.add(d);
//	d = sdf.parse("25/08/2020");
//	freeDates.add(d);
//	d = sdf.parse("26/08/2020");
//	freeDates.add(d);
//	d = sdf.parse("27/08/2020");
//	freeDates.add(d);
//} catch (ParseException e1) {
//	e1.printStackTrace();
//}
//ArrayList<String> apartmentsId = new ArrayList<String>();
//apartmentsId.add("app12");
//apartmentsId.add("app22");
//apartmentsId.add("app32");
//apartmentsId.add("app42");
//Housekeeper housekeeper = new Housekeeper("joca", "joca", "Jovan", "Jovic", Gender.MALE, apartmentsId);
//ArrayList<ApartmentComment> comments = new ArrayList<ApartmentComment>();
//comments.add(new ApartmentComment("guest1", "Sta znam nako", 8));
//comments.add(new ApartmentComment("guest2", "Dobar pravo", 10));
//comments.add(new ApartmentComment("guest3", "dobar", 7));
//comments.add(new ApartmentComment("guest4", "Nije ni za svinje", 3));
//ArrayList<String> pictures  = new ArrayList<String>();
//pictures.add("7.jpg");
//pictures.add("8.jpg");
//ArrayList<Amenity> amenities = new ArrayList<Amenity>();
//amenities.add(new  Amenity("Klima"));
//amenities.add(new  Amenity("Kuhinja"));
//amenities.add(new  Amenity("Parking"));
//amenities.add(new  Amenity("Bazen"));
//amenities.add(new  Amenity("Dorucak"));
//ArrayList<String> reservationsId = new ArrayList<String>();
//reservationsId.add("b");
//Apartment apartment1 = new Apartment(ApartmentType.APPARTMENT, 1, 3, location, freeDates, housekeeper, comments, pictures, 100, new Time(12, 30, 0), new Time(9, 30, 0), ApartmentStatus.ACTIVE, amenities, reservationsId);
//apartment1.setId("app32");
//ApartmentRepository repository = new ApartmentRepository();
//repository.create(apartment1);





			/*
			Amenity a1 = new Amenity((new Date().getTime())+"", "Wifi","Continous access in the listing", AmenityType.BASIC);
			Amenity a2 = new Amenity((new Date().getTime())+"", "Laptop friendly workspace","A table with space for a laptop and a chair thats comfortable to work in", AmenityType.BASIC);
			Amenity a3 = new Amenity((new Date().getTime())+"", "Cable TV","", AmenityType.BASIC);
			Amenity a4 = new Amenity((new Date().getTime())+"", "Washer","In the building, free or for a fee", AmenityType.BASIC);
			Amenity a5 = new Amenity((new Date().getTime())+"", "Air conditioning","", AmenityType.BASIC);
			Amenity a6 = new Amenity((new Date().getTime())+"", "Heating","Central heating or a heater in the listing", AmenityType.BASIC);
			Amenity a7 = new Amenity((new Date().getTime())+"", "Ethernet connection","", AmenityType.BASIC);
			Amenity a8 = new Amenity((new Date().getTime())+"", "Essentials","Towels, bed sheets, soap and toilet paper", AmenityType.BASIC);
			Amenity a9 = new Amenity((new Date().getTime())+"", "Hot water","", AmenityType.BASIC);
			Amenity a10 = new Amenity((new Date().getTime())+"", "Iron","", AmenityType.BASIC);

			Amenity a11 = new Amenity((new Date().getTime())+"", "Crib","", AmenityType.FAMILY_FEATURES);
			Amenity a12 = new Amenity((new Date().getTime())+"", "High chair","", AmenityType.FAMILY_FEATURES);
			Amenity a13 = new Amenity((new Date().getTime())+"", "Pack'n Play/ travel crib","", AmenityType.FAMILY_FEATURES);
			Amenity a14 = new Amenity((new Date().getTime())+"", "Room-darkening shades","", AmenityType.FAMILY_FEATURES);
			Amenity a15 = new Amenity((new Date().getTime())+"", "Window guards","", AmenityType.FAMILY_FEATURES);

			Amenity a16 = new Amenity((new Date().getTime())+"", "Elevator","", AmenityType.FACILITIES);
			Amenity a17 = new Amenity((new Date().getTime())+"", "Single level home","No stairs in home", AmenityType.FACILITIES);
			Amenity a18 = new Amenity((new Date().getTime())+"", "Free street parking","", AmenityType.FACILITIES);

			Amenity a19 = new Amenity((new Date().getTime())+"", "Kitchen","Space where guests can cook their own meals", AmenityType.DINING);
			Amenity a20 = new Amenity((new Date().getTime())+"", "Coffee maker","", AmenityType.DINING);
			Amenity a21 = new Amenity((new Date().getTime())+"", "Cooking basics","Pots and pans, oil salt and pepper", AmenityType.DINING);
			Amenity a22 = new Amenity((new Date().getTime())+"", "Dishes and silverware","", AmenityType.DINING);
			Amenity a23 = new Amenity((new Date().getTime())+"", "Microwave","", AmenityType.DINING);
			Amenity a24 = new Amenity((new Date().getTime())+"", "Refrigerator","", AmenityType.DINING);

			AmenityRepository amenityRepository = new AmenityRepository();
			
			ArrayList<Amenity> amenities = new ArrayList<Amenity>();
			amenities.add(a1);
			amenities.add(a2);
			amenities.add(a3);
			amenities.add(a4);
			amenities.add(a5);
			amenities.add(a6);
			amenities.add(a7);
			amenities.add(a8);
			amenities.add(a9);
			amenities.add(a10);
			amenities.add(a11);
			amenities.add(a12);
			amenities.add(a13);
			amenities.add(a14);
			amenities.add(a15);
			amenities.add(a16);
			amenities.add(a17);
			amenities.add(a18);
			amenities.add(a19);
			amenities.add(a20);
			amenities.add(a21);
			amenities.add(a22);
			amenities.add(a23);
			amenities.add(a24);

			amenityRepository.saveAll(amenities);
			*/
