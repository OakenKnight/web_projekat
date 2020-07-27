package rest;
import static spark.Spark.*;

import java.io.File;
import java.io.IOException;

import beans.Address;


public class SparkAppMain {

	public static void main(String[] args) {

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
