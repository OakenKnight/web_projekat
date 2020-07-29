package beans;

import java.util.ArrayList;

public class Guest extends User{
	private ArrayList<String> apartmentsId;
	private ArrayList<String> reservationId;
	
	public Guest() {
		super();
	}
	
	public Guest(String username, String password, String firstName, String lastName, Gender gender, ArrayList<String> apartmentsId, ArrayList<String> reservationId) {
		super(username, password, firstName, lastName, gender);
		this.apartmentsId = new ArrayList<String>(apartmentsId);
		this.reservationId = new ArrayList<String>(reservationId);
	}

	public ArrayList<String> getApartmentsId() {
		return apartmentsId;
	}

	public void setApartmentsId(ArrayList<String> apartmentsId) {
		this.apartmentsId = new ArrayList<String>(apartmentsId);
	}

	public ArrayList<String> getReservationId() {
		return reservationId;
	}

	public void setReservationId(ArrayList<String> reservationId) {
		this.reservationId = new ArrayList<String>(reservationId);
	}
	
	
	
	
	
	
}
