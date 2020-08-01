package rest;
import static spark.Spark.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import beans.Amenity;
import beans.Gender;
import beans.User;



public class SparkAppMain {

	public static void main(String[] args) throws FileNotFoundException {
		
		User user1 = new User("ra", "adsfd","afda","afdsaf", Gender.MALE);
		User user2 = new User("juy", "drfsg","t","rth", Gender.FEMALE);
		user1.setId("fdeswfser");
		user2.setId("f4r4r4");

		List<User> users = List.of(user1,user2);
		
		ObjectMapper mapper = new ObjectMapper();
		File file = new File("test.json");
		
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, users);
		} catch (JsonGenerationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (JsonMappingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		  try {
			 
			List<User> readUsers = mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<User>>() {});
			System.out.println(readUsers);
			
			for(User u : readUsers) {
				 System.out.println(u.getId());
				 System.out.println(u.getFirstName());
				 System.out.println(u.getLastName());
				 System.out.println(u.getUsername());
				 System.out.println("********************************");
			}
	         
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	
		
		port(5000);
		
		try {
			staticFiles.externalLocation(new File("./static").getCanonicalPath());
		} catch (IOException e) {
			e.printStackTrace();
		}
		 
		get("rest/test", (req, res) -> {
			return "Radi";
		});
		
	}

}
