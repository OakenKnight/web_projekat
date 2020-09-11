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
        */

        if(!isNullOrEmpty(searchedApartment.getArriveDate()) && !isNullOrEmpty(searchedApartment.getLeavingDate())){
            apartments = filterByPeriod(apartments, searchedApartment.getArriveDate(), searchedApartment.getLeavingDate());
        }
         
        /*
        if(!isNullOrEmpty(searchedApartment.getLeavingDate()))
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
                e1.printStackTrace();
            }

        }
            

        if (!destinationEmpty(searchedApartment))
            destination = searchedApartment.getDestination();

        if (!departDateEmpty(searchedApartment)){
            try {
                departDate = dateFormat.parse(searchedApartment.getLeavingDate());
            } catch (ParseException e) {
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
    public ArrayList<Apartment> filterByPeriod(ArrayList<Apartment> apartments, String arriveDate, String departDate){

        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();

        DateParser dateParser = new DateParser();
        Date depart_date = dateParser.formatDate(dateParser.parseDate(departDate));
        Date arrive_date = dateParser.formatDate(dateParser.parseDate(arriveDate));

        System.out.println(dateParser.getDaysBetween(arrive_date, depart_date));
        
        for(Apartment a : apartments){
            if(checkApartmentAvailability(a,arrive_date, depart_date)){
                filteredApartments.add(a);
            }
        }
        
        return filteredApartments;
    }
    
    public Boolean checkApartmentAvailability(Apartment a, Date arrive_date, Date depart_date) {
        DateParser dateParser = new DateParser();

        int days_between = dateParser.getDaysBetween(arrive_date,depart_date);

        ArrayList<Long> dates = new ArrayList<Long>();

        for(int i=0 ; i<=days_between; i++){
            dates.add(i*86400000 + arrive_date.getTime());
        }

        for(Long date : dates){
            if(!a.getFreeDates().contains(new Date(date))){
                return false;
            }
        }
        return true;
    }

    /*
    public ArrayList<Apartment> filterByArriveDate(ArrayList<Apartment> apartments, String arriveDate) {
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();

        DateParser dateParser = new DateParser();
        Date arrive_date = dateParser.parseDate(arriveDate);



        for(Apartment a : apartments){
            for(Date free_date : a.getFreeDates()){
                if(dateExist(free_date, arrive_date)){
                    filteredApartments.add(a);
                }
            }
        }
        

        return filteredApartments;
    }

    public ArrayList<Apartment> filterByDepartDate(ArrayList<Apartment> apartments, String departDate) {
        ArrayList<Apartment> filteredApartments = new ArrayList<Apartment>();

        DateParser dateParser = new DateParser();
        Date depart_date = dateParser.parseDate(departDate);

        long miliseconds = depart_date.getTime();
        System.out.println(miliseconds);

        Date formateddate = dateParser.formatDate(depart_date);
        System.out.println(formateddate);


        for(Apartment a : apartments){
            for(Date free_date : a.getFreeDates()){
                if(dateExist(free_date, depart_date)){
                    filteredApartments.add(a);
                }
                if(free_date.toString().equals(formateddate.toString())){
                    System.out.println("USPEO SAM DA ISPROGRAMIRAM DATUME JEBENE");
                }
            }
        }
        
        return filteredApartments;
    }

    */
    public Boolean dateExist(Date date, Date checkDate){
        return date.getTime() <= checkDate.getTime() && checkDate.getTime() <= date.getTime()+86400000-1;
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
            if(a.getLocation().getAddress().getCity().toLowerCase().contains(destination.toLowerCase()) || a.getLocation().getAddress().getState().toLowerCase().contains(destination.toLowerCase())){
                filteredApartments.add(a);
            }
        }
        return filteredApartments;
    }

    
    
}