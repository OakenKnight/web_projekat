package rest;

import static spark.Spark.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Key;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;

import beans.Address;
import beans.Amenity;
import beans.Apartment;
import beans.ApartmentComment;
import beans.ApartmentDTO;
import beans.ApartmentStatus;
import beans.ApartmentType;
import beans.Gender;
import beans.Guest;
import beans.Housekeeper;
import beans.Location;
import beans.Reservation;
import beans.ReservationStatus;
import beans.SearchedApartment;
import beans.User;
import beans.UserType;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import repository.ApartmentRepository;
import repository.GuestRepository;
import repository.HousekeeperRepository;
import repository.ReservationRepository;
import service.SearchService;
import service.UserService;


public class SparkAppMain {
	
	private static Gson g  = new Gson();
	
	static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	public static void main(String[] args) throws FileNotFoundException {
				
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
			String jws = Jwts.builder().setSubject(user.getUsername()).setExpiration(new Date(new Date().getTime() + 1000*10L)).setIssuedAt(new Date()).signWith(key).compact();
			user.setJWTToken(jws);
			user.setUserType(UserType.ADMIN);
			return g.toJson(user); 
		});
		
		post("/rest/register", (req, res) ->{
			res.type("application/json");
			String payload = req.body();
			User user = g.fromJson(payload, User.class);
			UserService service = new UserService();
			user.setUserType(UserType.GUEST);
			Guest guest = service.registerNewGuest(user);
			if(guest == null) res.status(500);
			return g.toJson(user); 
		});
		
		get("/rest/housekeepersApartment", (req,res)->{
			String housekeeperId = req.queryParams("housekeeper");
			ApartmentRepository  apartmentRepository = new ApartmentRepository();
			ArrayList<Apartment> allApartment = (ArrayList<Apartment>)apartmentRepository.getAll();
			ArrayList<Apartment> apartments = new ArrayList<Apartment>();
			for (Apartment a : allApartment) {
				if(a.getHousekeeper().getUsername().equals(housekeeperId))
					apartments.add(a);
			}
			return g.toJson(apartments); 
		});
		
		get("/rest/housekeepersGuests", (req,res)->{
			String housekeeperId = req.queryParams("housekeeper");
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
			String housekeeperId = req.queryParams("housekeeper");
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
	}

}

//DODAVANJE REZERVACIJA
//SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//Date arrivalDate = null;
//try {
//	arrivalDate = sdf.parse("12/10/2020");
//} catch (ParseException e1) {
//	// TODO Auto-generated catch block
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
//	// TODO Auto-generated catch block
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
