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
        
        if(!isNullOrEmpty(searchedApartment.getMinGuests()))
            apartments = filterByGuestsMin(apartments, searchedApartment.getMinGuests());
        
        if(!isNullOrEmpty(searchedApartment.getMaxGuests())){
            apartments = filterByGuestsMax(apartments, searchedApartment.getMaxGuests());

        }
        
        if(!isNullOrEmpty(searchedApartment.getMinimumPrice()))
            apartments = filterByMinPrice(apartments, searchedApartment.getMinimumPrice());


        if(!isNullOrEmpty(searchedApartment.getMaximumPrice()))
            apartments = filterByMaxPrice(apartments, searchedApartment.getMaximumPrice());


        if((searchedApartment.getArriveDate() != null) && (searchedApartment.getLeavingDate() != null)){
            apartments = filterByPeriod(apartments, searchedApartment.getArriveDate(), searchedApartment.getLeavingDate());
        }
         
        /*
        if(!isNullOrEmpty(searchedApartment.getLeavingDate()))
            apartments = filterByDepartDate(apartments, searchedApartment.getLeavingDate());
        */

        apartments = filterNotDeleted(apartments);
        return apartments;
    }


    private ArrayList<Apartment> filterNotDeleted(ArrayList<Apartment> apartments) {
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        for(Apartment a : apartments){
            if(!a.getDeleted()){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;    

    }

    private ArrayList<Apartment> filterByGuestsMin(ArrayList<Apartment> apartments, String minGuests) {
        int min = Integer.parseInt(minGuests);
        System.out.println(min);
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        for(Apartment a : apartments){
            if(a.getGuestNumber() >= min){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;    
    }
    private ArrayList<Apartment> filterByGuestsMax(ArrayList<Apartment> apartments, String maxGuests) {
        int max = Integer.parseInt(maxGuests);
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        for(Apartment a : apartments){
            if(a.getGuestNumber() <= max){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;    
    }
    public static boolean isNullOrEmpty(String str) {
        if(str != null && !str.isEmpty())
            return false;
        return true;
    }
    
    public ArrayList<Apartment> filterByPeriod(ArrayList<Apartment> apartments, Date arriveDate, Date departDate){

        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        
        for(Apartment a : apartments){
            if(checkApartmentAvailability(a,arriveDate, departDate)){
                filteredApartments.add(a);
            }
        }
        
        return filteredApartments;
    }
    
    public Boolean checkApartmentAvailability(Apartment a, Date arriveDate, Date departDate) {
        for(int i = 0; i < a.getFreeDates().size(); i++) {
        	if(a.getFreeDates().get(i).isDateInInterval(arriveDate) && a.getFreeDates().get(i).isDateInInterval(departDate))
        		return true;
        }
        return false;
    }

    
    public Boolean dateExist(Date date, Date checkDate){
        return date.getTime() <= checkDate.getTime() && checkDate.getTime() <= date.getTime()+86400000-1;
    }
    public ArrayList<Apartment> filterByGuests(ArrayList<Apartment> apartments, String minGuests, String maxGuests) {
        int min = Integer.parseInt(minGuests);
        int max = Integer.parseInt(maxGuests);
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();
        for(Apartment a : apartments){
            if(a.getGuestNumber() >= min && a.getGuestNumber()<=max){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }
    public ArrayList<Apartment> filterByMinPrice(ArrayList<Apartment> apartments, String minPrice) {
        int min = Integer.parseInt(minPrice);
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
            if(a.getLocation().getAddress().getCity().toLowerCase().contains(destination.toLowerCase()) || a.getLocation().getAddress().getState().toLowerCase().contains(destination.toLowerCase())){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }

    
    
}