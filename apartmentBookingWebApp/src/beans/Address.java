package beans;

import java.util.regex.Matcher;
import java.util.regex.Pattern;



public class Address {
	private String address;

	public Address() {}
	
	public Address(String address) {
		if(validateAddress(address))
			this.address = address;
		else {
			System.out.println("Address is incorrect");
			this.address = "Abc 0, Abc Abc 00000";
		}
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		if(validateAddress(address))
			this.address = address;
		else
			System.out.println("Address is incorrect");
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
