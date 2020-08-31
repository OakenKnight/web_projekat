package service;

import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Apartment;
import beans.ApartmentDTO;
import beans.SearchedApartment;
import repository.ApartmentRepository;
import repository.ReservationRepository;

public class SearchService {
    private ApartmentRepository apartmentRepository;
    private ReservationRepository reservationRepository;

    public SearchService() {
        this.apartmentRepository = new ApartmentRepository();
        this.reservationRepository = new ReservationRepository();
    }

    public ArrayList<Apartment> searchApartments(SearchedApartment searchedApartment) {

        System.out.println(searchedApartment);
        ArrayList<Apartment> apartments = (ArrayList<Apartment>) apartmentRepository.getAll();

        if (!isNullOrEmpty(searchedApartment.getDestination()))
            apartments = filterByDestination(apartments, searchedApartment.getDestination());
        
        if(!isNullOrEmpty(searchedApartment.getNumberOfGuests()))
            apartments = filterByGuests(apartments, searchedApartment.getNumberOfGuests());
        

        if(!isNullOrEmpty(searchedApartment.getMinimumPrice()))
            apartments = filterByMinPrice(apartments, searchedApartment.getMinimumPrice());


        if(!isNullOrEmpty(searchedApartment.getMaximumPrice()))
            apartments = filterByMaxPrice(apartments, searchedApartment.getMaximumPrice());

        /*
        if(!isNullOrEmpty(searchedApartment.getArriveDate()))
            apartments = filterByArriveDate(apartments, searchedApartment.getArriveDate());

        if(!isNullOrEmpty(searchedApartment.getLevingDate()))
            apartments = filterByDepartDate(apartments, searchedApartment.getLeavingDate());
        */      


        return apartments;
    }
    public static boolean isNullOrEmpty(String str) {
        if(str != null && !str.isEmpty())
            return false;
        return true;
    }
    /*
    public ApartmentDTO searchedApartmentToDTO(SearchedApartment searchedApartment) {
        String destination = null;
        Date arriveDate = null;
        Date departDate = null;
        int numberOfGuests = -1;
        int minimumPrice = -1;
        int maximumPrice = -1;


        
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

        if (!searchedApartment.getArriveDate().equals(null)){
            try {
                arriveDate = dateFormat.parse(searchedApartment.getArriveDate());
            } catch (ParseException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }

        }
            

        if (!destinationEmpty(searchedApartment))
            destination = searchedApartment.getDestination();

        if (!departDateEmpty(searchedApartment)){
            try {
                departDate = dateFormat.parse(searchedApartment.getLeavingDate());
            } catch (ParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
            

        if(!numberOfGuestsEmpty(searchedApartment))
            numberOfGuests = Integer.parseInt(searchedApartment.getNumberOfGuests());

        if(!minimumPriceEmpty(searchedApartment))
            minimumPrice = Integer.parseInt(searchedApartment.getMinimumPrice());

        if(!maximumPriceEmpty(searchedApartment))
            maximumPrice = Integer.parseInt(searchedApartment.getMaximumPrice());	

        ApartmentDTO aprtDTO = new ApartmentDTO(destination,arriveDate,departDate,numberOfGuests,minimumPrice,maximumPrice);
        
        return aprtDTO;
    }

    */

    public ArrayList<Apartment> filterByArriveDate(ArrayList<Apartment> apartments, String arriveDate) {
        //TODO : FILTER PO DATUMU

        return apartments;
    }

    public ArrayList<Apartment> filterByDepartDate(ArrayList<Apartment> apartments, String departDate) {
        //TODO : FILTER PO DATUMU

        return apartments;
    }

    public ArrayList<Apartment> filterByGuests(ArrayList<Apartment> apartments, String numberOfGuests) {
        int num = Integer.parseInt(numberOfGuests);

        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        for(Apartment a : apartments){
            if(a.getGuestNumber()==num){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }
    public ArrayList<Apartment> filterByMinPrice(ArrayList<Apartment> apartments, String minPrice) {
        int min = Integer.parseInt(minPrice);
        System.out.println(minPrice);
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();

        for(Apartment a : apartments){
            if(a.getPriceForNight() >= min){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }

    public ArrayList<Apartment> filterByMaxPrice(ArrayList<Apartment> apartments, String maxPrice) {
        int max = Integer.parseInt(maxPrice);

        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        
        for(Apartment a : apartments){
            if(a.getPriceForNight() <= max){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }


    public ArrayList<Apartment> filterByDestination(ArrayList<Apartment> apartments, String destination) {
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        for(Apartment a : apartments){
            if(a.getLocation().getAddress().getCity().equals(destination)){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }

    
    
}