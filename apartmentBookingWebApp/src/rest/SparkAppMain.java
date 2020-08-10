package rest;
import static spark.Spark.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Admin;
import beans.Amenity;
import beans.Apartment;
import beans.ApartmentComment;
import beans.ApartmentStatus;
import beans.ApartmentType;
import beans.Gender;
import beans.Housekeeper;
import beans.Location;
import beans.User;
import repository.AdminRepository;
import repository.ApartmentRepository;
import repository.HousekeeperRepository;

public class SparkAppMain {

	public static void main(String[] args) throws FileNotFoundException {
		
		Admin user1 = new Admin("rale","rale" ,"radovan","zupunski", Gender.MALE);
		Admin user2 = new Admin("juy", "drfsg","t","rth", Gender.FEMALE);
		
		AdminRepository adminRepository = new AdminRepository();
		
		adminRepository.create(user1);
		adminRepository.create(user2);
		Admin a1 = adminRepository.getObj("rale");
		System.out.println(a1.getGender().toString());
		
		
//		ArrayList<Date> date = new ArrayList<Date>();
//		date.add(new Date(2020, 12, 12));
//		Location loc = new Location(123,123,new Address("asdasdas"));
//		Apartment ap = new Apartment(ApartmentType.ROOM,3,4,loc,date,new Housekeeper(), new ArrayList<ApartmentComment>(), new ArrayList<String>(),
//				12.3, new Time(2, 2, 2), new Time(2, 2, 2), ApartmentStatus.ACTIVE, new ArrayList<Amenity>(), new ArrayList<String>());
//		ap.setId("id");
//		ApartmentRepository apRep = new ApartmentRepository();
//		apRep.create(ap);
//		Apartment apartment =  apRep.getObj("id");
//		System.out.println("type: " + apartment.getApartmentType());
//		System.out.println("status: " + apartment.getApartmentStatus());
//		System.out.println("location: " + apartment.getLocation().getLatitude() +" "+ apartment.getLocation().getLongitude() +" " +  apartment.getLocation().getAddress().getAddress() +" ");
//		System.out.println("time: " + apartment.getArrivalTime().toString());
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
