package beans;


import java.util.ArrayList;
import java.util.Date;
import java.sql.Time;



public class Apartment {
	private String id;
	private String name;
	private ApartmentType apartmentType;
	private int roomNumber;
	private int guestNumber;
	private Location location;
	private ArrayList<Date> freeDates;
	private Housekeeper housekeeper;
	private ArrayList<ApartmentComment> comments;
	private ArrayList<String> pictures;
	private double priceForNight;
	private String arrivalTime;
	private String exitTime;
	private ApartmentStatus apartmentStatus;
	private ArrayList<Amenity> amenities;
	private ArrayList<String> reservationsId;
	
	
	public Apartment() {}
	
	public Apartment(String id, String name ,ApartmentType apartmentType, int roomNumber, int guestNumber, Location location,
			ArrayList<Date> freeDates, Housekeeper housekeeper, ArrayList<ApartmentComment> comments,
			ArrayList<String> pictures, double priceForNight, String arrivalTime, String exitTime,
			ApartmentStatus apartmentStatus, ArrayList<Amenity> amenities, ArrayList<String> reservationsId) {
		super();
		this.id = id;
		this.name = name;
		this.apartmentType = apartmentType;
		this.roomNumber = roomNumber;
		this.guestNumber = guestNumber;
		this.location = location;
		this.freeDates = new ArrayList<Date>(freeDates);
		this.housekeeper = housekeeper;
		this.comments = new ArrayList<ApartmentComment>(comments);
		this.pictures = new ArrayList<String>(pictures);
		this.priceForNight = priceForNight;
		this.arrivalTime = arrivalTime;
		this.exitTime = exitTime;
		this.apartmentStatus = apartmentStatus;
		this.amenities = new ArrayList<Amenity>(amenities);
		this.reservationsId = new ArrayList<String>(reservationsId);
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ApartmentType getApartmentType() {
		return apartmentType;
	}

	public void setApartmentType(ApartmentType apartmentType) {
		this.apartmentType = apartmentType;
	}

	public int getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(int roomNumber) {
		this.roomNumber = roomNumber;
	}

	public int getGuestNumber() {
		return guestNumber;
	}

	public void setGuestNumber(int guestNumber) {
		this.guestNumber = guestNumber;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Housekeeper getHousekeeper() {
		return housekeeper;
	}

	public void setHousekeeper(Housekeeper housekeeper) {
		this.housekeeper = housekeeper;
	}

	public double getPriceForNight() {
		return priceForNight;
	}

	public void setPriceForNight(double priceForNight) {
		this.priceForNight = priceForNight;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getExitTime() {
		return exitTime;
	}

	public void setExitTime(String exitTime) {
		this.exitTime = exitTime;
	}

	public ApartmentStatus getApartmentStatus() {
		return apartmentStatus;
	}

	public void setApartmentStatus(ApartmentStatus apartmentStatus) {
		this.apartmentStatus = apartmentStatus;
	}

	public ArrayList<Date> getFreeDates() {
		return freeDates;
	}

	public void setFreeDates(ArrayList<Date> freeDates) {
		this.freeDates = freeDates;
	}

	public ArrayList<ApartmentComment> getComments() {
		return comments;
	}

	public void setComments(ArrayList<ApartmentComment> comments) {
		this.comments = comments;
	}

	public ArrayList<String> getPictures() {
		return pictures;
	}

	public void setPictures(ArrayList<String> pictures) {
		this.pictures = pictures;
	}

	public ArrayList<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(ArrayList<Amenity> amenities) {
		this.amenities = amenities;
	}

	public ArrayList<String> getReservationsId() {
		return reservationsId;
	}

	public void setReservationsId(ArrayList<String> reservationsId) {
		this.reservationsId = reservationsId;
	}

	
	
	
	
	
	
}
