package beans;

import java.util.regex.Matcher;
import java.util.regex.Pattern;



public class Address {
	private String street;
	private String number;
	private String city;
	private String zipCode;

	public Address() {}
	
	public Address(String street, String number, String city, String zipCode) {
		super();
		this.street = street;
		this.number = number;
		this.city = city;
		this.zipCode = zipCode;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}



	private boolean validateAddress(String addr){
		Pattern pattern  = Pattern.compile("[a-zA-Z ]+[ ][0-9]+[ ]*(\\,)[a-zA-Z ]+[ ][0-9]{5}");
		Matcher matcher = pattern.matcher(addr);
		boolean matchFound = matcher.find(); 
		if(matchFound) 
			return true;
		else 
			return false;
	}
	
	
}
