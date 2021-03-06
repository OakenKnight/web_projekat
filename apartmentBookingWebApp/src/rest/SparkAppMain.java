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
import io.jsonwebtoken.io.Decoder;
import io.jsonwebtoken.security.Keys;
import repository.AdminRepository;
import repository.AmenityRepository;
import repository.ApartmentRepository;
import repository.ApartmentRepositoryInterface;
import repository.GuestRepository;
import repository.HousekeeperRepository;
import repository.ReservationRepository;
import service.Base64ToImage;
import service.SearchService;
import service.UserService;
import spark.Request;
import spark.Response;
import spark.Route;


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
		ApartmentRepository aaaaaa = new ApartmentRepository();
		ArrayList<DateInterval> presorta = aaaaaa.getObj("app1").getFreeDates();
		
		for(DateInterval aaa : selectionSort(presorta)){	
			System.out.println(aaa.getStartDate() + ":" + aaa.getEndDate());
		}
		
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
			if((user = service.login(user.getUsername().trim(), user.getPassword())) == null) {
				res.status(400);
				return "Wrong username or password";
			}else {
				String jwt = Jwts.builder().setSubject(user.getUsername()).setExpiration(new Date(2020,12,31)).setIssuedAt(new Date()).signWith(key).compact();
				user.setJWTToken(jwt);
				
				return g.toJson(user); 
			}
			
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
				res.status(400);
			} 

			return g.toJson(user); 
		});
		
		post("/rest/createNewApartment", (req,res) ->{
			res.type("application/json");
			String payload = req.body();
			Apartment apartment = g.fromJson(payload, Apartment.class);
			ApartmentRepository apartmentRepository = new ApartmentRepository();

			ArrayList<String> convertedImages = new ArrayList<String>();
			int i=1;
			for(String s:apartment.getPictures()){
				String path ="/assets/images/apartmentsimg/a"+apartment.getId()+i+".jpg";
				System.out.println(path);
				Base64ToImage decoder = new Base64ToImage();
				decoder.Base64DecodeAndSave(s, path);
				path = "a"+apartment.getId()+i+".jpg";
				convertedImages.add(path);
				System.out.println(convertedImages.size());
				i++;
			}
			System.out.println(convertedImages.size());

			apartment.setPictures(convertedImages);
			System.out.println(apartment.getPictures());
			HousekeeperRepository housekeeperRepository = new HousekeeperRepository();
			Housekeeper hk = housekeeperRepository.getObj(apartment.getHousekeeper().getUsername());
			ArrayList<String> apartments = hk.getApartmentsId();
			apartments.add(apartment.getId());
			hk.setApartmentsId(apartments);
			housekeeperRepository.update(hk);
			apartment.setHousekeeper(hk);
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
			ApartmentRepository apartmentRepository = new ApartmentRepository();
			ArrayList<Apartment> apartments = (ArrayList<Apartment>)apartmentRepository.getAll();

			ArrayList<Amenity> amenities = new ArrayList<Amenity>();
			
			for(String id : ids){
				amenities.add(amenityRepository.getObj(id));
			}

			System.out.println(amenities.size());

			for(Apartment a : apartments){
				for(int i=0;i<ids.length;i++){
					if(a.hasAmenity(ids[i])){
						a.deleteAmenityById(ids[i]);
						apartmentRepository.update(a);
					}
					
				}
			}

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
		post("/rest/updateAmenity", (req,res)->{
			res.type("application/json");
			String payload = req.body();
			Amenity amenity = g.fromJson(payload, Amenity.class);
			AmenityRepository amenityRepository = new AmenityRepository();
			ApartmentRepository apartmentRepository = new ApartmentRepository();

			amenityRepository.update(amenity);

			for(Apartment a:apartmentRepository.getAll()){
				for(int i=0;i<a.getAmenities().size(); i++){
					if(a.getAmenities().get(i).getId().equals(amenity.getId())){
						a.getAmenities().set(i, amenity);
						apartmentRepository.update(a);
						break;
					}
				}
			}
			
			return g.toJson(amenityRepository.getAll());

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
			
			String convertedImages = "";
			if(apartment.getPictures().size()>0){
				int n = apartment.getPictures().size() - 1;
				if(apartment.getPictures().get(apartment.getPictures().size() - 1).length() > 50) {
					String id = "" +((new Date()).getTime());
					String path ="/assets/images/apartmentsimg/a"+id+".jpg";
					Base64ToImage decoder = new Base64ToImage();
					decoder.Base64DecodeAndSave(apartment.getPictures().get(apartment.getPictures().size() - 1), path);
					path = "a"+id+".jpg";
					convertedImages = path;	
					apartment.getPictures().remove(n);
					
				}
				if(convertedImages != "") {
					apartment.getPictures().add(convertedImages);
				}
			}
			
			
			if(apartmentRepository.update(apartment)) {
				return "Apartment created successfully";
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
		get("/rest/adminLoggedIn", (req,res)->{
			String username = getUser(req.queryParams("Authorization"));
			AdminRepository adminRepository = new AdminRepository();

			return g.toJson(adminRepository.getObj(username));			
		});
		
		get("/rest/housekeeperLoggedIn", (req,res)->{
			String username = getUser(req.queryParams("Authorization"));
			HousekeeperRepository housekeeperRepository = new HousekeeperRepository();

			return g.toJson(housekeeperRepository.getObj(username));			
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
				res.status(400);
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
				ApartmentRepository apartmentRepository = new ApartmentRepository();
				Apartment apartment = apartmentRepository.getObj(reservation.getApartmentId());
				ArrayList<DateInterval> allIntervals = apartment.getFreeDates();
				Date endReservation = new Date(reservation.getArrivalDate().getTime()+86400000*reservation.getNumberOfNights());
				DateInterval dateToMerge = new DateInterval(reservation.getArrivalDate(), endReservation);

				ArrayList<DateInterval> intervals = mergeIntervals(allIntervals, dateToMerge);

				apartment.setFreeDates(intervals);;
				apartmentRepository.update(apartment);
				return g.toJson(guestReservations); 				
		});

		get("rest/getUserRole", (req, res)->{
			String userId = getUser(req.queryParams("Authorization"));
			UserService userService = new UserService();
			User user = userService.findAnyTypeOfUser(userId);
			if(user == null) {
				res.status(400);
				return "please login";
			}
			return user.getUserType();
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
		post("/rest/updateAdmin",(req,res)->{
			res.type("application/json");
			String payload = req.body();

			System.out.println(payload);

			UserService service = new UserService();

			User adminUser = g.fromJson(payload, User.class);
			if(service.updateAdmin(adminUser)!=null){
				return g.toJson(adminUser);
			}else{
				res.status(400);
				return false;
			}
			
		});
		post("/rest/updateHousekeeper",(req,res)->{
			res.type("application/json");
			String payload = req.body();

			System.out.println(payload);

			UserService service = new UserService();

			User user = g.fromJson(payload, User.class);
			if(service.updateHousekeeper(user)!=null){
				return g.toJson(user);

			}else{
				res.status(400);
				return false;
			}

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
				res.status(400);
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
								apartment.getFreeDates().add(i++,di);								
							}
						}
						break;
					}
				}
				apartmentRepository.update(apartment);

				return true;
			}else{
				res.status(400);
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
		if(startReservation.compareTo(intervalToResize.getStartDate())==0 && endReservation.compareTo(intervalToResize.getEndDate())<0){
			newIntervals.add(new DateInterval(endReservation,intervalToResize.getEndDate()));
			return newIntervals;
		}else if(endReservation.compareTo(intervalToResize.getEndDate())==0 && startReservation.compareTo(intervalToResize.getStartDate())>0){
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
	
	public static ArrayList<DateInterval> mergeIntervals(ArrayList<DateInterval> allIntervals, DateInterval intervalToMerge){
		ArrayList<DateInterval> newIntervals = new ArrayList<DateInterval>();
		/*
		for(int i=0;i<allIntervals.size();i++){
			if(allIntervals.get(i).getEndDate().compareTo(intervalToMerge.getStartDate())==0){
				for(int j=0;j<allIntervals.size();j++){
					if(allIntervals.get(j).getStartDate().compareTo(intervalToMerge.getEndDate())==0){
						Date endInterval = allIntervals.get(j).getEndDate();
						DateInterval date = new DateInterval(allIntervals.get(i).getStartDate(), endInterval);
						allIntervals.remove(j);
						allIntervals.set(i,date);
						break;
					}else{
						DateInterval date = new DateInterval(allIntervals.get(i).getStartDate(), intervalToMerge.getEndDate());
						allIntervals.set(i, date);
						break;
					}				
					
				}
			}
			
			if(allIntervals.get(i).getStartDate().compareTo(intervalToMerge.getEndDate())==0){
				for(int j=0;j<allIntervals.size();j++){
					if(allIntervals.get(j).getEndDate().compareTo(intervalToMerge.getStartDate())==0){
						Date startInterval = allIntervals.get(j).getStartDate();
						DateInterval date = new DateInterval(startInterval,allIntervals.get(i).getEndDate());
						allIntervals.remove(i);
						allIntervals.set(j,date);
						break;
					}else{
						DateInterval date = new DateInterval(intervalToMerge.getStartDate(), allIntervals.get(i).getEndDate());
						allIntervals.set(j, date);
						break;
					}
				}
			}
		}

		for(int i=0;i<allIntervals.size()-1;i++){
			for(int j=i+1;j<allIntervals.size();j++){
				if(allIntervals.get(i).getEndDate().compareTo(allIntervals.get(j).getStartDate())==0){
					Date start = allIntervals.get(i).getStartDate();
					Date end = allIntervals.get(j).getEndDate();
					allIntervals.remove(j);
					allIntervals.set(i,new DateInterval(start, end));
				}
			}
		}
		*/
		
		/*
		for(int i=0;i<allIntervals.size();i++){
			if(allIntervals.get(i).getEndDate().compareTo(intervalToMerge.getStartDate())==0){
				if(allIntervals.get(i+1).getStartDate().compareTo(intervalToMerge.getEndDate())==0){

				}else{
					DateInterval date = new DateInterval(allIntervals.get(i).getStartDate(), intervalToMerge.getEndDate());
					allIntervals.set(i, date);
					break;
				}
				
			}
		}

		for(int i=0;i<allIntervals.size();i++){
			if(allIntervals.get(i).getStartDate().compareTo(intervalToMerge.getEndDate())==0){
				DateInterval date = new DateInterval(intervalToMerge.getStartDate(),allIntervals.get(i).getEndDate());
				allIntervals.set(i, date);
				break;
			}
		}
		*/
		int control=0;
		
		for(int i=0;i<allIntervals.size();i++){
			if(allIntervals.get(i).getEndDate().compareTo(intervalToMerge.getStartDate())==0){
				DateInterval date = new DateInterval(allIntervals.get(i).getStartDate(),intervalToMerge.getEndDate());
				allIntervals.set(i, date);
				control=1;
				break;
			}
		}
		if(control==0){
			for(int i=0;i<allIntervals.size();i++){
				if(allIntervals.get(i).getStartDate().compareTo(intervalToMerge.getEndDate())==0){
					DateInterval date = new DateInterval(intervalToMerge.getStartDate(),allIntervals.get(i).getEndDate());
					allIntervals.set(i, date);
					break;
				}
			}
		}

		for(int i=0;i<allIntervals.size()-1;i++){
			if(allIntervals.get(i).getEndDate().compareTo(allIntervals.get(i+1).getStartDate())==0){
				Date start = allIntervals.get(i).getStartDate();
				Date end = allIntervals.get(i+1).getEndDate();
				allIntervals.remove(i+1);
				allIntervals.set(i,new DateInterval(start, end));
				break;
			}
		}
		
		for(int i=0;i<allIntervals.size()-1;i++){
			if(allIntervals.get(i).getEndDate().compareTo(allIntervals.get(i+1).getStartDate())>0){
				Date start = allIntervals.get(i).getStartDate();
				Date end = allIntervals.get(i+1).getEndDate();
				allIntervals.remove(i+1);
				allIntervals.set(i,new DateInterval(start, end));
				break;
			}
		}
		/*
		for(int i=0;i<allIntervals.size()-1;i++){
			for(int j=i+1;j<allIntervals.size();j++){
				if(allIntervals.get(i).getEndDate().compareTo(allIntervals.get(j).getStartDate())==0){
					Date start = allIntervals.get(i).getStartDate();
					Date end = allIntervals.get(j).getEndDate();
					allIntervals.remove(j);
					allIntervals.set(i,new DateInterval(start, end));
					break;
				}
			}
		}
		*/
		for(DateInterval date: allIntervals){
			newIntervals.add(date);
		}
		return newIntervals;
	}
	
	public static ArrayList<DateInterval> selectionSort(ArrayList<DateInterval> allIntervals)  
	{  
    	int i, j, min_idx;  
  
    // One by one move boundary of unsorted subarray  
		for (i = 0; i < allIntervals.size()-1;i++)  
		{  
			// Find the minimum element in unsorted array  
			min_idx = i;  
			for (j = i+1; j < allIntervals.size(); j++)  
			if (allIntervals.get(j).getStartDate().compareTo(allIntervals.get(i).getStartDate()) < 0){
				min_idx = j;  
			}  
	
			// Swap the found minimum element with the first element  
			//swap(&allIntervals.get(min_idx), &allIntervals.get(i));  
			DateInterval temp = allIntervals.get(min_idx); 
            allIntervals.set(min_idx,allIntervals.get(i)); 
            allIntervals.set(i, temp); 
		} 
		return allIntervals; 
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
