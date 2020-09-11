package beans;

import java.util.Date;

public class Reservation {
	private String Id;
	private String  apartmentId;
	private Date arrivalDate;
	private int numberOfNights;
	private double totalPrice;
	private String message;
	private String guestId;
	private ReservationStatus reservationStatus;
	
	public Reservation() {}
	
	public Reservation(String id, String apartmentId, Date arrivalDate, int numberOfNights, double totalPrice,
			String message, String guestId, ReservationStatus reservationStatus) {
		this.Id = id;
		this.apartmentId = apartmentId;
		this.arrivalDate = arrivalDate;
		this.numberOfNights = numberOfNights;
		this.totalPrice = totalPrice;
		this.message = message;
		this.guestId = guestId;
		this.reservationStatus = reservationStatus;
	}

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getApartmentId() {
		return apartmentId;
	}

	public void setApartmentId(String apartmentId) {
		this.apartmentId = apartmentId;
	}

	public Date getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(Date arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public int getNumberOfNights() {
		return numberOfNights;
	}

	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public ReservationStatus getReservationStatus() {
		return reservationStatus;
	}

	public void setReservationStatus(ReservationStatus reservationStatus) {
		this.reservationStatus = reservationStatus;
	}
	
	
	
	
	
	
}
