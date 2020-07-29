package beans;

import java.util.regex.Matcher;
import java.util.regex.Pattern;



public class Address {
	private String address;

	public Address() {}
	
	public Address(String address) {
		this.address = address;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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
