package beans;

import java.util.ArrayList;

public class Housekeeper extends User{ 
	private ArrayList<String> apartmentsId;
	
	public Housekeeper() {
		super();
	}
	
	public Housekeeper(String username, String password, String firstName, String lastName, Gender gender, ArrayList<String> apartmentsId) {
		super(username, password, firstName, lastName, gender);
		this.apartmentsId = apartmentsId;
	}

	public ArrayList<String> getApartmentsId() {
		return apartmentsId;
	}

	public void setApartmentsId(ArrayList<String> apartmentsId) {
		this.apartmentsId = apartmentsId;
	}
	
	
}
